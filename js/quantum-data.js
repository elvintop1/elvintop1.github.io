window.quantumBlog = [
  {
    day: 1,
    date: '2026-07-22',
    title: 'The Beginning: What is Quantum Computing?',
    status: 'evergreen',
    tags: ['basics', 'introduction'],
    readingTime: 5,
    content: `
      <h2>Why Quantum Computing?</h2>
      <p>Today marks the beginning of my quantum computing journey. Classical computers use bits (0 or 1), but quantum computers use <strong>qubits</strong> that can exist in a superposition of both states simultaneously.</p>
      <p>The quantum state of a qubit is described by:</p>
      <div class="math-block">$$|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle$$</div>
      <p>where $\\alpha$ and $\\beta$ are complex amplitudes satisfying $|\\alpha|^2 + |\\beta|^2 = 1$.</p>
      <h2>Key Concepts I Learned</h2>
      <ul>
        <li><strong>Superposition</strong>: A qubit can be in a combination of |0⟩ and |1⟩</li>
        <li><strong>Measurement</strong>: Observing a qubit collapses it to either |0⟩ or |1⟩</li>
        <li><strong>Probability</strong>: |α|² gives probability of measuring |0⟩, |β|² for |1⟩</li>
      </ul>
      <h2>Resources</h2>
      <p>Started with Nielsen & Chuang's textbook, Chapter 1. Also watching IBM Qiskit tutorials on YouTube.</p>
    `
  },
  {
    day: 2,
    date: '2026-07-23',
    title: 'Complex Numbers & Linear Algebra Review',
    status: 'evergreen',
    tags: ['math', 'prerequisites'],
    readingTime: 8,
    content: `
      <h2>Mathematical Prerequisites</h2>
      <p>Quantum computing heavily relies on linear algebra. Today I reviewed the essential math.</p>
      <h2>Complex Numbers</h2>
      <p>A complex number $z = a + bi$ where $i = \\sqrt{-1}$. The complex conjugate is $z^* = a - bi$.</p>
      <p>Euler's formula connects complex exponentials to trigonometry:</p>
      <div class="math-block">$$e^{i\\theta} = \\cos\\theta + i\\sin\\theta$$</div>
      <h2>Vectors & Matrices</h2>
      <p>Quantum states are represented as column vectors in a complex vector space (Hilbert space).</p>
      <p>The standard computational basis:</p>
      <div class="math-block">$$|0\\rangle = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}, \\quad |1\\rangle = \\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix}$$</div>
      <h2>Inner Product & Bra-Ket Notation</h2>
      <p>Dirac notation uses kets $|\\psi\\rangle$ for column vectors and bras $\\langle\\psi|$ for row vectors (conjugate transpose).</p>
      <p>The inner product: $\\langle\\phi|\\psi\\rangle$ gives overlap between two states.</p>
    `
  },
  {
    day: 3,
    date: '2026-07-24',
    title: 'Dirac Notation Deep Dive',
    status: 'evergreen',
    tags: ['math', 'dirac-notation', 'fundamentals'],
    readingTime: 6,
    content: `
      <h2>Bra-Ket Notation</h2>
      <p>Paul Dirac invented this elegant notation for quantum mechanics. It's both compact and powerful.</p>
      <h2>Key Rules</h2>
      <ul>
        <li><strong>Ket</strong> $|\\psi\\rangle$: A column vector (state vector)</li>
        <li><strong>Bra</strong> $\\langle\\psi|$: The conjugate transpose (row vector)</li>
        <li><strong>Bracket</strong> $\\langle\\phi|\\psi\\rangle$: Inner product (scalar)</li>
        <li><strong>Outer product</strong> $|\\psi\\rangle\\langle\\phi|$: A matrix (operator)</li>
      </ul>
      <h2>Orthonormality</h2>
      <div class="math-block">$$\\langle i|j\\rangle = \\delta_{ij} = \\begin{cases} 1 & \\text{if } i = j \\\\ 0 & \\text{if } i \\neq j \\end{cases}$$</div>
      <h2>Completeness Relation</h2>
      <div class="math-block">$$\\sum_i |i\\rangle\\langle i| = I$$</div>
      <p>This is incredibly useful for inserting identity operators in calculations.</p>
    `
  },
  {
    day: 4,
    date: '2026-07-25',
    title: 'The Bloch Sphere: Visualizing Qubits',
    status: 'budding',
    tags: ['qubits', 'visualization', 'fundamentals'],
    readingTime: 7,
    content: `
      <h2>Geometric Representation</h2>
      <p>Any single qubit pure state can be written as:</p>
      <div class="math-block">$$|\\psi\\rangle = \\cos\\frac{\\theta}{2}|0\\rangle + e^{i\\phi}\\sin\\frac{\\theta}{2}|1\\rangle$$</div>
      <p>where $\\theta \\in [0, \\pi]$ and $\\phi \\in [0, 2\\pi)$.</p>
      <h2>Key Points on the Bloch Sphere</h2>
      <ul>
        <li><strong>North pole</strong> $(\\theta=0)$: $|0\\rangle$</li>
        <li><strong>South pole</strong> $(\\theta=\\pi)$: $|1\\rangle$</li>
        <li><strong>Equator</strong>: Equal superpositions like $|+\\rangle$ and $|-\\rangle$</li>
      </ul>
      <h2>Important States</h2>
      <div class="math-block">$$|+\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle + |1\\rangle), \\quad |-\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle - |1\\rangle)$$</div>
      <p>Quantum gates correspond to <em>rotations</em> on the Bloch sphere!</p>
    `
  },
  {
    day: 5,
    date: '2026-07-26',
    title: 'Single Qubit Gates: Pauli Matrices',
    status: 'budding',
    tags: ['gates', 'pauli', 'fundamentals'],
    readingTime: 8,
    content: `
      <h2>The Pauli Matrices</h2>
      <p>The three Pauli matrices are fundamental single-qubit operations:</p>
      <div class="math-block">$$X = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}, \\quad Y = \\begin{pmatrix} 0 & -i \\\\ i & 0 \\end{pmatrix}, \\quad Z = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$$</div>
      <h2>What They Do</h2>
      <ul>
        <li><strong>X gate</strong> (NOT gate): Flips $|0\\rangle \\leftrightarrow |1\\rangle$ — rotation by $\\pi$ around X-axis</li>
        <li><strong>Y gate</strong>: Rotation by $\\pi$ around Y-axis with phase</li>
        <li><strong>Z gate</strong>: Phase flip — adds $-1$ phase to $|1\\rangle$, rotation around Z-axis</li>
      </ul>
      <h2>Properties</h2>
      <p>All Pauli matrices are:</p>
      <ul>
        <li>Hermitian: $X = X^\\dagger$</li>
        <li>Unitary: $XX^\\dagger = I$</li>
        <li>Involutory: $X^2 = I$ (applying twice = identity)</li>
      </ul>
    `
  },
  {
    day: 6,
    date: '2026-07-27',
    title: 'Hadamard Gate & Superposition',
    status: 'budding',
    tags: ['gates', 'hadamard', 'superposition'],
    readingTime: 6,
    content: `
      <h2>The Most Important Gate</h2>
      <p>The Hadamard gate creates superposition from computational basis states:</p>
      <div class="math-block">$$H = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}$$</div>
      <h2>Action on Basis States</h2>
      <div class="math-block">$$H|0\\rangle = \\frac{|0\\rangle + |1\\rangle}{\\sqrt{2}} = |+\\rangle$$</div>
      <div class="math-block">$$H|1\\rangle = \\frac{|0\\rangle - |1\\rangle}{\\sqrt{2}} = |-\\rangle$$</div>
      <h2>Key Property</h2>
      <p>Applying Hadamard twice returns to original state: $H^2 = I$</p>
      <p>The Hadamard gate is the quantum computing workhorse — it appears at the beginning of almost every quantum algorithm!</p>
    `
  },
  {
    day: 7,
    date: '2026-07-28',
    title: 'CNOT Gate & Entanglement',
    status: 'budding',
    tags: ['gates', 'cnot', 'entanglement'],
    readingTime: 7,
    content: `
      <h2>Two-Qubit Gates</h2>
      <p>The Controlled-NOT (CNOT) gate operates on two qubits: a <strong>control</strong> and a <strong>target</strong>.</p>
      <div class="math-block">$$\\text{CNOT} = \\begin{pmatrix} 1&0&0&0 \\\\ 0&1&0&0 \\\\ 0&0&0&1 \\\\ 0&0&1&0 \\end{pmatrix}$$</div>
      <p>It flips the target qubit if and only if the control qubit is $|1\\rangle$.</p>
      <h2>Creating Bell States</h2>
      <p>Hadamard + CNOT creates maximally entangled Bell states:</p>
      <div class="math-block">$$|\\Phi^+\\rangle = \\frac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)$$</div>
      <p>This is quantum entanglement — measuring one qubit instantly determines the other, regardless of distance!</p>
      <h2>Circuit</h2>
      <pre><code>q0: ──H──●──
         │
q1: ─────X──</code></pre>
    `
  },
  {
    day: 8,
    date: '2026-07-29',
    title: 'Quantum Measurement & Born Rule',
    status: 'seedling',
    tags: ['measurement', 'fundamentals', 'theory'],
    readingTime: 6,
    content: `
      <h2>Measurement in Quantum Computing</h2>
      <p>Measurement is one of the most counterintuitive aspects of quantum mechanics.</p>
      <h2>Born Rule</h2>
      <p>For a state $|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle$:</p>
      <ul>
        <li>Probability of measuring $|0\\rangle$: $P(0) = |\\alpha|^2$</li>
        <li>Probability of measuring $|1\\rangle$: $P(1) = |\\beta|^2$</li>
      </ul>
      <h2>Wavefunction Collapse</h2>
      <p>After measurement, the state <em>collapses</em> to the measured outcome. The superposition is destroyed.</p>
      <p>This is irreversible — you can't "un-measure" a qubit!</p>
      <h2>No-Cloning Theorem</h2>
      <p>It's impossible to create an exact copy of an unknown quantum state. This has profound implications for quantum cryptography.</p>
    `
  },
  {
    day: 9,
    date: '2026-07-30',
    title: 'Tensor Products & Multi-Qubit Systems',
    status: 'seedling',
    tags: ['math', 'multi-qubit', 'tensor-product'],
    readingTime: 8,
    content: `
      <h2>Combining Quantum Systems</h2>
      <p>To describe multiple qubits, we use the <strong>tensor product</strong> $\\otimes$:</p>
      <div class="math-block">$$|\\psi\\rangle_{AB} = |\\psi\\rangle_A \\otimes |\\psi\\rangle_B$$</div>
      <h2>Two-Qubit Computational Basis</h2>
      <div class="math-block">$$\\{|00\\rangle, |01\\rangle, |10\\rangle, |11\\rangle\\}$$</div>
      <p>A general 2-qubit state has 4 complex amplitudes (but constrained by normalization).</p>
      <h2>Separable vs Entangled</h2>
      <p>A state is <strong>separable</strong> if it can be written as a tensor product: $|\\psi\\rangle = |a\\rangle \\otimes |b\\rangle$</p>
      <p>If not, it's <strong>entangled</strong>. Example: $\\frac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)$ cannot be factored!</p>
    `
  },
  {
    day: 10,
    date: '2026-07-31',
    title: 'Phase Gates & Rotation Gates',
    status: 'seedling',
    tags: ['gates', 'phase', 'rotation'],
    readingTime: 7,
    content: `
      <h2>Phase Gates</h2>
      <p>Phase gates add a relative phase to the $|1\\rangle$ component:</p>
      <div class="math-block">$$R_\\phi = \\begin{pmatrix} 1 & 0 \\\\ 0 & e^{i\\phi} \\end{pmatrix}$$</div>
      <h2>Special Cases</h2>
      <ul>
        <li><strong>S gate</strong> ($\\phi = \\pi/2$): $\\sqrt{Z}$ gate</li>
        <li><strong>T gate</strong> ($\\phi = \\pi/4$): Important for fault-tolerant QC</li>
        <li><strong>Z gate</strong> ($\\phi = \\pi$): Phase flip</li>
      </ul>
      <h2>General Rotation Gates</h2>
      <div class="math-block">$$R_x(\\theta) = e^{-i\\theta X/2}, \\quad R_y(\\theta) = e^{-i\\theta Y/2}, \\quad R_z(\\theta) = e^{-i\\theta Z/2}$$</div>
      <p>Any single-qubit gate can be decomposed into rotations: $U = e^{i\\alpha}R_z(\\beta)R_y(\\gamma)R_z(\\delta)$</p>
    `
  },
  {
    day: 11,
    date: '2026-08-01',
    title: 'Quantum Circuit Composition',
    status: 'seedling',
    tags: ['circuits', 'composition', 'universality'],
    readingTime: 6,
    content: `
      <h2>Building Complex Circuits</h2>
      <p>Quantum circuits are read left to right. Gates on the same wire compose via matrix multiplication (right to left).</p>
      <h2>Universal Gate Sets</h2>
      <p>A set of gates is <strong>universal</strong> if any unitary operation can be approximated to arbitrary precision.</p>
      <p>Common universal gate sets:</p>
      <ul>
        <li>{H, T, CNOT} — Standard universal set</li>
        <li>{H, Toffoli} — Also universal</li>
        <li>Any entangling 2-qubit gate + arbitrary single-qubit gates</li>
      </ul>
      <h2>Solovay-Kitaev Theorem</h2>
      <p>Given a universal gate set, any $n$-qubit unitary can be approximated to error $\\epsilon$ using $O(\\log^c(1/\\epsilon))$ gates.</p>
    `
  },
  {
    day: 12,
    date: '2026-08-02',
    title: 'Bell States & Quantum Teleportation',
    status: 'seedling',
    tags: ['entanglement', 'teleportation', 'protocols'],
    readingTime: 9,
    content: `
      <h2>The Four Bell States</h2>
      <div class="math-block">$$|\\Phi^\\pm\\rangle = \\frac{1}{\\sqrt{2}}(|00\\rangle \\pm |11\\rangle)$$</div>
      <div class="math-block">$$|\\Psi^\\pm\\rangle = \\frac{1}{\\sqrt{2}}(|01\\rangle \\pm |10\\rangle)$$</div>
      <p>These form a complete orthonormal basis for 2-qubit systems.</p>
      <h2>Quantum Teleportation Protocol</h2>
      <p>Alice can transmit a qubit state to Bob using:</p>
      <ol>
        <li>A shared Bell pair $|\\Phi^+\\rangle$</li>
        <li>Two classical bits of communication</li>
        <li>Bell measurement by Alice</li>
        <li>Corrective operation by Bob</li>
      </ol>
      <p>No faster-than-light communication — the classical bits are essential!</p>
    `
  }
];

