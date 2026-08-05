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

window.quantumWeeks = [
  {
    week: 1,
    stage: 'Stage 1 · Foundations',
    status: 'completed',
    statusLabel: 'Completed',
    progress: 100,
    title: 'Mathematical Language of Quantum Computing',
    summary: 'Build the linear-algebra toolkit needed to read state vectors, operators, measurements, and multi-qubit systems without treating the notation as a black box.',
    tags: ['Linear algebra', 'Complex numbers', 'Dirac notation'],
    objectives: [
      'Compute with complex numbers, conjugates, magnitudes, and phases.',
      'Translate fluently between vectors, matrices, and bra–ket notation.',
      'Use inner products, outer products, eigenvalues, and basis changes.',
      'Apply tensor products and verify normalization, Hermiticity, and unitarity.'
    ],
    lessons: [
      { title: 'Complex amplitudes', detail: 'Cartesian and polar form, Euler’s identity, complex conjugation, absolute value, relative phase, and why a global phase cannot affect measurement statistics.' },
      { title: 'Vectors and Hilbert spaces', detail: 'Column vectors, span, linear independence, bases, dimension, normalization, and the geometric meaning of orthogonal quantum states.' },
      { title: 'Inner and outer products', detail: 'Probability amplitudes from inner products; projectors and operators from outer products; completeness of an orthonormal basis.' },
      { title: 'Matrices and spectral structure', detail: 'Matrix multiplication, adjoints, Hermitian and unitary matrices, eigenvectors, eigenvalues, and diagonalization.' },
      { title: 'Dirac notation', detail: 'Kets, bras, brackets, operators, expectation values, projectors, and switching cleanly between Dirac and matrix notation.' },
      { title: 'Tensor products', detail: 'Combining vector spaces, Kronecker products, basis ordering, operator placement, and the exponential dimension of multi-qubit state spaces.' }
    ],
    equations: [
      { label: 'Normalization', latex: '\\langle\\psi|\\psi\\rangle = \\sum_i |\\alpha_i|^2 = 1', note: 'Valid pure states have unit norm.' },
      { label: 'Expectation value', latex: '\\langle A \\rangle_\\psi = \\langle\\psi|A|\\psi\\rangle', note: 'For an observable A, this is the mean outcome over repeated measurements.' },
      { label: 'Spectral decomposition', latex: 'A = \\sum_k a_k |a_k\\rangle\\langle a_k|', note: 'A Hermitian observable is resolved into real eigenvalues and orthogonal projectors.' },
      { label: 'Composite state', latex: '|\\psi\\rangle_{AB}=|\\psi\\rangle_A\\otimes|\\phi\\rangle_B', note: 'Independent systems combine through the tensor product.' }
    ],
    practice: [
      'By hand, normalize (1, 1+i)ᵀ and calculate the probability of each computational-basis outcome.',
      'Verify that X, Y, Z, and H are unitary and Hermitian; find their eigenvalues and eigenvectors.',
      'Use NumPy to build |01⟩, X⊗I, and I⊗X; check which qubit changes under each operator.'
    ],
    checklist: [
      'I can convert between vector, matrix, and bra–ket forms.',
      'I can explain global phase versus relative phase.',
      'I can test whether an operator is Hermitian or unitary.',
      'I can compute tensor products without guessing the basis order.'
    ],
    resources: [
      { title: 'IBM Quantum — Basics of quantum information', url: 'https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information' },
      { title: 'IBM Quantum — Classical information and Dirac notation', url: 'https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information/single-systems/classical-information' }
    ]
  },
  {
    week: 2,
    stage: 'Stage 1 · Foundations',
    status: 'completed',
    statusLabel: 'Completed',
    progress: 100,
    title: 'Qubits, States, and Measurement',
    summary: 'Move from mathematical notation to physical meaning: how a qubit is represented, transformed, measured, and distinguished from a classical probabilistic bit.',
    tags: ['Qubits', 'Bloch sphere', 'Measurement'],
    objectives: [
      'Describe pure qubit states and identify physically equivalent states.',
      'Connect amplitudes to probabilities using the Born rule.',
      'Interpret basis changes and projective measurements.',
      'Use the Bloch sphere and density matrices to describe states.'
    ],
    lessons: [
      { title: 'The computational basis', detail: '|0⟩ and |1⟩, normalized superpositions, relative phase, state preparation, and why reading a qubit does not reveal its amplitudes.' },
      { title: 'Born rule and collapse', detail: 'Outcome probabilities, post-measurement states, repeated shots, sampling error, and the operational meaning of a quantum measurement.' },
      { title: 'Changing measurement basis', detail: 'X, Y, and Z bases; using basis rotations before computational-basis measurement; expectation values of Pauli observables.' },
      { title: 'Bloch-sphere geometry', detail: 'Polar and azimuthal angles, antipodal orthogonal states, rotations, global phase removal, and the limitation to single-qubit pure states.' },
      { title: 'Density matrices', detail: 'Pure versus mixed states, classical uncertainty, trace, positivity, purity Tr(ρ²), and reduced-state intuition.' },
      { title: 'Fundamental limits', detail: 'No-cloning, indistinguishability of non-orthogonal states, and why quantum information cannot be copied or inspected like classical data.' }
    ],
    equations: [
      { label: 'Pure qubit', latex: '|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle,\\quad |\\alpha|^2+|\\beta|^2=1', note: 'The complex amplitudes determine all measurement statistics.' },
      { label: 'Bloch representation', latex: '|\\psi\\rangle=\\cos(\\theta/2)|0\\rangle+e^{i\\phi}\\sin(\\theta/2)|1\\rangle', note: 'Every single-qubit pure state is a point on the Bloch sphere.' },
      { label: 'Born rule', latex: 'p(m)=|\\langle m|\\psi\\rangle|^2', note: 'Probability is the squared magnitude of the projected amplitude.' },
      { label: 'Density matrix', latex: '\\rho=\\sum_i p_i|\\psi_i\\rangle\\langle\\psi_i|', note: 'A density operator represents pure states and statistical mixtures in one formalism.' }
    ],
    practice: [
      'Prepare |+⟩, |−⟩, |+i⟩, and |−i⟩ in Qiskit and measure each in X, Y, and Z bases.',
      'Simulate 100, 1,000, and 10,000 shots; compare empirical frequencies with exact probabilities.',
      'Construct density matrices for |+⟩ and a 50/50 mixture of |0⟩ and |1⟩; compare purity and measurement behavior.'
    ],
    checklist: [
      'I can calculate measurement probabilities in any orthonormal basis.',
      'I can explain why a superposition is not a classical probability mixture.',
      'I can locate common states on the Bloch sphere.',
      'I can distinguish a state vector from a density matrix.'
    ],
    resources: [
      { title: 'IBM Quantum — Single systems', url: 'https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information/single-systems' },
      { title: 'IBM Quantum — Density matrix basics', url: 'https://quantum.cloud.ibm.com/learning/en/courses/general-formulation-of-quantum-information/density-matrices/density-matrix-basics' }
    ]
  },
  {
    week: 3,
    stage: 'Stage 1 · Foundations',
    status: 'completed',
    statusLabel: 'Completed',
    progress: 100,
    title: 'Quantum Gates and Circuit Mechanics',
    summary: 'Learn quantum computation as controlled unitary evolution, from one-qubit rotations to reversible multi-qubit logic and circuit analysis.',
    tags: ['Gates', 'Circuits', 'Universality'],
    objectives: [
      'Predict the action of standard gates on basis and superposition states.',
      'Compose gates with the correct operator order.',
      'Build and inspect controlled and reversible circuits.',
      'Understand universality, decomposition, depth, and gate count.'
    ],
    lessons: [
      { title: 'Pauli and Hadamard gates', detail: 'X, Y, Z, H matrices; bit flips, phase flips, basis changes, eigenstates, and Bloch-sphere rotations.' },
      { title: 'Phase and rotation gates', detail: 'S, T, P(φ), Rx, Ry, Rz; relative phase control and Euler-angle decompositions of single-qubit unitaries.' },
      { title: 'Controlled operations', detail: 'CNOT, controlled-Z, controlled-U, control/target conventions, truth tables, and their operator representations.' },
      { title: 'Reversible classical logic', detail: 'Toffoli and Fredkin gates, ancillas, uncomputation, and why unitary computation must preserve information.' },
      { title: 'Circuit composition', detail: 'Left-to-right diagrams versus right-to-left matrix products, parallel gates, barriers, inverse circuits, and measurement placement.' },
      { title: 'Universal gate sets', detail: 'Exact versus approximate universality; the role of entangling gates; Clifford+T and the cost of synthesizing arbitrary operations.' }
    ],
    equations: [
      { label: 'Unitary evolution', latex: '|\\psi_{out}\\rangle=U_k\\cdots U_2U_1|\\psi_{in}\\rangle', note: 'The first gate drawn acts first, but appears nearest the state vector.' },
      { label: 'Axis rotation', latex: 'R_n(\\theta)=e^{-i\\theta(n_xX+n_yY+n_zZ)/2}', note: 'Single-qubit rotations are generated by Pauli operators.' },
      { label: 'Controlled unitary', latex: 'CU=|0\\rangle\\langle0|\\otimes I+|1\\rangle\\langle1|\\otimes U', note: 'U acts on the target only when the control is |1⟩.' }
    ],
    practice: [
      'Calculate HZH, HXH, and H² analytically, then confirm them with a statevector simulator.',
      'Build a half-adder using CNOT and Toffoli gates; test all classical input combinations.',
      'Create a random single-qubit unitary and decompose it into Rz–Ry–Rz rotations.'
    ],
    checklist: [
      'I can derive a circuit’s full unitary for one or two qubits.',
      'I can predict which gates change probabilities and which change only phase.',
      'I understand ancillas and uncomputation.',
      'I can compare circuits using width, depth, and two-qubit gate count.'
    ],
    resources: [
      { title: 'IBM Quantum — Quantum circuits', url: 'https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information/quantum-circuits' },
      { title: 'Qiskit documentation — Circuit library', url: 'https://quantum.cloud.ibm.com/docs/en/guides/circuit-library' }
    ]
  },
  {
    week: 4,
    stage: 'Stage 1 · Foundations',
    status: 'completed',
    statusLabel: 'Completed',
    progress: 100,
    title: 'Multi-Qubit Information and Entanglement',
    summary: 'Study correlations that cannot be reduced to independent qubits, then use them in teleportation, superdense coding, and Bell experiments.',
    tags: ['Entanglement', 'Protocols', 'Partial trace'],
    objectives: [
      'Separate product states from entangled states.',
      'Create, transform, and measure all four Bell states.',
      'Compute reduced states and interpret local versus joint information.',
      'Explain teleportation, superdense coding, and CHSH without faster-than-light claims.'
    ],
    lessons: [
      { title: 'Multi-qubit state spaces', detail: 'Computational basis ordering, 2ⁿ amplitudes, local operators, joint probabilities, parity, and correlation functions.' },
      { title: 'Product versus entangled states', detail: 'Factorization tests, Bell states, Schmidt decomposition intuition, and why entanglement is a property of a partition.' },
      { title: 'Reduced density matrices', detail: 'Partial trace, locally mixed states from globally pure states, marginal statistics, and entanglement entropy intuition.' },
      { title: 'Quantum teleportation', detail: 'Shared Bell pair, Bell-basis measurement, two classical bits, conditional corrections, and why the original state is destroyed.' },
      { title: 'Superdense coding', detail: 'Encoding two classical bits with one transmitted qubit using prior entanglement and a Bell-basis decoder.' },
      { title: 'Bell inequalities and CHSH', detail: 'Local hidden-variable bounds, measurement settings, quantum correlations, statistical evidence, and the no-signalling constraint.' }
    ],
    equations: [
      { label: 'Bell state', latex: '|\\Phi^+\\rangle=(|00\\rangle+|11\\rangle)/\\sqrt{2}', note: 'A maximally entangled two-qubit state.' },
      { label: 'Reduced state', latex: '\\rho_A=\\operatorname{Tr}_B(\\rho_{AB})', note: 'Discarding system B yields all statistics available locally to A.' },
      { label: 'CHSH bound', latex: '|\\langle S\\rangle|\\le 2\\text{ (local)},\\qquad |\\langle S\\rangle|\\le2\\sqrt{2}\\text{ (quantum)}', note: 'Quantum theory permits correlations beyond the local hidden-variable bound.' }
    ],
    practice: [
      'Prepare and distinguish the four Bell states; verify their Z⊗Z and X⊗X correlations.',
      'Implement teleportation with dynamic corrections or deferred measurement and test several input states.',
      'Simulate a CHSH experiment, estimate S from shots, and include uncertainty rather than reporting only an ideal value.'
    ],
    checklist: [
      'I can prove that a Bell state cannot be factored.',
      'I can compute a one-qubit reduced density matrix.',
      'I can trace every classical and quantum resource used in teleportation.',
      'I can explain why entanglement does not enable signalling faster than light.'
    ],
    resources: [
      { title: 'IBM Quantum — Multiple systems', url: 'https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information/multiple-systems' },
      { title: 'IBM Quantum — Entanglement in action', url: 'https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information/entanglement-in-action' }
    ]
  },
  {
    week: 5,
    stage: 'Stage 2 · Algorithms',
    status: 'completed',
    statusLabel: 'Completed',
    progress: 100,
    title: 'Oracles and Quantum Query Algorithms',
    summary: 'Understand how quantum algorithms access functions through reversible oracles and how interference reduces query complexity in canonical problems.',
    tags: ['Oracles', 'Deutsch–Jozsa', 'Simon'],
    objectives: [
      'Build reversible bit and phase oracles.',
      'Explain phase kickback and interference as algorithmic tools.',
      'Derive Deutsch, Deutsch–Jozsa, and Bernstein–Vazirani circuits.',
      'Connect Simon’s algorithm to hidden structure and query complexity.'
    ],
    lessons: [
      { title: 'The query model', detail: 'Black-box functions, query complexity, promised problems, bit oracles, phase oracles, and what counts as a meaningful speedup.' },
      { title: 'Phase kickback', detail: 'How an eigenstate on an oracle target transfers a function-dependent phase to the input register.' },
      { title: 'Deutsch and Deutsch–Jozsa', detail: 'Constant-versus-balanced promise problems, interference patterns, deterministic quantum queries, and comparison with classical bounds.' },
      { title: 'Bernstein–Vazirani', detail: 'Recovering a hidden bit string from a linear Boolean function in one quantum query.' },
      { title: 'Simon’s algorithm', detail: 'Hidden XOR period, measurement equations, solving a linear system over GF(2), and its role in the path toward Shor’s algorithm.' },
      { title: 'Complexity with care', detail: 'Query versus gate complexity, oracle construction cost, promised inputs, repetitions, and fair classical baselines.' }
    ],
    equations: [
      { label: 'Bit oracle', latex: 'U_f|x,y\\rangle=|x,y\\oplus f(x)\\rangle', note: 'The reversible embedding preserves x and XORs the function value into y.' },
      { label: 'Phase oracle', latex: 'O_f|x\\rangle=(-1)^{f(x)}|x\\rangle', note: 'The function is encoded into relative phases.' },
      { label: 'Simon constraint', latex: 'y\\cdot s=0\\pmod 2', note: 'Each measurement gives one linear equation orthogonal to the hidden string s.' }
    ],
    practice: [
      'Implement constant and balanced Deutsch–Jozsa oracles for n=3; verify every promised case.',
      'Generate random Bernstein–Vazirani secrets and recover them from simulated measurement results.',
      'Work through Simon’s post-processing over GF(2), including rank checks and repeated samples.'
    ],
    checklist: [
      'I can convert a reversible bit oracle into a phase oracle.',
      'I can follow amplitudes through Hadamard–oracle–Hadamard circuits.',
      'I distinguish query advantage from end-to-end runtime advantage.',
      'I can solve the classical linear-algebra step in Simon’s algorithm.'
    ],
    resources: [
      { title: 'IBM Quantum — Quantum query algorithms', url: 'https://quantum.cloud.ibm.com/learning/en/courses/fundamentals-of-quantum-algorithms/quantum-query-algorithms/introduction' },
      { title: 'IBM Quantum — Fundamentals of quantum algorithms', url: 'https://quantum.cloud.ibm.com/learning/en/courses/fundamentals-of-quantum-algorithms' }
    ]
  },
  {
    week: 6,
    stage: 'Stage 2 · Algorithms',
    status: 'completed',
    statusLabel: 'Completed',
    progress: 100,
    title: 'QFT, Phase Estimation, and Amplitude Amplification',
    summary: 'Learn two reusable algorithmic patterns: extracting phase information with QFT and amplifying the probability of marked solutions with reflections.',
    tags: ['QFT', 'Phase estimation', 'Grover'],
    objectives: [
      'Derive and implement the quantum Fourier transform.',
      'Explain phase kickback and precision in quantum phase estimation.',
      'Model Grover iterations as rotations in a two-dimensional subspace.',
      'Choose iteration counts and interpret success probabilities.'
    ],
    lessons: [
      { title: 'Fourier basis', detail: 'Roots of unity, periodicity, discrete Fourier transform, bit-reversed output order, and what QFT does—and does not—accelerate.' },
      { title: 'QFT circuit', detail: 'Hadamards, controlled phase rotations, swaps, exact versus approximate QFT, depth, and inverse QFT.' },
      { title: 'Phase estimation', detail: 'Eigenphase problem, controlled powers of U, phase kickback, inverse QFT, precision qubits, and success probability.' },
      { title: 'Grover search', detail: 'State preparation, phase oracle, diffusion reflection, marked subspace, and quadratic query advantage for unstructured search.' },
      { title: 'Amplitude amplification', detail: 'Generalizing Grover beyond uniform search, good/bad subspaces, unknown solution counts, and amplitude estimation intuition.' },
      { title: 'Resource reasoning', detail: 'Oracle cost, controlled-U synthesis, QFT gate counts, noise sensitivity, and when asymptotic advantage survives implementation overhead.' }
    ],
    equations: [
      { label: 'Quantum Fourier transform', latex: 'QFT_N|x\\rangle=\\frac{1}{\\sqrt N}\\sum_{k=0}^{N-1}e^{2\\pi i xk/N}|k\\rangle', note: 'The QFT changes from the computational basis to a Fourier basis.' },
      { label: 'Eigenphase', latex: 'U|\\psi\\rangle=e^{2\\pi i\\theta}|\\psi\\rangle', note: 'Phase estimation approximates θ using controlled powers of U.' },
      { label: 'Grover success', latex: 'P_k=\\sin^2((2k+1)\\theta),\\quad \\sin^2\\theta=M/N', note: 'Each Grover iteration rotates amplitude toward M marked states.' }
    ],
    practice: [
      'Implement QFT and inverse QFT for 3–5 qubits; compare exact and approximate circuits.',
      'Estimate known phases for single-qubit phase gates and study the effect of precision-register size.',
      'Build Grover search for one and multiple marked states; sweep iteration count and plot success probability.'
    ],
    checklist: [
      'I can derive the QFT product-state form.',
      'I can explain why phase estimation requires an eigenstate or eigenstate decomposition.',
      'I can calculate the near-optimal Grover iteration count.',
      'I can state the assumptions behind the claimed speedups.'
    ],
    resources: [
      { title: 'IBM Quantum — Phase-estimation procedure', url: 'https://quantum.cloud.ibm.com/learning/en/courses/fundamentals-of-quantum-algorithms/phase-estimation-and-factoring/phase-estimation-procedure' },
      { title: 'IBM Quantum — Grover search and applications', url: 'https://quantum.cloud.ibm.com/learning/en/courses/utility-scale-quantum-computing/grovers-algorithm' }
    ]
  },
  {
    week: 7,
    stage: 'Stage 2 · Algorithms',
    status: 'completed',
    statusLabel: 'Completed',
    progress: 100,
    title: 'Shor’s Algorithm and Quantum-Safe Cryptography',
    summary: 'Connect number theory to quantum order finding, understand the threat to public-key cryptography, and distinguish Shor’s algorithm, PQC, and QKD.',
    tags: ['Shor', 'Number theory', 'PQC'],
    objectives: [
      'Use modular arithmetic, gcd, periods, and continued fractions.',
      'Reduce integer factoring to order finding.',
      'Explain the quantum and classical stages of Shor’s algorithm.',
      'Describe the practical response: post-quantum cryptography, not vague “quantum encryption.”'
    ],
    lessons: [
      { title: 'Number-theory toolkit', detail: 'Modular arithmetic, Euclidean algorithm, multiplicative order, Euler’s totient, modular exponentiation, and continued fractions.' },
      { title: 'Factoring reduction', detail: 'Why finding the order r of a mod N can reveal non-trivial factors through gcd(a^(r/2)±1, N), and when the attempt fails.' },
      { title: 'Quantum order finding', detail: 'Superposition of exponents, reversible modular exponentiation, phase estimation, measured approximations, and classical reconstruction of r.' },
      { title: 'End-to-end Shor workflow', detail: 'Random base selection, gcd shortcut, quantum subroutine, continued fractions, validation, retry logic, and resource requirements.' },
      { title: 'Cryptographic impact', detail: 'Why sufficiently capable fault-tolerant quantum computers threaten RSA and elliptic-curve cryptography; symmetric-key effects differ.' },
      { title: 'PQC versus QKD', detail: 'PQC uses classical hardware and quantum-resistant mathematics; QKD is a quantum communication protocol with different infrastructure and threat assumptions.' }
    ],
    equations: [
      { label: 'Order', latex: 'a^r\\equiv1\\pmod N', note: 'The least positive r satisfying this congruence is the multiplicative order.' },
      { label: 'Factor extraction', latex: '\\gcd(a^{r/2}-1,N),\\quad\\gcd(a^{r/2}+1,N)', note: 'For suitable even r, at least one gcd can reveal a non-trivial factor.' },
      { label: 'Phase samples', latex: '\\frac{y}{2^t}\\approx\\frac{s}{r}', note: 'Continued fractions recover a candidate denominator r from the measured approximation.' }
    ],
    practice: [
      'Factor 15 and 21 by hand using the classical reduction and explicit order tables.',
      'Run a small order-finding circuit or simulator example, then implement continued-fraction post-processing.',
      'Write a one-page threat map separating public-key encryption, signatures, symmetric encryption, hashing, PQC, and QKD.'
    ],
    checklist: [
      'I can show exactly where phase estimation enters Shor’s algorithm.',
      'I can identify failure cases and explain why retries are needed.',
      'I can separate asymptotic complexity from physical resource feasibility.',
      'I can explain why deploying PQC does not require a quantum computer.'
    ],
    resources: [
      { title: 'IBM Quantum — Phase estimation and factoring', url: 'https://quantum.cloud.ibm.com/learning/en/courses/fundamentals-of-quantum-algorithms/phase-estimation-and-factoring' },
      { title: 'NIST — Post-Quantum Cryptography project', url: 'https://csrc.nist.gov/projects/post-quantum-cryptography' }
    ]
  },
  {
    week: 8,
    stage: 'Stage 3 · Noise and Simulation',
    status: 'completed',
    statusLabel: 'Completed',
    progress: 100,
    title: 'Noise, Quantum Channels, and Error Correction',
    summary: 'Replace ideal-circuit intuition with realistic open-system models, then learn how redundancy, stabilizers, and fault-tolerant gadgets protect logical information.',
    tags: ['Noise', 'QEC', 'Fault tolerance'],
    objectives: [
      'Represent noise using density operators, Kraus maps, and standard channels.',
      'Explain why quantum error correction does not violate no-cloning.',
      'Decode repetition, Shor, and stabilizer-code syndromes.',
      'Distinguish error correction, mitigation, suppression, and fault tolerance.'
    ],
    lessons: [
      { title: 'Open-system noise', detail: 'Decoherence, relaxation T1, dephasing T2, readout errors, coherent errors, crosstalk, leakage, and non-Markovian effects.' },
      { title: 'Quantum channels', detail: 'Completely positive trace-preserving maps, Kraus operators, bit/phase-flip, depolarizing, phase-damping, and amplitude-damping channels.' },
      { title: 'Why correction is possible', detail: 'Encoding one logical state into an entangled subspace, discretization into Pauli errors, syndrome extraction without learning logical amplitudes.' },
      { title: 'Introductory codes', detail: 'Three-qubit repetition codes, phase-flip code by basis change, nine-qubit Shor code, distance, and correctable error weight.' },
      { title: 'Stabilizer formalism', detail: 'Pauli group, commuting generators, code space, logical operators, syndromes, degeneracy, and the [[n,k,d]] notation.' },
      { title: 'Fault tolerance', detail: 'Error propagation, transversal operations, magic-state resources, thresholds, logical error rates, and surface-code intuition.' }
    ],
    equations: [
      { label: 'Quantum channel', latex: '\\mathcal E(\\rho)=\\sum_k E_k\\rho E_k^\\dagger,\\quad\\sum_kE_k^\\dagger E_k=I', note: 'Kraus operators describe a trace-preserving physical process.' },
      { label: 'Code distance', latex: 't=\\left\\lfloor\\frac{d-1}{2}\\right\\rfloor', note: 'A distance-d code corrects arbitrary errors on up to t qubits.' },
      { label: 'Stabilizer condition', latex: 'S_i|\\psi_L\\rangle=|\\psi_L\\rangle', note: 'Logical code states lie in the simultaneous +1 eigenspace of stabilizer generators.' }
    ],
    practice: [
      'Simulate bit-flip, phase-flip, depolarizing, and amplitude-damping channels on several input states.',
      'Implement a three-qubit repetition code with explicit syndrome measurement and correction.',
      'Create a stabilizer table for a small code and map each single-qubit Pauli error to its syndrome.'
    ],
    checklist: [
      'I can identify which physical mechanism each common noise channel models.',
      'I can explain how syndrome measurements preserve logical amplitudes.',
      'I can compute the distance and correctable weight of a simple code.',
      'I can distinguish a protected logical circuit from a merely mitigated noisy circuit.'
    ],
    resources: [
      { title: 'IBM Quantum — Quantum channel basics', url: 'https://quantum.cloud.ibm.com/learning/en/courses/general-formulation-of-quantum-information/quantum-channels/quantum-channel-basics' },
      { title: 'IBM Quantum — Foundations of quantum error correction', url: 'https://quantum.cloud.ibm.com/learning/en/courses/foundations-of-quantum-error-correction' },
      { title: 'IBM Quantum — Fault-tolerant quantum computing', url: 'https://quantum.cloud.ibm.com/learning/en/courses/foundations-of-quantum-error-correction/fault-tolerant-quantum-computing/introduction' }
    ]
  },
  {
    week: 9,
    stage: 'Stage 3 · Noise and Simulation',
    status: 'completed',
    statusLabel: 'Completed',
    progress: 100,
    title: 'Hamiltonians and Quantum Simulation',
    summary: 'Translate physical dynamics into qubit Hamiltonians and approximate time evolution with circuits while tracking product-formula and hardware errors.',
    tags: ['Hamiltonians', 'Trotterization', 'Simulation'],
    objectives: [
      'Interpret Hamiltonians, observables, eigenstates, and time evolution.',
      'Express qubit Hamiltonians as weighted Pauli sums.',
      'Implement product-formula simulation and analyze its error sources.',
      'Measure physical observables and compare against exact classical results.'
    ],
    lessons: [
      { title: 'Hamiltonian mechanics', detail: 'Energy operators, spectra, ground and excited states, Schrödinger evolution, conserved quantities, and expectation values.' },
      { title: 'Pauli decompositions', detail: 'Writing n-qubit observables as sums of Pauli strings, locality, coefficients, commuting groups, and measurement bases.' },
      { title: 'Time-evolution unitaries', detail: 'U(t)=e^(−iHt), exact exponentiation for small systems, circuit primitives for Pauli rotations, and time-dependent caveats.' },
      { title: 'Lie–Trotter and Suzuki formulas', detail: 'Splitting non-commuting Hamiltonian terms, step size, order of approximation, circuit depth, and error–cost trade-offs.' },
      { title: 'A spin-model case study', detail: 'Build an Ising or Heisenberg chain, prepare an initial state, evolve it, and track magnetization or correlations over time.' },
      { title: 'Verification and scaling', detail: 'Exact diagonalization for small systems, convergence studies, sampling error, noise, conservation checks, and resource estimates.' }
    ],
    equations: [
      { label: 'Time evolution', latex: '|\\psi(t)\\rangle=e^{-iHt}|\\psi(0)\\rangle', note: 'A time-independent Hamiltonian generates unitary dynamics.' },
      { label: 'Pauli expansion', latex: 'H=\\sum_j a_jP_j', note: 'Each Pj is a tensor product of I, X, Y, and Z.' },
      { label: 'First-order product formula', latex: 'e^{-it(A+B)}\\approx(e^{-iA t/r}e^{-iB t/r})^r', note: 'The approximation improves with more steps r but produces deeper circuits.' }
    ],
    practice: [
      'Decompose a two-qubit Hamiltonian into Pauli strings and reconstruct its matrix.',
      'Simulate a small transverse-field Ising chain with several Trotter step counts.',
      'Compare exact, noiseless Trotterized, and noisy results; separate approximation, shot, and hardware errors.'
    ],
    checklist: [
      'I can convert a Pauli-string term into a measurement or evolution circuit.',
      'I can explain why non-commuting terms cause product-formula error.',
      'I run convergence checks instead of trusting one Trotter step count.',
      'I validate small instances against exact classical simulation.'
    ],
    resources: [
      { title: 'IBM Quantum — Quantum simulation', url: 'https://quantum.cloud.ibm.com/learning/en/courses/utility-scale-quantum-computing/quantum-simulation' },
      { title: 'IBM Quantum — Quantum diagonalization algorithms', url: 'https://quantum.cloud.ibm.com/learning/en/courses/quantum-diagonalization-algorithms' }
    ]
  },
  {
    week: 10,
    stage: 'Stage 4 · Research Practice',
    status: 'completed',
    statusLabel: 'Completed',
    progress: 100,
    title: 'Variational Quantum Algorithms',
    summary: 'Build hybrid quantum–classical workflows with parameterized circuits, expectation-value objectives, optimizers, and honest diagnostic baselines.',
    tags: ['VQE', 'QAOA', 'Optimization'],
    objectives: [
      'Design a complete variational loop and identify each component.',
      'Use the variational principle for ground-state estimation.',
      'Map a small optimization problem to a cost Hamiltonian.',
      'Diagnose optimization, sampling, expressibility, and noise failures.'
    ],
    lessons: [
      { title: 'Parameterized circuits', detail: 'Feature-free ansätze, hardware-efficient layouts, expressibility, entanglement structure, initialization, and two-qubit depth.' },
      { title: 'Expectation-value objectives', detail: 'Observables as Pauli sums, commuting measurement groups, shot allocation, Estimator-style workflows, and uncertainty.' },
      { title: 'Classical optimization', detail: 'Gradient-free and gradient-based methods, parameter-shift gradients, stochastic objectives, local minima, plateaus, and stopping rules.' },
      { title: 'VQE', detail: 'Variational principle, trial states, Hamiltonian expectation minimization, reference solutions, and ground-state energy estimation.' },
      { title: 'QAOA', detail: 'Cost and mixer Hamiltonians, alternating layers, QUBO mapping, sampling candidate bit strings, approximation quality, and depth p.' },
      { title: 'Reliable experiments', detail: 'Seed control, multiple restarts, learning curves, classical baselines, ablations, noise-aware execution, and reporting negative results.' }
    ],
    equations: [
      { label: 'Variational bound', latex: 'E(\\theta)=\\frac{\\langle\\psi(\\theta)|H|\\psi(\\theta)\\rangle}{\\langle\\psi(\\theta)|\\psi(\\theta)\\rangle}\\ge E_0', note: 'In the ideal mathematical setting, every trial state upper-bounds the ground energy.' },
      { label: 'QAOA state', latex: '|\\gamma,\\beta\\rangle=\\prod_{k=1}^{p}e^{-i\\beta_kH_M}e^{-i\\gamma_kH_C}|+\\rangle^{\\otimes n}', note: 'Cost and mixer evolutions alternate for p layers.' },
      { label: 'Parameter shift', latex: '\\partial_\\theta f=\\tfrac12[f(\\theta+\\pi/2)-f(\\theta-\\pi/2)]', note: 'For common rotation generators, gradients can be estimated from shifted circuit evaluations.' }
    ],
    practice: [
      'Implement VQE for a two-qubit Hamiltonian and compare with exact diagonalization.',
      'Implement QAOA for a small Max-Cut graph; inspect both expected cost and sampled solutions.',
      'Compare at least two ansätze, optimizers, shot budgets, and initializations; report variability across seeds.'
    ],
    checklist: [
      'I can draw the full quantum–classical optimization loop.',
      'I can separate ansatz, observable, optimizer, and backend effects.',
      'I report uncertainty and classical reference results.',
      'I avoid claiming advantage from a single small or unbenchmarked run.'
    ],
    resources: [
      { title: 'IBM Quantum — Variational algorithm design', url: 'https://quantum.cloud.ibm.com/learning/en/courses/variational-algorithm-design/variational-algorithms' },
      { title: 'IBM Quantum — Variational quantum algorithms', url: 'https://quantum.cloud.ibm.com/learning/en/courses/utility-scale-quantum-computing/variational-quantum-algorithms' }
    ]
  },
  {
    week: 11,
    stage: 'Stage 4 · Research Practice',
    status: 'completed',
    statusLabel: 'Completed',
    progress: 100,
    title: 'Quantum Machine Learning and Data Encoding',
    summary: 'Study how classical data enters quantum states, then evaluate kernel and variational models with strong classical baselines and realistic resource accounting.',
    tags: ['QML', 'Data encoding', 'Kernels'],
    objectives: [
      'Compare basis, angle, phase, amplitude, and dense encoding.',
      'Build a quantum kernel and a variational quantum classifier.',
      'Track data-loading, circuit-depth, shot, and optimization costs.',
      'Design fair experiments that do not assume a quantum benefit.'
    ],
    lessons: [
      { title: 'Where QML fits', detail: 'Classical data/quantum model, quantum data/classical model, quantum data/quantum model, and the difference between research promise and demonstrated benefit.' },
      { title: 'Data encoding', detail: 'Basis, angle, phase, amplitude, and dense schemes; qubit count, normalization, state-preparation cost, information loss, and circuit depth.' },
      { title: 'Feature maps', detail: 'Parameterized unitaries U(x), Hilbert-space embeddings, entangling structure, data re-uploading, hardware compatibility, and classical simulability.' },
      { title: 'Quantum kernels', detail: 'Overlap-based kernels, kernel-matrix estimation, support-vector machines, trainable kernels, positive semidefiniteness, and sampling noise.' },
      { title: 'Variational classifiers', detail: 'Feature map plus ansatz, measured outputs, loss functions, gradient estimation, trainability, class imbalance, and cross-validation.' },
      { title: 'Evidence standards', detail: 'Train/validation/test separation, classical baselines, hyperparameter parity, scaling experiments, noise models, runtime, confidence intervals, and reproducibility.' }
    ],
    equations: [
      { label: 'Quantum feature map', latex: '|\\phi(x)\\rangle=U(x)|0\\rangle^{\\otimes n}', note: 'Classical features parameterize a state-preparation circuit.' },
      { label: 'Fidelity kernel', latex: 'K(x_i,x_j)=|\\langle\\phi(x_i)|\\phi(x_j)\\rangle|^2', note: 'The kernel is an overlap between encoded quantum states.' },
      { label: 'Variational prediction', latex: 'f_\\theta(x)=\\langle0|U^\\dagger(x)V^\\dagger(\\theta)OV(\\theta)U(x)|0\\rangle', note: 'A measured expectation value becomes a model output.' }
    ],
    practice: [
      'Encode the same small dataset with angle and amplitude schemes; compare state-preparation resources.',
      'Train a quantum-kernel SVM and compare it with linear and RBF SVM baselines using the same split.',
      'Train a variational classifier across multiple seeds; report accuracy, variance, circuit executions, and runtime.'
    ],
    checklist: [
      'I include state-preparation and sampling costs in resource claims.',
      'I use untouched test data and competitive classical baselines.',
      'I can explain how my feature map relates to the dataset.',
      'I know that larger Hilbert space alone does not imply useful advantage.'
    ],
    resources: [
      { title: 'IBM Quantum — Quantum machine learning', url: 'https://quantum.cloud.ibm.com/learning/en/courses/quantum-machine-learning/introduction' },
      { title: 'IBM Quantum — Data encoding', url: 'https://quantum.cloud.ibm.com/learning/en/courses/quantum-machine-learning/data-encoding' },
      { title: 'IBM Quantum — Quantum kernel methods', url: 'https://quantum.cloud.ibm.com/learning/en/courses/quantum-machine-learning/quantum-kernel-methods' }
    ]
  },
  {
    week: 12,
    stage: 'Stage 4 · Research Practice',
    status: 'planned',
    statusLabel: 'Planned · Content available',
    progress: 0,
    title: 'Hardware-Aware Execution and Research Workflow',
    summary: 'Connect abstract algorithms to physical processors, compilation constraints, calibration data, experimental uncertainty, and a reproducible research portfolio.',
    tags: ['Hardware', 'Transpilation', 'Reproducibility'],
    objectives: [
      'Compare leading qubit modalities without reducing them to one headline metric.',
      'Compile circuits to a backend instruction set and connectivity graph.',
      'Read calibration data and design controlled noisy experiments.',
      'Package results as reproducible notebooks and research notes.'
    ],
    lessons: [
      { title: 'Physical qubit modalities', detail: 'Superconducting circuits, trapped ions, neutral atoms, photonics, and spin qubits; gates, connectivity, speed, coherence, control, and scaling trade-offs.' },
      { title: 'Backend constraints', detail: 'Native basis gates, coupling maps, dynamic circuits, measurement, reset, timing, calibration drift, queueing, and instruction-set architecture.' },
      { title: 'Transpilation', detail: 'Circuit synthesis, layout selection, routing with SWAPs, basis translation, optimization levels, scheduling, and comparing transpiler seeds.' },
      { title: 'Performance metrics', detail: 'Single- and two-qubit error, readout error, T1/T2, circuit depth, success probability, logical versus physical metrics, and workload-level benchmarks.' },
      { title: 'Execution and mitigation', detail: 'Shot budgets, sessions/batching, measurement mitigation, zero-noise ideas, randomized compilation intuition, and the boundary between mitigation and correction.' },
      { title: 'Research workflow', detail: 'Question, hypothesis, baseline, preregistered metric, environment capture, seeds, raw data, analysis notebook, limitations, references, and a concise result card.' }
    ],
    equations: [
      { label: 'Shot uncertainty', latex: '\\operatorname{SE}(\\hat p)\\approx\\sqrt{\\hat p(1-\\hat p)/N}', note: 'Finite-shot estimates need uncertainty bars, especially near decision thresholds.' },
      { label: 'Circuit success estimate', latex: 'P_{success}\\approx\\prod_g(1-\\epsilon_g)', note: 'A rough independent-error model shows why many imperfect gates compound quickly.' },
      { label: 'Reproducible result', latex: 'R=f(\\text{code},\\text{data},\\text{environment},\\text{seed},\\text{backend calibration})', note: 'Hardware results depend on more than source code alone.' }
    ],
    practice: [
      'Transpile one non-trivial circuit for multiple backends and seeds; compare depth, SWAPs, two-qubit gates, and layout.',
      'Run or simulate the same circuit under ideal and backend-derived noise; attach uncertainty intervals and calibration context.',
      'Publish one research-grade notebook with a README, pinned dependencies, raw outputs, baseline, limitations, and a short conclusion.'
    ],
    checklist: [
      'I choose hardware using workload-relevant metrics rather than qubit count alone.',
      'I inspect the transpiled circuit before execution.',
      'I preserve backend, calibration, seed, shot, and dependency metadata.',
      'My final claim is supported by a baseline, uncertainty, and reproducible artifacts.'
    ],
    resources: [
      { title: 'IBM Quantum — Introduction to transpilation', url: 'https://quantum.cloud.ibm.com/docs/en/guides/transpile' },
      { title: 'IBM Quantum — Quantum technology and hardware', url: 'https://quantum.cloud.ibm.com/learning/en/courses/quantum-business-foundations/quantum-technology' },
      { title: 'IBM Quantum — Learning course catalog', url: 'https://quantum.cloud.ibm.com/learning/en/courses' }
    ]
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

let currentWeekIndex = 0;
let lastWeekTrigger = null;

window.slugifyQuantumLesson = function(title) {
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

window.getQuantumLessonHref = function(week, lesson) {
  const topic = window.slugifyQuantumLesson(lesson.title);
  return `lesson.html?week=${week.week}&topic=${encodeURIComponent(topic)}`;
};

window.renderQuantumRoadmap = function() {
  const container = document.getElementById('roadmapTimeline');
  if (!container || !window.quantumWeeks) return;

  container.innerHTML = window.quantumWeeks.map((week, index) => `
    <div class="timeline-node ${week.status}">
      <button class="node-content quantum-card week-card" type="button" data-week-index="${index}" aria-haspopup="dialog" aria-label="Open Week ${week.week}: ${week.title}">
        <span class="week-card-topline">
          <span class="status-label">${week.statusLabel}</span>
          <span class="week-open-label">View curriculum <span aria-hidden="true">&rarr;</span></span>
        </span>
        <span class="stage-label">${week.stage}</span>
        <h3>${week.title}</h3>
        <span class="week-label">Week ${week.week}</span>
        <span class="week-summary">${week.summary}</span>
        ${week.status === 'active' ? `
          <span class="progress-bar" role="progressbar" aria-label="Week ${week.week} progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${week.progress}">
            <span class="fill" style="width: ${week.progress}%;"></span>
          </span>
        ` : ''}
        <span class="tags">
          ${week.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </span>
      </button>
    </div>
  `).join('');

  container.querySelectorAll('.week-card').forEach(card => {
    card.addEventListener('click', () => {
      lastWeekTrigger = card;
      window.openWeekModal(Number(card.dataset.weekIndex));
    });
  });
};

window.renderWeekContent = function(week) {
  return `
    <header class="modal-header week-modal-header">
      <div class="week-modal-meta">
        <span class="week-number">Week ${week.week}</span>
        <span>${week.stage}</span>
        <span>${week.statusLabel}</span>
      </div>
      <h2 id="weekModalTitle">${week.title}</h2>
      <p>${week.summary}</p>
      <div class="week-at-a-glance" aria-label="Module size">
        <span><strong>${week.lessons.length}</strong> core lessons</span>
        <span><strong>${week.practice.length}</strong> practical tasks</span>
        <span><strong>${week.equations.length}</strong> key equations</span>
      </div>
    </header>

    <div class="modal-body week-modal-body">
      <section class="week-content-section" aria-labelledby="week-objectives-${week.week}">
        <p class="content-kicker">01 · Outcomes</p>
        <h3 id="week-objectives-${week.week}">Learning objectives</h3>
        <ul class="objective-list">
          ${week.objectives.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </section>

      <section class="week-content-section" aria-labelledby="week-lessons-${week.week}">
        <p class="content-kicker">02 · Curriculum</p>
        <h3 id="week-lessons-${week.week}">What to study</h3>
        <p class="lesson-list-intro">Select a lesson to open its complete study page.</p>
        <ol class="lesson-list">
          ${week.lessons.map((lesson, index) => `
            <li>
              <a class="lesson-link" href="${window.getQuantumLessonHref(week, lesson)}" aria-label="Open lesson: ${lesson.title}">
                <span class="lesson-index">${String(index + 1).padStart(2, '0')}</span>
                <span class="lesson-link-content"><strong>${lesson.title}</strong><span>${lesson.detail}</span></span>
                <span class="lesson-link-arrow" aria-hidden="true">&rarr;</span>
              </a>
            </li>
          `).join('')}
        </ol>
      </section>

      <section class="week-content-section" aria-labelledby="week-equations-${week.week}">
        <p class="content-kicker">03 · Reference</p>
        <h3 id="week-equations-${week.week}">Key equations</h3>
        <div class="equation-list">
          ${week.equations.map(equation => `
            <article class="equation-card">
              <h4>${equation.label}</h4>
              <div class="math-block">$$${equation.latex}$$</div>
              <p>${equation.note}</p>
            </article>
          `).join('')}
        </div>
      </section>

      <section class="week-content-section" aria-labelledby="week-practice-${week.week}">
        <p class="content-kicker">04 · Practice</p>
        <h3 id="week-practice-${week.week}">Labs and exercises</h3>
        <ol class="practice-list">
          ${week.practice.map(item => `<li>${item}</li>`).join('')}
        </ol>
      </section>

      <section class="week-content-section completion-section" aria-labelledby="week-checklist-${week.week}">
        <p class="content-kicker">05 · Completion</p>
        <h3 id="week-checklist-${week.week}">You are ready to move on when…</h3>
        <ul class="completion-list">
          ${week.checklist.map(item => `<li><span class="check-box" aria-hidden="true"></span>${item}</li>`).join('')}
        </ul>
      </section>

      <section class="week-content-section" aria-labelledby="week-resources-${week.week}">
        <p class="content-kicker">06 · Sources</p>
        <h3 id="week-resources-${week.week}">Primary learning resources</h3>
        <div class="resource-list">
          ${week.resources.map(resource => `
            <a href="${resource.url}" target="_blank" rel="noopener noreferrer">
              <span>${resource.title}</span><span aria-hidden="true">&nearr;</span>
            </a>
          `).join('')}
        </div>
      </section>
    </div>
  `;
};

window.openWeekModal = function(index, updateHash = true) {
  const modal = document.getElementById('weekModal');
  const content = document.getElementById('weekModalContent');
  const modalContainer = modal?.querySelector('.week-modal-container');
  const week = window.quantumWeeks[index];
  if (!modal || !content || !week) return;

  currentWeekIndex = index;
  content.innerHTML = window.renderWeekContent(week);
  window.siteUtils.renderMath(content);

  const previousButton = document.getElementById('prevWeekBtn');
  const nextButton = document.getElementById('nextWeekBtn');
  const position = document.getElementById('weekPosition');
  if (previousButton) previousButton.disabled = index === 0;
  if (nextButton) nextButton.disabled = index === window.quantumWeeks.length - 1;
  if (position) position.textContent = `${index + 1} / ${window.quantumWeeks.length}`;

  modal.classList.remove('hidden');
  modal.classList.add('active');
  document.body.classList.add('modal-open');
  if (modalContainer) modalContainer.scrollTop = 0;
  document.getElementById('weekModalClose')?.focus();

  if (updateHash) {
    history.replaceState(null, '', `${window.location.pathname}${window.location.search}#week-${week.week}`);
  }
};

window.closeWeekModal = function() {
  const modal = document.getElementById('weekModal');
  if (!modal) return;

  modal.classList.remove('active');
  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  if (window.location.hash.startsWith('#week-')) {
    history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
  }
  if (lastWeekTrigger) lastWeekTrigger.focus();
};

window.initQuantumRoadmap = function() {
  const modal = document.getElementById('weekModal');
  if (!modal) return;

  document.getElementById('weekModalClose')?.addEventListener('click', window.closeWeekModal);
  document.getElementById('prevWeekBtn')?.addEventListener('click', () => {
    if (currentWeekIndex > 0) window.openWeekModal(currentWeekIndex - 1);
  });
  document.getElementById('nextWeekBtn')?.addEventListener('click', () => {
    if (currentWeekIndex < window.quantumWeeks.length - 1) window.openWeekModal(currentWeekIndex + 1);
  });

  modal.addEventListener('click', event => {
    if (event.target === modal) window.closeWeekModal();
  });

  modal.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      window.closeWeekModal();
      return;
    }
    if (event.key !== 'Tab') return;

    const focusable = [...modal.querySelectorAll('button:not([disabled]), a[href]')];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const hashMatch = window.location.hash.match(/^#week-(\\d+)$/);
  if (hashMatch) {
    const requestedIndex = window.quantumWeeks.findIndex(week => week.week === Number(hashMatch[1]));
    if (requestedIndex >= 0) window.openWeekModal(requestedIndex, false);
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
  if (document.getElementById('roadmapTimeline')) {
    window.renderQuantumRoadmap();
    window.initQuantumRoadmap();
  }
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
