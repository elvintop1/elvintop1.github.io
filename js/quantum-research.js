(function() {
  const notes = window.quantumResearchNotes || [];
  const tracks = window.quantumResearchTracks || [];
  const trackGrid = document.getElementById('researchTrackGrid');
  const timeline = document.getElementById('researchTimeline');
  const search = document.getElementById('researchSearch');
  const trackFilter = document.getElementById('researchTrackFilter');
  const sort = document.getElementById('researchSort');
  const empty = document.getElementById('researchEmpty');
  if (!trackGrid || !timeline || !search || !trackFilter || !sort) return;

  const escapeHtml = value => String(value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');

  const formatDate = date => new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(`${date}T00:00:00`));
  const params = new URLSearchParams(window.location.search);
  const requestedTrack = params.get('track') || 'all';

  document.getElementById('researchStats').innerHTML = `
    <div><dt>${tracks.length}</dt><dd>active directions</dd></div>
    <div><dt>${notes.length}</dt><dd>long-form notes</dd></div>
    <div><dt>${new Set(notes.map(note => note.date)).size}</dt><dd>research days</dd></div>
    <div><dt>${notes.reduce((sum, note) => sum + note.openQuestions.length, 0)}</dt><dd>open questions</dd></div>
  `;

  trackGrid.innerHTML = tracks.map((track, index) => {
    const trackNotes = notes.filter(note => note.track === track.slug);
    const latest = [...trackNotes].sort((a, b) => b.date.localeCompare(a.date) || b.sequence - a.sequence)[0];
    return `
      <a class="research-track-card track-${escapeHtml(track.color)}" href="research.html?track=${encodeURIComponent(track.slug)}">
        <span class="track-index">${String(index + 1).padStart(2, '0')}</span>
        <h3>${escapeHtml(track.title)}</h3>
        <p>${escapeHtml(track.description)}</p>
        <div><span>${trackNotes.length} ${trackNotes.length === 1 ? 'note' : 'notes'}</span><span>${latest ? `Updated ${escapeHtml(formatDate(latest.date))}` : 'No notes yet'}</span></div>
      </a>
    `;
  }).join('');

  trackFilter.innerHTML += tracks.map(track => `<option value="${escapeHtml(track.slug)}">${escapeHtml(track.title)}</option>`).join('');
  if (tracks.some(track => track.slug === requestedTrack)) trackFilter.value = requestedTrack;

  function searchableText(note) {
    return [note.title, note.subtitle, note.abstract, note.researchQuestion, note.tags.join(' '), note.keyFindings.join(' '), ...note.sections.flatMap(section => [section.title, ...section.paragraphs])].join(' ').toLowerCase();
  }

  function render() {
    const query = search.value.trim().toLowerCase();
    const selectedTrack = trackFilter.value;
    const filtered = notes.filter(note => {
      const trackMatches = selectedTrack === 'all' || note.track === selectedTrack;
      const searchMatches = !query || searchableText(note).includes(query);
      return trackMatches && searchMatches;
    }).sort((a, b) => {
      const direction = sort.value === 'oldest' ? 1 : -1;
      return direction * (a.date.localeCompare(b.date) || a.sequence - b.sequence);
    });

    empty.classList.toggle('hidden', filtered.length > 0);
    timeline.innerHTML = '';
    const groups = filtered.reduce((map, note) => {
      if (!map.has(note.date)) map.set(note.date, []);
      map.get(note.date).push(note);
      return map;
    }, new Map());

    groups.forEach((dateNotes, date) => {
      const group = document.createElement('section');
      group.className = 'research-date-group';
      group.innerHTML = `
        <header><time datetime="${escapeHtml(date)}">${escapeHtml(formatDate(date))}</time><span>${dateNotes.length} ${dateNotes.length === 1 ? 'investigation' : 'investigations'}</span></header>
        <div class="research-note-list">
          ${dateNotes.map(note => {
            const track = window.getQuantumResearchTrack(note.track);
            return `
              <article class="research-note-card">
                <div class="research-card-meta"><span>${escapeHtml(track?.title || note.track)}</span><span>${escapeHtml(note.status)}</span><span>${note.readingTime} min</span></div>
                <h3><a href="${window.getQuantumResearchNoteHref(note)}">${escapeHtml(note.title)}</a></h3>
                <p>${escapeHtml(note.subtitle)}</p>
                <div class="research-question-preview"><span>Research question</span><p>${escapeHtml(note.researchQuestion)}</p></div>
                <div class="research-card-footer"><div>${note.tags.slice(0, 4).map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}</div><a href="${window.getQuantumResearchNoteHref(note)}">Read note &rarr;</a></div>
              </article>
            `;
          }).join('')}
        </div>
      `;
      timeline.appendChild(group);
    });

    const url = new URL(window.location.href);
    if (selectedTrack === 'all') url.searchParams.delete('track');
    else url.searchParams.set('track', selectedTrack);
    history.replaceState(null, '', `${url.pathname}${url.search}`);
  }

  search.addEventListener('input', window.siteUtils.debounce(render, 180));
  trackFilter.addEventListener('change', render);
  sort.addEventListener('change', render);
  document.getElementById('researchReset')?.addEventListener('click', () => {
    search.value = '';
    trackFilter.value = 'all';
    sort.value = 'newest';
    render();
  });
  render();
})();
