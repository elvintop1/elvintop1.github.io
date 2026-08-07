const API_VERSION = '2026-03-10';
const SESSION_LIFETIME_MS = 8 * 60 * 60 * 1000;
const ALLOWED_CONTENT_PREFIXES = ['content/wiki/', 'content/research/', 'content/papers/'];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    try {
      if (request.method === 'OPTIONS') return corsResponse(request, env, null, 204);
      if (url.pathname === '/health') return jsonResponse({ ok: true, service: 'quantum-content-admin' });
      if (url.pathname === '/setup' && request.method === 'GET') return await setupPage(request, env);
      if (url.pathname === '/auth/github-app/callback' && request.method === 'GET') return await githubAppCallback(request, env);
      if (url.pathname === '/auth/install/callback' && request.method === 'GET') return await installCallback(request, env);
      if (url.pathname === '/auth/login' && request.method === 'GET') return await beginLogin(request, env);
      if (url.pathname === '/auth/callback' && request.method === 'GET') return await loginCallback(request, env);
      if (url.pathname === '/api/session' && request.method === 'GET') return await sessionInfo(request, env);
      if (url.pathname === '/api/logout' && request.method === 'POST') return await logout(request, env);
      if (url.pathname === '/api/repository-file' && ['GET', 'PUT'].includes(request.method)) return await repositoryFile(request, env);
      return jsonResponse({ error: 'Not found' }, 404);
    } catch (error) {
      console.error('Admin API error', error);
      return withCors(request, env, jsonResponse({ error: publicError(error) }, error.status || 500));
    }
  }
};

async function setupPage(request, env) {
  const existing = await getConfig(env, 'github_app');
  if (existing) return htmlResponse(pageShell('Admin setup complete', '<h1>GitHub App configured</h1><p>The admin authentication service is ready.</p><p><a class="button" href="/auth/login">Sign in with GitHub</a></p>'));
  const token = new URL(request.url).searchParams.get('token') || '';
  if (!env.SETUP_TOKEN || !constantTimeEqual(token, env.SETUP_TOKEN)) return htmlResponse(pageShell('Setup unavailable', '<h1>Setup link required</h1><p>This one-time setup page is protected.</p>'), 403);

  const origin = new URL(request.url).origin;
  const setupState = await signState({ type: 'manifest', exp: Date.now() + 15 * 60 * 1000 }, env.SESSION_SECRET);
  const installState = await signState({ type: 'install', exp: Date.now() + 60 * 60 * 1000 }, env.SESSION_SECRET);
  const manifest = {
    name: 'Hao Quantum Content Studio',
    url: env.EDITOR_URL,
    hook_attributes: { url: `${origin}/webhook`, active: false },
    redirect_url: `${origin}/auth/github-app/callback`,
    callback_urls: [`${origin}/auth/callback`],
    setup_url: `${origin}/auth/install/callback?state=${encodeURIComponent(installState)}`,
    setup_on_update: true,
    public: false,
    default_permissions: { contents: 'write', metadata: 'read' },
    default_events: []
  };
  const action = `https://github.com/settings/apps/new?state=${encodeURIComponent(setupState)}`;
  const content = `<p class="eyebrow">One-time secure setup</p><h1>Create the GitHub Admin App</h1><p>This app receives access only to repository metadata and contents. Install it only on <strong>${escapeHtml(env.GITHUB_OWNER)}/${escapeHtml(env.GITHUB_REPO)}</strong>.</p><form method="post" action="${escapeHtml(action)}"><input type="hidden" name="manifest" value="${escapeHtml(JSON.stringify(manifest))}"><button class="button" type="submit">Create GitHub App</button></form><p class="note">GitHub will show the exact permissions before installation.</p>`;
  return htmlResponse(pageShell('Set up Quantum Content Admin', content));
}

async function githubAppCallback(request, env) {
  const url = new URL(request.url);
  await verifyState(url.searchParams.get('state'), 'manifest', env.SESSION_SECRET);
  const code = url.searchParams.get('code');
  if (!code) throw httpError(400, 'GitHub did not return an app manifest code.');
  const response = await fetch(`https://api.github.com/app-manifests/${encodeURIComponent(code)}/conversions`, {
    method: 'POST',
    headers: githubHeaders()
  });
  const payload = await response.json();
  if (!response.ok) throw httpError(response.status, payload.message || 'Unable to create the GitHub App.');
  const stored = {
    app_id: payload.id,
    slug: payload.slug,
    client_id: payload.client_id,
    client_secret_cipher: await encryptText(payload.client_secret, env.SESSION_SECRET)
  };
  await setConfig(env, 'github_app', stored);
  return Response.redirect(`https://github.com/apps/${encodeURIComponent(payload.slug)}/installations/new`, 302);
}

