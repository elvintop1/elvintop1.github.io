(function() {
  const papers = window.quantumPapers || [];
  const tracks = window.quantumResearchTracks || [];
  const list = document.getElementById('paperList');
  const search = document.getElementById('paperSearch');
  const trackFilter = document.getElementById('paperTrackFilter');
  const statusFilter = document.getElementById('paperStatusFilter');
  const sort = document.getElementById('paperSort');
  const empty = document.getElementById('paperEmpty');
  const summary = document.getElementById('paperTrackSummary');
  if (!list || !search || !trackFilter || !statusFilter || !sort || !empty || !summary) return;

  const escapeHtml = value => String(value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  const paperIndex = new Map(papers.map((paper, index) => [paper.slug, index]));
  const queryParams = new URLSearchParams(window.location.search);
  const requestedTrack = queryParams.get('track') || 'all';

  document.getElementById('paperLibraryStats').innerHTML = `
    <div><dt>${papers.length}</dt><dd>papers tracked</dd></div>
    <div><dt>${tracks.length}</dt><dd>research directions</dd></div>
    <div><dt>${papers.filter(paper => paper.readingStatus === 'Annotated').length}</dt><dd>fully annotated</dd></div>
    <div><dt>${papers.reduce((total, paper) => total + paper.comments.length, 0)}</dt><dd>personal comments</dd></div>
  `;

  trackFilter.innerHTML += tracks.map(track => `<option value="${escapeHtml(track.slug)}">${escapeHtml(track.title)}</option>`).join('');
  const statuses = [...new Set(papers.map(paper => paper.readingStatus))];
  statusFilter.innerHTML += statuses.map(readingStatus => `<option value="${escapeHtml(readingStatus)}">${escapeHtml(readingStatus)}</option>`).join('');
  if (tracks.some(track => track.slug === requestedTrack)) trackFilter.value = requestedTrack;

  summary.innerHTML = tracks.map((track, index) => {
    const count = papers.filter(paper => paper.track === track.slug).length;
    return `
      <button type="button" data-paper-track="${escapeHtml(track.slug)}">
        <span>${String(index + 1).padStart(2, '0')}</span>
        <strong>${escapeHtml(track.title)}</strong>
        <small>${count} papers</small>
      </button>
    `;
  }).join('');

  function searchableText(paper) {
    return [
      paper.title, paper.shortTitle, paper.authors.join(' '), paper.venue, paper.abstractSummary,
      paper.whyReading, paper.readingQuestion, paper.thesis, paper.tags.join(' '),
      paper.contributions.join(' '), paper.sections.flatMap(section => [section.title, ...section.paragraphs]).join(' '),
      paper.comments.flatMap(comment => [comment.title, comment.text]).join(' ')
    ].join(' ').toLowerCase();
  }

  function render() {
    const query = search.value.trim().toLowerCase();
    const selectedTrack = trackFilter.value;
    const selectedStatus = statusFilter.value;
    const filtered = papers.filter(paper => {
      const trackMatches = selectedTrack === 'all' || paper.track === selectedTrack;
      const statusMatches = selectedStatus === 'all' || paper.readingStatus === selectedStatus;
      return trackMatches && statusMatches && (!query || searchableText(paper).includes(query));
    });

    filtered.sort((a, b) => {
      if (sort.value === 'newest') return b.year - a.year || a.title.localeCompare(b.title);
      if (sort.value === 'oldest') return a.year - b.year || a.title.localeCompare(b.title);
      if (sort.value === 'title') return a.title.localeCompare(b.title);
      return paperIndex.get(a.slug) - paperIndex.get(b.slug);
    });

    empty.classList.toggle('hidden', filtered.length > 0);
    list.innerHTML = filtered.map((paper, index) => {
      const track = window.getQuantumResearchTrack(paper.track);
      return `
        <article class="paper-list-card">
          <div class="paper-list-index">${String(index + 1).padStart(2, '0')}</div>
          <div class="paper-list-main">
            <div class="paper-list-meta"><span>${escapeHtml(track?.title || paper.track)}</span><span>${paper.year}</span><span>${escapeHtml(paper.readingStatus)}</span><span>${paper.readingTime} min notes</span></div>
            <h3><a href="${window.getQuantumPaperHref(paper)}">${escapeHtml(paper.title)}</a></h3>
            <p class="paper-list-authors">${escapeHtml(paper.authors.join(', '))}</p>
            <p class="paper-list-venue">${escapeHtml(paper.venue)}</p>
            <div class="paper-list-question"><span>Why I am reading it</span><p>${escapeHtml(paper.whyReading)}</p></div>
            <div class="paper-list-tags">${paper.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}</div>
          </div>
          <div class="paper-list-actions">
            <span><strong>${paper.comments.length}</strong> comments</span>
            <span><strong>${paper.sections.length}</strong> analysis sections</span>
            <a class="paper-internal-link" href="${window.getQuantumPaperHref(paper)}">Open my analysis &rarr;</a>
            <a class="paper-source-link" href="${escapeHtml(paper.sourceUrl)}" target="_blank" rel="noopener noreferrer">Original paper &nearr;</a>
          </div>
        </article>
      `;
    }).join('');

    summary.querySelectorAll('button').forEach(button => {
      button.classList.toggle('active', button.dataset.paperTrack === selectedTrack);
    });
    const url = new URL(window.location.href);
    if (selectedTrack === 'all') url.searchParams.delete('track');
    else url.searchParams.set('track', selectedTrack);
    history.replaceState(null, '', url.pathname + url.search);
  }

  search.addEventListener('input', window.siteUtils.debounce(render, 180));
  trackFilter.addEventListener('change', render);
  statusFilter.addEventListener('change', render);
  sort.addEventListener('change', render);
  summary.addEventListener('click', event => {
    const button = event.target.closest('[data-paper-track]');
    if (!button) return;
    trackFilter.value = button.dataset.paperTrack;
    render();
  });
  document.getElementById('paperReset')?.addEventListener('click', () => {
    search.value = '';
    trackFilter.value = 'all';
    statusFilter.value = 'all';
    sort.value = 'reading';
    render();
  });
  render();
})();
