import type { Course } from "../types";

export const course: Course = {
  code: "10-725",
  title: "Optimization for Machine Learning",
  summary:
    "A graduate introduction to convex optimization for machine learning: convex sets and functions, first-order methods like gradient and stochastic gradient descent, and duality, Newton's method, and interior-point methods. You'll learn both how these algorithms work and how fast they provably converge.",
  instructors: [{ name: "Barnabás Póczos", photo: "/landing/faculty/poczos.png" }],
  level: "Graduate",
  prerequisites: [
    "Linear algebra, including eigenvalues, eigenvectors, and positive semidefinite matrices",
    "Multivariable calculus, including gradients, Hessians, and Taylor expansions",
    "Comfort reading and writing mathematical proofs",
    "Some exposure to machine learning helps, e.g. having trained a linear or logistic regression model",
  ],
  easierCourses: [
    {
      code: "10-701",
      title: "Introduction to Machine Learning",
      href: "/courses/10-701",
      reason:
        "It introduces the ML models whose training problems this course teaches you to optimize.",
    },
  ],
  premiereDate: "2026-11-12",
  youtubePlaylistId: "PLq7Xk2RmV9cTb4Hn8Lw3Jd6Fz1YsA5pGe",
  units: [
    {
      id: "convexity-basics",
      title: "Convexity basics",
      lectures: [
        {
          id: "convex-sets-and-functions",
          title: "Convex Sets and Convex Functions",
          summary:
            "Defines convex sets and convex functions, gives first- and second-order characterizations, and covers the operations that preserve convexity.",
          durationSeconds: 4740,
          premiereDate: "2026-11-12",
          youtubeVideoId: "Kp3vX9qLm2A",
          chapters: [
            { title: "Why convexity matters", start: 0 },
            { title: "Convex sets and examples", start: 780 },
            { title: "Convex functions", start: 1860 },
            { title: "First- and second-order conditions", start: 2880 },
            { title: "Operations that preserve convexity", start: 3840 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/10-725/lecture-01-slides.pdf",
          slidesBytes: 2037356,
          notesBytes: 416765,
          notesUrl: "https://learn.cs.cmu.edu/materials/10-725/lecture-01-notes.pdf",
          readings: [
            {
              title: "Convex sets; Convex functions",
              source: "Boyd & Vandenberghe · Convex Optimization, Ch. 2–3",
              url: "https://web.stanford.edu/~boyd/cvxbook/",
            },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt: "Which of these sets in R^n is NOT convex?",
              choices: [
                "A half-space {x : aᵀx ≤ b}",
                "The Euclidean unit ball {x : ‖x‖₂ ≤ 1}",
                "The set of positive semidefinite n×n matrices",
                "The unit sphere {x : ‖x‖₂ = 1}",
              ],
              answer: 3,
              chapterIndex: 1,
              explanation:
                "The midpoint of two antipodal points on the unit sphere is the origin, which is not on the sphere. The other three sets are all convex.",
            },
            {
              id: "q2",
              prompt:
                "A twice-differentiable function f with a convex domain is convex if and only if:",
              choices: [
                "∇f(x) = 0 at some point x",
                "∇²f(x) is positive definite at a single point",
                "∇²f(x) is positive semidefinite for every x in the domain",
                "All entries of ∇²f(x) are nonnegative",
              ],
              answer: 2,
              chapterIndex: 3,
              explanation:
                "The second-order condition says f is convex exactly when its Hessian is positive semidefinite everywhere on its (convex) domain. Nonnegative entries is neither necessary nor sufficient.",
            },
            {
              id: "q3",
              prompt:
                "Which operation does NOT preserve convexity of functions in general?",
              choices: [
                "Nonnegative weighted sum of convex functions",
                "Pointwise minimum of two convex functions",
                "Composition with an affine map, f(Ax + b)",
                "Pointwise maximum of convex functions",
              ],
              answer: 1,
              chapterIndex: 4,
              explanation:
                "The minimum of x² and (x − 2)² is convex on each piece but has a bump at x = 1, so it is not convex. The other three operations always preserve convexity.",
            },
          ],
        },
        {
          id: "optimality-conditions",
          title: "Convex Optimization Problems and Optimality Conditions",
          summary:
            "Formulates convex optimization problems in standard form and derives the first-order optimality conditions for unconstrained and constrained problems.",
          durationSeconds: 4860,
          premiereDate: "2026-11-17",
          youtubeVideoId: "bT7nQw4ZcR8",
          chapters: [
            { title: "Standard form problems", start: 0 },
            { title: "Local versus global optima", start: 960 },
            { title: "Unconstrained optimality", start: 1920 },
            { title: "Constrained first-order condition", start: 2940 },
            { title: "LPs, QPs, and examples", start: 3900 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/10-725/lecture-02-slides.pdf",
          slidesBytes: 4109062,
          notesBytes: 582723,
          notesUrl: "https://learn.cs.cmu.edu/materials/10-725/lecture-02-notes.pdf",
          readings: [
            {
              title: "Convex optimization problems",
              source: "Boyd & Vandenberghe · Convex Optimization, §4.1–4.3",
              url: "https://web.stanford.edu/~boyd/cvxbook/",
            },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt:
                "For a differentiable convex function f defined on all of R^n, a point x* minimizes f if and only if:",
              choices: [
                "∇f(x*) = 0",
                "∇²f(x*) is positive definite",
                "f(x*) = 0",
                "∇f(x*) has nonnegative entries",
              ],
              answer: 0,
              chapterIndex: 2,
              explanation:
                "For convex f, f(y) ≥ f(x*) + ∇f(x*)ᵀ(y − x*), so a zero gradient certifies global optimality, and a minimizer of a differentiable function on an open set must have zero gradient.",
            },
            {
              id: "q2",
              prompt: "What is special about local minima of a convex optimization problem?",
              choices: [
                "There is always exactly one",
                "They occur only on the boundary of the feasible set",
                "Every local minimum is also a global minimum",
                "They can be found only by second-order methods",
              ],
              answer: 2,
              chapterIndex: 1,
              explanation:
                "If a feasible point were locally but not globally optimal, moving toward a better point along a line segment would stay feasible and decrease the objective, contradicting local optimality. Minima need not be unique, though.",
            },
            {
              id: "q3",
              prompt:
                "For minimizing a differentiable convex f over a convex set C, a feasible x is optimal if and only if:",
              choices: [
                "∇f(x) = 0",
                "x lies on the boundary of C",
                "∇f(x)ᵀx ≤ 0",
                "∇f(x)ᵀ(y − x) ≥ 0 for every y in C",
              ],
              answer: 3,
              chapterIndex: 3,
              explanation:
                "The condition says no feasible direction is a descent direction. The gradient need not vanish when the minimizer sits on the boundary of C.",
            },
          ],
        },
      ],
    },
    {
      id: "first-order-methods",
      title: "First-order methods",
      lectures: [
        {
          id: "gradient-descent",
          title: "Gradient Descent",
          summary:
            "Analyzes gradient descent on smooth convex and strongly convex functions, including step-size choice, backtracking line search, and convergence rates.",
          durationSeconds: 4620,
          premiereDate: "2026-11-19",
          youtubeVideoId: "Xr2mHd5sJ0e",
          chapters: [
            { title: "The gradient descent update", start: 0 },
            { title: "Smoothness and step sizes", start: 840 },
            { title: "O(1/k) rate for convex functions", start: 1800 },
            { title: "Strong convexity and linear rates", start: 2820 },
            { title: "Backtracking line search", start: 3780 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/10-725/lecture-03-slides.pdf",
          slidesBytes: 2362093,
          notesBytes: 423156,
          notesUrl: "https://learn.cs.cmu.edu/materials/10-725/lecture-03-notes.pdf",
          readings: [
            {
              title: "Unconstrained minimization; Gradient descent",
              source: "Boyd & Vandenberghe · Convex Optimization, §9.1–9.3",
              url: "https://web.stanford.edu/~boyd/cvxbook/",
            },
            {
              title: "Dimension-free convex optimization",
              source: "Bubeck · Convex Optimization: Algorithms and Complexity, Ch. 3",
              url: "https://arxiv.org/abs/1405.4980",
            },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt:
                "For a convex, L-smooth function, gradient descent with step size 1/L guarantees f(x_k) − f* decreases at what rate?",
              choices: [
                "O(1/√k)",
                "O(1/k)",
                "O(1/k²)",
                "It is not guaranteed to decrease",
              ],
              answer: 1,
              chapterIndex: 2,
              explanation:
                "The standard analysis gives f(x_k) − f* ≤ L‖x₀ − x*‖² / (2k), which is O(1/k). The O(1/k²) rate requires Nesterov's accelerated method.",
            },
            {
              id: "q2",
              prompt:
                "If f is m-strongly convex and L-smooth, how does gradient descent with a suitable fixed step converge?",
              choices: [
                "Sublinearly, at rate O(1/√k)",
                "Quadratically, independent of L and m",
                "It may diverge for any fixed step size",
                "Linearly, with a contraction factor that worsens as L/m grows",
              ],
              answer: 3,
              chapterIndex: 3,
              explanation:
                "Strong convexity gives a geometric (linear) rate, with error shrinking by a factor like 1 − m/L per step, so ill-conditioned problems with large L/m converge slowly.",
            },
            {
              id: "q3",
              prompt: "What is the main practical benefit of backtracking line search?",
              choices: [
                "It picks a good step size without knowing the smoothness constant L",
                "It turns gradient descent into a second-order method",
                "It guarantees convergence for nonconvex functions to a global minimum",
                "It removes the need to compute gradients",
              ],
              answer: 0,
              chapterIndex: 4,
              explanation:
                "Backtracking shrinks the step until a sufficient-decrease condition holds, so it adapts to the local curvature and keeps the O(1/k) guarantee without requiring L in advance.",
            },
          ],
        },
        {
          id: "subgradient-and-proximal-methods",
          title: "Subgradient and Proximal Gradient Methods",
          summary:
            "Extends first-order methods to nonsmooth objectives using subgradients, and to composite objectives like the lasso using proximal operators.",
          durationSeconds: 4920,
          premiereDate: "2026-11-24",
          youtubeVideoId: "fM8wY1cVn6u",
          chapters: [
            { title: "Subgradients and subdifferentials", start: 0 },
            { title: "The subgradient method", start: 1020 },
            { title: "Convergence and step sizes", start: 2040 },
            { title: "Proximal operators", start: 3000 },
            { title: "Proximal gradient and the lasso", start: 3960 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/10-725/lecture-04-slides.pdf",
          slidesBytes: 2071313,
          notesBytes: 200187,
          notesUrl: "https://learn.cs.cmu.edu/materials/10-725/lecture-04-notes.pdf",
          readings: [
            {
              title: "Nonsmooth convex optimization",
              source: "Nesterov · Lectures on Convex Optimization, Ch. 3",
            },
            {
              title: "Dimension-free convex optimization",
              source: "Bubeck · Convex Optimization: Algorithms and Complexity, Ch. 3",
              url: "https://arxiv.org/abs/1405.4980",
            },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt: "What is the subdifferential of f(x) = |x| at x = 0?",
              choices: [
                "{0}",
                "{−1, 1}",
                "The interval [−1, 1]",
                "It is empty because |x| is not differentiable at 0",
              ],
              answer: 2,
              chapterIndex: 0,
              explanation:
                "Any slope g with |y| ≥ g·y for all y works, which holds exactly when −1 ≤ g ≤ 1. Convex functions have nonempty subdifferentials at interior points even where they are not differentiable.",
            },
            {
              id: "q2",
              prompt:
                "For a convex, G-Lipschitz function, the subgradient method with well-chosen step sizes achieves best-iterate error that decreases at what rate?",
              choices: [
                "O(1/k)",
                "O(1/√k)",
                "Linear, O(cᵏ) for some c < 1",
                "O(1/k²)",
              ],
              answer: 1,
              chapterIndex: 2,
              explanation:
                "The standard bound is on the order of G‖x₀ − x*‖/√k, and this O(1/√k) rate is the best possible for first-order methods on general nonsmooth convex functions.",
            },
            {
              id: "q3",
              prompt: "The proximal operator of g(x) = λ‖x‖₁ acts on each coordinate as:",
              choices: [
                "Projection onto the interval [−λ, λ]",
                "Scaling by 1/(1 + λ)",
                "Hard thresholding: zero out entries with |x_i| ≤ λ, keep the rest unchanged",
                "Soft thresholding: shrink each entry toward zero by λ, setting it to zero if |x_i| ≤ λ",
              ],
              answer: 3,
              chapterIndex: 3,
              explanation:
                "Minimizing λ|u| + ½(u − x_i)² gives u = sign(x_i)·max(|x_i| − λ, 0), the soft-thresholding operator used in proximal gradient methods for the lasso.",
            },
          ],
        },
        {
          id: "stochastic-gradient-descent",
          title: "Stochastic Gradient Descent",
          summary:
            "Studies stochastic gradient descent for finite-sum and expected-risk objectives, including unbiased gradient estimates, step-size schedules, and convergence guarantees.",
          durationSeconds: 4680,
          premiereDate: "2026-11-26",
          youtubeVideoId: "Zc5pL0hTq3W",
          chapters: [
            { title: "Finite sums and empirical risk", start: 0 },
            { title: "Unbiased stochastic gradients", start: 900 },
            { title: "Step sizes and noise", start: 1860 },
            { title: "Convergence and iterate averaging", start: 2820 },
            { title: "Mini-batches in practice", start: 3840 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/10-725/lecture-05-slides.pdf",
          slidesBytes: 2866316,
          notesBytes: 625188,
          notesUrl: "https://learn.cs.cmu.edu/materials/10-725/lecture-05-notes.pdf",
          readings: [
            {
              title: "Convex optimization and randomness",
              source: "Bubeck · Convex Optimization: Algorithms and Complexity, Ch. 6",
              url: "https://arxiv.org/abs/1405.4980",
            },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt: "What property must a stochastic gradient g(x) have in the standard SGD analysis?",
              choices: [
                "It is an unbiased estimate: E[g(x)] = ∇f(x)",
                "It always has a smaller norm than ∇f(x)",
                "It equals ∇f(x) exactly at every iteration",
                "It points in a descent direction at every iteration",
              ],
              answer: 0,
              chapterIndex: 1,
              explanation:
                "SGD only needs the stochastic gradient to be correct on average (with bounded variance or second moment); individual steps may even increase the objective.",
            },
            {
              id: "q2",
              prompt: "Why does SGD typically use decreasing step sizes?",
              choices: [
                "Because the gradient of f grows as the iterates approach the optimum",
                "To reduce the per-iteration computational cost",
                "With a constant step, gradient noise keeps the iterates bouncing in a region around the optimum",
                "Decreasing steps are required for the gradient estimates to be unbiased",
              ],
              answer: 2,
              chapterIndex: 2,
              explanation:
                "The stochastic gradient's variance does not vanish at the optimum, so a fixed step size only converges to a neighborhood whose size scales with the step; shrinking the step lets the noise average out.",
            },
            {
              id: "q3",
              prompt:
                "For a convex (not strongly convex) objective with bounded stochastic gradients, SGD with step sizes proportional to 1/√k achieves expected error of the averaged iterate at what rate?",
              choices: [
                "O(1/k²)",
                "Linear, O(cᵏ) for some c < 1",
                "O(1/k)",
                "O(1/√k)",
              ],
              answer: 3,
              chapterIndex: 3,
              explanation:
                "The analysis mirrors the subgradient method and gives O(1/√k) for the averaged iterate. Faster O(1/k) rates require additional structure such as strong convexity.",
            },
          ],
        },
      ],
    },
    {
      id: "duality-and-second-order",
      title: "Duality and second-order methods",
      lectures: [
        {
          id: "lagrange-duality-and-kkt",
          title: "Lagrange Duality and KKT Conditions",
          summary:
            "Builds the Lagrangian and dual problem, proves weak duality, gives Slater's condition for strong duality, and derives the KKT optimality conditions.",
          durationSeconds: 4800,
          premiereDate: "2026-12-01",
          youtubeVideoId: "hJ4rN6vBe1Q",
          chapters: [
            { title: "The Lagrangian and dual function", start: 0 },
            { title: "Weak duality", start: 960 },
            { title: "Strong duality and Slater's condition", start: 1920 },
            { title: "KKT conditions", start: 2940 },
            { title: "Example: SVM dual", start: 3900 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/10-725/lecture-06-slides.pdf",
          slidesBytes: 4199044,
          notesBytes: 374149,
          notesUrl: "https://learn.cs.cmu.edu/materials/10-725/lecture-06-notes.pdf",
          readings: [
            {
              title: "Duality",
              source: "Boyd & Vandenberghe · Convex Optimization, Ch. 5",
              url: "https://web.stanford.edu/~boyd/cvxbook/",
            },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt:
                "For a minimization problem with optimal value p* and Lagrange dual optimal value d*, which always holds?",
              choices: [
                "d* = p*",
                "d* ≤ p*",
                "d* ≥ p*",
                "d* = p* whenever the problem is convex",
              ],
              answer: 1,
              chapterIndex: 1,
              explanation:
                "Weak duality holds for every problem, convex or not: the dual function lower-bounds p*. Equality (strong duality) needs extra conditions even for convex problems.",
            },
            {
              id: "q2",
              prompt: "What does Slater's condition guarantee for a convex optimization problem?",
              choices: [
                "That the primal optimum is unique",
                "That the dual problem is unbounded",
                "That the problem is feasible but nothing more",
                "Strong duality, provided there is a strictly feasible point",
              ],
              answer: 3,
              chapterIndex: 2,
              explanation:
                "If a convex problem has a point satisfying the inequality constraints strictly (and the equality constraints), then strong duality holds, so p* = d*.",
            },
            {
              id: "q3",
              prompt:
                "At a primal-dual optimal pair with zero duality gap, complementary slackness says λᵢ fᵢ(x*) = 0. What follows if constraint i is inactive, i.e. fᵢ(x*) < 0?",
              choices: [
                "Its multiplier λᵢ must be 0",
                "Its multiplier λᵢ must be strictly positive",
                "The constraint can be violated at x*",
                "The duality gap must be positive",
              ],
              answer: 0,
              chapterIndex: 3,
              explanation:
                "Since fᵢ(x*) is strictly negative and the product λᵢ fᵢ(x*) must be zero, λᵢ = 0: constraints that are not tight carry no dual weight.",
            },
          ],
        },
        {
          id: "newtons-method",
          title: "Newton's Method",
          summary:
            "Derives Newton's method from a second-order Taylor model, explains its affine invariance, and analyzes its damped and quadratically convergent phases.",
          durationSeconds: 4560,
          premiereDate: "2026-12-03",
          youtubeVideoId: "Wn9eK2tPy7o",
          chapters: [
            { title: "Quadratic models and the Newton step", start: 0 },
            { title: "Newton decrement", start: 840 },
            { title: "Affine invariance", start: 1740 },
            { title: "Damped and quadratic phases", start: 2700 },
            { title: "Cost per iteration", start: 3720 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/10-725/lecture-07-slides.pdf",
          slidesBytes: 4025458,
          notesBytes: 560779,
          notesUrl: "https://learn.cs.cmu.edu/materials/10-725/lecture-07-notes.pdf",
          readings: [
            {
              title: "Newton's method",
              source: "Boyd & Vandenberghe · Convex Optimization, §9.5",
              url: "https://web.stanford.edu/~boyd/cvxbook/",
            },
            {
              title: "Nonlinear optimization",
              source: "Nesterov · Lectures on Convex Optimization, Ch. 1, section on Newton's method",
            },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt: "What is the Newton step Δx for minimizing a twice-differentiable f at x?",
              choices: [
                "Δx = −∇f(x)",
                "Δx = −∇²f(x) ∇f(x)",
                "Δx = −∇²f(x)⁻¹ ∇f(x)",
                "Δx = −∇f(x) / ‖∇f(x)‖",
              ],
              answer: 2,
              chapterIndex: 0,
              explanation:
                "Minimizing the second-order Taylor model f(x) + ∇f(x)ᵀv + ½vᵀ∇²f(x)v over v gives v = −∇²f(x)⁻¹∇f(x).",
            },
            {
              id: "q2",
              prompt:
                "Once Newton's method is close enough to the minimizer of a strongly convex function with Lipschitz Hessian, how fast does it converge?",
              choices: [
                "Sublinearly, at rate O(1/k)",
                "Quadratically: the error is roughly squared at each step",
                "Linearly, with factor depending on the condition number",
                "It stalls and needs a restart",
              ],
              answer: 1,
              chapterIndex: 3,
              explanation:
                "In the local phase the error satisfies ‖x_{k+1} − x*‖ ≤ C‖x_k − x*‖², so the number of correct digits roughly doubles every iteration.",
            },
            {
              id: "q3",
              prompt:
                "Why is Newton's method much less sensitive to ill-conditioning than gradient descent?",
              choices: [
                "It uses a larger fixed step size",
                "It only works on quadratic functions",
                "It never needs a line search",
                "It is affine invariant, so a linear change of coordinates does not change its iterates",
              ],
              answer: 3,
              chapterIndex: 2,
              explanation:
                "Rescaling the variables transforms the Newton step in exactly the same way, so the method behaves identically on well- and badly-conditioned versions of the same problem; gradient descent does not have this property.",
            },
          ],
        },
        {
          id: "interior-point-methods",
          title: "Interior-Point Methods",
          summary:
            "Introduces the logarithmic barrier and the central path, and builds the barrier method that solves inequality-constrained problems with a sequence of Newton solves.",
          durationSeconds: 4890,
          premiereDate: "2026-12-08",
          youtubeVideoId: "dR1sG8mXa4k",
          chapters: [
            { title: "Inequality constraints and barriers", start: 0 },
            { title: "The logarithmic barrier", start: 900 },
            { title: "The central path", start: 1920 },
            { title: "The barrier method", start: 3000 },
            { title: "Complexity and practice", start: 4020 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/10-725/lecture-08-slides.pdf",
          slidesBytes: 2002381,
          notesBytes: 468911,
          notesUrl: "https://learn.cs.cmu.edu/materials/10-725/lecture-08-notes.pdf",
          readings: [
            {
              title: "Interior-point methods",
              source: "Boyd & Vandenberghe · Convex Optimization, Ch. 11",
              url: "https://web.stanford.edu/~boyd/cvxbook/",
            },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt:
                "What role does the log barrier φ(x) = −Σᵢ log(−fᵢ(x)) play in an interior-point method?",
              choices: [
                "It makes the objective linear",
                "It replaces the equality constraints",
                "It is a smooth approximation of the hard constraints that blows up at the boundary of the feasible set",
                "It guarantees the problem has a unique solution even if infeasible",
              ],
              answer: 2,
              chapterIndex: 1,
              explanation:
                "The barrier is finite strictly inside the feasible set and tends to infinity as any fᵢ(x) approaches 0, so Newton's method on the smooth surrogate stays strictly feasible.",
            },
            {
              id: "q2",
              prompt:
                "For a problem with m inequality constraints, the central point x*(t) minimizing t·f₀(x) + φ(x) is guaranteed to satisfy f₀(x*(t)) − p* ≤ ?",
              choices: [
                "t/m",
                "m/t",
                "m·t",
                "1/(m·t)",
              ],
              answer: 1,
              chapterIndex: 2,
              explanation:
                "Each central point yields a dual feasible point with duality gap exactly m/t, so the suboptimality is at most m/t and goes to zero as t grows.",
            },
            {
              id: "q3",
              prompt:
                "Why does the barrier method increase t gradually instead of starting with a very large t?",
              choices: [
                "A large t makes the problem nonconvex",
                "A large t makes the barrier term dominate the objective",
                "The duality gap grows with t",
                "For large t the centering problem is hard for Newton's method from a poor start, so warm-starting along the central path is much cheaper",
              ],
              answer: 3,
              chapterIndex: 3,
              explanation:
                "With large t the Hessian varies rapidly near the boundary, so Newton's method converges slowly from a distant start; increasing t step by step keeps each warm-started centering problem easy.",
            },
          ],
        },
      ],
    },
  ],
};