window.quantumWiki = {
  fundamentals: {
    name: 'Fundamentals',
    icon: '📐',
    topics: {
      qubit: {
        title: 'Qubit',
        difficulty: 1,
        lastUpdated: '2026-07-23',
        dayLearned: 1,
        summary: 'The basic unit of quantum information',
        content: `
          <h3>What is a Qubit?</h3>
          <p>A qubit (quantum bit) is the basic unit of quantum information, analogous to the classical bit. Unlike a classical bit which is either 0 or 1, a qubit can be in a superposition of both states.</p>
          <div class="math-block">$$|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle$$</div>
          <p>The amplitudes $\\alpha$ and $\\beta$ are complex numbers such that $|\\alpha|^2 + |\\beta|^2 = 1$.</p>
        `,
        related: ['superposition', 'measurement', 'bloch-sphere']
      },
      superposition: {
        title: 'Superposition',
        difficulty: 1,
        lastUpdated: '2026-07-24',
        dayLearned: 1,
        summary: 'The ability of a quantum system to be in multiple states simultaneously.',
        content: `
          <h3>Understanding Superposition</h3>
          <p>Superposition implies that a quantum particle exists in a linear combination of its basis states.</p>
          <div class="math-block">$$|\\psi\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle + |1\\rangle)$$</div>
        `,
        related: ['qubit']
      },
      entanglement: {
        title: 'Entanglement',
        difficulty: 3,
        lastUpdated: '2026-07-28',
        dayLearned: 7,
        summary: 'A strong correlation between quantum particles.',
        content: `
          <h3>Quantum Entanglement</h3>
          <p>Entanglement occurs when a group of particles is generated, interacts, or shares spatial proximity in such a way that the quantum state of each particle cannot be described independently.</p>
        `,
        related: ['cnot', 'bell-states']
      },
      measurement: {
        title: 'Measurement',
        difficulty: 2,
        lastUpdated: '2026-07-29',
        dayLearned: 8,
        summary: 'Observing a quantum system causes wave function collapse.',
        content: `
          <h3>The Measurement Problem</h3>
          <p>According to the Born rule, the probability of measuring state $|x\\rangle$ given state $|\\psi\\rangle$ is $|\\langle x|\\psi \\rangle|^2$.</p>
        `,
        related: ['qubit', 'superposition']
      },
      'dirac-notation': {
        title: 'Dirac Notation',
        difficulty: 1,
        lastUpdated: '2026-07-24',
        dayLearned: 3,
        summary: 'Standard notation for quantum mechanics equations.',
        content: `
          <h3>Bra-Ket Notation</h3>
          <p>States are denoted by kets $|\\psi\\rangle$, and their duals by bras $\\langle \\psi |$.</p>
        `,
        related: ['qubit']
      }
    }
  },
  gates: {
    name: 'Quantum Gates',
    icon: '🔲',
    topics: {
      'pauli-x': {
        title: 'Pauli-X Gate',
        difficulty: 1,
        lastUpdated: '2026-07-26',
        dayLearned: 5,
        summary: 'The quantum NOT gate.',
        content: `<h3>Pauli-X</h3><p>Flips the state.</p><div class="math-block">$$X = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$$</div>`,
        related: ['qubit']
      },
      'pauli-y': {
        title: 'Pauli-Y Gate',
        difficulty: 1,
        lastUpdated: '2026-07-26',
        dayLearned: 5,
        summary: 'Rotates around Y axis.',
        content: `<h3>Pauli-Y</h3><div class="math-block">$$Y = \\begin{pmatrix} 0 & -i \\\\ i & 0 \\end{pmatrix}$$</div>`,
        related: ['qubit']
      },
      'pauli-z': {
        title: 'Pauli-Z Gate',
        difficulty: 1,
        lastUpdated: '2026-07-26',
        dayLearned: 5,
        summary: 'Phase flip gate.',
        content: `<h3>Pauli-Z</h3><div class="math-block">$$Z = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$$</div>`,
        related: ['qubit']
      },
      'hadamard': {
        title: 'Hadamard Gate',
        difficulty: 2,
        lastUpdated: '2026-07-27',
        dayLearned: 6,
        summary: 'Creates superposition.',
        content: `<h3>Hadamard</h3><p>Creates equal superposition.</p><div class="math-block">$$H = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}$$</div>`,
        related: ['superposition']
      },
      'cnot': {
        title: 'CNOT Gate',
        difficulty: 2,
        lastUpdated: '2026-07-28',
        dayLearned: 7,
        summary: 'Controlled-NOT for entanglement.',
        content: `<h3>CNOT</h3><p>Flips target if control is 1.</p>`,
        related: ['entanglement']
      }
    }
  }
};

