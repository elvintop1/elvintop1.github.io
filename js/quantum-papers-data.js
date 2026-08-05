window.quantumPapers = [
  {
    slug: 'hhl-quantum-algorithm-for-linear-systems',
    track: 'quantum-linear-solvers',
    title: 'Quantum Algorithm for Solving Linear Systems of Equations',
    shortTitle: 'HHL: Quantum Linear Systems',
    authors: ['Aram W. Harrow', 'Avinatan Hassidim', 'Seth Lloyd'],
    year: 2009,
    venue: 'Physical Review Letters 103, 150502',
    arxivId: '0811.3171',
    doi: '10.1103/PhysRevLett.103.150502',
    sourceUrl: 'https://arxiv.org/abs/0811.3171',
    pdfUrl: 'https://arxiv.org/pdf/0811.3171',
    readingStatus: 'Annotated',
    readingDate: '2026-08-06',
    updated: '2026-08-06',
    readingTime: 16,
    tags: ['HHL', 'QLSP', 'phase estimation', 'condition number'],
    citation: 'Harrow, A. W., Hassidim, A., & Lloyd, S. (2009). Quantum algorithm for solving linear systems of equations. Physical Review Letters, 103, 150502.',
    abstractSummary: 'The paper changes the linear-system output from a classical vector to a quantum state proportional to the solution, then shows how selected expectation values can be estimated without reading every coordinate. Its speedup depends on sparsity, conditioning, precision, state preparation, and the observable that will be measured.',
    whyReading: 'This is the conceptual starting point for my Quantum Linear Solvers direction. I am reading it to separate the mathematical inverse problem from the quantum input/output model and to learn which assumptions must remain visible in every later solver claim.',
    readingQuestion: 'What exactly is solved when the output is a state, and which end-to-end assumptions make that output useful?',
    thesis: 'HHL is best understood as a coherent spectral transformation: decompose the input into eigenvectors of A, attach eigenvalue information, weight each component by the reciprocal eigenvalue, and uncompute the workspace.',
    contributions: [
      'Defines a quantum linear-systems task whose output is a state proportional to the solution rather than a printed list of coordinates.',
      'Combines Hamiltonian simulation, phase estimation, a controlled reciprocal rotation, and postselection into one solver blueprint.',
      'Shows how an expectation value associated with the solution can be the useful output of the algorithm.',
      'Makes condition number, sparsity, and precision central parts of the complexity statement.'
    ],
    equations: [
      { label: 'Problem and state output', latex: 'A x=b,\\qquad |x\\rangle=\\frac{A^{-1}|b\\rangle}{\\|A^{-1}|b\\rangle\\|}', note: 'The quantum state retains the direction of the solution vector but not its classical norm.' },
      { label: 'Spectral inversion', latex: '|b\\rangle=\\sum_j\\beta_j|u_j\\rangle\\quad\\Longrightarrow\\quad A^{-1}|b\\rangle=\\sum_j\\frac{\\beta_j}{\\lambda_j}|u_j\\rangle', note: 'The algorithm implements reciprocal weighting in the eigenbasis of A.' },
      { label: 'Condition number', latex: '\\kappa(A)=\\frac{|\\lambda_{\\max}|}{|\\lambda_{\\min}|}', note: 'Small supported eigenvalues enlarge inverse weights and reduce the controlled-rotation success probability.' }
    ],
    sections: [
      {
        id: 'problem-contract',
        title: '1. The paper changes the output contract',
        paragraphs: [
          'The most important move is not a circuit trick. It is the decision to return a normalized state proportional to x. That output can support an overlap or expectation-value calculation, but it does not give all N coordinates for free. I therefore read every claimed speedup together with the downstream observable.',
          'This framing connects linear algebra with quantum information: amplitudes store a normalized vector, measurement exposes selected statistics, and full reconstruction generally costs many repetitions. The application must naturally consume a state-like solution or a small number of global quantities.'
        ]
      },
      {
        id: 'mechanism',
        title: '2. The mechanism is compute–rotate–uncompute',
        paragraphs: [
          'Phase estimation coherently associates an eigenvalue estimate with each eigenvector component of the input. A controlled ancilla rotation turns the numerical reciprocal into an amplitude. Reversing phase estimation removes the temporary eigenvalue register while leaving inverse-weighted amplitudes in the solution register.',
          'This viewpoint is more reusable than memorizing one HHL circuit. Later solvers may replace phase estimation or reciprocal rotation with polynomial approximation and block encodings, but they still need an efficient representation of the inverse action on the relevant spectral interval.'
        ]
      },
      {
        id: 'complexity',
        title: '3. The complexity claim has a contract',
        paragraphs: [
          'The dimension dependence is attractive only when A is accessed through an efficient sparse or structured model and when |b⟩ can be prepared efficiently. Dependence on κ and precision remains because inversion is numerically sensitive. Postselection and observable estimation must also be counted.',
          'For my own comparisons, I will write a resource ledger with separate rows for matrix access, state preparation, solver calls, success amplification, measurement, and verification. A polylogarithmic solver core is not the same as a polylogarithmic application.'
        ]
      },
      {
        id: 'research-use',
        title: '4. How this paper guides my experiments',
        paragraphs: [
          'I should begin with matrices whose eigenpairs and classical solutions are known, then vary κ independently from dimension. The first checks are normalization, residual-related observables, success probability, and sensitivity to eigenvalue error.',
          'A small Qiskit circuit is useful for validating conventions and algorithmic steps, not for claiming advantage. The research question begins only after a classical baseline and an end-to-end access model have been stated.'
        ]
      }
    ],
    comments: [
      { label: 'My main takeaway', title: 'The output type determines the application', text: 'I should never write “HHL solves Ax=b exponentially faster” without immediately stating that it prepares |x⟩ and that only selected properties of x are intended to be estimated.' },
      { label: 'Claim boundary', title: 'A four-qubit demonstration is not a speedup', text: 'Tiny implementations test correctness and noise sensitivity. They do not reproduce the asymptotic regime, efficient oracle access, or fault-tolerant resources assumed by the algorithm.' },
      { label: 'Connection', title: 'Conditioning is algorithmic and numerical', text: 'κ is not an inconvenient technical symbol. It describes how inverse weighting magnifies spectral components and therefore links classical stability, quantum success probability, and verification cost.' }
    ],
    strengths: [
      'Introduces a durable input/output model for quantum linear-system algorithms.',
      'Connects several core quantum subroutines in a mathematically transparent way.',
      'Makes clear that estimating a property of the solution can be more natural than reconstructing it.'
    ],
    limitations: [
      'Efficient matrix and vector access are strong application-dependent assumptions.',
      'Condition-number and precision dependence can dominate practical cost.',
      'The original method belongs to a fault-tolerant algorithmic setting rather than near-term large-scale execution.'
    ],
    questions: [
      'Which real datasets provide |b⟩ and structured access to A without an O(N) loading bottleneck?',
      'Which observables of the solution are scientifically useful and cheap to estimate?',
      'How should classical preconditioning cost be compared with quantum preconditioning?'
    ],
    connections: [
      { label: 'Research note · Quantum Linear Solvers', href: 'research-note.html?note=quantum-linear-solvers-from-axb-to-a-quantum-state' },
      { label: 'Week 6 · Phase estimation', href: 'lesson.html?week=6&topic=phase-estimation' },
      { label: 'Week 1 · Spectral structure', href: 'lesson.html?week=1&topic=matrices-and-spectral-structure' }
    ]
  },
  {
    slug: 'cks-linear-systems-improved-precision',
    track: 'quantum-linear-solvers',
    title: 'Quantum Algorithm for Systems of Linear Equations with Exponentially Improved Dependence on Precision',
    shortTitle: 'CKS: Improved Precision Dependence',
    authors: ['Andrew M. Childs', 'Robin Kothari', 'Rolando D. Somma'],
    year: 2017,
    venue: 'SIAM Journal on Computing 46, 1920–1950',
    arxivId: '1511.02306',
    doi: '10.1137/16M1087072',
    sourceUrl: 'https://arxiv.org/abs/1511.02306',
    pdfUrl: 'https://arxiv.org/pdf/1511.02306',
    readingStatus: 'Annotated',
    readingDate: '2026-08-06',
    updated: '2026-08-06',
    readingTime: 18,
    tags: ['QLSP', 'precision', 'LCU', 'Chebyshev series'],
    citation: 'Childs, A. M., Kothari, R., & Somma, R. D. (2017). Quantum algorithm for systems of linear equations with exponentially improved dependence on precision. SIAM Journal on Computing, 46, 1920–1950.',
    abstractSummary: 'The paper replaces the phase-estimation bottleneck with operator approximations based on Fourier or Chebyshev series. The central gain is changing the precision dependence from polynomial in 1/ε to polynomial in log(1/ε), while retaining broadly similar dependence on the other linear-system parameters.',
    whyReading: 'I am reading this after HHL to understand which cost was intrinsic to inversion and which cost came from a particular implementation of eigenvalue estimation.',
    readingQuestion: 'How can the inverse function be implemented without resolving eigenvalues one by one through high-precision phase estimation?',
    thesis: 'Approximate the inverse as a linear combination of efficiently implementable operators over a controlled spectral interval, so precision enters through the approximation degree rather than direct eigenvalue resolution.',
    contributions: [
      'Improves dependence on solution precision exponentially relative to the original HHL approach.',
      'Develops Fourier- and Chebyshev-series techniques for implementing suitable matrix functions.',
      'Bypasses quantum phase estimation as the central inversion mechanism.',
      'Clarifies that algorithm comparison must isolate dependence on N, κ, sparsity, and ε.'
    ],
    equations: [
      { label: 'Target inverse action', latex: 'f(A)|b\\rangle\\approx A^{-1}|b\\rangle,\\qquad f(x)\\approx \\frac{1}{x}', note: 'The approximation only needs to be accurate on the supported spectral interval away from zero.' },
      { label: 'Precision contrast', latex: '\\operatorname{poly}(1/\\epsilon)\\;\\longrightarrow\\;\\operatorname{poly}(\\log(1/\\epsilon))', note: 'This summarizes the qualitative improvement; the complete theorem includes the remaining problem parameters.' }
    ],
    sections: [
      {
        id: 'from-eigenvalues-to-functions',
        title: '1. From estimating eigenvalues to implementing a function',
        paragraphs: [
          'HHL first estimates an eigenvalue and then computes its reciprocal effect. CKS asks whether the inverse can instead be approximated directly as an operator function. This changes the algorithmic primitive from high-resolution spectral readout to controlled approximation.',
          'The conceptual lesson is broad: if a target transformation is a smooth enough function on a known domain, a polynomial or Fourier representation may be implemented without explicitly learning the argument in every coherent branch.'
        ]
      },
      {
        id: 'spectral-domain',
        title: '2. The approximation domain encodes conditioning',
        paragraphs: [
          'The inverse function is singular at zero, so the approximation must exclude a neighborhood determined by the smallest relevant eigenvalue. The condition number therefore remains present even though the precision dependence improves.',
          'For experiments, the spectral promise should be explicit. Rescaling A changes the interval but not κ; truncating small eigenvalues changes the problem. I need to distinguish numerical regularization from an exact solver guarantee.'
        ]
      },
      {
        id: 'precision',
        title: '3. Precision is a resource axis of its own',
        paragraphs: [
          'The paper demonstrates that poor ε-dependence in one construction is not automatically a lower bound for the problem. This is why asymptotic tables should list every parameter rather than compressing cost into one headline.',
          'A practical study should sweep target error and measure both circuit resources and output-observable error. Otherwise an implementation may appear scalable only because it holds precision fixed at a loose value.'
        ]
      },
      {
        id: 'paper-reading',
        title: '4. How I read algorithm-improvement papers',
        paragraphs: [
          'I compare the same input model, output guarantee, error norm, and success criterion before comparing complexity. Then I identify which subroutine changed and which dependencies remained.',
          'For this paper, the main intellectual contribution is not simply a better big-O expression. It is the shift from resolving spectral values to synthesizing a matrix function through approximation theory.'
        ]
      }
    ],
    comments: [
      { label: 'My main takeaway', title: 'Do not confuse a subroutine cost with a problem lower bound', text: 'HHL’s precision behavior came partly from phase estimation. CKS shows that changing the representation of the inverse changes this dependence dramatically.' },
      { label: 'Mathematical bridge', title: 'Approximation theory belongs in quantum algorithms', text: 'Chebyshev and Fourier expansions are not auxiliary mathematics here; they are the mechanism translating a scalar reciprocal function into an operator transformation.' },
      { label: 'Experiment note', title: 'Sweep ε and κ separately', text: 'If I change both together, I cannot tell whether failure comes from resolving the target accuracy or from amplification near small eigenvalues.' }
    ],
    strengths: [
      'Provides a major improvement in precision dependence.',
      'Introduces broadly reusable matrix-function implementation techniques.',
      'Makes the source of improvement conceptually identifiable.'
    ],
    limitations: [
      'Conditioning and input-access assumptions remain decisive.',
      'The approximation machinery is substantially more involved than the basic HHL narrative.',
      'Asymptotic improvement does not alone determine finite-size resource advantage.'
    ],
    questions: [
      'How do modern block-encoding and QSVT formulations restate this construction?',
      'What crossover sizes appear under explicit fault-tolerant resource estimates?',
      'How does approximation error propagate to the observable I ultimately estimate?'
    ],
    connections: [
      { label: 'Research note · Quantum Linear Solvers', href: 'research-note.html?note=quantum-linear-solvers-from-axb-to-a-quantum-state' },
      { label: 'Paper · HHL', href: 'paper.html?paper=hhl-quantum-algorithm-for-linear-systems' },
      { label: 'Week 6 · Resource reasoning', href: 'lesson.html?week=6&topic=resource-reasoning' }
    ]
  },
  {
    slug: 'somma-subasi-qlsp-verification',
    track: 'quantum-linear-solvers',
    title: 'Complexity of Quantum State Verification in the Quantum Linear Systems Problem',
    shortTitle: 'Verification Cost in QLSP',
    authors: ['Rolando D. Somma', 'Yigit Subasi'],
    year: 2021,
    venue: 'PRX Quantum 2, 010315',
    arxivId: '2007.15698',
    doi: '10.1103/PRXQuantum.2.010315',
    sourceUrl: 'https://arxiv.org/abs/2007.15698',
    pdfUrl: 'https://arxiv.org/pdf/2007.15698',
    readingStatus: 'Analysis draft',
    readingDate: '2026-08-06',
    updated: '2026-08-06',
    readingTime: 14,
    tags: ['verification', 'QLSP', 'lower bounds', 'condition number'],
    citation: 'Somma, R. D., & Subasi, Y. (2021). Complexity of quantum state verification in the quantum linear systems problem. PRX Quantum, 2, 010315.',
    abstractSummary: 'The paper studies the cost of checking whether a prepared state is close to the desired linear-system solution. It proves worst-case and typical lower bounds in the condition number, including stronger copy requirements for prepare-and-measure verification.',
    whyReading: 'A solver result is not complete unless I know how its correctness can be checked. This paper makes verification a first-class cost rather than an informal final step.',
    readingQuestion: 'Can a claimed quantum solution be verified without paying a cost that removes the solver advantage?',
    thesis: 'Verification inherits the spectral difficulty of the linear system: when κ grows, distinguishing a correct solution state from an incorrect one requires more uses or copies of the input-state preparation.',
    contributions: [
      'Establishes a worst-case lower bound proportional to κ for verification using coherent access to the |b⟩ preparation unitary and its inverse.',
      'Gives typical-instance lower bounds proportional to the square root of κ in the coherent model.',
      'Shows quadratically worse copy complexity for prepare-and-measure verification.',
      'Connects the bounds to variational and noisy approaches to quantum linear systems.'
    ],
    equations: [
      { label: 'Worst-case coherent verification', latex: 'q=\\Omega(\\kappa)', note: 'q counts uses of a unitary preparing |b⟩ and its inverse in the stated verification model.' },
      { label: 'Prepare-and-measure worst case', latex: 'q=\\Omega(\\kappa^2)', note: 'Restricting verification to prepared copies and measurements can worsen the dependence quadratically.' }
    ],
    sections: [
      {
        id: 'verification-question',
        title: '1. Verification is a computational problem',
        paragraphs: [
          'A statevector printed by a simulator can be compared directly with a classical target. A real large-scale quantum output cannot be inspected amplitude by amplitude. Verification must therefore be formulated using permitted preparations, operations, and measurements.',
          'This paper asks how many such resources are fundamentally necessary. That question is separate from the cost of producing the candidate state and must appear in an end-to-end result.'
        ]
      },
      {
        id: 'why-kappa',
        title: '2. Why κ reappears in checking',
        paragraphs: [
          'Ill-conditioning creates solution states that can change substantially under small changes along difficult spectral directions. A verifier must gather enough information to distinguish those cases.',
          'The result changes my interpretation of κ: it controls not only inverse implementation and success probability, but also how hard it can be to certify that the answer is close.'
        ]
      },
      {
        id: 'access-model',
        title: '3. Verification depends on the access model',
        paragraphs: [
          'Coherent access to a state-preparation unitary and its inverse is stronger than receiving independent copies of a state. The lower bounds differ accordingly. Any verification proposal must state which access is available.',
          'This matters for near-term experiments, where one often has repeated circuit execution but not an arbitrary coherent use of an unknown preparation process inside a larger algorithm.'
        ]
      },
      {
        id: 'reporting',
        title: '4. What I will add to solver reports',
        paragraphs: [
          'I will distinguish implementation checks available in classical simulation from scalable verification protocols available on hardware. Fidelity to a classically computed state is valid for small benchmarks but not an end-to-end large-instance method.',
          'A research table should list candidate preparation cost, verifier access model, number of state preparations, measurement settings, confidence level, and dependence on κ.'
        ]
      }
    ],
    comments: [
      { label: 'My main takeaway', title: 'Correctness is not free', text: 'I should treat verification cost as part of the algorithm, especially when the output is a state that cannot be read directly.' },
      { label: 'Method warning', title: 'Simulator fidelity is not scalable verification', text: 'It is an excellent development diagnostic for small systems, but it assumes classical access to the full target and full simulated state.' },
      { label: 'Research consequence', title: 'Choose outputs that are verifiable', text: 'An application is more convincing when the desired observable has an independent consistency check or physical conservation law.' }
    ],
    strengths: [
      'Turns an often omitted step into a formal complexity question.',
      'Separates coherent verification from prepare-and-measure protocols.',
      'Provides direct implications for variational and noisy solvers.'
    ],
    limitations: [
      'Lower bounds depend on the stated oracle and verification models.',
      'The results do not by themselves select the best application-specific certificate.',
      'Practical constants and structured-instance opportunities need separate study.'
    ],
    questions: [
      'Which physical linear-system applications offer cheap problem-specific certificates?',
      'Can conserved quantities or residual observables provide useful partial verification?',
      'How should verification confidence be allocated across a full hybrid pipeline?'
    ],
    connections: [
      { label: 'Research note · Quantum Linear Solvers', href: 'research-note.html?note=quantum-linear-solvers-from-axb-to-a-quantum-state' },
      { label: 'Paper · HHL', href: 'paper.html?paper=hhl-quantum-algorithm-for-linear-systems' },
      { label: 'Week 9 · Verification and scaling', href: 'lesson.html?week=9&topic=verification-and-scaling' }
    ]
  },
  {
    slug: 'schuld-killoran-feature-hilbert-spaces',
    track: 'quantum-data-encoding',
    title: 'Quantum Machine Learning in Feature Hilbert Spaces',
    shortTitle: 'Feature Hilbert Spaces',
    authors: ['Maria Schuld', 'Nathan Killoran'],
    year: 2019,
    venue: 'Physical Review Letters 122, 040504',
    arxivId: '1803.07128',
    doi: '10.1103/PhysRevLett.122.040504',
    sourceUrl: 'https://arxiv.org/abs/1803.07128',
    pdfUrl: 'https://arxiv.org/pdf/1803.07128',
    readingStatus: 'Annotated',
    readingDate: '2026-08-06',
    updated: '2026-08-06',
    readingTime: 15,
    tags: ['QML', 'feature maps', 'kernels', 'data encoding'],
    citation: 'Schuld, M., & Killoran, N. (2019). Quantum machine learning in feature Hilbert spaces. Physical Review Letters, 122, 040504.',
    abstractSummary: 'The paper interprets quantum data encoding as a nonlinear feature map into a quantum Hilbert space. It develops two related learning routes: estimating state overlaps for a classical kernel method and training a variational circuit as a linear model in the feature space.',
    whyReading: 'This paper gives me a clean language for discussing data encoding as model design rather than as a neutral upload step.',
    readingQuestion: 'What geometry does an encoding impose on data, and how do kernel and variational models use that geometry differently?',
    thesis: 'A quantum circuit that encodes x defines a feature state |φ(x)⟩; state overlaps and measured observables then implement learning models whose inductive bias comes from this embedding.',
    contributions: [
      'Connects quantum state preparation with nonlinear feature maps used in classical kernel methods.',
      'Separates an implicit kernel-estimation route from an explicit variational-model route.',
      'Shows that the quantum circuit determines the feature-space geometry.',
      'Provides a conceptual foundation for analyzing encodings through state overlaps.'
    ],
    equations: [
      { label: 'Quantum feature map', latex: 'x\\mapsto|\\phi(x)\\rangle=U_{\\phi}(x)|0\\rangle', note: 'The encoding circuit is the map from classical input to the model’s feature space.' },
      { label: 'Fidelity kernel', latex: 'K(x,z)=|\\langle\\phi(x)|\\phi(z)\\rangle|^2', note: 'The overlap determines which inputs the quantum representation treats as similar.' },
      { label: 'Explicit variational model', latex: 'f_{\\theta}(x)=\\langle\\phi(x)|V(\\theta)^{\\dagger} M V(\\theta)|\\phi(x)\\rangle', note: 'A trainable circuit and observable define a decision function on encoded data.' }
    ],
    sections: [
      {
        id: 'feature-map',
        title: '1. Encoding is a feature map',
        paragraphs: [
          'Once x becomes |φ(x)⟩, every later operation sees only the encoded state. If two inputs have identical states up to global phase, the model cannot distinguish them. If their overlap is small, the model sees them as distant.',
          'This makes preprocessing, gate functions, feature order, repetitions, and entanglers part of the hypothesis class. I should analyze them with the same care used to select a classical kernel.'
        ]
      },
      {
        id: 'two-routes',
        title: '2. Implicit and explicit models answer different questions',
        paragraphs: [
          'The implicit route estimates pairwise overlaps and passes the Gram matrix to a classical kernel algorithm. Training is classical after kernel estimation, but prediction still requires kernel evaluations involving new points.',
          'The explicit route trains parameters of a measured quantum model. It may avoid storing a full training kernel but introduces optimization, gradient, and sampling costs.'
        ]
      },
      {
        id: 'geometry',
        title: '3. Hilbert-space dimension is not enough',
        paragraphs: [
          'A large feature space does not automatically give useful generalization. What matters is the geometry induced on the actual data, the target labels, regularization, and how noise changes the overlaps.',
          'My experiments should visualize the kernel matrix, inspect its eigenvalues, compare within-class and between-class overlaps, and test simple classical kernels under matched tuning effort.'
        ]
      },
      {
        id: 'research-use',
        title: '4. How this changes my encoding studies',
        paragraphs: [
          'Instead of asking only how many qubits an encoding uses, I will ask which invariances and periodicities it introduces, which information it removes, and what similarity function it creates.',
          'A useful report connects circuit design to data geometry and then to test performance. The explanation should survive even if the quantum model does not outperform the baseline.'
        ]
      }
    ],
    comments: [
      { label: 'My main takeaway', title: 'Encoding is already modelling', text: 'There is no model-independent data upload. The chosen feature state decides which differences and similarities are available to every downstream learner.' },
      { label: 'Evaluation rule', title: 'Inspect the kernel before accuracy', text: 'A train/test score alone cannot explain the mechanism. The overlap matrix reveals whether the feature map preserves classes, collapses points, or creates near-orthogonality.' },
      { label: 'Claim boundary', title: 'Large Hilbert space is not evidence of advantage', text: 'Useful geometry, hard classical simulation, resource cost, and generalization must be demonstrated separately.' }
    ],
    strengths: [
      'Provides a precise conceptual bridge between quantum circuits and kernel methods.',
      'Clarifies two major architectures for quantum learning.',
      'Makes feature-map geometry an analyzable object.'
    ],
    limitations: [
      'The conceptual framework does not by itself establish quantum advantage.',
      'Practical loading, sampling, and noise costs require separate accounting.',
      'The illustrated continuous-variable feature map is not a universal prescription for all datasets.'
    ],
    questions: [
      'Which task symmetries should be encoded directly into Uφ(x)?',
      'When is the resulting kernel both useful and classically difficult to estimate?',
      'How stable is the kernel spectrum under finite shots and device noise?'
    ],
    connections: [
      { label: 'Research note · Quantum Data Encoding', href: 'research-note.html?note=quantum-data-encoding-as-model-design' },
      { label: 'Week 11 · Feature maps', href: 'lesson.html?week=11&topic=feature-maps' },
      { label: 'Week 11 · Quantum kernels', href: 'lesson.html?week=11&topic=quantum-kernels' }
    ]
  },
  {
    slug: 'havlicek-quantum-enhanced-feature-spaces',
    track: 'quantum-data-encoding',
    title: 'Supervised Learning with Quantum-Enhanced Feature Spaces',
    shortTitle: 'Quantum-Enhanced Feature Spaces',
    authors: ['Vojtech Havlíček', 'Antonio D. Córcoles', 'Kristan Temme', 'Aram W. Harrow', 'Abhinav Kandala', 'Jerry M. Chow', 'Jay M. Gambetta'],
    year: 2019,
    venue: 'Nature 567, 209–212',
    arxivId: '1804.11326',
    doi: '10.1038/s41586-019-0980-2',
    sourceUrl: 'https://arxiv.org/abs/1804.11326',
    pdfUrl: 'https://arxiv.org/pdf/1804.11326',
    readingStatus: 'Analysis draft',
    readingDate: '2026-08-06',
    updated: '2026-08-06',
    readingTime: 17,
    tags: ['quantum kernel', 'feature map', 'classifier', 'NISQ'],
    citation: 'Havlíček, V., et al. (2019). Supervised learning with quantum-enhanced feature spaces. Nature, 567, 209–212.',
    abstractSummary: 'The paper proposes and experimentally demonstrates two supervised-learning approaches on a superconducting processor: a variational quantum classifier and a quantum kernel estimator. Both encode data into a quantum feature space intended to be difficult to simulate classically.',
    whyReading: 'This paper connects the feature-space picture to concrete circuits, kernel estimation, and hardware experiments. I am reading it to learn how the encoding, learning rule, and empirical evidence should be separated.',
    readingQuestion: 'What evidence shows that a quantum feature map is useful, not merely high-dimensional or executable on quantum hardware?',
    thesis: 'A deliberately chosen data-dependent circuit can define a feature space used either by a variational classifier or by an overlap-based kernel estimator, but empirical usefulness and classical hardness require separate tests.',
    contributions: [
      'Introduces concrete quantum feature-map circuits for supervised learning.',
      'Develops both variational-classifier and quantum-kernel workflows.',
      'Implements small demonstrations on a superconducting quantum processor.',
      'Frames classical intractability of feature-space estimation as a possible route to quantum benefit.'
    ],
    equations: [
      { label: 'Feature state', latex: '|\\phi(x)\\rangle=U_{\\phi}(x)|0^n\\rangle', note: 'The circuit family and data-dependent phases determine the representation.' },
      { label: 'Kernel estimate', latex: 'K(x,z)=|\\langle 0^n|U_{\\phi}(z)^{\\dagger}U_{\\phi}(x)|0^n\\rangle|^2', note: 'The overlap can be estimated by composing one feature map with the inverse of another.' }
    ],
    sections: [
      {
        id: 'architecture',
        title: '1. One feature map supports two learning architectures',
        paragraphs: [
          'The variational classifier learns a measured decision boundary with trainable quantum parameters. The kernel method estimates pairwise similarities and delegates the classifier optimization to a classical method.',
          'This separation is useful because it identifies where difficulty occurs: quantum optimization in one route, kernel-evaluation cost and matrix quality in the other.'
        ]
      },
      {
        id: 'hardness',
        title: '2. Classical hardness and predictive usefulness are distinct',
        paragraphs: [
          'A feature map may be difficult to simulate yet produce a kernel that generalizes poorly. It may also produce a useful small-dataset kernel that is easy to approximate classically. Both properties must be investigated.',
          'I should not use circuit depth or Hilbert-space dimension as a proxy for either advantage or model quality. Simulability analysis and matched predictive baselines belong beside each other.'
        ]
      },
      {
        id: 'hardware',
        title: '3. Hardware execution adds an estimation layer',
        paragraphs: [
          'Finite sampling and noise perturb overlap estimates. The resulting empirical kernel may lose symmetry or positive semidefiniteness, requiring explicit correction or regularization.',
          'A hardware report should include compilation, two-qubit depth, shots per kernel entry, repeated estimates, matrix correction, and the total cost of train and test kernel construction.'
        ]
      },
      {
        id: 'evaluation',
        title: '4. My standard for a follow-up experiment',
        paragraphs: [
          'I would use fixed data splits, compare linear and RBF kernels, tune all models under comparable budgets, and report uncertainty across seeds and shot realizations.',
          'Then I would inspect the kernel spectrum and perform feature-map ablations. If performance changes, the analysis should connect the change to a specific geometric or circuit property.'
        ]
      }
    ],
    comments: [
      { label: 'My main takeaway', title: 'Separate representation, estimator, and learner', text: 'The feature map creates geometry, the quantum device estimates quantities in that geometry, and the classical or variational learner turns them into predictions. Each layer needs its own evidence.' },
      { label: 'Claim boundary', title: 'Experimental execution is not advantage', text: 'Running the workflow on hardware demonstrates feasibility at that size. Advantage additionally requires scaling, strong baselines, and credible hardness arguments.' },
      { label: 'Reproduction note', title: 'Count the whole kernel matrix', text: 'Per-circuit depth hides the O(m²) pairwise structure of a training kernel for m samples and the additional test-time evaluations.' }
    ],
    strengths: [
      'Connects QML concepts to concrete circuits and hardware.',
      'Presents two architectures that can be compared under one feature map.',
      'Highlights classical hardness as a mechanism to investigate.'
    ],
    limitations: [
      'Small demonstrations cannot establish favorable large-scale learning behavior.',
      'Kernel estimation can require many circuit executions as dataset size grows.',
      'Noise and finite shots can alter the mathematical properties of the kernel matrix.'
    ],
    questions: [
      'Which classical approximations best test the claimed feature-map hardness?',
      'How does kernel concentration change with qubit count and circuit depth?',
      'Which error-mitigation steps preserve a valid positive-semidefinite kernel?'
    ],
    connections: [
      { label: 'Research note · Quantum Data Encoding', href: 'research-note.html?note=quantum-data-encoding-as-model-design' },
      { label: 'Paper · Feature Hilbert Spaces', href: 'paper.html?paper=schuld-killoran-feature-hilbert-spaces' },
      { label: 'Week 11 · Evidence standards', href: 'lesson.html?week=11&topic=evidence-standards' }
    ]
  },
  {
    slug: 'perez-salinas-data-reuploading',
    track: 'quantum-data-encoding',
    title: 'Data Re-Uploading for a Universal Quantum Classifier',
    shortTitle: 'Data Re-Uploading',
    authors: ['Adrián Pérez-Salinas', 'Alba Cervera-Lierta', 'Elies Gil-Fuster', 'José I. Latorre'],
    year: 2020,
    venue: 'Quantum 4, 226',
    arxivId: '1907.02085',
    doi: '10.22331/q-2020-02-06-226',
    sourceUrl: 'https://arxiv.org/abs/1907.02085',
    pdfUrl: 'https://arxiv.org/pdf/1907.02085',
    readingStatus: 'Analysis draft',
    readingDate: '2026-08-06',
    updated: '2026-08-06',
    readingTime: 15,
    tags: ['data re-uploading', 'classifier', 'expressivity', 'one qubit'],
    citation: 'Pérez-Salinas, A., Cervera-Lierta, A., Gil-Fuster, E., & Latorre, J. I. (2020). Data re-uploading for a universal quantum classifier. Quantum, 4, 226.',
    abstractSummary: 'The paper shows how alternating data-dependent rotations with trainable processing layers can make even a single-qubit hybrid classifier expressive. Repeated data injection compensates for the limited representation available from encoding each feature only once.',
    whyReading: 'This paper directly addresses how often data should enter a circuit. It helps me study the trade-off between encoding depth, expressivity, optimization, and repeated execution.',
    readingQuestion: 'Why does repeated data encoding increase classifier expressivity, and what resources are hidden by the small qubit count?',
    thesis: 'A shallow one-time encoding restricts the functions accessible to a circuit; alternating data encodings with trainable transformations builds a richer nonlinear response without requiring a large register.',
    contributions: [
      'Shows a universal quantum-classifier construction based on repeated data re-uploading.',
      'Demonstrates that a single qubit plus a classical optimization loop can represent complex decision boundaries.',
      'Extends the approach to multidimensional inputs and multiple output classes.',
      'Benchmarks single- and multi-qubit versions on classification examples.'
    ],
    equations: [
      { label: 'Re-uploading architecture', latex: 'U_{\\theta}(x)=\\prod_{\\ell=1}^{L}W_{\\ell}(\\theta_{\\ell})S_{\\ell}(x)', note: 'Each layer alternates a data-dependent encoding S with a trainable processing unit W.' },
      { label: 'Measured prediction', latex: 'f_{\\theta}(x)=\\langle 0|U_{\\theta}(x)^{\\dagger} M U_{\\theta}(x)|0\\rangle', note: 'The repeated rotations create a trainable nonlinear function of the classical features.' }
    ],
    sections: [
      {
        id: 'one-shot-limit',
        title: '1. One-time encoding can be the bottleneck',
        paragraphs: [
          'If data enters only in an initial product-state layer, later trainable gates can transform the state but cannot create arbitrary new dependence on x. Re-uploading lets each layer introduce the features again in a different learned context.',
          'This is analogous to increasing functional basis complexity. The advantage is expressivity with few qubits; the cost is deeper data-dependent execution and a harder optimization landscape.'
        ]
      },
      {
        id: 'single-qubit',
        title: '2. Small qubit count does not mean small model complexity',
        paragraphs: [
          'A single qubit has a simple state space, but a long sequence of feature-dependent rotations can produce a complicated input-output function. Resource reporting must therefore include layer count and circuit calls, not only qubit count.',
          'The construction is a useful warning against comparing encodings on qubits alone. Depth, number of parameters, repeated loading, and trainability may dominate.'
        ]
      },
      {
        id: 'evaluation',
        title: '3. Expressivity must be paired with generalization',
        paragraphs: [
          'A sufficiently expressive classifier can fit complex training boundaries, but usefulness depends on held-out performance, calibration, robustness, and comparison with classical models of similar capacity.',
          'For my experiments, layer count should be treated as a hyperparameter. Learning curves and repeated seeds can reveal when extra re-uploading improves representation or simply increases variance.'
        ]
      },
      {
        id: 'encoding-study',
        title: '4. How I would extend the experiment',
        paragraphs: [
          'I would compare one-shot angle encoding, repeated encoding without entanglement, and repeated encoding with entanglement while controlling parameter count where possible.',
          'I would report test metrics beside circuit depth, two-qubit gates, gradient variance, optimizer evaluations, and total data-dependent circuit executions.'
        ]
      }
    ],
    comments: [
      { label: 'My main takeaway', title: 'Qubits and encoding depth trade against each other', text: 'A compact register can still represent a rich model when data is injected many times, but the saved qubits reappear as depth and optimization cost.' },
      { label: 'Experiment rule', title: 'Use layer-count ablations', text: 'Without L=1,2,… comparisons, I cannot attribute improvement specifically to re-uploading or know when the model begins to overfit.' },
      { label: 'Connection', title: 'Encoding and ansatz are no longer separate', text: 'In a re-uploading circuit, data maps and trainable transformations alternate, so representation learning and classifier learning happen together.' }
    ],
    strengths: [
      'Provides an intuitive and flexible route to expressive small-register models.',
      'Makes repeated encoding a concrete architectural design choice.',
      'Supports systematic layer and qubit ablations.'
    ],
    limitations: [
      'Greater expressivity can increase optimization difficulty and overfitting risk.',
      'Repeated data-dependent layers increase depth and execution cost.',
      'Benchmark success does not establish a quantum advantage over strong classical models.'
    ],
    questions: [
      'How does gradient variance scale with re-uploading depth?',
      'Which classical Fourier or neural models offer the fairest capacity-matched baseline?',
      'Can data symmetries reduce the number of re-uploading layers needed?'
    ],
    connections: [
      { label: 'Research note · Quantum Data Encoding', href: 'research-note.html?note=quantum-data-encoding-as-model-design' },
      { label: 'Week 11 · Variational classifiers', href: 'lesson.html?week=11&topic=variational-classifiers' },
      { label: 'Week 10 · Parameterized circuits', href: 'lesson.html?week=10&topic=parameterized-circuits' }
    ]
  }
];

window.getQuantumPaperHref = function(paper) {
  return 'paper.html?paper=' + encodeURIComponent(paper.slug);
};

window.getQuantumPaper = function(slug) {
  return window.quantumPapers.find(function(paper) { return paper.slug === slug; }) || null;
};