async function installCallback(request, env) {
  const url = new URL(request.url);
  await verifyState(url.searchParams.get('state'), 'install', env.SESSION_SECRET);
  const installationId = Number(url.searchParams.get('installation_id'));
  if (!installationId) throw httpError(400, 'GitHub did not return an installation ID.');
  await setConfig(env, 'github_installation', { installation_id: installationId });
  return Response.redirect(`${new URL(request.url).origin}/auth/login`, 302);
}

async function beginLogin(request, env) {
  const app = await getConfig(env, 'github_app');
  const installation = await getConfig(env, 'github_installation');
  if (!app || !installation) return htmlResponse(pageShell('Admin setup incomplete', '<h1>Admin setup is not complete</h1><p>The GitHub App must be created and installed before sign in.</p>'), 503);
  const origin = new URL(request.url).origin;
  const state = await signState({ type: 'oauth', exp: Date.now() + 10 * 60 * 1000, nonce: randomToken(18) }, env.SESSION_SECRET);
  const auth = new URL('https://github.com/login/oauth/authorize');
  auth.searchParams.set('client_id', app.client_id);
  auth.searchParams.set('redirect_uri', `${origin}/auth/callback`);
  auth.searchParams.set('state', state);
  return Response.redirect(auth.toString(), 302);
}

async function loginCallback(request, env) {
  const url = new URL(request.url);
  await verifyState(url.searchParams.get('state'), 'oauth', env.SESSION_SECRET);
  const code = url.searchParams.get('code');
  if (!code) throw httpError(400, 'GitHub sign-in was cancelled or incomplete.');
  const app = await getConfig(env, 'github_app');
  if (!app) throw httpError(503, 'GitHub App is not configured.');
  const clientSecret = await decryptText(app.client_secret_cipher, env.SESSION_SECRET);
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: app.client_id, client_secret: clientSecret, code, redirect_uri: `${url.origin}/auth/callback` })
  });
  const tokenPayload = await tokenResponse.json();
  if (!tokenResponse.ok || !tokenPayload.access_token) throw httpError(401, tokenPayload.error_description || 'Unable to complete GitHub sign-in.');

  const [userResponse, repoResponse] = await Promise.all([
    githubFetch('https://api.github.com/user', tokenPayload.access_token),
    githubFetch(`https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}`, tokenPayload.access_token)
  ]);
  if (!userResponse.response.ok) throw httpError(401, 'Unable to verify the GitHub identity.');
  const allowed = String(env.ALLOWED_GITHUB_LOGINS || '').split(',').map((item) => item.trim().toLowerCase()).filter(Boolean);
  if (!allowed.includes(String(userResponse.data.login || '').toLowerCase())) throw httpError(403, 'This GitHub account is not on the admin allowlist.');
  if (!repoResponse.response.ok || !repoResponse.data.permissions?.push) throw httpError(403, 'This GitHub account does not have write permission for the website repository.');

  const rawSession = randomToken(32);
  const now = Date.now();
  const oauthExpiry = Number(tokenPayload.expires_in) ? now + Number(tokenPayload.expires_in) * 1000 : now + SESSION_LIFETIME_MS;
  const expiresAt = Math.min(now + SESSION_LIFETIME_MS, oauthExpiry);
  await env.DB.prepare('DELETE FROM admin_sessions WHERE expires_at < ?').bind(now).run();
  await env.DB.prepare('INSERT INTO admin_sessions (id_hash, github_login, github_name, avatar_url, token_cipher, created_at, expires_at) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .bind(await sha256(rawSession), userResponse.data.login, userResponse.data.name || '', userResponse.data.avatar_url || '', await encryptText(tokenPayload.access_token, env.SESSION_SECRET), now, expiresAt).run();
  const redirect = new URL(env.EDITOR_URL);
  redirect.hash = `admin_session=${encodeURIComponent(rawSession)}`;
  return Response.redirect(redirect.toString(), 302);
}