window.renderBlogCards = function(entries, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  
  entries.forEach(entry => {
    const card = document.createElement('div');
    card.className = 'journal-card quantum-card hover-lift';
    card.innerHTML = `
      <div class="card-header">
        <span class="day-badge">Day ${entry.day}</span>
        <span class="date">${window.siteUtils.formatDate(entry.date)}</span>
      </div>
      <h3>${entry.title}</h3>
      <div class="tags">
        ${entry.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
      <div class="reading-time">${entry.readingTime} min read</div>
    `;
    card.addEventListener('click', () => window.renderBlogModal(entry));
    container.appendChild(card);
  });
};

window.renderBlogModal = function(entry) {
  const modal = document.getElementById('blogModal');
  const content = document.getElementById('blogModalContent');
  if (!modal || !content) return;
  
  content.innerHTML = `
    <div class="modal-header">
      <h2>${entry.title}</h2>
      <p class="modal-meta">Day ${entry.day} • ${window.siteUtils.formatDate(entry.date)}</p>
    </div>
    <div class="modal-body">${entry.content}</div>
  `;
  
  window.siteUtils.renderMath(content);
  modal.classList.remove('hidden');
  modal.classList.add('active');
  modal.style.display = 'flex';
};

window.closeBlogModal = function() {
  const modal = document.getElementById('blogModal');
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
    modal.classList.add('hidden');
  }
};

