window.quantumLessonNotes = {
  '1-complex-amplitudes': {
    explanation: [
      'Quantum amplitudes are complex numbers, not probabilities. A state assigns an amplitude to every basis outcome; only after taking the squared magnitude do we obtain a measurement probability. This lets relative phase influence later interference even when two states have the same immediate measurement probabilities.',
      'Write a nonzero complex number as $z=re^{i\\phi}$. The magnitude $r$ affects probability weight, while $\\phi$ records phase. Multiplying an entire state by the same phase $e^{i\\gamma}$ changes no observable statistics, but changing the phase between components can change the result of a later basis rotation.'
    ],
    keyIdeas: [
      'Use $z^*$ and $|z|^2=z^*z$ when turning amplitudes into probabilities.',
      'Separate global phase from relative phase before comparing two state vectors.',
      'Use Euler’s identity $e^{i\\phi}=\\cos\\phi+i\\sin\\phi$ to move between algebraic and geometric forms.'
    ],
    example: 'The states $(|0\\rangle+|1\\rangle)/\\sqrt2$ and $(|0\\rangle-|1\\rangle)/\\sqrt2$ both give 50–50 outcomes in the Z basis. After a Hadamard, however, the first becomes $|0\\rangle$ and the second becomes $|1\\rangle$. The relative sign therefore stores physically accessible information.',
    pitfalls: ['Treating an amplitude itself as a probability.', 'Calling every phase irrelevant; only a phase common to the entire state is globally unobservable.']
  },
  '1-vectors-and-hilbert-spaces': {
    explanation: [
      'A pure quantum state is represented by a unit vector in a complex inner-product space. The coordinates depend on the selected basis, while the physical state does not. Changing basis changes the list of amplitudes, not the underlying vector.',
      'Orthogonal vectors represent perfectly distinguishable pure states. A basis for a qubit contains two orthonormal vectors; an $n$-qubit register has dimension $2^n$. This exponential dimension explains both the expressive state space and the difficulty of classical state-vector simulation.'
    ],
    keyIdeas: [
      'Normalization requires $\\langle\\psi|\\psi\\rangle=1$.',
      'A set is orthonormal when every vector has unit norm and distinct vectors have zero inner product.',
      'Coordinates are basis-dependent; inner products and physical predictions are basis-independent.'
    ],
    example: 'In the computational basis, $|+\\rangle=(1,1)^T/\\sqrt2$. In the X basis $\\{|+\\rangle,|-\\rangle\\}$, the same state has coordinates $(1,0)^T$. The vector is unchanged; only its coordinate description changes.',
    pitfalls: ['Confusing the number of qubits $n$ with the state-space dimension $2^n$.', 'Assuming any two normalized vectors are orthogonal.']
  },
  '1-inner-and-outer-products': {
    explanation: [
      'The inner product $\\langle\\phi|\\psi\\rangle$ measures overlap between vectors. Its squared magnitude becomes a transition or measurement probability when $|\\phi\\rangle$ is a measurement outcome. The inner product is conjugate-linear in the bra and linear in the ket.',
      'The outer product $|\\psi\\rangle\\langle\\phi|$ is an operator. In particular, $|u\\rangle\\langle u|$ projects onto the one-dimensional subspace spanned by a normalized vector $|u\\rangle$. A complete orthonormal basis satisfies $\\sum_i|i\\rangle\\langle i|=I$.'
    ],
    keyIdeas: [
      'Take a conjugate transpose when converting a ket into a bra.',
      'Use Cauchy–Schwarz to check that $|\\langle\\phi|\\psi\\rangle|\\le1$ for normalized states.',
      'Recognize projectors as Hermitian, idempotent operators: $P^\\dagger=P$ and $P^2=P$.'
    ],
    example: 'For $|+\\rangle=(|0\\rangle+|1\\rangle)/\\sqrt2$, the projector is $|+\\rangle\\langle+|=\\tfrac12\\begin{pmatrix}1&1\\\\1&1\\end{pmatrix}$. Applying it to $|0\\rangle$ returns $|+\\rangle/\\sqrt2$, whose squared norm is the probability $1/2$.',
    pitfalls: ['Writing a transpose where a conjugate transpose is required.', 'Confusing the scalar inner product with the matrix-valued outer product.']
  },
  '1-matrices-and-spectral-structure': {
    explanation: [
      'Quantum gates are unitary matrices, so they preserve inner products and total probability. Observables are Hermitian matrices, so their eigenvalues are real and their eigenvectors can be chosen as an orthonormal basis.',
      'The spectral theorem expresses a Hermitian operator as $A=\\sum_k a_kP_k$, where $a_k$ are possible measurement values and $P_k$ project onto their eigenspaces. Degenerate eigenvalues may correspond to projectors with rank greater than one.'
    ],
    keyIdeas: [
      'Check unitarity with $U^\\dagger U=I$ and Hermiticity with $A^\\dagger=A$.',
      'Diagonalization is a basis change into eigenvectors, not an element-by-element operation.',
      'Functions of an operator act on eigenvalues: $f(A)=\\sum_k f(a_k)P_k$.'
    ],
    example: 'The Pauli Z observable has decomposition $Z=|0\\rangle\\langle0|-|1\\rangle\\langle1|$. Its expectation in $|+\\rangle$ is zero because the outcomes $+1$ and $-1$ occur with equal probability.',
    pitfalls: ['Assuming every square matrix has an orthonormal eigenbasis.', 'Multiplying circuit matrices in the same visual order in which gates are drawn.']
  },
  '1-dirac-notation': {
    explanation: [
      'Dirac notation separates a vector $|\\psi\\rangle$, its dual $\\langle\\psi|$, scalar overlaps, and linear operators without committing to a particular coordinate basis. It is compact, but every expression still follows ordinary linear algebra.',
      'Read products by their type. A bra times a ket is a scalar; a ket times a bra is an operator; an operator acting on a ket returns a ket. Subscripts label systems, while tensor-product symbols are often omitted when the meaning is clear.'
    ],
    keyIdeas: [
      '$\\langle i|j\\rangle=\\delta_{ij}$ states orthonormality.',
      '$A|\\psi\\rangle$ applies an operator; $\\langle\\psi|A|\\psi\\rangle$ is an expectation value.',
      'Insert $I=\\sum_i|i\\rangle\\langle i|$ to expand a state or operator in a chosen basis.'
    ],
    example: 'Expanding $|\\psi\\rangle$ in an orthonormal basis gives $|\\psi\\rangle=I|\\psi\\rangle=\\sum_i|i\\rangle\\langle i|\\psi\\rangle$. The coefficient of $|i\\rangle$ is therefore the overlap $\\langle i|\\psi\\rangle$.',
    pitfalls: ['Treating bras and kets as decorative symbols instead of typed linear-algebra objects.', 'Dropping system labels when the operator placement is ambiguous.']
  },
  '1-tensor-products': {
    explanation: [
      'The tensor product combines quantum systems. If systems A and B have dimensions $d_A$ and $d_B$, their joint space has dimension $d_Ad_B$. Product states have the form $|a\\rangle\\otimes|b\\rangle$, but general joint states need not factor this way.',
      'Operator placement matters. $X\\otimes I$ and $I\\otimes X$ act on different factors, and their matrix forms depend on the chosen basis ordering. Establish a convention such as $|00\\rangle,|01\\rangle,|10\\rangle,|11\\rangle$ before calculating.'
    ],
    keyIdeas: [
      'Distribute tensor products over addition and multiply dimensions.',
      'Use $(A\\otimes B)(C\\otimes D)=AC\\otimes BD$ when dimensions match.',
      'A product of normalized states is normalized, but not every normalized joint state is a product state.'
    ],
    example: 'Using the basis order $|00\\rangle,|01\\rangle,|10\\rangle,|11\\rangle$, the state $|0\\rangle\\otimes|1\\rangle$ is $(0,1,0,0)^T$. Applying $X\\otimes I$ produces $|11\\rangle$, whereas $I\\otimes X$ produces $|00\\rangle$.',
    pitfalls: ['Switching endian or basis-order conventions mid-calculation.', 'Assuming juxtaposed qubit labels always imply an ordinary vector product.']
  },

  '2-the-computational-basis': {
    explanation: [
      'The computational basis $\\{|0\\rangle,|1\\rangle\\}$ is the default basis for representing and measuring a qubit. A normalized pure state $\\alpha|0\\rangle+\\beta|1\\rangle$ generally contains information that cannot be recovered from a single measurement.',
      'Preparing a state and reading it are different operations. Measurement returns a classical outcome sampled from a distribution; it does not reveal the complex amplitudes. Estimating a state requires many identically prepared copies and measurements in multiple bases.'
    ],
    keyIdeas: [
      'Computational-basis probabilities are $|\\alpha|^2$ and $|\\beta|^2$.',
      'Normalization leaves two real degrees of freedom after removing global phase.',
      'A basis state is a state vector, not the classical label printed after measurement.'
    ],
    example: 'For $|\\psi\\rangle=(\\sqrt3|0\\rangle+i|1\\rangle)/2$, Z-basis probabilities are $3/4$ and $1/4$. The factor $i$ has no effect on these two probabilities but can affect an X- or Y-basis measurement.',
    pitfalls: ['Saying a qubit literally stores both classical values at once.', 'Believing one measurement can reveal $\\alpha$ and $\\beta$.']
  },
  '2-born-rule-and-collapse': {
    explanation: [
      'A projective measurement with projectors $\\{P_m\\}$ produces outcome $m$ with probability $p(m)=\\langle\\psi|P_m|\\psi\\rangle$. Conditioned on that outcome, the post-measurement pure state is $P_m|\\psi\\rangle/\\sqrt{p(m)}$.',
      'Repeated shots estimate probabilities, not deterministic hidden values. The observed frequency fluctuates around the Born probability with sampling uncertainty that decreases as the number of shots grows.'
    ],
    keyIdeas: [
      'Probabilities over a complete measurement sum to one because $\\sum_mP_m=I$.',
      'The post-measurement rule is conditional on the recorded outcome.',
      'A second measurement in the same projective basis repeats the first result in the ideal model.'
    ],
    example: 'Measuring $|+\\rangle$ in the Z basis gives 0 or 1 with probability $1/2$. If the first result is 0, the state becomes $|0\\rangle$, so an immediate ideal Z measurement returns 0 with probability one.',
    pitfalls: ['Treating finite-shot frequencies as exact theoretical probabilities.', 'Applying “collapse” to an unconditioned ensemble without using a density matrix.']
  },
  '2-changing-measurement-basis': {
    explanation: [
      'Hardware often measures in the computational basis, but an observable can be measured by rotating its eigenbasis onto the Z basis first. A Hadamard before measurement converts an X-basis measurement into a Z-basis readout; $S^\\dagger H$ performs the analogous conversion for Y.',
      'Expectation values of Pauli observables follow from outcome counts. Map bit 0 to eigenvalue $+1$ and bit 1 to $-1$, then compute the sample average. For multi-qubit Pauli strings, multiply the eigenvalues from the relevant qubits.'
    ],
    keyIdeas: [
      'Basis rotation changes what property is measured, not the state-preparation history.',
      '$\\langle X\\rangle=p(+)-p(-)$, and similarly for Y and Z.',
      'Non-commuting observables generally require separate circuit executions.'
    ],
    example: 'To measure X on $|+\\rangle$, apply H and then measure Z. Since $H|+\\rangle=|0\\rangle$, the result is always 0, corresponding to X eigenvalue $+1$.',
    pitfalls: ['Calling H part of the algorithm when it is only a measurement-basis change.', 'Combining counts from incompatible measurement settings as if they came from one joint measurement.']
  },
  '2-bloch-sphere-geometry': {
    explanation: [
      'After normalization and removal of global phase, every single-qubit pure state can be written with two angles and placed on the unit Bloch sphere. The Bloch vector components are the Pauli expectations $(\\langle X\\rangle,\\langle Y\\rangle,\\langle Z\\rangle)$.',
      'Unitary single-qubit gates act as rotations of the Bloch vector. Mixed states occupy the interior of the sphere; the center represents the maximally mixed state. The picture does not generalize to a simple sphere for multiple qubits.'
    ],
    keyIdeas: [
      'Antipodal pure states are orthogonal.',
      'Latitude determines Z populations; longitude encodes relative phase.',
      'The Bloch-vector length is one for pure states and at most one for mixed states.'
    ],
    example: 'The state $(|0\\rangle+i|1\\rangle)/\\sqrt2$ has $(\\theta,\\phi)=(\\pi/2,\\pi/2)$ and Bloch vector $(0,1,0)$, so it is the $+1$ eigenstate of Y.',
    pitfalls: ['Using the Bloch sphere to visualize entanglement directly.', 'Mistaking a classical mixture at the sphere center for a coherent equal superposition on the surface.']
  },
  '2-density-matrices': {
    explanation: [
      'A density matrix represents both a known pure state and uncertainty over an ensemble. A valid density matrix is Hermitian, positive semidefinite, and has trace one. A pure state has $\\rho=|\\psi\\rangle\\langle\\psi|$ and satisfies $\\operatorname{Tr}(\\rho^2)=1$.',
      'Different ensembles can produce the same density matrix and are then operationally indistinguishable. Expectation values are computed as $\\langle A\\rangle=\\operatorname{Tr}(\\rho A)$, which remains valid for pure and mixed states.'
    ],
    keyIdeas: [
      'Diagonal entries are basis populations; off-diagonal entries encode coherence in that basis.',
      'Unitary evolution acts as $\\rho\\mapsto U\\rho U^\\dagger$.',
      'Purity lies between $1/d$ and 1 for a $d$-dimensional system.'
    ],
    example: 'The coherent state $|+\\rangle$ has density matrix $\\tfrac12\\begin{pmatrix}1&1\\\\1&1\\end{pmatrix}$, while an equal mixture of $|0\\rangle$ and $|1\\rangle$ has $I/2$. Their Z statistics match, but their X statistics differ.',
    pitfalls: ['Interpreting every matrix decomposition of $\\rho$ as physically unique.', 'Checking only trace one while ignoring positivity.']
  },
  '2-fundamental-limits': {
    explanation: [
      'The no-cloning theorem states that no fixed physical operation can copy every unknown quantum state perfectly. Linearity provides the contradiction: an operation that copies two basis states cannot also copy every superposition with the required cross terms.',
      'Non-orthogonal states cannot be perfectly distinguished in one shot. A measurement may trade inconclusive results against errors, but perfect deterministic discrimination is reserved for orthogonal states. These limits support quantum cryptographic protocols and constrain quantum communication.'
    ],
    keyIdeas: [
      'Known orthogonal basis states can be copied with a controlled gate; the theorem concerns arbitrary unknown states.',
      'No-cloning does not prevent state transfer because teleportation destroys the sender’s original state.',
      'Physical indistinguishability is determined by state overlap.'
    ],
    example: 'If a copier maps $|0\\rangle|0\\rangle$ to $|0\\rangle|0\\rangle$ and $|1\\rangle|0\\rangle$ to $|1\\rangle|1\\rangle$, linearity maps $|+\\rangle|0\\rangle$ to $(|00\\rangle+|11\\rangle)/\\sqrt2$, not to $|+\\rangle|+\\rangle$.',
    pitfalls: ['Claiming that quantum states can never be copied under any circumstances.', 'Confusing imperfect state estimation from many copies with forbidden perfect cloning of one unknown copy.']
  },

  '3-pauli-and-hadamard-gates': {
    explanation: [
      'The Pauli gates are both unitary transformations and observables. X exchanges $|0\\rangle$ and $|1\\rangle$; Z changes the sign of the $|1\\rangle$ amplitude; Y combines a bit flip with phase. Up to global phase, each is a $\\pi$ rotation about a Bloch axis.',
      'The Hadamard exchanges the Z and X bases: $H|0\\rangle=|+\\rangle$ and $H|1\\rangle=|-\\rangle$. Conjugation identities such as $HXH=Z$ make it a basis-change tool throughout algorithms and measurement circuits.'
    ],
    keyIdeas: [
      '$X^2=Y^2=Z^2=H^2=I$.',
      'Paulis anticommute in pairs, for example $XZ=-ZX$.',
      'A Z gate can affect later probabilities even though it does not change immediate Z-basis populations.'
    ],
    example: 'Starting from $|0\\rangle$, the sequence H–Z–H produces $|1\\rangle$. The middle Z only changes phase in the superposition basis, but the final H converts that relative phase into a deterministic bit flip.',
    pitfalls: ['Describing H as creating randomness in every context.', 'Ignoring global phase when comparing products such as $XY=iZ$.']
  },
  '3-phase-and-rotation-gates': {
    explanation: [
      'Phase and rotation gates provide continuous control of a qubit. $R_z(\\theta)=e^{-i\\theta Z/2}$ changes relative phase, while $R_x$ and $R_y$ rotate populations and phase together. The P gate differs from $R_z$ only by a global phase.',
      'Any single-qubit unitary can be decomposed, up to global phase, into three axis rotations such as $R_z(\\alpha)R_y(\\beta)R_z(\\gamma)$. Hardware compilers translate this abstract form into calibrated native pulses or basis gates.'
    ],
    keyIdeas: [
      '$S=P(\\pi/2)$ and $T=P(\\pi/4)$ are discrete phase gates.',
      'Rotation angles compose on the same axis modulo a global phase.',
      'Conjugation changes axes, for example $HR_z(\\theta)H=R_x(\\theta)$.'
    ],
    example: 'Applying $R_y(\\theta)$ to $|0\\rangle$ prepares $\\cos(\\theta/2)|0\\rangle+\\sin(\\theta/2)|1\\rangle$. Choosing $\\theta=\\pi/2$ gives an equal real superposition.',
    pitfalls: ['Treating P and $R_z$ matrices as exactly identical rather than equivalent up to global phase.', 'Using degrees where a software API expects radians.']
  },
  '3-controlled-operations': {
    explanation: [
      'A controlled operation applies U to a target subspace when the control condition is satisfied. The operator $|0\\rangle\\langle0|\\otimes I+|1\\rangle\\langle1|\\otimes U$ shows that the control itself is not measured.',
      'When the control is in superposition, a controlled gate can entangle control and target. CNOT copies computational-basis values into a zero target, but it does not clone arbitrary states; applying it to $|+\\rangle|0\\rangle$ produces a Bell state.'
    ],
    keyIdeas: [
      'Control and target roles are operationally distinct even when a circuit identity swaps their interpretation through basis changes.',
      'Controlled-Z is symmetric between its two wires.',
      'Controlled gates must be decomposed into the native connectivity and gate set of real hardware.'
    ],
    example: 'CNOT maps $|10\\rangle$ to $|11\\rangle$ and leaves $|00\\rangle$ unchanged. By linearity, it maps $(|00\\rangle+|10\\rangle)/\\sqrt2$ to $(|00\\rangle+|11\\rangle)/\\sqrt2$.',
    pitfalls: ['Saying the control wire is read or collapsed by a controlled gate.', 'Reversing the basis-state bit order when checking a CNOT matrix.']
  },
  '3-reversible-classical-logic': {
    explanation: [
      'Unitary operations are reversible, while ordinary classical gates such as AND erase information. A reversible embedding preserves the input and writes a function value into an additional register, typically with XOR: $|x,y\\rangle\\mapsto|x,y\\oplus f(x)\\rangle$.',
      'The Toffoli gate implements controlled-controlled X and can build reversible classical computations. Temporary ancillas store intermediate results, but they should be uncomputed so they do not remain entangled with the desired output.'
    ],
    keyIdeas: [
      'Reversibility requires a one-to-one map on computational-basis states.',
      'Compute–copy–uncompute is a standard method for clearing workspace.',
      'Ancilla count, Toffoli count, and T count are important resource measures.'
    ],
    example: 'A reversible AND can map $|a,b,0\\rangle$ to $|a,b,a\\land b\\rangle$ with a Toffoli. The first two bits remain available, so the mapping is invertible.',
    pitfalls: ['Resetting an entangled ancilla as if it were free.', 'Counting only logical Boolean gates while ignoring the cost of their fault-tolerant decomposition.']
  },
  '3-circuit-composition': {
    explanation: [
      'Circuit diagrams are read left to right in time, but matrix products act right to left on state vectors. Gates on disjoint qubits in the same layer can run in parallel in an abstract model; hardware scheduling may impose additional constraints.',
      'A circuit can be composed, inverted, controlled, or packaged as a reusable instruction. Measurements and resets are non-unitary and require classical outputs, so they change which algebraic manipulations are valid.'
    ],
    keyIdeas: [
      'Track wire order and classical-bit destinations explicitly.',
      'Distinguish circuit width, depth, total gate count, and two-qubit depth.',
      'Use barriers only to communicate intended boundaries; they can restrict optimization.'
    ],
    example: 'For gates $U$ followed by $V$, the final state is $VU|\\psi\\rangle$. If U and V act on disjoint qubits, their lifted operators commute and may be scheduled in the same depth layer.',
    pitfalls: ['Writing $UV|\\psi\\rangle$ when U is visually first.', 'Assuming a drawn circuit is already executable on a particular processor.']
  },
  '3-universal-gate-sets': {
    explanation: [
      'A gate set is universal when it can approximate any unitary to arbitrary accuracy. Arbitrary single-qubit gates together with any suitable entangling two-qubit gate form a common route to universality.',
      'Clifford gates are efficiently classically simulable in important settings and are not universal alone. Adding a non-Clifford resource such as T yields the Clifford+T set, which is central to fault-tolerant resource estimation.'
    ],
    keyIdeas: [
      'Exact universality and approximate universality are different claims.',
      'Synthesis accuracy trades against circuit length.',
      'In fault-tolerant designs, non-Clifford gates are often much more expensive than Clifford gates.'
    ],
    example: 'The set {H, T, CNOT} is approximately universal. H and T generate dense single-qubit rotations, while CNOT supplies entanglement between qubits.',
    pitfalls: ['Calling every entangling gate set universal without checking available single-qubit operations.', 'Comparing algorithms only by total gate count when T count or two-qubit depth dominates cost.']
  },

  '4-multi-qubit-state-spaces': {
    explanation: [
      'An $n$-qubit pure state has $2^n$ complex amplitudes indexed by bit strings. Normalization and global phase reduce the independent real parameters, but the description still grows exponentially. Measurement produces an $n$-bit sample, not the full amplitude table.',
      'Joint probabilities and correlations contain information not visible in individual marginals. Observables such as $Z\\otimes Z$ test parity: they return $+1$ for equal computational bits and $-1$ for unequal bits.'
    ],
    keyIdeas: [
      'Establish the basis-string ordering before mapping amplitudes to indices.',
      'Local operators are lifted with identities on untouched subsystems.',
      'Marginal probabilities come from summing joint probabilities over unobserved outcomes.'
    ],
    example: 'For $(|00\\rangle+|01\\rangle+|10\\rangle-|11\\rangle)/2$, every Z-basis string occurs with probability $1/4$. The minus sign is invisible in those probabilities but changes correlations after basis rotations.',
    pitfalls: ['Assuming equal-magnitude amplitudes imply an unstructured state.', 'Reading a state-vector index without checking the software endian convention.']
  },
  '4-product-versus-entangled-states': {
    explanation: [
      'A bipartite pure state is separable when it factors as $|a\\rangle_A\\otimes|b\\rangle_B$. If no such factorization exists, the state is entangled. Entanglement is defined relative to a chosen partition of the systems.',
      'The Schmidt decomposition writes any bipartite pure state as $\\sum_i\\sqrt{\\lambda_i}|u_i\\rangle|v_i\\rangle$. One nonzero Schmidt coefficient means a product state; more than one means entanglement. Equal coefficients across the available rank describe maximal entanglement.'
    ],
    keyIdeas: [
      'For a two-qubit coefficient matrix, rank one means separable.',
      'Local unitaries cannot change Schmidt coefficients or the amount of pure-state entanglement.',
      'Classical correlation can occur in a separable mixed state, so correlation alone does not prove entanglement.'
    ],
    example: 'The Bell state $(|00\\rangle+|11\\rangle)/\\sqrt2$ has coefficient matrix $\\operatorname{diag}(1,1)/\\sqrt2$, which has rank two. It therefore cannot be factored into two single-qubit states.',
    pitfalls: ['Calling every non-product-looking expression entangled before attempting a basis-independent test.', 'Equating perfect Z-basis correlation with proof of entanglement.']
  },
  '4-reduced-density-matrices': {
    explanation: [
      'The reduced state of A is obtained by taking the partial trace over B: $\\rho_A=\\operatorname{Tr}_B(\\rho_{AB})$. It reproduces the statistics of every measurement performed only on A and discards information available exclusively in joint correlations.',
      'A global pure state can have mixed reduced states. For bipartite pure states, the nonzero eigenvalues of $\\rho_A$ and $\\rho_B$ match the squared Schmidt coefficients, connecting local mixedness with entanglement.'
    ],
    keyIdeas: [
      'Trace over a subsystem in a fixed basis; the final reduced operator is basis-independent.',
      'Product pure states have pure reduced states.',
      'A maximally entangled two-qubit state gives $I/2$ on either single qubit.'
    ],
    example: 'For $|\\Phi^+\\rangle$, expanding $|\\Phi^+\\rangle\\langle\\Phi^+|$ and tracing over B removes cross terms with $\\langle0|1\\rangle=0$, leaving $\\rho_A=(|0\\rangle\\langle0|+|1\\rangle\\langle1|)/2$.',
    pitfalls: ['Deleting rows and columns instead of performing the partial trace.', 'Interpreting a mixed reduced state as classical ignorance about a pre-existing local pure state.']
  },
  '4-quantum-teleportation': {
    explanation: [
      'Teleportation transfers an unknown qubit state using one shared Bell pair, a two-bit classical message, and local operations. Alice performs a Bell-basis measurement on the input and her half of the pair; Bob applies a Pauli correction selected by the two classical outcomes.',
      'The protocol does not transmit matter, create a second copy, or communicate faster than light. Alice’s measurement destroys the original local encoding, and Bob cannot recover the state before receiving the classical bits.'
    ],
    keyIdeas: [
      'Entanglement is consumed as a resource.',
      'The four Bell-measurement outcomes correspond to corrections $I$, X, Z, or XZ under a fixed convention.',
      'The protocol succeeds for every input state by linearity, including states entangled with another system.'
    ],
    example: 'After Alice applies CNOT and H, the three-qubit state can be grouped into four classical branches. In each branch Bob’s qubit is one Pauli away from $|\\psi\\rangle$; the two measured bits identify that Pauli.',
    pitfalls: ['Omitting the classical communication step.', 'Claiming that Alice can learn the amplitudes of the teleported state from her two measurement bits.']
  },
  '4-superdense-coding': {
    explanation: [
      'Superdense coding sends two classical bits by transmitting one qubit, provided sender and receiver already share a Bell pair. Alice selects one of four local Pauli operations, which maps the shared pair to one of four orthogonal Bell states.',
      'Bob receives Alice’s qubit and performs a Bell-basis decoding circuit. Because the four Bell states are orthogonal, the two-bit message can be recovered deterministically in the ideal model.'
    ],
    keyIdeas: [
      'The protocol consumes one previously distributed ebit.',
      'The transmitted physical system is one qubit, but entanglement distribution is an additional resource.',
      'The decoder can use CNOT followed by H and computational-basis measurement.'
    ],
    example: 'With a shared $|\\Phi^+\\rangle$, Alice can encode 00 with I, 01 with X, 10 with Z, and 11 with XZ under a common convention. Bob’s decoder maps the four resulting Bell states to four basis strings.',
    pitfalls: ['Advertising two classical bits per qubit without accounting for prior entanglement.', 'Mixing encoding conventions without updating the decoder table.']
  },
  '4-bell-inequalities-and-chsh': {
    explanation: [
      'The CHSH experiment compares correlations from two binary measurement choices on each side. Any local hidden-variable model satisfies $|S|\\le2$, while quantum theory permits up to $2\\sqrt2$ for suitable measurements on a maximally entangled state.',
      'A violation is a statistical conclusion. Estimate four correlators from separate settings, propagate finite-shot uncertainty, and ensure that the physical interpretation addresses locality and detection assumptions.'
    ],
    keyIdeas: [
      '$S=E(A_0B_0)+E(A_0B_1)+E(A_1B_0)-E(A_1B_1)$ under one sign convention.',
      'No-signalling means one side’s marginal distribution cannot depend on the other side’s setting.',
      'Entanglement is necessary for violation but not every entangled state or measurement choice violates CHSH.'
    ],
    example: 'For a singlet-like state and measurement axes separated by the standard optimal angles, the ideal correlators combine to $|S|=2\\sqrt2$. Shot noise makes an experimental estimate fluctuate around that value.',
    pitfalls: ['Calling Bell correlations faster-than-light communication.', 'Reporting an ideal S value without uncertainty or the exact measurement convention.']
  },

  '5-the-query-model': {
    explanation: [
      'The query model isolates the number of times an algorithm accesses a black-box function. A standard reversible query gate maps $|x,y\\rangle$ to $|x,y\\oplus f(x)\\rangle$. The model is useful for proving information-access advantages, but it does not automatically count the cost of building the oracle.',
      'Many query problems include a promise restricting valid functions. Quantum advantage must be stated against the best classical strategy under the same promise, error probability, and access model.'
    ],
    keyIdeas: [
      'A valid oracle must be unitary even when the original function is not invertible.',
      'Query complexity and total gate/runtime complexity are distinct.',
      'Exact, bounded-error, and probabilistic algorithms use different success criteria.'
    ],
    example: 'For a Boolean function, storing $f(x)$ by XOR preserves both x and reversibility. Applying the same oracle twice returns the target register to its initial value because XOR is self-inverse.',
    pitfalls: ['Treating a complicated oracle as a free single gate in an end-to-end claim.', 'Comparing a promised quantum problem with an unrestricted classical problem.']
  },
  '5-phase-kickback': {
    explanation: [
      'Phase kickback occurs when a controlled operation acts on a target eigenstate. If $U|u\\rangle=e^{i\\phi}|u\\rangle$, the controlled-U leaves the target unchanged but attaches the eigenvalue phase to the control’s $|1\\rangle$ branch.',
      'For Boolean oracles, preparing the target in $|-\\rangle$ converts XOR action into the phase $(-1)^{f(x)}$. This transforms function values into relative phase, where interference can reveal global structure.'
    ],
    keyIdeas: [
      'The target must be an eigenstate of the controlled operation for clean kickback.',
      'Relative phase becomes observable only after branches interfere.',
      'Phase kickback powers query algorithms and phase estimation.'
    ],
    example: 'Because $X|-\\rangle=-|-\\rangle$, a bit oracle gives $U_f|x\\rangle|-\\rangle=(-1)^{f(x)}|x\\rangle|-\\rangle$. The target factors out and can be ignored afterward.',
    pitfalls: ['Saying a physical phase travels backward along the control wire.', 'Forgetting that a target not in an eigenstate generally becomes entangled with the control.']
  },
  '5-deutsch-and-deutsch-jozsa': {
    explanation: [
      'Deutsch–Jozsa decides whether a promised Boolean function is constant or balanced. A uniform superposition queries all inputs coherently, and a final Hadamard transform makes the amplitude of $|0^n\\rangle$ equal to the signed average of $(-1)^{f(x)}$.',
      'For a constant function that average has magnitude one, so $0^n$ is certain. For a balanced function positive and negative contributions cancel, so $0^n$ never appears in the ideal circuit.'
    ],
    keyIdeas: [
      'The speedup concerns deterministic query complexity under a promise.',
      'The algorithm extracts one global property, not every individual value of f.',
      'The final interference pattern depends on a correct phase oracle.'
    ],
    example: 'For $n=2$ and $f(x)=x_0$, half the inputs have phase +1 and half −1. Their contributions to the $|00\\rangle$ amplitude cancel exactly.',
    pitfalls: ['Claiming the algorithm reads an exponential table of function values.', 'Ignoring the cost or structure of the chosen oracle implementation.']
  },
  '5-bernstein-vazirani': {
    explanation: [
      'Bernstein–Vazirani considers a hidden string $s$ encoded by $f_s(x)=s\\cdot x\\pmod2$. Phase kickback gives a phase $(-1)^{s\\cdot x}$ on each input branch, and the Walsh–Hadamard transform maps that phase pattern directly to $|s\\rangle$.',
      'The quantum algorithm needs one oracle query in the ideal query model, while a deterministic classical strategy needs multiple queries to learn every bit of s.'
    ],
    keyIdeas: [
      'The dot product is over the binary field GF(2).',
      'The circuit is closely related to Fourier analysis over bit strings.',
      'The output is deterministic only with the promised linear oracle and ideal operations.'
    ],
    example: 'For $s=101$, the oracle phase is determined by $x_0\\oplus x_2$. After the final Hadamards, destructive interference removes every basis state except $|101\\rangle$.',
    pitfalls: ['Using ordinary integer addition instead of XOR in the hidden linear function.', 'Calling the one-query result an unconditional runtime advantage for arbitrary oracle implementations.']
  },
  '5-simon-s-algorithm': {
    explanation: [
      'Simon’s problem promises that a two-to-one function hides a nonzero XOR period s: $f(x)=f(y)$ exactly when $x=y$ or $x=y\\oplus s$. Measuring the output register leaves a superposition of two inputs separated by s.',
      'A Hadamard transform on the input produces samples y satisfying $y\\cdot s=0$ over GF(2). Repeating the quantum circuit gathers independent linear equations; classical Gaussian elimination recovers s.'
    ],
    keyIdeas: [
      'Each run returns a random constraint, not s itself.',
      'Check matrix rank before solving the classical system.',
      'The promise is essential to the exponential query separation.'
    ],
    example: 'For a three-bit secret $s=110$, valid samples satisfy $y_0\\oplus y_1=0$. Enough independent samples identify the one-dimensional null-space containing s.',
    pitfalls: ['Solving the constraints over real numbers instead of GF(2).', 'Stopping after a fixed number of samples without checking independence.']
  },
  '5-complexity-with-care': {
    explanation: [
      'A speedup statement must name the computational model, input encoding, success probability, and measured resource. Query complexity counts oracle calls; gate complexity includes logical operations; physical runtime adds compilation, error correction, sampling, and classical processing.',
      'Asymptotic notation describes growth, not constant factors or present-day practicality. Small demonstrations are useful for validating logic but cannot establish scaling advantage by themselves.'
    ],
    keyIdeas: [
      'Compare against the best known classical method for the same task and assumptions.',
      'Include state preparation, oracle construction, repetitions, and readout.',
      'Distinguish proven separation, conditional advantage, empirical crossover, and utility.'
    ],
    example: 'Grover uses $O(\\sqrt N)$ oracle queries instead of $O(N)$ for unstructured search, but a real implementation must still price each reversible oracle and the cost of fault-tolerant iterations.',
    pitfalls: ['Turning query advantage into an unqualified end-to-end speedup claim.', 'Using qubit count or Hilbert-space dimension as evidence of computational advantage.']
  },

  '6-fourier-basis': {
    explanation: [
      'The quantum Fourier transform changes from computational basis states to phase-encoded Fourier basis states. For $N=2^n$, it maps $|x\\rangle$ to a uniform superposition whose phases advance by $2\\pi x/N$. It is a unitary basis change, not a routine that prints all classical Fourier coefficients.',
      'Period-finding algorithms use the QFT because periodic structure in amplitudes becomes concentrated near frequencies related to the reciprocal period.'
    ],
    keyIdeas: [
      'The QFT preserves norm and is inverted by conjugating its phases.',
      'Output qubit order is commonly bit-reversed in the standard decomposition.',
      'A computational-basis input always gives uniform output probabilities; its information is in phase.'
    ],
    example: 'For $N=4$ and $x=1$, QFT produces $(|0\\rangle+i|1\\rangle-|2\\rangle-i|3\\rangle)/2$. Every basis outcome has probability $1/4$, but the phase ramp encodes x.',
    pitfalls: ['Measuring a QFT basis-state output and expecting to recover x directly.', 'Equating efficient QFT circuits with an automatic exponential speedup over every classical Fourier task.']
  },
  '6-qft-circuit': {
    explanation: [
      'The standard QFT circuit decomposes into Hadamards and controlled phase rotations. Each output qubit collects progressively finer binary fractions of the input phase. Final SWAPs restore the conventional bit order.',
      'Small controlled rotations can be omitted to form an approximate QFT. This reduces gate count and may improve noisy execution, but introduces approximation error that must be included in the algorithm-level success analysis.'
    ],
    keyIdeas: [
      'An exact n-qubit QFT uses a quadratic number of elementary controlled rotations in the direct decomposition.',
      'The inverse circuit reverses gate order and negates phase angles.',
      'Hardware connectivity can add routing overhead beyond the abstract circuit.'
    ],
    example: 'For three qubits, the first processed qubit receives H and controlled phases of $\\pi/2$ and $\\pi/4$ from later input bits. Those rotations encode the binary fraction in its relative phase.',
    pitfalls: ['Forgetting output reversal when comparing a simulator state vector with a hand derivation.', 'Dropping rotations without quantifying the resulting precision loss.']
  },
  '6-phase-estimation': {
    explanation: [
      'Quantum phase estimation approximates $\\theta$ when $U|\\psi\\rangle=e^{2\\pi i\\theta}|\\psi\\rangle$. A control register in superposition applies controlled powers $U^{2^k}$, turning the unknown phase into a binary phase pattern. The inverse QFT converts it into a bit-string estimate.',
      'If the target is a superposition of eigenvectors, measurement returns an eigenphase with probability equal to the corresponding squared overlap. Precision, success probability, and controlled-U cost must all be tracked.'
    ],
    keyIdeas: [
      'Additional control qubits increase phase resolution.',
      'An exactly representable t-bit phase is recovered deterministically in the ideal circuit.',
      'Controlled powers of U may dominate implementation cost.'
    ],
    example: 'For a phase gate with eigenstate $|1\\rangle$ and phase $\\theta=1/8$, a three-qubit precision register ideally returns binary 001 under the chosen bit-order convention.',
    pitfalls: ['Using an arbitrary target state while expecting one deterministic phase.', 'Counting only inverse-QFT gates and ignoring the cost of $U^{2^k}$.']
  },
  '6-grover-search': {
    explanation: [
      'Grover search alternates two reflections: an oracle flips the phase of marked states, and the diffusion operation reflects amplitudes about the initial uniform state. Their product is a rotation in the plane spanned by the good and bad superpositions.',
      'With M marked items among N, the starting angle satisfies $\\sin^2\\theta=M/N$. After k iterations, success is $\\sin^2((2k+1)\\theta)$, so too many iterations rotate past the optimum.'
    ],
    keyIdeas: [
      'The quadratic improvement is in oracle queries for unstructured search.',
      'The oracle marks solutions by phase, not by measuring them.',
      'Iteration count depends on the number of marked states.'
    ],
    example: 'For N=4 and one marked state, $\\theta=\\pi/6$. One Grover iteration gives angle $3\\theta=\\pi/2$, so the marked state is measured with probability one in the ideal case.',
    pitfalls: ['Repeating Grover until success probability “converges”; it oscillates.', 'Treating a database lookup oracle as free or assuming classical data is already coherently addressable.']
  },
  '6-amplitude-amplification': {
    explanation: [
      'Amplitude amplification generalizes Grover by starting from a state prepared by an arbitrary unitary A. One reflection marks good states, while another reflects about $A|0\\rangle$. Repetition amplifies the good component quadratically relative to naive sampling.',
      'When the initial success probability is unknown, fixed-point or randomized strategies can avoid severe overshoot at some cost. Amplitude estimation builds on related rotations to estimate probabilities rather than only find one good sample.'
    ],
    keyIdeas: [
      'The state-preparation unitary and its inverse are part of every amplification iteration.',
      'Good-state recognition must be implemented coherently.',
      'Quadratic improvement concerns repetitions needed as initial success becomes small.'
    ],
    example: 'If A prepares a good outcome with probability $a=0.01$, ordinary sampling needs roughly $1/a$ trials for constant success, while ideal amplitude amplification uses order $1/\\sqrt a$ coherent iterations.',
    pitfalls: ['Omitting the cost of A, $A^\\dagger$, and the good-state oracle.', 'Using the standard optimal iteration formula when the initial success probability is unknown.']
  },
  '6-resource-reasoning': {
    explanation: [
      'Algorithm resources should be separated into logical qubits, oracle calls, one- and two-qubit gates, circuit depth, measurements, and classical post-processing. Fault-tolerant studies add code distance, logical error budget, T count, T depth, and factory resources.',
      'A useful estimate connects required output accuracy to every error source: approximation, synthesis, finite shots, physical noise, and post-processing. Optimizing one layer while another dominates does not improve the final result.'
    ],
    keyIdeas: [
      'Use explicit assumptions and ranges rather than one unexplained resource number.',
      'Count controlled versions of operations separately from their uncontrolled forms.',
      'Report both asymptotic scaling and representative finite-size estimates.'
    ],
    example: 'A phase-estimation design may have a small inverse QFT but enormous controlled time-evolution powers. The latter set the dominant logical depth and accuracy requirements.',
    pitfalls: ['Comparing abstract gate count on one algorithm with wall-clock time for another.', 'Ignoring repeated shots or retries in probabilistic subroutines.']
  },

  '7-number-theory-toolkit': {
    explanation: [
      'Shor’s algorithm relies on arithmetic modulo N. The Euclidean algorithm computes greatest common divisors efficiently, modular exponentiation evaluates powers without constructing enormous integers, and multiplicative order captures periodicity in the sequence $a^x\\bmod N$.',
      'Continued fractions recover a likely rational $s/r$ from a sufficiently accurate real approximation. Candidate denominators must be validated because measurement precision and common factors between s and r can produce a divisor rather than the true order.'
    ],
    keyIdeas: [
      'Choose a coprime to N; otherwise $\\gcd(a,N)$ already reveals a factor.',
      'The order r is the smallest positive integer with $a^r\\equiv1\\pmod N$.',
      'Use repeated squaring for efficient modular exponentiation.'
    ],
    example: 'For $a=2$ and $N=15$, powers modulo 15 are 2, 4, 8, 1, so the order is $r=4$. Then $\\gcd(2^{2}-1,15)=3$ and $\\gcd(2^{2}+1,15)=5$.',
    pitfalls: ['Applying the order definition when a and N are not coprime.', 'Accepting a continued-fraction denominator without checking $a^r\\equiv1\\pmod N$.']
  },
  '7-factoring-reduction': {
    explanation: [
      'Factoring can be reduced probabilistically to order finding. Choose a random $a$ with $1<a<N$. If it is coprime to N, find its order r modulo N. When r is even and $a^{r/2}\\not\\equiv-1\\pmod N$, the two gcd values built from $a^{r/2}\\pm1$ reveal nontrivial factors.',
      'The reduction can fail for an unlucky a or order, but retrying with another base gives a useful success probability. The classical parts—gcd, modular checks, and retries—are polynomial-time.'
    ],
    keyIdeas: [
      'An early gcd greater than one is a successful classical shortcut.',
      'Odd r cannot be used in the standard factor-extraction step.',
      '$a^{r/2}\\equiv-1\\pmod N$ yields only trivial factors and requires a retry.'
    ],
    example: 'For $N=21$, choosing $a=2$ gives order 6. Since $2^3=8$ is neither 1 nor −1 modulo 21, $\\gcd(7,21)=7$ and $\\gcd(9,21)=3$ reveal the factors.',
    pitfalls: ['Presenting order finding and factoring as identical problems.', 'Ignoring the retry conditions and claiming every random base succeeds.']
  },
  '7-quantum-order-finding': {
    explanation: [
      'Quantum order finding applies phase estimation to the modular multiplication unitary $U_a|y\\rangle=|ay\\bmod N\\rangle$. Its relevant eigenphases are rational multiples $s/r$, where r is the desired order.',
      'An efficiently prepared computational state can be expressed as a superposition of eigenstates. Phase estimation samples one eigenphase; continued fractions and validation then infer r. Several samples may be required when s and r share factors.'
    ],
    keyIdeas: [
      'Reversible modular multiplication keeps the quantum operation unitary.',
      'The precision register must be large enough to reconstruct the rational denominator.',
      'Modular exponentiation is the dominant quantum arithmetic component.'
    ],
    example: 'If phase estimation produces a value close to $3/8$, continued fractions proposes denominator 8. The classical verifier tests whether $a^8\\equiv1\\pmod N$ and reduces the candidate if a smaller order exists.',
    pitfalls: ['Assuming the measured numerator is always coprime to r.', 'Replacing reversible modular arithmetic with an irreversible classical function call in a resource estimate.']
  },
  '7-end-to-end-shor-workflow': {
    explanation: [
      'The complete workflow combines random base selection, a gcd shortcut, quantum order finding, continued-fraction reconstruction, order validation, factor extraction, and retries. Each stage has a clearly defined failure condition rather than one monolithic success flag.',
      'Small compiled demonstrations often exploit known structure and do not represent scalable modular exponentiation. A serious implementation report separates pedagogical circuits from general-purpose resource estimates.'
    ],
    keyIdeas: [
      'Validate candidate order before computing factors.',
      'Record whether failure came from phase precision, rational reconstruction, odd order, or trivial square root of one.',
      'Scalable Shor requires logical qubits and fault-tolerant arithmetic, not merely a noiseless small simulator.'
    ],
    example: 'For each chosen a, a control flow can return early on $\\gcd(a,N)>1$, retry on invalid r, and accept only factors strictly between 1 and N whose product divides N.',
    pitfalls: ['Using a circuit compiled with the answer already embedded as evidence of general factoring.', 'Omitting classical validation and retry logic from the algorithm.']
  },
  '7-cryptographic-impact': {
    explanation: [
      'A sufficiently large fault-tolerant quantum computer running Shor’s algorithm would break public-key systems whose security depends on integer factoring or discrete logarithms, including RSA and widely used elliptic-curve schemes. The threat applies to encrypted data captured now and decrypted later.',
      'Grover-style search affects symmetric cryptography differently, providing a generic quadratic search improvement rather than Shor’s polynomial-time break. Security planning therefore uses algorithm- and parameter-specific migration guidance rather than saying that all cryptography fails.'
    ],
    keyIdeas: [
      'Public-key encryption, key exchange, and digital signatures require separate migration inventories.',
      'Quantum vulnerability is not the same as the current availability of a cryptographically relevant quantum computer.',
      'Long-lived secrets may need earlier migration because of harvest-now-decrypt-later risk.'
    ],
    example: 'Replacing a vulnerable key-exchange mechanism does not automatically replace a vulnerable signature scheme. A protocol inventory must trace both uses and the certificate or software dependencies around them.',
    pitfalls: ['Claiming present quantum devices can already break production RSA keys.', 'Assuming doubling every symmetric key length is a complete migration plan.']
  },
  '7-pqc-versus-qkd': {
    explanation: [
      'Post-quantum cryptography uses classical algorithms designed to resist known classical and quantum attacks. It runs on conventional systems and is standardized for integration into existing protocols. Quantum key distribution uses quantum communication to establish keys and has different infrastructure and security assumptions.',
      'Neither term means “encrypting with a quantum computer.” PQC is the broadly deployable response for public-key migration; QKD may serve specialized links but does not replace authentication, endpoint security, or application-layer cryptography.'
    ],
    keyIdeas: [
      'PQC and QKD solve overlapping but non-identical problems.',
      'Hybrid deployment must define how component failures affect overall security.',
      'Cryptographic agility and protocol inventory are as important as selecting an algorithm.'
    ],
    example: 'A network can deploy a standardized PQC key-encapsulation mechanism in TLS without a quantum channel. A QKD link still needs authenticated classical communication and key-management integration.',
    pitfalls: ['Using PQC and quantum cryptography as interchangeable labels.', 'Treating QKD as protection against compromised endpoints.']
  },

  '8-open-system-noise': {
    explanation: [
      'Real qubits interact with uncontrolled degrees of freedom and imperfect controls. Energy relaxation is characterized by $T_1$; loss of phase coherence is characterized by $T_2$, with $T_2\\le2T_1$ in common Markovian models. Readout error, leakage, crosstalk, and coherent calibration errors require additional descriptions.',
      'A noise model is an approximation tied to a timescale and experiment. Independent stationary channels are convenient, but correlated or drifting errors can invalidate conclusions drawn from that simplified model.'
    ],
    keyIdeas: [
      'Relaxation changes populations; pure dephasing suppresses off-diagonal coherence.',
      'Coherent systematic errors can accumulate differently from stochastic errors.',
      'Calibration data are time-stamped observations, not permanent device constants.'
    ],
    example: 'Under amplitude damping with probability $\\gamma$, an excited-state population decays from 1 to $1-\\gamma$, while the corresponding coherence terms shrink by $\\sqrt{1-\\gamma}$.',
    pitfalls: ['Using one depolarizing parameter as a faithful model of every hardware error.', 'Assuming longer circuits fail only because of gate count while ignoring idle time and scheduling.']
  },
  '8-quantum-channels': {
    explanation: [
      'A quantum channel is a completely positive trace-preserving linear map on density operators. A Kraus representation $\\mathcal E(\\rho)=\\sum_kE_k\\rho E_k^\\dagger$ is trace-preserving when $\\sum_kE_k^\\dagger E_k=I$. Different Kraus sets can represent the same channel.',
      'Unitary evolution, measurement with outcomes discarded, state preparation, and noise all fit into the channel formalism. Composition models sequential processes, while a tensor product is justified only when subsystem noise is independent.'
    ],
    keyIdeas: [
      'Complete positivity protects validity even when the input is entangled with an untouched reference.',
      'Trace-decreasing maps describe individual conditioned measurement branches, not full deterministic channels.',
      'Bit flip, phase flip, depolarizing, dephasing, and amplitude damping have distinct physical effects.'
    ],
    example: 'A bit-flip channel is $\\mathcal E(\\rho)=(1-p)\\rho+pX\\rho X$. The Kraus operators $\\sqrt{1-p}I$ and $\\sqrt pX$ satisfy the completeness relation.',
    pitfalls: ['Checking positivity only on isolated inputs instead of complete positivity.', 'Interpreting Kraus operators as uniquely identifiable physical events in every representation.']
  },
  '8-why-correction-is-possible': {
    explanation: [
      'Quantum error correction encodes a logical state into a larger subspace so different physical errors move it into distinguishable syndrome subspaces without revealing the logical amplitudes. Syndrome measurements learn which error class occurred, not whether the logical state was $|0_L\\rangle$ or $|1_L\\rangle$.',
      'Although physical noise is continuous, expanding a one-qubit error in the Pauli basis lets a code that corrects I, X, Y, and Z correct arbitrary errors on that qubit by linearity. This is the discretization of errors.'
    ],
    keyIdeas: [
      'Redundancy is stored in entanglement and correlations, not by cloning an unknown qubit.',
      'Error detection requires corrupted logical alternatives to remain distinguishable in syndrome space.',
      'Correction succeeds for a set of errors satisfying the quantum error-correction conditions.'
    ],
    example: 'In the bit-flip repetition code, $|0_L\\rangle=|000\\rangle$ and $|1_L\\rangle=|111\\rangle$. Measuring adjacent Z parities identifies which qubit flipped without measuring the logical superposition coefficients.',
    pitfalls: ['Explaining the encoding as three independent copies of an unknown state.', 'Assuming syndrome zero proves no physical error occurred; some errors act trivially or logically within the code space.']
  },
  '8-introductory-codes': {
    explanation: [
      'The three-qubit repetition code corrects one X error but not arbitrary one-qubit noise. Conjugating by Hadamards gives a phase-flip repetition code. Shor’s nine-qubit code concatenates these ideas to protect against arbitrary single-qubit errors.',
      'Code notation $[[n,k,d]]$ records n physical qubits, k logical qubits, and distance d. A distance-d code corrects arbitrary errors of weight at most $\\lfloor(d-1)/2\\rfloor$ under the standard adversarial model.'
    ],
    keyIdeas: [
      'A code detects errors of weight below d and corrects up to half that distance.',
      'Syndrome extraction should avoid directly measuring the encoded logical value.',
      'More physical qubits help only when physical error rates and correction circuits are sufficiently good.'
    ],
    example: 'For the bit-flip code, stabilizers $Z_1Z_2$ and $Z_2Z_3$ produce distinct two-bit syndromes for X errors on qubits 1, 2, or 3, allowing a targeted correction.',
    pitfalls: ['Calling the three-qubit repetition code a general quantum code.', 'Assuming encoding alone reduces error without repeated reliable syndrome extraction.']
  },
  '8-stabilizer-formalism': {
    explanation: [
      'A stabilizer code is the simultaneous +1 eigenspace of commuting independent Pauli generators. Measuring generator eigenvalues gives a syndrome. A Pauli error anticommutes with some generators, flipping their signs and revealing its syndrome pattern.',
      'Logical Pauli operators preserve the code space but act nontrivially on encoded information. They commute with every stabilizer while not belonging to the stabilizer group. Code distance is the minimum weight of a nontrivial logical Pauli.'
    ],
    keyIdeas: [
      'Generators must commute so their syndrome observables can be measured consistently.',
      'Errors differing by a stabilizer have the same logical action and syndrome class.',
      'A decoder maps observed syndromes to likely corrections using a chosen noise model.'
    ],
    example: 'For the three-qubit bit-flip code, generators ZZI and IZZ stabilize both $|000\\rangle$ and $|111\\rangle$. An X on the middle qubit anticommutes with both and yields syndrome $(−1,−1)$.',
    pitfalls: ['Treating the measured syndrome as a unique physical error label.', 'Including $-I$ in a stabilizer group, which would leave no nonzero +1 code state.']
  },
  '8-fault-tolerance': {
    explanation: [
      'Fault-tolerant design prevents one physical fault from spreading into more errors than a code block can correct. Transversal gates limit within-block propagation, but no code supports a universal set entirely through transversal gates; additional techniques such as magic-state injection are required.',
      'The threshold theorem states that arbitrarily long computation is possible in principle when component noise is below a scheme-dependent threshold and the noise assumptions hold. The overhead can still be very large.'
    ],
    keyIdeas: [
      'Error-correction circuits themselves must be fault-tolerant.',
      'Logical error rate, not only physical gate fidelity, determines scalable reliability.',
      'Repeated syndrome rounds and classical decoding are part of the computational cycle.'
    ],
    example: 'A single ancilla controlling many data qubits can propagate one ancilla fault across a code block. Verified cat-state or other fault-tolerant syndrome methods are designed to control that spread.',
    pitfalls: ['Equating error correction with fault tolerance.', 'Quoting one threshold number without its code, decoder, circuit, and noise assumptions.']
  },

  '9-hamiltonian-mechanics': {
    explanation: [
      'The Hamiltonian H is a Hermitian operator representing energy and generating time evolution. Its eigenvectors are stationary energy states; a general state accumulates relative phases between energy components under $e^{-iHt}$, producing observable dynamics.',
      'Expectation values and correlation functions connect the evolving state to measurable quantities. Conserved observables commute with H in the time-independent ideal setting, providing valuable checks for a simulation.'
    ],
    keyIdeas: [
      'Hermiticity gives real energy eigenvalues.',
      'Adding a multiple of identity changes only global phase in closed-system dynamics.',
      'Ground-state estimation and real-time evolution are different computational tasks.'
    ],
    example: 'For $H=\\omega Z/2$, $|0\\rangle$ and $|1\\rangle$ gain opposite phases. An initial $|+\\rangle$ therefore precesses around the Bloch Z axis even though energy-basis populations stay fixed.',
    pitfalls: ['Treating H as a probability matrix.', 'Assuming an energy eigenstate changes observable populations merely because its phase evolves.']
  },
  '9-pauli-decompositions': {
    explanation: [
      'The n-qubit Pauli strings form an orthogonal operator basis under the Hilbert–Schmidt inner product. Any Hermitian qubit Hamiltonian can be written as a real weighted sum $H=\\sum_j a_jP_j$. Local physical models usually contain only a small subset of all $4^n$ possible strings.',
      'Pauli terms guide both measurement and time-evolution circuits. Commuting terms may be grouped for measurement, while non-commuting terms create product-formula error during split evolution.'
    ],
    keyIdeas: [
      'Coefficients can be computed with $a_P=2^{-n}\\operatorname{Tr}(PH)$.',
      'A Pauli string’s weight is the number of non-identity factors.',
      'Commuting as operators is not identical to being measurable in one simple tensor-product basis.'
    ],
    example: 'The two-qubit Ising Hamiltonian $H=-JZ\\otimes Z-h(X\\otimes I+I\\otimes X)$ contains one interaction term and two local field terms, each directly expressible as a Pauli rotation.',
    pitfalls: ['Assuming a general Hamiltonian always has only polynomially many Pauli terms.', 'Grouping non-commuting observables without a valid joint-measurement construction.']
  },
  '9-time-evolution-unitaries': {
    explanation: [
      'For time-independent H and units with $\\hbar=1$, closed-system evolution is $U(t)=e^{-iHt}$. If H is a single Pauli string P, then $e^{-i\\theta P/2}=\\cos(\\theta/2)I-i\\sin(\\theta/2)P$ and can be synthesized with basis changes, parity computation, and one rotation.',
      'Time-dependent Hamiltonians require time ordering or discretization. Even when the ideal unitary is known, compiling it into native gates introduces synthesis and hardware errors.'
    ],
    keyIdeas: [
      'Exponentiating a sum is not generally the product of exponentials unless the terms commute.',
      'Pauli rotations can be implemented by mapping the string parity onto one qubit.',
      'Global phase in U is unobservable for an isolated closed state but may matter in controlled-U constructions.'
    ],
    example: 'To implement $e^{-i\\theta Z\\otimes Z/2}$, compute parity with CNOT, apply $R_z(\\theta)$ to the target, then uncompute the parity. Basis changes extend the pattern to X and Y strings.',
    pitfalls: ['Using $e^{A+B}=e^Ae^B$ for non-commuting A and B.', 'Dropping a phase before promoting an operation to a controlled operation.']
  },
  '9-lie-trotter-and-suzuki-formulas': {
    explanation: [
      'Product formulas approximate evolution under a sum of non-commuting terms. First-order Lie–Trotter repeats $\\prod_j e^{-ia_jP_jt/r}$ for r steps. Symmetric second-order Suzuki formulas cancel lower-order error terms by using a forward-and-reverse half-step pattern.',
      'More steps or higher order reduce ideal approximation error but increase circuit depth, gate noise, and sampling cost. The best practical choice balances these errors rather than maximizing r automatically.'
    ],
    keyIdeas: [
      'Commutators control the leading product-formula error.',
      'Term ordering can materially affect finite-step error.',
      'Convergence should be tested over several r values against a small exact reference when possible.'
    ],
    example: 'For $H=A+B$, first order uses $(e^{-iAt/r}e^{-iBt/r})^r$; second order uses $(e^{-iAt/(2r)}e^{-iBt/r}e^{-iAt/(2r)})^r$.',
    pitfalls: ['Reporting a Trotter result without stating step count and ordering.', 'Assuming deeper, higher-order formulas are always more accurate on noisy hardware.']
  },
  '9-a-spin-model-case-study': {
    explanation: [
      'Spin models turn abstract simulation into a reproducible workflow. A transverse-field Ising chain combines ZZ interactions with an X field. Choose couplings, boundary conditions, an initial state, evolution time, observables, and a product formula before constructing circuits.',
      'Magnetization, two-point correlations, and conserved quantities reveal different aspects of dynamics. Exact diagonalization for a small chain provides a reference against which Trotter and noise effects can be separated.'
    ],
    keyIdeas: [
      'Document whether boundary conditions are open or periodic.',
      'Map every Hamiltonian term to qubit indices consistently.',
      'Measure observables at multiple times to study dynamics, not only one endpoint.'
    ],
    example: 'For $H=-J\\sum_iZ_iZ_{i+1}-h\\sum_iX_i$, initialize $|000\\cdots0\\rangle$, evolve over a time grid, and track average $\\langle Z_i\\rangle$ and nearest-neighbor $\\langle Z_iZ_{i+1}\\rangle$.',
    pitfalls: ['Changing model conventions between the exact and circuit implementations.', 'Comparing a noisy sampled observable with a statevector result without separating shot uncertainty.']
  },
  '9-verification-and-scaling': {
    explanation: [
      'Verification asks whether the implementation solves the defined problem within a quantified error. For small systems, compare state fidelity or observables against exact evolution. For larger systems, use convergence, symmetry, conservation, cross-method, and limit checks.',
      'Separate product-formula error, synthesis error, sampling uncertainty, and hardware noise. Scaling studies should vary system size and target accuracy while recording logical and physical resources.'
    ],
    keyIdeas: [
      'A correct-looking plot is not a verification metric.',
      'Use error bars and repeated compilations or runs when stochastic variation matters.',
      'Statevector validation stops scaling early; observable-level validation can reach larger instances but is less complete.'
    ],
    example: 'Run r=1, 2, 4, and 8 Trotter steps on a small model. Compare each observable curve with exact evolution, then repeat under a noise model to identify the point where deeper circuits stop improving total error.',
    pitfalls: ['Using one small instance to claim favorable asymptotic scaling.', 'Combining approximation and hardware error into one unexplained discrepancy.']
  }
};
