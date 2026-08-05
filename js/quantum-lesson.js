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
  const lessonNotesKey = `${week.week}-${window.slugifyQuantumLesson(lesson.title)}`;
  const lessonNotes = window.quantumLessonNotes?.[lessonNotesKey] || null;
  const course = window.quantumCourse || {};
  const module = window.quantumModules?.[week.week] || null;
  const moduleLesson = module?.lessons?.find(item => item.title === lesson.title) || null;
  const foundation = course.foundationsByWeek?.[week.week] || null;
  const lab = course.labs?.[week.week] || null;
  const bookGuide = course.bookGuides?.[week.week] || null;
  const lessonVariation = lab?.variations?.[lessonIndex] || recommendedLab;
  const detailedNotesMarkup = lessonNotes ? `
    <section class="lesson-section" aria-labelledby="lesson-detailed-notes">
      <p class="content-kicker">06 · Detailed notes</p>
      <h2 id="lesson-detailed-notes">Understand the topic in depth</h2>
      <div class="detailed-note-copy">
        ${lessonNotes.explanation.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('')}
      </div>
      <div class="detailed-note-grid">
        <article class="key-idea-panel">
          <h3>Key ideas</h3>
          <ul>${lessonNotes.keyIdeas.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
        </article>
        <article class="worked-example-panel">
          <span>Concrete example</span>
          <p>${escapeHtml(lessonNotes.example)}</p>
        </article>
      </div>
      <aside class="pitfall-panel">
        <h3>Common mistakes</h3>
        <ul>${lessonNotes.pitfalls.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
      </aside>
    </section>
  ` : '';
  const derivationMarkup = lessonNotes ? `
    <section class="lesson-section" aria-labelledby="lesson-derivation">
      <p class="content-kicker">07 · First-principles walkthrough</p>
      <h2 id="lesson-derivation">Build the result instead of memorizing it</h2>
      <ol class="derivation-steps lesson-derivation-steps">
        <li><span>1</span><div><strong>Name the object</strong><p>${escapeHtml(lessonNotes.explanation[0])}</p></div></li>
        <li><span>2</span><div><strong>State the rule or assumption</strong><p>${escapeHtml(lessonNotes.keyIdeas[0])}</p></div></li>
        <li><span>3</span><div><strong>Connect the mathematics</strong><div class="math-block compact-math">$$${equations[0]?.latex || ''}$$</div><p>${escapeHtml(equations[0]?.note || '')}</p></div></li>
        <li><span>4</span><div><strong>Work the smallest non-trivial case</strong><p>${escapeHtml(lessonNotes.example)}</p></div></li>
        <li><span>5</span><div><strong>Try to break the reasoning</strong><p>Test the claim against this common failure mode: ${escapeHtml(lessonNotes.pitfalls[0])}</p></div></li>
      </ol>
    </section>
  ` : '';
  const foundationMarkup = foundation ? `
    <section class="lesson-section prerequisite-section" aria-labelledby="lesson-prerequisites">
      <p class="content-kicker">03 · Prerequisite bridge</p>
      <h2 id="lesson-prerequisites">What must make sense first</h2>
      <p class="lesson-driving-question">${escapeHtml(foundation.question)}</p>
      <p>${escapeHtml(foundation.bridge)}</p>
      <div class="prerequisite-grid">
        <div>
          <h3>Required before this lesson</h3>
          <ul>${foundation.prerequisites.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
        </div>
        <aside>
          <span>Missing a prerequisite?</span>
          <p>The Start Here course develops the mathematics and physics without assuming prior quantum mechanics.</p>
          <a href="start-here.html">Open Start Here &rarr;</a>
        </aside>
      </div>
    </section>
  ` : '';
  const labMarkup = lab ? `
    <section class="lesson-section" aria-labelledby="lesson-code-lab">
      <p class="content-kicker">09 · Guided code lab</p>
      <h2 id="lesson-code-lab">${escapeHtml(lab.title)}</h2>
      <p>${escapeHtml(lab.objective)}</p>
      <div class="lab-focus-strip">
        <div><span>Environment</span><strong>${escapeHtml(lab.tool)}</strong></div>
        <div><span>This lesson's extension</span><strong>${escapeHtml(lessonVariation)}</strong></div>
      </div>
      <div class="code-lab-shell">
        <div class="code-lab-toolbar"><span>${escapeHtml(lab.tool)}</span><button class="copy-code" type="button">Copy</button></div>
        <pre><code>${escapeHtml(lab.code)}</code></pre>
      </div>
      <div class="lab-install"><strong>Install</strong><code>${escapeHtml(lab.install)}</code></div>
      <aside class="expected-result"><strong>Expected result</strong><p>${escapeHtml(lab.expected)}</p></aside>
      <div class="code-explanation">
        <h3>Read the result scientifically</h3>
        <ol>${lab.explain.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ol>
      </div>
    </section>
  ` : '';
  const exerciseMarkup = lessonNotes ? `
    <section class="lesson-section" aria-labelledby="lesson-exercises">
      <p class="content-kicker">10 · Exercises with guidance</p>
      <h2 id="lesson-exercises">Check whether you can use the idea</h2>
      <div class="exercise-stack">
        <article>
          <span>Exercise 01 · Explain</span>
          <h3>Explain ${escapeHtml(lesson.title.toLowerCase())} without using an analogy.</h3>
          <p class="exercise-hint"><strong>Hint:</strong> Name the mathematical object, the operation or rule, and the observable prediction.</p>
          <details class="answer-panel"><summary>Reveal answer guide</summary><div><p>${escapeHtml(lessonNotes.explanation.join(' '))}</p></div></details>
        </article>
        <article>
          <span>Exercise 02 · Calculate</span>
          <h3>Reproduce the worked case line by line, then change one input.</h3>
          <p class="exercise-hint"><strong>Hint:</strong> Check dimensions, normalization, and probability sums at every line.</p>
          <details class="answer-panel"><summary>Reveal worked starting point</summary><div><p>${escapeHtml(lessonNotes.example)}</p><p>Your changed input may have a different numerical answer; verify it independently with the lab.</p></div></details>
        </article>
        <article>
          <span>Exercise 03 · Debug</span>
          <h3>Find and correct a tempting misconception.</h3>
          <p class="exercise-hint"><strong>Claim to inspect:</strong> ${escapeHtml(lessonNotes.pitfalls[0])}</p>
          <details class="answer-panel"><summary>Reveal correction criteria</summary><div><p>A correct response must identify the violated definition or assumption, replace the claim precisely, and give a calculation or experiment that distinguishes the two.</p></div></details>
        </article>
      </div>
    </section>
  ` : '';
  const getFlatLessonHref = item => window.getQuantumLessonHref(item.week, item.lesson);
  const moduleThreadMarkup = module ? `
    <section class="lesson-section module-thread-section" aria-labelledby="lesson-module-thread">
      <p class="content-kicker">02 · Module thread</p>
      <h2 id="lesson-module-thread">Where this lesson fits</h2>
      <p class="lesson-driving-question">${escapeHtml(module.essentialQuestion)}</p>
      <p>${escapeHtml(module.thesis)}</p>
      <div class="lesson-connection-row">
        <div>
          <span>Arrives from</span>
          ${previous ? `<a href="${getFlatLessonHref(previous)}">${escapeHtml(previous.lesson.title)} &larr;</a>` : '<strong>Start of the curriculum</strong>'}
        </div>
        <div>
          <span>Continues to</span>
          ${next ? `<a href="${getFlatLessonHref(next)}">${escapeHtml(next.lesson.title)} &rarr;</a>` : '<strong>End of the completed curriculum</strong>'}
        </div>
      </div>
      <a class="module-reading-link" href="module.html?week=${week.week}"><span>Read continuously</span><strong>Open the complete Week ${week.week} lecture &rarr;</strong></a>
    </section>
  ` : '';
  const lectureMarkup = moduleLesson ? `
    <section class="lesson-section lecture-narrative-section" aria-labelledby="lesson-lecture-narrative">
      <p class="content-kicker">05 · Connected lecture</p>
      <h2 id="lesson-lecture-narrative">${escapeHtml(moduleLesson.question)}</h2>
      <div class="lecture-prose">
        ${moduleLesson.explanation.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('')}
      </div>
      <aside class="lecture-checkpoint">
        <span>Teaching checkpoint</span>
        <p>${escapeHtml(moduleLesson.checkpoint)}</p>
      </aside>
      <div class="lecture-transition"><strong>Why the next idea follows</strong><p>${escapeHtml(moduleLesson.transition)}</p></div>
    </section>
  ` : '';

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
        <a class="sidebar-module-link" href="module.html?week=${week.week}"><span>Connected lecture</span><strong>Read all six lessons as one chapter</strong></a>
        <a class="sidebar-foundation-link" href="start-here.html"><span>New learner path</span><strong>Mathematics + physics from scratch</strong></a>
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

        ${moduleThreadMarkup}

        ${foundationMarkup}

        <section class="lesson-section" aria-labelledby="lesson-concepts">
          <p class="content-kicker">04 · Core concepts</p>
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

        ${lectureMarkup}

        ${detailedNotesMarkup}

        ${derivationMarkup}

        <section class="lesson-section" aria-labelledby="lesson-equations">
          <p class="content-kicker">08 · Mathematical reference</p>
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

        ${labMarkup}

        ${exerciseMarkup}

        <section class="lesson-section" aria-labelledby="lesson-completion">
          <p class="content-kicker">11 · Completion criteria</p>
          <h2 id="lesson-completion">Before continuing</h2>
          <ul class="completion-list lesson-completion-list">
            ${week.checklist.map(item => `<li><span class="check-box" aria-hidden="true"></span>${escapeHtml(item)}</li>`).join('')}
          </ul>
        </section>

        <section class="lesson-section" aria-labelledby="lesson-resources">
          <p class="content-kicker">12 · Reading guide and primary sources</p>
          <h2 id="lesson-resources">Read the textbook with a purpose</h2>
          ${bookGuide ? `
            <article class="book-guide-card">
              <span>Course textbook</span>
              <h3>${escapeHtml(bookGuide.title)}</h3>
              <p class="book-pages">${escapeHtml(bookGuide.pages)}</p>
              <p><strong>Read for:</strong> ${escapeHtml(bookGuide.focus)}</p>
              <p>${escapeHtml(bookGuide.note)}</p>
            </article>
          ` : ''}
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

  const renderLessonMath = () => {
    if (window.siteUtils?.renderMath) window.siteUtils.renderMath(pageContainer);
  };

  renderLessonMath();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderLessonMath, { once: true });
  }
  window.addEventListener('load', renderLessonMath, { once: true });

  pageContainer.querySelectorAll('.copy-code').forEach(button => {
    button.addEventListener('click', async () => {
      const code = button.closest('.code-lab-shell')?.querySelector('code')?.textContent || '';
      try {
        await navigator.clipboard.writeText(code);
        button.textContent = 'Copied';
        window.setTimeout(() => { button.textContent = 'Copy'; }, 1400);
      } catch (_) {
        button.textContent = 'Select code';
      }
    });
  });
})();