window.renderRecentEntries = function(count = 3) {
  const container = document.getElementById('recentBlogEntries');
  if (!container) return;
  
  const recent = [...window.quantumBlog].sort((a, b) => b.day - a.day).slice(0, count);
  window.renderBlogCards(recent, 'recentBlogEntries');
};

window.filterBlogEntries = function(searchTerm, tag) {
  const term = searchTerm.toLowerCase();
  const filtered = window.quantumBlog.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(term) || entry.content.toLowerCase().includes(term);
    const matchesTag = !tag || tag === 'all' || entry.tags.includes(tag);
    return matchesSearch && matchesTag;
  });

  const sortSelect = document.getElementById('sortOrder');
  const sortNewest = !sortSelect || sortSelect.value !== 'oldest';
  if (sortNewest) {
    filtered.sort((a, b) => b.day - a.day);
  } else {
    filtered.sort((a, b) => a.day - b.day);
  }

  const emptyState = document.getElementById('blogEmptyState');
  if (emptyState) {
    emptyState.classList.toggle('hidden', filtered.length > 0);
    emptyState.style.display = filtered.length === 0 ? 'block' : 'none';
  }

  window.renderBlogCards(filtered, 'blogContainer');
};

window.renderWikiSidebar = function() {
  const sidebar = document.getElementById('wikiSidebar') || document.querySelector('.wiki-sidebar');
  if (!sidebar) return;
  
  let topicsList = document.getElementById('wikiTopicsList');
  if (!topicsList) {
    topicsList = document.createElement('div');
    topicsList.id = 'wikiTopicsList';
    sidebar.appendChild(topicsList);
  }
  
  let html = '';
  for (const [catKey, category] of Object.entries(window.quantumWiki)) {
    html += `<div class="wiki-category">`;
    html += `<details open>`;
    html += `<summary>${category.icon} ${category.name}</summary>`;
    html += `<ul>`;
    for (const [topicKey, topic] of Object.entries(category.topics)) {
      html += `<li><a href="#${catKey}/${topicKey}" class="wiki-topic-link" data-category="${catKey}" data-topic="${topicKey}">${topic.title}</a></li>`;
    }
    html += `</ul>`;
    html += `</details>`;
    html += `</div>`;
  }
  topicsList.innerHTML = html;
  
  topicsList.querySelectorAll('.wiki-topic-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = link.getAttribute('data-category');
      const topic = link.getAttribute('data-topic');
      window.renderWikiTopic(cat, topic);
      topicsList.querySelectorAll('.wiki-topic-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      window.location.hash = `${cat}/${topic}`;
    });
  });
};

