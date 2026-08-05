(function() {
  const pageContainer = document.getElementById('lessonPageContent');
  if (!pageContainer || !window.quantumWeeks) return;

  const escapeHtml = value => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const getLessonConcepts = lesson => {
    const normalized = lesson.detail
      .replace(/\.$/, '')
      .replace(/;\s+/g, ', ')
      .replace(/,\s+and\s+/gi, ', ');

    return [...new Set(normalized.split(',').map(item => item.trim()).filter(Boolean))].slice(0, 10);
  };

  const getRelevantEquations = (week, lesson) => {
    const stopWords = new Set(['with', 'from', 'into', 'that', 'this', 'their', 'versus', 'using', 'states', 'quantum', 'circuit', 'circuits']);
    const tokens = `${lesson.title} ${lesson.detail}`
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(token => token.length > 3 && !stopWords.has(token));

    const scored = week.equations.map((equation, index) => {
      const haystack = `${equation.label} ${equation.note} ${equation.latex}`.toLowerCase();
      return { equation, index, score: tokens.reduce((score, token) => score + (haystack.includes(token) ? 1 : 0), 0) };
    });

    const matched = scored.filter(item => item.score > 0).sort((a, b) => b.score - a.score || a.index - b.index);
    return (matched.length ? matched : scored).slice(0, Math.min(3, week.equations.length)).map(item => item.equation);
  };

  const params = new URLSearchParams(window.location.search);
  const requestedWeek = Number(params.get('week'));
  const requestedTopic = params.get('topic') || '';
  const weekIndex = window.quantumWeeks.findIndex(week => week.week === requestedWeek);
  const week = window.quantumWeeks[weekIndex];
  const lessonIndex = week
    ? week.lessons.findIndex(lesson => window.slugifyQuantumLesson(lesson.title) === requestedTopic)
    : -1;
  const lesson = lessonIndex >= 0 ? week.lessons[lessonIndex] : null;

  if (!week || !lesson) {
    document.title = 'Lesson not found | Do Quang Hao';
    pageContainer.innerHTML = `
      <section class="lesson-not-found">
        <p class="content-kicker">Quantum curriculum</p>
        <h1>Lesson not found</h1>
        <p>The lesson link may be incomplete or no longer available.</p>
        <a class="btn-ghost" href="index.html">Return to the 12-week roadmap</a>
      </section>
    `;
    return;
  }

  const flatLessons = window.quantumWeeks.flatMap((itemWeek, itemWeekIndex) =>
    itemWeek.lessons.map((itemLesson, itemLessonIndex) => ({
      week: itemWeek,
      weekIndex: itemWeekIndex,
      lesson: itemLesson,
      lessonIndex: itemLessonIndex
    }))
  );
  const flatIndex = flatLessons.findIndex(item => item.weekIndex === weekIndex && item.lessonIndex === lessonIndex);
  const previous = flatLessons[flatIndex - 1] || null;
  const next = flatLessons[flatIndex + 1] || null;
  const concepts = getLessonConcepts(lesson);
  const equations = getRelevantEquations(week, lesson);
  const recommendedLab = week.practice[lessonIndex % week.practice.length];
  const lessonNumber = lessonIndex + 1;

  const getFlatLessonHref = item => window.getQuantumLessonHref(item.week, item.lesson);

  document.title = `${lesson.title} | Week ${week.week} Quantum Lesson`;
  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) descriptionMeta.setAttribute('content', lesson.detail);

  pageContainer.className = 'lesson-page-content';
  pageContainer.innerHTML = `
    <nav class="lesson-breadcrumb" aria-label="Breadcrumb">
      <a href="index.html">Quantum Hub</a>
      <span aria-hidden="true">/</span>
      <a href="index.html#week-${week.week}">Week ${week.week}</a>
      <span aria-hidden="true">/</span>
      <span aria-current="page">${escapeHtml(lesson.title)}</span>
    </nav>

    <div class="lesson-page-layout">
      <aside class="lesson-sidebar" aria-label="Week ${week.week} lessons">
        <div class="lesson-sidebar-header">
          <p class="content-kicker">Week ${week.week}</p>
          <h2>${escapeHtml(week.title)}</h2>
          <p>${escapeHtml(week.stage)}</p>
        </div>
        <ol class="lesson-sidebar-list">
          ${week.lessons.map((item, index) => {
            const active = index === lessonIndex;
            return `
              <li>
                <a href="${window.getQuantumLessonHref(week, item)}" ${active ? 'class="active" aria-current="page"' : ''}>
                  <span>${String(index + 1).padStart(2, '0')}</span>
                  <strong>${escapeHtml(item.title)}</strong>
                </a>
              </li>
            `;
          }).join('')}
        </ol>
        <a class="back-to-week" href="index.html#week-${week.week}">&larr; Back to Week ${week.week}</a>
      </aside>

      <article class="lesson-article">
        <header class="lesson-article-header">
          <div class="lesson-meta-line">
            <span>${escapeHtml(week.stage)}</span>
            <span>Week ${week.week} · Lesson ${lessonNumber} of ${week.lessons.length}</span>
            <span>45–75 min</span>
          </div>
          <h1>${escapeHtml(lesson.title)}</h1>
          <p class="lesson-deck">${escapeHtml(lesson.detail)}</p>
          <div class="tags">
            ${week.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
          </div>
        </header>

        <section class="lesson-section" aria-labelledby="lesson-overview">
          <p class="content-kicker">01 · Overview</p>
          <h2 id="lesson-overview">What this lesson establishes</h2>
          <p>This lesson is one part of <strong>${escapeHtml(week.title)}</strong>. Its purpose is to turn the topic “${escapeHtml(lesson.title)}” into knowledge that can be explained, represented, and used—not only recognized by name.</p>
          <p>${escapeHtml(lesson.detail)} Study each idea together with its assumptions, mathematical representation, operational meaning, and limits. Connect it back to the week’s goal: ${escapeHtml(week.summary)}</p>
          <aside class="lesson-focus-note">
            <strong>Learning outcome</strong>
            <span>${escapeHtml(week.objectives[lessonIndex % week.objectives.length])}</span>
          </aside>
        </section>

        <section class="lesson-section" aria-labelledby="lesson-concepts">
          <p class="content-kicker">02 · Core concepts</p>
          <h2 id="lesson-concepts">Ideas you need to understand</h2>
          <div class="concept-grid">
            ${concepts.map((concept, index) => `
              <article class="concept-card">
                <span>${String(index + 1).padStart(2, '0')}</span>
                <h3>${escapeHtml(concept)}</h3>
                <p>Define this precisely, identify how it is represented, and explain when it is useful in ${escapeHtml(lesson.title.toLowerCase())}.</p>
              </article>
            `).join('')}
          </div>
        </section>

        <section class="lesson-section" aria-labelledby="lesson-study-sequence">
          <p class="content-kicker">03 · Study sequence</p>
          <h2 id="lesson-study-sequence">A reliable way to learn it</h2>
          <ol class="study-sequence">
            <li><span>01</span><div><h3>Build the vocabulary</h3><p>Write a one-sentence definition for every core concept above. Mark any term that depends on an earlier lesson and revisit that prerequisite first.</p></div></li>
            <li><span>02</span><div><h3>Move between representations</h3><p>Express the topic in words, equations, circuit or operator form, and a small concrete example. Note which representation makes each property easiest to see.</p></div></li>
            <li><span>03</span><div><h3>Verify a minimal case</h3><p>Calculate or simulate the smallest non-trivial example. Check normalization, dimensions, probability sums, or complexity assumptions as appropriate.</p></div></li>
            <li><span>04</span><div><h3>Test the boundary</h3><p>Change one assumption, parameter, input state, or noise condition. Record what changes and what remains invariant instead of memorizing only the ideal case.</p></div></li>
          </ol>
        </section>

        <section class="lesson-section" aria-labelledby="lesson-equations">
          <p class="content-kicker">04 · Mathematical reference</p>
          <h2 id="lesson-equations">Equations to connect with this topic</h2>
          <div class="lesson-equation-list">
            ${equations.map(equation => `
              <article class="equation-card">
                <h3>${escapeHtml(equation.label)}</h3>
                <div class="math-block">$$${equation.latex}$$</div>
                <p>${escapeHtml(equation.note)}</p>
              </article>
            `).join('')}
          </div>
          <p class="lesson-caption">Do not memorize a formula in isolation. Check the meaning and dimension of every symbol, then state the conditions under which the expression is valid.</p>
        </section>

        <section class="lesson-section" aria-labelledby="lesson-checkpoints">
          <p class="content-kicker">05 · Check your understanding</p>
          <h2 id="lesson-checkpoints">Questions you should be able to answer</h2>
          <ol class="checkpoint-list">
            <li><span>01</span><p>What problem or description does <strong>${escapeHtml(lesson.title)}</strong> provide, and what information is required to use it correctly?</p></li>
            <li><span>02</span><p>How are <strong>${escapeHtml(concepts[0] || lesson.title)}</strong> and <strong>${escapeHtml(concepts[1] || week.title)}</strong> connected? Give a mathematical, circuit-based, or operational example.</p></li>
            <li><span>03</span><p>Which assumption, limitation, or implementation cost is easiest to overlook in this topic?</p></li>
            <li><span>04</span><p>How would you verify your result with a hand calculation, simulator, classical baseline, or repeated experiment?</p></li>
          </ol>
        </section>

        <section class="lesson-section lesson-practice-box" aria-labelledby="lesson-practice">
          <p class="content-kicker">06 · Practice</p>
          <h2 id="lesson-practice">Apply the lesson</h2>
          <div class="recommended-lab">
            <span>Recommended week lab</span>
            <p>${escapeHtml(recommendedLab)}</p>
          </div>
          <ul class="micro-exercise-list">
            <li>Create a one-page note that defines ${escapeHtml(concepts.slice(0, 3).join(', '))} and connects them with arrows or equations.</li>
            <li>Construct the smallest valid example of ${escapeHtml(lesson.title.toLowerCase())}; predict the result before calculating or simulating it.</li>
            <li>Write down one failure mode or misconception, then design a test that exposes it.</li>
          </ul>
        </section>

        <section class="lesson-section" aria-labelledby="lesson-completion">
          <p class="content-kicker">07 · Completion criteria</p>
          <h2 id="lesson-completion">Before continuing</h2>
          <ul class="completion-list lesson-completion-list">
            ${week.checklist.map(item => `<li><span class="check-box" aria-hidden="true"></span>${escapeHtml(item)}</li>`).join('')}
          </ul>
        </section>

        <section class="lesson-section" aria-labelledby="lesson-resources">
          <p class="content-kicker">08 · Primary sources</p>
          <h2 id="lesson-resources">Continue with authoritative material</h2>
          <div class="resource-list">
            ${week.resources.map(resource => `
              <a href="${escapeHtml(resource.url)}" target="_blank" rel="noopener noreferrer">
                <span>${escapeHtml(resource.title)}</span><span aria-hidden="true">&nearr;</span>
              </a>
            `).join('')}
          </div>
        </section>

        <nav class="lesson-pagination" aria-label="Lesson navigation">
          ${previous ? `
            <a class="lesson-pagination-link previous" href="${getFlatLessonHref(previous)}">
              <span>&larr; Previous lesson</span>
              <strong>${escapeHtml(previous.lesson.title)}</strong>
              <small>Week ${previous.week.week}</small>
            </a>
          ` : '<span></span>'}
          ${next ? `
            <a class="lesson-pagination-link next" href="${getFlatLessonHref(next)}">
              <span>Next lesson &rarr;</span>
              <strong>${escapeHtml(next.lesson.title)}</strong>
              <small>Week ${next.week.week}</small>
            </a>
          ` : '<span></span>'}
        </nav>
      </article>
    </div>
  `;

  if (window.siteUtils?.renderMath) window.siteUtils.renderMath(pageContainer);
})();
