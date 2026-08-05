(function () {
  'use strict';

  const source = (title, url, note) => ({ title, url, note });
  const article = (config) => ({
    level: 'Foundational',
    minutes: 35,
    prerequisites: [],
    outcomes: [],
    sections: [],
    equations: [],
    worked: null,
    lab: null,
    exercises: [],
    connections: [],
    ...config
  });

  window.quantumBook = {
    title: 'Quantum Computing Textbook',
    subtitle: 'A connected, from-scratch path through mathematics, quantum theory, algorithms, software, and research practice.',
    edition: 'Living edition · August 2026',
    principles: [
      'Begin with the mathematical object, then attach physical meaning.',
      'Work a small example before stating the most general result.',
      'Separate an asymptotic theorem from the cost of loading data and reading output.',
      'Use code as an experiment: predict first, run second, explain the discrepancy.'
    ],
    paths: [
      { name: 'First principles', chapters: '1 → 5', detail: 'Linear algebra, postulates, qubits, entanglement, and open systems.' },
      { name: 'Algorithms', chapters: '1 → 7', detail: 'Build the language of interference before studying speedups.' },
      { name: 'NISQ research', chapters: '1–5 → 9–12', detail: 'Focus on observables, noise, hybrid optimization, and evidence.' }
    ],
    chapters: [
      {
        slug: 'mathematical-foundations',
        number: 1,
        title: 'Mathematical Foundations',
        summary: 'The language quantum mechanics uses: complex amplitudes, vector spaces, linear maps, spectra, and tensor products.',
        accent: 'Start here',
        references: [
          source('Nielsen & Chuang — Chapter 2', 'https://www.cambridge.org/highereducation/books/quantum-computation-and-quantum-information/01E10196D0A682A6AEFFEA52D53BE9AE', 'Linear algebra and postulates; consult your local copy if this link is unavailable.'),
          source('IBM Quantum — Basics of quantum information', 'https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information', 'A current companion course with mathematical prerequisites and Qiskit examples.')
        ],
        articles: [
          article({
            slug: 'complex-numbers-and-phase',
            title: 'Complex Numbers, Amplitudes, and Phase',
            minutes: 30,
            summary: 'Why quantum states use complex numbers, how magnitude becomes probability, and how relative phase becomes observable.',
            prerequisites: ['Algebra', 'Trigonometric functions', 'The idea of probability'],
            outcomes: ['Move between Cartesian, polar, and exponential form.', 'Distinguish global phase from relative phase.', 'Compute probabilities from complex amplitudes.'],
            sections: [
              { title: 'Three views of one number', body: 'A complex number z = a + ib is a point in the plane. Its polar form r(cos θ + i sin θ) separates magnitude r from angle θ, and Euler form re^{iθ} makes rotations easy to manipulate. Conjugation reflects across the real axis, so z* z = |z|² is real and non-negative.' },
              { title: 'Amplitude is not probability', body: 'A quantum amplitude may be negative or complex; a probability cannot. The Born rule converts an amplitude α into |α|². Interference happens before this conversion: amplitudes for indistinguishable alternatives add, and only then do we square the magnitude.' },
              { title: 'Only relative phase matters', body: 'Multiplying every component of a state by the same e^{iγ} changes no measurement probability and is called global phase. Changing one component relative to another can change later interference. The states (|0⟩+|1⟩)/√2 and (|0⟩−|1⟩)/√2 therefore represent different physical rays.' }
            ],
            equations: [
              { label: 'Polar form', latex: 'z=a+ib=re^{i\\theta},\\quad r=\\sqrt{a^2+b^2}', note: 'Use atan2(b,a) to place the angle in the correct quadrant.' },
              { label: 'Born conversion', latex: 'p=|\\alpha|^2=\\alpha^*\\alpha', note: 'Normalization ensures the probabilities sum to one.' }
            ],
            worked: { title: 'Normalize two amplitudes', problem: 'Let the unnormalized amplitudes be 1+i and 1. Find the normalized state and the probability of outcome 0.', steps: ['Compute squared magnitudes: |1+i|²=2 and |1|²=1.', 'The norm is √3, so divide both amplitudes by √3.', 'The probability of 0 is |(1+i)/√3|²=2/3.'], result: '|ψ⟩=((1+i)|0⟩+|1⟩)/√3 and p(0)=2/3.' },
            lab: { title: 'Inspect phase with Qiskit', code: "from qiskit import QuantumCircuit\nfrom qiskit.quantum_info import Statevector\n\nqc = QuantumCircuit(1)\nqc.h(0)\nqc.z(0)\nprint(Statevector.from_instruction(qc))\n# Compare with H|0>: probabilities match, phase does not." },
            exercises: [
              { prompt: 'Convert −1+i√3 to polar form.', hint: 'Its magnitude is 2 and it lies in quadrant II.', answer: '2e^{i2π/3}.' },
              { prompt: 'Show that e^{iγ}|ψ⟩ has the same basis probabilities as |ψ⟩.', hint: 'Take the magnitude squared of e^{iγ}αk.', answer: '|e^{iγ}αk|²=|e^{iγ}|²|αk|²=|αk|².' }
            ],
            connections: ['mathematical-foundations/vectors-bases-inner-products', 'qubits-and-control/bloch-sphere']
          }),
          article({
            slug: 'vectors-bases-inner-products',
            title: 'Vectors, Bases, and Inner Products',
            minutes: 40,
            summary: 'Represent states as coordinate vectors without confusing a vector with the basis used to describe it.',
            prerequisites: ['Complex numbers and phase', 'Systems of linear equations'],
            outcomes: ['Expand vectors in an orthonormal basis.', 'Use inner products to compute length and overlap.', 'Change basis while preserving the physical state.'],
            sections: [
              { title: 'State versus coordinates', body: 'A ket |ψ⟩ is an abstract vector. A column such as (α,β)ᵀ is its coordinate representation in an ordered basis, usually {|0⟩,|1⟩}. Changing basis changes the coordinates, not the underlying vector. Keeping this distinction prevents many sign and ordering errors.' },
              { title: 'Inner products', body: 'The inner product ⟨φ|ψ⟩ is conjugate-linear in the first input and linear in the second. It measures overlap: orthogonal vectors have zero overlap, while a normalized vector has unit self-overlap. Cauchy–Schwarz guarantees |⟨φ|ψ⟩|≤||φ|| ||ψ||.' },
              { title: 'Completeness and resolution of identity', body: 'An orthonormal basis spans the space and obeys Σk|k⟩⟨k|=I. Inserting this identity expands a state, operator, or amplitude in a convenient basis. This simple move powers measurement calculations and spectral decompositions throughout the book.' }
            ],
            equations: [
              { label: 'Coordinate expansion', latex: '|\\psi\\rangle=\\sum_k |e_k\\rangle\\langle e_k|\\psi\\rangle', note: 'The coefficient of |e_k⟩ is the inner product ⟨e_k|ψ⟩.' },
              { label: 'Norm', latex: '\\|\\psi\\|=\\sqrt{\\langle\\psi|\\psi\\rangle}', note: 'Quantum state vectors are normalized to one.' }
            ],
            worked: { title: 'Measure in the X basis', problem: 'Write |0⟩ in the {|+⟩,|−⟩} basis.', steps: ['Use coefficients ⟨+|0⟩ and ⟨−|0⟩.', 'Both coefficients equal 1/√2.', 'Substitute into the basis expansion.'], result: '|0⟩=(|+⟩+|−⟩)/√2, so an X-basis measurement is uniform.' },
            lab: { title: 'Check overlaps numerically', code: "import numpy as np\nzero = np.array([1, 0], dtype=complex)\nplus = np.array([1, 1], dtype=complex) / np.sqrt(2)\nprint(np.vdot(plus, zero))      # conjugates first input\nprint(abs(np.vdot(plus, zero))**2)" },
            exercises: [
              { prompt: 'Normalize (1,i,−1,i)ᵀ.', hint: 'Add four squared magnitudes.', answer: 'Divide the vector by 2.' },
              { prompt: 'Prove that two nonzero eigenvectors of a Hermitian matrix with different eigenvalues are orthogonal.', hint: 'Compute ⟨u|Av⟩ in two ways.', answer: '(λv−λu)⟨u|v⟩=0; distinct real eigenvalues imply ⟨u|v⟩=0.' }
            ],
            connections: ['mathematical-foundations/matrices-eigenvalues-spectral-theorem', 'quantum-states-and-postulates/born-rule-measurement']
          }),
          article({
            slug: 'matrices-eigenvalues-spectral-theorem',
            title: 'Matrices, Eigenvalues, and the Spectral Theorem',
            minutes: 50,
            level: 'Core mathematics',
            summary: 'Understand operators structurally so that unitaries, observables, Hamiltonians, and projectors become one language.',
            prerequisites: ['Vectors, bases, and inner products', 'Matrix multiplication'],
            outcomes: ['Test whether an operator is unitary or Hermitian.', 'Diagonalize small normal matrices.', 'Interpret a spectral decomposition as weighted projectors.'],
            sections: [
              { title: 'Linear operators and adjoints', body: 'A linear operator A satisfies A(α|u⟩+β|v⟩)=αA|u⟩+βA|v⟩. Its adjoint A† is the conjugate transpose in an orthonormal basis. Hermitian operators satisfy A=A† and model observables; unitary operators satisfy U†U=I and preserve inner products.' },
              { title: 'Eigenvectors reveal invariant directions', body: 'An eigenvector changes only by a scalar: A|a⟩=a|a⟩. Diagonal form is valuable because powers, exponentials, and expectation values reduce to operations on eigenvalues. Degeneracy means multiple independent eigenvectors share an eigenvalue.' },
              { title: 'Spectral theorem', body: 'Every normal finite-dimensional operator has an orthonormal eigenbasis. A Hermitian observable therefore decomposes as A=Σa aPa, where Pa projects onto the eigenspace with outcome a. Measurement and time evolution are both easiest in this basis.' }
            ],
            equations: [
              { label: 'Spectral decomposition', latex: 'A=\\sum_a aP_a,\\quad P_aP_b=\\delta_{ab}P_a', note: 'For non-degenerate spectra, Pa=|a⟩⟨a|.' },
              { label: 'Matrix exponential', latex: 'e^{-itA}=\\sum_a e^{-ita}P_a', note: 'Diagonalization turns an operator exponential into scalar exponentials.' }
            ],
            worked: { title: 'Diagonalize Pauli X', problem: 'Find the spectrum of X and use it to reconstruct X.', steps: ['Solve det(X−λI)=λ²−1=0.', 'Normalized eigenvectors are |+⟩ and |−⟩.', 'Weight projectors by eigenvalues +1 and −1.'], result: 'X=|+⟩⟨+|−|−⟩⟨−|.' },
            lab: { title: 'Verify a spectral decomposition', code: "import numpy as np\nX = np.array([[0,1],[1,0]], complex)\nw, v = np.linalg.eigh(X)\nreconstructed = v @ np.diag(w) @ v.conj().T\nprint(w)\nprint(np.allclose(X, reconstructed))" },
            exercises: [
              { prompt: 'Show that eigenvalues of a unitary operator have magnitude one.', hint: 'Compare ||U|u⟩|| with |||u⟩||.', answer: 'Norm preservation gives |λ| ||u||=||u||, hence |λ|=1.' },
              { prompt: 'Compute e^{-iθZ/2}.', hint: 'Use the eigenprojectors |0⟩⟨0| and |1⟩⟨1|.', answer: 'diag(e^{-iθ/2}, e^{iθ/2}).' }
            ],
            connections: ['quantum-states-and-postulates/unitary-evolution', 'general-measurement-and-noise/channels-kraus-operators']
          }),
          article({
            slug: 'tensor-products-composite-spaces',
            title: 'Tensor Products and Composite Spaces',
            minutes: 50,
            level: 'Core mathematics',
            summary: 'Build many-qubit spaces, track basis ordering, and understand why their dimension grows exponentially.',
            prerequisites: ['Vectors and matrices', 'Basis expansion'],
            outcomes: ['Compute tensor products of vectors and operators.', 'Translate between bit strings and basis indices.', 'Recognize product states using coefficient constraints.'],
            sections: [
              { title: 'Composition multiplies dimensions', body: 'If systems A and B have spaces HA and HB, the joint system lives in HA⊗HB. Basis vectors pair as |i⟩A⊗|j⟩B, abbreviated |ij⟩. A register of n qubits therefore has dimension 2^n even though it contains only n physical subsystems.' },
              { title: 'Kronecker product in coordinates', body: 'The tensor product distributes over addition but is not commutative. In matrix coordinates it becomes the Kronecker product. Always state the subsystem order: swapping A⊗B to B⊗A requires a SWAP map, not casual rearrangement.' },
              { title: 'Local and joint operators', body: 'Applying U only to A is written U⊗IB. Joint gates such as CNOT generally cannot be factored into one operator per qubit. This algebraic non-factorability is the doorway to entanglement and to genuinely quantum correlations.' }
            ],
            equations: [
              { label: 'Product expansion', latex: '(\\sum_i a_i|i\\rangle)\\otimes(\\sum_j b_j|j\\rangle)=\\sum_{i,j}a_ib_j|ij\\rangle', note: 'Every coefficient matrix of a product state has rank one.' },
              { label: 'Dimension', latex: '\\dim(\\mathcal H_A\\otimes\\mathcal H_B)=\\dim(\\mathcal H_A)\\dim(\\mathcal H_B)', note: 'This is why exact classical statevector storage scales exponentially.' }
            ],
            worked: { title: 'Expand |+⟩⊗|1⟩', problem: 'Find the computational-basis vector for |+⟩ on A and |1⟩ on B.', steps: ['Write |+⟩=(|0⟩+|1⟩)/√2.', 'Distribute the tensor product over the sum.', 'Use ordered basis |00⟩,|01⟩,|10⟩,|11⟩.'], result: '(|01⟩+|11⟩)/√2, represented by (0,1,0,1)ᵀ/√2.' },
            lab: { title: 'Compare tensor order', code: "import numpy as np\nplus = np.array([1,1])/np.sqrt(2)\none = np.array([0,1])\nprint(np.kron(plus, one))\nprint(np.kron(one, plus))       # different physical ordering" },
            exercises: [
              { prompt: 'Compute (X⊗I)|01⟩.', hint: 'X acts on the first subsystem only.', answer: '|11⟩.' },
              { prompt: 'Can (|00⟩+|11⟩)/√2 be written |a⟩⊗|b⟩?', hint: 'Compare the four product coefficients ac, ad, bc, bd.', answer: 'No. Requiring ad=bc=0 while ac and bd are nonzero is impossible.' }
            ],
            connections: ['multi-qubit-entanglement/product-versus-entangled', 'qubits-and-control/qiskit-ordering-circuits']
          })
        ]
      },
      {
        slug: 'quantum-states-and-postulates',
        number: 2,
        title: 'Quantum States and Postulates',
        summary: 'A precise operational model: states, transformations, measurement, and statistical mixtures.',
        accent: 'Physics core',
        references: [
          source('Nielsen & Chuang — Sections 2.2 and 2.4', 'https://www.cambridge.org/highereducation/books/quantum-computation-and-quantum-information/01E10196D0A682A6AEFFEA52D53BE9AE', 'Postulates, density operators, and reduced states.'),
          source('IBM Quantum — General formulation', 'https://quantum.cloud.ibm.com/learning/en/courses/general-formulation-of-quantum-information', 'Density matrices, channels, and general measurements.')
        ],
        articles: [
          article({
            slug: 'state-space-normalization',
            title: 'State Space, Normalization, and Physical Rays',
            minutes: 35,
            summary: 'Translate the first postulate into calculations while keeping normalization and global phase conceptually separate.',
            prerequisites: ['Complex amplitudes', 'Inner products'],
            outcomes: ['Normalize pure states.', 'Identify physically equivalent state vectors.', 'Compute basis probabilities without invoking collapse prematurely.'],
            sections: [
              { title: 'The state postulate', body: 'An isolated finite-dimensional quantum system is associated with a complex Hilbert space. A pure state is represented by a unit vector in that space. The postulate does not say the coordinates are hidden classical values; the entire vector controls future statistics.' },
              { title: 'Normalization', body: 'The condition ⟨ψ|ψ⟩=1 is a probability-consistency rule. An arbitrary nonzero vector can be normalized by dividing by its norm. The zero vector cannot represent a state because it would assign zero total probability.' },
              { title: 'Rays, not arrows', body: 'Vectors that differ only by a nonzero scalar become the same normalized ray after global phase is removed. Relative phase remains meaningful because later operations can convert it into population differences. Thus state equality should be tested up to global phase when comparing circuits.' }
            ],
            equations: [
              { label: 'Pure qubit', latex: '|\\psi\\rangle=\\alpha|0\\rangle+\\beta|1\\rangle,\\quad |\\alpha|^2+|\\beta|^2=1', note: 'Two complex amplitudes minus normalization and global phase leave two real degrees of freedom.' }
            ],
            worked: { title: 'Repair an unnormalized ket', problem: 'Normalize 2|0⟩−i|1⟩ and predict Z-basis outcomes.', steps: ['Squared norm is 4+1=5.', 'Divide the vector by √5.', 'Square magnitudes of each normalized coefficient.'], result: '|ψ⟩=(2|0⟩−i|1⟩)/√5; probabilities are 4/5 and 1/5.' },
            exercises: [
              { prompt: 'Are |ψ⟩ and −i|ψ⟩ distinguishable by any measurement?', hint: 'The density operator is |ψ⟩⟨ψ|.', answer: 'No. The global phase cancels in |ψ⟩⟨ψ|.' },
              { prompt: 'Parameterize a normalized qubit with two angles.', hint: 'Choose the |0⟩ coefficient real and non-negative.', answer: 'cos(θ/2)|0⟩+e^{iφ}sin(θ/2)|1⟩.' }
            ],
            connections: ['qubits-and-control/bloch-sphere', 'quantum-states-and-postulates/born-rule-measurement']
          }),
          article({
            slug: 'unitary-evolution',
            title: 'Unitary Evolution and Hamiltonians',
            minutes: 45,
            summary: 'Connect circuit gates with continuous-time physics through norm-preserving evolution.',
            prerequisites: ['Spectral theorem', 'Matrix exponentials'],
            outcomes: ['Verify that an evolution is unitary.', 'Move between a Hamiltonian and its propagator.', 'Explain reversibility for closed-system dynamics.'],
            sections: [
              { title: 'Closed systems evolve unitarily', body: 'Between measurements, an isolated state transforms as |ψ′⟩=U|ψ⟩ with U†U=I. Unitarity preserves inner products, so normalization and distinguishability are conserved. It also makes evolution reversible through U†.' },
              { title: 'Hamiltonian as generator', body: 'Continuous-time evolution obeys the Schrödinger equation. For a time-independent Hamiltonian H, the solution is U(t)=e^{-iHt/ℏ}. H must be Hermitian so that U(t) is unitary and energy measurement outcomes are real.' },
              { title: 'Circuits discretize control', body: 'A circuit treats calibrated operations as gates, often rotations generated by Pauli operators. Global phases introduced by a pulse may be ignorable, but relative phases and frame conventions are not. Hardware compilation approximates an ideal unitary with native controls.' }
            ],
            equations: [
              { label: 'Schrödinger equation', latex: 'i\\hbar\\frac{d}{dt}|\\psi(t)\\rangle=H(t)|\\psi(t)\\rangle', note: 'Time ordering is required when H(t) does not commute with itself at different times.' },
              { label: 'Pauli rotation', latex: 'R_n(\\theta)=e^{-i\\theta\\,\\hat n\\cdot\\vec\\sigma/2}', note: 'The half-angle appears because SU(2) double-covers ordinary spatial rotations.' }
            ],
            worked: { title: 'Evolve under Z', problem: 'Start in |+⟩ and evolve under H=(ℏω/2)Z for time t.', steps: ['Exponentiate the two Z eigenvalues ±1.', 'Apply phases e^{-iωt/2} and e^{iωt/2} to |0⟩ and |1⟩.', 'Discard a common global phase if desired.'], result: 'The relative phase advances by ωt, rotating the Bloch vector around z.' },
            lab: { title: 'Compare evolution and RZ', code: "import numpy as np\nfrom qiskit import QuantumCircuit\nfrom qiskit.quantum_info import Operator\n\ntheta = 0.7\nqc = QuantumCircuit(1); qc.rz(theta, 0)\nU = Operator(qc).data\nprint(U)\nprint(np.allclose(U.conj().T @ U, np.eye(2)))" },
            exercises: [
              { prompt: 'Why can no unitary map two different states to the same state?', hint: 'Unitary maps preserve inner products and are invertible.', answer: 'U† reverses U; a many-to-one map would have no inverse.' },
              { prompt: 'Show that e^{-iHt} is unitary for Hermitian H.', hint: 'Take the adjoint of the exponential.', answer: 'U†=e^{iHt}, so U†U=I.' }
            ],
            connections: ['qubits-and-control/pauli-gates-rotations', 'quantum-simulation/hamiltonians-pauli-decomposition']
          }),
          article({
            slug: 'born-rule-measurement',
            title: 'Born Rule and Projective Measurement',
            minutes: 45,
            summary: 'Predict outcome probabilities, post-measurement states, expectation values, and sampling uncertainty.',
            prerequisites: ['Inner products', 'Spectral theorem', 'Normalized states'],
            outcomes: ['Compute probabilities for arbitrary projective measurements.', 'Update a state conditioned on an outcome.', 'Distinguish expectation value from a single shot.'],
            sections: [
              { title: 'Outcomes come from an observable', body: 'A projective measurement is described by orthogonal projectors {Pa} that sum to identity. Outcome labels are often eigenvalues of a Hermitian observable A=Σa aPa. The label is conventional; the projectors determine the statistics and state update.' },
              { title: 'Probability and update', body: 'For a pure state |ψ⟩, outcome a occurs with probability ⟨ψ|Pa|ψ⟩. Conditioned on that outcome, the state becomes Pa|ψ⟩ divided by the square root of the probability. Repeating the same ideal projective measurement immediately returns the same outcome.' },
              { title: 'Expectations require ensembles', body: 'The expectation ⟨A⟩ is a weighted average over many identically prepared trials, not the value carried by a single system. With finite shots, an empirical mean has sampling error. A scientific result should report its shot count and uncertainty.' }
            ],
            equations: [
              { label: 'Projective Born rule', latex: 'p(a)=\\langle\\psi|P_a|\\psi\\rangle,\\quad |\\psi_a\\rangle=\\frac{P_a|\\psi\\rangle}{\\sqrt{p(a)}}', note: 'The conditional state is defined only for outcomes with nonzero probability.' },
              { label: 'Expectation', latex: '\\langle A\\rangle=\\langle\\psi|A|\\psi\\rangle=\\sum_a a\\,p(a)', note: 'Variance is ⟨A²⟩−⟨A⟩².' }
            ],
            worked: { title: 'X measurement of a phase state', problem: 'Measure |ψ⟩=(|0⟩+i|1⟩)/√2 in the X basis.', steps: ['Compute ⟨+|ψ⟩=(1+i)/2.', 'Its squared magnitude is 1/2.', 'The |−⟩ amplitude similarly has squared magnitude 1/2.'], result: 'Both X outcomes are equally likely even though the state has a definite +Y Bloch direction.' },
            lab: { title: 'Sample and compare to theory', code: "from qiskit import QuantumCircuit\nfrom qiskit.primitives import StatevectorSampler\n\nqc = QuantumCircuit(1)\nqc.h(0); qc.measure_all()\nresult = StatevectorSampler(seed=7).run([qc], shots=2000).result()\nprint(result[0].data.meas.get_counts())" },
            exercises: [
              { prompt: 'Find ⟨Z⟩ for α|0⟩+β|1⟩.', hint: 'Use Z eigenvalues +1 and −1.', answer: '|α|²−|β|².' },
              { prompt: 'Why does 100 shots not prove p=0.5 exactly?', hint: 'Counts are random variables.', answer: 'Finite sampling fluctuates; attach a confidence interval or standard error.' }
            ],
            connections: ['general-measurement-and-noise/povms-state-discrimination', 'variational-hybrid/expectations-gradients']
          }),
          article({
            slug: 'density-matrices-partial-trace',
            title: 'Density Matrices, Mixtures, and Partial Trace',
            minutes: 55,
            level: 'Intermediate',
            summary: 'Use one formalism for pure states, classical uncertainty, subsystems, noise, and statistical ensembles.',
            prerequisites: ['Outer products', 'Projective measurement', 'Tensor products'],
            outcomes: ['Test whether a density operator is valid.', 'Distinguish a coherent superposition from a mixture.', 'Compute a reduced state with the partial trace.'],
            sections: [
              { title: 'Ensembles become operators', body: 'If preparation i occurs with probability pi and produces |ψi⟩, the density operator is ρ=Σi pi|ψi⟩⟨ψi|. Different ensembles can generate the same ρ and are then operationally indistinguishable. A valid ρ is positive semidefinite and has trace one.' },
              { title: 'Purity and coherence', body: 'A pure state has ρ²=ρ and Tr(ρ²)=1. A mixed state has smaller purity. Off-diagonal entries depend on basis and encode coherence; they should not be read as probabilities. Dephasing suppresses these terms in its preferred basis.' },
              { title: 'Ignoring a subsystem', body: 'For a joint state ρAB, the reduced state ρA=TrB(ρAB) is the unique operator reproducing all local A statistics. An entangled pure state can have a mixed reduced state. This is not ignorance about a hidden pure state of A; it reflects correlations with B.' }
            ],
            equations: [
              { label: 'Density operator', latex: '\\rho=\\sum_i p_i|\\psi_i\\rangle\\langle\\psi_i|,\\quad \\rho\\succeq0,\\quad \\operatorname{Tr}\\rho=1', note: 'Expectation values become Tr(ρA).' },
              { label: 'Partial trace', latex: '\\rho_A=\\operatorname{Tr}_B(\\rho_{AB})=\\sum_j (I\\otimes\\langle j|)\\rho_{AB}(I\\otimes|j\\rangle)', note: 'The result does not depend on which orthonormal basis of B is used.' }
            ],
            worked: { title: 'Reduce a Bell pair', problem: 'Find subsystem A of |Φ+⟩=(|00⟩+|11⟩)/√2.', steps: ['Form |Φ+⟩⟨Φ+| with four outer-product terms.', 'Trace B: terms with different B indices vanish.', 'The two diagonal A terms remain with weight 1/2.'], result: 'ρA=I/2. The pair is pure, while either qubit alone is maximally mixed.' },
            lab: { title: 'Partial trace in Qiskit', code: "from qiskit.quantum_info import Statevector, partial_trace\nfrom qiskit import QuantumCircuit\n\nqc = QuantumCircuit(2); qc.h(0); qc.cx(0,1)\npsi = Statevector.from_instruction(qc)\nprint(partial_trace(psi, [1]))\nprint(partial_trace(psi, [1]).purity())" },
            exercises: [
              { prompt: 'Compare |+⟩⟨+| with the 50–50 mixture of |0⟩ and |1⟩.', hint: 'Write both as 2×2 matrices.', answer: '|+⟩ has off-diagonal 1/2 terms; the mixture is I/2.' },
              { prompt: 'Show that unitary evolution preserves purity.', hint: 'Use ρ′=UρU† and cyclicity of trace.', answer: 'Tr[(UρU†)²]=Tr(Uρ²U†)=Tr(ρ²).' }
            ],
            connections: ['multi-qubit-entanglement/schmidt-decomposition', 'general-measurement-and-noise/channels-kraus-operators']
          })
        ]
      },
      {
        slug: 'qubits-and-control',
        number: 3,
        title: 'Qubits and Single-Qubit Control',
        summary: 'Geometry, gates, basis changes, circuit notation, and the software conventions that turn equations into experiments.',
        accent: 'Circuit fluency',
        references: [
          source('IBM Quantum — Quantum circuits', 'https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information/quantum-circuits', 'Circuit language and single-system operations.'),
          source('Qiskit circuit library', 'https://quantum.cloud.ibm.com/docs/en/guides/circuit-library', 'Current SDK circuit and gate documentation.')
        ],
        articles: [
          article({
            slug: 'bloch-sphere',
            title: 'The Bloch Sphere and Qubit Geometry',
            minutes: 40,
            summary: 'Compress a pure qubit into two angles and relate coordinates to Pauli expectation values.',
            prerequisites: ['Normalized qubits', 'Global versus relative phase'],
            outcomes: ['Map a pure qubit to a Bloch vector.', 'Read Pauli expectations from coordinates.', 'Explain why mixed states fill the interior.'],
            sections: [
              { title: 'Two physical degrees of freedom', body: 'A normalized two-component complex vector has four real parameters. Normalization removes one and global phase removes another, leaving θ and φ. These angles place a pure qubit on a unit sphere: north is |0⟩, south is |1⟩, and the equator contains equal-magnitude superpositions.' },
              { title: 'Coordinates are observables', body: 'The Bloch coordinates (x,y,z) equal the expectation values of X,Y,Z. A measurement along a unit direction n has probabilities (1±r·n)/2. This makes gate action geometric and provides a compact way to diagnose state preparation.' },
              { title: 'Mixed states are shorter vectors', body: 'Every one-qubit density operator can be written (I+r·σ)/2 with ||r||≤1. Pure states lie on the surface and the maximally mixed state is at the origin. Noise often contracts or shifts the Bloch ball.' }
            ],
            equations: [
              { label: 'Bloch parameterization', latex: '|\\psi\\rangle=\\cos\\frac\\theta2|0\\rangle+e^{i\\phi}\\sin\\frac\\theta2|1\\rangle', note: 'θ∈[0,π] and φ∈[0,2π).' },
              { label: 'Density form', latex: '\\rho=\\frac12(I+xX+yY+zZ)', note: 'Purity is (1+||r||²)/2.' }
            ],
            worked: { title: 'Locate |+i⟩', problem: 'Find the Bloch coordinates of (|0⟩+i|1⟩)/√2.', steps: ['Equal magnitudes imply θ=π/2.', 'Relative phase i means φ=π/2.', 'Convert spherical coordinates to Cartesian coordinates.'], result: 'r=(0,1,0), the +Y direction.' },
            lab: { title: 'Extract a Bloch vector', code: "from qiskit.quantum_info import Statevector, Pauli\nfrom qiskit import QuantumCircuit\n\nqc = QuantumCircuit(1); qc.h(0); qc.s(0)\npsi = Statevector.from_instruction(qc)\nfor p in ['X','Y','Z']:\n    print(p, psi.expectation_value(Pauli(p)).real)" },
            exercises: [
              { prompt: 'Where is |−⟩ on the Bloch sphere?', hint: 'Compute X, Y, and Z expectations.', answer: '(−1,0,0).' },
              { prompt: 'What Bloch vector represents I/2?', hint: 'All Pauli traces vanish.', answer: '(0,0,0).' }
            ],
            connections: ['qubits-and-control/pauli-gates-rotations', 'general-measurement-and-noise/noise-channels']
          }),
          article({
            slug: 'pauli-gates-rotations',
            title: 'Pauli Gates and Rotations',
            minutes: 40,
            summary: 'See X, Y, and Z as both observables and generators of continuous rotations.',
            prerequisites: ['Bloch sphere', 'Matrix exponentials'],
            outcomes: ['Apply Pauli gates algebraically and geometrically.', 'Compose single-axis rotations.', 'Track phases introduced by Y and Z.'],
            sections: [
              { title: 'A basis for one-qubit operators', body: 'I, X, Y, and Z form an orthogonal basis for 2×2 complex matrices under the Hilbert–Schmidt inner product. Hermitian observables use real coefficients. Pauli products anticommute on different axes and close up to phases.' },
              { title: 'Discrete gates', body: 'X swaps |0⟩ and |1⟩, Z changes the sign of |1⟩, and Y combines a flip with phases. On the Bloch sphere they are π rotations about their corresponding axes, up to an irrelevant global phase.' },
              { title: 'Continuous control', body: 'Rx, Ry, and Rz interpolate continuously from identity. Rotations about the same axis add; rotations about different axes generally do not commute. Euler decompositions show that axis rotations can synthesize any one-qubit unitary up to global phase.' }
            ],
            equations: [
              { label: 'Pauli algebra', latex: '\\sigma_j\\sigma_k=\\delta_{jk}I+i\\sum_\\ell\\varepsilon_{jk\\ell}\\sigma_\\ell', note: 'This compactly encodes squares, commutators, and anticommutators.' },
              { label: 'Rotation identity', latex: 'R_n(\\theta)=\\cos\\frac\\theta2 I-i\\sin\\frac\\theta2(\\hat n\\cdot\\vec\\sigma)', note: 'It follows from (n·σ)²=I.' }
            ],
            worked: { title: 'Conjugate Z by X rotation', problem: 'What observable results from Rx(π/2)† Z Rx(π/2)?', steps: ['Interpret conjugation as rotating the measurement axis.', 'An x rotation carries z toward −y under the chosen convention.', 'Confirm by multiplying matrices.'], result: 'The transformed observable is −Y.' },
            lab: { title: 'Test non-commutation', code: "from qiskit import QuantumCircuit\nfrom qiskit.quantum_info import Operator\n\na = QuantumCircuit(1); a.rx(.7,0); a.rz(.4,0)\nb = QuantumCircuit(1); b.rz(.4,0); b.rx(.7,0)\nprint(Operator(a).equiv(Operator(b)))" },
            exercises: [
              { prompt: 'Compute XZ and ZX.', hint: 'Multiply the matrices or use Pauli algebra.', answer: 'XZ=−iY and ZX=iY, so XZ=−ZX.' },
              { prompt: 'Show Rz(α)Rz(β)=Rz(α+β).', hint: 'The generators commute.', answer: 'Their exponentials combine because both exponents are proportional to Z.' }
            ],
            connections: ['qubits-and-control/hadamard-basis-change', 'quantum-simulation/hamiltonians-pauli-decomposition']
          }),
          article({
            slug: 'hadamard-basis-change',
            title: 'Hadamard, Phase Gates, and Basis Change',
            minutes: 40,
            summary: 'Use basis changes deliberately to create, reveal, and redirect interference.',
            prerequisites: ['Pauli gates', 'Measurement in different bases'],
            outcomes: ['Explain H as a basis transformation.', 'Measure X or Y using a Z-basis detector.', 'Track phase through S and T gates.'],
            sections: [
              { title: 'Hadamard exchanges axes', body: 'H maps the Z eigenbasis to the X eigenbasis and satisfies H²=I. It does not automatically create useful parallelism: the algorithm must later recombine amplitudes so unwanted paths cancel and useful paths reinforce.' },
              { title: 'Phase gates rotate the equator', body: 'S=diag(1,i) is a quarter turn around z up to global phase, while T=diag(1,e^{iπ/4}) is an eighth turn. These gates preserve computational-basis probabilities but change interference in a later basis.' },
              { title: 'Measurement by rotation', body: 'Hardware commonly measures in the computational basis. To measure X, apply H before Z measurement. To measure Y, apply S† followed by H. The rotation changes the basis, not the physical question being asked.' }
            ],
            equations: [
              { label: 'Basis exchange', latex: 'HXH=Z,\\quad HZH=X,\\quad HYH=-Y', note: 'Conjugation tells how observables transform through a gate.' }
            ],
            worked: { title: 'Reveal a phase', problem: 'Distinguish |+⟩ and |−⟩ using only computational-basis measurement.', steps: ['Apply H to both states.', 'H|+⟩=|0⟩ and H|−⟩=|1⟩.', 'Measure Z once in the ideal case.'], result: 'The relative sign becomes a deterministic population difference.' },
            lab: { title: 'Measure Y with basis rotation', code: "from qiskit import QuantumCircuit\n\nqc = QuantumCircuit(1, 1)\nqc.h(0); qc.s(0)       # prepare |+i>\nqc.sdg(0); qc.h(0)     # Y-measurement rotation\nqc.measure(0, 0)\nprint(qc.draw())" },
            exercises: [
              { prompt: 'What is H|1⟩?', hint: 'Use the second column of H.', answer: '(|0⟩−|1⟩)/√2=|−⟩.' },
              { prompt: 'Why can a Z gate matter even though immediate Z probabilities are unchanged?', hint: 'Insert a later H.', answer: 'Z changes relative phase, which a basis change converts to different probabilities.' }
            ],
            connections: ['algorithmic-primitives/phase-kickback-interference', 'variational-hybrid/parameterized-circuits']
          }),
          article({
            slug: 'qiskit-ordering-circuits',
            title: 'Circuit Conventions and Qiskit Ordering',
            minutes: 45,
            summary: 'Avoid silent errors involving wire order, endianness, measurement bits, and circuit composition.',
            prerequisites: ['Tensor products', 'Basic Python'],
            outcomes: ['Read circuit time from left to right.', 'Interpret Qiskit basis-state labels correctly.', 'Separate ideal circuits from transpiled hardware circuits.'],
            sections: [
              { title: 'A circuit is an ordered composition', body: 'Gates are drawn left to right in time, but matrix products act right to left on column vectors. Operations on disjoint wires commute; operations sharing a wire may not. Barriers are compiler directives, not physical gates.' },
              { title: 'Bit-string conventions', body: 'Qiskit displays classical strings with the highest-index bit on the left, while qubit 0 is often the top wire and least-significant computational-basis bit. Always label registers and test a known basis state before interpreting multi-register counts.' },
              { title: 'Abstract versus ISA circuits', body: 'An algorithmic circuit may contain convenient gates unsupported by a device. Transpilation selects a layout, routes interactions, translates to the target basis, and optimizes. Scientific reporting should preserve both the logical and transpiled circuit.' }
            ],
            equations: [
              { label: 'Composition order', latex: '|\\psi_{out}\\rangle=U_m\\cdots U_2U_1|\\psi_{in}\\rangle', note: 'The first applied gate U1 is nearest the input ket.' }
            ],
            worked: { title: 'Decode |01⟩', problem: 'Qiskit reports statevector label |01⟩ for a two-qubit circuit. Which qubit is one?', steps: ['Read the displayed label as |q1 q0⟩.', 'The rightmost digit corresponds to qubit 0.', 'Therefore q0=1 and q1=0.'], result: 'The X gate was applied to qubit 0.' },
            lab: { title: 'Build a convention test', code: "from qiskit import QuantumCircuit\nfrom qiskit.quantum_info import Statevector\n\nqc = QuantumCircuit(2)\nqc.x(0)\nprint(Statevector.from_instruction(qc).probabilities_dict())\nprint(qc.draw())" },
            exercises: [
              { prompt: 'If X acts on q1 of |00⟩, what key appears?', hint: 'The printed order is q1q0.', answer: '10.' },
              { prompt: 'Why should a paper report transpiler seed and backend target?', hint: 'Routing and layout heuristics can change.', answer: 'They can produce different depths, SWAP counts, and therefore different noisy outcomes.' }
            ],
            connections: ['multi-qubit-entanglement/controlled-gates-bell-states', 'research-practice/reproducible-qiskit-experiments']
          })
        ]
      },
      {
        slug: 'multi-qubit-entanglement',
        number: 4,
        title: 'Multi-Qubit Systems and Entanglement',
        summary: 'Composite states, controlled operations, Schmidt structure, and information-processing protocols with no classical analogue.',
        accent: 'Quantum correlations',
        references: [
          source('IBM Quantum — Multiple systems', 'https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information/multiple-systems', 'States, operations, entanglement, and protocols.'),
          source('Nielsen & Chuang — Sections 2.5 and 2.6', 'https://www.cambridge.org/highereducation/books/quantum-computation-and-quantum-information/01E10196D0A682A6AEFFEA52D53BE9AE', 'Schmidt decomposition and EPR/Bell topics.')
        ],
        articles: [
          article({
            slug: 'product-versus-entangled',
            title: 'Product States versus Entangled States',
            minutes: 45,
            summary: 'Decide whether correlations can be explained by separate subsystem state vectors.',
            prerequisites: ['Tensor products', 'Partial trace'],
            outcomes: ['Recognize product and entangled pure states.', 'Use reduced-state purity as an entanglement test.', 'Separate entanglement from ordinary correlation.'],
            sections: [
              { title: 'Factorization is the definition', body: 'A pure state |ψ⟩AB is separable if it factors as |a⟩A⊗|b⟩B. Otherwise it is entangled. The test concerns the whole amplitude table, not whether a particular basis measurement happens to be correlated.' },
              { title: 'Reduced states diagnose pure-state entanglement', body: 'A bipartite pure state is a product exactly when either reduced density matrix is pure. Bell states have maximally mixed marginals, showing that complete local uncertainty can coexist with perfect joint structure.' },
              { title: 'Correlation is not enough', body: 'The mixed state (|00⟩⟨00|+|11⟩⟨11|)/2 has perfect Z correlation but is separable. Entanglement is stronger: its correlations cannot be generated by a convex mixture of product states. Basis-dependent correlations alone do not certify it.' }
            ],
            equations: [
              { label: 'Separable mixed state', latex: '\\rho_{AB}=\\sum_i p_i\\,\\rho_A^{(i)}\\otimes\\rho_B^{(i)}', note: 'States not expressible this way are entangled.' }
            ],
            worked: { title: 'Test a parameterized state', problem: 'For which θ is cosθ|00⟩+sinθ|11⟩ a product state?', steps: ['Trace out B to get diag(cos²θ,sin²θ).', 'Its purity is cos⁴θ+sin⁴θ.', 'Purity equals one only when one coefficient vanishes.'], result: 'The state is a product when θ is an integer multiple of π/2; otherwise it is entangled.' },
            lab: { title: 'Compare local purity', code: "from qiskit.quantum_info import Statevector, partial_trace\nfrom qiskit import QuantumCircuit\n\nqc = QuantumCircuit(2); qc.h(0); qc.cx(0,1)\npsi = Statevector.from_instruction(qc)\nprint(partial_trace(psi, [1]).purity())  # 0.5" },
            exercises: [
              { prompt: 'Is |0⟩⊗|+⟩ entangled?', hint: 'It is already written as a tensor product.', answer: 'No.' },
              { prompt: 'Why does a maximally mixed local state not mean the joint state is random?', hint: 'Compare a Bell state with I/4.', answer: 'Marginals discard correlations; the Bell joint state is pure and highly structured.' }
            ],
            connections: ['multi-qubit-entanglement/schmidt-decomposition', 'general-measurement-and-noise/distance-fidelity-tomography']
          }),
          article({
            slug: 'controlled-gates-bell-states',
            title: 'Controlled Gates and Bell-State Preparation',
            minutes: 45,
            summary: 'Understand conditional unitary action, create Bell pairs, and verify them beyond a single basis.',
            prerequisites: ['Qiskit ordering', 'Product states', 'Hadamard gate'],
            outcomes: ['Apply CNOT to arbitrary basis states.', 'Create all four Bell states.', 'Design measurements that distinguish coherence from classical correlation.'],
            sections: [
              { title: 'Control is coherent', body: 'A controlled-U applies U to the target when the control basis state is |1⟩ and does nothing for |0⟩. For a superposed control, linearity applies both branches coherently. It is not a hidden classical if-statement or a measurement.' },
              { title: 'Bell preparation', body: 'Starting from |00⟩, H on the control creates two paths and CNOT correlates the target, yielding |Φ+⟩. Local Pauli gates move among four orthonormal Bell states. Reversing the preparation circuit performs a Bell-basis measurement.' },
              { title: 'Verification needs incompatible bases', body: 'Z-basis correlation alone also appears in a classical mixture. Measuring XX reveals the coherence between |00⟩ and |11⟩. A practical verification reports multiple correlators, uncertainty, and a noise model or tomography protocol.' }
            ],
            equations: [
              { label: 'Bell states', latex: '|\\Phi^\\pm\\rangle=\\frac{|00\\rangle\\pm|11\\rangle}{\\sqrt2},\\quad |\\Psi^\\pm\\rangle=\\frac{|01\\rangle\\pm|10\\rangle}{\\sqrt2}', note: 'They form an orthonormal basis of two qubits.' }
            ],
            worked: { title: 'Track amplitudes through H+CNOT', problem: 'Apply H on q0 and CNOT q0→q1 to |00⟩.', steps: ['H creates (|00⟩+|01⟩)/√2 in Qiskit label ordering.', 'CNOT flips q1 in the branch where q0=1.', 'The branches become |00⟩ and |11⟩.'], result: 'The output is |Φ+⟩.' },
            lab: { title: 'Prepare and inspect a Bell pair', code: "from qiskit import QuantumCircuit\nfrom qiskit.quantum_info import Statevector\n\nqc = QuantumCircuit(2)\nqc.h(0); qc.cx(0, 1)\nprint(Statevector.from_instruction(qc).probabilities_dict())\nprint(qc.draw())" },
            exercises: [
              { prompt: 'Which local gate maps |Φ+⟩ to |Ψ+⟩?', hint: 'Flip either one qubit.', answer: 'X⊗I or I⊗X.' },
              { prompt: 'What are ⟨ZZ⟩ and ⟨XX⟩ for |Φ+⟩?', hint: 'It is a +1 eigenstate of both operators.', answer: 'Both are +1.' }
            ],
            connections: ['multi-qubit-entanglement/teleportation-superdense-coding', 'quantum-error-correction/stabilizers-css']
          }),
          article({
            slug: 'schmidt-decomposition',
            title: 'Schmidt Decomposition and Entanglement Entropy',
            minutes: 55,
            level: 'Intermediate',
            summary: 'Reduce every bipartite pure state to paired orthonormal modes and read its entanglement from singular values.',
            prerequisites: ['Singular value decomposition', 'Reduced density matrices'],
            outcomes: ['Construct Schmidt coefficients from an amplitude matrix.', 'Connect Schmidt rank to separability.', 'Compute pure-state entanglement entropy.'],
            sections: [
              { title: 'A canonical bipartite form', body: 'Every bipartite pure state can be written Σk sk|uk⟩|vk⟩ with non-negative Schmidt coefficients and orthonormal local vectors. It is the singular value decomposition of the amplitude matrix in physical notation.' },
              { title: 'The reduced spectra match', body: 'The nonzero eigenvalues of ρA and ρB are sk². Therefore both subsystems have the same von Neumann entropy even if their Hilbert-space dimensions differ. Schmidt rank one means a product state.' },
              { title: 'What the coefficients measure', body: 'A uniform set of d Schmidt coefficients gives log₂d entanglement bits across the cut. Local unitaries change Schmidt bases but not coefficients, so the coefficients classify bipartite pure-state entanglement up to local basis changes.' }
            ],
            equations: [
              { label: 'Schmidt form', latex: '|\\psi\\rangle=\\sum_{k=1}^{r}s_k|u_k\\rangle_A|v_k\\rangle_B,\\quad \\sum_k s_k^2=1', note: 'r is the Schmidt rank.' },
              { label: 'Entanglement entropy', latex: 'S(\\rho_A)=-\\sum_k s_k^2\\log_2 s_k^2', note: 'For bipartite pure states this is an entanglement measure.' }
            ],
            worked: { title: 'Partially entangled pair', problem: 'Find Schmidt data for √0.8|00⟩+√0.2|11⟩.', steps: ['The expression is already in Schmidt form.', 'Coefficients are √0.8 and √0.2.', 'Entropy is the binary entropy h₂(0.2).'], result: 'Schmidt rank 2 and entanglement entropy ≈0.722 bits.' },
            lab: { title: 'Extract Schmidt values', code: "import numpy as np\nA = np.array([[np.sqrt(.8), 0], [0, np.sqrt(.2)]])\ns = np.linalg.svd(A, compute_uv=False)\nentropy = -np.sum(s**2 * np.log2(s**2))\nprint(s, entropy)" },
            exercises: [
              { prompt: 'What are the Schmidt coefficients of a Bell state?', hint: 'Read its two paired terms.', answer: '1/√2 and 1/√2.' },
              { prompt: 'Can local gates change Schmidt rank?', hint: 'They only rotate the local Schmidt bases.', answer: 'No; invertible local unitaries preserve Schmidt coefficients and rank.' }
            ],
            connections: ['general-measurement-and-noise/distance-fidelity-tomography', 'quantum-simulation/verification-scaling-baselines']
          }),
          article({
            slug: 'teleportation-superdense-coding',
            title: 'Teleportation and Superdense Coding',
            minutes: 55,
            summary: 'Follow information flow through entanglement, classical communication, conditional corrections, and resource accounting.',
            prerequisites: ['Bell states', 'Measurement update', 'Controlled gates'],
            outcomes: ['Derive the teleportation correction table.', 'Explain why teleportation does not signal faster than light.', 'Compare qubit, ebit, and classical-bit resources.'],
            sections: [
              { title: 'Teleportation moves a state, not matter', body: 'Alice and Bob share an ebit. Alice entangles an unknown input with her half, measures two classical bits, and sends them to Bob. Bob applies a Pauli correction. The input system is destroyed; no copy is made.' },
              { title: 'Classical communication is essential', body: 'Before receiving Alice’s two bits, Bob’s reduced state is maximally mixed and independent of the input. Entanglement supplies correlations but no controllable superluminal signal. The protocol respects no-cloning and relativity.' },
              { title: 'Dense coding reverses the resource trade', body: 'With one shared ebit, Alice encodes two classical bits using one of four local Pauli operations, then sends her qubit. Bob performs a Bell measurement. Resource statements must count the pre-shared entanglement and transmitted systems.' }
            ],
            equations: [
              { label: 'Teleportation identity', latex: '|\\psi\\rangle|\\Phi^+\\rangle=\\frac12\\sum_{a,b\\in\\{0,1\\}}|\\beta_{ab}\\rangle\\,X^bZ^a|\\psi\\rangle', note: 'Alice’s Bell outcome identifies Bob’s Pauli frame correction.' }
            ],
            worked: { title: 'Correction table', problem: 'Alice obtains Bell bits a=1,b=0. Which correction restores |ψ⟩?', steps: ['Bob’s branch is X^bZ^a|ψ⟩.', 'Insert a=1 and b=0.', 'Apply the inverse; Pauli gates are self-inverse up to phase.'], result: 'Apply Z.' },
            lab: { title: 'Build a coherent teleportation circuit', code: "from qiskit import QuantumCircuit\nfrom qiskit.quantum_info import Statevector, partial_trace\n\nqc = QuantumCircuit(3)\nqc.ry(0.7, 0)              # unknown test state\nqc.h(1); qc.cx(1, 2)       # shared Bell pair\nqc.cx(0, 1); qc.h(0)       # Bell analysis\nqc.cx(1, 2); qc.cz(0, 2)   # deferred-measurement corrections\npsi = Statevector.from_instruction(qc)\nprint(partial_trace(psi, [0, 1]))" },
            exercises: [
              { prompt: 'Why are two classical bits required?', hint: 'There are four Bell outcomes.', answer: 'Bob must distinguish four possible Pauli frames, requiring log₂4=2 bits.' },
              { prompt: 'Does teleportation transmit Alice’s measurement outcome instantly?', hint: 'Inspect Bob’s marginal before the message.', answer: 'No. Bob sees I/2 until ordinary classical information arrives.' }
            ],
            connections: ['quantum-error-correction/why-qec-works', 'general-measurement-and-noise/povms-state-discrimination']
          })
        ]
      },
      {
        slug: 'general-measurement-and-noise',
        number: 5,
        title: 'General Measurement and Open Systems',
        summary: 'POVMs, channels, realistic noise, and quantitative tools for comparing imperfect states and experiments.',
        accent: 'Beyond pure circuits',
        references: [
          source('IBM Quantum — General formulation of quantum information', 'https://quantum.cloud.ibm.com/learning/en/courses/general-formulation-of-quantum-information', 'Density matrices, channels, fidelity, and general measurements.'),
          source('Nielsen & Chuang — Chapter 8', 'https://www.cambridge.org/highereducation/books/quantum-computation-and-quantum-information/01E10196D0A682A6AEFFEA52D53BE9AE', 'Quantum operations, distance measures, and fidelity.')
        ],
        articles: [
          article({
            slug: 'povms-state-discrimination',
            title: 'POVMs and Quantum State Discrimination',
            minutes: 55,
            level: 'Intermediate',
            summary: 'Generalize measurement beyond orthogonal projectors and understand the limits of distinguishing nonorthogonal states.',
            prerequisites: ['Density matrices', 'Projective measurement'],
            outcomes: ['Validate a POVM.', 'Compute outcome probabilities with the trace rule.', 'Explain why nonorthogonal states cannot be perfectly discriminated.'],
            sections: [
              { title: 'Effects, not necessarily projectors', body: 'A POVM is a set of positive operators {Ea} summing to identity. Outcome probabilities are Tr(ρEa). Effects may overlap and need not be idempotent, allowing noisy, indirect, or overcomplete measurements to be described uniformly.' },
              { title: 'Probabilities do not determine disturbance', body: 'A POVM specifies outcome statistics but not the full post-measurement state. A measurement instrument adds Kraus operators whose squared operators produce the effects. Different instruments can share a POVM while disturbing states differently.' },
              { title: 'Nonorthogonality limits information', body: 'No measurement perfectly distinguishes two nonorthogonal states in one shot. The optimal minimum-error strategy balances false positives according to priors and state overlap. Other strategies permit an inconclusive result to avoid wrong answers.' }
            ],
            equations: [
              { label: 'POVM rule', latex: 'E_a\\succeq0,\\quad\\sum_aE_a=I,\\quad p(a)=\\operatorname{Tr}(\\rho E_a)', note: 'Projective measurements are the special case Ea=Pa.' },
              { label: 'Helstrom error', latex: 'p_{err}^{\\star}=\\frac12\\left(1-\\|p_0\\rho_0-p_1\\rho_1\\|_1\\right)', note: 'This is the best single-shot binary discrimination error.' }
            ],
            worked: { title: 'Distinguish |0⟩ and |+⟩', problem: 'Can one projective measurement identify both states perfectly?', steps: ['Their overlap is ⟨0|+⟩=1/√2.', 'Perfect discrimination requires orthogonal support.', 'Because the overlap is nonzero, every measurement has error or inconclusive outcomes.'], result: 'Perfect deterministic discrimination is impossible from one copy.' },
            exercises: [
              { prompt: 'Show {2/3|ψk⟩⟨ψk|} for three equatorial trine states sums to I.', hint: 'Their Bloch vectors sum to zero.', answer: 'Each projector is (I+rk·σ)/2; summing gives 3I/2, then multiplying by 2/3 gives I.' },
              { prompt: 'Why is an arbitrary positive Ea not itself a state-update rule?', hint: 'Probabilities constrain M†M but not M.', answer: 'Many Kraus operators satisfy M†M=Ea and produce different conditional states.' }
            ],
            connections: ['general-measurement-and-noise/channels-kraus-operators', 'quantum-information-theory/qkd-information']
          }),
          article({
            slug: 'channels-kraus-operators',
            title: 'Quantum Channels and Kraus Operators',
            minutes: 60,
            level: 'Intermediate',
            summary: 'Model physical processes that include environments, loss of information, measurement, and noise.',
            prerequisites: ['Density matrices', 'Tensor products', 'Positive operators'],
            outcomes: ['Check trace preservation from Kraus operators.', 'Construct a channel by coupling to an environment.', 'Distinguish unital from non-unital processes.'],
            sections: [
              { title: 'The channel axioms', body: 'A physical state transformation is linear, completely positive, and trace preserving. Complete positivity ensures the map remains positive when the system is entangled with an untouched reference. Positivity on the system alone is not sufficient.' },
              { title: 'Operator-sum representation', body: 'Every finite-dimensional channel has a Kraus form E(ρ)=Σk KkρKk† with Σk Kk†Kk=I. Kraus representations are not unique; changing the environment basis mixes them without changing the channel.' },
              { title: 'Environment picture', body: 'A channel can be realized by appending an environment state, applying a joint unitary, and tracing out the environment. What looks irreversible on the system is compatible with reversible dynamics on a larger closed space.' }
            ],
            equations: [
              { label: 'Kraus form', latex: '\\mathcal E(\\rho)=\\sum_kK_k\\rho K_k^\\dagger,\\quad\\sum_kK_k^\\dagger K_k=I', note: 'Trace-non-increasing maps describe selected outcomes.' }
            ],
            worked: { title: 'Verify a bit-flip channel', problem: 'For K0=√(1−p)I and K1=√pX, verify trace preservation.', steps: ['Compute K0†K0=(1−p)I.', 'Compute K1†K1=pI.', 'Add the terms.'], result: 'The sum is I, so the map is trace preserving.' },
            lab: { title: 'Apply a channel by Kraus operators', code: "import numpy as np\nfrom qiskit.quantum_info import DensityMatrix, Kraus\n\np = .2\nI = np.eye(2); X = np.array([[0,1],[1,0]])\nchannel = Kraus([np.sqrt(1-p)*I, np.sqrt(p)*X])\nrho = DensityMatrix.from_label('0').evolve(channel)\nprint(rho)" },
            exercises: [
              { prompt: 'Is every unitary channel unital?', hint: 'Evaluate UIU†.', answer: 'Yes; it maps identity to identity.' },
              { prompt: 'Why is the transpose map positive but not completely positive?', hint: 'Apply partial transpose to half of a Bell state.', answer: 'The result has a negative eigenvalue, so the extended map is not positive.' }
            ],
            connections: ['general-measurement-and-noise/noise-channels', 'quantum-error-correction/why-qec-works']
          }),
          article({
            slug: 'noise-channels',
            title: 'Noise Channels: Dephasing, Depolarizing, and Damping',
            minutes: 55,
            summary: 'Connect named noise models to physical mechanisms, Bloch-ball motion, and observable decay.',
            prerequisites: ['Quantum channels', 'Bloch sphere'],
            outcomes: ['Write Kraus models for standard one-qubit noise.', 'Predict their effect on populations and coherences.', 'Know when a simple channel is only an approximation.'],
            sections: [
              { title: 'Dephasing destroys phase information', body: 'Phase damping suppresses off-diagonal terms in a preferred energy basis while leaving populations unchanged. On the Bloch ball it contracts x and y toward the z axis. T2 characterizes transverse coherence decay and includes more than pure dephasing.' },
              { title: 'Amplitude damping exchanges energy', body: 'Amplitude damping models relaxation from |1⟩ toward |0⟩, so it is non-unital and shifts the Bloch ball. At finite temperature, generalized amplitude damping includes both excitation and relaxation.' },
              { title: 'Depolarizing is symmetric but coarse', body: 'A depolarizing channel shrinks the Bloch vector isotropically toward the maximally mixed state. It is analytically convenient but may hide biased, coherent, correlated, leakage, and non-Markovian hardware errors.' }
            ],
            equations: [
              { label: 'Depolarizing channel', latex: '\\mathcal D_p(\\rho)=(1-p)\\rho+p\\frac{I}{2}', note: 'Parameter conventions vary across libraries; verify the exact definition.' },
              { label: 'Amplitude damping', latex: 'K_0=\\begin{pmatrix}1&0\\\\0&\\sqrt{1-\\gamma}\\end{pmatrix},\\quad K_1=\\begin{pmatrix}0&\\sqrt\\gamma\\\\0&0\\end{pmatrix}', note: 'γ is the decay probability over the modeled interval.' }
            ],
            worked: { title: 'Damp an excited state', problem: 'Apply amplitude damping with γ=0.3 to |1⟩.', steps: ['K0 branch retains |1⟩ with weight 1−γ.', 'K1 branch moves population to |0⟩ with weight γ.', 'Add the branch density operators.'], result: 'ρ=0.3|0⟩⟨0|+0.7|1⟩⟨1|.' },
            lab: { title: 'Watch coherence decay', code: "import numpy as np\nfrom qiskit.quantum_info import DensityMatrix, Kraus\n\np = .25\nK = [np.sqrt(1-p)*np.eye(2), np.sqrt(p)*np.array([[1,0],[0,-1]])]\nrho = DensityMatrix.from_label('+').evolve(Kraus(K))\nprint(rho.data)" },
            exercises: [
              { prompt: 'Which matrix elements does pure dephasing leave unchanged in the Z basis?', hint: 'Think populations versus coherences.', answer: 'The diagonal populations ρ00 and ρ11.' },
              { prompt: 'Why can a coherent calibration error be worse than equal-strength random noise in deep circuits?', hint: 'Systematic rotations can add coherently.', answer: 'Their amplitudes accumulate in the same direction rather than partially averaging out.' }
            ],
            connections: ['quantum-error-correction/repetition-shor-syndromes', 'research-practice/reproducible-qiskit-experiments']
          }),
          article({
            slug: 'distance-fidelity-tomography',
            title: 'Trace Distance, Fidelity, and Tomography',
            minutes: 60,
            level: 'Intermediate',
            summary: 'Quantify similarity, operational distinguishability, and the experimental cost of reconstructing states.',
            prerequisites: ['Density matrices', 'POVMs', 'Sampling uncertainty'],
            outcomes: ['Interpret trace distance operationally.', 'Compute pure-state fidelity.', 'Design and critique a small tomography experiment.'],
            sections: [
              { title: 'Different metrics answer different questions', body: 'Trace distance controls optimal distinguishability and contracts under channels. Fidelity measures closeness and is especially convenient when one state is pure. A single scalar never explains which coherent or stochastic mechanism caused an error.' },
              { title: 'Tomography is inference', body: 'State tomography measures an informationally complete set of observables and estimates a physical density matrix. Linear inversion may yield negative eigenvalues under noise; constrained maximum-likelihood or Bayesian methods enforce physicality but introduce modeling choices.' },
              { title: 'Scaling is the central warning', body: 'An arbitrary n-qubit density matrix has 4^n−1 real parameters. Full tomography therefore becomes impractical quickly. Large experiments use targeted observables, shadows, witnesses, or task-specific validation instead of reconstructing everything.' }
            ],
            equations: [
              { label: 'Trace distance', latex: 'D(\\rho,\\sigma)=\\frac12\\|\\rho-\\sigma\\|_1', note: 'For equal priors, optimal discrimination success is (1+D)/2.' },
              { label: 'Fidelity', latex: 'F(\\rho,\\sigma)=\\left(\\operatorname{Tr}\\sqrt{\\sqrt\\rho\\,\\sigma\\sqrt\\rho}\\right)^2', note: 'If ρ=|ψ⟩⟨ψ|, then F=⟨ψ|σ|ψ⟩.' }
            ],
            worked: { title: 'Compare |0⟩ and |+⟩', problem: 'Compute pure-state fidelity.', steps: ['Take overlap ⟨0|+⟩=1/√2.', 'Square its magnitude.', 'Interpret as the probability that |+⟩ passes a |0⟩ projector test.'], result: 'F=1/2.' },
            lab: { title: 'Reconstruct one qubit from Pauli means', code: "import numpy as np\nI=np.eye(2); X=np.array([[0,1],[1,0]]); Y=np.array([[0,-1j],[1j,0]]); Z=np.diag([1,-1])\nmeans = {'x':.6, 'y':.0, 'z':.8}\nrho = (I + means['x']*X + means['y']*Y + means['z']*Z)/2\nprint(np.linalg.eigvalsh(rho), rho)" },
            exercises: [
              { prompt: 'How many independent real parameters does a one-qubit density matrix have?', hint: 'Hermiticity gives four real values; trace removes one.', answer: 'Three, the Bloch-vector components.' },
              { prompt: 'Why should tomography report confidence intervals?', hint: 'Every Pauli mean is estimated from finite samples.', answer: 'The reconstructed state and derived metrics inherit statistical uncertainty.' }
            ],
            connections: ['quantum-simulation/verification-scaling-baselines', 'variational-hybrid/qaoa-optimization']
          })
        ]
      },
      {
        slug: 'algorithmic-primitives',
        number: 6,
        title: 'Computation and Algorithmic Primitives',
        summary: 'Reversibility, oracles, phase kickback, Fourier structure, estimation, and amplitude amplification.',
        accent: 'Algorithm engine room',
        references: [
          source('IBM Quantum — Fundamentals of quantum algorithms', 'https://quantum.cloud.ibm.com/learning/en/courses/fundamentals-of-quantum-algorithms', 'Query algorithms, QFT, phase estimation, and search.'),
          source('Nielsen & Chuang — Chapters 4–6', 'https://www.cambridge.org/highereducation/books/quantum-computation-and-quantum-information/01E10196D0A682A6AEFFEA52D53BE9AE', 'Circuits, QFT, phase estimation, and search.')
        ],
        articles: [
          article({
            slug: 'reversible-computation-oracles',
            title: 'Reversible Computation and Oracles',
            minutes: 50,
            summary: 'Embed classical functions into unitary transformations and count resources in the query model.',
            prerequisites: ['Unitary evolution', 'Controlled gates', 'Boolean functions'],
            outcomes: ['Construct a reversible oracle from a function.', 'Explain uncomputation and garbage registers.', 'Separate query complexity from gate complexity.'],
            sections: [
              { title: 'Irreversible functions need an embedding', body: 'A many-to-one classical map cannot itself be unitary. The standard oracle Uf maps |x,y⟩ to |x,y⊕f(x)⟩, preserving x so the transformation is bijective. Quantum algorithms may query it on superpositions, but this does not reveal every f(x).' },
              { title: 'Garbage carries information', body: 'A reversible subroutine often leaves work qubits entangled with its output. Copy or use the desired result coherently, then run the computation backward to reset ancillas. Uncomputation prevents garbage from destroying later interference.' },
              { title: 'The model defines the speedup', body: 'Oracle algorithms count calls to Uf and may suppress the cost of constructing it. A complete claim should also count qubits, elementary gates, precision, data access, and classical preprocessing. Query advantage is not automatically end-to-end advantage.' }
            ],
            equations: [
              { label: 'Standard oracle', latex: 'U_f|x\\rangle|y\\rangle=|x\\rangle|y\\oplus f(x)\\rangle', note: 'Applying Uf twice returns the input for Boolean f.' }
            ],
            worked: { title: 'Make AND reversible', problem: 'AND maps two bits to one and is not invertible. Build a reversible version.', steps: ['Keep both input bits a and b.', 'Add target c.', 'Map c to c⊕ab using a Toffoli gate.'], result: '|a,b,c⟩→|a,b,c⊕ab⟩ is a permutation and therefore unitary.' },
            lab: { title: 'A Boolean oracle', code: "from qiskit import QuantumCircuit\n\noracle = QuantumCircuit(3, name='AND oracle')\noracle.ccx(0, 1, 2)\nprint(oracle.draw())\nprint(oracle.to_gate())" },
            exercises: [
              { prompt: 'Why is |x⟩→|f(x)⟩ invalid when f has collisions?', hint: 'Check preservation of orthogonal inputs.', answer: 'Two orthogonal inputs could map to the same vector, violating inner-product preservation.' },
              { prompt: 'What is the purpose of uncomputation?', hint: 'Ancillas can stay entangled with the useful register.', answer: 'It returns workspace to a known state and removes unwanted which-path information.' }
            ],
            connections: ['algorithmic-primitives/phase-kickback-interference', 'research-practice/theorem-claim-audits']
          }),
          article({
            slug: 'phase-kickback-interference',
            title: 'Phase Kickback and Interference',
            minutes: 50,
            summary: 'Place information in phase, recombine paths, and read a global property rather than a list of function values.',
            prerequisites: ['Phase gates', 'Controlled unitaries', 'Eigenvectors'],
            outcomes: ['Derive phase kickback.', 'Design constructive and destructive interference.', 'Reject the misleading idea of reading all branches.'],
            sections: [
              { title: 'Eigenvalues return to the control', body: 'If a target |u⟩ is an eigenvector of U with eigenvalue e^{iφ}, controlled-U transforms a control superposition so the |1⟩ branch acquires e^{iφ}. The target returns unchanged while the control stores the phase relationally.' },
              { title: 'Interference is the computation', body: 'A superposition only spreads amplitude. Advantage appears when a circuit arranges signs and phases so wrong answers cancel and a desired global property gains amplitude. Measurement then samples the engineered distribution.' },
              { title: 'One query can encode a global pattern', body: 'With a |−⟩ target, a Boolean oracle contributes (−1)^{f(x)} to input x. This phase oracle is central to Deutsch–Jozsa, Bernstein–Vazirani, Grover reflections, and many Fourier algorithms.' }
            ],
            equations: [
              { label: 'Kickback', latex: '\\frac{|0\\rangle+|1\\rangle}{\\sqrt2}|u\\rangle\\xrightarrow{c-U}\\frac{|0\\rangle+e^{i\\phi}|1\\rangle}{\\sqrt2}|u\\rangle', note: 'The control now carries the eigenphase.' },
              { label: 'Boolean phase oracle', latex: 'U_f|x\\rangle|{-}\\rangle=(-1)^{f(x)}|x\\rangle|{-}\\rangle', note: '|−⟩ is an X eigenstate with eigenvalue −1.' }
            ],
            worked: { title: 'Constant versus balanced interference', problem: 'For one-bit f, apply phase oracle then H to the input.', steps: ['The state becomes ((−1)^{f(0)}|0⟩+(−1)^{f(1)}|1⟩)/√2.', 'Equal signs interfere into |0⟩.', 'Opposite signs interfere into |1⟩.'], result: 'One oracle query distinguishes constant from balanced in the ideal query model.' },
            exercises: [
              { prompt: 'What happens if the kickback target is |+⟩ instead of |−⟩ for a CNOT-style oracle?', hint: 'X|+⟩=|+⟩.', answer: 'No phase is acquired; the oracle action becomes invisible on that target.' },
              { prompt: 'Why can measurement not reveal all 2^n amplitudes?', hint: 'One shot returns one classical outcome.', answer: 'Amplitudes influence a sampled distribution; reconstructing them generally requires many circuit settings and shots.' }
            ],
            connections: ['algorithmic-primitives/quantum-phase-estimation', 'canonical-algorithms/deutsch-jozsa-bernstein-vazirani']
          }),
          article({
            slug: 'quantum-fourier-transform',
            title: 'Quantum Fourier Transform',
            minutes: 65,
            level: 'Intermediate',
            summary: 'Understand the Fourier transform on amplitudes, its efficient circuit, bit reversal, and when its output is useful.',
            prerequisites: ['Complex roots of unity', 'Tensor products', 'Controlled phase gates'],
            outcomes: ['Apply the QFT definition to small registers.', 'Read the product-state circuit decomposition.', 'Explain why efficient QFT does not make every Fourier task exponentially fast.'],
            sections: [
              { title: 'A basis transformation on amplitudes', body: 'The QFT maps basis label x to a uniform superposition whose phase winds with xy/N. By linearity it transforms the entire amplitude vector. It is the quantum analogue of the discrete Fourier transform, but its output remains a quantum state.' },
              { title: 'Circuit structure', body: 'For N=2^n, binary fractions factor the output into single-qubit states using Hadamards and controlled phase rotations, followed by a bit-order reversal. Small rotations can be omitted for an approximate QFT with lower depth.' },
              { title: 'Readout is problem-specific', body: 'Measuring the QFT state gives samples, not an explicit list of Fourier coefficients. Quantum speedups arise when the algorithm needs a global periodic feature that can be inferred from those samples, as in phase estimation and order finding.' }
            ],
            equations: [
              { label: 'QFT', latex: 'F_N|x\\rangle=\\frac1{\\sqrt N}\\sum_{y=0}^{N-1}e^{2\\pi ixy/N}|y\\rangle', note: 'The inverse uses the negative phase.' }
            ],
            worked: { title: 'QFT of |1⟩ for N=4', problem: 'List the four output amplitudes.', steps: ['Use roots 1,i,−1,−i.', 'Multiply each by 1/2.', 'Attach them to |0⟩ through |3⟩.'], result: 'F4|1⟩=(|0⟩+i|1⟩−|2⟩−i|3⟩)/2.' },
            lab: { title: 'Build a small QFT', code: "from qiskit import QuantumCircuit\nfrom qiskit.circuit.library import QFTGate\n\nqc = QuantumCircuit(3)\nqc.append(QFTGate(3), range(3))\nprint(qc.decompose().draw())" },
            exercises: [
              { prompt: 'What is FN|0⟩?', hint: 'Every phase factor has x=0.', answer: 'The uniform superposition Σy|y⟩/√N.' },
              { prompt: 'Why does the exact QFT have O(n²) controlled rotations?', hint: 'Count interactions between qubit pairs.', answer: 'Each output qubit receives phases controlled by later input bits, giving a triangular number of gates.' }
            ],
            connections: ['algorithmic-primitives/quantum-phase-estimation', 'canonical-algorithms/shor-order-finding']
          }),
          article({
            slug: 'quantum-phase-estimation',
            title: 'Quantum Phase Estimation and Amplitude Amplification',
            minutes: 70,
            level: 'Intermediate',
            summary: 'Study two reusable engines: estimating an eigenphase and rotating amplitude toward a marked subspace.',
            prerequisites: ['Phase kickback', 'Inverse QFT', 'Reflections'],
            outcomes: ['Trace the phase-estimation state before inverse QFT.', 'Relate precision to controlled-U powers.', 'Interpret Grover iterations as two reflections.'],
            sections: [
              { title: 'Phase estimation', body: 'Given U|u⟩=e^{2πiφ}|u⟩, control qubits accumulate phases from U^{2^k}. The inverse QFT converts this phase gradient into an estimate of φ. Accuracy depends on control-register size, success probability, and the cost of implementing long-time controlled evolution.' },
              { title: 'Amplitude amplification', body: 'If a procedure prepares success amplitude sinθ, reflecting about the success subspace and the initial state rotates by 2θ. Repeating about π/(4θ) times raises success probability near one. The quadratic gain assumes the reflections can be implemented efficiently.' },
              { title: 'Resource caveats', body: 'Neither primitive is free. Phase estimation can require coherent depth and precise controlled powers; amplitude amplification multiplies the cost of state preparation and its inverse. End-to-end analysis must expose these components.' }
            ],
            equations: [
              { label: 'Phase register', latex: '\\frac1{2^{m/2}}\\sum_{k=0}^{2^m-1}e^{2\\pi ik\\phi}|k\\rangle', note: 'Inverse QFT concentrates this state near the m-bit estimate of φ.' },
              { label: 'Amplified success', latex: 'P_t=\\sin^2((2t+1)\\theta),\\quad \\sin^2\\theta=p', note: 'Choose the iteration count to avoid rotating past the target.' }
            ],
            worked: { title: 'Exact binary phase', problem: 'Let φ=5/8 and use three control qubits.', steps: ['Binary fraction 5/8=0.101₂.', 'Phase kickback builds the exact Fourier state for integer 5.', 'Inverse QFT returns computational basis 101.'], result: 'The ideal estimate is exact with probability one.' },
            lab: { title: 'Use Qiskit phase estimation components', code: "from qiskit import QuantumCircuit\nfrom qiskit.circuit.library import QFTGate\n\nqc = QuantumCircuit(4)\nqc.h(range(3))\n# Add controlled U^(1,2,4) operations here.\nqc.append(QFTGate(3).inverse(), range(3))\nprint(qc.draw())" },
            exercises: [
              { prompt: 'How many control qubits give resolution about 2^{-m}?', hint: 'The register has 2^m distinguishable grid points.', answer: 'm control qubits.' },
              { prompt: 'If initial success probability is 10^{-4}, what is the amplification iteration scale?', hint: 'θ≈√p for small p.', answer: 'O(1/√p)=O(100) uses of the preparation/reflection blocks.' }
            ],
            connections: ['canonical-algorithms/grover-search-counting', 'research-practice/quantum-linear-solvers']
          })
        ]
      },
      {
        slug: 'canonical-algorithms',
        number: 7,
        title: 'Canonical Quantum Algorithms',
        summary: 'Work through representative query, Fourier, search, and factoring algorithms with explicit assumptions and resource models.',
        accent: 'Speedups with conditions',
        references: [
          source('IBM Quantum — Fundamentals of quantum algorithms', 'https://quantum.cloud.ibm.com/learning/en/courses/fundamentals-of-quantum-algorithms', 'Structured introductions and exercises.'),
          source('Nielsen & Chuang — Chapters 5 and 6', 'https://www.cambridge.org/highereducation/books/quantum-computation-and-quantum-information/01E10196D0A682A6AEFFEA52D53BE9AE', 'QFT applications and quantum search.')
        ],
        articles: [
          article({
            slug: 'deutsch-jozsa-bernstein-vazirani',
            title: 'Deutsch–Jozsa and Bernstein–Vazirani',
            minutes: 55,
            summary: 'Use phase oracles and Hadamard interference to learn promised global structure.',
            prerequisites: ['Phase kickback', 'Boolean inner products'],
            outcomes: ['Derive each final amplitude.', 'State the oracle promise precisely.', 'Compare quantum and classical query complexities.'],
            sections: [
              { title: 'Deutsch–Jozsa promise', body: 'The function is promised constant or balanced. A phase query followed by H^{⊗n} makes the all-zero amplitude equal the average of (−1)^{f(x)}. It is ±1 for constant functions and zero for balanced functions.' },
              { title: 'Bernstein–Vazirani structure', body: 'The oracle hides a bit string s through f_s(x)=s·x mod 2. The phase pattern is exactly a Hadamard character, so a second Hadamard layer maps it to |s⟩. One ideal query recovers all n bits in the query model.' },
              { title: 'What these examples teach', body: 'The advantage comes from a promise and a structured oracle, not from trying all inputs and reading all results. When oracle construction dominates, the query comparison may not translate to application speedup.' }
            ],
            equations: [
              { label: 'Hadamard character', latex: 'H^{\\otimes n}|x\\rangle=\\frac1{2^{n/2}}\\sum_y(-1)^{x\\cdot y}|y\\rangle', note: 'Character orthogonality drives both algorithms.' }
            ],
            worked: { title: 'Recover s=101', problem: 'Evaluate the Bernstein–Vazirani circuit in the ideal phase-oracle model.', steps: ['Uniformly superpose x.', 'Oracle writes phase (−1)^{x·101}.', 'Final Hadamards use character orthogonality.'], result: 'The input register becomes |101⟩ with probability one.' },
            lab: { title: 'Bernstein–Vazirani circuit', code: "from qiskit import QuantumCircuit\n\ns = '101'\nqc = QuantumCircuit(4, 3)\nqc.x(3); qc.h(range(4))\nfor q, bit in enumerate(reversed(s)):\n    if bit == '1': qc.cx(q, 3)\nqc.h(range(3)); qc.measure(range(3), range(3))\nprint(qc.draw())" },
            exercises: [
              { prompt: 'Why does Deutsch–Jozsa need the promise?', hint: 'Consider functions that are neither constant nor balanced.', answer: 'The zero amplitude can take intermediate values, so one outcome no longer classifies all functions.' },
              { prompt: 'What resource is hidden by treating Uf as one query?', hint: 'Think about implementing f reversibly.', answer: 'The gate, ancilla, and depth cost of constructing the oracle.' }
            ],
            connections: ['canonical-algorithms/simon-hidden-periodicity', 'research-practice/theorem-claim-audits']
          }),
          article({
            slug: 'simon-hidden-periodicity',
            title: 'Simon’s Algorithm and Hidden Periodicity',
            minutes: 65,
            level: 'Intermediate',
            summary: 'Extract linear equations about a hidden XOR period and solve them classically.',
            prerequisites: ['Binary linear algebra', 'Oracle model', 'Hadamard characters'],
            outcomes: ['State Simon’s promise.', 'Derive the orthogonality equations.', 'Explain the exponential query separation.'],
            sections: [
              { title: 'Two-to-one promise', body: 'Simon’s oracle satisfies f(x)=f(y) exactly when y=x⊕s for a secret nonzero s. Measuring or discarding the output leaves an input superposition of paired points x and x⊕s.' },
              { title: 'Fourier sampling over bit strings', body: 'Applying H^{⊗n} makes outcomes y with y·s=0 mod 2. Each run supplies a random linear equation, not s directly. After collecting enough independent equations, classical Gaussian elimination finds s.' },
              { title: 'Significance and limits', body: 'Simon’s problem has an exponential randomized classical query lower bound and a polynomial quantum algorithm. It inspired the period-finding structure behind Shor’s algorithm, but the promise is specialized and application relevance depends on oracle access.' }
            ],
            equations: [
              { label: 'Observed constraint', latex: 'y\\cdot s=\\sum_{j=1}^{n}y_js_j\\pmod2=0', note: 'Collect roughly n independent samples and solve over GF(2).' }
            ],
            worked: { title: 'Solve three equations', problem: 'For n=3, samples are y=110 and 011. Find the nonzero s consistent with both.', steps: ['Equations are s1⊕s2=0 and s2⊕s3=0.', 'Thus all three bits are equal.', 'Exclude the promised zero vector.'], result: 's=111.' },
            exercises: [
              { prompt: 'Why is y=0 a valid but unhelpful sample?', hint: 'Its dot product with every s is zero.', answer: 'It adds no independent constraint.' },
              { prompt: 'Why are repeated samples needed?', hint: 'One equation leaves a large nullspace.', answer: 'The intersection of enough independent hyperplanes isolates the one-dimensional span containing s.' }
            ],
            connections: ['canonical-algorithms/shor-order-finding', 'algorithmic-primitives/quantum-fourier-transform']
          }),
          article({
            slug: 'grover-search-counting',
            title: 'Grover Search and Quantum Counting',
            minutes: 65,
            level: 'Intermediate',
            summary: 'Analyze the quadratic search speedup as a rotation in a two-dimensional invariant space.',
            prerequisites: ['Amplitude amplification', 'Phase oracles'],
            outcomes: ['Construct the Grover iterate.', 'Choose an iteration count.', 'State when oracle and verification costs erase practical gains.'],
            sections: [
              { title: 'Two reflections make a rotation', body: 'The oracle flips marked-state phase. The diffusion operation reflects about the uniform state. Together they rotate the state vector within the span of uniform marked and unmarked components.' },
              { title: 'Quadratic query advantage', body: 'With M marked items among N, the useful angle satisfies sin²θ=M/N. Roughly π√(N/M)/4 iterations maximize success. Continuing too long rotates away from the solution, so unknown M requires estimation or adaptive schedules.' },
              { title: 'Search is not free optimization', body: 'Grover assumes a coherent oracle that recognizes solutions and an efficient state preparation. Building and reversing that oracle can be expensive. It offers a generic quadratic improvement, not an exponential one, and output verification still matters.' }
            ],
            equations: [
              { label: 'Grover iteration', latex: 'G=(2|s\\rangle\\langle s|-I)(I-2\\Pi_{good})', note: 'Sign conventions vary but the two-reflection geometry is invariant.' },
              { label: 'Iteration count', latex: 't\\approx\\left\\lfloor\\frac\\pi4\\sqrt{\\frac NM}\\right\\rfloor', note: 'This approximation assumes M≪N and M is known.' }
            ],
            worked: { title: 'One marked item among four', problem: 'How many Grover iterations are needed?', steps: ['N=4, M=1 gives sinθ=1/2 and θ=π/6.', 'After one iteration the angle is 3θ=π/2.', 'The state lies entirely in the marked direction.'], result: 'One ideal iteration finds the target with probability one.' },
            lab: { title: 'Two-qubit Grover skeleton', code: "from qiskit import QuantumCircuit\n\nqc = QuantumCircuit(2)\nqc.h(range(2))\nqc.cz(0,1)                 # mark |11>\nqc.h(range(2)); qc.x(range(2))\nqc.cz(0,1); qc.x(range(2)); qc.h(range(2))\nqc.measure_all()\nprint(qc.draw())" },
            exercises: [
              { prompt: 'What is the query scale when half the database is marked?', hint: 'M/N is constant.', answer: 'O(1); classical random sampling is also O(1), so there is no asymptotic separation.' },
              { prompt: 'Why does overshooting reduce success?', hint: 'The iterate is a rotation, not a projection.', answer: 'Extra rotations move amplitude past the marked direction back toward the unmarked subspace.' }
            ],
            connections: ['algorithmic-primitives/quantum-phase-estimation', 'variational-hybrid/qaoa-optimization']
          }),
          article({
            slug: 'shor-order-finding',
            title: 'Shor’s Algorithm, Order Finding, and Continued Fractions',
            minutes: 80,
            level: 'Advanced core',
            summary: 'Connect modular arithmetic, quantum period finding, phase estimation, and classical post-processing.',
            prerequisites: ['QFT', 'Phase estimation', 'Modular arithmetic', 'Euclidean algorithm'],
            outcomes: ['Reduce factoring to order finding.', 'Explain the quantum subroutine.', 'Recover a rational period candidate with continued fractions.'],
            sections: [
              { title: 'Classical reduction', body: 'Choose a coprime a modulo odd composite N and find its multiplicative order r, the smallest positive r with a^r≡1 mod N. If r is even and a^{r/2} is not −1 mod N, gcd(a^{r/2}±1,N) yields nontrivial factors.' },
              { title: 'Quantum period finding', body: 'Modular multiplication defines a unitary whose eigenphases are fractions k/r. Phase estimation samples approximations to these fractions. Equivalent circuit descriptions use a periodic function register and QFT; both exploit the same Fourier structure.' },
              { title: 'Post-processing and resources', body: 'Continued fractions converts a measured rational approximation into candidate denominators, which must be verified. Fault-tolerant resource estimates count modular exponentiation, logical qubits, error correction, and precision—not merely the small QFT diagram.' }
            ],
            equations: [
              { label: 'Order condition', latex: 'a^r\\equiv1\\pmod N', note: 'The useful branch requires even r and a^{r/2}≠−1 mod N.' },
              { label: 'Factor identity', latex: '(a^{r/2}-1)(a^{r/2}+1)\\equiv0\\pmod N', note: 'GCDs extract the nontrivial factors.' }
            ],
            worked: { title: 'Factor 15 with a=2', problem: 'Use the order of 2 modulo 15.', steps: ['Powers are 2,4,8,1, so r=4.', 'Compute 2^{r/2}=4, which is not −1 mod 15.', 'gcd(4−1,15)=3 and gcd(4+1,15)=5.'], result: 'The factors are 3 and 5.' },
            exercises: [
              { prompt: 'Why is an odd order not useful in the standard reduction?', hint: 'The factorization uses r/2 as an integer.', answer: 'The difference-of-squares step requires even r.' },
              { prompt: 'What must be checked after continued fractions proposes r?', hint: 'Approximations can yield a divisor or incorrect denominator.', answer: 'Verify a^r≡1 mod N and test the GCD conditions.' }
            ],
            connections: ['quantum-error-correction/fault-tolerance-threshold', 'research-practice/theorem-claim-audits']
          })
        ]
      },
      {
        slug: 'quantum-error-correction',
        number: 8,
        title: 'Quantum Error Correction',
        summary: 'Encode logical information, extract syndromes without learning the state, and understand the road to fault tolerance.',
        accent: 'Reliable computation',
        references: [
          source('IBM Quantum — Foundations of quantum error correction', 'https://quantum.cloud.ibm.com/learning/en/courses/foundations-of-quantum-error-correction/index', 'Shor code, discretization, stabilizers, CSS, toric and surface codes.'),
          source('Nielsen & Chuang — Chapters 10 and 11', 'https://www.cambridge.org/highereducation/books/quantum-computation-and-quantum-information/01E10196D0A682A6AEFFEA52D53BE9AE', 'Error correction and entropy.')
        ],
        articles: [
          article({
            slug: 'why-qec-works',
            title: 'Why Quantum Error Correction Can Work',
            minutes: 55,
            summary: 'Reconcile no-cloning, continuous errors, measurement disturbance, and discrete syndrome recovery.',
            prerequisites: ['Quantum channels', 'Entanglement', 'Projective measurement'],
            outcomes: ['Explain error discretization.', 'State the Knill–Laflamme condition.', 'Describe syndrome extraction without reading logical amplitudes.'],
            sections: [
              { title: 'Encoding is not cloning', body: 'A logical qubit α|0L⟩+β|1L⟩ is distributed across a code subspace by a unitary isometry. The physical qubits do not hold independent copies of the unknown state. Correlations protect the subspace while respecting no-cloning.' },
              { title: 'Continuous errors become discrete syndromes', body: 'A small error can be expanded in an operator basis, often Pauli strings. Syndrome measurement projects the error into a distinguishable class without revealing α or β. Recovery reverses a representative error from that class.' },
              { title: 'Correctability condition', body: 'A code corrects errors {Ea} when their pairwise products act like scalars inside the code space. Then the environment or syndrome can learn which error occurred but cannot learn which logical state was encoded.' }
            ],
            equations: [
              { label: 'Knill–Laflamme', latex: 'P E_a^\\dagger E_b P=c_{ab}P', note: 'P projects onto the code space.' }
            ],
            worked: { title: 'Discretize a small rotation', problem: 'Expand e^{-iεX/2} acting on an encoded state.', steps: ['Use cos(ε/2)I−i sin(ε/2)X.', 'The state becomes a coherent combination of no error and X error.', 'Syndrome measurement separates the two correctable subspaces.'], result: 'Correcting I and X also corrects their coherent linear combination.' },
            exercises: [
              { prompt: 'Why not measure each data qubit to find an error?', hint: 'That would reveal logical-basis information.', answer: 'It collapses the encoded superposition; syndromes measure parity/stabilizers instead.' },
              { prompt: 'What does code distance d guarantee?', hint: 'Relate d to correctable error weight.', answer: 'It detects up to d−1 errors and corrects up to floor((d−1)/2) arbitrary qubit errors.' }
            ],
            connections: ['quantum-error-correction/repetition-shor-syndromes', 'quantum-error-correction/stabilizers-css']
          }),
          article({
            slug: 'repetition-shor-syndromes',
            title: 'Repetition Codes, the Shor Code, and Syndromes',
            minutes: 65,
            level: 'Intermediate',
            summary: 'Build intuition from parity checks, then combine bit- and phase-flip protection.',
            prerequisites: ['Why QEC works', 'CNOT gates', 'X and Z bases'],
            outcomes: ['Decode three-qubit repetition syndromes.', 'Convert phase errors to bit errors by basis change.', 'Explain the nine-qubit Shor code structure.'],
            sections: [
              { title: 'Bit-flip repetition code', body: '|0L⟩=|000⟩ and |1L⟩=|111⟩ protect against one X error. Measuring Z1Z2 and Z2Z3 reveals parity disagreements. The two syndrome bits locate an error without distinguishing α|000⟩+β|111⟩.' },
              { title: 'Phase-flip protection', body: 'Hadamards exchange X and Z, so a repetition code in the X basis protects against Z errors. The Shor code nests phase protection across blocks with bit-flip protection inside each block, correcting any single-qubit Pauli error.' },
              { title: 'A model, not a hardware blueprint', body: 'The Shor code is conceptually important but expensive. Real fault-tolerant architectures compare code thresholds, connectivity, decoder speed, syndrome cycles, leakage handling, and logical-operation overhead.' }
            ],
            equations: [
              { label: 'Bit-flip codewords', latex: '|0_L\\rangle=|000\\rangle,\\quad |1_L\\rangle=|111\\rangle', note: 'The logical state remains α|0L⟩+β|1L⟩.' }
            ],
            worked: { title: 'Decode a syndrome', problem: 'The checks Z1Z2 and Z2Z3 return −1,+1. Which qubit flipped?', steps: ['First parity disagrees, so error touches qubit 1 or 2.', 'Second parity agrees, so qubits 2 and 3 match.', 'Only a flip on qubit 1 fits both results.'], result: 'Apply X to qubit 1.' },
            lab: { title: 'Encode a repetition state', code: "from qiskit import QuantumCircuit\n\nqc = QuantumCircuit(5, 2)\nqc.h(0); qc.cx(0,1); qc.cx(0,2)  # encode |+> logically\nqc.x(1)                            # injected error\nqc.cx(0,3); qc.cx(1,3)\nqc.cx(1,4); qc.cx(2,4)             # parity ancillas\nqc.measure([3,4],[0,1])\nprint(qc.draw())" },
            exercises: [
              { prompt: 'What syndrome indicates an X error on the middle qubit?', hint: 'It disagrees with both neighbors.', answer: '(−1,−1).' },
              { prompt: 'Why does correcting all single-qubit X,Y,Z errors correct an arbitrary single-qubit error?', hint: 'I,X,Y,Z span all 2×2 operators.', answer: 'Linearity and syndrome discretization extend correction to any linear combination.' }
            ],
            connections: ['quantum-error-correction/stabilizers-css', 'general-measurement-and-noise/noise-channels']
          }),
          article({
            slug: 'stabilizers-css',
            title: 'Stabilizer Formalism and CSS Codes',
            minutes: 75,
            level: 'Advanced core',
            summary: 'Describe large code spaces compactly with commuting Pauli checks and connect quantum codes to classical linear codes.',
            prerequisites: ['Pauli algebra', 'Syndromes', 'Binary linear algebra'],
            outcomes: ['Identify a stabilizer code space.', 'Compute syndromes by commutation.', 'Distinguish stabilizers, logical operators, and correctable errors.'],
            sections: [
              { title: 'Codes as common +1 eigenspaces', body: 'An abelian Pauli subgroup S that excludes −I defines the states fixed by every stabilizer. For n qubits and r independent generators, the code space has dimension 2^{n−r}. This avoids writing exponentially long codewords.' },
              { title: 'Syndrome is a commutation pattern', body: 'An error that anticommutes with a generator flips its measured eigenvalue to −1. Errors with the same syndrome differ by a stabilizer or may differ by an undetectable logical operator. The decoder chooses a likely correction from the syndrome.' },
              { title: 'CSS structure', body: 'Calderbank–Shor–Steane codes separate X-type and Z-type checks using two related classical binary codes. The separation simplifies construction, syndrome circuits, transversal operations, and analysis of biased noise.' }
            ],
            equations: [
              { label: 'Stabilized code', latex: '\\mathcal C=\\{|\\psi\\rangle:S|\\psi\\rangle=|\\psi\\rangle\\ \\forall S\\in\\mathcal S\\}', note: 'Logical Paulis commute with S but are not themselves stabilizers.' },
              { label: 'Encoded qubits', latex: 'k=n-r', note: 'r independent stabilizer constraints reduce the 2^n-dimensional space to 2^k.' }
            ],
            worked: { title: 'Three-qubit code syndrome', problem: 'Use stabilizers ZZI and IZZ. Find the syndrome of IXI.', steps: ['IXI anticommutes with ZZI because X meets Z on qubit 2.', 'It also anticommutes with IZZ on qubit 2.', 'Both eigenvalues flip.'], result: 'Syndrome (−1,−1), identifying the middle-qubit bit flip.' },
            exercises: [
              { prompt: 'Why must stabilizer generators commute?', hint: 'They need simultaneous eigenstates.', answer: 'Anticommuting Paulis cannot share a nonzero +1 eigenvector.' },
              { prompt: 'What is the difference between a stabilizer and a logical operator?', hint: 'Both may commute with every check.', answer: 'A stabilizer acts as identity on the code space; a nontrivial logical operator changes encoded information.' }
            ],
            connections: ['quantum-error-correction/fault-tolerance-threshold', 'multi-qubit-entanglement/controlled-gates-bell-states']
          }),
          article({
            slug: 'fault-tolerance-threshold',
            title: 'Fault Tolerance and the Threshold Idea',
            minutes: 70,
            level: 'Advanced',
            summary: 'Prevent one physical fault from spreading into an uncorrectable logical failure and interpret threshold claims carefully.',
            prerequisites: ['Stabilizer codes', 'Noise models', 'Logical gates'],
            outcomes: ['Define a fault-tolerant gadget.', 'Explain the threshold theorem qualitatively.', 'Separate physical error rate from logical error per operation.'],
            sections: [
              { title: 'Correction circuits can also fail', body: 'A naive syndrome or logical-gate circuit may propagate a single ancilla fault into multiple data errors. Fault-tolerant constructions limit error spread, repeat or verify syndrome information, and schedule operations so a small number of faults remains correctable.' },
              { title: 'Logical suppression', body: 'For a suitable local stochastic noise model below a code-and-gadget threshold, increasing code distance can suppress logical error exponentially or faster in distance. The theorem does not promise a universal numerical threshold independent of architecture and noise.' },
              { title: 'Overhead is part of the result', body: 'A useful estimate reports logical qubits, code distance, syndrome cycle time, decoder latency, logical gate synthesis, magic-state factories, and total failure budget. Physical qubit count alone is not enough.' }
            ],
            equations: [
              { label: 'Illustrative logical scaling', latex: 'p_L\\approx A\\left(\\frac{p}{p_{th}}\\right)^{(d+1)/2}', note: 'This common fit is architecture- and noise-dependent, not a universal law.' }
            ],
            worked: { title: 'Allocate a failure budget', problem: 'A computation uses 10^9 logical locations and should fail with probability below 1%. What rough logical error per location is required?', steps: ['Use a union-bound estimate LpL≤0.01.', 'Insert L=10^9.', 'Solve for pL.'], result: 'Target pL≲10^{-11} per logical location, before adding safety margins.' },
            exercises: [
              { prompt: 'Why can a transversal CNOT be attractive?', hint: 'Track how one physical fault propagates between blocks.', answer: 'Pairwise gates limit a single fault from spreading to multiple qubits within the same code block.' },
              { prompt: 'Why is “physical error below 1%” not a complete threshold statement?', hint: 'Thresholds depend on more than one average number.', answer: 'They depend on code, decoder, connectivity, measurement, leakage, correlations, and the assumed noise model.' }
            ],
            connections: ['canonical-algorithms/shor-order-finding', 'research-practice/theorem-claim-audits']
          })
        ]
      },
      {
        slug: 'quantum-simulation',
        number: 9,
        title: 'Quantum Simulation',
        summary: 'Map physical models to qubits, approximate their dynamics, estimate observables, and validate every approximation.',
        accent: 'Physics applications',
        references: [
          source('IBM Quantum Learning — course catalog', 'https://quantum.cloud.ibm.com/learning/en/courses', 'Current simulation, VQE, diagonalization, and utility-scale resources.'),
          source('Nielsen & Chuang — Section 4.7', 'https://www.cambridge.org/highereducation/books/quantum-computation-and-quantum-information/01E10196D0A682A6AEFFEA52D53BE9AE', 'Quantum simulation and product formulas.')
        ],
        articles: [
          article({
            slug: 'hamiltonians-pauli-decomposition',
            title: 'Hamiltonians and Pauli Decomposition',
            minutes: 60,
            summary: 'Translate a physical Hamiltonian into measurable Pauli strings and track encoding choices.',
            prerequisites: ['Hamiltonian evolution', 'Tensor-product Paulis'],
            outcomes: ['Decompose qubit operators in the Pauli basis.', 'Explain locality and term commutation.', 'Identify encoding overhead before simulation.'],
            sections: [
              { title: 'From model to qubits', body: 'A simulation starts by defining degrees of freedom, Hilbert-space truncation, boundary conditions, and an encoding. Spin models map directly to qubits; fermions require transformations that preserve anticommutation and may lengthen Pauli strings.' },
              { title: 'Pauli-string expansion', body: 'Any n-qubit Hermitian operator expands as a real weighted sum of 4^n Pauli strings. Physical locality and symmetry often make the expansion sparse. Commuting groups can share measurement settings, reducing shot cost.' },
              { title: 'Representation cost matters', body: 'The number and weight of Pauli terms affect circuit depth and measurement variance. Before claiming an algorithmic gain, count state preparation, coefficient precision, mapping overhead, and observable extraction.' }
            ],
            equations: [
              { label: 'Pauli expansion', latex: 'H=\\sum_j h_jP_j,\\quad h_j=2^{-n}\\operatorname{Tr}(P_jH)', note: 'Pj ranges over n-fold products of I,X,Y,Z.' }
            ],
            worked: { title: 'Decompose a diagonal matrix', problem: 'Write diag(1,3) as aI+bZ.', steps: ['Solve a+b=1 for |0⟩.', 'Solve a−b=3 for |1⟩.', 'Add and subtract the equations.'], result: 'diag(1,3)=2I−Z.' },
            lab: { title: 'Build a SparsePauliOp', code: "from qiskit.quantum_info import SparsePauliOp\n\nH = SparsePauliOp.from_list([\n    ('ZZ', 0.7), ('XI', -0.3), ('IX', -0.3)\n])\nprint(H.to_matrix())" },
            exercises: [
              { prompt: 'Which two-qubit Pauli strings commute with ZZ?', hint: 'Count positions where nonidentity Paulis anticommute.', answer: 'Strings with an even number of X/Y conflicts, such as XX, YY, XY, YX, ZI, IZ.' },
              { prompt: 'Why may fermion-to-qubit mapping change locality?', hint: 'Fermionic anticommutation must be encoded.', answer: 'Parity strings can turn local fermionic terms into longer qubit Pauli strings.' }
            ],
            connections: ['quantum-simulation/product-formulas-trotter', 'variational-hybrid/vqe']
          }),
          article({
            slug: 'product-formulas-trotter',
            title: 'Product Formulas and Trotter Error',
            minutes: 60,
            level: 'Intermediate',
            summary: 'Approximate noncommuting Hamiltonian evolution and balance algorithmic error against circuit noise.',
            prerequisites: ['Matrix exponentials', 'Commutators', 'Pauli decomposition'],
            outcomes: ['Derive first-order Trotterization.', 'Relate error to commutators and step count.', 'Choose a convergence experiment.'],
            sections: [
              { title: 'Why split the Hamiltonian', body: 'Exponentiating the full H may be hard while each term Hj is easy. Product formulas replace evolution under a sum by a sequence of term evolutions. The approximation becomes exact when all terms commute.' },
              { title: 'Step count trades depth for bias', body: 'Repeating r shorter steps reduces digital simulation error but increases gates and exposure to hardware noise. On noisy devices, the best observed r may be finite and is not the same as asymptotic convergence in an ideal model.' },
              { title: 'Validate convergence', body: 'Compare several step sizes to exact small-system simulation or a higher-order reference. Measure a physically meaningful observable, plot error versus depth, and keep compilation settings fixed enough to isolate the variable.' }
            ],
            equations: [
              { label: 'First-order formula', latex: 'e^{-it(A+B)}=\\left(e^{-itA/r}e^{-itB/r}\\right)^r+O(t^2\\|[A,B]\\|/r)', note: 'The displayed bound hides dimension and norm constants.' }
            ],
            worked: { title: 'Commuting case', problem: 'Approximate evolution for H=aZI+bIZ.', steps: ['ZI and IZ act on different qubits and commute.', 'Exponentials of commuting operators multiply exactly.', 'No Trotter repetition is needed for digital error.'], result: 'e^{-itH}=e^{-itaZI}e^{-itbIZ} exactly.' },
            lab: { title: 'Compare exact and Trotter unitaries', code: "import numpy as np\nfrom scipy.linalg import expm\nX=np.array([[0,1],[1,0]],complex); Z=np.diag([1,-1])\nt=.8; r=8\nexact=expm(-1j*t*(X+Z))\nstep=expm(-1j*t*X/r)@expm(-1j*t*Z/r)\napprox=np.linalg.matrix_power(step,r)\nprint(np.linalg.norm(exact-approx,2))" },
            exercises: [
              { prompt: 'What happens to first-order error when r doubles?', hint: 'Use the leading O(1/r) bound.', answer: 'It is approximately halved in the asymptotic regime.' },
              { prompt: 'Why can deeper Trotterization worsen hardware results?', hint: 'Every extra gate is noisy.', answer: 'Reduced algorithmic bias can be outweighed by accumulated gate, decoherence, and measurement errors.' }
            ],
            connections: ['quantum-simulation/observable-estimation', 'research-practice/reproducible-qiskit-experiments']
          }),
          article({
            slug: 'observable-estimation',
            title: 'Observable Estimation and Measurement Grouping',
            minutes: 60,
            summary: 'Turn a Hamiltonian expectation into executable measurement circuits with controlled statistical error.',
            prerequisites: ['Pauli decomposition', 'Sampling uncertainty', 'Basis change'],
            outcomes: ['Estimate a Pauli-sum expectation.', 'Group compatible measurements.', 'Allocate shots according to variance and coefficient size.'],
            sections: [
              { title: 'Break the objective into terms', body: 'For H=Σj hjPj, estimate each Pauli expectation and combine them linearly. Each Pj has ±1 outcomes, so its sample variance is bounded. Coefficients amplify both contributions and uncertainty.' },
              { title: 'Compatible terms share circuits', body: 'Qubit-wise commuting Paulis can be measured with the same local basis rotations. More general commuting groups may need entangling measurement circuits. Grouping reduces circuit count but can complicate covariance and compilation.' },
              { title: 'Shots are a resource', body: 'Uniform shot allocation is simple but often wasteful. Adaptive strategies spend more samples on high-weight or high-variance terms. Report the estimator, grouping rule, total shots, error bars, and whether mitigation altered variance.' }
            ],
            equations: [
              { label: 'Energy estimator', latex: '\\widehat E=\\sum_jh_j\\widehat{\\langle P_j\\rangle}', note: 'If estimates are independent, variances add with weights hj².' },
              { label: 'Pauli standard error', latex: '\\operatorname{SE}(\\hat\\mu_j)=\\sqrt{(1-\\mu_j^2)/N_j}', note: 'Use an empirical or conservative variance when μj is unknown.' }
            ],
            worked: { title: 'Estimate a two-term energy', problem: 'H=0.7Z+0.2X with measured means 0.8 and −0.3.', steps: ['Multiply 0.7×0.8=0.56.', 'Multiply 0.2×(−0.3)=−0.06.', 'Add the contributions.'], result: 'Estimated energy is 0.50.' },
            lab: { title: 'Use the local V2 Estimator', code: "from qiskit import QuantumCircuit\nfrom qiskit.quantum_info import SparsePauliOp\nfrom qiskit.primitives import StatevectorEstimator\n\nqc = QuantumCircuit(1); qc.ry(.4, 0)\nH = SparsePauliOp.from_list([('Z', .7), ('X', .2)])\nresult = StatevectorEstimator().run([(qc, H)]).result()\nprint(result[0].data.evs)" },
            exercises: [
              { prompt: 'Can X and Z on one qubit share a local-basis measurement setting?', hint: 'Their eigenbases differ.', answer: 'No; separate settings are required.' },
              { prompt: 'Why might covariance matter when terms share shots?', hint: 'Estimates derived from the same bit strings are correlated.', answer: 'The variance of their weighted sum includes covariance terms.' }
            ],
            connections: ['variational-hybrid/expectations-gradients', 'quantum-simulation/verification-scaling-baselines']
          }),
          article({
            slug: 'verification-scaling-baselines',
            title: 'Verification, Scaling, and Classical Baselines',
            minutes: 55,
            summary: 'Design simulation evidence that survives beyond a visually appealing circuit or one favorable instance.',
            prerequisites: ['Distance and fidelity', 'Observable estimation'],
            outcomes: ['Choose verifiable quantities.', 'Build a scaling study.', 'Select fair classical baselines.'],
            sections: [
              { title: 'Verify where exact answers exist', body: 'Small instances allow exact diagonalization or statevector comparison. Use them to test mapping, sign conventions, Trotter order, observables, and code. Then move to larger cases with conserved quantities, symmetry checks, bounds, or cross-method agreement.' },
              { title: 'Scale the bottleneck', body: 'Vary the dimension or evolution time that drives difficulty, not only shots. Plot accuracy and runtime against qubits, Pauli terms, depth, and samples. A fixed tiny demonstration cannot support an asymptotic claim.' },
              { title: 'Baselines must solve the same task', body: 'Compare against competent classical methods with matched accuracy, hardware scope, and data-access assumptions. Report preprocessing and output costs. A weak baseline exaggerates advantage and obscures where the quantum method actually helps.' }
            ],
            equations: [
              { label: 'Total error budget', latex: '\\epsilon_{tot}\\lesssim\\epsilon_{model}+\\epsilon_{algorithm}+\\epsilon_{compile}+\\epsilon_{noise}+\\epsilon_{sample}', note: 'The decomposition guides ablations; the inequality is a budgeting heuristic.' }
            ],
            worked: { title: 'Design a Trotter study', problem: 'Choose the minimum evidence for a two-spin dynamics experiment.', steps: ['Compare exact and noiseless Trotter results at r=1,2,4,8.', 'Compile each circuit and record two-qubit depth.', 'Add noise, shot intervals, and at least one conserved quantity check.'], result: 'The study separates discretization, compilation, noise, and sampling effects.' },
            exercises: [
              { prompt: 'Why is fidelity to an exact state not scalable verification?', hint: 'Obtaining the exact state is exponentially costly.', answer: 'It is excellent for small systems but unavailable in the regime where classical simulation fails.' },
              { prompt: 'What is an unfair runtime comparison?', hint: 'Consider excluding data preparation on one side only.', answer: 'Counting quantum kernel execution while omitting its input/loading cost but including all classical preprocessing.' }
            ],
            connections: ['research-practice/theorem-claim-audits', 'variational-hybrid/qaoa-optimization']
          })
        ]
      },
      {
        slug: 'variational-hybrid',
        number: 10,
        title: 'Variational and Hybrid Algorithms',
        summary: 'Parameterized circuits, objectives, gradients, VQE, QAOA, and rigorous experimental methodology for NISQ-era research.',
        accent: 'NISQ methods',
        references: [
          source('IBM Quantum — Variational algorithm design', 'https://quantum.cloud.ibm.com/learning/en/courses/variational-algorithm-design', 'Current learning material for hybrid workflows.'),
          source('IBM Quantum — Primitives', 'https://quantum.cloud.ibm.com/docs/guides/primitives-examples', 'Current Estimator and Sampler interfaces.')
        ],
        articles: [
          article({
            slug: 'parameterized-circuits',
            title: 'Parameterized Circuits and Ansatz Design',
            minutes: 55,
            summary: 'Choose a trainable state family based on structure, hardware, symmetries, and measurement cost.',
            prerequisites: ['Single-qubit rotations', 'Entangling gates', 'Optimization basics'],
            outcomes: ['Distinguish problem-inspired and hardware-efficient ansätze.', 'Audit expressibility versus trainability.', 'Preserve relevant symmetries.'],
            sections: [
              { title: 'An ansatz is a hypothesis class', body: 'A parameterized circuit U(θ) defines the states the optimizer can reach. If the target lies outside the family, optimization cannot fix the representation error. If the family is unnecessarily broad, gradients and sampling may become difficult.' },
              { title: 'Structure versus hardware', body: 'Problem-inspired ansätze encode conservation laws or known excitation structure but may compile deeply. Hardware-efficient layers use native rotations and entanglers but can violate symmetries and develop barren plateaus. The right design balances both.' },
              { title: 'Count effective resources', body: 'Report parameters, two-qubit depth after transpilation, connectivity, state-preparation overhead, and evaluation shots. Layer count before compilation is an incomplete complexity measure.' }
            ],
            equations: [
              { label: 'Parameterized state', latex: '|\\psi(\\theta)\\rangle=U_L(\\theta_L)\\cdots U_1(\\theta_1)|0^n\\rangle', note: 'Parameter order and gate generators determine gradient rules.' }
            ],
            worked: { title: 'Symmetry-preserving choice', problem: 'A target Hamiltonian conserves particle number. Compare arbitrary Ry layers with excitation-preserving gates.', steps: ['Ry layers mix |0⟩ and |1⟩ and change Hamming weight.', 'Excitation-preserving two-qubit rotations remain in a fixed-weight sector.', 'The restricted search space matches the symmetry.'], result: 'A symmetry-preserving ansatz can reduce invalid states and effective dimension.' },
            lab: { title: 'Create a parameterized circuit', code: "from qiskit import QuantumCircuit\nfrom qiskit.circuit import ParameterVector\n\ntheta = ParameterVector('θ', 4)\nqc = QuantumCircuit(2)\nqc.ry(theta[0],0); qc.ry(theta[1],1); qc.cx(0,1)\nqc.rz(theta[2],0); qc.ry(theta[3],1)\nprint(qc.draw())" },
            exercises: [
              { prompt: 'Why can greater expressibility hurt training?', hint: 'Think concentration of measure.', answer: 'Very expressive random circuits can make gradients exponentially small and objectives locally flat.' },
              { prompt: 'What should an ansatz ablation vary?', hint: 'Change one structural factor at a time.', answer: 'Depth, entangler pattern, initialization, symmetry constraint, or parameter sharing while holding evaluation budget fixed.' }
            ],
            connections: ['variational-hybrid/expectations-gradients', 'quantum-ml-data-encoding/variational-classifiers']
          }),
          article({
            slug: 'expectations-gradients',
            title: 'Expectation Objectives and Quantum Gradients',
            minutes: 60,
            summary: 'Estimate noisy objectives, differentiate parameterized gates, and budget optimizer evaluations.',
            prerequisites: ['Observable estimation', 'Parameterized circuits', 'Calculus'],
            outcomes: ['Write a variational cost as an expectation.', 'Apply the parameter-shift rule.', 'Explain optimizer behavior under shot noise.'],
            sections: [
              { title: 'The objective is statistical', body: 'A typical cost C(θ)=⟨ψ(θ)|H|ψ(θ)⟩ is assembled from sampled Pauli expectations. Objective noise depends on shot allocation, device noise, mitigation, and covariance. Optimizers see estimates, not an exact smooth function.' },
              { title: 'Parameter-shift gradients', body: 'For gates generated by operators with two suitable eigenvalues, an exact derivative can be expressed as a difference of two shifted expectation values. This avoids finite-difference step-size bias but doubles circuit evaluations per parameter and term grouping.' },
              { title: 'Optimization is an experimental design', body: 'Compare optimizers at matched total circuit or shot budgets. Use multiple seeds, initialization policies, convergence diagnostics, and held-out final evaluations. Selecting the best noisy run without correction creates winner’s curse.' }
            ],
            equations: [
              { label: 'Parameter shift', latex: '\\frac{\\partial C}{\\partial\\theta}=\\frac12\\left[C(\\theta+\\frac\\pi2)-C(\\theta-\\frac\\pi2)\\right]', note: 'This common form applies to Pauli-generated rotations with the standard angle convention.' }
            ],
            worked: { title: 'Differentiate ⟨Z⟩ after Ry', problem: 'For |ψ(θ)⟩=Ry(θ)|0⟩, find d⟨Z⟩/dθ.', steps: ['The expectation is cosθ.', 'Shifted values are cos(θ+π/2)=−sinθ and cos(θ−π/2)=sinθ.', 'Take half their difference.'], result: 'The gradient is −sinθ.' },
            lab: { title: 'Parameter-shift check', code: "import numpy as np\nfrom qiskit import QuantumCircuit\nfrom qiskit.quantum_info import Statevector, Pauli\n\ndef cost(t):\n    q=QuantumCircuit(1); q.ry(t,0)\n    return Statevector.from_instruction(q).expectation_value(Pauli('Z')).real\nt=.4\nprint((cost(t+np.pi/2)-cost(t-np.pi/2))/2, -np.sin(t))" },
            exercises: [
              { prompt: 'How many shifted objective evaluations does a full gradient with p parameters require in the simple rule?', hint: 'Two per parameter.', answer: '2p, before counting Pauli groups and shots.' },
              { prompt: 'Why re-evaluate the final parameters with more shots?', hint: 'Training estimates may be noisy and adaptively selected.', answer: 'A fresh high-precision estimate reduces selection bias and gives a reliable final interval.' }
            ],
            connections: ['variational-hybrid/vqe', 'variational-hybrid/qaoa-optimization']
          }),
          article({
            slug: 'vqe',
            title: 'Variational Quantum Eigensolver',
            minutes: 65,
            level: 'Intermediate',
            summary: 'Use the variational principle to estimate ground-state energies while exposing every approximation and baseline.',
            prerequisites: ['Parameterized circuits', 'Expectation estimation', 'Eigenvalues'],
            outcomes: ['Derive the VQE upper-bound property.', 'Assemble the hybrid loop.', 'Diagnose ansatz, optimizer, sampling, and hardware errors.'],
            sections: [
              { title: 'Variational principle', body: 'For Hermitian H with ground energy E0, every normalized trial state has expectation at least E0. Minimizing over an ansatz gives an upper bound in exact arithmetic. Noise and mitigation can break a naive observed upper-bound interpretation.' },
              { title: 'Hybrid loop', body: 'The quantum device prepares |ψ(θ)⟩ and estimates Pauli terms; a classical optimizer proposes new θ. Preprocessing maps the physical problem to qubits, and post-processing converts energies or reduced observables back to domain quantities.' },
              { title: 'Ablate the error sources', body: 'Compare exact ground energy, best ansatz energy under noiseless statevector optimization, shot-based simulation, noisy simulation, and hardware. This ladder separates representation, optimization, sampling, and device error.' }
            ],
            equations: [
              { label: 'Variational bound', latex: 'E(\\theta)=\\frac{\\langle\\psi(\\theta)|H|\\psi(\\theta)\\rangle}{\\langle\\psi(\\theta)|\\psi(\\theta)\\rangle}\\ge E_0', note: 'Normalized circuits make the denominator one.' }
            ],
            worked: { title: 'One-qubit VQE', problem: 'Minimize H=Z with ansatz Ry(θ)|0⟩.', steps: ['Energy is cosθ.', 'Minimum occurs at θ=π mod 2π.', 'The prepared state is |1⟩.'], result: 'Estimated ground energy −1, matching the exact eigenvalue.' },
            lab: { title: 'Minimal VQE objective', code: "import numpy as np\nfrom scipy.optimize import minimize\nfrom qiskit import QuantumCircuit\nfrom qiskit.quantum_info import Statevector, Pauli\n\ndef energy(x):\n    qc=QuantumCircuit(1); qc.ry(float(x[0]),0)\n    return Statevector.from_instruction(qc).expectation_value(Pauli('Z')).real\nresult=minimize(energy,[.2],method='COBYLA')\nprint(result.fun, result.x)" },
            exercises: [
              { prompt: 'Why can a shallow ansatz converge but still give a poor energy?', hint: 'Optimization only finds the best reachable state.', answer: 'The ansatz may have representation bias and exclude the true ground state.' },
              { prompt: 'What classical baseline should accompany a tiny VQE instance?', hint: 'The matrix is small enough to diagonalize.', answer: 'Exact diagonalization plus a noiseless ansatz optimum.' }
            ],
            connections: ['variational-hybrid/qaoa-optimization', 'quantum-simulation/observable-estimation']
          }),
          article({
            slug: 'qaoa-optimization',
            title: 'QAOA and Reliable Variational Experiments',
            minutes: 70,
            level: 'Intermediate',
            summary: 'Map a discrete objective to a cost Hamiltonian, alternate structured evolutions, and evaluate approximation quality honestly.',
            prerequisites: ['Variational objectives', 'Ising Hamiltonians', 'Classical optimization'],
            outcomes: ['Construct a simple cost Hamiltonian.', 'Explain QAOA layers and mixers.', 'Design a baseline- and seed-aware experiment.'],
            sections: [
              { title: 'Encode objective values in phases', body: 'A diagonal cost Hamiltonian HC assigns each bit string its classical objective value. The phase separator e^{-iγHC} changes phases according to cost, while a mixer e^{-iβHB} redistributes amplitude among feasible strings.' },
              { title: 'Depth p controls the family', body: 'Alternating p cost and mixer layers creates a structured ansatz. Larger p can improve the ideal optimum but raises parameter count and circuit depth. Constraint-preserving mixers may outperform the standard X mixer on restricted feasible sets.' },
              { title: 'Measure task performance', body: 'Report approximation ratio, success probability, best sample, distribution quality, and total evaluation budget. Compare random sampling, classical heuristics, and exact optima for small instances across multiple graph families and seeds.' }
            ],
            equations: [
              { label: 'QAOA state', latex: '|\\gamma,\\beta\\rangle=\\prod_{k=1}^{p}e^{-i\\beta_kH_B}e^{-i\\gamma_kH_C}|+\\rangle^{\\otimes n}', note: 'Product ordering follows the stated circuit convention.' }
            ],
            worked: { title: 'One-edge MaxCut', problem: 'Encode whether two bits differ.', steps: ['For ZiZj, equal bits have eigenvalue +1 and different bits −1.', 'Use C=(I−ZiZj)/2.', 'Its eigenvalue is 1 exactly for a cut edge.'], result: 'HC=(I−Z1Z2)/2 represents the one-edge MaxCut objective.' },
            lab: { title: 'One-layer QAOA skeleton', code: "from qiskit import QuantumCircuit\nfrom qiskit.circuit import Parameter\n\ngamma, beta = Parameter('γ'), Parameter('β')\nqc=QuantumCircuit(2)\nqc.h(range(2)); qc.cx(0,1); qc.rz(gamma,1); qc.cx(0,1)\nqc.rx(2*beta,0); qc.rx(2*beta,1)\nprint(qc.draw())" },
            exercises: [
              { prompt: 'Why may the standard X mixer generate invalid solutions?', hint: 'It flips individual bits without respecting constraints.', answer: 'It explores the full hypercube rather than staying inside the feasible subspace.' },
              { prompt: 'Why report more than the best sampled bit string?', hint: 'A lucky extreme can appear with many shots.', answer: 'Distributional metrics and repeated seeds reveal typical performance and sampling cost.' }
            ],
            connections: ['research-practice/reproducible-qiskit-experiments', 'quantum-ml-data-encoding/evidence-classical-baselines']
          })
        ]
      },
      {
        slug: 'quantum-ml-data-encoding',
        number: 11,
        title: 'Quantum Machine Learning and Data Encoding',
        summary: 'Treat encoding, kernel evaluation, training, generalization, and classical comparison as one end-to-end scientific problem.',
        accent: 'Research direction',
        references: [
          source('IBM Quantum — Quantum machine learning', 'https://quantum.cloud.ibm.com/learning/en/courses/quantum-machine-learning', 'Current QML learning course.'),
          source('Schuld & Killoran — Feature Hilbert spaces', 'https://arxiv.org/abs/1803.07128', 'Primary paper on quantum feature maps and kernels.')
        ],
        articles: [
          article({
            slug: 'encoding-resource-tradeoffs',
            title: 'Quantum Data Encoding and Resource Trade-offs',
            minutes: 65,
            summary: 'Compare basis, angle, amplitude, and feature-map encodings without hiding preparation cost.',
            prerequisites: ['Qubit circuits', 'Classical vectors', 'Complexity notation'],
            outcomes: ['Choose an encoding for a data model.', 'Count qubits, depth, repetitions, and loading assumptions.', 'Explain when amplitude encoding is not free.'],
            sections: [
              { title: 'Encoding defines the hypothesis space', body: 'A feature map x↦|φ(x)⟩ determines which data similarities and decision boundaries a quantum model can represent. Scaling features, periodicity, normalization, and duplicated features all change the induced geometry.' },
              { title: 'Four common families', body: 'Basis encoding uses computational strings; angle encoding maps features to rotations; amplitude encoding places a normalized vector in 2^n amplitudes; repeated feature maps interleave data-dependent and trainable gates. Each trades qubits against preparation depth and accessibility.' },
              { title: 'Loading belongs in complexity', body: 'Amplitude encoding compresses N numbers into logN qubits, but arbitrary state preparation can cost O(N) gates without a suitable data-access model. Also, measurement cannot return all N amplitudes efficiently. State assumptions explicitly.' }
            ],
            equations: [
              { label: 'Angle encoding', latex: '|\\phi(x)\\rangle=\\bigotimes_{j=1}^{d}R_y(x_j)|0\\rangle', note: 'Feature scaling determines the useful nonlinearity and periodic aliasing.' },
              { label: 'Amplitude encoding', latex: '|x\\rangle=\\frac1{\\|x\\|}\\sum_{j=0}^{N-1}x_j|j\\rangle', note: 'Preparation and readout costs must be counted.' }
            ],
            worked: { title: 'Encode a four-vector', problem: 'Amplitude-encode x=(1,1,0,0).', steps: ['Norm is √2.', 'Two qubits provide four basis amplitudes.', 'Set amplitudes of |00⟩ and |01⟩ to 1/√2.'], result: '|x⟩=(|00⟩+|01⟩)/√2 under the stated ordering.' },
            lab: { title: 'Prepare normalized amplitudes', code: "import numpy as np\nfrom qiskit import QuantumCircuit\n\nx=np.array([1,1,0,0],dtype=float); x=x/np.linalg.norm(x)\nqc=QuantumCircuit(2); qc.initialize(x, range(2))\nprint(qc.decompose().draw())" },
            exercises: [
              { prompt: 'Why can angle encoding of unscaled features be ambiguous?', hint: 'Rotations are periodic.', answer: 'Values differing by a rotation period can map to the same state.' },
              { prompt: 'What must a paper specify for amplitude-loading speedups?', hint: 'Ask how data become amplitudes.', answer: 'The state-preparation algorithm or oracle/QRAM access model and its cost.' }
            ],
            connections: ['quantum-ml-data-encoding/quantum-feature-kernels', 'research-practice/quantum-linear-solvers']
          }),
          article({
            slug: 'quantum-feature-kernels',
            title: 'Quantum Feature Maps and Kernels',
            minutes: 65,
            level: 'Intermediate',
            summary: 'Interpret a quantum circuit as an implicit feature map and evaluate whether its kernel is useful, trainable, and classically hard.',
            prerequisites: ['Data encoding', 'Inner products', 'Kernel methods'],
            outcomes: ['Construct a fidelity kernel.', 'Separate estimation cost from model training.', 'Design kernel diagnostics and baselines.'],
            sections: [
              { title: 'States induce similarities', body: 'A quantum feature map sends x to |φ(x)⟩. The fidelity kernel |⟨φ(x)|φ(x′)⟩|² is positive semidefinite and can feed a classical SVM or kernel ridge regressor. The quantum device estimates matrix entries; training may remain classical.' },
              { title: 'Hard is not automatically useful', body: 'A circuit that is difficult to simulate may produce a kernel close to identity or nearly constant, both poor for generalization. Alignment, spectrum, effective dimension, and class separation matter alongside classical hardness.' },
              { title: 'Kernel cost scales quadratically in samples', body: 'A dense training Gram matrix needs O(m²) pair evaluations for m examples, each with shots and state preparation. Approximation, caching, low-rank structure, or task-specific sampling may be needed before quantum execution is plausible.' }
            ],
            equations: [
              { label: 'Fidelity kernel', latex: 'k(x,x\\prime)=|\\langle\\phi(x)|\\phi(x\\prime)\\rangle|^2', note: 'Other kernels use projected observables or trainable embeddings.' }
            ],
            worked: { title: 'One-qubit angle kernel', problem: 'For |φ(x)⟩=Ry(x)|0⟩, compute k(x,x′).', steps: ['The relative circuit is Ry(x′−x).', 'Overlap with |0⟩ is cos((x−x′)/2).', 'Square the magnitude.'], result: 'k(x,x′)=cos²((x−x′)/2).' },
            lab: { title: 'Compute a small kernel matrix', code: "import numpy as np\nX=np.array([0.0,.4,1.2])\nK=np.cos((X[:,None]-X[None,:])/2)**2\nprint(K)\nprint(np.linalg.eigvalsh(K))" },
            exercises: [
              { prompt: 'What does a nearly identity training kernel suggest?', hint: 'Each point is similar only to itself.', answer: 'Potential overfitting and poor generalization unless test points align meaningfully.' },
              { prompt: 'Why report kernel-estimation uncertainty?', hint: 'Each entry is sampled.', answer: 'Noise perturbs eigenvalues, alignment, and downstream model predictions.' }
            ],
            connections: ['quantum-ml-data-encoding/variational-classifiers', 'quantum-ml-data-encoding/evidence-classical-baselines']
          }),
          article({
            slug: 'variational-classifiers',
            title: 'Variational Classifiers and Data Re-uploading',
            minutes: 65,
            summary: 'Build trainable quantum models while distinguishing representation, optimization, and generalization.',
            prerequisites: ['Parameterized circuits', 'Data encoding', 'Supervised learning'],
            outcomes: ['Define a quantum prediction function.', 'Use data re-uploading to enrich Fourier content.', 'Prevent common train/test and hyperparameter leaks.'],
            sections: [
              { title: 'From circuit to prediction', body: 'A classifier encodes x, applies trainable operations, and measures one or more observables. The expectation may be treated as a logit, score, or probability after calibration. The measurement rule and loss function should be stated explicitly.' },
              { title: 'Re-uploading adds nonlinear structure', body: 'Interleaving data-dependent rotations with trainable gates creates richer trigonometric functions of the input without adding one qubit per feature. Repeated encodings raise frequency content but also depth and sensitivity to feature scaling.' },
              { title: 'Generalization needs clean evaluation', body: 'Fit scalers and feature selection only on training data, tune on validation data, and report the untouched test set once. Compare multiple random seeds and matched classical models with similar capacity and optimization budget.' }
            ],
            equations: [
              { label: 'Prediction score', latex: 'f_\\theta(x)=\\langle0|U_\\phi^\\dagger(x)U_\\theta^\\dagger M U_\\theta U_\\phi(x)|0\\rangle', note: 'Repeated feature maps can be interleaved inside Uθ.' }
            ],
            worked: { title: 'Turn an expectation into a probability', problem: 'A Z measurement returns fθ(x)=−0.6. Map it to p(y=1).', steps: ['Z expectation equals p0−p1.', 'Probabilities sum to one.', 'Solve p1=(1−f)/2.'], result: 'p(y=1)=0.8 under the chosen label convention.' },
            lab: { title: 'Small re-uploading model', code: "from qiskit import QuantumCircuit\nfrom qiskit.circuit import Parameter\n\nx,t0,t1=Parameter('x'),Parameter('θ0'),Parameter('θ1')\nqc=QuantumCircuit(1)\nqc.ry(x,0); qc.rz(t0,0); qc.ry(x,0); qc.rx(t1,0)\nprint(qc.draw())" },
            exercises: [
              { prompt: 'Why must feature scaling be included inside cross-validation?', hint: 'Its fitted statistics use data.', answer: 'Fitting it on the full dataset leaks test information into training.' },
              { prompt: 'What does matched model capacity mean in a baseline?', hint: 'Compare more than parameter count alone.', answer: 'Control trainable parameters, regularization, input features, tuning budget, and evaluation protocol as fairly as possible.' }
            ],
            connections: ['quantum-ml-data-encoding/evidence-classical-baselines', 'research-practice/reproducible-qiskit-experiments']
          }),
          article({
            slug: 'evidence-classical-baselines',
            title: 'Evidence Standards and Classical Baselines for QML',
            minutes: 60,
            summary: 'Turn a QML demonstration into a falsifiable, reproducible comparison rather than an architecture showcase.',
            prerequisites: ['Basic machine learning evaluation', 'Quantum kernels or classifiers'],
            outcomes: ['Choose meaningful datasets and splits.', 'Match baselines and compute budgets.', 'Separate empirical improvement from quantum advantage.'],
            sections: [
              { title: 'Define the claim first', body: 'A paper may claim higher accuracy, lower sample complexity, faster training, robustness, or asymptotic advantage. These are different hypotheses and require different experiments. “Quantum-inspired improvement” is not the same as demonstrated quantum advantage.' },
              { title: 'Use serious baselines', body: 'Include linear and nonlinear classical models, strong kernels, parameter-matched neural networks where appropriate, and simple heuristics. Tune all methods with comparable validation budgets and report wall time, preprocessing, and hardware scope.' },
              { title: 'Report distributions, not one score', body: 'Use repeated splits or seeds, confidence intervals, learning curves, ablations, and failure cases. Small datasets have high variance. If hyperparameters were chosen after seeing test results, the reported test score is optimistic.' }
            ],
            equations: [
              { label: 'Generalization gap', latex: '\\Delta_{gen}=R_{test}(\\hat\\theta)-R_{train}(\\hat\\theta)', note: 'Interpret with uncertainty and model-selection protocol, not in isolation.' }
            ],
            worked: { title: 'Design a fair benchmark', problem: 'Compare a quantum kernel SVM with a classical RBF SVM.', steps: ['Use identical train/validation/test splits and preprocessing.', 'Tune both kernels on validation data with matched search budgets.', 'Report test distributions, kernel computation time, shots, and simulator/hardware details.'], result: 'The comparison isolates the representation more credibly and exposes total cost.' },
            exercises: [
              { prompt: 'Does better accuracy on one 40-point split establish quantum advantage?', hint: 'Consider variance, baselines, and resource scaling.', answer: 'No; it is preliminary empirical evidence at best.' },
              { prompt: 'Why include a data-permutation control?', hint: 'A model should not learn randomized labels beyond chance.', answer: 'It detects leakage, pipeline bugs, and excessive adaptive tuning.' }
            ],
            connections: ['research-practice/theorem-claim-audits', 'research-practice/research-notebooks-open-questions']
          })
        ]
      },
      {
        slug: 'quantum-information-theory',
        number: 12,
        title: 'Information, Entropy, and Communication',
        summary: 'Quantify uncertainty and correlation, then connect the formalism to channels, communication limits, and cryptography.',
        accent: 'Information viewpoint',
        references: [
          source('Nielsen & Chuang — Chapters 11 and 12', 'https://www.cambridge.org/highereducation/books/quantum-computation-and-quantum-information/01E10196D0A682A6AEFFEA52D53BE9AE', 'Entropy and quantum information theory.'),
          source('IBM Quantum — Quantum-safe cryptography', 'https://quantum.cloud.ibm.com/learning/en/courses/quantum-safe-cryptography', 'Current cryptography context and learning material.')
        ],
        articles: [
          article({
            slug: 'entropy-mutual-information',
            title: 'Entropy and Mutual Information',
            minutes: 65,
            level: 'Intermediate',
            summary: 'Measure uncertainty, mixedness, and total correlation using quantities with operational meaning.',
            prerequisites: ['Density matrices', 'Eigenvalues', 'Classical probability'],
            outcomes: ['Compute Shannon and von Neumann entropy.', 'Interpret quantum mutual information.', 'Use subadditivity to check calculations.'],
            sections: [
              { title: 'Classical uncertainty', body: 'Shannon entropy depends only on a probability distribution and measures optimal compression rate for long independent sequences. It is zero for a deterministic variable and log₂d for a uniform d-outcome variable.' },
              { title: 'Quantum entropy', body: 'Von Neumann entropy applies Shannon entropy to the eigenvalues of ρ. A pure state has zero entropy; the maximally mixed state on dimension d has log₂d. Entropy is basis independent and unchanged by unitary evolution.' },
              { title: 'Correlation as shared information', body: 'Quantum mutual information I(A:B)=S(A)+S(B)−S(AB) measures total correlations and is non-negative. For a bipartite pure state it equals twice the entanglement entropy, reflecting both classical and quantum correlation contributions.' }
            ],
            equations: [
              { label: 'Von Neumann entropy', latex: 'S(\\rho)=-\\operatorname{Tr}(\\rho\\log_2\\rho)=-\\sum_i\\lambda_i\\log_2\\lambda_i', note: 'Define 0 log 0 by continuity as zero.' },
              { label: 'Mutual information', latex: 'I(A:B)=S(\\rho_A)+S(\\rho_B)-S(\\rho_{AB})', note: 'It equals a relative entropy and cannot increase under local channels.' }
            ],
            worked: { title: 'Entropy of a Bell pair', problem: 'Compute S(A), S(B), S(AB), and I(A:B).', steps: ['The joint Bell state is pure, so S(AB)=0.', 'Each reduced state is I/2, so S(A)=S(B)=1.', 'Substitute into mutual information.'], result: 'I(A:B)=2 bits.' },
            exercises: [
              { prompt: 'What is S(diag(3/4,1/4))?', hint: 'Use the binary entropy function.', answer: '−(3/4)log₂(3/4)−(1/4)log₂(1/4)≈0.811 bits.' },
              { prompt: 'Why does a unitary preserve von Neumann entropy?', hint: 'Unitary conjugation preserves eigenvalues.', answer: 'S depends only on the eigenvalue spectrum of ρ.' }
            ],
            connections: ['multi-qubit-entanglement/schmidt-decomposition', 'quantum-information-theory/channel-capacity']
          }),
          article({
            slug: 'channel-capacity',
            title: 'Channels, Coding, and Capacity',
            minutes: 65,
            level: 'Advanced',
            summary: 'Separate one-shot performance from asymptotic communication rates and distinguish classical, private, and quantum capacities.',
            prerequisites: ['Quantum channels', 'Entropy', 'Typical sequences'],
            outcomes: ['Interpret a channel capacity operationally.', 'Explain why regularization can appear.', 'Distinguish classical and quantum communication tasks.'],
            sections: [
              { title: 'Capacity is an asymptotic rate', body: 'A capacity describes how many reliable bits or qubits per channel use can be transmitted in the limit of long block codes and vanishing error. It is not simply the mutual information of one arbitrary input.' },
              { title: 'Different tasks, different capacities', body: 'Classical capacity concerns classical messages; quantum capacity preserves unknown quantum states or entanglement; private capacity protects classical messages from an environment. Entanglement assistance changes the resource model and achievable rate.' },
              { title: 'Optimization and regularization', body: 'Quantum capacities often optimize an information quantity over input ensembles or states. Some expressions require many channel uses because entangled encodings can create superadditive effects. Always state whether a formula is single-letter or regularized.' }
            ],
            equations: [
              { label: 'Holevo information', latex: '\\chi(\\{p_x,\\rho_x\\})=S(\\sum_xp_x\\rho_x)-\\sum_xp_xS(\\rho_x)', note: 'It bounds accessible classical information from a quantum ensemble.' }
            ],
            worked: { title: 'Orthogonal noiseless alphabet', problem: 'Alice sends |0⟩ or |1⟩ equiprobably through an ideal qubit channel.', steps: ['Average state is I/2 with entropy 1.', 'Each signal state is pure with entropy 0.', 'Compute χ.'], result: 'χ=1 bit, achieved by a Z-basis measurement.' },
            exercises: [
              { prompt: 'Why can nonorthogonal signal states carry less accessible information than their label entropy?', hint: 'They cannot be perfectly distinguished.', answer: 'Measurement limits prevent recovering all preparation labels in one shot.' },
              { prompt: 'What resource must be counted in entanglement-assisted capacity?', hint: 'It is in the name.', answer: 'Pre-shared entanglement between sender and receiver.' }
            ],
            connections: ['quantum-information-theory/qkd-information', 'general-measurement-and-noise/povms-state-discrimination']
          }),
          article({
            slug: 'qkd-information',
            title: 'Quantum Key Distribution and Information–Disturbance',
            minutes: 65,
            summary: 'Understand BB84 as a protocol with sifting, parameter estimation, error correction, and privacy amplification—not just four states.',
            prerequisites: ['Measurement bases', 'State discrimination', 'Classical probability'],
            outcomes: ['Trace the BB84 workflow.', 'Explain how disturbance reveals eavesdropping.', 'Separate QKD from post-quantum cryptography.'],
            sections: [
              { title: 'Prepare and measure in incompatible bases', body: 'Alice randomly prepares Z- or X-basis states; Bob randomly measures in Z or X. After authenticated public discussion they keep matched-basis outcomes. An interceptor cannot perfectly learn unknown nonorthogonal states without introducing detectable disturbance.' },
              { title: 'A raw key is not a secret key', body: 'The parties sacrifice samples to estimate error and bound an adversary’s information. They then reconcile mismatches with classical error correction and compress the corrected key through privacy amplification. Authentication of the classical channel is essential.' },
              { title: 'Security lives in assumptions', body: 'Proofs specify source and detector models, finite-key effects, losses, side channels, and adversary power. Device-independent and measurement-device-independent variants alter assumptions. QKD distributes keys using quantum communication; post-quantum cryptography uses classical algorithms.' }
            ],
            equations: [
              { label: 'Asymptotic BB84 heuristic', latex: 'r\\gtrsim1-2h_2(Q)', note: 'This idealized one-way key-rate expression hides protocol and security assumptions.' }
            ],
            worked: { title: 'Intercept–resend disturbance', problem: 'Eve and Bob choose random BB84 bases. What sifted-key error does simple intercept–resend introduce?', steps: ['Eve chooses the wrong basis half the time.', 'Given a wrong basis, her resent state disagrees with Alice in Bob’s correct basis half the time.', 'Multiply the probabilities.'], result: 'A 25% quantum bit error rate in the idealized sifted key.' },
            exercises: [
              { prompt: 'Why announce bases but not bit values during sifting?', hint: 'The basis is needed to identify compatible rounds.', answer: 'Revealing bits would disclose the raw key; bases alone do not determine outcomes.' },
              { prompt: 'Why does QKD still need classical authentication?', hint: 'Consider a man-in-the-middle impersonating both endpoints.', answer: 'Without authentication, Eve can run separate QKD sessions with Alice and Bob.' }
            ],
            connections: ['quantum-information-theory/channel-capacity', 'research-practice/theorem-claim-audits']
          }),
          article({
            slug: 'no-cloning-monogamy',
            title: 'No-Cloning, Monogamy, and Information Limits',
            minutes: 55,
            summary: 'Derive structural limits on copying, broadcasting, and sharing quantum correlations.',
            prerequisites: ['Unitary evolution', 'Inner products', 'Entanglement'],
            outcomes: ['Prove the no-cloning theorem.', 'Explain no-broadcasting for mixed states.', 'Connect monogamy to cryptographic intuition.'],
            sections: [
              { title: 'Linearity forbids universal cloning', body: 'A device that copies |0⟩ and |1⟩ would, by linearity, map a superposition to an entangled sum rather than two copies of the superposition. More generally, inner-product preservation shows only mutually orthogonal candidate states can be cloned perfectly.' },
              { title: 'Broadcasting is the mixed-state version', body: 'Broadcasting asks for a joint output whose two marginals both equal the input. A set of mixed states can be broadcast exactly only when they commute. Classical probability distributions commute; genuinely quantum families generally do not.' },
              { title: 'Entanglement is monogamous', body: 'If A is maximally entangled with B, its joint state with B is pure and A cannot also be entangled with an independent C. Quantitative monogamy relations depend on the entanglement measure, but the qualitative limit supports security and network constraints.' }
            ],
            equations: [
              { label: 'No-cloning overlap test', latex: '\\langle\\psi|\\phi\\rangle=\\langle\\psi|\\phi\\rangle^2', note: 'Perfect cloning plus unitarity forces the overlap to be 0 or 1.' }
            ],
            worked: { title: 'Linear contradiction', problem: 'Assume a cloner copies |0⟩ and |1⟩. Apply it to |+⟩.', steps: ['Linearity gives (|00⟩+|11⟩)/√2.', 'Two perfect copies would be |+⟩|+⟩.', 'The latter also contains |01⟩ and |10⟩ terms.'], result: 'The outputs differ, so the device cannot clone every state.' },
            exercises: [
              { prompt: 'Can known orthogonal states be cloned?', hint: 'First distinguish them without error.', answer: 'Yes; measure in their basis and prepare another copy.' },
              { prompt: 'Why does error correction not violate no-cloning?', hint: 'Encoded qubits are correlated shares, not independent copies.', answer: 'The encoding distributes one logical state into a code subspace and cannot output two standalone unknown states.' }
            ],
            connections: ['quantum-error-correction/why-qec-works', 'quantum-information-theory/qkd-information']
          })
        ]
      },
      {
        slug: 'research-practice',
        number: 13,
        title: 'Research Frontiers and Scientific Practice',
        summary: 'Study quantum linear solvers, audit theorem claims, run reproducible Qiskit experiments, and turn daily reading into cumulative research.',
        accent: 'From learner to researcher',
        references: [
          source('Harrow–Hassidim–Lloyd', 'https://arxiv.org/abs/0811.3171', 'Primary quantum linear-systems paper.'),
          source('Childs–Kothari–Somma', 'https://arxiv.org/abs/1511.02306', 'Improved precision dependence and modern linear-systems context.'),
          source('IBM Quantum — V2 primitives', 'https://quantum.cloud.ibm.com/docs/en/guides/v2-primitives', 'Current execution interfaces and migration guidance.')
        ],
        articles: [
          article({
            slug: 'quantum-linear-solvers',
            title: 'Quantum Linear Solvers: HHL to Block Encoding',
            minutes: 85,
            level: 'Advanced research',
            summary: 'Understand what quantum linear-system algorithms output, which condition numbers and access models they assume, and when speedups survive end to end.',
            prerequisites: ['Phase estimation', 'Amplitude amplification', 'Sparse matrices', 'Condition numbers'],
            outcomes: ['Outline the HHL state transformation.', 'Identify dependence on sparsity, precision, and condition number.', 'Explain why reading every entry removes an exponential advantage.'],
            sections: [
              { title: 'The output is a quantum state', body: 'Given Ax=b, a quantum linear solver aims to prepare |x⟩ proportional to A^{-1}|b⟩, not print all N coordinates. The useful task must estimate a global property such as ⟨x|M|x⟩ efficiently. Full classical readout generally costs Ω(N).' },
              { title: 'HHL mechanism', body: 'Phase estimation resolves eigenvalues λj of Hermitian A, a controlled rotation encodes approximately 1/λj in an ancilla amplitude, and uncomputation removes the eigenvalue register. Postselection or amplification produces coefficients βj/λj.' },
              { title: 'Assumptions drive complexity', body: 'Runtime depends on condition number κ, precision ε, sparsity or block-encoding cost, preparation of |b⟩, and observable measurement. Modern methods improve precision dependence, but input and output bottlenecks remain central.' }
            ],
            equations: [
              { label: 'Spectral solution', latex: 'A=\\sum_j\\lambda_j|u_j\\rangle\\langle u_j|,\\quad |b\\rangle=\\sum_j\\beta_j|u_j\\rangle,\\quad A^{-1}|b\\rangle=\\sum_j\\frac{\\beta_j}{\\lambda_j}|u_j\\rangle', note: 'Small eigenvalues amplify both the solution and algorithmic difficulty.' },
              { label: 'Condition number', latex: '\\kappa=\\frac{|\\lambda_{max}|}{|\\lambda_{min}|}', note: 'Assume the relevant spectrum excludes zero or is regularized.' }
            ],
            worked: { title: 'Two-dimensional spectral solve', problem: 'Let A=diag(1,2) and |b⟩=(|0⟩+|1⟩)/√2. Find the normalized solution state.', steps: ['Apply reciprocal eigenvalues to get (|0⟩+(1/2)|1⟩)/√2 up to scale.', 'Its squared norm before the common √2 factor is 1+1/4.', 'Normalize the coefficient vector (1,1/2).'], result: '|x⟩=(2|0⟩+|1⟩)/√5.' },
            lab: { title: 'Classical spectral sanity check', code: "import numpy as np\nA=np.diag([1.,2.]); b=np.array([1.,1.])/np.sqrt(2)\nx=np.linalg.solve(A,b); x=x/np.linalg.norm(x)\nprint(x)  # compare with [2,1]/sqrt(5)\nprint('condition number:', np.linalg.cond(A))" },
            exercises: [
              { prompt: 'Why does κ grow when A is nearly singular?', hint: 'The smallest singular/eigenvalue approaches zero.', answer: 'The inverse amplifies small-eigenvalue components, increasing sensitivity and algorithmic cost.' },
              { prompt: 'Name three costs hidden by the phrase “polylogarithmic in N”.', hint: 'Think input, matrix access, and output.', answer: 'Preparing |b⟩, implementing sparse access/block encoding, and extracting the desired solution property.' }
            ],
            connections: ['research.html#quantum-linear-solvers', 'papers.html', 'research-practice/theorem-claim-audits']
          }),
          article({
            slug: 'theorem-claim-audits',
            title: 'How to Read Papers and Audit Theorem Claims',
            minutes: 65,
            level: 'Research practice',
            summary: 'Turn a paper from a sequence of pages into a map of claims, assumptions, proof dependencies, evidence, and open questions.',
            prerequisites: ['Comfort with asymptotic notation', 'One domain chapter relevant to the paper'],
            outcomes: ['Extract a theorem contract.', 'Separate proof, experiment, interpretation, and speculation.', 'Write a useful paper note with falsifiable follow-ups.'],
            sections: [
              { title: 'First pass: locate the claim', body: 'Read title, abstract, figures, conclusion, and theorem statements before diving into derivations. Write one sentence answering: what object is produced, under which access model, with what error guarantee, and compared with which baseline?' },
              { title: 'Second pass: build the dependency graph', body: 'List definitions, lemmas, assumptions, and citations each main result uses. Mark where the proof invokes sparsity, QRAM, oracle calls, fault tolerance, iid sampling, or asymptotic limits. Re-derive one small case to test notation.' },
              { title: 'Third pass: challenge the evidence', body: 'For experiments, inspect data splits, baselines, seeds, uncertainty, ablations, simulator settings, and omitted costs. End with three items: strongest supported conclusion, largest limitation, and one reproducible next experiment.' }
            ],
            equations: [
              { label: 'Claim contract', latex: '(\\text{assumptions},\\text{input access},\\epsilon,\\delta,\\text{resources})\\Longrightarrow\\text{guaranteed output}', note: 'Never copy a runtime without copying its contract.' }
            ],
            worked: { title: 'Audit an exponential-speedup sentence', problem: 'A paper states runtime poly(logN). What questions come first?', steps: ['Ask how N-dimensional data and matrix entries are accessed.', 'Ask what output is returned and how it is measured.', 'Expose κ, sparsity, precision, success probability, and preprocessing factors.'], result: 'The revised claim is conditional and end-to-end comparable rather than slogan-like.' },
            exercises: [
              { prompt: 'What is the difference between a theorem and an empirical plot?', hint: 'One follows from stated assumptions; one samples behavior.', answer: 'A theorem gives a formal guarantee under assumptions; a plot provides finite experimental evidence under a protocol.' },
              { prompt: 'Why reproduce one figure before proposing an extension?', hint: 'It tests both your understanding and the artifact.', answer: 'Replication reveals missing settings, notation mistakes, fragile assumptions, and whether the code supports the stated result.' }
            ],
            connections: ['papers.html', 'research-practice/reproducible-qiskit-experiments', 'research-practice/research-notebooks-open-questions']
          }),
          article({
            slug: 'reproducible-qiskit-experiments',
            title: 'Reproducible Qiskit Experiments',
            minutes: 70,
            level: 'Research practice',
            summary: 'Build an experiment whose environment, circuit transformations, randomness, data, uncertainty, and conclusion can be independently checked.',
            prerequisites: ['Qiskit circuits', 'Sampling uncertainty', 'Basic Git'],
            outcomes: ['Use current V2 primitive concepts.', 'Record compilation and execution provenance.', 'Package a result with raw data and a limitation statement.'],
            sections: [
              { title: 'Pin the computational environment', body: 'Record Python and package versions, operating system, seeds, and exact source commit. Separate notebooks for exploration from scripts that regenerate final figures. Preserve parameters in a machine-readable configuration.' },
              { title: 'Preserve circuit provenance', body: 'Save logical and transpiled circuits, backend target, layout, optimization level, transpiler seed, shots, and calibration time. Current Qiskit workflows distinguish local StatevectorEstimator/StatevectorSampler from hardware Runtime V2 primitives.' },
              { title: 'Treat outputs as data', body: 'Save raw counts or primitive results before plotting. Report estimator definitions, intervals, exclusions, mitigation settings, and every retry policy. A README should state one command to reproduce, expected runtime, expected output, and known limitations.' }
            ],
            equations: [
              { label: 'Reproducible result', latex: 'R=f(\\text{code},\\text{data},\\text{environment},\\text{seed},\\text{target},\\text{calibration})', note: 'Source code alone is insufficient for a hardware experiment.' }
            ],
            worked: { title: 'Minimum result bundle', problem: 'Package a Bell-state hardware experiment for review.', steps: ['Commit circuit code, dependency lock, config, and backend metadata.', 'Store raw counts for ZZ and XX measurements with shots and timestamps.', 'Generate a figure and conclusion from raw data in a clean command.'], result: 'A reviewer can reproduce both the artifact and the reasoning chain.' },
            lab: { title: 'Version-aware local primitive', code: "import qiskit\nfrom qiskit import QuantumCircuit\nfrom qiskit.primitives import StatevectorSampler\n\nprint('qiskit', qiskit.__version__)\nqc=QuantumCircuit(2); qc.h(0); qc.cx(0,1); qc.measure_all()\njob=StatevectorSampler(seed=2026).run([qc], shots=4096)\nprint(job.result()[0].data.meas.get_counts())" },
            exercises: [
              { prompt: 'Why is a fixed simulator seed not enough for hardware reproducibility?', hint: 'Hardware has changing calibration and stochastic noise.', answer: 'Record backend, calibration context, job metadata, timing, transpilation, and raw results as well.' },
              { prompt: 'Why keep raw counts after computing a fidelity?', hint: 'Metrics and corrections may change.', answer: 'Raw data permit independent uncertainty analysis, alternative estimators, and auditing.' }
            ],
            connections: ['blog.html', 'papers.html', 'quantum-simulation/verification-scaling-baselines']
          }),
          article({
            slug: 'research-notebooks-open-questions',
            title: 'Research Notebooks, Daily Notes, and Open Questions',
            minutes: 50,
            level: 'Research practice',
            summary: 'Turn daily reading and coding into a cumulative map of definitions, claims, evidence, failures, and next experiments.',
            prerequisites: ['Willingness to write before understanding is complete'],
            outcomes: ['Use a repeatable daily note template.', 'Link paper notes to topic notes and experiments.', 'Maintain an actionable open-question queue.'],
            sections: [
              { title: 'Write atomic notes', body: 'One note should answer one question or explain one concept in your own words. Include the source, exact assumption, derivation or evidence, and links to prerequisites. Atomic notes can be recombined into lessons, reviews, and papers.' },
              { title: 'Record failures as evidence', body: 'A failed derivation, unstable optimizer, or irreproducible figure is useful if the conditions are preserved. Write the prediction, observation, discrepancy, likely causes, and cheapest discriminating test. This prevents repeating invisible work.' },
              { title: 'Keep questions executable', body: 'Replace “understand QLSA better” with a bounded action such as “derive κ dependence for the two-eigenvalue example” or “reproduce Figure 2 with three seeds.” Tag questions by topic, confidence, required background, and next action.' }
            ],
            equations: [
              { label: 'Learning loop', latex: '\\text{question}\\rightarrow\\text{prediction}\\rightarrow\\text{derivation/experiment}\\rightarrow\\text{evidence}\\rightarrow\\text{revised question}', note: 'The loop matters more than a chronological diary.' }
            ],
            worked: { title: 'Convert a vague goal', problem: 'Goal: “learn quantum data encoding.” Make it research-ready.', steps: ['Choose one comparison: angle versus amplitude encoding.', 'Fix a tiny dataset, metric, circuit budget, and classical baseline.', 'State the output: a derivation, reproducible notebook, and limitation note.'], result: 'The goal becomes a one-week experiment with a falsifiable result.' },
            exercises: [
              { prompt: 'What belongs at the top of every daily note?', hint: 'Make future retrieval possible.', answer: 'Date, one question, status, topic tags, source links, and the next concrete action.' },
              { prompt: 'When should a note become a paper-analysis page?', hint: 'Think synthesis rather than length.', answer: 'When it has a stable claim map, assumptions, derivation/evidence critique, and links to follow-up experiments.' }
            ],
            connections: ['blog.html', 'papers.html', 'research.html']
          })
        ]
      }
    ]
  };
})();
