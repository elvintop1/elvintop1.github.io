(function() {
  const container = document.getElementById('paperAnalysisPage');
  if (!container || !window.quantumPapers) return;

  const escapeHtml = value => String(value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  const slug = new URLSearchParams(window.location.search).get('paper') || '';
  const paper = window.getQuantumPaper(slug);

  if (!paper) {
    document.title = 'Paper analysis not found | Do Quang Hao';
    container.innerHTML = '<section class="lesson-not-found"><p class="content-kicker">Paper library</p><h1>Paper not found</h1><p>The requested paper analysis does not exist or its link is incomplete.</p><a class="btn-ghost" href="papers.html">Return to Paper Library</a></section>';
    return;
  }

  const track = window.getQuantumResearchTrack(paper.track);
  const trackPapers = window.quantumPapers.filter(item => item.track === paper.track);
  const trackIndex = trackPapers.findIndex(item => item.slug === paper.slug);
  const previous = trackPapers[trackIndex - 1] || null;
  const next = trackPapers[trackIndex + 1] || null;
  document.title = paper.shortTitle + ' | Paper Analysis';
  document.querySelector('meta[name="description"]')?.setAttribute('content', paper.abstractSummary);

  const equationMarkup = paper.equations.map(equation => `
    <article>
      <span>${escapeHtml(equation.label)}</span>
      <div class="math-block">$$${equation.latex}$$</div>
      <p>${escapeHtml(equation.note)}</p>
    </article>
  `).join('');

  container.innerHTML = `
    <nav class="lesson-breadcrumb" aria-label="Breadcrumb"><a href="papers.html">Paper Library</a><span aria-hidden="true">/</span><a href="papers.html?track=${encodeURIComponent(paper.track)}">${escapeHtml(track?.title || paper.track)}</a><span aria-hidden="true">/</span><span aria-current="page">${escapeHtml(paper.shortTitle)}</span></nav>

    <header class="paper-analysis-hero">
      <div class="paper-analysis-meta"><span>${escapeHtml(track?.title || paper.track)}</span><span>${paper.year}</span><span>${escapeHtml(paper.readingStatus)}</span><span>Updated ${escapeHtml(paper.updated)}</span></div>
      <h1>${escapeHtml(paper.title)}</h1>
      <p class="paper-analysis-authors">${escapeHtml(paper.authors.join(', '))}</p>
      <p class="paper-analysis-venue">${escapeHtml(paper.venue)}</p>
      <div class="paper-analysis-actions">
        <a class="btn-primary" href="${escapeHtml(paper.sourceUrl)}" target="_blank" rel="noopener noreferrer">Original paper &nearr;</a>
        <a class="btn-ghost" href="${escapeHtml(paper.pdfUrl)}" target="_blank" rel="noopener noreferrer">Open PDF &nearr;</a>
        <button class="btn-ghost copy-citation" type="button">Copy citation</button>
      </div>
    </header>

    <div class="paper-analysis-layout">
      <aside class="paper-analysis-sidebar">
        <p class="content-kicker">Analysis map</p>
        <ol>
          <li><a href="#paper-orientation"><span>01</span>Reading orientation</a></li>
          <li><a href="#paper-contributions"><span>02</span>Main contributions</a></li>
          <li><a href="#paper-mathematics"><span>03</span>Mathematical anchors</a></li>
          ${paper.sections.map((section, index) => `<li><a href="#${escapeHtml(section.id)}"><span>${String(index + 4).padStart(2, '0')}</span>${escapeHtml(section.title.replace(/^\d+\.\s*/, ''))}</a></li>`).join('')}
          <li><a href="#paper-comments"><span>${String(paper.sections.length + 4).padStart(2, '0')}</span>My comments</a></li>
          <li><a href="#paper-boundaries"><span>${String(paper.sections.length + 5).padStart(2, '0')}</span>Strengths and limits</a></li>
          <li><a href="#paper-record"><span>${String(paper.sections.length + 6).padStart(2, '0')}</span>Reading record</a></li>
        </ol>
        <div class="paper-sidebar-record"><span>arXiv</span><strong>${escapeHtml(paper.arxivId)}</strong><span>DOI</span><strong>${escapeHtml(paper.doi)}</strong><span>Reading date</span><strong>${escapeHtml(paper.readingDate)}</strong></div>
      </aside>

      <article class="paper-analysis-article">
        <section class="paper-orientation" id="paper-orientation">
          <p class="content-kicker">Reading orientation</p>
          <h2>Why this paper is in my research map</h2>
          <div class="paper-orientation-grid">
            <article><span>My reading question</span><p>${escapeHtml(paper.readingQuestion)}</p></article>
            <article><span>My current thesis</span><p>${escapeHtml(paper.thesis)}</p></article>
          </div>
          <div class="paper-summary-block"><span>Abstract in my own words</span><p>${escapeHtml(paper.abstractSummary)}</p></div>
          <div class="paper-why-block"><span>Why I am reading it</span><p>${escapeHtml(paper.whyReading)}</p></div>
        </section>

        <section id="paper-contributions">
          <p class="content-kicker">Contribution map</p>
          <h2>What the paper contributes</h2>
          <ol class="paper-contribution-list">${paper.contributions.map((item, index) => `<li><span>${String(index + 1).padStart(2, '0')}</span><p>${escapeHtml(item)}</p></li>`).join('')}</ol>
        </section>

        <section id="paper-mathematics">
          <p class="content-kicker">Mathematical anchors</p>
          <h2>The equations I use to reconstruct the argument</h2>
          <div class="paper-equation-list">${equationMarkup}</div>
        </section>

        ${paper.sections.map(section => `
          <section class="paper-analysis-section" id="${escapeHtml(section.id)}">
            <h2>${escapeHtml(section.title)}</h2>
            <div class="lecture-prose">${section.paragraphs.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('')}</div>
          </section>
        `).join('')}

        <section class="paper-comments-section" id="paper-comments">
          <p class="content-kicker">Margin notes</p>
          <h2>My comments on the paper</h2>
          <div class="paper-comment-stack">${paper.comments.map((comment, index) => `
            <article><span>Comment ${String(index + 1).padStart(2, '0')} · ${escapeHtml(comment.label)}</span><h3>${escapeHtml(comment.title)}</h3><p>${escapeHtml(comment.text)}</p></article>
          `).join('')}</div>
        </section>

        <section class="paper-boundaries-section" id="paper-boundaries">
          <p class="content-kicker">Critical reading</p>
          <h2>Strengths, limitations, and next questions</h2>
          <div class="paper-boundary-grid">
            <article><span>Strengths</span><ul>${paper.strengths.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul></article>
            <article><span>Limitations</span><ul>${paper.limitations.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul></article>
          </div>
          <div class="paper-open-questions"><span>Questions I am carrying forward</span><ol>${paper.questions.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ol></div>
        </section>

        <section class="paper-record-section" id="paper-record">
          <p class="content-kicker">Reading record</p>
          <h2>Citation and connected work</h2>
          <div class="paper-citation-card"><span>Suggested citation</span><p>${escapeHtml(paper.citation)}</p><div><a href="https://doi.org/${escapeHtml(paper.doi)}" target="_blank" rel="noopener noreferrer">DOI &nearr;</a><a href="${escapeHtml(paper.sourceUrl)}" target="_blank" rel="noopener noreferrer">arXiv ${escapeHtml(paper.arxivId)} &nearr;</a></div></div>
          <div class="paper-connected-work"><span>Connected notes and lessons</span>${paper.connections.map(item => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)} &rarr;</a>`).join('')}</div>
        </section>

        <nav class="lesson-pagination" aria-label="Paper analysis navigation">
          ${previous ? `<a class="lesson-pagination-link previous" href="${window.getQuantumPaperHref(previous)}"><span>&larr; Previous paper</span><strong>${escapeHtml(previous.shortTitle)}</strong><small>${escapeHtml(track?.title || paper.track)}</small></a>` : '<span></span>'}
          ${next ? `<a class="lesson-pagination-link next" href="${window.getQuantumPaperHref(next)}"><span>Next paper &rarr;</span><strong>${escapeHtml(next.shortTitle)}</strong><small>${escapeHtml(track?.title || paper.track)}</small></a>` : '<a class="lesson-pagination-link next" href="papers.html"><span>Paper Library &rarr;</span><strong>Browse every paper</strong><small>All directions</small></a>'}
        </nav>
      </article>
    </div>
  `;

  const renderMath = () => window.siteUtils?.renderMath(container);
  renderMath();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderMath, { once: true });
  window.addEventListener('load', renderMath, { once: true });

  container.querySelector('.copy-citation')?.addEventListener('click', async event => {
    try {
      await navigator.clipboard.writeText(paper.citation);
      event.currentTarget.textContent = 'Citation copied';
      window.setTimeout(() => { event.currentTarget.textContent = 'Copy citation'; }, 1500);
    } catch (_) {
      event.currentTarget.textContent = 'Select citation below';
    }
  });
})();