window.renderWikiTopic = function(categoryKey, topicKey) {
  const contentArea = document.getElementById('wikiTopicContent');
  if (!contentArea) return;
  
  const category = window.quantumWiki[categoryKey];
  if (!category) return;
  
  const topic = category.topics[topicKey];
  if (!topic) return;
  
  const breadcrumb = document.getElementById('wikiBreadcrumb');
  if (breadcrumb) {
    breadcrumb.innerHTML = `<a href="wiki.html">Wiki</a> / <a href="#" data-category="${categoryKey}">${category.name}</a> / <span>${topic.title}</span>`;
  }
  
  contentArea.innerHTML = `
    <div class="topic-header">
      <h1>${topic.title}</h1>
      <p class="summary">${topic.summary}</p>
    </div>
    <div class="topic-body">${topic.content}</div>
  `;
  
  window.siteUtils.renderMath(contentArea);
  window.generateTOC(contentArea);
};

window.generateTOC = function(contentElement) {
  const tocNav = document.getElementById('tocNav') || document.getElementById('wikiToc');
  if (!tocNav) return;
  
  const headings = contentElement.querySelectorAll('h2, h3');
  if (headings.length === 0) {
    tocNav.innerHTML = '';
    return;
  }
  
  let html = '<h4>Table of Contents</h4><ul class="toc-list">';
  headings.forEach((heading, i) => {
    const id = 'toc-' + i;
    heading.id = id;
    const indent = heading.tagName === 'H3' ? ' class="toc-sub"' : '';
    html += `<li${indent}><a href="#${id}">${heading.textContent}</a></li>`;
  });
  html += '</ul>';
  tocNav.innerHTML = html;
};

