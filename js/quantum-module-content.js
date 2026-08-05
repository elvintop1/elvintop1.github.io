window.quantumModules = {
  1: {
    title: 'Mathematical Language of Quantum Computing',
    essentialQuestion: 'How can complex vectors and linear maps become a language for physical prediction?',
    thesis: 'Quantum theory does not require mysterious new arithmetic. It requires familiar linear algebra over complex numbers, used with strict rules about normalization, inner products, operators, and composition.',
    introduction: [
      'This module builds one continuous mathematical story. Complex numbers supply magnitude and phase. Vectors collect amplitudes into a state. Inner products compare states, outer products create operators, and spectral structure explains observables. Dirac notation then compresses those operations without changing the underlying algebra. Finally, tensor products enlarge the language from one system to many.',
      'The goal is not symbol recognition. By the end, every expression should have a type and a job: scalar, vector, bra, operator, projector, or tensor-product object. Dimension checks, conjugation, normalization, and basis order form a small set of habits that prevent most early mistakes.'
    ],
    lessons: [
      {
        title: 'Complex amplitudes',
        question: 'Why does quantum theory use complex amplitudes instead of ordinary probabilities?',
        explanation: [
          'Ordinary probabilities can only add non-negative weights. Quantum amplitudes can also cancel because they carry phase. Two experimental paths may each be possible, yet their amplitudes can reinforce or destructively interfere before a measurement converts the final amplitude into a probability. This extra phase degree of freedom is the resource that later algorithms control.',
          'Write each nonzero amplitude as $z=re^{i\\phi}$. The magnitude contributes $r^2$ to probability; the phase becomes meaningful only relative to another component. Multiplying every amplitude by the same $e^{i\\gamma}$ changes no inner-product magnitude, while changing one component changes interference. This distinction will reappear in gates, oracles, Fourier transforms, and phase estimation.'
        ],
        checkpoint: 'Given two state vectors, decide whether they differ globally or relatively, then propose a basis change that could reveal the difference.',
        transition: 'Once amplitudes are understood individually, the next lesson organizes them into vectors and asks which features are independent of coordinates.'
      },
      {
        title: 'Vectors and Hilbert spaces',
        question: 'What does it mean to represent a physical state by a vector?',
        explanation: [
          'A state vector is not an arrow floating in physical space. It is an element of a complex vector space whose coordinates depend on a chosen basis. The same state can have different coordinate lists in the Z basis and X basis, just as a geometric arrow has different coordinates after rotating axes. Physical predictions must therefore be invariant under a consistent basis change.',
          'An inner-product space supplies length and angle. Normalized vectors have unit length; orthogonal normalized vectors can serve as distinguishable alternatives. A qubit space has dimension two, but an $n$-qubit space has dimension $2^n$. That exponential dimension describes possible amplitudes, not an automatic exponential amount of readable classical information.'
        ],
        checkpoint: 'Express $|+\\rangle$ in the computational and X bases and explain why the coordinates change while the state does not.',
        transition: 'To calculate overlap, probability, and projection we now need the two fundamental products between bras and kets.'
      },
      {
        title: 'Inner and outer products',
        question: 'How do we turn vectors into overlaps, probabilities, and transformations?',
        explanation: [
          'The inner product consumes two vectors and returns a scalar overlap. Conjugating the first vector is essential: without it, a complex vector could have a non-real or negative “squared length.” When both states are normalized, the overlap magnitude lies between zero and one and becomes a measurement amplitude in the appropriate basis.',
          'The outer product performs the opposite type of construction: it returns an operator. For normalized $|u\\rangle$, the projector $|u\\rangle\\langle u|$ keeps the component parallel to $|u\\rangle$ and removes the orthogonal component. Summing projectors over an orthonormal basis gives the identity, which lets us expand states and insert resolutions of identity inside derivations.'
        ],
        checkpoint: 'Compute both $\\langle+|0\\rangle$ and $|+\\rangle\\langle0|$ and state why their shapes and uses differ.',
        transition: 'Projectors are special matrices; the next lesson develops the larger operator families used for evolution and observation.'
      },
      {
        title: 'Matrices and spectral structure',
        question: 'Why are unitary and Hermitian matrices the two central operator classes?',
        explanation: [
          'A closed evolution must preserve every inner product, so it is represented by a unitary matrix $U$ satisfying $U^\\dagger U=I$. An observable must return real measurement values, so it is represented by a Hermitian matrix $A=A^\\dagger$. Some operators, such as Pauli matrices, belong to both classes but the physical roles remain conceptually distinct.',
          'The spectral theorem resolves a Hermitian operator into eigenvalues and orthogonal projectors. This is more than diagonalization technique: it identifies possible outcomes and their associated subspaces. Functions such as $e^{-itA}$ can then be defined by applying the function to each eigenvalue, a step that later connects Hamiltonians to time evolution and eigenphases to algorithms.'
        ],
        checkpoint: 'For a candidate matrix, test Hermiticity and unitarity separately, then interpret its eigenvalues only if the chosen physical role permits it.',
        transition: 'With the algebra in place, Dirac notation becomes useful shorthand rather than unexplained symbolism.'
      },
      {
        title: 'Dirac notation',
        question: 'How can notation reveal the type and composition of a calculation?',
        explanation: [
          'Dirac notation is a typed grammar. A ket is a vector, a bra is a linear functional obtained by conjugate transpose, a bracket is a scalar, and a ket–bra is an operator. Reading expressions from their types prevents illegal products and exposes where an identity, projector, or subsystem label is missing.',
          'The notation is basis independent until coordinates are introduced. Writing $|\\psi\\rangle=\\sum_i\\alpha_i|i\\rangle$ selects a basis and identifies $\\alpha_i=\\langle i|\\psi\\rangle$. This flexibility lets one derivation move between abstract states, eigenbases, and computational coordinates without confusing the representation with the represented object.'
        ],
        checkpoint: 'Annotate every factor in $\\langle\\psi|A|\\phi\\rangle$ by type and verify that the complete expression is a scalar.',
        transition: 'Subsystem labels now become essential because the final mathematical tool combines several state spaces.'
      },
      {
        title: 'Tensor products',
        question: 'How does the state space of a composite system differ from an ordinary list of separate states?',
        explanation: [
          'The tensor product multiplies dimensions and preserves subsystem structure. Two qubits require four basis vectors, so a general joint state has four amplitudes. Local operators are embedded as $A\\otimes I$ or $I\\otimes B$, and their matrix forms depend on a declared basis order. Silent changes of convention are a common source of apparently contradictory circuit results.',
          'Product states occupy only a restricted part of the joint space. A general vector in $\\mathcal H_A\\otimes\\mathcal H_B$ may not factor into one vector for A and one for B. The mathematics therefore predicts correlations that cannot be explained by assigning independent pure states to each subsystem—the starting point for entanglement in Week 4.'
        ],
        checkpoint: 'Construct $|01\\rangle$, $X\\otimes I$, and $I\\otimes X$ under one stated basis order, then verify their action explicitly.',
        transition: 'Week 2 gives these mathematical objects physical meaning through preparations, transformations, and measurements.'
      }
    ],
    synthesis: 'The module begins with complex scalars and ends with composite Hilbert spaces. Every later topic is built from this chain: amplitudes form normalized vectors; inner products generate predictions; matrices encode transformations and observables; spectral decompositions expose outcomes; tensor products describe multiple systems. If a later derivation feels obscure, trace each symbol back to one link in this chain.'
  },

  2: {
    title: 'Qubits, States, and Measurement',
    essentialQuestion: 'How do mathematical states become experimentally testable statements about a two-level quantum system?',
    thesis: 'A qubit is defined operationally by how it is prepared, transformed, and measured—not by the slogan that it is “both zero and one.”',
    introduction: [
      'This module turns Week 1 mathematics into quantum mechanics. The computational basis provides a reference measurement. The Born rule connects projections to probabilities, while post-measurement update describes conditional state change. Basis changes reveal phase, the Bloch sphere organizes pure one-qubit geometry, and density matrices include classical uncertainty and subsystems.',
      'The final lesson establishes limits: a single unknown state cannot reveal its amplitudes, arbitrary unknown states cannot be cloned, and non-orthogonal states cannot be perfectly distinguished. These are not defects of imperfect hardware; they follow from the linear structure of quantum theory.'
    ],
    lessons: [
      {
        title: 'The computational basis',
        question: 'What information is actually contained in $\\alpha|0\\rangle+\\beta|1\\rangle$?',
        explanation: [
          'The computational basis is a chosen pair of orthonormal reference states. A state vector assigns one complex amplitude to each. Normalization supplies a probability distribution only for measurement in this basis; it does not say that the system secretly holds two classical values or that one observation can reveal both amplitudes.',
          'After normalization and removal of global phase, a pure qubit retains two real degrees of freedom. Z-basis populations reveal one degree, while interference in other bases reveals relative phase. Full state estimation therefore requires many identically prepared systems and several measurement settings, not repeated measurements of one already-collapsed specimen.'
        ],
        checkpoint: 'For $(\\sqrt3|0\\rangle+i|1\\rangle)/2$, predict Z statistics and identify which information remains hidden.',
        transition: 'The Born rule now converts a chosen measurement basis into exact outcome probabilities and conditional states.'
      },
      {
        title: 'Born rule and collapse',
        question: 'How does a quantum state make statistical predictions, and what changes after an outcome is recorded?',
        explanation: [
          'For a projective measurement, each outcome corresponds to a projector $P_m$. The Born probability is the squared length of the projected component, $\\langle\\psi|P_m|\\psi\\rangle$. Completeness of the projectors guarantees that probabilities sum to one. This rule applies to repeated preparations, not to an imagined distribution over values that all existed before measurement.',
          'Conditioned on outcome $m$, the state is renormalized inside the observed subspace. If the outcome is ignored, the correct description is an ensemble density matrix rather than one selected collapsed vector. Distinguishing conditioned and unconditioned descriptions becomes crucial in protocols, noise channels, and syndrome measurements.'
        ],
        checkpoint: 'Calculate the probability and post-measurement state for each Z outcome of $|+\\rangle$, then describe the ensemble when the record is discarded.',
        transition: 'A measurement basis is a choice, so the next lesson shows how basis rotations expose different observables.'
      },
      {
        title: 'Changing measurement basis',
        question: 'How can the same hardware read X, Y, or an arbitrary qubit observable?',
        explanation: [
          'A projective measurement asks which eigenstate of an observable the system occupies. If hardware reports only computational-basis bits, apply a unitary that maps the desired eigenbasis to Z before measuring. Hadamard maps the X basis to Z; $S^\\dagger H$ performs the corresponding Y-basis conversion under the usual circuit order.',
          'Counts become expectation values by assigning eigenvalues to outcomes. For a Pauli measurement, bit 0 corresponds to +1 and bit 1 to −1 after the proper basis rotation. Non-commuting observables generally require separate ensembles, which is why tomography and Hamiltonian estimation carry a measurement cost.'
        ],
        checkpoint: 'Design circuits to estimate $\\langle X\\rangle$, $\\langle Y\\rangle$, and $\\langle Z\\rangle$ for one prepared state.',
        transition: 'Those three expectations become coordinates of the Bloch vector, giving a geometric summary of one-qubit states.'
      },
      {
        title: 'Bloch-sphere geometry',
        question: 'What does the Bloch sphere show, and what does it hide?',
        explanation: [
          'Normalization removes one real degree of freedom and global phase removes another, leaving two angles for a pure qubit. These angles place the state on a unit sphere whose Cartesian coordinates are the Pauli expectations. Unitary gates rotate the Bloch vector, making axis rotations and basis changes geometrically visible.',
          'Mixed states lie inside the sphere, with the maximally mixed state at the center. The picture is complete for one qubit but not for multi-qubit entanglement: a pair of local Bloch vectors can both vanish while the joint state retains perfect correlations. Geometry is therefore a calculation aid, not a universal visualization of quantum state space.'
        ],
        checkpoint: 'Convert one pair $(\\theta,\\phi)$ into amplitudes and Pauli expectations, then locate the antipodal orthogonal state.',
        transition: 'To represent interior points and ignored subsystems rigorously, we now replace state vectors with density operators.'
      },
      {
        title: 'Density matrices',
        question: 'How can one formalism represent pure states, classical mixtures, and local parts of entangled systems?',
        explanation: [
          'A density matrix is positive semidefinite, Hermitian, and trace one. A known pure state has $\\rho=|\\psi\\rangle\\langle\\psi|$ and rank one. A classical ensemble averages these projectors with preparation probabilities. Different ensemble decompositions can yield the same $\\rho$, so operational predictions depend on the matrix, not on a preferred story about the mixture.',
          'Expectation values become $\\operatorname{Tr}(\\rho A)$ and evolution becomes $U\\rho U^\\dagger$. Purity $\\operatorname{Tr}(\\rho^2)$ distinguishes rank-one states from mixtures but does not reveal whether local mixedness came from classical ignorance or entanglement without information about the larger system.'
        ],
        checkpoint: 'Compare $|+\\rangle\\langle+|$ with an equal Z-basis mixture using Z and X measurements and purity.',
        transition: 'The final lesson uses linearity and overlap to establish what no physical operation or measurement can accomplish.'
      },
      {
        title: 'Fundamental limits',
        question: 'Which information-processing tasks are forbidden by the structure of quantum theory?',
        explanation: [
          'A universal cloning machine would have to copy basis states and every superposition with one linear operation. Applying linearity to a superposition produces entanglement rather than two independent copies, giving a contradiction. Known orthogonal states may be copied; the impossibility concerns an arbitrary unknown input.',
          'Similarly, non-orthogonal states cannot be perfectly distinguished in one deterministic shot because no measurement can map their nonzero overlap to perfectly separated classical outcomes while preserving physical consistency. These limits explain why quantum communication protocols use disturbance and why tomography consumes many independently prepared copies.'
        ],
        checkpoint: 'Give the two-state linearity proof of no-cloning and identify exactly which assumption would fail for a restricted state set.',
        transition: 'Week 3 studies the reversible unitary operations that remain possible within these limits.'
      }
    ],
    synthesis: 'A qubit is now a complete operational model: a state predicts outcomes through the Born rule, unitaries change the state, basis choices determine the measured observable, and density operators describe uncertainty. The limits on copying and discrimination prevent classical intuition from being imported without qualification.'
  },

  3: {
    title: 'Quantum Gates and Circuit Mechanics',
    essentialQuestion: 'How are valid quantum transformations compiled into a readable and executable circuit?',
    thesis: 'A circuit is a factorization of a global unitary into local reversible operations, together with explicit non-unitary measurements and classical control.',
    introduction: [
      'This module moves from static states to computation. Pauli and Hadamard gates establish discrete transformations and basis changes. Continuous rotations supply general one-qubit control. Controlled operations couple subsystems, reversible classical logic embeds ordinary functions, and circuit composition handles time order and parallelism.',
      'Universality completes the abstraction: a small gate alphabet can approximate arbitrary operations, but approximation error and hardware decomposition create real costs. Throughout, matrix order, wire order, global phase, ancilla cleanup, and two-qubit depth must remain explicit.'
    ],
    lessons: [
      {
        title: 'Pauli and Hadamard gates',
        question: 'How do the smallest gate matrices control population, phase, and basis?',
        explanation: [
          'X exchanges computational populations, Z changes relative phase, and Y combines both actions with complex phases. Each Pauli is also an observable, so the same matrix may represent a transformation or a measurement quantity depending on context. Up to global phase, the gates are π rotations about orthogonal Bloch axes.',
          'Hadamard is a basis exchanger rather than a generic “randomness gate.” It maps Z eigenstates to X eigenstates and conjugates X into Z. The sequence H–Z–H illustrates the computational importance of phase: Z changes no immediate Z probability between the Hadamards, yet the final result flips deterministically.'
        ],
        checkpoint: 'Calculate HZH and HXH as matrices and explain each identity as a basis change.',
        transition: 'Continuous phase and rotation gates extend these discrete transformations to arbitrary one-qubit control.'
      },
      {
        title: 'Phase and rotation gates',
        question: 'How can every one-qubit unitary be assembled from axis rotations?',
        explanation: [
          'Rotations arise from exponentiating Pauli generators: $R_n(\\theta)=e^{-i\\theta n\\cdot\\sigma/2}$. $R_z$ changes relative phase in the computational basis, while $R_x$ and $R_y$ move population as well. Phase gate $P(\\phi)$ and $R_z(\\phi)$ differ by a global phase, so they are physically equivalent on an isolated target but may appear differently in controlled constructions.',
          'Euler decompositions express an arbitrary one-qubit unitary as three rotations plus global phase. This theorem separates expressive sufficiency from implementation: a compiler must still map abstract rotations to calibrated native instructions, and approximation or pulse constraints determine the final depth and error.'
        ],
        checkpoint: 'Derive $R_y(\\theta)|0\\rangle$ and choose θ to prepare a desired real-amplitude qubit.',
        transition: 'Single-qubit control is not enough for general multi-qubit computation; controlled gates introduce conditional action and entanglement.'
      },
      {
        title: 'Controlled operations',
        question: 'What does “control” mean when the controlling qubit is in superposition?',
        explanation: [
          'A controlled-U is a block operator, not a measurement-and-if statement. The control-$|0\\rangle$ subspace receives identity and the control-$|1\\rangle$ subspace receives U. Linearity then determines the action on superpositions. No hidden classical branch is selected during the gate.',
          'When different control components drive distinguishable target states, the output may be entangled. This explains how CNOT copies computational-basis information into a blank target without cloning an arbitrary qubit. Hardware must realize the interaction using available connectivity and native entangling operations, so logical control diagrams can hide substantial routing cost.'
        ],
        checkpoint: 'Apply CNOT to a general two-term control superposition and determine when the result is separable.',
        transition: 'Controlled gates also embed ordinary Boolean functions, provided every transformation is made reversible.'
      },
      {
        title: 'Reversible classical logic',
        question: 'How can an irreversible classical function be used inside a unitary quantum algorithm?',
        explanation: [
          'A unitary must map distinct basis inputs to distinct outputs. Irreversible functions such as AND discard information, so a quantum embedding preserves the input and XORs the result into an output register. Toffoli implements a reversible AND into an initialized target and is universal for classical reversible computation.',
          'Temporary ancillas hold intermediate values but may become entangled with the desired output. Compute–copy–uncompute clears that workspace by applying the inverse computation after the useful result has been transferred. In fault-tolerant settings, ancilla count, T count, and Toffoli synthesis become first-class resource measures.'
        ],
        checkpoint: 'Construct a reversible AND map and explain why overwriting the two inputs would destroy invertibility.',
        transition: 'Now that circuit blocks exist, composition rules determine how their operators, depths, and measurements combine.'
      },
      {
        title: 'Circuit composition',
        question: 'How do diagram order, algebraic order, and hardware time relate?',
        explanation: [
          'Circuit diagrams advance left to right, while a column state is multiplied by the rightmost matrix first. If U is drawn before V, the combined operator is VU. Operations on disjoint wires may share a logical layer, although scheduling and control hardware can impose additional timing constraints.',
          'Unitary blocks may be composed, inverted, controlled, or packaged as instructions. Measurement, reset, and classically conditioned operations are different: they introduce classical records or non-unitary state changes. A useful circuit analysis therefore tracks quantum width, classical bits, depth, two-qubit depth, and where coherent evolution ends.'
        ],
        checkpoint: 'Translate a three-gate diagram into one matrix product and verify the result on two different input states.',
        transition: 'The final question is whether a finite library of such gates can express every computation we need.'
      },
      {
        title: 'Universal gate sets',
        question: 'What does universality guarantee, and what practical costs does it leave unresolved?',
        explanation: [
          'Arbitrary one-qubit gates plus any suitable entangling two-qubit gate provide exact universality in an abstract continuous model. A finite set such as Clifford+T provides approximate universality: longer sequences approximate a target unitary to chosen accuracy. Universality is therefore an existence statement, not a promise of low depth.',
          'Fault-tolerant architectures make the distinction sharper because Clifford operations may be relatively inexpensive while non-Clifford T gates require costly resources such as magic states. Synthesis must balance approximation error, gate count, connectivity, and accumulated noise. Two circuits can implement the same ideal unitary yet have very different experimental value.'
        ],
        checkpoint: 'Separate the claims “this set is universal” and “this unitary has an efficient implementation in this set.”',
        transition: 'Week 4 uses controlled gates and tensor products to study information stored in correlations rather than individual wires.'
      }
    ],
    synthesis: 'Quantum programming is now a disciplined decomposition problem. States move through time-ordered unitary factors; controlled operations create joint behavior; reversible embeddings preserve information; uncomputation cleans workspace; and universality provides reach at a cost that must still be quantified.'
  },

  4: {
    title: 'Multi-Qubit Information and Entanglement',
    essentialQuestion: 'What information belongs to a composite quantum system but to none of its parts individually?',
    thesis: 'Entanglement is a precise failure of factorization that redistributes information into joint correlations without enabling faster-than-light signalling.',
    introduction: [
      'The module starts by making multi-qubit bookkeeping explicit: basis order, local operators, marginals, parity, and correlators. Factorization and Schmidt structure then distinguish product states from entangled states. Partial trace explains how a pure whole can produce mixed local descriptions.',
      'Teleportation and superdense coding turn entanglement into a communication resource, while CHSH tests whether observed correlations admit a local hidden-variable explanation. Each protocol is analyzed by resources and conditional states rather than slogans about instantaneous influence.'
    ],
    lessons: [
      {
        title: 'Multi-qubit state spaces',
        question: 'How do amplitudes, probabilities, and operators scale when systems are combined?',
        explanation: [
          'An $n$-qubit pure state assigns amplitudes to $2^n$ computational basis strings. Joint probabilities come from squared amplitudes, while marginal probabilities sum over unobserved bits. Correlations require joint quantities such as parity or $\\langle Z\\otimes Z\\rangle$; one-qubit probabilities alone cannot reconstruct them.',
          'Operator placement is defined through tensor factors. A local gate on one qubit acts as identity on the rest, and multi-qubit Pauli strings measure products of local eigenvalues. Explicit endian and basis conventions are essential when translating between hand calculations, matrices, and Qiskit count strings.'
        ],
        checkpoint: 'From a four-amplitude state, calculate both marginals and a parity expectation without assuming independence.',
        transition: 'The next lesson asks whether the joint amplitude table can be generated from two independent state vectors.'
      },
      {
        title: 'Product versus entangled states',
        question: 'How can we prove that a joint pure state is genuinely entangled?',
        explanation: [
          'A product state has amplitudes that factor into one list for A and one for B. For two qubits, arranging amplitudes into a 2×2 matrix gives a simple test: rank one means separable; rank greater than one means entangled. Bell states fail the factorization equations because their nonzero joint amplitudes cannot arise from independent local coefficients.',
          'Schmidt decomposition generalizes this idea. Every bipartite pure state can be written as a sum of matched orthonormal terms with non-negative Schmidt coefficients. One nonzero coefficient means product; more than one means entangled. Entanglement therefore depends on the chosen partition of a larger system.'
        ],
        checkpoint: 'Apply both a coefficient-factorization test and a Schmidt-rank argument to $|\\Phi^+\\rangle$.',
        transition: 'Schmidt coefficients also determine the local reduced states obtained when one subsystem is ignored.'
      },
      {
        title: 'Reduced density matrices',
        question: 'How can the whole state be pure when every local description is mixed?',
        explanation: [
          'Partial trace removes an inaccessible subsystem while preserving all predictions for measurements on the part that remains. Cross terms survive only when the traced subsystem components overlap. For a Bell state, the two correlated branches carry orthogonal partner states, so local coherence disappears and each qubit becomes $I/2$.',
          'The resulting local uncertainty is not ignorance about a pre-existing pure local state; it is a consequence of entanglement with the rest. For a bipartite pure state, the two reduced density matrices share the same nonzero eigenvalues, and their von Neumann entropy quantifies entanglement across that partition.'
        ],
        checkpoint: 'Compute the partial trace of a Bell projector term by term and explain which off-diagonal terms vanish.',
        transition: 'Teleportation uses exactly this split between local randomness and global correlation to transfer an unknown state.'
      },
      {
        title: 'Quantum teleportation',
        question: 'How can an unknown state move without the sender learning or copying its amplitudes?',
        explanation: [
          'Alice and Bob begin with a shared Bell pair. Alice couples the unknown input to her Bell qubit and measures two classical bits. Before those bits arrive, Bob’s unconditioned state is maximally mixed; no usable information has travelled faster than light. Each measurement result identifies one Pauli frame relating Bob’s conditional qubit to the original state.',
          'After receiving the two bits, Bob applies the corresponding correction and recovers the input state. Alice’s measurement destroys her coherent copy, so no-cloning remains intact. Resource accounting is exact: one prior ebit, two classical bits, local gates, and destructive measurement transmit one qubit state.'
        ],
        checkpoint: 'Expand the three-qubit state in the Bell basis and identify Bob’s correction for all four outcomes.',
        transition: 'Superdense coding reverses the resource perspective: prior entanglement increases classical information carried by one transmitted qubit.'
      },
      {
        title: 'Superdense coding',
        question: 'How can one transmitted qubit communicate two classical bits without violating capacity limits?',
        explanation: [
          'Alice and Bob first share a Bell pair, which already required quantum communication or a source. Alice applies one of four local Pauli choices, mapping the pair to four orthogonal Bell states, and sends her qubit. Bob performs a joint Bell-basis decoder and identifies the two-bit label deterministically.',
          'The protocol does not store two readable classical bits in an isolated qubit. The four distinguishable codewords live in the two-qubit joint space, and one qubit was pre-shared as entanglement. Counting the distribution stage prevents misleading statements about classical channel capacity.'
        ],
        checkpoint: 'Create a table mapping messages 00, 01, 10, and 11 to Alice’s local operation and Bob’s decoded output.',
        transition: 'Bell inequalities ask a deeper question: can the same joint correlations be reproduced by local pre-existing variables?'
      },
      {
        title: 'Bell inequalities and CHSH',
        question: 'What experimental statistic separates quantum correlations from local hidden-variable models?',
        explanation: [
          'CHSH combines correlators from four pairs of measurement settings. Any local hidden-variable assignment obeys $|S|\\le2$. Quantum theory predicts up to $2\\sqrt2$ for suitable measurements on an entangled state. The violation concerns the structure of joint statistics across alternative settings, not one dramatic pair of outcomes.',
          'A credible experiment estimates every correlator from finite shots, reports uncertainty, and addresses detection, locality, and sampling assumptions. Quantum violation rejects the chosen local-realistic model class, while no-signalling remains: each party’s marginal distribution is independent of the other party’s setting.'
        ],
        checkpoint: 'Derive the classical CHSH bound for deterministic ±1 assignments and then calculate the ideal quantum value for standard settings.',
        transition: 'Week 5 turns interference and phase into algorithmic tools through reversible black-box functions.'
      }
    ],
    synthesis: 'Entanglement is now an operational resource with mathematical tests, local reduced descriptions, and communication protocols. The same framework explains why correlations can exceed local hidden-variable bounds while local outcomes remain uncontrollable and no signal travels without a classical or quantum channel.'
  },

  5: {
    title: 'Oracles and Quantum Query Algorithms',
    essentialQuestion: 'How can a quantum algorithm learn a global property of a function with fewer oracle calls?',
    thesis: 'Quantum query advantage comes from encoding function structure into relative phase and designing interference that preserves the desired global property while cancelling irrelevant detail.',
    introduction: [
      'This module treats the oracle model carefully. A reversible query is an interface whose use count may be separated from its gate-construction cost. Phase kickback turns output information into input-register phase. Deutsch–Jozsa and Bernstein–Vazirani reveal promised global structure, while Simon’s algorithm produces linear constraints on a hidden XOR period.',
      'The final lesson audits complexity claims. Query savings do not automatically imply end-to-end runtime savings, especially when oracle construction, repetition, classical post-processing, and promise validation dominate.'
    ],
    lessons: [
      {
        title: 'The query model',
        question: 'What exactly counts as one use of a black-box function?',
        explanation: [
          'A classical function is embedded reversibly as $U_f|x,y\\rangle=|x,y\\oplus f(x)\\rangle$. The algorithm is charged for calls to this oracle while ordinary gates may be counted separately. A promise restricts which functions can occur and defines the classification task; without it, the advertised query bound may not apply.',
          'The model is valuable because it isolates information acquisition from implementation. It is also easy to misuse: a complicated oracle may hide the original problem’s cost. A complete analysis therefore reports query complexity, gate complexity, qubit count, oracle assumptions, success probability, and classical post-processing.'
        ],
        checkpoint: 'Define the input set, promise, oracle action, required output, and cost measure for one query problem.',
        transition: 'A particular target state converts this reversible bit oracle into a phase oracle through eigenvalue kickback.'
      },
      {
        title: 'Phase kickback',
        question: 'How can an operation on one register place a useful phase on another?',
        explanation: [
          'If the oracle target is $|−\\rangle$, an X operation contributes eigenvalue −1. The reversible XOR therefore returns the target to the same state while multiplying input component $|x\\rangle$ by $(-1)^{f(x)}$. Function information has moved into relative phase without copying a classical output string.',
          'Kickback is an instance of a broader eigenvalue rule: controlled-U acting on a U eigenstate places the eigenvalue phase on the control. This principle connects simple query algorithms to quantum phase estimation. The phase remains invisible until a later interference step changes measurement populations.'
        ],
        checkpoint: 'Follow $|x\\rangle|−\\rangle$ through a bit oracle algebraically and identify which factor is unchanged.',
        transition: 'Deutsch and Deutsch–Jozsa choose Hadamard interference so constant and balanced phase patterns become distinguishable.'
      },
      {
        title: 'Deutsch and Deutsch–Jozsa',
        question: 'How does a promise about global balance become one measurable amplitude?',
        explanation: [
          'After a uniform superposition and phase oracle, each input basis state carries sign $(-1)^{f(x)}$. The amplitude of all-zero after final Hadamards is the average of those signs. It has magnitude one for constant functions and vanishes for perfectly balanced functions, so the promise converts a global sum into a deterministic distinction.',
          'The result demonstrates interference-based query advantage, not the claim that all function values were individually read. The classical comparison depends on deterministic or randomized rules and on whether worst-case certainty is required. Gate-level oracle cost remains outside the ideal black-box count.'
        ],
        checkpoint: 'Derive the amplitude of $|0^n\\rangle$ as $2^{-n}\\sum_x(-1)^{f(x)}$ and evaluate both promised cases.',
        transition: 'Bernstein–Vazirani uses the same Fourier pattern but chooses a linear phase whose hidden bit string survives completely.'
      },
      {
        title: 'Bernstein–Vazirani',
        question: 'Why does a linear Boolean phase transform directly into its hidden coefficient string?',
        explanation: [
          'The promised function is $f_s(x)=s\\cdot x\\pmod2$. Its phase factor separates into a product across bits, so each qubit is either $|+\\rangle$ or $|−\\rangle$ depending on the corresponding secret bit. Final Hadamards map those X-basis signs to the computational string s.',
          'One ideal quantum query replaces n classical deterministic queries in the black-box model. The example also teaches a reusable idea: group characters are eigenfunctions of the Fourier transform. Simon and Shor generalize from a hidden linear coefficient to hidden subgroup or periodic structure.'
        ],
        checkpoint: 'Factor $(-1)^{s\\cdot x}$ into single-bit phases and derive the final product state.',
        transition: 'Simon’s problem introduces a two-to-one function whose hidden XOR period must be inferred from multiple random constraints.'
      },
      {
        title: 'Simon’s algorithm',
        question: 'How can measurements reveal a hidden XOR period without directly returning the period?',
        explanation: [
          'The promise $f(x)=f(x\\oplus s)$ pairs inputs. Measuring or discarding the output register leaves a coherent pair of inputs separated by s. Hadamards transform that pair so only strings y satisfying $y\\cdot s=0\\pmod2$ have nonzero amplitude.',
          'Each run yields one random linear equation, not s itself. Repetition collects enough independent rows, and classical Gaussian elimination over GF(2) finds the null-space candidate. Rank checks, verification queries, and the special case s=0 belong to the complete algorithm.'
        ],
        checkpoint: 'Derive the cancellation factor $1+(-1)^{y\\cdot s}$ and explain why it enforces orthogonality.',
        transition: 'The final lesson separates this query result from the total resources needed to realize and verify it.'
      },
      {
        title: 'Complexity with care',
        question: 'When does a query advantage become a meaningful computational advantage?',
        explanation: [
          'Complexity is a statement about how a specified resource scales with input size under an explicit access model. Query complexity ignores the internal oracle circuit by design. Gate complexity includes it; wall-clock experiments add compilation, repetitions, communication, and classical processing. These measures answer different questions and should not be substituted for one another.',
          'A fair claim states the promise, error probability, input representation, output requirement, and classical baseline. It also distinguishes asymptotic scaling from small-instance demonstrations. This discipline will be essential for Shor, linear solvers, simulation, and quantum machine learning, where data access or output extraction may erase an apparent exponential gain.'
        ],
        checkpoint: 'Write a complete resource claim for Bernstein–Vazirani that is true in the query model and does not overclaim end-to-end speed.',
        transition: 'Week 6 develops two deeper interference primitives: phase extraction through QFT and amplitude amplification through reflections.'
      }
    ],
    synthesis: 'The common algorithmic pattern is now explicit: prepare a structured superposition, encode a function into phase, interfere in a matching Fourier basis, and interpret the limited classical result with post-processing. Advantage belongs to the full specified model, not to superposition alone.'
  },

  6: {
    title: 'QFT, Phase Estimation, and Amplitude Amplification',
    essentialQuestion: 'How can controlled interference reveal hidden phase or rotate probability toward a desired subspace?',
    thesis: 'QFT-based phase extraction and Grover-style amplitude amplification are reusable transformations with precise input assumptions, precision costs, and geometric interpretations.',
    introduction: [
      'The first half of this module develops the Fourier basis, its circuit factorization, and quantum phase estimation. The second half develops Grover search and its generalization as repeated reflections. Although the algorithms look different, both engineer phase relationships that become measurable amplitudes.',
      'Implementation details matter: QFT output order, controlled powers, oracle synthesis, unknown solution counts, and noise can dominate. Small-register derivations should precede black-box library calls.'
    ],
    lessons: [
      {
        title: 'Fourier basis',
        question: 'What information does the QFT reorganize, and why is it useful for periodic structure?',
        explanation: [
          'The QFT maps a computational basis label x to phases rotating across output labels k. It is a change of basis on amplitudes, not a command that prints the classical Fourier transform of an arbitrary data array. Periodic patterns in one basis concentrate around reciprocal-frequency information in the other.',
          'For $N=2^n$, binary fractions allow the transformed state to factor into single-qubit phase states, up to reversed order. This product form explains the ladder of controlled rotations in the circuit and prepares the derivation of inverse QFT used by phase estimation.'
        ],
        checkpoint: 'Compute QFT on $|0\\rangle$, $|1\\rangle$, and one periodic superposition for N=4.',
        transition: 'The abstract sum is next decomposed into gates with explicit rotation angles and bit order.'
      },
      {
        title: 'QFT circuit',
        question: 'How does the Fourier transform factor into Hadamards, controlled phases, and swaps?',
        explanation: [
          'Each output qubit stores one binary fraction of the input as relative phase. A Hadamard creates the two branches and controlled phase gates add contributions from less significant input bits. Final swaps restore conventional bit order; omitting them is valid only if later interpretation compensates.',
          'Exact QFT uses $O(n^2)$ controlled rotations, many with very small angles. Approximate QFT drops rotations below a threshold, reducing depth while introducing bounded error. On real hardware, connectivity and two-qubit decomposition can make this trade-off more important than the abstract gate count.'
        ],
        checkpoint: 'Derive and draw the three-qubit QFT, then label which output qubit contains each binary fraction.',
        transition: 'Phase estimation uses controlled powers to write an eigenphase pattern that inverse QFT can decode.'
      },
      {
        title: 'Phase estimation',
        question: 'How can the phase of an eigenvalue be converted into a measured binary estimate?',
        explanation: [
          'If $U|\\psi\\rangle=e^{2\\pi i\\theta}|\\psi\\rangle$, controlled powers $U^{2^j}$ kick back phases encoding binary significance onto a counting register. Inverse QFT turns that phase gradient into a computational-basis estimate of θ. Exact t-bit phases become deterministic in the ideal circuit.',
          'A general input decomposes into U eigenstates, so measurement samples an eigenphase and projects the system accordingly. Precision qubits, approximation error, controlled-U cost, state overlap, and success probability determine usefulness. Phase estimation is powerful precisely when suitable eigenstates and controlled powers are available.'
        ],
        checkpoint: 'Trace a one-qubit eigenstate with phase 1/4 through a two-bit counting register.',
        transition: 'Grover abandons eigenphase readout and instead uses reflections to increase the norm of a marked component.'
      },
      {
        title: 'Grover search',
        question: 'Why do two phase reflections amplify a marked state?',
        explanation: [
          'Separate the state into normalized good and bad components. The oracle reflects the good component by changing its sign. The diffusion operation reflects about the prepared starting state. Two reflections compose to a rotation by twice the angle between their axes, moving amplitude toward the marked subspace.',
          'For M marked items among N, the starting good amplitude is $\\sin\\theta=\\sqrt{M/N}$. After k iterations the success probability is $\\sin^2((2k+1)\\theta)$. Continuing past the optimum rotates away again, so the iteration count is part of the algorithm rather than an arbitrary repetition budget.'
        ],
        checkpoint: 'For N=4 and M=1, calculate every amplitude after oracle and diffusion and explain why one iteration is exact.',
        transition: 'Amplitude amplification replaces uniform search with an arbitrary preparation and arbitrary definition of success.'
      },
      {
        title: 'Amplitude amplification',
        question: 'How does Grover’s geometry generalize beyond database search?',
        explanation: [
          'Let A prepare a state with success probability a. Reflection about the good subspace and reflection about $A|0\\rangle$ rotate within the two-dimensional good–bad plane, increasing success using $O(1/\\sqrt a)$ applications instead of $O(1/a)$ classical repetitions. The internal meaning of “good” may be any efficiently checkable predicate.',
          'When the number of solutions is unknown, fixed iteration counts can overshoot. Randomized schedules, counting, or fixed-point variants address this with different guarantees. Amplitude estimation builds on the Grover operator’s eigenphases to estimate probabilities, connecting the reflection and phase-estimation halves of the module.'
        ],
        checkpoint: 'Define A, the good projector, and both reflections for one non-uniform state-preparation example.',
        transition: 'The final lesson asks whether the controlled operations and oracles are cheap enough for the asymptotic improvements to survive.'
      },
      {
        title: 'Resource reasoning',
        question: 'Which hidden costs determine whether QFT or amplitude amplification is useful?',
        explanation: [
          'A QFT circuit may be polynomially small while controlled powers of U are enormous. Grover uses only $O(\\sqrt{N/M})$ queries, but each oracle and diffusion step must be synthesized. Ancillas, connectivity, arithmetic circuits, approximation accuracy, and uncomputation belong in the resource count.',
          'Noise changes the optimal depth because coherent advantage accumulates over repeated structured iterations. Resource estimates should report logical and physical qubits, two-qubit gates, T gates when fault tolerant, repetitions, and target error. The asymptotic theorem remains correct even when a particular implementation is impractical.'
        ],
        checkpoint: 'Create separate query-level and gate-level budgets for one phase-estimation or Grover instance.',
        transition: 'Week 7 embeds phase estimation inside number theory to obtain Shor’s order-finding algorithm.'
      }
    ],
    synthesis: 'The module supplies two reusable engines: one converts an eigenvalue phase into bits, and one rotates amplitude toward a desired subspace. Both require structured access, precise reflection or control operations, and resource accounting beyond the headline circuit.'
  },

  7: {
    title: 'Shor’s Algorithm and Quantum-Safe Cryptography',
    essentialQuestion: 'How does a periodic quantum state reveal factors of a composite integer, and what security conclusions actually follow?',
    thesis: 'Shor’s algorithm is a hybrid reduction: classical number theory turns factoring into order finding, a quantum subroutine estimates the order, and classical checks turn a valid order into factors.',
    introduction: [
      'The module builds the number-theory toolkit first: modular arithmetic, gcd, multiplicative order, efficient modular exponentiation, and continued fractions. It then proves the factoring reduction before opening the quantum order-finding subroutine. This order prevents the QFT from appearing as unexplained magic.',
      'The final lessons separate mathematical asymptotic impact from physical feasibility and distinguish post-quantum cryptography from quantum key distribution. Security statements name the attacked primitive and migration strategy rather than saying that “quantum breaks encryption.”'
    ],
    lessons: [
      {
        title: 'Number-theory toolkit',
        question: 'Which classical facts make order finding useful for factoring?',
        explanation: [
          'Modular arithmetic identifies integers that differ by multiples of N. The Euclidean algorithm computes gcd efficiently, and repeated squaring computes large modular powers without constructing the enormous ordinary power. For $\\gcd(a,N)=1$, the powers of a eventually repeat; the least positive r with $a^r\\equiv1\\pmod N$ is the multiplicative order.',
          'Continued fractions recover a small-denominator rational approximation from a measured binary fraction. In Shor, it proposes s/r from y/$2^t$, after which modular exponentiation validates the denominator. This validation is essential because finite precision and non-coprime numerators can return divisors or incorrect candidates.'
        ],
        checkpoint: 'Build a power table modulo 15, find an order, and recover one nearby fraction with continued fractions.',
        transition: 'The next lesson proves why a suitable even order creates a nontrivial square root of one and therefore a factor.'
      },
      {
        title: 'Factoring reduction',
        question: 'Why does an even order often reveal a factor of N?',
        explanation: [
          'If r is even, then $a^r-1=(a^{r/2}-1)(a^{r/2}+1)$ is divisible by N. If $a^{r/2}$ is not congruent to −1 modulo N, neither factor is trivially divisible by all of N, so gcd with N can expose nontrivial factors. The algebra explains both success and failure conditions.',
          'A random base may already share a factor with N, giving an immediate gcd shortcut. Otherwise the order may be odd or yield the unhelpful −1 case, so the algorithm retries. Randomness and verification are part of the designed workflow, not evidence that the quantum subroutine is unreliable.'
        ],
        checkpoint: 'Factor 15 with a=2 and exhibit a base that produces an unhelpful attempt.',
        transition: 'The remaining hard task is estimating the order without enumerating all modular powers classically.'
      },
      {
        title: 'Quantum order finding',
        question: 'How is multiplicative order encoded as an eigenphase or periodic interference pattern?',
        explanation: [
          'Reversible modular multiplication by a acts on residues as a unitary. Within the cycle generated from 1, its eigenstates have phases $e^{2\\pi is/r}$. Phase estimation on this unitary samples approximations to s/r. An equivalent periodic-superposition picture leads to the same Fourier peaks.',
          'The circuit needs coherent modular arithmetic, controlled powers, sufficient precision, inverse QFT, and a state with support on the relevant eigenvectors. Its output is a measured integer y, not r. Continued fractions, candidate testing, and possible repetition complete the extraction.'
        ],
        checkpoint: 'For a small modular cycle, construct its Fourier eigenstates and verify the multiplication eigenvalues.',
        transition: 'The full Shor workflow now assembles base selection, order finding, rational reconstruction, gcd extraction, and retry logic.'
      },
      {
        title: 'End-to-end Shor workflow',
        question: 'What must happen before and after the quantum circuit for factoring to succeed?',
        explanation: [
          'Classical preprocessing checks that N is composite and handles easy cases, then chooses a random base and computes a gcd. The quantum subroutine returns phase samples. Classical continued fractions proposes an order, modular exponentiation validates it, and parity plus gcd conditions determine whether factors were found.',
          'A complete implementation records failure paths and resource requirements. Small demonstrations often compile a special circuit with known structure for N=15; they illustrate interference but do not represent scalable modular exponentiation. Honest reporting separates a compiled demonstration from a general factoring implementation.'
        ],
        checkpoint: 'Write pseudocode containing every validation and retry, with a precise interface for the quantum subroutine.',
        transition: 'The mathematical scaling threatens particular public-key assumptions, but practical risk depends on fault-tolerant resources.'
      },
      {
        title: 'Cryptographic impact',
        question: 'Which cryptographic systems are threatened, and by what type of quantum algorithm?',
        explanation: [
          'Shor efficiently solves integer factoring and discrete logarithms in the ideal fault-tolerant model. This threatens RSA, finite-field Diffie–Hellman, and elliptic-curve systems used for key establishment and signatures. Grover affects exhaustive key search only quadratically, so symmetric key sizes can be adjusted differently.',
          'Risk analysis combines algorithmic complexity, logical resources, error-correction overhead, and the lifetime of protected data. “Harvest now, decrypt later” can motivate migration before a large quantum computer exists. The response is inventory and standards-based transition, not adding the word quantum to existing encryption.'
        ],
        checkpoint: 'Create a table mapping RSA, ECC, AES, and hashing to the relevant quantum effect and mitigation.',
        transition: 'The final lesson distinguishes two very different responses: classical post-quantum algorithms and quantum communication protocols.'
      },
      {
        title: 'PQC versus QKD',
        question: 'How do post-quantum cryptography and quantum key distribution solve different problems?',
        explanation: [
          'PQC uses classical algorithms whose security relies on problems believed resistant to classical and quantum attacks. It runs on conventional networks and supports encryption, key establishment, and signatures with deployment trade-offs. QKD uses quantum states and an authenticated classical channel to establish keys with disturbance-based security under specific device assumptions.',
          'QKD does not replace authentication, endpoint security, or general public-key functionality, and it requires specialized infrastructure. PQC does not require a quantum computer. A responsible comparison names threat models, trust assumptions, distance and hardware constraints, standardization maturity, and integration cost.'
        ],
        checkpoint: 'Given one organization scenario, justify whether PQC, QKD, both, or neither addresses the actual requirement.',
        transition: 'Week 8 turns from algorithmic ideals to the noise and fault-tolerance problem that any large Shor implementation must solve.'
      }
    ],
    synthesis: 'Shor is no longer a black-box QFT story. It is a chain of reductions with explicit failure modes, classical validation, and demanding coherent arithmetic. Its cryptographic consequence is targeted and serious, while migration choices depend on the primitive and deployment environment.'
  },

  8: {
    title: 'Noise, Quantum Channels, and Error Correction',
    essentialQuestion: 'How can fragile continuous quantum amplitudes be protected by discrete syndrome information?',
    thesis: 'Open-system noise is described by physical channels, while quantum codes store logical information nonlocally so errors can be diagnosed without measuring the logical amplitudes.',
    introduction: [
      'This module replaces one generic “error rate” with a taxonomy of relaxation, dephasing, readout error, coherent miscalibration, crosstalk, leakage, and memory effects. Quantum channels provide the mathematical model. Error correction then uses encoded subspaces, Pauli discretization, syndromes, stabilizers, and fault-tolerant procedures.',
      'The conceptual progression matters: simulate a specified channel, understand what information the environment gained, then see how a code separates logical state from error syndrome. Error mitigation and suppression may improve estimates but are not substitutes for scalable fault tolerance.'
    ],
    lessons: [
      {
        title: 'Open-system noise',
        question: 'Which physical mechanisms change a qubit, and how can experiments distinguish them?',
        explanation: [
          'Energy relaxation moves excited population toward equilibrium and is summarized by T1 in a simple model. Dephasing destroys relative phase and contributes to T2. Readout error acts on classical outcomes, coherent over-rotation accumulates systematically, crosstalk couples operations, and leakage leaves the computational subspace. These mechanisms are not interchangeable probabilities.',
          'A model states where noise acts, whether errors are independent, stationary, Markovian, or correlated, and how parameters were estimated. Calibration experiments, randomized benchmarking, tomography, and application-level validation observe different summaries. Choosing a channel is therefore part of the scientific hypothesis.'
        ],
        checkpoint: 'For one unexpected count distribution, list several distinct mechanisms that could produce it and one diagnostic for each.',
        transition: 'Quantum channels turn those physical hypotheses into trace-preserving maps on density operators.'
      },
      {
        title: 'Quantum channels',
        question: 'What mathematical maps represent physically allowed open-system evolution?',
        explanation: [
          'A channel is a completely positive trace-preserving linear map. The Kraus form $\\mathcal E(\\rho)=\\sum_kE_k\\rho E_k^\\dagger$ guarantees trace preservation when $\\sum_kE_k^\\dagger E_k=I$. Complete positivity ensures the map remains valid even when the system is entangled with an untouched reference.',
          'Bit flip, phase flip, depolarizing, dephasing, and amplitude damping capture different geometries and physical stories. Kraus representations are not unique, so observable predictions belong to the channel rather than a privileged list of operators. Composition order determines how sequential noise changes the state.'
        ],
        checkpoint: 'Verify the completeness relation for amplitude damping and compute its action on both populations and coherence.',
        transition: 'Error correction becomes possible by encoding information so likely channel effects move the state into distinguishable syndrome sectors.'
      },
      {
        title: 'Why correction is possible',
        question: 'How can a code diagnose an error without learning the unknown logical state?',
        explanation: [
          'Encoding maps $\\alpha|0\\rangle+\\beta|1\\rangle$ into a subspace whose logical amplitudes are distributed across several qubits. Syndrome observables commute with logical information but respond differently to error operators. Measuring them reveals an error class while preserving α and β inside the code space.',
          'Although physical errors may be continuous combinations, the effect on a code can be expanded in the Pauli operator basis. Correcting basis errors corrects their coherent combinations under the quantum error-correction conditions. This discretization follows from linearity; it is not an assumption that nature produces only X, Y, or Z flips.'
        ],
        checkpoint: 'Explain syndrome extraction for a repetition code using projectors or stabilizers without saying that the logical bit was measured.',
        transition: 'Introductory repetition and Shor codes make the encoding–syndrome–recovery cycle concrete.'
      },
      {
        title: 'Introductory codes',
        question: 'What can repetition codes protect, and why is the nine-qubit Shor construction broader?',
        explanation: [
          'The three-qubit bit-flip code maps logical basis states to 000 and 111. Pairwise parity syndromes locate one X error, but the code does not protect arbitrary phase error. Applying a basis change gives a phase-flip analogue. Concatenating these ideas yields the Shor code, which corrects any single-qubit error.',
          'Code distance d is the minimum weight of an undetectable logical operation. A distance-d code corrects arbitrary errors on up to $\\lfloor(d-1)/2\\rfloor$ qubits under the assumed model. More physical qubits do not automatically imply better performance; syndrome circuits and recovery operations also fail.'
        ],
        checkpoint: 'Build the complete two-bit syndrome table for every single X error in the repetition code.',
        transition: 'Stabilizer formalism replaces codeword-by-codeword reasoning with a scalable algebra of commuting Pauli constraints.'
      },
      {
        title: 'Stabilizer formalism',
        question: 'How can a quantum code be defined by observables rather than a list of codewords?',
        explanation: [
          'A stabilizer code is the simultaneous +1 eigenspace of an Abelian subgroup of the Pauli group that excludes −I. Independent commuting generators specify the full group compactly. An error anticommutes with selected generators, flipping their measured signs and producing a syndrome.',
          'Logical operators commute with every stabilizer while acting nontrivially inside the code space. Operators differing by a stabilizer have the same logical action. The notation $[[n,k,d]]$ records physical qubits, encoded qubits, and distance, while degeneracy captures distinct physical errors with equivalent action on the code.'
        ],
        checkpoint: 'For a small stabilizer code, compute each single-Pauli syndrome and identify a pair of equivalent errors if one exists.',
        transition: 'A useful code must be operated without letting one physical fault spread into an uncorrectable pattern.'
      },
      {
        title: 'Fault tolerance',
        question: 'How can correction itself be performed without becoming the dominant source of logical failure?',
        explanation: [
          'Fault-tolerant gadgets limit error propagation so a small number of physical faults produces a correctable pattern. Transversal gates, verified ancillas, repeated syndrome extraction, decoding, and carefully designed measurements are tools toward this goal. No single code supports every desired logical gate transversally.',
          'Threshold theorems state that arbitrarily reliable computation is possible below specified noise assumptions with increasing overhead. Practical estimates require a code family, decoder, architecture, cycle time, physical error model, and target logical failure rate. Error suppression and mitigation can help present experiments but do not create indefinitely scalable logical qubits.'
        ],
        checkpoint: 'Trace how one CNOT fault can propagate and describe the property a fault-tolerant alternative must enforce.',
        transition: 'Week 9 uses noisy circuits to simulate Hamiltonian dynamics and separates physical noise from approximation error.'
      }
    ],
    synthesis: 'Noise is now a modelled physical process rather than a generic imperfection. Channels describe open evolution, codes create syndrome structure, stabilizers organize it, and fault tolerance controls error propagation. Every protection claim must name its channel assumptions and logical performance measure.'
  },

  9: {
    title: 'Hamiltonians and Quantum Simulation',
    essentialQuestion: 'How can a physical model written as a Hamiltonian be converted into circuits and verified?',
    thesis: 'Quantum simulation is a chain from model assumptions to Pauli representation, approximate time evolution, measurement, and convergence evidence.',
    introduction: [
      'The module begins with Hamiltonians as energy observables and generators of dynamics. Pauli decompositions translate qubit models into measurable and evolvable terms. Matrix exponentials define exact time evolution, while Trotter–Suzuki formulas approximate sums of non-commuting terms with implementable products.',
      'A spin-model case study ties the pieces together. Verification then separates model error, product-formula error, finite-shot uncertainty, device noise, and classical-reference limits.'
    ],
    lessons: [
      {
        title: 'Hamiltonian mechanics',
        question: 'Why does one Hermitian operator determine both energy measurement and time evolution?',
        explanation: [
          'The Hamiltonian’s eigenvectors are stationary energy states and its eigenvalues are measured energies. Schrödinger evolution $e^{-iHt}$ gives each energy component a phase proportional to energy and time. Relative phase between components changes observables even though energy-basis populations remain fixed for a time-independent H.',
          'An observable commuting with H is conserved under this evolution. Ground-state preparation, spectral gaps, correlation functions, and response all begin from the Hamiltonian model, so units, boundary conditions, locality, and parameter conventions must be stated before implementing a circuit.'
        ],
        checkpoint: 'Diagonalize a two-level Hamiltonian and write the exact evolved state for a superposed initial condition.',
        transition: 'Pauli strings provide a complete operator basis that translates qubit Hamiltonians into circuit primitives.'
      },
      {
        title: 'Pauli decompositions',
        question: 'How can an arbitrary qubit observable be represented and measured through Pauli strings?',
        explanation: [
          'Tensor products of I, X, Y, and Z form an orthogonal basis for operators on n qubits. Coefficients are obtained from Hilbert–Schmidt inner products, turning a dense Hamiltonian into a weighted Pauli sum. Physical locality often keeps only low-weight terms even though the complete basis has $4^n$ elements.',
          'Each Pauli term is measured after local basis rotations, and commuting terms may sometimes share measurement settings. Coefficient magnitude, grouping, shot allocation, and hardware basis changes affect estimation cost. Endian conventions again determine which string acts on which qubit.'
        ],
        checkpoint: 'Decompose one two-qubit matrix into Pauli strings and reconstruct it numerically.',
        transition: 'Exponentiating those Pauli terms turns the static model into a time-evolution circuit.'
      },
      {
        title: 'Time-evolution unitaries',
        question: 'How is $e^{-iHt}$ implemented when H is one Pauli string or a sum?',
        explanation: [
          'For a single Pauli string P, basis changes map non-Z factors to Z, a parity network accumulates the joint eigenvalue, an Rz rotation applies the phase, and the network is uncomputed. This realizes $e^{-i\\theta P}$ with a transparent relationship between algebra and gates.',
          'A general Hamiltonian sum may be exponentiated exactly only for small matrices or special commuting structure. Time-dependent Hamiltonians require time ordering or stepwise approximation. Circuit libraries can package evolution gates, but verification should compare their synthesized action with a classical matrix exponential on small systems.'
        ],
        checkpoint: 'Derive a circuit for $e^{-i\\theta X\\otimes Z}$ and verify it on all computational basis states after basis conversion.',
        transition: 'Non-commuting sums require product formulas or other simulation algorithms with controlled approximation error.'
      },
      {
        title: 'Lie–Trotter and Suzuki formulas',
        question: 'How does non-commutation create simulation error, and how is the error traded against depth?',
        explanation: [
          'If A and B commute, $e^{-it(A+B)}=e^{-itA}e^{-itB}$ exactly. Otherwise the first-order product introduces commutator-dependent error. Repeating r shorter steps reduces that error while multiplying circuit depth. Higher-order Suzuki formulas cancel more terms but use longer structured sequences.',
          'Convergence should be demonstrated by sweeping step count and comparing observables or state distance to an exact small-system reference. On hardware, increasing r may reduce algorithmic error while increasing noise, producing an optimum that cannot be inferred from Trotter theory alone.'
        ],
        checkpoint: 'Compare exact and first-order evolution for two non-commuting one-qubit terms and measure error versus r.',
        transition: 'A concrete spin model now shows how preparation, evolution, and measurement form one scientific experiment.'
      },
      {
        title: 'A spin-model case study',
        question: 'How do we design a complete simulation experiment for an Ising or Heisenberg chain?',
        explanation: [
          'Start by specifying the Hamiltonian, chain length, boundaries, couplings, initial state, evolution interval, and observable. A transverse-field Ising model separates ZZ interaction terms from X field terms, making non-commutation and product-formula structure visible. Initial product states provide interpretable baselines.',
          'Track magnetization, domain correlations, or energy over time. Predict conserved quantities and limiting cases before running. The circuit record should include decomposition, step count, transpiled depth, shot allocation, and seed so deviations can be attributed rather than merely plotted.'
        ],
        checkpoint: 'Write an experimental protocol for a three-spin quench with one main observable and two sanity checks.',
        transition: 'The final lesson turns comparison and convergence into an explicit verification strategy.'
      },
      {
        title: 'Verification and scaling',
        question: 'What evidence supports the claim that a quantum simulation represents the intended physics?',
        explanation: [
          'Small instances should be compared with exact diagonalization or dense matrix evolution. Step-size convergence isolates product-formula error; repeated sampling estimates statistical uncertainty; ideal and noisy backends separate compilation from device effects. Symmetries and conserved quantities provide model-based diagnostics.',
          'Classical exact methods scale exponentially, but tensor networks, Monte Carlo, and problem structure provide stronger baselines for many systems. A quantum advantage claim must compare against the best relevant classical method and include state preparation, observable estimation, and error-control overhead—not just evolution gate count.'
        ],
        checkpoint: 'Create an error budget with separate rows for model, Trotter, synthesis, shots, and hardware noise.',
        transition: 'Week 10 uses measured Hamiltonian expectations as objectives inside hybrid variational optimization.'
      }
    ],
    synthesis: 'A simulation result is now the endpoint of a traceable chain: define a physical Hamiltonian, encode it in Pauli terms, synthesize or approximate evolution, measure chosen observables, and demonstrate convergence against independent evidence.'
  },

  10: {
    title: 'Variational Quantum Algorithms',
    essentialQuestion: 'How can a parameterized quantum state and a classical optimizer form a reproducible scientific method?',
    thesis: 'A variational algorithm is not only an ansatz and optimizer; it is a noisy estimation loop whose expressibility, measurement cost, baselines, and uncertainty must all be controlled.',
    introduction: [
      'This module decomposes the hybrid loop into parameterized circuits, expectation objectives, classical optimization, and two canonical applications: VQE and QAOA. Each component has independent failure modes. The final lesson turns those risks into an experimental protocol.',
      'Exact statevector studies establish implementation correctness. Finite-shot and noisy studies then add one complication at a time. Claims are based on repeated runs, convergence histories, classical references, and total circuit evaluations rather than a single best number.'
    ],
    lessons: [
      {
        title: 'Parameterized circuits',
        question: 'Which state family can an ansatz reach, and at what circuit cost?',
        explanation: [
          'An ansatz is a map from parameters to normalized quantum states. Rotation gates create tunable local coordinates and entanglers couple them. Expressibility is useful only when the reachable family contains good solutions and the circuit remains trainable and implementable. More parameters can add redundancy, noise, and flat directions.',
          'Problem-inspired ansätze preserve symmetries or known structure; hardware-efficient ansätze prioritize native depth. Initialization, entanglement pattern, parameter sharing, two-qubit depth, and gradient behavior should be documented. The ansatz is a modelling assumption analogous to choosing a hypothesis class in machine learning.'
        ],
        checkpoint: 'Characterize the exact state family reachable by a one-qubit Ry ansatz and identify a target it cannot represent if phase is needed.',
        transition: 'The chosen state becomes useful only after an observable and measurement strategy define a scalar objective.'
      },
      {
        title: 'Expectation-value objectives',
        question: 'How is a physical or combinatorial objective estimated from circuit measurements?',
        explanation: [
          'For $H=\\sum_j a_jP_j$, the objective is a weighted sum of Pauli expectations. Each expectation comes from sampled eigenvalues after a basis change. Grouping compatible terms and allocating shots strategically can reduce cost, but covariance and coefficient magnitude determine the final uncertainty.',
          'Exact estimators are debugging references; device estimators add sampling and hardware effects. An objective report includes mean, uncertainty, shots, grouping rule, circuit count, and mitigation settings. Optimizers otherwise react to noise whose scale is unknown.'
        ],
        checkpoint: 'Design a measurement plan and variance estimate for a three-term two-qubit Hamiltonian.',
        transition: 'A classical optimizer must navigate this parameterized, possibly noisy objective landscape.'
      },
      {
        title: 'Classical optimization',
        question: 'How do optimizer choice and measurement noise change the training problem?',
        explanation: [
          'Gradient-free methods tolerate some noise but may require many evaluations; gradient methods use local structure but can suffer from shot variance or barren plateaus. Parameter-shift rules estimate exact derivatives of common gates through shifted circuit evaluations, increasing quantum-call cost in proportion to parameter count.',
          'Initialization, learning rate, constraints, stopping conditions, multiple restarts, and random seeds can dominate results. Training history should record both objective estimates and uncertainty. A low final value from one seed is evidence of a run, not of robust algorithm performance.'
        ],
        checkpoint: 'Compare the circuit-evaluation cost of a full parameter-shift gradient with a gradient-free step for p parameters.',
        transition: 'VQE gives the loop physical meaning through the variational upper bound on ground energy.'
      },
      {
        title: 'VQE',
        question: 'Why does minimizing an expectation value approximate a ground state?',
        explanation: [
          'Expanding any normalized trial state in the energy eigenbasis shows that its expected energy is a probability-weighted average of eigenvalues and therefore cannot fall below the ground energy. Optimization searches the ansatz family for the smallest reachable expectation, yielding an upper bound in the ideal mathematical setting.',
          'Accuracy depends on ansatz bias, optimizer success, measurement error, Hamiltonian representation, and noise. Exact diagonalization on small instances provides the ground truth. Energy agreement alone may not imply state fidelity when levels are close, so additional observables and overlap diagnostics can be necessary.'
        ],
        checkpoint: 'Derive the variational bound from the eigenbasis expansion and identify when equality holds.',
        transition: 'QAOA applies a related alternating-circuit structure to cost functions over bit strings.'
      },
      {
        title: 'QAOA',
        question: 'How do alternating cost and mixer evolutions bias samples toward good combinatorial solutions?',
        explanation: [
          'A classical objective is mapped to a diagonal cost Hamiltonian whose eigenvalues encode bit-string quality. A mixer Hamiltonian moves amplitude between candidate strings. Alternating their evolutions for p layers creates an interference pattern controlled by angles γ and β, and optimization raises expected cost or solution probability.',
          'Expected objective and best sampled solution answer different questions. Performance depends on mapping, graph structure, depth, parameter strategy, shot budget, and classical baseline. Small p may be classically simulable, so empirical comparisons should include standard heuristics and approximation ratios.'
        ],
        checkpoint: 'Map a single-edge Max-Cut problem to a cost Hamiltonian and solve the p=1 expectations analytically.',
        transition: 'The final lesson packages all components into experiments that can be audited and reproduced.'
      },
      {
        title: 'Reliable experiments',
        question: 'What makes a variational result credible rather than merely successful once?',
        explanation: [
          'A reproducible study fixes data and Hamiltonian versions, preprocessing, ansatz, backend, compilation, optimizer, seeds, shot budgets, and stopping rules. Multiple restarts reveal variability. Learning curves show whether progress came from optimization or selection among lucky runs.',
          'Classical exact and heuristic baselines define the value of the result. Ablations vary one design choice at a time. Uncertainty intervals, total quantum evaluations, runtime, and negative outcomes belong in the report. This structure turns a hybrid demo into a scientific experiment.'
        ],
        checkpoint: 'Draft a minimal experiment table that another researcher could use to reproduce one VQE or QAOA result.',
        transition: 'Week 11 applies the same evidence standards when circuits are used as feature maps or classifiers.'
      }
    ],
    synthesis: 'The variational loop is now a complete experimental system: the ansatz defines reachable states, measurements define an uncertain objective, the optimizer consumes evaluations, and evidence comes from repeated controlled comparisons with classical references.'
  },

  11: {
    title: 'Quantum Machine Learning and Data Encoding',
    essentialQuestion: 'When does a quantum representation contribute useful inductive bias rather than hidden cost?',
    thesis: 'Quantum machine learning must be evaluated end to end: data loading, feature geometry, circuit trainability, sampling, classical baselines, and generalization all belong in the model.',
    introduction: [
      'The module first locates QML among combinations of classical and quantum data and models. It then compares encoding schemes before treating feature maps, kernels, and variational classifiers. The final lesson defines evidence standards that prevent larger Hilbert space or small training accuracy from being mistaken for advantage.',
      'Every experiment starts with a data question, not a circuit. The feature map is an inductive bias whose geometry should match the problem. Data splitting, preprocessing, hyperparameter parity, execution count, and uncertainty remain visible throughout.'
    ],
    lessons: [
      {
        title: 'Where QML fits',
        question: 'Which part of the learning pipeline is quantum, and what benefit is being tested?',
        explanation: [
          'Classical data may feed a quantum model, quantum data may be processed by classical shadows or learned models, or both data and model may be quantum. These settings have different access assumptions. Loading an ordinary classical table into amplitudes is not equivalent to receiving a state naturally from a quantum experiment.',
          'A research question should name the task, dataset source, output metric, classical comparator, and proposed quantum mechanism. Possibilities include a hard-to-simulate kernel, a compact representation of quantum data, or a hardware-relevant sampling model. “Uses qubits” is not a mechanism.'
        ],
        checkpoint: 'Classify one proposed QML experiment by data type, model type, access model, and claimed benefit.',
        transition: 'Data encoding is the interface that determines which distinctions the quantum model can see.'
      },
      {
        title: 'Data encoding',
        question: 'How do qubit count, preparation depth, normalization, and information geometry trade off?',
        explanation: [
          'Basis encoding maps bits directly to computational states. Angle and phase encoding use local rotations and usually shallow product states. Dense angle encoding places two features in one qubit’s polar and azimuthal angles. Amplitude encoding stores N normalized values in log N qubits but generic state preparation can require work proportional to N.',
          'Preprocessing is part of the model. Amplitude normalization can remove scale; phase encoding is periodic; angle ranges affect sensitivity; padding introduces structure. Resource comparisons include feature computation, repeated data loading for every circuit call, and what measurement can recover from the encoded state.'
        ],
        checkpoint: 'For one four-feature dataset, compare basis, angle, and amplitude encoding by qubits, depth, lost information, and readout goal.',
        transition: 'A feature map adds trainable or fixed transformations that define inner products in quantum state space.'
      },
      {
        title: 'Feature maps',
        question: 'What geometry does $U(x)|0\\rangle$ impose on the dataset?',
        explanation: [
          'A quantum feature map sends each input to a normalized state. The overlap between states defines similarity, so rotation functions, entangling pattern, repetitions, and data re-uploading determine the model’s inductive bias. Two nearby classical points need not remain nearby unless the map is designed that way.',
          'Entanglement can create interactions between features but also increases depth and may remain classically simulable for certain structures. A useful analysis visualizes overlap matrices, tests sensitivity to scaling, performs ablations, and estimates transpiled two-qubit cost rather than assuming a high-dimensional space is automatically expressive.'
        ],
        checkpoint: 'For a two-feature rotation map, derive its state overlap and identify which classical differences it ignores.',
        transition: 'Quantum kernels use these overlaps directly as inputs to a classical kernel method.'
      },
      {
        title: 'Quantum kernels',
        question: 'How does a fidelity matrix become a learning algorithm, and where can noise enter?',
        explanation: [
          'The fidelity kernel $K(x_i,x_j)=|\\langle\\phi(x_i)|\\phi(x_j)\\rangle|^2$ is symmetric and positive semidefinite in the exact model. A classical method such as a support-vector machine uses this Gram matrix without optimizing a quantum ansatz. The feature map, not the SVM, supplies the quantum-specific geometry.',
          'Finite shots and hardware noise perturb kernel entries, possibly breaking symmetry or positive semidefiniteness. Experiments should report how the matrix is estimated and corrected, compare linear and RBF kernels under equal tuning budgets, and separate training-kernel cost from prediction cost on new samples.'
        ],
        checkpoint: 'Construct a four-point fidelity kernel, inspect its eigenvalues, and compare its class separation with an RBF kernel.',
        transition: 'Variational classifiers instead optimize a measured decision function jointly with a parameterized circuit.'
      },
      {
        title: 'Variational classifiers',
        question: 'What exactly is learned when a feature map is followed by a trainable circuit and measurement?',
        explanation: [
          'The feature circuit prepares $|\\phi(x)\\rangle$, an ansatz $V(\\theta)$ transforms it, and one or more observables produce model outputs. A loss function compares those outputs with labels, and a classical optimizer updates θ. Decision thresholds, label encoding, class imbalance, and calibration matter as in classical classification.',
          'Trainability depends on ansatz depth, initialization, data distribution, gradients, shots, and noise. Data re-uploading may increase expressiveness while increasing execution cost. Evaluation must use untouched test data and repeated seeds; training accuracy alone cannot establish generalization or useful quantum behaviour.'
        ],
        checkpoint: 'Write the complete prediction function and trace how one training example contributes to one parameter update.',
        transition: 'The final lesson turns these modelling choices into an evidence standard for credible QML research.'
      },
      {
        title: 'Evidence standards',
        question: 'What evidence would support a meaningful quantum-learning claim?',
        explanation: [
          'Use fixed train, validation, and test splits; fit preprocessing only on training data; tune quantum and classical models with comparable effort; and report means with confidence intervals across seeds. Include strong linear, nonlinear, and task-specific baselines instead of one intentionally weak comparator.',
          'Resource accounting includes data preparation, transpilation, circuit depth, shots, queue or runtime, optimizer evaluations, and prediction cost. Scaling experiments should vary problem size rather than only circuit depth on one tiny dataset. Negative results and simulability analysis clarify where the proposed mechanism does not help.'
        ],
        checkpoint: 'Design a result table that includes accuracy, uncertainty, runtime, circuit calls, depth, and three classical baselines.',
        transition: 'The Research Notes section continues this methodology with open-ended topics such as data encoding and quantum linear solvers.'
      }
    ],
    synthesis: 'QML is now framed as model design and evidence, not as a promise attached to a quantum circuit. Encoding defines information geometry, kernels and variational circuits consume it differently, and end-to-end experiments determine whether the representation is useful.'
  }
};
