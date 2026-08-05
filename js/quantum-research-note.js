(function() {
  const container = document.getElementById('researchNotePage');
  if (!container || !window.quantumResearchNotes) return;

  const escapeHtml = value => String(value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  const formatDate = date => new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(`${date}T00:00:00`));
  const slug = new URLSearchParams(window.location.search).get('note') || '';
  const note = window.quantumResearchNotes.find(item => item.slug === slug);

  if (!note) {
    document.title = 'Research note not found | Do Quang Hao';
    container.innerHTML = `<section class="lesson-not-found"><p class="content-kicker">Research notebook</p><h1>Note not found</h1><p>The requested research note does not exist or its link is incomplete.</p><a class="btn-ghost" href="research.html">Return to Research Notes</a></section>`;
    return;
  }

  const track = window.getQuantumResearchTrack(note.track);
  const notesInTrack = window.quantumResearchNotes.filter(item => item.track === note.track).sort((a, b) => a.date.localeCompare(b.date) || a.sequence - b.sequence);
  const indexInTrack = notesInTrack.findIndex(item => item.slug === note.slug);
  const previous = notesInTrack[indexInTrack - 1];
  const next = notesInTrack[indexInTrack + 1];
  document.title = `${note.title} | Quantum Research Notes`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', note.subtitle);

  const equationMarkup = equations => equations.length ? `<div class="research-equation-list">${equations.map(eq => `<article><span>${escapeHtml(eq.label)}</span><div class="math-block">$$${eq.latex}$$</div><p>${escapeHtml(eq.note)}</p></article>`).join('')}</div>` : '';

  container.innerHTML = `
    <nav class="lesson-breadcrumb" aria-label="Breadcrumb"><a href="research.html">Research Notes</a><span aria-hidden="true">/</span><a href="research.html?track=${encodeURIComponent(note.track)}">${escapeHtml(track?.title || note.track)}</a><span aria-hidden="true">/</span><span aria-current="page">${escapeHtml(note.title)}</span></nav>

    <header class="research-note-hero">
      <div class="research-note-meta"><span>${escapeHtml(track?.title || note.track)}</span><time datetime="${escapeHtml(note.date)}">${escapeHtml(formatDate(note.date))}</time><span>${escapeHtml(note.status)}</span><span>${note.readingTime} min read</span></div>
      <h1>${escapeHtml(note.title)}</h1>
      <p class="research-note-subtitle">${escapeHtml(note.subtitle)}</p>
      <div class="tags">${note.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}</div>
    </header>

    <div class="research-note-layout">
      <aside class="research-note-sidebar">
        <p class="content-kicker">Contents</p>
        <ol>${note.sections.map((section, index) => `<li><a href="#${escapeHtml(section.id)}"><span>${String(index + 1).padStart(2, '0')}</span>${escapeHtml(section.title.replace(/^\d+\.\s*/, ''))}</a></li>`).join('')}</ol>
        <div class="research-note-sidebar-meta"><span>Maturity</span><strong>${escapeHtml(note.maturity)}</strong><span>Last updated</span><strong>${escapeHtml(formatDate(note.updated))}</strong></div>
      </aside>

      <article class="research-note-article">
        <section class="research-note-abstract">
          <p class="content-kicker">Research question</p>
          <h2>${escapeHtml(note.researchQuestion)}</h2>
          <p>${escapeHtml(note.abstract)}</p>
          <div class="research-prerequisites"><span>Prerequisites</span><ul>${note.prerequisites.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul></div>
        </section>

        <section class="research-key-findings">
          <p class="content-kicker">Current findings</p>
          <h2>What the investigation supports so far</h2>
          <ol>${note.keyFindings.map((item, index) => `<li><span>${String(index + 1).padStart(2, '0')}</span><p>${escapeHtml(item)}</p></li>`).join('')}</ol>
        </section>

        ${note.comparison ? `<section class="research-comparison"><p class="content-kicker">Comparison</p><h2>Encoding choices are resource choices</h2><div class="research-table-wrap"><table><thead><tr><th>Method</th><th>State</th><th>Qubits</th><th>Preparation</th><th>Preserves</th><th>Main risk</th></tr></thead><tbody>${note.comparison.map(row => `<tr><th>${escapeHtml(row.method)}</th><td>${escapeHtml(row.state)}</td><td>${escapeHtml(row.qubits)}</td><td>${escapeHtml(row.depth)}</td><td>${escapeHtml(row.preserves)}</td><td>${escapeHtml(row.risk)}</td></tr>`).join('')}</tbody></table></div></section>` : ''}

        ${note.sections.map(section => `<section class="research-note-section" id="${escapeHtml(section.id)}"><h2>${escapeHtml(section.title)}</h2><div class="lecture-prose">${section.paragraphs.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('')}</div>${equationMarkup(section.equations)}</section>`).join('')}

        <section class="research-code-section">
          <p class="content-kicker">Reproducible experiment</p>
          <h2>${escapeHtml(note.codeLab.title)}</h2>
          <div class="lab-focus-strip"><div><span>Environment</span><strong>${escapeHtml(note.codeLab.tool)}</strong></div><div><span>Install</span><strong>${escapeHtml(note.codeLab.install)}</strong></div></div>
          <div class="code-lab-shell"><div class="code-lab-toolbar"><span>${escapeHtml(note.codeLab.tool)}</span><button class="copy-code" type="button">Copy</button></div><pre><code>${escapeHtml(note.codeLab.code)}</code></pre></div>
          <aside class="expected-result"><strong>Expected result</strong><p>${escapeHtml(note.codeLab.expected)}</p></aside>
          <div class="research-interpretation"><strong>Interpretation boundary</strong><p>${escapeHtml(note.codeLab.interpretation)}</p></div>
        </section>

        <section class="research-limits-grid">
          <article><p class="content-kicker">Limitations</p><h2>What this note does not establish</h2><ul>${note.limitations.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul></article>
          <article><p class="content-kicker">Next questions</p><h2>What to investigate next</h2><ol>${note.openQuestions.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ol></article>
        </section>

        <section class="research-sources-section">
          <p class="content-kicker">Reading record</p><h2>Primary and current sources</h2>
          <div class="resource-list">${note.sources.map(source => `<a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer"><span><small>${escapeHtml(source.type)}</small>${escapeHtml(source.title)}</span><span aria-hidden="true">&nearr;</span></a>`).join('')}</div>
          <div class="research-related"><span>Connected curriculum</span>${note.relatedLessons.map(item => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)} &rarr;</a>`).join('')}</div>
        </section>

        <nav class="lesson-pagination" aria-label="Research note navigation">
          ${previous ? `<a class="lesson-pagination-link previous" href="${window.getQuantumResearchNoteHref(previous)}"><span>&larr; Previous in direction</span><strong>${escapeHtml(previous.title)}</strong><small>${escapeHtml(track?.title || note.track)}</small></a>` : '<span></span>'}
          ${next ? `<a class="lesson-pagination-link next" href="${window.getQuantumResearchNoteHref(next)}"><span>Next in direction &rarr;</span><strong>${escapeHtml(next.title)}</strong><small>${escapeHtml(track?.title || note.track)}</small></a>` : '<a class="lesson-pagination-link next" href="research.html"><span>Research notebook &rarr;</span><strong>Browse every direction</strong><small>All dated notes</small></a>'}
        </nav>
      </article>
    </div>
  `;

  const renderMath = () => window.siteUtils?.renderMath(container);
  renderMath();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderMath, { once: true });
  window.addEventListener('load', renderMath, { once: true });

  container.querySelectorAll('.copy-code').forEach(button => button.addEventListener('click', async () => {
    const code = button.closest('.code-lab-shell')?.querySelector('code')?.textContent || '';
    try { await navigator.clipboard.writeText(code); button.textContent = 'Copied'; window.setTimeout(() => { button.textContent = 'Copy'; }, 1400); }
    catch (_) { button.textContent = 'Select code'; }
  }));
})();