window.initBlogSearch = function() {
  const searchInput = document.getElementById('blogSearch');
  let activeTag = 'all';
  
  if (searchInput) {
    searchInput.addEventListener('input', window.siteUtils.debounce((e) => {
      window.filterBlogEntries(e.target.value, activeTag);
    }, 300));
  }
  
  document.querySelectorAll('.filter-pill, .pill').forEach(pill => {
    pill.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-pill, .pill').forEach(p => p.classList.remove('active'));
      e.target.classList.add('active');
      activeTag = (e.target.getAttribute('data-tag') || e.target.getAttribute('data-filter') || '').toLowerCase();
      window.filterBlogEntries(searchInput ? searchInput.value : '', activeTag);
    });
  });

  const sortOrder = document.getElementById('sortOrder');
  if (sortOrder) {
    sortOrder.addEventListener('change', () => {
      window.filterBlogEntries(
        document.getElementById('blogSearch')?.value || '',
        activeTag
      );
    });
  }

  const clearBtn = document.getElementById('clearFiltersBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      const searchInput = document.getElementById('blogSearch');
      if (searchInput) searchInput.value = '';
      activeTag = 'all';
      document.querySelectorAll('.filter-pill, .pill').forEach(p => p.classList.remove('active'));
      const allPill = document.querySelector('.filter-pill[data-tag="all"], .pill[data-filter="All"]');
      if (allPill) allPill.classList.add('active');
      window.renderBlogCards(window.quantumBlog, 'blogContainer');
      const emptyState = document.getElementById('blogEmptyState');
      if (emptyState) {
        emptyState.classList.add('hidden');
        emptyState.style.display = 'none';
      }
    });
  }
};

