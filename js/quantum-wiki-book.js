(function () {
  'use strict';

  const book = window.quantumBook;
  if (!book) return;

  const els = {};
  let flatArticles = [];
  const preferenceKey = 'quantum-wiki-layout-v2';
  let layoutPreferences = {
    sidebarHidden: false,
    searchHidden: true,
    tocHidden: false,
    focus: false
  };

  const escapeHTML = (value = '') => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const routeFor = (chapter, article) => `#${chapter.slug}/${article.slug}`;

  function buildIndex() {
    flatArticles = book.chapters.flatMap((chapter) => chapter.articles.map((item, index) => ({
      ...item,
      chapter,
      index,
      route: routeFor(chapter, item),
      searchText: [
        chapter.title,
        chapter.summary,
        item.title,
        item.summary,
        ...(item.prerequisites || []),
        ...(item.outcomes || []),
        ...(item.sections || []).flatMap((section) => [section.title, section.body]),
        ...(item.equations || []).flatMap((equation) => [equation.label, equation.note]),
        ...(item.exercises || []).flatMap((exercise) => [exercise.prompt, exercise.answer])
      ].join(' ').toLowerCase()
    })));
  }

  function articleByRoute(route) {
    const normalized = route.replace(/^#/, '').replace(/^\//, '');
    return flatArticles.find((item) => `${item.chapter.slug}/${item.slug}` === normalized);
  }

  function connectionHref(value) {
    if (/^https?:\/\//.test(value)) return value;
    if (/\.html(?:#|$)/.test(value)) return value;
    return `#${value}`;
  }

  function connectionLabel(value) {
    const internal = articleByRoute(value);
    if (internal) return internal.title;
    const pageLabels = {
      'papers.html': 'Paper Analysis Library',
      'blog.html': 'Daily Research Journal',
      'research.html': 'Research Directions',
      'research.html#quantum-linear-solvers': 'Quantum Linear Solvers research note'
    };
    return pageLabels[value] || value;
  }

  function renderSidebar(query = '') {
    const needle = query.trim().toLowerCase();
    const active = articleByRoute(window.location.hash);

    els.topics.innerHTML = book.chapters.map((chapter) => {
      const matchingArticles = chapter.articles.filter((item) => {
        if (!needle) return true;
        const indexed = flatArticles.find((candidate) => candidate.slug === item.slug && candidate.chapter.slug === chapter.slug);
        return indexed && indexed.searchText.includes(needle);
      });
      const chapterMatches = chapter.title.toLowerCase().includes(needle) || chapter.summary.toLowerCase().includes(needle);
      if (needle && !matchingArticles.length && !chapterMatches) return '';
      const shownArticles = matchingArticles.length ? matchingArticles : chapter.articles;
      const isActiveChapter = active && active.chapter.slug === chapter.slug;
      return `
        <details class="book-chapter-nav" ${isActiveChapter || needle ? 'open' : ''}>
          <summary>
            <span class="book-chapter-number">${String(chapter.number).padStart(2, '0')}</span>
            <span><strong>${escapeHTML(chapter.title)}</strong><small>${chapter.articles.length} lessons</small></span>
          </summary>
          <ol>
            ${shownArticles.map((item, index) => {
              const isActive = active && active.chapter.slug === chapter.slug && active.slug === item.slug;
              return `<li><a href="${routeFor(chapter, item)}" class="${isActive ? 'active' : ''}"><span>${chapter.articles.indexOf(item) + 1}</span>${escapeHTML(item.title)}</a></li>`;
            }).join('')}
          </ol>
        </details>`;
    }).join('') || '<p class="book-empty">No lessons match this search.</p>';
  }

  function renderLanding() {
    setViewMode('home');
    document.title = `${book.title} | Do Quang Hao`;
    els.breadcrumb.innerHTML = '<a href="#">Textbook</a><span aria-hidden="true">/</span><span>Contents</span>';
    els.content.innerHTML = `
      <article class="book-landing">
        <header class="book-hero">
          <p class="book-kicker">Book edition · living knowledge base</p>
          <h1>${escapeHTML(book.title)}</h1>
          <p class="book-hero-summary">${escapeHTML(book.subtitle)}</p>
          <div class="book-stats" aria-label="Book statistics">
            <span><strong>${book.chapters.length}</strong> chapters</span>
            <span><strong>${flatArticles.length}</strong> complete lessons</span>
            <span><strong>${flatArticles.reduce((sum, item) => sum + item.minutes, 0)}</strong> guided minutes</span>
          </div>
          <div class="book-hero-actions">
            <a class="btn-primary" href="${flatArticles[0].route}">Begin with Chapter 1</a>
            <a class="btn-secondary" href="start-here.html">Open the 11-week roadmap</a>
          </div>
        </header>

        <section class="book-intro-grid" aria-label="How to use this textbook">
          <div>
            <p class="book-section-label">Reading method</p>
            <h2>Learn in connected layers</h2>
            <p>Every lesson begins with prerequisites and learning outcomes, develops the idea from a concrete example, then ends with derivations, code, exercises, sources, and links to the next concept. Use the table of contents to read linearly or search the full book for a term.</p>
          </div>
          <ol class="book-principles">
            ${book.principles.map((principle, index) => `<li><span>${String(index + 1).padStart(2, '0')}</span>${escapeHTML(principle)}</li>`).join('')}
          </ol>
        </section>

        <section class="book-path-section">
          <p class="book-section-label">Suggested routes</p>
          <h2>Choose a reading path</h2>
          <div class="book-path-grid">
            ${book.paths.map((path) => `
              <article>
                <span>${escapeHTML(path.chapters)}</span>
                <h3>${escapeHTML(path.name)}</h3>
                <p>${escapeHTML(path.detail)}</p>
              </article>`).join('')}
          </div>
        </section>

        <section class="book-contents-section">
          <div class="book-section-heading">
            <div><p class="book-section-label">Complete contents</p><h2>From foundations to research</h2></div>
            <p>The first eight chapters establish the shared language. Later chapters turn it into simulations, hybrid algorithms, information theory, and research practice.</p>
          </div>
          <div class="book-chapter-grid">
            ${book.chapters.map((chapter) => `
              <article class="book-chapter-card">
                <div class="book-chapter-card-top"><span>Chapter ${String(chapter.number).padStart(2, '0')}</span><small>${escapeHTML(chapter.accent)}</small></div>
                <h3>${escapeHTML(chapter.title)}</h3>
                <p>${escapeHTML(chapter.summary)}</p>
                <ol>
                  ${chapter.articles.map((item) => `<li><a href="${routeFor(chapter, item)}">${escapeHTML(item.title)} <span aria-hidden="true">→</span></a></li>`).join('')}
                </ol>
              </article>`).join('')}
          </div>
        </section>
      </article>`;

    els.toc.innerHTML = `
      <div class="book-toc-home">
        <p class="book-toc-label">About this edition</p>
        <p>${escapeHTML(book.edition)}</p>
        <a href="${flatArticles[0].route}">Start reading <span aria-hidden="true">→</span></a>
      </div>`;
    setViewStatus(`${book.chapters.length} chapters · ${flatArticles.length} lessons`);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function renderSearchResults(query) {
    setViewMode('search');
    const needle = query.trim().toLowerCase();
    const results = flatArticles.filter((item) => item.searchText.includes(needle));
    document.title = `Search: ${query} | ${book.title}`;
    els.breadcrumb.innerHTML = '<a href="#">Textbook</a><span aria-hidden="true">/</span><span>Search</span>';
    els.content.innerHTML = `
      <section class="book-search-results">
        <p class="book-kicker">Full-book search</p>
        <h1>${results.length} result${results.length === 1 ? '' : 's'} for “${escapeHTML(query)}”</h1>
        <p>Search covers lesson explanations, prerequisites, equations, worked examples, and exercise answers.</p>
        <div class="book-search-list">
          ${results.map((item) => `
            <a href="${item.route}">
              <span>Chapter ${String(item.chapter.number).padStart(2, '0')} · ${escapeHTML(item.level)}</span>
              <h2>${escapeHTML(item.title)}</h2>
              <p>${escapeHTML(item.summary)}</p>
              <small>${item.minutes} min reading · ${item.sections.length} concept sections</small>
            </a>`).join('') || '<div class="book-no-results"><h2>No matching lesson</h2><p>Try a broader term such as “phase”, “measurement”, “noise”, “Qiskit”, “kernel”, or “linear solver”.</p></div>'}
        </div>
      </section>`;
    els.toc.innerHTML = '<p class="toc-empty-msg">Choose a result to open its full lesson.</p>';
    setViewStatus(`${results.length} search result${results.length === 1 ? '' : 's'}`);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function renderArticle(item) {
    setViewMode('article');
    const currentIndex = flatArticles.findIndex((candidate) => candidate.route === item.route);
    const previous = flatArticles[currentIndex - 1];
    const next = flatArticles[currentIndex + 1];
    const chapter = item.chapter;
    document.title = `${item.title} | ${book.title}`;
    els.breadcrumb.innerHTML = `
      <a href="#">Textbook</a><span aria-hidden="true">/</span>
      <span>Chapter ${String(chapter.number).padStart(2, '0')}</span><span aria-hidden="true">/</span>
      <span>${escapeHTML(item.title)}</span>`;

    els.content.innerHTML = `
      <article class="book-article">
        <header class="book-article-header">
          <p class="book-kicker">Chapter ${String(chapter.number).padStart(2, '0')} · Lesson ${item.index + 1} of ${chapter.articles.length}</p>
          <h1>${escapeHTML(item.title)}</h1>
          <p class="book-article-summary">${escapeHTML(item.summary)}</p>
          <div class="book-article-meta">
            <span>${escapeHTML(item.level)}</span><span>${item.minutes} min</span><span>${item.sections.length} concept sections</span><span>${item.exercises.length} exercises</span>
          </div>
        </header>

        <section class="book-preflight" id="before-you-begin">
          <div>
            <p class="book-section-label">Before you begin</p>
            <h2>Prerequisites</h2>
            <ul>${item.prerequisites.map((value) => `<li>${escapeHTML(value)}</li>`).join('') || '<li>No formal prerequisite; begin here.</li>'}</ul>
          </div>
          <div>
            <p class="book-section-label">After this lesson</p>
            <h2>Learning outcomes</h2>
            <ul>${item.outcomes.map((value) => `<li>${escapeHTML(value)}</li>`).join('')}</ul>
          </div>
        </section>

        <section class="book-reading-note" aria-label="Reading guidance">
          <strong>How to read this lesson</strong>
          <p>Pause at each equation and explain every symbol, dimension, and assumption. Predict the worked example and lab output before opening the solution.</p>
        </section>

        ${item.sections.map((section, index) => `
          <section class="book-section book-concept-section" id="concept-${index + 1}">
            <p class="book-section-label">${String(index + 1).padStart(2, '0')} · Core concept</p>
            <h2>${escapeHTML(section.title)}</h2>
            <p>${escapeHTML(section.body)}</p>
          </section>`).join('')}

        <section class="book-section" id="equations">
          <p class="book-section-label">Reference</p>
          <h2>Equations to connect with this topic</h2>
          <div class="book-equation-list">
            ${item.equations.map((equation) => `
              <article class="book-equation-card">
                <h3>${escapeHTML(equation.label)}</h3>
                <div class="math-block">$$${equation.latex}$$</div>
                <p>${escapeHTML(equation.note)}</p>
              </article>`).join('')}
          </div>
        </section>

        ${item.worked ? `
          <section class="book-section" id="worked-example">
            <p class="book-section-label">Guided derivation</p>
            <h2>Worked example: ${escapeHTML(item.worked.title)}</h2>
            <div class="book-worked-example">
              <div class="book-problem"><span>Problem</span><p>${escapeHTML(item.worked.problem)}</p></div>
              <ol>${item.worked.steps.map((step) => `<li>${escapeHTML(step)}</li>`).join('')}</ol>
              <div class="book-result"><span>Result</span><p>${escapeHTML(item.worked.result)}</p></div>
            </div>
          </section>` : ''}

        ${item.lab ? `
          <section class="book-section" id="qiskit-lab">
            <p class="book-section-label">Computational lab</p>
            <h2>${escapeHTML(item.lab.title)}</h2>
            <p>Run this small experiment locally. Write the expected state, distribution, or value before executing it, then explain any difference.</p>
            <div class="book-code-block">
              <div><span>Python · Qiskit</span><button class="book-copy-code" type="button">Copy code</button></div>
              <pre><code>${escapeHTML(item.lab.code)}</code></pre>
            </div>
          </section>` : ''}

        <section class="book-section" id="exercises">
          <p class="book-section-label">Active recall</p>
          <h2>Exercises, hints, and solutions</h2>
          <div class="book-exercise-list">
            ${item.exercises.map((exercise, index) => `
              <article class="book-exercise">
                <span>Exercise ${index + 1}</span>
                <h3>${escapeHTML(exercise.prompt)}</h3>
                <details><summary>Open hint</summary><p>${escapeHTML(exercise.hint)}</p></details>
                <details><summary>Check solution</summary><p>${escapeHTML(exercise.answer)}</p></details>
              </article>`).join('')}
          </div>
        </section>

        <section class="book-section" id="sources-connections">
          <p class="book-section-label">Continue studying</p>
          <h2>Sources and connected lessons</h2>
          <div class="book-source-grid">
            <div>
              <h3>Chapter sources</h3>
              <ul>${chapter.references.map((reference) => `<li><a href="${escapeHTML(reference.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(reference.title)} <span aria-hidden="true">↗</span></a><p>${escapeHTML(reference.note)}</p></li>`).join('')}</ul>
            </div>
            <div>
              <h3>Connected pages</h3>
              <ul>${item.connections.map((value) => {
                const href = connectionHref(value);
                const externalPage = /\.html/.test(href);
                return `<li><a href="${escapeHTML(href)}" ${/^https?:/.test(href) ? 'target="_blank" rel="noopener noreferrer"' : ''}>${escapeHTML(connectionLabel(value))} <span aria-hidden="true">${externalPage ? '↗' : '→'}</span></a></li>`;
              }).join('')}</ul>
            </div>
          </div>
        </section>

        <nav class="book-lesson-nav" aria-label="Previous and next lessons">
          ${previous ? `<a href="${previous.route}" class="previous"><span>Previous lesson</span><strong>← ${escapeHTML(previous.title)}</strong></a>` : '<span></span>'}
          ${next ? `<a href="${next.route}" class="next"><span>Next lesson</span><strong>${escapeHTML(next.title)} →</strong></a>` : '<a href="papers.html" class="next"><span>Continue your research</span><strong>Open the Paper Library →</strong></a>'}
        </nav>
      </article>`;

    renderSidebar(els.search.value);
    renderMath();
    renderTOC();
    bindCopyButtons();
    setViewStatus(`Chapter ${String(chapter.number).padStart(2, '0')} · Lesson ${item.index + 1} of ${chapter.articles.length}`);
    if (window.innerWidth <= 1050) els.sidebar.classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function renderMath() {
    if (typeof window.renderMathInElement !== 'function') return;
    window.renderMathInElement(els.content, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ],
      ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
      throwOnError: false
    });
  }

  function renderTOC() {
    const headings = [...els.content.querySelectorAll('.book-article section[id] > h2')];
    const active = articleByRoute(window.location.hash);
    if (!active) return;
    els.toc.innerHTML = `
      <div class="book-toc-progress">
        <span>Book progress</span>
        <strong>${flatArticles.findIndex((item) => item.route === active.route) + 1} / ${flatArticles.length}</strong>
      </div>
      <p class="book-toc-label">On this lesson</p>
      <ol class="toc-list">
        ${headings.map((heading) => `<li><a href="#${heading.id}" data-scroll-target="${heading.id}">${escapeHTML(heading.textContent)}</a></li>`).join('')}
      </ol>
      <a class="book-toc-chapter" href="#"><span>Chapter ${String(active.chapter.number).padStart(2, '0')}</span>${escapeHTML(active.chapter.title)}</a>`;

    els.toc.querySelectorAll('[data-scroll-target]').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById(link.dataset.scrollTarget)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function bindCopyButtons() {
    els.content.querySelectorAll('.book-copy-code').forEach((button) => {
      button.addEventListener('click', async () => {
        const code = button.closest('.book-code-block')?.querySelector('code')?.textContent || '';
        try {
          await navigator.clipboard.writeText(code);
          button.textContent = 'Copied';
          setTimeout(() => { button.textContent = 'Copy code'; }, 1500);
        } catch (error) {
          button.textContent = 'Select and copy';
        }
      });
    });
  }

  function readLayoutPreferences() {
    try {
      const saved = JSON.parse(localStorage.getItem(preferenceKey));
      if (saved && typeof saved === 'object') layoutPreferences = { ...layoutPreferences, ...saved, focus: false };
    } catch (error) {
      // Local preferences are optional; the default reading layout remains usable.
    }
  }

  function saveLayoutPreferences() {
    try {
      localStorage.setItem(preferenceKey, JSON.stringify({
        sidebarHidden: layoutPreferences.sidebarHidden,
        searchHidden: layoutPreferences.searchHidden,
        tocHidden: layoutPreferences.tocHidden
      }));
    } catch (error) {
      // Ignore storage restrictions in private browsing contexts.
    }
  }

  function isCompactLayout() {
    return window.matchMedia('(max-width: 1050px)').matches;
  }

  function setViewMode(mode) {
    document.body.classList.toggle('wiki-home-view', mode === 'home');
    document.body.classList.toggle('wiki-search-view', mode === 'search');
    document.body.classList.toggle('wiki-article-view', mode === 'article');
    if (els.tocToggle) els.tocToggle.disabled = mode !== 'article';
    applyLayoutPreferences();
  }

  function setViewStatus(message) {
    if (els.viewStatus) els.viewStatus.textContent = message;
  }

  function applyLayoutPreferences() {
    document.body.classList.toggle('wiki-sidebar-collapsed', layoutPreferences.sidebarHidden && !isCompactLayout());
    document.body.classList.toggle('wiki-search-collapsed', layoutPreferences.searchHidden);
    document.body.classList.toggle('wiki-toc-collapsed', layoutPreferences.tocHidden);
    document.body.classList.toggle('wiki-focus-mode', layoutPreferences.focus);

    if (els.sidebarToggle) {
      const sidebarVisible = isCompactLayout() ? els.sidebar.classList.contains('active') : !layoutPreferences.sidebarHidden;
      els.sidebarToggle.setAttribute('aria-expanded', String(sidebarVisible));
      els.sidebarToggle.classList.toggle('is-active', sidebarVisible);
    }
    if (els.searchToggle) {
      els.searchToggle.setAttribute('aria-expanded', String(!layoutPreferences.searchHidden));
      els.searchToggle.classList.toggle('is-active', !layoutPreferences.searchHidden);
    }
    if (els.tocToggle) {
      const tocVisible = !layoutPreferences.tocHidden && document.body.classList.contains('wiki-article-view');
      els.tocToggle.setAttribute('aria-expanded', String(tocVisible));
      els.tocToggle.classList.toggle('is-active', tocVisible);
    }
    if (els.focusToggle) {
      els.focusToggle.setAttribute('aria-pressed', String(layoutPreferences.focus));
      els.focusToggle.classList.toggle('is-active', layoutPreferences.focus);
      els.focusToggle.querySelector('span:last-child').textContent = layoutPreferences.focus ? 'Exit focus' : 'Focus';
    }
  }

  function toggleSidebar() {
    if (isCompactLayout()) {
      els.sidebar.classList.toggle('active');
    } else {
      layoutPreferences.sidebarHidden = !layoutPreferences.sidebarHidden;
      saveLayoutPreferences();
    }
    applyLayoutPreferences();
  }

  function showSearch() {
    layoutPreferences.searchHidden = false;
    if (!isCompactLayout()) layoutPreferences.sidebarHidden = false;
    else els.sidebar.classList.add('active');
    saveLayoutPreferences();
    applyLayoutPreferences();
    window.requestAnimationFrame(() => els.search.focus());
  }

  function hideSearch() {
    layoutPreferences.searchHidden = true;
    saveLayoutPreferences();
    applyLayoutPreferences();
  }

  function handleRoute() {
    const route = window.location.hash;
    if (!route || route === '#') {
      renderLanding();
      renderSidebar();
      return;
    }
    const item = articleByRoute(route);
    if (item) {
      renderArticle(item);
      return;
    }
    renderLanding();
    renderSidebar();
  }

  function init() {
    els.sidebar = document.getElementById('wikiSidebar');
    els.topics = document.getElementById('wikiTopicsList');
    els.search = document.getElementById('wikiSearch');
    els.breadcrumb = document.getElementById('wikiBreadcrumb');
    els.content = document.getElementById('wikiTopicContent');
    els.toc = document.getElementById('tocNav');
    els.sidebarToggle = document.getElementById('wikiSidebarToggle');
    els.searchToggle = document.getElementById('wikiSearchToggle');
    els.searchClose = document.getElementById('wikiSearchClose');
    els.tocToggle = document.getElementById('wikiTocToggle');
    els.focusToggle = document.getElementById('wikiFocusToggle');
    els.viewStatus = document.getElementById('wikiViewStatus');
    if (!els.sidebar || !els.topics || !els.search || !els.breadcrumb || !els.content || !els.toc) return;

    readLayoutPreferences();
    buildIndex();
    renderSidebar();
    handleRoute();
    applyLayoutPreferences();

    window.addEventListener('hashchange', () => {
      els.search.value = '';
      handleRoute();
    });
    els.search.addEventListener('input', () => {
      const query = els.search.value.trim();
      renderSidebar(query);
      if (query.length >= 2) renderSearchResults(query);
      else if (query.length === 0) handleRoute();
    });

    els.sidebarToggle?.addEventListener('click', toggleSidebar);
    els.searchToggle?.addEventListener('click', () => {
      if (layoutPreferences.searchHidden) showSearch();
      else hideSearch();
    });
    els.searchClose?.addEventListener('click', hideSearch);
    els.tocToggle?.addEventListener('click', () => {
      layoutPreferences.tocHidden = !layoutPreferences.tocHidden;
      saveLayoutPreferences();
      applyLayoutPreferences();
    });
    els.focusToggle?.addEventListener('click', () => {
      layoutPreferences.focus = !layoutPreferences.focus;
      applyLayoutPreferences();
    });
    window.addEventListener('resize', applyLayoutPreferences);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && els.sidebar.classList.contains('active')) {
        els.sidebar.classList.remove('active');
        applyLayoutPreferences();
      }
      if (event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey && !/INPUT|TEXTAREA/.test(document.activeElement?.tagName || '')) {
        event.preventDefault();
        showSearch();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