async function sessionInfo(request, env) {
  const session = await requireSession(request, env);
  return withCors(request, env, jsonResponse({ user: { login: session.github_login, name: session.github_name, avatar_url: session.avatar_url }, expiresAt: session.expires_at }));
}

async function logout(request, env) {
  const rawSession = bearerToken(request);
  if (rawSession) await env.DB.prepare('DELETE FROM admin_sessions WHERE id_hash = ?').bind(await sha256(rawSession)).run();
  return withCors(request, env, jsonResponse({ ok: true }));
}

async function repositoryFile(request, env) {
  const session = await requireSession(request, env);
  const token = await decryptText(session.token_cipher, env.SESSION_SECRET);
  const url = new URL(request.url);
  const path = normalizeContentPath(url.searchParams.get('path'));
  const apiUrl = `https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents/${path}`;
  if (request.method === 'GET') {
    const result = await githubFetch(`${apiUrl}?ref=${encodeURIComponent(env.GITHUB_BRANCH || 'main')}`, token);
    if (result.response.status === 404) return withCors(request, env, jsonResponse({ exists: false }));
    if (!result.response.ok) throw httpError(result.response.status, result.data.message || 'Unable to load the repository file.');
    const decoded = decodeUtf8Base64(result.data.content || '');
    let value;
    try { value = JSON.parse(decoded); } catch (_) { throw httpError(422, 'The repository file is not valid JSON.'); }
    return withCors(request, env, jsonResponse({ exists: true, sha: result.data.sha, value }));
  }

  const body = await request.json();
  if (!body || typeof body.value !== 'object' || !String(body.message || '').trim()) throw httpError(400, 'A JSON value and commit message are required.');
  const commit = {
    message: String(body.message).slice(0, 180),
    content: encodeUtf8Base64(`${JSON.stringify(body.value, null, 2)}\n`),
    branch: env.GITHUB_BRANCH || 'main'
  };
  if (body.sha) commit.sha = String(body.sha);
  const result = await githubFetch(apiUrl, token, { method: 'PUT', body: JSON.stringify(commit) });
  if (!result.response.ok) throw httpError(result.response.status, result.data.message || 'Unable to publish the repository file.');
  return withCors(request, env, jsonResponse({ ok: true, commit: result.data.commit?.sha || null, sha: result.data.content?.sha || null }));
}

async function requireSession(request, env) {
  const token = bearerToken(request);
  if (!token) throw httpError(401, 'Sign in is required.');
  const session = await env.DB.prepare('SELECT * FROM admin_sessions WHERE id_hash = ?').bind(await sha256(token)).first();
  if (!session || Number(session.expires_at) <= Date.now()) {
    if (session) await env.DB.prepare('DELETE FROM admin_sessions WHERE id_hash = ?').bind(session.id_hash).run();
    throw httpError(401, 'The admin session has expired. Please sign in again.');
  }
  return session;
}

function normalizeContentPath(value) {
  const path = String(value || '').replace(/^\/+/, '');
  if (!ALLOWED_CONTENT_PREFIXES.some((prefix) => path.startsWith(prefix)) || path.includes('..') || !path.endsWith('.json')) throw httpError(403, 'This content path is not allowed.');
  return path.split('/').map(encodeURIComponent).join('/');
}

function bearerToken(request) {
  const match = request.headers.get('Authorization')?.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : '';
}

function githubHeaders(token = '') {
  const headers = { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': API_VERSION, 'User-Agent': 'quantum-content-admin' };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function githubFetch(url, token, options = {}) {
  const response = await fetch(url, { ...options, headers: { ...githubHeaders(token), ...(options.headers || {}) } });
  let data = {};
  try { data = await response.json(); } catch (_) { data = {}; }
  return { response, data };
}

async function getConfig(env, key) {
  const row = await env.DB.prepare('SELECT value FROM config WHERE key = ?').bind(key).first();
  return row ? JSON.parse(row.value) : null;
}

async function setConfig(env, key, value) {
  await env.DB.prepare('INSERT INTO config (key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at')
    .bind(key, JSON.stringify(value), Date.now()).run();
}

async function signState(payload, secret) {
  const body = base64UrlEncode(new TextEncoder().encode(JSON.stringify(payload)));
  const signature = await hmac(body, secret);
  return `${body}.${signature}`;
}

async function verifyState(value, expectedType, secret) {
  const [body, signature] = String(value || '').split('.');
  if (!body || !signature || !constantTimeEqual(signature, await hmac(body, secret))) throw httpError(400, 'The authorization state is invalid.');
  let payload;
  try { payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(body))); } catch (_) { throw httpError(400, 'The authorization state is invalid.'); }
  if (payload.type !== expectedType || Number(payload.exp) < Date.now()) throw httpError(400, 'The authorization state has expired.');
  return payload;
}