window.loadTopicFromHash = function() {
  if (window.location.hash) {
    const parts = window.location.hash.substring(1).split('/');
    if (parts.length === 2) {
      window.renderWikiTopic(parts[0], parts[1]);
    }
  }
};

window.initQuantumPage = function() {
  const page = window.location.pathname;
  if (page.includes('blog') || document.getElementById('blogContainer')) {
    window.renderBlogCards(window.quantumBlog, 'blogContainer');
    window.initBlogSearch();
  }
  if (page.includes('wiki') || document.getElementById('wikiSidebar')) {
    window.renderWikiSidebar();
    window.loadTopicFromHash();

    document.querySelectorAll('.wiki-topic-btn').forEach(button => {
      button.addEventListener('click', () => {
        const topicKey = button.getAttribute('data-topic');
        const categoryEntry = Object.entries(window.quantumWiki).find(([, category]) => category.topics[topicKey]);
        if (!categoryEntry) return;
        const [categoryKey] = categoryEntry;
        window.renderWikiTopic(categoryKey, topicKey);
        window.location.hash = `${categoryKey}/${topicKey}`;
      });
    });

    const wikiSearch = document.getElementById('wikiSearch');
    if (wikiSearch) {
      wikiSearch.addEventListener('input', () => {
        const searchTerm = wikiSearch.value.trim().toLowerCase();
        document.querySelectorAll('#wikiTopicsList li').forEach(item => {
          item.style.display = item.textContent.toLowerCase().includes(searchTerm) ? '' : 'none';
        });
      });
    }
  }
  if (document.getElementById('recentBlogEntries')) {
    window.renderRecentEntries(3);
  }
  
  const modalClose = document.getElementById('blogModalClose') || document.getElementById('closeBlogModal');
  if (modalClose) {
    modalClose.addEventListener('click', window.closeBlogModal);
  }
};

// Aliases for backward compatibility with inline scripts
if (!window.renderRecentEntries) window.renderRecentEntries = typeof renderRecentEntries === 'function' ? renderRecentEntries : function() {};
if (!window.populateRecentEntries) window.populateRecentEntries = window.renderRecentEntries;
if (!window.initBlog) window.initBlog = typeof initQuantumPage === 'function' ? initQuantumPage : (window.initQuantumPage || function() {});
if (!window.initWiki) window.initWiki = typeof initQuantumPage === 'function' ? initQuantumPage : (window.initQuantumPage || function() {});

document.addEventListener('DOMContentLoaded', window.initQuantumPage);
