window.quantumCourse = {
  bookGuides: {
    1: {
      title: 'Nielsen & Chuang · Chapter 2, §2.1',
      pages: 'Printed pages 61–79',
      focus: 'Bases, linear operators, Pauli matrices, inner products, eigenvectors, adjoints, tensor products, operator functions, commutators, and the polar/singular-value decompositions.',
      note: 'Read after the Start Here mathematics chapters. The textbook assumes some elementary linear algebra, so the course supplies that missing bridge first.'
    },
    2: {
      title: 'Nielsen & Chuang · Chapter 1, §1.2 and Chapter 2, §§2.2–2.4',
      pages: 'Printed pages 13–17 and 80–105',
      focus: 'Qubits, the state/evolution/measurement/composite-system postulates, projective measurements, POVMs, and density operators.',
      note: 'Use the postulates as a prediction framework: every symbol must be tied to a preparation, transformation, or measurement procedure.'
    },
    3: {
      title: 'Nielsen & Chuang · Chapter 4, §§4.2–4.6',
      pages: 'Printed pages 174–202',
      focus: 'Single-qubit operations, controlled operations, circuit measurement, universal gate sets, and circuit simulation.',
      note: 'The book develops the abstract circuit model. The Qiskit lab translates the same mathematics into current executable code.'
    },
    4: {
      title: 'Nielsen & Chuang · Chapter 1, §§1.3.6–1.3.7 and Chapter 2, §§2.3–2.6',
      pages: 'Printed pages 25–28 and 97–117',
      focus: 'Bell states, teleportation, superdense coding, density operators, Schmidt decomposition, EPR correlations, and Bell inequalities.',
      note: 'Keep resource accounting explicit: entanglement, classical communication, local operations, and measurement each play a different role.'
    },
    5: {
      title: 'Nielsen & Chuang · Chapter 1, §§1.4.3–1.4.4',
      pages: 'Printed pages 32–36',
      focus: 'Deutsch and Deutsch–Jozsa as first examples of interference-based query algorithms, followed by oracle and complexity context from Chapter 3.',
      note: 'The course extends the pattern to Bernstein–Vazirani and Simon while separating query count from the cost of building the oracle.'
    },
    6: {
      title: 'Nielsen & Chuang · Chapter 5, §§5.1–5.2 and Chapter 6, §§6.1–6.2',
      pages: 'Printed pages 216–226 and 248–263',
      focus: 'Quantum Fourier transform, phase estimation, the Grover iterate, geometric rotation, and performance analysis.',
      note: 'Follow amplitudes through a small register before relying on a circuit diagram; both algorithms are controlled interference, not parallel trial-and-error.'
    },
    7: {
      title: 'Nielsen & Chuang · Chapter 5, §§5.3–5.4 and Appendix 4',
      pages: 'Printed pages 226–245 and 625–638',
      focus: 'Order finding, factoring, modular arithmetic, continued fractions, and the classical reduction surrounding the quantum subroutine.',
      note: 'Shor is an end-to-end hybrid algorithm. The quantum period sample is useful only after classical validation and, when necessary, another attempt.'
    },
    8: {
      title: 'Nielsen & Chuang · Chapter 8, §§8.1–8.3 and Chapter 10',
      pages: 'Printed pages 353–386 and 425–499',
      focus: 'Quantum operations, operator-sum representations, noise channels, repetition and Shor codes, error-correction conditions, stabilizers, and fault tolerance.',
      note: 'The lab begins with a noisy channel. Error correction is then introduced as protected logical subspaces and syndrome information—not as copying an unknown qubit.'
    },
    9: {
      title: 'Nielsen & Chuang · Chapter 4, §4.7',
      pages: 'Printed pages 204–211',
      focus: 'Simulation of quantum systems and product-formula reasoning, supported by the operator and dynamics material from Chapter 2.',
      note: 'Modern Qiskit classes are newer than the book, but they implement the same Hamiltonian and unitary-evolution mathematics.'
    },
    10: {
      title: 'Nielsen & Chuang · Chapters 2 and 4 as prerequisites',
      pages: 'Printed pages 60–117 and 171–211',
      focus: 'Expectation values, unitary parameterized circuits, measurement, and circuit costs—the mathematical ingredients later used by variational algorithms.',
      note: 'VQE and QAOA are not covered as modern workflows in this 2010 edition. The course uses the book for foundations and current IBM/Qiskit material for the algorithmic workflow.'
    },
    11: {
      title: 'Nielsen & Chuang · §§2.4–2.5, Chapters 9 and 11',
      pages: 'Printed pages 98–111, 399–416, and 500–533',
      focus: 'Density operators, fidelity and distance measures, entropy, and information—the mathematical language behind state embeddings and kernel comparisons.',
      note: 'Quantum machine learning is not a chapter of this edition. Modern claims therefore need contemporary sources, classical baselines, and explicit data-loading costs.'
    }
  },

  foundationsByWeek: {
    1: {
      question: 'What mathematical objects are allowed to represent a quantum state or operation?',
      prerequisites: ['Arithmetic with fractions and square roots', 'Basic algebra and functions', 'No prior physics or programming required'],
      bridge: 'Begin with ordinary two-dimensional vectors, then allow complex coordinates. Normalization turns squared magnitudes into a probability distribution; inner products express overlap; matrices transform vectors; tensor products combine systems.'
    },
    2: {
      question: 'How does the mathematics become a physical prediction?',
      prerequisites: ['Complex vectors and inner products', 'Normalized states and orthonormal bases', 'Basic probability'],
      bridge: 'A preparation is modeled by a state, an isolated transformation by a unitary, and a measurement by operators or projectors. These rules predict statistics across repeated identically prepared experiments.'
    },
    3: {
      question: 'How does a matrix become a program?',
      prerequisites: ['Matrix multiplication and adjoints', 'Qubit states and measurement', 'Tensor-product ordering'],
      bridge: 'A quantum circuit is a time-ordered factorization of a unitary into implementable gates, followed by measurements. Correct analysis tracks both amplitude and relative phase at every step.'
    },
    4: {
      question: 'What information exists only in a joint system?',
      prerequisites: ['Two-qubit tensor products', 'Controlled gates', 'Density matrices and measurement'],
      bridge: 'A joint state is entangled when it cannot be factored into independent subsystem states. Local reduced states may look random even when the full state is pure and perfectly correlated.'
    },
    5: {
      question: 'How can a phase encode a property of a black-box function?',
      prerequisites: ['Hadamard interference', 'Reversible functions', 'Binary inner products modulo two'],
      bridge: 'An oracle writes function information reversibly. Phase kickback converts that information into relative phases, and a final basis change makes a global property observable.'
    },
    6: {
      question: 'How can interference reveal phase or amplify a desired subspace?',
      prerequisites: ['Complex roots of unity', 'Eigenvectors and eigenvalues', 'Oracles and reflections'],
      bridge: 'Phase estimation converts an eigenvalue phase into bits through controlled powers and an inverse QFT. Grover alternates two reflections, producing a rotation toward marked states.'
    },
    7: {
      question: 'How does periodicity expose a non-trivial factor?',
      prerequisites: ['Greatest common divisors', 'Modular arithmetic', 'Phase estimation and continued fractions'],
      bridge: 'Classical preprocessing reduces factoring to finding the order of a modulo N. The quantum subroutine samples information about that period; classical continued fractions and gcd calculations recover and verify a candidate.'
    },
    8: {
      question: 'How do we describe irreversible noise without abandoning quantum mechanics?',
      prerequisites: ['Density operators and partial trace', 'Pauli operators', 'Probability and conditional inference'],
      bridge: 'A channel maps density operators to density operators, often through Kraus operators. A code stores logical information nonlocally so syndrome measurements can identify an error class without revealing the logical amplitudes.'
    },
    9: {
      question: 'How does an energy model become time evolution on qubits?',
      prerequisites: ['Hermitian operators and spectra', 'Matrix exponentials', 'Pauli strings and non-commutation'],
      bridge: 'A Hamiltonian is an observable that generates time evolution. Pauli decomposition turns it into circuit-ready terms; product formulas approximate exponentials of sums that cannot be implemented in one step.'
    },
    10: {
      question: 'How can a quantum circuit participate in a classical optimization loop?',
      prerequisites: ['Parameterized rotations', 'Expectation values', 'Basic optimization and train/test reasoning'],
      bridge: 'A parameterized circuit prepares a trial state, measurements estimate an objective, and a classical optimizer proposes the next parameters. A useful experiment controls seeds, uncertainty, baselines, and total circuit calls.'
    },
    11: {
      question: 'When does a quantum feature representation help rather than merely look larger?',
      prerequisites: ['Inner products and fidelity', 'Parameterized circuits', 'Supervised-learning evaluation'],
      bridge: 'A feature map embeds data into quantum states. Kernels compare state overlaps and variational models learn measured expectations, but data loading, sampling, trainability, and classical simulability must be included in any advantage claim.'
    }
  },

  labs: {
    1: {
      tool: 'Python + NumPy',
      title: 'See relative phase become a measurable difference',
      objective: 'Build states and operators directly as arrays so every Qiskit object later has a concrete linear-algebra meaning.',
      install: 'python -m pip install numpy',
      code: `import numpy as np

ket0 = np.array([1, 0], dtype=complex)
ket1 = np.array([0, 1], dtype=complex)
H = np.array([[1, 1], [1, -1]], dtype=complex) / np.sqrt(2)

plus = (ket0 + ket1) / np.sqrt(2)
minus = (ket0 - ket1) / np.sqrt(2)

for name, state in {"plus": plus, "minus": minus}.items():
    assert np.isclose(np.vdot(state, state), 1.0)
    z_probs = np.abs(state) ** 2
    after_h = H @ state
    print(name, "Z probabilities:", z_probs)
    print(name, "after H:", np.round(after_h, 6))`,
      expected: 'Both inputs have Z probabilities [0.5, 0.5]. After H, |+⟩ becomes [1, 0] and |−⟩ becomes [0, 1].',
      explain: ['np.vdot conjugates its first argument, so it implements a bra–ket inner product.', 'The final Hadamard converts a relative sign into different populations. This is the smallest useful model of interference.', 'The assertions are part of the science: a state must remain normalized and a claimed unitary must preserve the norm.'],
      variations: ['Change the relative phase continuously from 0 to 2π and plot the final probability of 0.', 'Construct a projector and verify P²=P.', 'Diagonalize X, Y, Z, or H with numpy.linalg.eigh.', 'Translate one Dirac expression into an explicit array calculation.', 'Check U†U=I for a matrix before calling it a gate.', 'Build |01⟩ and local X operators with np.kron; state your basis order first.']
    },
    2: {
      tool: 'Qiskit SDK · ideal statevector',
      title: 'Prepare a qubit, predict it, then sample it',
      objective: 'Connect exact amplitudes, Pauli expectation values, and finite-shot frequencies without needing a cloud account.',
      install: 'python -m pip install qiskit',
      code: `from qiskit import QuantumCircuit
from qiskit.quantum_info import Pauli, Statevector

qc = QuantumCircuit(1)
qc.ry(1.10, 0)
qc.rz(0.70, 0)

state = Statevector.from_instruction(qc)
print("state:", state)
print("exact Z probabilities:", state.probabilities_dict())
for label in ["X", "Y", "Z"]:
    value = state.expectation_value(Pauli(label)).real
    print(f"<{label}> = {value:.6f}")

state.seed(7)
print("1000 synthetic shots:", state.sample_counts(1000))`,
      expected: 'The two exact probabilities sum to one; the three Pauli expectations form the Bloch vector; the sampled counts fluctuate around the exact Z distribution.',
      explain: ['Statevector.from_instruction starts from |0⟩ and applies the circuit exactly.', 'Sampling does not reveal the amplitudes; it draws classical outcomes from the measurement distribution.', 'The Bloch vector can be reconstructed from X, Y, and Z expectations, but that requires repeated preparations in different measurement settings.'],
      variations: ['Prepare a state with explicit initialize and verify its probabilities.', 'Compare 100, 1,000, and 10,000 shots to quantify sampling error.', 'Rotate into X and Y measurement bases and reproduce the Pauli expectations from counts.', 'Recover θ and φ from the Bloch-vector components.', 'Construct pure and mixed density matrices and compare Tr(ρ²).', 'Attempt to distinguish two non-orthogonal states and explain why one shot cannot be conclusive.']
    },
    3: {
      tool: 'Qiskit SDK · Operator and Statevector',
      title: 'Prove circuit identities with matrices and states',
      objective: 'Treat a gate identity as a testable equality, allowing a physically irrelevant global phase when appropriate.',
      install: 'python -m pip install qiskit',
      code: `import numpy as np
from qiskit import QuantumCircuit
from qiskit.quantum_info import Operator, Statevector

def operator_for(build):
    qc = QuantumCircuit(1)
    build(qc)
    return Operator(qc).data

hzh = operator_for(lambda q: (q.h(0), q.z(0), q.h(0)))
x = operator_for(lambda q: q.x(0))
print("HZH equals X:", np.allclose(hzh, x))

qc = QuantumCircuit(2)
qc.h(0)
qc.cx(0, 1)
bell = Statevector.from_instruction(qc)
print("Bell probabilities:", bell.probabilities_dict())
print(qc.draw(output="text"))`,
      expected: 'The identity check prints True. The Bell circuit has nonzero probabilities only for 00 and 11.',
      explain: ['Qiskit composes instructions in circuit-time order while Operator exposes the resulting matrix.', 'Matrix equality is stricter than physical equivalence; two unitaries can differ by one global phase and still act identically on all states.', 'CNOT on a superposed control can create entanglement, whereas it merely acts like classical XOR on basis inputs.'],
      variations: ['Verify H²=I and HXH=Z.', 'Compare P(φ) with Rz(φ) up to global phase.', 'Build and inspect one controlled-U matrix.', 'Test a Toffoli on all eight basis inputs.', 'Compare circuit depth before and after removing barriers.', 'Approximate a rotation using a chosen discrete gate set and report error and gate count.']
    },
    4: {
      tool: 'Qiskit SDK · DensityMatrix and partial_trace',
      title: 'Show that a pure Bell pair looks mixed locally',
      objective: 'Calculate joint and reduced states so entanglement is visible as a mathematical fact, not a slogan.',
      install: 'python -m pip install qiskit',
      code: `import numpy as np
from qiskit import QuantumCircuit
from qiskit.quantum_info import DensityMatrix, Statevector, partial_trace

qc = QuantumCircuit(2)
qc.h(0)
qc.cx(0, 1)

psi_ab = Statevector.from_instruction(qc)
rho_ab = DensityMatrix(psi_ab)
rho_a = partial_trace(rho_ab, [1])

print("joint purity:", np.trace(rho_ab.data @ rho_ab.data).real)
print("reduced state:\\n", np.round(rho_a.data, 6))
print("reduced purity:", np.trace(rho_a.data @ rho_a.data).real)`,
      expected: 'The joint purity is 1, while the reduced density matrix is I/2 with purity 1/2.',
      explain: ['The full Bell pair is a pure vector; uncertainty appears only when one subsystem is ignored.', 'Partial trace preserves every statistic available to the subsystem that remains.', 'Local randomness plus joint correlation does not permit signalling: neither party controls the random local outcome.'],
      variations: ['List amplitudes and probabilities in the full two-qubit basis.', 'Use a factorization or Schmidt-rank test on several states.', 'Trace out each side and compare the two reduced spectra.', 'Implement teleportation and verify the receiver state for several inputs.', 'Encode and decode all four superdense-coding messages.', 'Estimate CHSH from four measurement settings and attach shot uncertainty.']
    },
    5: {
      tool: 'Qiskit SDK · StatevectorSampler',
      title: 'Recover a Bernstein–Vazirani secret in one oracle query',
      objective: 'Watch a Boolean linear function become phase and then become an observable bit string through interference.',
      install: 'python -m pip install qiskit',
      code: `from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler

secret = "1011"
n = len(secret)
qc = QuantumCircuit(n)
qc.h(range(n))

# Phase oracle for f(x) = s · x mod 2.
for qubit, bit in enumerate(reversed(secret)):
    if bit == "1":
        qc.z(qubit)

qc.h(range(n))
qc.measure_all()

result = StatevectorSampler(seed=11).run([qc], shots=256).result()
counts = result[0].data.meas.get_counts()
print(counts)`,
      expected: 'All ideal shots return 1011. The apparent parallelism is not enough by itself; the phase oracle and final interference are what expose the secret.',
      explain: ['The oracle is assumed as one query, even though its gate construction has a cost.', 'The phase pattern is a character of the Boolean vector space; the final Hadamards implement its Fourier transform.', 'A fair speedup statement names the promise, the oracle-access model, the classical baseline, and the post-processing cost.'],
      variations: ['Write both bit-oracle and phase-oracle definitions for the same function.', 'Demonstrate phase kickback with a target in |−⟩.', 'Implement every one-bit Deutsch oracle and classify it.', 'Build a three-bit Deutsch–Jozsa oracle and test the promise.', 'Generate random BV secrets and verify endian conventions.', 'For Simon, collect y·s=0 equations and solve them over GF(2).']
    },
    6: {
      tool: 'Qiskit SDK · StatevectorSampler',
      title: 'Run one exact Grover rotation for a two-qubit search',
      objective: 'Separate the marked-state phase flip from the diffusion reflection and verify the success probability after each iterate.',
      install: 'python -m pip install qiskit',
      code: `from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler

qc = QuantumCircuit(2)
qc.h([0, 1])          # uniform state
qc.cz(0, 1)          # mark |11> by phase

# Diffusion: H X (phase flip on |00>) X H
qc.h([0, 1])
qc.x([0, 1])
qc.cz(0, 1)
qc.x([0, 1])
qc.h([0, 1])
qc.measure_all()

result = StatevectorSampler(seed=6).run([qc], shots=256).result()
print(result[0].data.meas.get_counts())`,
      expected: 'For N=4 and one marked item, one Grover iterate returns 11 with probability one in the ideal model.',
      explain: ['Oracle and diffusion are reflections. Their product is a rotation in the plane spanned by the good and bad components.', 'More iterations are not always better; rotating beyond the marked direction lowers success.', 'QFT and phase estimation use a different interference pattern but share the need to account for controlled-operation cost.'],
      variations: ['Construct the Fourier basis for N=4 by hand.', 'Build QFT and inverse QFT for three qubits and verify their composition.', 'Estimate a known one-qubit eigenphase at increasing precision.', 'Track Grover amplitudes after preparation, oracle, and diffusion.', 'Mark two of four states and predict the best iteration count.', 'Count two-qubit gates in the oracle and controlled-U blocks.']
    },
    7: {
      tool: 'Python · exact classical post-processing',
      title: 'Work the part of Shor that must be correct before a quantum circuit matters',
      objective: 'Find orders, extract factors, and validate failure cases on small integers using the same arithmetic surrounding quantum order finding.',
      install: 'No extra package required',
      code: `from math import gcd

def multiplicative_order(a, n):
    if gcd(a, n) != 1:
        return None
    value = 1
    for r in range(1, n + 1):
        value = (value * a) % n
        if value == 1:
            return r
    return None

N, a = 15, 2
r = multiplicative_order(a, N)
print("order:", r)

if r is not None and r % 2 == 0:
    left = gcd(pow(a, r // 2) - 1, N)
    right = gcd(pow(a, r // 2) + 1, N)
    print("factor candidates:", left, right)`,
      expected: 'For N=15 and a=2, r=4 and the gcd calculations return 3 and 5.',
      explain: ['The quantum subroutine estimates periodic information; it does not directly print the factors.', 'Some bases fail because the order is odd or a^(r/2) is −1 mod N, so validation and retries are part of the algorithm.', 'Continued fractions reconstruct a candidate r from a finite-precision phase sample, after which modular exponentiation checks it.'],
      variations: ['Implement the Euclidean algorithm and compare with math.gcd.', 'Create tables of powers modulo N and identify periods.', 'List every failure condition in the factoring reduction.', 'Relate phase-estimation samples y/2^t to fractions s/r.', 'Trace the complete hybrid workflow for N=15.', 'Separate Shor’s impact on RSA/ECC from the effect on symmetric keys, PQC, and QKD.']
    },
    8: {
      tool: 'Qiskit Aer · optional noise simulator',
      title: 'Compare an ideal Bell circuit with a depolarizing-noise model',
      objective: 'Turn “noise” into a specified channel with an explicit location, strength, backend, and measured consequence.',
      install: 'python -m pip install qiskit qiskit-aer',
      code: `from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator
from qiskit_aer.noise import NoiseModel, depolarizing_error

qc = QuantumCircuit(2)
qc.h(0)
qc.cx(0, 1)
qc.measure_all()

noise = NoiseModel()
noise.add_all_qubit_quantum_error(depolarizing_error(0.01, 1), ["h"])
noise.add_all_qubit_quantum_error(depolarizing_error(0.04, 2), ["cx"])

backend = AerSimulator(noise_model=noise)
tqc = transpile(qc, backend)
counts = backend.run(tqc, shots=4000, seed_simulator=8).result().get_counts()
print(counts)`,
      expected: 'Ideal Bell outcomes are 00 and 11. Under this model, 01 and 10 appear and the exact frequencies vary with the seed and shot count.',
      explain: ['A noise model is not a hardware fact unless its parameters and assumptions are tied to data.', 'Density matrices and channels describe unconditioned evolution; individual trajectories are only one possible simulation picture.', 'Error correction, mitigation, suppression, and fault tolerance answer different questions and should not be used as synonyms.'],
      variations: ['Compare relaxation, dephasing, readout, and coherent errors.', 'Check the Kraus completeness relation for a channel.', 'Explain syndrome extraction without revealing α and β.', 'Implement a three-qubit bit-flip code and its syndrome table.', 'Write stabilizer generators and logical operators for a small code.', 'Show one error-propagation path that a fault-tolerant gadget must prevent.']
    },
    9: {
      tool: 'Qiskit SDK · SparsePauliOp and PauliEvolutionGate',
      title: 'Evolve a two-qubit spin Hamiltonian and measure an observable',
      objective: 'Build a Hamiltonian from Pauli terms, generate e^(−itH), and compare observables across time.',
      install: 'python -m pip install qiskit',
      code: `import numpy as np
from qiskit import QuantumCircuit
from qiskit.circuit.library import PauliEvolutionGate
from qiskit.quantum_info import Pauli, SparsePauliOp, Statevector

H = SparsePauliOp(["ZZ", "XI", "IX"], coeffs=[-1.0, -0.7, -0.7])

for t in np.linspace(0, 2.0, 9):
    qc = QuantumCircuit(2)
    qc.x(0)  # initial |01> in Qiskit's displayed bit order
    qc.append(PauliEvolutionGate(H, time=float(t)), [0, 1])
    state = Statevector.from_instruction(qc)
    z0 = state.expectation_value(Pauli("IZ")).real
    print(f"t={t:.2f}, <Z0>={z0:.6f}")`,
      expected: 'The expectation value changes with time because the transverse X terms do not commute with Z magnetization.',
      explain: ['SparsePauliOp records coefficients and Pauli strings without building a dense 2^n by 2^n matrix.', 'PauliEvolutionGate represents Hamiltonian evolution; transpilation determines how that operation is synthesized for a target.', 'A serious simulation study separates model error, product-formula error, finite-shot error, and device noise.'],
      variations: ['Interpret the Hamiltonian spectrum and ground state.', 'Reconstruct a dense matrix from its Pauli terms.', 'Build a basis-change circuit for each measured Pauli string.', 'Compare exact evolution with a first-order product formula.', 'Track correlations in an Ising or Heisenberg example.', 'Run a convergence study over time step, shot count, and circuit depth.']
    },
    10: {
      tool: 'Qiskit SDK · parameter binding and Statevector',
      title: 'Solve the smallest variational energy problem transparently',
      objective: 'Expose every part of a variational loop before adding an optimizer or a large ansatz.',
      install: 'python -m pip install qiskit numpy',
      code: `import numpy as np
from qiskit import QuantumCircuit
from qiskit.circuit import Parameter
from qiskit.quantum_info import Pauli, Statevector

theta = Parameter("theta")
ansatz = QuantumCircuit(1)
ansatz.ry(theta, 0)
H = Pauli("Z")

records = []
for value in np.linspace(0, 2 * np.pi, 101):
    bound = ansatz.assign_parameters({theta: value})
    state = Statevector.from_instruction(bound)
    energy = state.expectation_value(H).real
    records.append((energy, value))

best_energy, best_theta = min(records)
print(f"best E={best_energy:.6f} at theta={best_theta:.6f}")`,
      expected: 'The minimum is approximately −1 near θ=π, the ground-state energy of Z with trial state Ry(θ)|0⟩.',
      explain: ['The ansatz defines reachable states, the observable defines the objective, and the classical search chooses parameters.', 'Exact statevectors remove shot and hardware noise, making this a debugging baseline rather than a hardware result.', 'For larger experiments, report circuit evaluations, seeds, uncertainty, optimizer settings, and exact or classical reference values.'],
      variations: ['Change the ansatz and identify its reachable state family.', 'Estimate the energy from finite shots.', 'Compare gradient-free search with a parameter-shift gradient.', 'Run VQE for a two-qubit Pauli Hamiltonian.', 'Map a two-vertex Max-Cut problem to a cost Hamiltonian.', 'Repeat across seeds and plot the full optimization histories.']
    },
    11: {
      tool: 'Qiskit SDK · state-overlap kernel',
      title: 'Build and inspect a quantum kernel matrix without hiding data costs',
      objective: 'Encode a tiny classical dataset, calculate state fidelities, and test the mathematical properties of the resulting kernel.',
      install: 'python -m pip install qiskit numpy',
      code: `import numpy as np
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

X = np.array([[0.1, 0.2], [0.2, 0.1], [2.7, 2.9], [2.9, 2.7]])

def encode(x):
    qc = QuantumCircuit(2)
    qc.h([0, 1])
    qc.rz(float(x[0]), 0)
    qc.rz(float(x[1]), 1)
    qc.cx(0, 1)
    qc.ry(float(x[0] * x[1]), 1)
    return Statevector.from_instruction(qc)

states = [encode(x) for x in X]
K = np.array([[abs(a.inner(b)) ** 2 for b in states] for a in states])
print(np.round(K, 4))
print("eigenvalues:", np.round(np.linalg.eigvalsh(K), 8))`,
      expected: 'The kernel is symmetric, has ones on the diagonal, and is positive semidefinite up to numerical precision.',
      explain: ['The feature map defines the model’s inductive bias; a large Hilbert space alone says nothing about predictive usefulness.', 'Exact overlaps are a baseline. Hardware estimation introduces shot noise that can perturb symmetry and positive semidefiniteness.', 'A valid comparison includes preprocessing, hyperparameter tuning, data splits, runtime, and competitive classical kernels.'],
      variations: ['Classify which QML setting the experiment uses.', 'Compare angle and amplitude encoding costs.', 'Ablate entangling gates from the feature map.', 'Compare the quantum kernel with linear and RBF kernels.', 'Train a small variational classifier with multiple seeds.', 'Design a train/validation/test protocol and report confidence intervals and circuit calls.']
    }
  }
};
