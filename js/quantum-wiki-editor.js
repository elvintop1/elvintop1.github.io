(function () {
  'use strict';

  const repository = {
    owner: 'elvintop1',
    name: 'elvintop1.github.io',
    branch: 'main',
    manifestPath: 'content/wiki/manifest.json'
  };

  const els = {};
  const managedDocuments = new Map();
  let accessToken = '';
  let currentUser = null;
  let articleIndex = [];
  let slugWasEdited = false;

  const escapeHTML = (value = '') => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const slugify = (value = '') => String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const lines = (value = '') => String(value).split('\n').map((item) => item.trim()).filter(Boolean);
  const routeKey = (chapterSlug, articleSlug) => `${chapterSlug}/${articleSlug}`;
  const repositoryApi = `https://api.github.com/repos/${repository.owner}/${repository.name}`;
  const apiPath = (path = '') => path ? `${repositoryApi}/${path}` : repositoryApi;

  function githubHeaders() {
    return {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${accessToken}`,
      'X-GitHub-Api-Version': '2026-03-10'
    };
  }

  async function githubRequest(url, options = {}) {
    const response = await fetch(url, { ...options, headers: { ...githubHeaders(), ...(options.headers || {}) } });
    let payload = null;
    try { payload = await response.json(); } catch (error) { payload = null; }
    if (!response.ok) {
      const apiError = new Error(payload?.message || `GitHub request failed (${response.status})`);
      apiError.status = response.status;
      throw apiError;
    }
    return payload;
  }

  function encodeContent(value) {
    const bytes = new TextEncoder().encode(value);
    let binary = '';
    bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
    return btoa(binary);
  }

  function decodeContent(value) {
    const binary = atob(String(value).replace(/\s/g, ''));
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }

  async function getRepositoryFile(path) {
    try {
      const payload = await githubRequest(`${apiPath(`contents/${path}`)}?ref=${encodeURIComponent(repository.branch)}`);
      return { sha: payload.sha, value: JSON.parse(decodeContent(payload.content)) };
    } catch (error) {
      if (error.status === 404) return null;
      throw error;
    }
  }

  async function putRepositoryFile(path, value, message, sha = null) {
    const body = {
      message,
      content: encodeContent(`${JSON.stringify(value, null, 2)}\n`),
      branch: repository.branch
    };
    if (sha) body.sha = sha;
    return githubRequest(apiPath(`contents/${path}`), { method: 'PUT', body: JSON.stringify(body) });
  }

  async function connect(event) {
    event.preventDefault();
    accessToken = els.token.value.trim();
    if (!accessToken) return;
    setStatus(els.authStatus, 'Checking GitHub identity and repository permission…', 'working');
    els.connect.disabled = true;
    try {
      const [user, repo] = await Promise.all([
        githubRequest('https://api.github.com/user'),
        githubRequest(apiPath(''))
      ]);
      if (!repo.permissions?.push) throw new Error('This GitHub account does not have write permission for the website repository.');
      currentUser = user;
      els.token.value = '';
      els.identity.textContent = `Connected as ${user.login}`;
      await loadManagedDocuments();
      rebuildArticleIndex();
      els.auth.classList.add('hidden');
      els.workspace.classList.remove('hidden');
      setStatus(els.authStatus, '', '');
      window.scrollTo({ top: els.workspace.offsetTop - 90, behavior: 'smooth' });
    } catch (error) {
      accessToken = '';
      setStatus(els.authStatus, error.message, 'error');
    } finally {
      els.connect.disabled = false;
    }
  }

  function disconnect() {
    accessToken = '';
    currentUser = null;
    managedDocuments.clear();
    els.workspace.classList.add('hidden');
    els.auth.classList.remove('hidden');
    els.identity.textContent = 'Not connected';
    setStatus(els.authStatus, 'Disconnected. The token was removed from this tab.', 'success');
    window.scrollTo({ top: els.auth.offsetTop - 90, behavior: 'smooth' });
  }

  async function loadManagedDocuments() {
    managedDocuments.clear();
    const manifestFile = await getRepositoryFile(repository.manifestPath);
    const entries = manifestFile?.value?.articles || [];
    await Promise.all(entries.map(async (entry) => {
      if (!entry.path) return;
      const file = await getRepositoryFile(entry.path);
      if (file?.value?.chapter?.slug && file?.value?.article?.slug) {
        managedDocuments.set(routeKey(file.value.chapter.slug, file.value.article.slug), { ...file.value, path: entry.path, sha: file.sha });
      }
    }));
  }

  function rebuildArticleIndex() {
    const merged = new Map();
    window.quantumBook.chapters.forEach((chapter) => {
      chapter.articles.forEach((article) => merged.set(routeKey(chapter.slug, article.slug), { chapter, article, managed: false }));
    });
    managedDocuments.forEach((documentData, route) => merged.set(route, {
      chapter: documentData.chapter,
      article: documentData.article,
      managed: true
    }));
    articleIndex = [...merged.entries()].map(([route, value]) => ({ route, ...value })).sort((left, right) => {
      const chapterOrder = Number(left.chapter.number) - Number(right.chapter.number);
      return chapterOrder || left.article.title.localeCompare(right.article.title);
    });

    els.existing.innerHTML = '<option value="">Create a new lesson</option>' + articleIndex.map((item) =>
      `<option value="${escapeHTML(item.route)}">Chapter ${String(item.chapter.number).padStart(2, '0')} · ${escapeHTML(item.article.title)}${item.managed ? ' · web-managed' : ''}</option>`
    ).join('');
    populateChapterSelect();
  }

  function populateChapterSelect(selected = '') {
    const chapterMap = new Map(window.quantumBook.chapters.map((chapter) => [chapter.slug, chapter]));
    managedDocuments.forEach((documentData) => chapterMap.set(documentData.chapter.slug, documentData.chapter));
    const chapters = [...chapterMap.values()].sort((left, right) => Number(left.number) - Number(right.number));
    els.chapter.innerHTML = chapters.map((chapter) => `<option value="${escapeHTML(chapter.slug)}">Chapter ${String(chapter.number).padStart(2, '0')} · ${escapeHTML(chapter.title)}</option>`).join('') + '<option value="__new__">Create a new chapter…</option>';
    if (selected && [...els.chapter.options].some((option) => option.value === selected)) els.chapter.value = selected;
    toggleNewChapterFields();
  }

  function toggleNewChapterFields() {
    const isNew = els.chapter.value === '__new__';
    els.newChapter.classList.toggle('hidden', !isNew);
    [els.chapterNumber, els.chapterTitle].forEach((field) => { field.required = isNew; });
  }

  function addRepeatRow(containerId, value = {}) {
    const templateName = containerId.replace('Rows', 'RowTemplate');
    const template = document.getElementById(templateName);
    const container = document.getElementById(containerId);
    if (!template || !container) return;
    const row = template.content.firstElementChild.cloneNode(true);
    row.querySelectorAll('[data-field]').forEach((field) => { field.value = value[field.dataset.field] || ''; });
    row.querySelector('[data-remove-row]').addEventListener('click', () => { row.remove(); renderPreview(); });
    row.querySelectorAll('input, textarea').forEach((field) => field.addEventListener('input', renderPreview));
    container.appendChild(row);
  }

  function readRepeatRows(containerId) {
    return [...document.getElementById(containerId).querySelectorAll('.wiki-repeat-row')].map((row) => {
      const value = {};
      row.querySelectorAll('[data-field]').forEach((field) => { value[field.dataset.field] = field.value.trim(); });
      return value;
    }).filter((value) => Object.values(value).some(Boolean));
  }

  function setRepeatRows(containerId, values) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    (values?.length ? values : [{}]).forEach((value) => addRepeatRow(containerId, value));
  }

  function currentChapterData() {
    if (els.chapter.value === '__new__') {
      return {
        slug: slugify(els.chapterTitle.value),
        number: Number(els.chapterNumber.value) || window.quantumBook.chapters.length + 1,
        title: els.chapterTitle.value.trim(),
        summary: els.chapterSummary.value.trim(),
        accent: els.chapterAccent.value.trim() || 'Community edition',
        references: []
      };
    }
    const base = window.quantumBook.chapters.find((chapter) => chapter.slug === els.chapter.value);
    const managed = [...managedDocuments.values()].find((documentData) => documentData.chapter.slug === els.chapter.value)?.chapter;
    const chapter = managed || base;
    return chapter ? {
      slug: chapter.slug,
      number: Number(chapter.number),
      title: chapter.title,
      summary: chapter.summary,
      accent: chapter.accent,
      references: chapter.references || []
    } : null;
  }

  function buildDocument() {
    const chapter = currentChapterData();
    const sections = readRepeatRows('sectionRows');
    const equations = readRepeatRows('equationRows');
    const exercises = readRepeatRows('exerciseRows');
    const sources = readRepeatRows('sourceRows');
    const workedSteps = lines(els.workedSteps.value);
    const worked = els.workedTitle.value.trim() || els.workedProblem.value.trim() ? {
      title: els.workedTitle.value.trim(),
      problem: els.workedProblem.value.trim(),
      steps: workedSteps,
      result: els.workedResult.value.trim()
    } : null;
    const lab = els.labTitle.value.trim() || els.labCode.value.trim() ? { title: els.labTitle.value.trim(), code: els.labCode.value } : null;

    return {
      schemaVersion: 1,
      updatedAt: new Date().toISOString(),
      updatedBy: currentUser?.login || 'unknown',
      chapter,
      article: {
        slug: slugify(els.slug.value),
        title: els.title.value.trim(),
        summary: els.summary.value.trim(),
        level: els.level.value.trim() || 'Intermediate',
        minutes: Number(els.minutes.value) || 40,
        prerequisites: lines(els.prerequisites.value),
        outcomes: lines(els.outcomes.value),
        sections,
        equations,
        worked,
        lab,
        exercises,
        sources,
        connections: lines(els.connections.value)
      }
    };
  }

  function validateDocument(documentData) {
    if (!documentData.chapter?.slug || !documentData.chapter?.title) return 'Choose a chapter or complete the new chapter fields.';
    if (!documentData.article.slug || !documentData.article.title || !documentData.article.summary) return 'Article title, slug, and summary are required.';
    if (!documentData.article.sections.length || documentData.article.sections.some((section) => !section.title || !section.body)) return 'Add at least one complete concept section.';
    if (documentData.article.equations.some((equation) => !equation.label || !equation.latex || !equation.note)) return 'Complete every equation or remove the empty equation row.';
    if (documentData.article.exercises.some((exercise) => !exercise.prompt || !exercise.hint || !exercise.answer)) return 'Complete every exercise or remove the empty exercise row.';
    if (documentData.article.sources.some((source) => !source.title || !source.url || !source.note)) return 'Complete every academic source or remove the empty source row.';
    if (documentData.article.sources.some((source) => !/^https?:\/\//i.test(source.url))) return 'Academic source URLs must begin with http:// or https://.';
    if (els.chapter.value === '__new__' && articleIndex.some((item) => item.chapter.slug === documentData.chapter.slug)) return 'That chapter slug already exists. Choose the existing chapter instead.';
    return '';
  }

  function renderPreview() {
    const data = buildDocument();
    const article = data.article;
    els.preview.innerHTML = `
      <article class="wiki-preview-article">
        <span>${escapeHTML(data.chapter?.title || 'Choose a chapter')} · ${article.minutes} min</span>
        <h2>${escapeHTML(article.title || 'Untitled lesson')}</h2>
        <p>${escapeHTML(article.summary || 'Write a concise learning summary.')}</p>
        ${(article.sections || []).map((section) => `<section><h3>${escapeHTML(section.title || 'Section title')}</h3>${renderParagraphs(section.body || 'Section explanation')}</section>`).join('')}
        ${(article.equations || []).map((equation) => `<div class="wiki-preview-equation"><strong>${escapeHTML(equation.label || 'Equation')}</strong><div>$$${escapeHTML(equation.latex || 'a=b')}$$</div><p>${escapeHTML(equation.note || '')}</p></div>`).join('')}
      </article>`;
    if (typeof window.renderMathInElement === 'function') {
      window.renderMathInElement(els.preview, { delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }], throwOnError: false });
    }
  }

  function renderParagraphs(value) {
    return String(value).split(/\n\s*\n/).map((paragraph) => `<p>${escapeHTML(paragraph).replace(/\n/g, '<br>')}</p>`).join('');
  }

  function loadSelectedArticle() {
    const selected = articleIndex.find((item) => item.route === els.existing.value);
    if (!selected) {
      resetForm();
      return;
    }
    const { chapter, article } = selected;
    populateChapterSelect(chapter.slug);
    els.slug.value = article.slug || '';
    els.title.value = article.title || '';
    els.summary.value = article.summary || '';
    els.level.value = article.level || 'Intermediate';
    els.minutes.value = Number(article.minutes) || 40;
    els.prerequisites.value = (article.prerequisites || []).join('\n');
    els.outcomes.value = (article.outcomes || []).join('\n');
    setRepeatRows('sectionRows', article.sections);
    setRepeatRows('equationRows', article.equations);
    els.workedTitle.value = article.worked?.title || '';
    els.workedProblem.value = article.worked?.problem || '';
    els.workedSteps.value = (article.worked?.steps || []).join('\n');
    els.workedResult.value = article.worked?.result || '';
    els.labTitle.value = article.lab?.title || '';
    els.labCode.value = article.lab?.code || '';
    setRepeatRows('exerciseRows', article.exercises);
    setRepeatRows('sourceRows', article.sources);
    els.connections.value = (article.connections || []).join('\n');
    els.confirm.checked = false;
    slugWasEdited = true;
    renderPreview();
  }

  function resetForm() {
    els.form.reset();
    populateChapterSelect(window.quantumBook.chapters[0]?.slug || '');
    els.level.value = 'Intermediate';
    els.minutes.value = 40;
    setRepeatRows('sectionRows', [{}, {}, {}]);
    setRepeatRows('equationRows', [{}]);
    setRepeatRows('exerciseRows', [{}, {}]);
    setRepeatRows('sourceRows', [{}]);
    slugWasEdited = false;
    setStatus(els.publishStatus, '', '');
    renderPreview();
  }

  async function publish(event) {
    event.preventDefault();
    if (!accessToken || !currentUser) return setStatus(els.publishStatus, 'Connect an authorized GitHub account first.', 'error');
    const documentData = buildDocument();
    const validationError = validateDocument(documentData);
    if (validationError) return setStatus(els.publishStatus, validationError, 'error');

    const route = routeKey(documentData.chapter.slug, documentData.article.slug);
    const path = `content/wiki/articles/${documentData.chapter.slug}--${documentData.article.slug}.json`;
    els.publish.disabled = true;
    setStatus(els.publishStatus, 'Publishing the lesson and updating the Wiki index…', 'working');
    try {
      const existingArticleFile = await getRepositoryFile(path);
      await putRepositoryFile(path, documentData, `Publish Wiki lesson: ${documentData.article.title}`, existingArticleFile?.sha || null);

      let manifestUpdated = false;
      for (let attempt = 0; attempt < 3 && !manifestUpdated; attempt += 1) {
        const manifestFile = await getRepositoryFile(repository.manifestPath);
        const manifest = manifestFile?.value || { schemaVersion: 1, articles: [] };
        const entry = { route, chapterSlug: documentData.chapter.slug, articleSlug: documentData.article.slug, title: documentData.article.title, path, updatedAt: documentData.updatedAt };
        const index = (manifest.articles || []).findIndex((item) => item.route === route);
        if (index >= 0) manifest.articles[index] = entry;
        else manifest.articles.push(entry);
        manifest.updatedAt = documentData.updatedAt;
        try {
          await putRepositoryFile(repository.manifestPath, manifest, `Update Wiki content index: ${documentData.article.title}`, manifestFile?.sha || null);
          manifestUpdated = true;
        } catch (error) {
          if (error.status !== 409 || attempt === 2) throw error;
        }
      }

      managedDocuments.set(route, { ...documentData, path });
      rebuildArticleIndex();
      els.existing.value = route;
      setStatus(els.publishStatus, `Published successfully. GitHub Pages normally updates within one or two minutes.`, 'success', `wiki.html#${route}`);
    } catch (error) {
      setStatus(els.publishStatus, error.message, 'error');
    } finally {
      els.publish.disabled = false;
    }
  }

  function setStatus(element, message, type, link = '') {
    element.className = `wiki-editor-status ${type || ''}`;
    element.textContent = message;
    if (link) {
      element.append(' ');
      const anchor = document.createElement('a');
      anchor.href = link;
      anchor.textContent = 'Open lesson →';
      element.appendChild(anchor);
    }
  }

  function cacheElements() {
    const map = {
      auth: 'editorAuth', authForm: 'editorAuthForm', token: 'githubToken', connect: 'editorConnect', authStatus: 'editorAuthStatus', workspace: 'editorWorkspace', identity: 'editorIdentity', disconnect: 'editorDisconnect', existing: 'existingArticle', form: 'wikiArticleForm', chapter: 'articleChapter', slug: 'articleSlug', newChapter: 'newChapterFields', chapterNumber: 'chapterNumber', chapterAccent: 'chapterAccent', chapterTitle: 'chapterTitle', chapterSummary: 'chapterSummary', title: 'articleTitle', summary: 'articleSummary', level: 'articleLevel', minutes: 'articleMinutes', prerequisites: 'articlePrerequisites', outcomes: 'articleOutcomes', workedTitle: 'workedTitle', workedProblem: 'workedProblem', workedSteps: 'workedSteps', workedResult: 'workedResult', labTitle: 'labTitle', labCode: 'labCode', connections: 'articleConnections', confirm: 'publishConfirm', publish: 'publishArticle', publishStatus: 'publishStatus', preview: 'articlePreview'
    };
    Object.entries(map).forEach(([key, id]) => { els[key] = document.getElementById(id); });
  }

  function init() {
    cacheElements();
    if (!els.form || !window.quantumBook) return;
    populateChapterSelect();
    resetForm();

    els.authForm.addEventListener('submit', connect);
    els.disconnect.addEventListener('click', disconnect);
    els.existing.addEventListener('change', loadSelectedArticle);
    els.chapter.addEventListener('change', () => { toggleNewChapterFields(); renderPreview(); });
    els.title.addEventListener('input', () => {
      if (!slugWasEdited) els.slug.value = slugify(els.title.value);
      renderPreview();
    });
    els.slug.addEventListener('input', () => { slugWasEdited = true; els.slug.value = slugify(els.slug.value); });
    els.form.querySelectorAll('input, textarea, select').forEach((field) => {
      if (!field.closest('.wiki-repeat-row')) field.addEventListener('input', renderPreview);
    });
    document.querySelectorAll('[data-add-row]').forEach((button) => button.addEventListener('click', () => { addRepeatRow(button.dataset.addRow); renderPreview(); }));
    els.form.addEventListener('submit', publish);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
