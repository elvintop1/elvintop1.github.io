window.quantumResearchTracks = [
  {
    slug: 'quantum-linear-solvers',
    title: 'Quantum Linear Solvers',
    shortTitle: 'Linear Solvers',
    description: 'Algorithms that encode the solution of Ax=b into a quantum state, with emphasis on access models, conditioning, output restrictions, and verification.',
    color: 'blue'
  },
  {
    slug: 'quantum-data-encoding',
    title: 'Quantum Data Encoding',
    shortTitle: 'Data Encoding',
    description: 'How classical features become quantum states, and how qubit count, preparation depth, geometry, periodicity, and readout affect a learning model.',
    color: 'rose'
  }
];

window.quantumResearchNotes = [
  {
    slug: 'quantum-linear-solvers-from-axb-to-a-quantum-state',
    date: '2026-08-05',
    updated: '2026-08-05',
    sequence: 1,
    track: 'quantum-linear-solvers',
    status: 'Exploration',
    maturity: 'Working note',
    title: 'Quantum Linear Solvers: From Ax = b to a Quantum State',
    subtitle: 'What HHL returns, how eigenvalue inversion works, and why conditioning, data access, and readout decide whether the speedup is useful.',
    readingTime: 18,
    researchQuestion: 'Under which input and output assumptions can solving a linear system as a quantum state be more useful than computing the full classical solution vector?',
    abstract: 'Quantum linear-system algorithms do not normally return every coordinate of x. They prepare a state proportional to the solution of Ax=b so that selected global properties can be estimated. This note develops that distinction from first principles, derives the eigenbasis inversion idea behind HHL, works a 2×2 example, and records the conditions that an honest complexity comparison must include.',
    tags: ['HHL', 'linear algebra', 'phase estimation', 'condition number', 'algorithms'],
    prerequisites: ['Eigenvalues and spectral decomposition', 'Quantum phase estimation', 'Amplitude encoding', 'Condition number and numerical stability'],
    keyFindings: [
      'The output is usually $|x\\rangle=x/\\|x\\|$, not a classical list of all coordinates.',
      'The inverse eigenvalue map amplifies small-eigenvalue components, which is why dependence on the condition number $\\kappa$ is structural.',
      'Exponential dependence on dimension can only be meaningful when preparing $|b\\rangle$, accessing A, estimating the desired observable, and verifying the result are also efficient.',
      'HHL is a fault-tolerant algorithmic blueprint; a small state-preparation demonstration is not evidence that present hardware solves large classical systems faster.'
    ],
    sections: [
      {
        id: 'problem',
        title: '1. Begin with the exact computational problem',
        paragraphs: [
          'A classical linear-system problem receives a matrix $A\\in\\mathbb C^{N\\times N}$ and vector $b\\in\\mathbb C^N$, then seeks $x$ satisfying $Ax=b$. If A is invertible, $x=A^{-1}b$. A classical numerical method can return coordinates, residuals, and error estimates. A quantum linear-system algorithm changes the output contract: it aims to prepare a normalized quantum state $|x\\rangle$ proportional to the solution.',
          'This distinction is not cosmetic. Reading all N amplitudes of $|x\\rangle$ would generally require enough measurements to lose a logarithmic-in-N advantage. The useful downstream question must therefore be a quantity obtainable from copies of $|x\\rangle$, such as an expectation value $\\langle x|M|x\\rangle$, an overlap, or another global statistic.'
        ],
        equations: [
          { label: 'Linear system', latex: 'A x=b,\\qquad x=A^{-1}b', note: 'The inverse notation describes the mathematical solution; implementations do not usually form a dense inverse.' },
          { label: 'Quantum output', latex: '|x\\rangle=\\frac{A^{-1}|b\\rangle}{\\|A^{-1}|b\\rangle\\|}', note: 'The global scale of the classical vector is removed by quantum-state normalization.' }
        ]
      },
      {
        id: 'spectral-view',
        title: '2. The spectral view makes inversion possible',
        paragraphs: [
          'Assume first that A is Hermitian. Its eigenvectors form an orthonormal basis, so write $A=\\sum_j\\lambda_j|u_j\\rangle\\langle u_j|$ and $|b\\rangle=\\sum_j\\beta_j|u_j\\rangle$. Classical inversion and the desired quantum state both rescale each eigencomponent by $1/\\lambda_j$. The algorithmic problem is therefore to learn each eigenvalue coherently enough to apply that reciprocal factor without learning which eigenvector branch is present.',
          'Quantum phase estimation provides an eigenvalue register when applied to controlled evolution related to A. A controlled ancilla rotation then creates an amplitude proportional to $C/\\lambda_j$. Uncomputing phase estimation erases the eigenvalue workspace while preserving the reciprocal weighting. Conditioning on the ancilla success outcome leaves a state proportional to the solution.'
        ],
        equations: [
          { label: 'Spectral decomposition', latex: 'A=\\sum_j\\lambda_j|u_j\\rangle\\langle u_j|,\\qquad |b\\rangle=\\sum_j\\beta_j|u_j\\rangle', note: 'The eigenbasis separates the inverse into scalar reciprocal operations.' },
          { label: 'Desired reweighting', latex: 'A^{-1}|b\\rangle=\\sum_j\\frac{\\beta_j}{\\lambda_j}|u_j\\rangle', note: 'Small eigenvalues receive large weights, linking inversion to numerical conditioning.' }
        ]
      },
      {
        id: 'algorithm',
        title: '3. HHL as a coherent compute–rotate–uncompute pattern',
        paragraphs: [
          'The conceptual HHL sequence is: prepare $|b\\rangle$; perform phase estimation for a unitary generated by A; rotate an ancilla by an angle whose sine is proportional to the reciprocal eigenvalue; reverse phase estimation; and postselect or amplify the ancilla success branch. The data register then contains the normalized inverse-weighted eigenvector superposition.',
          'Every verb hides an access assumption. Hamiltonian simulation needs an efficient representation of A, the input state needs an efficient preparation circuit, reciprocal rotation needs adequate precision, and postselection probability worsens with the spread of eigenvalues. Later linear-system algorithms improve precision dependence and use different polynomial approximations, but the input/output discipline remains.'
        ],
        equations: [
          { label: 'Condition number', latex: '\\kappa(A)=\\frac{|\\lambda_{\\max}|}{|\\lambda_{\\min}|}', note: 'For Hermitian A on the supported subspace, κ measures the ratio of largest to smallest relevant eigenvalue magnitude.' },
          { label: 'Controlled rotation sketch', latex: '|\\lambda_j\\rangle|0\\rangle\\mapsto|\\lambda_j\\rangle\\left(\\sqrt{1-C^2/\\lambda_j^2}|0\\rangle+\\frac{C}{\\lambda_j}|1\\rangle\\right)', note: 'Conditioning on ancilla 1 produces the reciprocal eigenvalue factor.' }
        ]
      },
      {
        id: 'worked-example',
        title: '4. A complete two-dimensional example',
        paragraphs: [
          'Take $A=\\begin{pmatrix}1&-1/3\\\\-1/3&1\\end{pmatrix}$ and $b=(1,0)^T$. The symmetric and antisymmetric eigenvectors have eigenvalues $2/3$ and $4/3$. Because b has equal overlap with both eigenvectors, inversion multiplies one component by $3/2$ and the other by $3/4$. Transforming back gives $x=(9/8,3/8)^T$.',
          'The quantum state discards the common scale and becomes $|x\\rangle=(3|0\\rangle+|1\\rangle)/\\sqrt{10}$. A measurement in Z estimates the ratio of squared components but cannot reveal the original norm $\\|x\\|$ without additional information. This tiny example exposes the complete output contract before any large circuit is discussed.'
        ],
        equations: [
          { label: 'Worked solution', latex: 'x=A^{-1}b=\\begin{pmatrix}9/8\\\\3/8\\end{pmatrix},\\qquad |x\\rangle=\\frac{3|0\\rangle+|1\\rangle}{\\sqrt{10}}', note: 'The state stores the direction of x in vector space, not its classical scale.' }
        ]
      },
      {
        id: 'complexity',
        title: '5. Where a claimed speedup can disappear',
        paragraphs: [
          'The original HHL result gives polylogarithmic dependence on N only under strong structural and access assumptions, with additional dependence on sparsity, condition number, and precision. Later work improves the dependence on precision from polynomial in $1/\\epsilon$ to polynomial in $\\log(1/\\epsilon)$ for suitable models. Neither statement means an arbitrary dense system can be loaded, solved, and printed in logarithmic time.',
          'An end-to-end comparison asks: How is A queried? How is $|b\\rangle$ prepared? How large is κ? Which scalar property of x is needed? How many state copies estimate it? How is correctness verified? What classical sparse, iterative, or preconditioned solver is the baseline? If any step scales like N, the exponential headline may no longer describe the application.'
        ],
        equations: [
          { label: 'Residual for verification', latex: 'r=b-A\\tilde{x},\\qquad \\frac{\\|r\\|}{\\|b\\|}', note: 'A classical residual is easy when coordinates are available; verifying an amplitude-encoded state requires a different access-aware procedure.' }
        ]
      },
      {
        id: 'research-method',
        title: '6. How I would study a new quantum linear solver paper',
        paragraphs: [
          'First identify the oracle or block-encoding model for A and the circuit assumed for $|b\\rangle$. Then record dependence on N, sparsity, κ, error, and success probability. Next write the exact output state or observable guarantee. Finally compare with the strongest classical method under a comparable data-access model.',
          'For experiments, begin with matrices whose eigensystems and classical solutions are known. Sweep κ while holding dimension fixed, then sweep dimension under controlled sparsity. Report state fidelity, observable error, circuit depth, success probability, state-preparation cost, and verification cost separately. This reveals which component—not merely the final fidelity—limits the method.'
        ],
        equations: []
      }
    ],
    codeLab: {
      title: 'Diagnose the spectral inversion before implementing HHL',
      tool: 'NumPy + Qiskit Statevector',
      install: 'python -m pip install numpy qiskit',
      code: `import numpy as np
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

A = np.array([[1.0, -1/3], [-1/3, 1.0]])
b = np.array([1.0, 0.0])

# Classical reference and residual.
x = np.linalg.solve(A, b)
residual = np.linalg.norm(A @ x - b)
x_state = x / np.linalg.norm(x)

# Inspect inverse weighting in A's eigenbasis.
eigenvalues, eigenvectors = np.linalg.eigh(A)
beta = eigenvectors.conj().T @ b
reconstructed = eigenvectors @ (beta / eigenvalues)

qc = QuantumCircuit(1)
qc.initialize(x_state, 0)
state = Statevector.from_instruction(qc)

print("eigenvalues:", eigenvalues)
print("classical x:", x)
print("reconstructed x:", reconstructed)
print("normalized |x>:", state.data)
print("probabilities:", state.probabilities_dict())
print("residual:", residual)`,
      expected: 'The eigenvalues are approximately 2/3 and 4/3; x is [1.125, 0.375]; the normalized state is approximately [0.948683, 0.316228], giving probabilities 0.9 and 0.1.',
      interpretation: 'This code prepares the known solution state; it does not implement HHL. Its purpose is to verify the spectral target, normalization, endian convention, and observable predictions that a later quantum solver circuit must reproduce.'
    },
    limitations: [
      'The Hermitian assumption simplifies the derivation; non-Hermitian systems require an embedding or a different formulation.',
      'State preparation and matrix access are treated abstractly in many complexity statements.',
      'A state close in fidelity may still be expensive to verify or insufficient for recovering many coordinates.',
      'The code lab is a target-state diagnostic, not a demonstration of quantum advantage.'
    ],
    openQuestions: [
      'Which block-encoding assumptions are realistic for matrices arising from finite-element or machine-learning pipelines?',
      'How should preconditioning cost be included when comparing classical and quantum condition-number dependence?',
      'Which useful observables of x can be estimated without reconstructing the full vector?',
      'What verification protocol remains efficient under the same access assumptions as the solver?'
    ],
    relatedLessons: [
      { label: 'Week 1 · Matrices and spectral structure', href: 'lesson.html?week=1&topic=matrices-and-spectral-structure' },
      { label: 'Week 6 · Phase estimation', href: 'lesson.html?week=6&topic=phase-estimation' },
      { label: 'Week 6 · Resource reasoning', href: 'lesson.html?week=6&topic=resource-reasoning' }
    ],
    sources: [
      { title: 'Harrow, Hassidim & Lloyd — Quantum algorithm for linear systems of equations', url: 'https://arxiv.org/abs/0811.3171', type: 'Primary paper' },
      { title: 'Childs, Kothari & Somma — Improved dependence on precision', url: 'https://arxiv.org/abs/1511.02306', type: 'Primary paper' },
      { title: 'Somma & Subaşı — Complexity of quantum-state verification in QLSP', url: 'https://arxiv.org/abs/2007.15698', type: 'Primary paper' }
    ]
  },

  {
    slug: 'quantum-data-encoding-as-model-design',
    date: '2026-08-05',
    updated: '2026-08-05',
    sequence: 2,
    track: 'quantum-data-encoding',
    status: 'Exploration',
    maturity: 'Working note',
    title: 'Quantum Data Encoding Is Part of the Model',
    subtitle: 'Basis, angle, phase, dense-angle, and amplitude encoding compared through geometry, preparation cost, information loss, and Qiskit experiments.',
    readingTime: 20,
    researchQuestion: 'How should an encoding be chosen so that its quantum-state geometry matches the learning task without hiding state-preparation or readout cost?',
    abstract: 'Data encoding is not a neutral upload step. It determines which inputs become similar quantum states, which features are periodic or normalized away, how many qubits and entangling gates are required, and how often the circuit must be executed. This note derives common encodings, compares their resource trade-offs, and proposes an experimental protocol for deciding whether a feature map is useful.',
    tags: ['data encoding', 'feature maps', 'amplitude encoding', 'angle encoding', 'QML'],
    prerequisites: ['One-qubit rotations', 'Tensor products', 'State normalization', 'Inner products and fidelity'],
    keyFindings: [
      'Encoding defines an inductive bias: the overlap $|\\langle\\phi(x)|\\phi(x\\prime)\\rangle|^2$ determines which inputs look similar.',
      'Amplitude encoding saves qubits but generic loading can require work proportional to the classical feature dimension.',
      'Angle and phase encodings are shallow but impose periodicity and may create only product states until an entangling feature-map layer is added.',
      'Preprocessing, padding, normalization, repeated loading, and measurement are part of end-to-end resource accounting.'
    ],
    comparison: [
      { method: 'Basis', state: '|b₁…bₚ⟩', qubits: 'One qubit per classical bit', depth: 'Usually shallow X preparation', preserves: 'Exact bit string', risk: 'Large qubit count; no continuous geometry' },
      { method: 'Angle', state: '⊗ₖ Ry(xₖ)|0⟩', qubits: 'Usually one per feature', depth: 'Constant before entanglers', preserves: 'Local trigonometric feature map', risk: 'Periodicity and limited feature interaction' },
      { method: 'Phase', state: '⊗ₖ Rz(xₖ)|+⟩', qubits: 'Usually one per feature', depth: 'Constant before entanglers', preserves: 'Relative phase information', risk: 'Modulo 2π aliasing; needs non-Z measurement' },
      { method: 'Dense angle', state: 'Ry(x₂k)Rz(x₂k+1)|0⟩', qubits: 'About one per two features', depth: 'Shallow local rotations', preserves: 'Two local coordinates per qubit', risk: 'Scaling and ordering define geometry' },
      { method: 'Amplitude', state: 'Σᵢ xᵢ|i⟩/||x||', qubits: '⌈log₂N⌉', depth: 'Generic preparation can scale with N', preserves: 'Normalized vector direction', risk: 'Scale loss, padding, loading and readout cost' }
    ],
    sections: [
      {
        id: 'interface',
        title: '1. Encoding is the interface between data and Hilbert space',
        paragraphs: [
          'A classical sample $x$ becomes a quantum state $|\\phi(x)\\rangle=U(x)|0^n\\rangle$. Every downstream kernel, variational circuit, or measurement sees only this state. If two different inputs map to the same state up to global phase, no later quantum operation can recover their difference. If nearby inputs map to nearly orthogonal states, a simple classical neighbourhood may be destroyed.',
          'The overlap between encoded states defines a geometry. Choosing gates, scaling, repetitions, and entanglers is therefore comparable to choosing a feature map or kernel in classical machine learning. Encoding should be justified by the task and data, not selected only because it fits a qubit budget.'
        ],
        equations: [
          { label: 'Feature-state map', latex: 'x\\mapsto|\\phi(x)\\rangle=U(x)|0\\rangle^{\\otimes n}', note: 'The circuit is a deterministic map from classical input to a normalized state.' },
          { label: 'Induced fidelity', latex: 'K(x,x\\prime)=|\\langle\\phi(x)|\\phi(x\\prime)\\rangle|^2', note: 'This similarity is the basic quantum kernel associated with the encoding.' }
        ]
      },
      {
        id: 'normalization',
        title: '2. Classical scaling and quantum normalization are different operations',
        paragraphs: [
          'Classical standardization or min–max scaling controls feature distributions across a dataset. Quantum normalization requires every state vector to have unit 2-norm. In amplitude encoding, dividing a sample by its norm removes overall scale unless that norm is stored separately. In angle encoding, scaling controls rotation sensitivity and periodic wrapping.',
          'Preprocessing must be fitted on training data only to avoid leakage. The fitted transformation then applies to validation, test, and future data. A reproducible note records raw units, missing-value treatment, scaling interval, clipping policy, padding, and whether a sample norm is retained as an additional feature.'
        ],
        equations: [
          { label: 'Quantum normalization', latex: '|x\\rangle=\\frac{1}{\\|x\\|_2}\\sum_{i=0}^{N-1}x_i|i\\rangle', note: 'Amplitude encoding keeps direction but does not by itself keep the original norm.' },
          { label: 'Angle state', latex: 'R_y(x)|0\\rangle=\\cos(x/2)|0\\rangle+\\sin(x/2)|1\\rangle', note: 'The feature controls measurement probabilities through a periodic trigonometric map.' }
        ]
      },
      {
        id: 'local-encodings',
        title: '3. Local rotation encodings are shallow and geometrically explicit',
        paragraphs: [
          'Angle encoding maps one feature to a rotation such as Ry, usually creating a product state. Phase encoding first creates coherence and then maps a feature to relative phase through Rz or P. Dense-angle encoding uses two Bloch-sphere coordinates to place two features on one qubit. All three can be implemented with shallow local gates before optional entangling layers.',
          'Their simplicity makes analysis possible. For product Ry encoding, the state overlap factors into products of cosines of feature differences. This can become exponentially small as dimension grows, concentrating the kernel. Periodicity also creates aliases. Data re-uploading and entanglers change the geometry but increase depth and may complicate trainability.'
        ],
        equations: [
          { label: 'Product-angle overlap', latex: '\\langle\\phi(x)|\\phi(z)\\rangle=\\prod_k\\cos\\left(\\frac{x_k-z_k}{2}\\right)', note: 'For independent Ry encodings, similarity factorizes across features.' },
          { label: 'Phase periodicity', latex: 'R_z(x+2\\pi)= -R_z(x)', note: 'The sign is global for an isolated rotation, so features separated by 2π may encode the same physical state.' }
        ]
      },
      {
        id: 'amplitude',
        title: '4. Amplitude encoding trades qubits for preparation and readout',
        paragraphs: [
          'An N-dimensional vector fits into $\\lceil\\log_2N\\rceil$ qubits by assigning one normalized component to each computational-basis amplitude. If N is not a power of two, padding defines extra coordinates. The representation is compact in qubits and makes vector inner products appear naturally as state overlaps.',
          'The compact state description does not imply a compact loading circuit for arbitrary classical data. Generic state preparation can scale with N, and extracting all amplitudes also scales with N. Amplitude encoding is most compelling when data arrives naturally as a quantum state, has exploitable preparation structure, or the algorithm needs only global observables.'
        ],
        equations: [
          { label: 'Amplitude encoding', latex: '|x\\rangle=\\frac{1}{\\sqrt{\\sum_i|x_i|^2}}\\sum_i x_i|i\\rangle', note: 'Complex features may be encoded as amplitudes when a suitable preparation procedure exists.' },
          { label: 'Qubit count', latex: 'n=\\lceil\\log_2N\\rceil,\\qquad 2^n-N\\text{ padding coordinates}', note: 'Qubit compression and circuit complexity are different resources.' }
        ]
      },
      {
        id: 'feature-maps',
        title: '5. Entangling feature maps add interactions—and hypotheses',
        paragraphs: [
          'A feature map may alternate data-dependent rotations with entanglers, or re-upload features across several layers. Entanglers create non-factorizing similarities and interaction terms between features. The map can then express geometry unavailable to a simple product encoding, but not every complicated geometry helps classification or regression.',
          'A scientific comparison starts with the local encoding, adds one entangling design, and performs ablations over repetitions and interaction graph. Plot kernel matrices and eigenvalues, measure two-qubit depth after transpilation, test robustness to input scaling, and compare against classical kernels under equal validation budgets.'
        ],
        equations: [
          { label: 'Layered map', latex: 'U_\\phi(x)=\\prod_{\\ell=1}^{L}U_{\\mathrm{ent}}^{(\\ell)}U_{\\mathrm{data}}^{(\\ell)}(x)', note: 'Layer order and repeated data injection determine the induced feature interactions.' }
        ]
      },
      {
        id: 'experiment',
        title: '6. An evidence plan for choosing an encoding',
        paragraphs: [
          'Begin with a fixed dataset split and preprocessing pipeline. For each encoding, record qubits, logical and transpiled depth, two-qubit gates, preparation time, and number of circuit evaluations. Compare exact-state geometry before adding shots or hardware noise. Then train the same downstream method with comparable hyperparameter search.',
          'Report accuracy or task loss together with uncertainty across seeds, runtime, kernel condition, and sensitivity to scaling. Include linear and RBF baselines. If a quantum encoding performs differently, analyze which state overlaps or feature interactions explain the result rather than attributing improvement to Hilbert-space dimension alone.'
        ],
        equations: []
      }
    ],
    codeLab: {
      title: 'Compare angle and amplitude encodings as states',
      tool: 'NumPy + Qiskit Statevector',
      install: 'python -m pip install numpy qiskit',
      code: `import numpy as np
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

features = np.array([0.2, 1.1])

# One feature per qubit: shallow product-state angle encoding.
angle = QuantumCircuit(2)
angle.ry(float(features[0]), 0)
angle.ry(float(features[1]), 1)
angle_state = Statevector.from_instruction(angle)

# Four real features in two qubits: amplitude encoding.
vector = np.array([1.0, 2.0, 3.0, 4.0])
normalized = vector / np.linalg.norm(vector)
amplitude = QuantumCircuit(2)
amplitude.initialize(normalized, [0, 1])
amplitude_state = Statevector.from_instruction(amplitude)

print("angle amplitudes:", np.round(angle_state.data, 6))
print("angle probabilities:", angle_state.probabilities_dict())
print("amplitude amplitudes:", np.round(amplitude_state.data, 6))
print("amplitude norm:", np.linalg.norm(amplitude_state.data))
print("amplitude circuit depth:", amplitude.decompose(reps=6).depth())`,
      expected: 'Both statevectors have unit norm. Angle encoding uses only two local rotations, while decomposed arbitrary amplitude initialization requires a deeper preparation despite using the same two qubits.',
      interpretation: 'Change feature scale, add an entangler, and compare overlaps between several samples. The important output is not only the circuit drawing; it is how the induced similarity matrix and preparation resources change.'
    },
    limitations: [
      'The resource table describes common generic implementations; structured data can admit cheaper specialized preparation.',
      'Exact statevector overlaps omit shot noise, hardware noise, and compilation constraints.',
      'A good kernel matrix on four points does not establish generalization or scaling advantage.',
      'Encoding cost must be counted every time a data-dependent circuit is executed.'
    ],
    openQuestions: [
      'Which dataset symmetries should be built directly into an encoding rather than learned by a variational ansatz?',
      'When does amplitude preparation structure survive realistic data preprocessing?',
      'How do kernel eigenvalue concentration and shot noise interact as feature dimension grows?',
      'Can an encoding be selected using classical diagnostics before expensive quantum execution?'
    ],
    relatedLessons: [
      { label: 'Week 11 · Data encoding', href: 'lesson.html?week=11&topic=data-encoding' },
      { label: 'Week 11 · Feature maps', href: 'lesson.html?week=11&topic=feature-maps' },
      { label: 'Week 11 · Quantum kernels', href: 'lesson.html?week=11&topic=quantum-kernels' }
    ],
    sources: [
      { title: 'IBM Quantum Learning — Data encoding', url: 'https://quantum.cloud.ibm.com/learning/en/courses/quantum-machine-learning/data-encoding', type: 'Current learning reference' },
      { title: 'IBM Quantum Documentation — Circuit library and feature maps', url: 'https://quantum.cloud.ibm.com/docs/en/guides/circuit-library', type: 'Current SDK reference' },
      { title: 'Schuld & Killoran — Quantum machine learning in feature Hilbert spaces', url: 'https://arxiv.org/abs/1803.07128', type: 'Primary paper' }
    ]
  }
];

window.getQuantumResearchNoteHref = function(note) {
  return `research-note.html?note=${encodeURIComponent(note.slug)}`;
};

window.getQuantumResearchTrack = function(slug) {
  return window.quantumResearchTracks.find(track => track.slug === slug) || null;
};
