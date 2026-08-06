(function () {
  'use strict';

  const repository = {
    owner: 'elvintop1',
    name: 'elvintop1.github.io',
    branch: 'main',
    manifestPath: 'content/wiki/manifest.json',
    researchManifestPath: 'content/research/manifest.json',
    paperManifestPath: 'content/papers/manifest.json'
  };

  const els = {};
  const managedDocuments = new Map();
  const managedResearchDocuments = new Map();
  const managedPaperDocuments = new Map();
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
  const today = () => new Date().toISOString().slice(0, 10);
  const splitPipes = (value = '', size = 3) => lines(value).map((line) => {
    const parts = line.split('|').map((part) => part.trim());
    while (parts.length < size) parts.push('');
    return parts.slice(0, size);
  });

  function textToSections(value = '') {
    const source = String(value).trim();
    if (!source) return [];
    const chunks = source.split(/(?=^##\s+)/m).map((chunk) => chunk.trim()).filter(Boolean);
    return chunks.map((chunk, index) => {
      const rows = chunk.split('\n');
      const heading = rows[0].match(/^##\s+(.+)$/);
      const title = heading ? heading[1].trim() : `Section ${index + 1}`;
      const body = (heading ? rows.slice(1) : rows).join('\n').trim();
      return {
        id: slugify(title) || `section-${index + 1}`,
        title: `${index + 1}. ${title.replace(/^\d+\.\s*/, '')}`,
        paragraphs: body.split(/\n\s*\n/).map((paragraph) => paragraph.replace(/\n+/g, ' ').trim()).filter(Boolean),
        equations: []
      };
    });
  }

  function sectionsToText(sections = []) {
    return sections.map((section) => `## ${String(section.title || '').replace(/^\d+\.\s*/, '')}\n${(section.paragraphs || []).join('\n\n')}`).join('\n\n');
  }
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
      await Promise.all([loadManagedDocuments(), loadManagedResearchDocuments(), loadManagedPaperDocuments()]);
      rebuildArticleIndex();
      rebuildResearchIndex();
      rebuildPaperIndex();
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
    managedResearchDocuments.clear();
    managedPaperDocuments.clear();
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

  async function loadManifestDocuments(manifestPath, key, target) {
    target.clear();
    const manifestFile = await getRepositoryFile(manifestPath);
    const entries = manifestFile?.value?.[key] || [];
    await Promise.all(entries.map(async (entry) => {
      if (!entry.path) return;
      const file = await getRepositoryFile(entry.path);
      if (file?.value?.slug) target.set(file.value.slug, { ...file.value, path: entry.path, sha: file.sha });
    }));
  }

  function loadManagedResearchDocuments() {
    return loadManifestDocuments(repository.researchManifestPath, 'notes', managedResearchDocuments);
  }

  function loadManagedPaperDocuments() {
    return loadManifestDocuments(repository.paperManifestPath, 'papers', managedPaperDocuments);
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

  function mergedBySlug(base, managed) {
    const merged = new Map((base || []).map((item) => [item.slug, item]));
    managed.forEach((item, slug) => merged.set(slug, item));
    return [...merged.values()];
  }

  function rebuildResearchIndex() {
    const notes = mergedBySlug(window.quantumResearchNotes, managedResearchDocuments)
      .sort((left, right) => String(right.date).localeCompare(String(left.date)) || Number(right.sequence || 0) - Number(left.sequence || 0));
    els.existingResearch.innerHTML = '<option value="">Create a new research note</option>' + notes.map((note) =>
      `<option value="${escapeHTML(note.slug)}">${escapeHTML(note.date)} · ${escapeHTML(note.title)}${managedResearchDocuments.has(note.slug) ? ' · web-managed' : ''}</option>`
    ).join('');
  }

  function rebuildPaperIndex() {
    const papers = mergedBySlug(window.quantumPapers, managedPaperDocuments);
    els.existingPaper.innerHTML = '<option value="">Create a new paper analysis</option>' + papers.map((paper) =>
      `<option value="${escapeHTML(paper.slug)}">${escapeHTML(paper.year)} · ${escapeHTML(paper.shortTitle || paper.title)}${managedPaperDocuments.has(paper.slug) ? ' · web-managed' : ''}</option>`
    ).join('');
  }

  function populateTrackSelects() {
    const tracks = window.quantumResearchTracks || [];
    const options = tracks.map((track) => `<option value="${escapeHTML(track.slug)}">${escapeHTML(track.title)}</option>`).join('');
    els.researchTrack.innerHTML = options;
    els.paperTrack.innerHTML = options;
  }

  function setEditorMode(mode) {
    const selected = ['wiki', 'research', 'paper'].includes(mode) ? mode : 'wiki';
    document.querySelectorAll('[data-editor-panel]').forEach((panel) => panel.classList.toggle('hidden', panel.dataset.editorPanel !== selected));
    document.querySelectorAll('[data-editor-mode]').forEach((button) => {
      const active = button.dataset.editorMode === selected;
      button.setAttribute('aria-selected', String(active));
      button.classList.toggle('active', active);
    });
    const url = new URL(window.location.href);
    if (selected === 'wiki') url.searchParams.delete('type');
    else url.searchParams.set('type', selected);
    history.replaceState(null, '', `${url.pathname}${url.search}`);
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

  function buildResearchDocument() {
    const sections = textToSections(els.researchSections.value);
    const equations = splitPipes(els.researchEquations.value, 4).map(([sectionNumber, label, latex, note]) => ({ sectionNumber: Number(sectionNumber) || 1, label, latex, note })).filter((item) => item.label || item.latex || item.note);
    equations.forEach(({ sectionNumber, label, latex, note }) => {
      const target = sections[Math.max(0, Math.min(sections.length - 1, sectionNumber - 1))];
      if (target) target.equations.push({ label, latex, note });
    });
    const baseNotes = mergedBySlug(window.quantumResearchNotes, managedResearchDocuments);
    const existing = baseNotes.find((note) => note.slug === slugify(els.researchSlug.value));
    const sourceRows = splitPipes(els.researchSources.value).map(([type, title, url]) => ({ type, title, url })).filter((item) => item.title || item.url);
    const connections = splitPipes(els.researchConnections.value, 2).map(([label, href]) => ({ label, href })).filter((item) => item.label || item.href);
    const hasLab = els.researchLabTitle.value.trim() || els.researchLabCode.value.trim();
    return {
      slug: slugify(els.researchSlug.value),
      date: els.researchDate.value || today(),
      updated: today(),
      sequence: Number(existing?.sequence) || Math.max(0, ...baseNotes.map((note) => Number(note.sequence) || 0)) + 1,
      track: els.researchTrack.value,
      status: els.researchStatus.value.trim() || 'Exploration',
      maturity: els.researchMaturity.value.trim() || 'Working note',
      title: els.researchTitle.value.trim(),
      subtitle: els.researchSubtitle.value.trim(),
      readingTime: Number(els.researchMinutes.value) || 15,
      researchQuestion: els.researchQuestion.value.trim(),
      abstract: els.researchAbstract.value.trim(),
      tags: lines(els.researchTags.value),
      prerequisites: lines(els.researchPrerequisites.value),
      keyFindings: lines(els.researchFindings.value),
      sections,
      codeLab: hasLab ? {
        title: els.researchLabTitle.value.trim() || 'Reproducible experiment',
        tool: els.researchLabTool.value.trim() || 'Python + Qiskit',
        install: els.researchLabInstall.value.trim(),
        code: els.researchLabCode.value,
        expected: els.researchLabExpected.value.trim(),
        interpretation: els.researchLabInterpretation.value.trim()
      } : null,
      limitations: lines(els.researchLimitations.value),
      openQuestions: lines(els.researchOpenQuestions.value),
      relatedLessons: connections,
      sources: sourceRows,
      managedBy: currentUser?.login || 'unknown'
    };
  }

  function validateResearch(note) {
    if (!note.slug || !note.title || !note.subtitle || !note.researchQuestion || !note.abstract) return 'Complete the slug, title, subtitle, research question, and abstract.';
    if (!note.track) return 'Choose a research direction.';
    if (!note.sections.length || note.sections.some((section) => !section.paragraphs.length)) return 'Add at least one complete section using a ## heading.';
    if (note.sections.flatMap((section) => section.equations).some((equation) => !equation.label || !equation.latex || !equation.note)) return 'Every equation needs a label, LaTeX expression, and meaning.';
    if (note.sources.some((source) => !source.type || !source.title || !/^https?:\/\//i.test(source.url))) return 'Every source must use “Type | Title | https://URL”.';
    return '';
  }

  function renderResearchPreview() {
    const note = buildResearchDocument();
    els.researchPreview.innerHTML = `<article class="wiki-preview-article"><span>${escapeHTML(note.date)} · ${note.readingTime} min</span><h2>${escapeHTML(note.title || 'Untitled research note')}</h2><p>${escapeHTML(note.subtitle || 'Write a concise subtitle.')}</p><section><h3>Research question</h3><p>${escapeHTML(note.researchQuestion || 'State the question you are investigating.')}</p></section>${note.sections.slice(0, 2).map((section) => `<section><h3>${escapeHTML(section.title)}</h3>${section.paragraphs.slice(0, 2).map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`).join('')}</section>`).join('')}</article>`;
    window.siteUtils?.renderMath(els.researchPreview);
  }

  function resetResearchForm() {
    els.researchForm.reset();
    els.researchDate.value = today();
    els.researchStatus.value = 'Exploration';
    els.researchMaturity.value = 'Working note';
    els.researchMinutes.value = 15;
    els.researchLabTool.value = 'Python + Qiskit';
    els.researchLabInstall.value = 'python -m pip install qiskit';
    setStatus(els.researchPublishStatus, '', '');
    renderResearchPreview();
  }

  function loadSelectedResearch() {
    const note = mergedBySlug(window.quantumResearchNotes, managedResearchDocuments).find((item) => item.slug === els.existingResearch.value);
    if (!note) return resetResearchForm();
    els.researchTrack.value = note.track || '';
    els.researchSlug.value = note.slug || '';
    els.researchDate.value = note.date || today();
    els.researchStatus.value = note.status || 'Exploration';
    els.researchMaturity.value = note.maturity || 'Working note';
    els.researchMinutes.value = Number(note.readingTime) || 15;
    els.researchTitle.value = note.title || '';
    els.researchSubtitle.value = note.subtitle || '';
    els.researchQuestion.value = note.researchQuestion || '';
    els.researchAbstract.value = note.abstract || '';
    els.researchTags.value = (note.tags || []).join('\n');
    els.researchPrerequisites.value = (note.prerequisites || []).join('\n');
    els.researchFindings.value = (note.keyFindings || []).join('\n');
    els.researchSections.value = sectionsToText(note.sections);
    els.researchEquations.value = (note.sections || []).flatMap((section, index) => (section.equations || []).map((equation) => `${index + 1} | ${equation.label} | ${equation.latex} | ${equation.note}`)).join('\n');
    els.researchLabTitle.value = note.codeLab?.title || '';
    els.researchLabTool.value = note.codeLab?.tool || 'Python + Qiskit';
    els.researchLabInstall.value = note.codeLab?.install || 'python -m pip install qiskit';
    els.researchLabCode.value = note.codeLab?.code || '';
    els.researchLabExpected.value = note.codeLab?.expected || '';
    els.researchLabInterpretation.value = note.codeLab?.interpretation || '';
    els.researchLimitations.value = (note.limitations || []).join('\n');
    els.researchOpenQuestions.value = (note.openQuestions || []).join('\n');
    els.researchConnections.value = (note.relatedLessons || []).map((item) => `${item.label} | ${item.href}`).join('\n');
    els.researchSources.value = (note.sources || []).map((source) => `${source.type} | ${source.title} | ${source.url}`).join('\n');
    els.researchConfirm.checked = false;
    renderResearchPreview();
  }

  async function updateCollectionManifest(manifestPath, key, entry, message) {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const manifestFile = await getRepositoryFile(manifestPath);
      const manifest = manifestFile?.value || { schemaVersion: 1, [key]: [] };
      manifest[key] = Array.isArray(manifest[key]) ? manifest[key] : [];
      const index = manifest[key].findIndex((item) => item.slug === entry.slug);
      if (index >= 0) manifest[key][index] = entry;
      else manifest[key].push(entry);
      manifest.updatedAt = entry.updatedAt;
      try {
        await putRepositoryFile(manifestPath, manifest, message, manifestFile?.sha || null);
        return;
      } catch (error) {
        if (error.status !== 409 || attempt === 2) throw error;
      }
    }
  }

  async function publishResearch(event) {
    event.preventDefault();
    if (!accessToken || !currentUser) return setStatus(els.researchPublishStatus, 'Connect an authorized GitHub account first.', 'error');
    const note = buildResearchDocument();
    const validationError = validateResearch(note);
    if (validationError) return setStatus(els.researchPublishStatus, validationError, 'error');
    const path = `content/research/notes/${note.slug}.json`;
    els.publishResearch.disabled = true;
    setStatus(els.researchPublishStatus, 'Publishing the note and updating the Research index…', 'working');
    try {
      const existing = await getRepositoryFile(path);
      await putRepositoryFile(path, note, `Publish research note: ${note.title}`, existing?.sha || null);
      const updatedAt = new Date().toISOString();
      await updateCollectionManifest(repository.researchManifestPath, 'notes', { slug: note.slug, title: note.title, path, updatedAt }, `Update Research index: ${note.title}`);
      managedResearchDocuments.set(note.slug, { ...note, path });
      rebuildResearchIndex();
      els.existingResearch.value = note.slug;
      setStatus(els.researchPublishStatus, 'Published successfully. GitHub Pages normally updates within one or two minutes.', 'success', `research-note.html?note=${encodeURIComponent(note.slug)}`);
    } catch (error) { setStatus(els.researchPublishStatus, error.message, 'error'); }
    finally { els.publishResearch.disabled = false; }
  }

  function buildPaperDocument() {
    const sections = textToSections(els.paperSections.value).map(({ id, title, paragraphs }) => ({ id, title, paragraphs }));
    const equations = splitPipes(els.paperEquations.value).map(([label, latex, note]) => ({ label, latex, note })).filter((item) => item.label || item.latex || item.note);
    const comments = splitPipes(els.paperComments.value).map(([label, title, text]) => ({ label, title, text })).filter((item) => item.label || item.title || item.text);
    const connections = splitPipes(els.paperConnections.value, 2).map(([label, href]) => ({ label, href })).filter((item) => item.label || item.href);
    return {
      slug: slugify(els.paperSlug.value), track: els.paperTrack.value, title: els.paperTitle.value.trim(), shortTitle: els.paperShortTitle.value.trim(),
      authors: lines(els.paperAuthors.value), year: Number(els.paperYear.value), venue: els.paperVenue.value.trim(), arxivId: els.paperArxiv.value.trim(), doi: els.paperDoi.value.trim(),
      sourceUrl: els.paperSourceUrl.value.trim(), pdfUrl: els.paperPdfUrl.value.trim() || els.paperSourceUrl.value.trim(), readingStatus: els.paperStatus.value.trim() || 'Analysis draft',
      readingDate: els.paperReadingDate.value || today(), updated: today(), readingTime: Number(els.paperMinutes.value) || 15, tags: lines(els.paperTags.value), citation: els.paperCitation.value.trim(),
      abstractSummary: els.paperAbstract.value.trim(), whyReading: els.paperWhy.value.trim(), readingQuestion: els.paperQuestion.value.trim(), thesis: els.paperThesis.value.trim(),
      contributions: lines(els.paperContributions.value), equations, sections, comments, strengths: lines(els.paperStrengths.value), limitations: lines(els.paperLimitations.value),
      questions: lines(els.paperQuestions.value), connections, managedBy: currentUser?.login || 'unknown'
    };
  }

  function validatePaper(paper) {
    if (!paper.slug || !paper.title || !paper.shortTitle || !paper.authors.length || !paper.year || !paper.venue) return 'Complete the paper identity, authors, year, and venue.';
    if (!paper.sourceUrl || !/^https?:\/\//i.test(paper.sourceUrl)) return 'Add a valid source URL beginning with http:// or https://.';
    if (!paper.abstractSummary || !paper.whyReading || !paper.readingQuestion || !paper.thesis) return 'Complete the reading orientation fields.';
    if (!paper.sections.length || paper.sections.some((section) => !section.paragraphs.length)) return 'Add at least one complete analysis section using a ## heading.';
    if (paper.equations.some((equation) => !equation.label || !equation.latex || !equation.note)) return 'Every equation needs a label, LaTeX expression, and meaning.';
    if (paper.comments.some((comment) => !comment.label || !comment.title || !comment.text)) return 'Every comment needs a label, title, and text.';
    return '';
  }

  function renderPaperPreview() {
    const paper = buildPaperDocument();
    els.paperPreview.innerHTML = `<article class="wiki-preview-article"><span>${paper.year || 'Year'} · ${escapeHTML(paper.readingStatus)}</span><h2>${escapeHTML(paper.shortTitle || paper.title || 'Untitled paper')}</h2><p>${escapeHTML(paper.authors.join(', ') || 'Authors')}</p><section><h3>Reading question</h3><p>${escapeHTML(paper.readingQuestion || 'State the question guiding your reading.')}</p></section>${paper.sections.slice(0, 2).map((section) => `<section><h3>${escapeHTML(section.title)}</h3>${section.paragraphs.slice(0, 2).map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`).join('')}</section>`).join('')}</article>`;
    window.siteUtils?.renderMath(els.paperPreview);
  }

  function resetPaperForm() {
    els.paperForm.reset();
    els.paperYear.value = new Date().getFullYear();
    els.paperReadingDate.value = today();
    els.paperStatus.value = 'Analysis draft';
    els.paperMinutes.value = 15;
    setStatus(els.paperPublishStatus, '', '');
    renderPaperPreview();
  }

  function loadSelectedPaper() {
    const paper = mergedBySlug(window.quantumPapers, managedPaperDocuments).find((item) => item.slug === els.existingPaper.value);
    if (!paper) return resetPaperForm();
    const values = {
      paperTrack: paper.track, paperSlug: paper.slug, paperTitle: paper.title, paperShortTitle: paper.shortTitle, paperAuthors: (paper.authors || []).join('\n'), paperYear: paper.year,
      paperVenue: paper.venue, paperArxiv: paper.arxivId, paperDoi: paper.doi, paperSourceUrl: paper.sourceUrl, paperPdfUrl: paper.pdfUrl, paperStatus: paper.readingStatus,
      paperReadingDate: paper.readingDate, paperMinutes: paper.readingTime, paperTags: (paper.tags || []).join('\n'), paperCitation: paper.citation,
      paperAbstract: paper.abstractSummary, paperWhy: paper.whyReading, paperQuestion: paper.readingQuestion, paperThesis: paper.thesis, paperContributions: (paper.contributions || []).join('\n'),
      paperEquations: (paper.equations || []).map((item) => `${item.label} | ${item.latex} | ${item.note}`).join('\n'), paperSections: sectionsToText(paper.sections),
      paperComments: (paper.comments || []).map((item) => `${item.label} | ${item.title} | ${item.text}`).join('\n'), paperStrengths: (paper.strengths || []).join('\n'),
      paperLimitations: (paper.limitations || []).join('\n'), paperQuestions: (paper.questions || []).join('\n'), paperConnections: (paper.connections || []).map((item) => `${item.label} | ${item.href}`).join('\n')
    };
    Object.entries(values).forEach(([id, value]) => { document.getElementById(id).value = value || ''; });
    els.paperConfirm.checked = false;
    renderPaperPreview();
  }

  async function publishPaper(event) {
    event.preventDefault();
    if (!accessToken || !currentUser) return setStatus(els.paperPublishStatus, 'Connect an authorized GitHub account first.', 'error');
    const paper = buildPaperDocument();
    const validationError = validatePaper(paper);
    if (validationError) return setStatus(els.paperPublishStatus, validationError, 'error');
    const path = `content/papers/articles/${paper.slug}.json`;
    els.publishPaper.disabled = true;
    setStatus(els.paperPublishStatus, 'Publishing the analysis and updating the Paper index…', 'working');
    try {
      const existing = await getRepositoryFile(path);
      await putRepositoryFile(path, paper, `Publish paper analysis: ${paper.shortTitle}`, existing?.sha || null);
      const updatedAt = new Date().toISOString();
      await updateCollectionManifest(repository.paperManifestPath, 'papers', { slug: paper.slug, title: paper.title, path, updatedAt }, `Update Paper index: ${paper.shortTitle}`);
      managedPaperDocuments.set(paper.slug, { ...paper, path });
      rebuildPaperIndex();
      els.existingPaper.value = paper.slug;
      setStatus(els.paperPublishStatus, 'Published successfully. GitHub Pages normally updates within one or two minutes.', 'success', `paper.html?paper=${encodeURIComponent(paper.slug)}`);
    } catch (error) { setStatus(els.paperPublishStatus, error.message, 'error'); }
    finally { els.publishPaper.disabled = false; }
  }

  function setStatus(element, message, type, link = '') {
    element.className = `wiki-editor-status ${type || ''}`;
    element.textContent = message;
    if (link) {
      element.append(' ');
      const anchor = document.createElement('a');
      anchor.href = link;
      anchor.textContent = 'Open published page →';
      element.appendChild(anchor);
    }
  }

  function cacheElements() {
    const map = {
      auth: 'editorAuth', authForm: 'editorAuthForm', token: 'githubToken', connect: 'editorConnect', authStatus: 'editorAuthStatus', workspace: 'editorWorkspace', identity: 'editorIdentity', disconnect: 'editorDisconnect', existing: 'existingArticle', form: 'wikiArticleForm', chapter: 'articleChapter', slug: 'articleSlug', newChapter: 'newChapterFields', chapterNumber: 'chapterNumber', chapterAccent: 'chapterAccent', chapterTitle: 'chapterTitle', chapterSummary: 'chapterSummary', title: 'articleTitle', summary: 'articleSummary', level: 'articleLevel', minutes: 'articleMinutes', prerequisites: 'articlePrerequisites', outcomes: 'articleOutcomes', workedTitle: 'workedTitle', workedProblem: 'workedProblem', workedSteps: 'workedSteps', workedResult: 'workedResult', labTitle: 'labTitle', labCode: 'labCode', connections: 'articleConnections', confirm: 'publishConfirm', publish: 'publishArticle', publishStatus: 'publishStatus', preview: 'articlePreview'
    };
    Object.entries(map).forEach(([key, id]) => { els[key] = document.getElementById(id); });
    const extended = {
      existingResearch: 'existingResearch', researchForm: 'researchNoteForm', researchTrack: 'researchTrack', researchSlug: 'researchSlug', researchDate: 'researchDate', researchStatus: 'researchStatus', researchMaturity: 'researchMaturity', researchMinutes: 'researchMinutes', researchTitle: 'researchTitle', researchSubtitle: 'researchSubtitle', researchQuestion: 'researchQuestion', researchAbstract: 'researchAbstract', researchTags: 'researchTags', researchPrerequisites: 'researchPrerequisites', researchFindings: 'researchFindings', researchSections: 'researchSections', researchEquations: 'researchEquations', researchLabTitle: 'researchLabTitle', researchLabTool: 'researchLabTool', researchLabInstall: 'researchLabInstall', researchLabCode: 'researchLabCode', researchLabExpected: 'researchLabExpected', researchLabInterpretation: 'researchLabInterpretation', researchLimitations: 'researchLimitations', researchOpenQuestions: 'researchOpenQuestions', researchConnections: 'researchConnections', researchSources: 'researchSources', researchConfirm: 'researchConfirm', publishResearch: 'publishResearch', researchPublishStatus: 'researchPublishStatus', researchPreview: 'researchPreview',
      existingPaper: 'existingPaper', paperForm: 'paperAnalysisForm', paperTrack: 'paperTrack', paperSlug: 'paperSlug', paperTitle: 'paperTitle', paperShortTitle: 'paperShortTitle', paperAuthors: 'paperAuthors', paperYear: 'paperYear', paperVenue: 'paperVenue', paperArxiv: 'paperArxiv', paperDoi: 'paperDoi', paperSourceUrl: 'paperSourceUrl', paperPdfUrl: 'paperPdfUrl', paperStatus: 'paperStatus', paperReadingDate: 'paperReadingDate', paperMinutes: 'paperMinutes', paperTags: 'paperTags', paperCitation: 'paperCitation', paperAbstract: 'paperAbstract', paperWhy: 'paperWhy', paperQuestion: 'paperQuestion', paperThesis: 'paperThesis', paperContributions: 'paperContributions', paperEquations: 'paperEquations', paperSections: 'paperSections', paperComments: 'paperComments', paperStrengths: 'paperStrengths', paperLimitations: 'paperLimitations', paperQuestions: 'paperQuestions', paperConnections: 'paperConnections', paperConfirm: 'paperConfirm', publishPaper: 'publishPaper', paperPublishStatus: 'paperPublishStatus', paperPreview: 'paperPreview'
    };
    Object.entries(extended).forEach(([key, id]) => { els[key] = document.getElementById(id); });
  }

  function init() {
    cacheElements();
    if (!els.form || !els.researchForm || !els.paperForm || !window.quantumBook) return;
    populateChapterSelect();
    populateTrackSelects();
    resetForm();
    resetResearchForm();
    resetPaperForm();
    rebuildResearchIndex();
    rebuildPaperIndex();
    setEditorMode(new URLSearchParams(window.location.search).get('type') || 'wiki');

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
    document.querySelectorAll('[data-editor-mode]').forEach((button) => button.addEventListener('click', () => setEditorMode(button.dataset.editorMode)));

    els.existingResearch.addEventListener('change', loadSelectedResearch);
    els.researchTitle.addEventListener('input', () => { if (!els.researchSlug.value.trim()) els.researchSlug.value = slugify(els.researchTitle.value); });
    els.researchSlug.addEventListener('input', () => { els.researchSlug.value = slugify(els.researchSlug.value); });
    els.researchForm.querySelectorAll('input, textarea, select').forEach((field) => field.addEventListener('input', renderResearchPreview));
    els.researchForm.addEventListener('submit', publishResearch);

    els.existingPaper.addEventListener('change', loadSelectedPaper);
    els.paperTitle.addEventListener('input', () => {
      if (!els.paperShortTitle.value.trim()) els.paperShortTitle.value = els.paperTitle.value;
      if (!els.paperSlug.value.trim()) els.paperSlug.value = slugify(els.paperTitle.value);
    });
    els.paperSlug.addEventListener('input', () => { els.paperSlug.value = slugify(els.paperSlug.value); });
    els.paperForm.querySelectorAll('input, textarea, select').forEach((field) => field.addEventListener('input', renderPaperPreview));
    els.paperForm.addEventListener('submit', publishPaper);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
