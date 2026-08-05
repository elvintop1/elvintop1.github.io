(function() {
  const container = document.getElementById('modulePageContent');
  if (!container || !window.quantumWeeks || !window.quantumModules) return;

  const escapeHtml = value => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const requestedWeek = Number(new URLSearchParams(window.location.search).get('week'));
  const week = window.quantumWeeks.find(item => item.week === requestedWeek);
  const module = window.quantumModules[requestedWeek];
  const bookGuide = window.quantumCourse?.bookGuides?.[requestedWeek];

  if (!week || !module) {
    document.title = 'Module not found | Do Quang Hao';
    container.innerHTML = `<section class="lesson-not-found"><p class="content-kicker">Connected curriculum</p><h1>Module not found</h1><p>Connected lecture modules are currently available for completed Weeks 1–11.</p><a class="btn-ghost" href="index.html">Return to the roadmap</a></section>`;
    return;
  }

  const equationFor = index => week.equations[index % week.equations.length];
  document.title = `Week ${week.week}: ${module.title} | Connected Quantum Lecture`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', module.thesis);

  container.innerHTML = `
    <nav class="lesson-breadcrumb" aria-label="Breadcrumb">
      <a href="index.html">Quantum Hub</a><span aria-hidden="true">/</span><span aria-current="page">Week ${week.week} connected lecture</span>
    </nav>

    <header class="module-hero">
      <div class="lesson-meta-line"><span>${escapeHtml(week.stage)}</span><span>Week ${week.week}</span><span>${module.lessons.length} linked chapters</span></div>
      <h1>${escapeHtml(module.title)}</h1>
      <p class="module-essential-question">${escapeHtml(module.essentialQuestion)}</p>
      <p class="module-thesis">${escapeHtml(module.thesis)}</p>
      <div class="module-hero-actions">
        <a class="btn-primary" href="#module-opening">Begin the lecture</a>
        <a class="btn-ghost" href="index.html#week-${week.week}">Return to roadmap</a>
      </div>
    </header>

    <div class="module-reading-layout">
      <aside class="module-outline" aria-label="Module outline">
        <p class="content-kicker">Module outline</p>
        <ol>
          ${module.lessons.map((item, index) => `<li><a href="#chapter-${index + 1}"><span>${String(index + 1).padStart(2, '0')}</span>${escapeHtml(item.title)}</a></li>`).join('')}
        </ol>
        <a class="sidebar-foundation-link" href="start-here.html"><span>Need foundations?</span><strong>Review mathematics and physics</strong></a>
      </aside>

      <article class="module-reading">
        <section class="module-opening" id="module-opening">
          <p class="content-kicker">Module opening</p>
          <h2>The argument of this week</h2>
          ${module.introduction.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('')}
          <div class="module-path-grid">
            ${module.lessons.map((item, index) => `<a href="#chapter-${index + 1}"><span>${String(index + 1).padStart(2, '0')}</span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.question)}</small></a>`).join('')}
          </div>
        </section>

        ${module.lessons.map((item, index) => {
          const lesson = week.lessons.find(candidate => candidate.title === item.title);
          const equation = equationFor(index);
          return `
            <section class="module-chapter" id="chapter-${index + 1}">
              <p class="content-kicker">Chapter ${String(index + 1).padStart(2, '0')}</p>
              <h2>${escapeHtml(item.title)}</h2>
              <p class="module-chapter-question">${escapeHtml(item.question)}</p>
              <div class="lecture-prose">${item.explanation.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('')}</div>
              <article class="module-equation-bridge">
                <span>Mathematical anchor</span>
                <h3>${escapeHtml(equation.label)}</h3>
                <div class="math-block">$$${equation.latex}$$</div>
                <p>${escapeHtml(equation.note)}</p>
              </article>
              <aside class="lecture-checkpoint"><span>Teaching checkpoint</span><p>${escapeHtml(item.checkpoint)}</p></aside>
              <div class="lecture-transition"><strong>Why the next idea follows</strong><p>${escapeHtml(item.transition)}</p></div>
              ${lesson ? `<a class="module-deep-link" href="${window.getQuantumLessonHref(week, lesson)}">Open exercises, derivation, and code for this chapter &rarr;</a>` : ''}
            </section>
          `;
        }).join('')}

        <section class="module-synthesis">
          <p class="content-kicker">Synthesis</p>
          <h2>What the six chapters establish together</h2>
          <p>${escapeHtml(module.synthesis)}</p>
          ${bookGuide ? `<article class="book-guide-card"><span>Textbook route</span><h3>${escapeHtml(bookGuide.title)}</h3><p class="book-pages">${escapeHtml(bookGuide.pages)}</p><p>${escapeHtml(bookGuide.focus)}</p><p>${escapeHtml(bookGuide.note)}</p></article>` : ''}
          ${requestedWeek < 11 ? `<a class="btn-primary" href="module.html?week=${requestedWeek + 1}">Continue to Week ${requestedWeek + 1} &rarr;</a>` : `<a class="btn-primary" href="research.html">Continue into Research Notes &rarr;</a>`}
        </section>
      </article>
    </div>
  `;

  const renderMath = () => window.siteUtils?.renderMath(container);
  renderMath();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderMath, { once: true });
  window.addEventListener('load', renderMath, { once: true });
})();