async function hmac(value, secret) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return base64UrlEncode(new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value))));
}

async function encryptText(value, secret) {
  const key = await encryptionKey(secret);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const cipher = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(value)));
  const output = new Uint8Array(iv.length + cipher.length);
  output.set(iv); output.set(cipher, iv.length);
  return base64UrlEncode(output);
}

async function decryptText(value, secret) {
  const bytes = base64UrlDecode(value);
  const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: bytes.slice(0, 12) }, await encryptionKey(secret), bytes.slice(12));
  return new TextDecoder().decode(plain);
}

async function encryptionKey(secret) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(secret));
  return crypto.subtle.importKey('raw', digest, 'AES-GCM', false, ['encrypt', 'decrypt']);
}

async function sha256(value) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return base64UrlEncode(new Uint8Array(digest));
}

function randomToken(size) { return base64UrlEncode(crypto.getRandomValues(new Uint8Array(size))); }
function base64UrlEncode(bytes) { return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, ''); }
function base64UrlDecode(value) { const base64 = value.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(value.length / 4) * 4, '='); return Uint8Array.from(atob(base64), (char) => char.charCodeAt(0)); }
function encodeUtf8Base64(value) { return btoa(String.fromCharCode(...new TextEncoder().encode(value))); }
function decodeUtf8Base64(value) { return new TextDecoder().decode(Uint8Array.from(atob(String(value).replace(/\s/g, '')), (char) => char.charCodeAt(0))); }

function allowedOrigin(request, env) {
  const origin = request.headers.get('Origin') || '';
  return origin === env.EDITOR_ORIGIN || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) ? origin : '';
}

function withCors(request, env, response) {
  const origin = allowedOrigin(request, env);
  if (!origin) return response;
  const headers = new Headers(response.headers);
  headers.set('Access-Control-Allow-Origin', origin);
  headers.set('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  headers.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
  headers.set('Access-Control-Max-Age', '600');
  headers.set('Vary', 'Origin');
  return new Response(response.body, { status: response.status, headers });
}

function corsResponse(request, env, body, status) { return withCors(request, env, new Response(body, { status })); }
function jsonResponse(value, status = 200) { return new Response(JSON.stringify(value), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } }); }
function htmlResponse(value, status = 200) { return new Response(value, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; form-action https://github.com; base-uri 'none'; frame-ancestors 'none'", 'X-Frame-Options': 'DENY', 'Referrer-Policy': 'no-referrer' } }); }
function httpError(status, message) { const error = new Error(message); error.status = status; return error; }
function publicError(error) { return error.status && error.status < 500 ? error.message : 'The admin service encountered an unexpected error.'; }
function constantTimeEqual(left, right) { const a = String(left || ''), b = String(right || ''); if (a.length !== b.length) return false; let diff = 0; for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i); return diff === 0; }
function escapeHtml(value) { return String(value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;'); }

function pageShell(title, content) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title><style>body{margin:0;background:#f7f9fc;color:#172033;font:16px/1.7 system-ui,sans-serif}.shell{max-width:720px;margin:9vh auto;padding:48px;background:#fff;border:1px solid #dfe5ee;border-radius:18px;box-shadow:0 20px 60px #17203312}.eyebrow{color:#295acb;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}h1{margin:.2em 0;font:500 clamp(2.4rem,7vw,4.8rem)/1.02 Georgia,serif;letter-spacing:-.05em}p{color:#5d687b}.button{display:inline-flex;align-items:center;min-height:46px;padding:0 20px;color:#fff;background:#2455c3;border:0;border-radius:9px;font-weight:700;text-decoration:none;cursor:pointer}.note{margin-top:24px;padding-top:18px;border-top:1px solid #e4e8ef;font-size:13px}</style></head><body><main class="shell">${content}</main></body></html>`;
}
