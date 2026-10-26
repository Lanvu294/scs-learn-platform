import type { Course } from "../types";

const MURPHY_PML1 = "https://probml.github.io/pml-book/book1.html";
const SSBD = "https://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/";
const DL_BOOK = "https://www.deeplearningbook.org/";

export const course: Course = {
  code: "10-701",
  title: "Introduction to Machine Learning",
  summary:
    "A graduate introduction to the core ideas of machine learning, from maximum likelihood and linear models through neural networks, ensembles, unsupervised learning, and learning theory. Each lecture pairs the math with the intuition you need to apply it.",
  instructors: [
    { name: "Geoff Gordon", photo: "/landing/faculty/gordon.png" },
    { name: "Pradeep Ravikumar", photo: "/landing/faculty/ravikumar.png" },
  ],
  level: "Graduate",
  prerequisites: [
    "Comfortable writing Python with NumPy",
    "Probability: random variables, expectation, conditional probability, and Bayes' rule",
    "Linear algebra: matrix multiplication, inverses, eigenvalues and eigenvectors",
    "Multivariable calculus: partial derivatives, gradients, and the chain rule",
  ],
  easierCourses: [
    {
      code: "10-301/601",
      title: "Introduction to Machine Learning (undergraduate/master's)",
      href: "https://www.cs.cmu.edu/~mgormley/courses/10601/",
      reason:
        "Covers many of the same models at a gentler mathematical pace, with more hands-on programming support.",
    },
  ],
  premiereDate: "2026-09-29",
  youtubePlaylistId: "PLq7Xr2mVb9KdT4wHn8cJf3LsYp1Ge6uZa",
  units: [
    {
      id: "foundations",
      title: "Foundations",
      lectures: [
        {
          id: "the-learning-problem",
          title: "The Learning Problem",
          summary:
            "Frames machine learning as minimizing loss on data drawn from an unknown distribution and introduces the train, validation, and test workflow.",
          durationSeconds: 4820,
          premiereDate: "2026-09-29",
          youtubeVideoId: "kQ3vT8mZp1A",
          chapters: [
            { title: "Course overview", start: 0 },
            { title: "What is learning?", start: 900 },
            { title: "Supervised and unsupervised tasks", start: 1900 },
            { title: "Loss and empirical risk", start: 3000 },
            { title: "Train, validation, and test splits", start: 3900 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/10-701/lecture-01-slides.pdf",
          slidesBytes: 4621728,
          notesBytes: 241675,
          notesUrl: "https://learn.cs.cmu.edu/materials/10-701/lecture-01-notes.pdf",
          readings: [
            {
              title: "Introduction",
              source: "Murphy · Probabilistic Machine Learning: An Introduction, Ch. 1",
              url: MURPHY_PML1,
            },
            {
              title: "A Gentle Start",
              source: "Shalev-Shwartz & Ben-David · Understanding Machine Learning, Ch. 2",
              url: SSBD,
            },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt: "Why do we keep a test set that is never used during training or tuning?",
              choices: [
                "To choose the best hyperparameters",
                "To get an unbiased estimate of performance on unseen data",
                "To increase the amount of training data",
                "To reduce the training loss",
              ],
              answer: 1,
              chapterIndex: 4,
              explanation:
                "Because the test set played no part in fitting or model selection, error on it is an unbiased estimate of how the final model performs on new data from the same distribution.",
            },
            {
              id: "q2",
              prompt: "Which of these is a supervised learning task?",
              choices: [
                "Grouping customers into segments without any labels",
                "Compressing images with principal component analysis",
                "Predicting a house's sale price from its features using past sales",
                "Estimating the density of unlabeled data",
              ],
              answer: 2,
              chapterIndex: 2,
              explanation:
                "Supervised learning fits a mapping from inputs to known targets; past sales provide labeled (features, price) pairs. The other tasks use no target labels.",
            },
            {
              id: "q3",
              prompt: "What quantity does empirical risk minimization minimize?",
              choices: [
                "The true expected loss under the data distribution",
                "The number of model parameters",
                "The error on the test set",
                "The average loss over the training examples",
              ],
              answer: 3,
              chapterIndex: 3,
              explanation:
                "The true risk is unknown because the distribution is unknown, so ERM minimizes its sample estimate: the average loss over the training set.",
            },
          ],
        },
        {
          id: "mle-and-map",
          title: "Maximum Likelihood and MAP Estimation",
          summary:
            "Shows how to fit model parameters by maximizing the likelihood of the data, and how adding a prior gives MAP estimation and a principled view of regularization.",
          durationSeconds: 4710,
          premiereDate: "2026-10-01",
          youtubeVideoId: "Zr7nLw2Xc4E",
          chapters: [
            { title: "Probability recap", start: 0 },
            { title: "Likelihood functions", start: 1000 },
            { title: "MLE for a coin and a Gaussian", start: 2100 },
            { title: "Priors and MAP", start: 3200 },
            { title: "Conjugacy and regularization", start: 4000 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/10-701/lecture-02-slides.pdf",
          slidesBytes: 4130494,
          notesBytes: 391499,
          notesUrl: "https://learn.cs.cmu.edu/materials/10-701/lecture-02-notes.pdf",
          readings: [
            {
              title: "Statistics",
              source: "Murphy · Probabilistic Machine Learning: An Introduction, Ch. 4",
              url: MURPHY_PML1,
            },
            {
              title: "Probability Theory",
              source: "Bishop · Pattern Recognition and Machine Learning, §1.2",
            },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt: "A coin lands heads 7 times in 10 independent flips. What is the maximum likelihood estimate of the probability of heads?",
              choices: ["0.5", "0.3", "0.7", "Undefined without a prior"],
              answer: 2,
              chapterIndex: 2,
              explanation:
                "For a Bernoulli model the likelihood p^7 (1 - p)^3 is maximized at the sample frequency of heads, 7/10 = 0.7.",
            },
            {
              id: "q2",
              prompt: "With a fixed prior that puts positive density everywhere, what happens to the MAP estimate as the number of data points grows?",
              choices: [
                "It converges to the mode of the prior",
                "It converges to the maximum likelihood estimate",
                "It diverges",
                "It shrinks toward zero",
              ],
              answer: 1,
              chapterIndex: 3,
              explanation:
                "The log-likelihood grows with the number of data points while the log-prior stays fixed, so the data term dominates and MAP approaches the MLE.",
            },
            {
              id: "q3",
              prompt: "In linear regression, MAP estimation with a zero-mean Gaussian prior on the weights is equivalent to which penalty?",
              choices: [
                "An L1 (lasso) penalty",
                "No penalty at all",
                "Early stopping",
                "An L2 (ridge) penalty",
              ],
              answer: 3,
              chapterIndex: 4,
              explanation:
                "The negative log of a zero-mean Gaussian prior is proportional to the squared norm of the weights, which is exactly the ridge penalty.",
            },
          ],
        },
        {
          id: "bias-variance-and-model-selection",
          title: "Overfitting, Bias-Variance, and Model Selection",
          summary:
            "Decomposes prediction error into bias, variance, and noise, and uses regularization and cross-validation to pick models that generalize.",
          durationSeconds: 4950,
          premiereDate: "2026-10-06",
          youtubeVideoId: "P2hYd9sKq_w",
          chapters: [
            { title: "Overfitting in polynomial fits", start: 0 },
            { title: "The bias-variance decomposition", start: 1100 },
            { title: "Regularization", start: 2300 },
            { title: "Cross-validation", start: 3300 },
            { title: "Choosing hyperparameters", start: 4200 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/10-701/lecture-03-slides.pdf",
          slidesBytes: 2362980,
          notesBytes: 558997,
          notesUrl: "https://learn.cs.cmu.edu/materials/10-701/lecture-03-notes.pdf",
          readings: [
            {
              title: "The Bias-Variance Decomposition",
              source: "Bishop · Pattern Recognition and Machine Learning, §3.2",
            },
            {
              title: "Cross-validation",
              source: "scikit-learn User Guide",
              url: "https://scikit-learn.org/stable/modules/cross_validation.html",
            },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt: "As model complexity increases, what typically happens to bias and variance?",
              choices: [
                "Bias decreases and variance increases",
                "Bias increases and variance decreases",
                "Both decrease",
                "Both increase",
              ],
              answer: 0,
              chapterIndex: 1,
              explanation:
                "A more flexible model can fit the true function more closely, lowering bias, but it is also more sensitive to the particular training sample, raising variance.",
            },
            {
              id: "q2",
              prompt: "A model has very low training error but much higher validation error. What is the most likely diagnosis?",
              choices: [
                "Underfitting (high bias)",
                "Overfitting (high variance)",
                "The model is too simple",
                "The irreducible noise is large",
              ],
              answer: 1,
              chapterIndex: 0,
              explanation:
                "A large gap between training and validation error means the model fits quirks of the training sample that do not generalize, which is overfitting.",
            },
            {
              id: "q3",
              prompt: "Which statement about k-fold cross-validation is true?",
              choices: [
                "The test set is reused k times for tuning",
                "The model is trained only once, on all of the data",
                "Each fold uses a different loss function",
                "Each example is used for validation exactly once",
              ],
              answer: 3,
              chapterIndex: 3,
              explanation:
                "The data is split into k folds and each fold serves as the validation set once while the other k - 1 folds are used for training.",
            },
          ],
        },
      ],
    },
    {
      id: "linear-models",
      title: "Linear models",
      lectures: [
        {
          id: "linear-regression",
          title: "Linear Regression and Least Squares",
          summary:
            "Derives least squares from both a geometric and a probabilistic view, solves it in closed form and by gradient descent, and adds ridge and lasso penalties.",
          durationSeconds: 4680,
          premiereDate: "2026-10-08",
          youtubeVideoId: "mF4tGx0bN8s",
          chapters: [
            { title: "Setup and squared loss", start: 0 },
            { title: "The normal equations", start: 950 },
            { title: "Geometry: projection onto the column space", start: 2050 },
            { title: "Gradient descent", start: 3100 },
            { title: "Ridge and lasso", start: 3950 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/10-701/lecture-04-slides.pdf",
          slidesBytes: 4784061,
          notesBytes: 370580,
          notesUrl: "https://learn.cs.cmu.edu/materials/10-701/lecture-04-notes.pdf",
          readings: [
            {
              title: "Linear Regression",
              source: "Murphy · Probabilistic Machine Learning: An Introduction, Ch. 11",
              url: MURPHY_PML1,
            },
            {
              title: "Linear Models for Regression",
              source: "Bishop · Pattern Recognition and Machine Learning, Ch. 3",
            },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt: "Assuming X^T X is invertible, what is the least squares solution for the weights w?",
              choices: [
                "w = X^T y",
                "w = (X^T X)^{-1} X^T y",
                "w = (X X^T)^{-1} y",
                "w = X^{-1} y",
              ],
              answer: 1,
              chapterIndex: 1,
              explanation:
                "Setting the gradient of ||y - Xw||^2 to zero gives the normal equations X^T X w = X^T y, whose solution is (X^T X)^{-1} X^T y.",
            },
            {
              id: "q2",
              prompt: "Least squares is the maximum likelihood estimator under which noise model?",
              choices: [
                "Laplace noise",
                "Uniform noise",
                "Gaussian noise with constant variance",
                "It has no probabilistic interpretation",
              ],
              answer: 2,
              chapterIndex: 0,
              explanation:
                "With i.i.d. Gaussian noise of fixed variance, the negative log-likelihood is a constant plus a scaled sum of squared residuals, so maximizing likelihood minimizes squared error.",
            },
            {
              id: "q3",
              prompt: "What is the characteristic effect of the lasso (L1) penalty compared with ridge (L2)?",
              choices: [
                "It tends to set some weights exactly to zero",
                "It forces all weights to be equal",
                "It always has a closed-form solution",
                "It increases the variance of the estimator",
              ],
              answer: 0,
              chapterIndex: 4,
              explanation:
                "The L1 penalty has corners on the coordinate axes, so the optimum often lands where some coordinates are exactly zero, yielding sparse models.",
            },
          ],
        },
        {
          id: "logistic-regression-and-naive-bayes",
          title: "Logistic Regression and Naive Bayes",
          summary:
            "Contrasts a generative classifier (naive Bayes) with a discriminative one (logistic regression) and trains logistic regression by minimizing cross-entropy.",
          durationSeconds: 4760,
          premiereDate: "2026-10-13",
          youtubeVideoId: "c9WbR3uJe7T",
          chapters: [
            { title: "Generative vs. discriminative models", start: 0 },
            { title: "Naive Bayes", start: 1000 },
            { title: "The logistic regression model", start: 2000 },
            { title: "Cross-entropy and its gradient", start: 3000 },
            { title: "Comparing the two", start: 3900 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/10-701/lecture-05-slides.pdf",
          slidesBytes: 4380237,
          notesBytes: 184319,
          notesUrl: "https://learn.cs.cmu.edu/materials/10-701/lecture-05-notes.pdf",
          readings: [
            {
              title: "Logistic Regression",
              source: "Murphy · Probabilistic Machine Learning: An Introduction, Ch. 10",
              url: MURPHY_PML1,
            },
            {
              title: "Probabilistic Generative and Discriminative Models",
              source: "Bishop · Pattern Recognition and Machine Learning, §4.2-4.3",
            },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt: "What independence assumption does naive Bayes make?",
              choices: [
                "The features are independent of the class label",
                "The classes are equally likely a priori",
                "Every feature is Gaussian",
                "The features are conditionally independent given the class",
              ],
              answer: 3,
              chapterIndex: 1,
              explanation:
                "Naive Bayes factors p(x | y) into a product of per-feature terms, which assumes the features are independent once the class is known.",
            },
            {
              id: "q2",
              prompt: "For binary logistic regression on raw features, what shape is the decision boundary?",
              choices: [
                "A hyperplane in feature space",
                "A sphere around the class mean",
                "A piecewise-constant staircase",
                "It depends only on the number of training points",
              ],
              answer: 0,
              chapterIndex: 2,
              explanation:
                "The model predicts class 1 when sigmoid(w^T x + b) > 0.5, which happens exactly when w^T x + b > 0, a linear boundary.",
            },
            {
              id: "q3",
              prompt: "If the training data are linearly separable, what happens when you fit unregularized logistic regression by maximum likelihood?",
              choices: [
                "It converges to a unique, finite weight vector",
                "The gradient is zero at w = 0",
                "The weights grow without bound as the likelihood approaches 1",
                "It becomes equivalent to naive Bayes",
              ],
              answer: 2,
              chapterIndex: 3,
              explanation:
                "Scaling up a separating weight vector always increases the likelihood, so no finite maximizer exists; regularization fixes this.",
            },
          ],
        },
        {
          id: "svms-and-kernels",
          title: "Support Vector Machines and Kernels",
          summary:
            "Builds maximum-margin classifiers, relaxes them with the hinge loss, and uses the dual problem to introduce the kernel trick.",
          durationSeconds: 4890,
          premiereDate: "2026-10-15",
          youtubeVideoId: "Hs1kV6yNq0D",
          chapters: [
            { title: "Maximum-margin classifiers", start: 0 },
            { title: "Hard and soft margins", start: 1100 },
            { title: "Hinge loss and the dual", start: 2200 },
            { title: "The kernel trick", start: 3300 },
            { title: "Choosing a kernel", start: 4100 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/10-701/lecture-06-slides.pdf",
          slidesBytes: 4136182,
          notesBytes: 439454,
          notesUrl: "https://learn.cs.cmu.edu/materials/10-701/lecture-06-notes.pdf",
          readings: [
            {
              title: "Maximum Margin Classifiers",
              source: "Bishop · Pattern Recognition and Machine Learning, §7.1",
            },
            {
              title: "Support Vector Machines",
              source: "scikit-learn User Guide",
              url: "https://scikit-learn.org/stable/modules/svm.html",
            },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt: "In a trained soft-margin SVM, which training points are the support vectors?",
              choices: [
                "Every training point",
                "Points on or inside the margin, which have nonzero dual variables",
                "Only the points farthest from the decision boundary",
                "The mean of each class",
              ],
              answer: 1,
              chapterIndex: 1,
              explanation:
                "Only points that lie on or violate the margin get nonzero dual coefficients, and the decision function is a weighted sum over exactly those points.",
            },
            {
              id: "q2",
              prompt: "What is the effect of increasing the parameter C in a soft-margin SVM?",
              choices: [
                "It widens the margin and allows more violations",
                "It has no effect on the solution",
                "It penalizes margin violations more heavily, typically giving a narrower margin",
                "It switches the model to a nonlinear kernel",
              ],
              answer: 2,
              chapterIndex: 1,
              explanation:
                "C weights the slack (hinge loss) term against the margin term, so a larger C means less regularization and fewer tolerated violations.",
            },
            {
              id: "q3",
              prompt: "What does the kernel trick let you do?",
              choices: [
                "Avoid solving an optimization problem",
                "Reduce the number of training points",
                "Guarantee that any data set becomes linearly separable",
                "Compute inner products in a high-dimensional feature space without constructing the features",
              ],
              answer: 3,
              chapterIndex: 3,
              explanation:
                "The dual SVM depends on the data only through inner products, so replacing them with a kernel k(x, x') works implicitly in the feature space that kernel defines.",
            },
          ],
        },
      ],
    },
    {
      id: "neural-networks-and-nonlinear-models",
      title: "Neural networks and nonlinear models",
      lectures: [
        {
          id: "neural-networks-and-backpropagation",
          title: "Neural Networks and Backpropagation",
          summary:
            "Stacks linear layers and nonlinear activations into multilayer networks and derives backpropagation as the chain rule applied to a computation graph.",
          durationSeconds: 4930,
          premiereDate: "2026-10-20",
          youtubeVideoId: "tB8eXq5Lm2R",
          chapters: [
            {
              title: "From perceptrons to MLPs",
              start: 0,
              keyIdea: "Stacked linear layers collapse into one linear map, so the nonlinearity between layers is what gives an MLP its power.",
            },
            {
              title: "Activation functions",
              start: 1050,
              keyIdea: "Sigmoid and tanh saturate and shrink gradients in deep stacks; ReLU keeps them flowing for positive inputs.",
            },
            {
              title: "Computation graphs",
              start: 2050,
              keyIdea: "A network is a graph of simple operations, so its derivative is built from each operation's local derivative.",
            },
            {
              title: "Backpropagation",
              start: 3100,
              keyIdea: "The chain rule run backward from the loss, reusing forward-pass values, gives every gradient for about the cost of one forward pass.",
            },
            {
              title: "Universal approximation",
              start: 4150,
              keyIdea: "One wide enough hidden layer can approximate any continuous function, but the theorem doesn't say how to find the weights.",
            },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/10-701/lecture-07-slides.pdf",
          slidesBytes: 2647371,
          notesBytes: 545338,
          notesUrl: "https://learn.cs.cmu.edu/materials/10-701/lecture-07-notes.pdf",
          readings: [
            {
              title: "Deep Feedforward Networks",
              source: "Goodfellow, Bengio & Courville · Deep Learning, Ch. 6",
              url: DL_BOOK,
            },
            {
              title: "Neural Networks",
              source: "Bishop · Pattern Recognition and Machine Learning, Ch. 5",
            },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt: "Why do neural networks need nonlinear activation functions between layers?",
              choices: [
                "Without them, a stack of linear layers collapses to a single linear map",
                "They make matrix multiplication faster",
                "They make the training loss convex",
                "They remove the need for bias terms",
              ],
              answer: 0,
              chapterIndex: 1,
              explanation:
                "A composition of linear (affine) maps is itself affine, so without nonlinearities a deep network can represent nothing more than a linear model.",
            },
            {
              id: "q2",
              prompt: "What does one backward pass of backpropagation compute?",
              choices: [
                "The optimal learning rate",
                "The full matrix of second derivatives",
                "The gradient of the loss with respect to every parameter, at a cost comparable to the forward pass",
                "The gradient with respect to a single parameter",
              ],
              answer: 2,
              chapterIndex: 3,
              explanation:
                "Backpropagation reuses intermediate results while applying the chain rule from the output backward, giving all parameter gradients for roughly the cost of one forward pass.",
            },
            {
              id: "q3",
              prompt: "What problem do sigmoid activations cause in deep networks?",
              choices: [
                "Activations explode to infinity",
                "The function is not differentiable at zero",
                "They add too many parameters",
                "Vanishing gradients, since the derivative is at most 0.25 and near zero when saturated",
              ],
              answer: 3,
              chapterIndex: 1,
              explanation:
                "Backpropagated gradients are multiplied by the sigmoid's derivative at each layer, and since that derivative is at most 0.25, gradients shrink quickly with depth.",
            },
          ],
        },
        {
          id: "training-neural-networks",
          title: "Training Neural Networks: SGD and Beyond",
          summary:
            "Covers the practical optimization toolkit for deep learning: minibatch SGD, momentum and Adam, initialization and normalization, and regularizers like dropout.",
          durationSeconds: 4840,
          premiereDate: "2026-12-01",
          youtubeVideoId: "Wn5aJ1pFz7k",
          chapters: [
            { title: "Gradient descent recap", start: 0 },
            { title: "Stochastic and minibatch gradients", start: 950 },
            { title: "Momentum and Adam", start: 2000 },
            { title: "Initialization and normalization", start: 3050 },
            { title: "Dropout and early stopping", start: 4000 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/10-701/lecture-08-slides.pdf",
          slidesBytes: 4182617,
          notesBytes: 574659,
          notesUrl: "https://learn.cs.cmu.edu/materials/10-701/lecture-08-notes.pdf",
          readings: [
            {
              title: "Optimization for Training Deep Models",
              source: "Goodfellow, Bengio & Courville · Deep Learning, Ch. 8",
              url: DL_BOOK,
            },
            {
              title: "Regularization for Deep Learning",
              source: "Goodfellow, Bengio & Courville · Deep Learning, Ch. 7",
              url: DL_BOOK,
            },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt: "If a minibatch is drawn uniformly at random from the training set, how does its gradient relate to the full-batch gradient?",
              choices: [
                "It is always exactly equal to the full-batch gradient",
                "It is an unbiased but noisy estimate of the full-batch gradient",
                "It is biased and always overshoots",
                "It is the Hessian of the loss",
              ],
              answer: 1,
              chapterIndex: 1,
              explanation:
                "The training loss is an average over examples, so the average gradient over a uniformly sampled minibatch has the full-batch gradient as its expectation, with variance that shrinks as the batch grows.",
            },
            {
              id: "q2",
              prompt: "What does momentum add to plain gradient descent?",
              choices: [
                "An exponentially decaying average of past gradients that smooths the update direction",
                "A reset of the learning rate at each epoch",
                "An exact computation of the Hessian",
                "A way to train without a learning rate",
              ],
              answer: 0,
              chapterIndex: 2,
              explanation:
                "Momentum keeps a running velocity built from past gradients, which damps oscillation across steep directions and speeds progress along consistent ones.",
            },
            {
              id: "q3",
              prompt: "What does dropout do during training?",
              choices: [
                "Removes the training examples with the highest loss",
                "Permanently prunes small weights",
                "Lowers the learning rate when validation loss plateaus",
                "Randomly zeroes hidden units on each step, acting as a regularizer",
              ],
              answer: 3,
              chapterIndex: 4,
              explanation:
                "Randomly dropping units prevents the network from relying on fragile co-adaptations between specific units, which reduces overfitting.",
            },
          ],
        },
        {
          id: "trees-and-ensembles",
          title: "Decision Trees, Bagging, and Boosting",
          summary:
            "Grows decision trees with greedy impurity-based splits, then combines many of them through bagging, random forests, and boosting.",
          durationSeconds: 4790,
          premiereDate: "2026-12-03",
          youtubeVideoId: "rL0gU4dYv9M",
          chapters: [
            { title: "Decision trees", start: 0 },
            { title: "Splitting criteria", start: 1000 },
            { title: "Bagging and random forests", start: 2000 },
            { title: "Boosting and AdaBoost", start: 3000 },
            { title: "Gradient boosting", start: 4000 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/10-701/lecture-09-slides.pdf",
          slidesBytes: 1952511,
          notesBytes: 324644,
          notesUrl: "https://learn.cs.cmu.edu/materials/10-701/lecture-09-notes.pdf",
          readings: [
            {
              title: "Trees, Forests, Bagging, and Boosting",
              source: "Murphy · Probabilistic Machine Learning: An Introduction, Ch. 18",
              url: MURPHY_PML1,
            },
            {
              title: "Ensemble Methods",
              source: "scikit-learn User Guide",
              url: "https://scikit-learn.org/stable/modules/ensemble.html",
            },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt: "Which component of error does bagging primarily reduce?",
              choices: ["Bias", "Variance", "Training time", "The number of features"],
              answer: 1,
              chapterIndex: 2,
              explanation:
                "Averaging models trained on different bootstrap samples smooths out their individual fluctuations, reducing variance while leaving bias roughly unchanged.",
            },
            {
              id: "q2",
              prompt: "How does a random forest differ from plain bagged decision trees?",
              choices: [
                "Each split considers only a random subset of the features",
                "Each tree is limited to depth one",
                "Trees are trained sequentially on reweighted data",
                "It uses no bootstrap sampling",
              ],
              answer: 0,
              chapterIndex: 2,
              explanation:
                "Restricting each split to a random feature subset decorrelates the trees, so averaging them reduces variance more than bagging alone.",
            },
            {
              id: "q3",
              prompt: "How does AdaBoost choose what the next weak learner should focus on?",
              choices: [
                "It trains each learner on an independent bootstrap sample with equal weights",
                "It averages a set of fully grown trees",
                "It upweights the training examples that the current ensemble misclassifies",
                "It prunes the previous tree",
              ],
              answer: 2,
              chapterIndex: 3,
              explanation:
                "After each round AdaBoost increases the weights of misclassified examples, forcing the next learner to concentrate on the hard cases.",
            },
          ],
        },
      ],
    },
    {
      id: "unsupervised-learning-and-theory",
      title: "Unsupervised learning and theory",
      lectures: [
        {
          id: "clustering-and-em",
          title: "Clustering: k-Means and Gaussian Mixtures",
          summary:
            "Introduces k-means and Gaussian mixture models and fits mixtures with the expectation-maximization algorithm.",
          durationSeconds: 4870,
          premiereDate: "2026-12-08",
          youtubeVideoId: "Yx6oC2iTb3N",
          chapters: [
            { title: "The clustering problem", start: 0 },
            { title: "k-means", start: 900 },
            { title: "Gaussian mixture models", start: 1950 },
            { title: "Expectation-maximization", start: 2950 },
            { title: "Choosing the number of clusters", start: 4000 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/10-701/lecture-10-slides.pdf",
          slidesBytes: 3954393,
          notesBytes: 553484,
          notesUrl: "https://learn.cs.cmu.edu/materials/10-701/lecture-10-notes.pdf",
          readings: [
            {
              title: "Mixture Models and EM",
              source: "Bishop · Pattern Recognition and Machine Learning, Ch. 9",
            },
            {
              title: "Clustering",
              source: "scikit-learn User Guide",
              url: "https://scikit-learn.org/stable/modules/clustering.html",
            },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt: "What happens to the k-means objective (within-cluster sum of squares) over iterations of Lloyd's algorithm?",
              choices: [
                "It is guaranteed to reach the global minimum",
                "It never increases, but the algorithm may stop at a local minimum",
                "It can oscillate forever",
                "It increases until convergence",
              ],
              answer: 1,
              chapterIndex: 1,
              explanation:
                "Both the assignment step and the centroid update can only lower or keep the objective, so it converges, but only to a local optimum that depends on initialization.",
            },
            {
              id: "q2",
              prompt: "What does the E-step of EM compute for a Gaussian mixture model?",
              choices: [
                "New means and covariances for each component",
                "The best number of components",
                "A fresh sample of synthetic data",
                "Each point's posterior responsibility for each component, given the current parameters",
              ],
              answer: 3,
              chapterIndex: 3,
              explanation:
                "The E-step fixes the parameters and computes p(component | x) for every point; the M-step then re-estimates parameters using those soft assignments.",
            },
            {
              id: "q3",
              prompt: "Under what limit does EM for a Gaussian mixture reduce to k-means?",
              choices: [
                "Shared spherical covariances that shrink to zero, giving hard assignments",
                "Full, unconstrained covariance matrices",
                "A single mixture component",
                "Very large component variances",
              ],
              answer: 0,
              chapterIndex: 3,
              explanation:
                "As a shared variance sigma^2 goes to zero, each point's responsibility goes entirely to the nearest mean, which is exactly the k-means assignment step.",
            },
          ],
        },
        {
          id: "pca-and-dimensionality-reduction",
          title: "Dimensionality Reduction and PCA",
          summary:
            "Derives principal component analysis as both maximum-variance projection and minimum reconstruction error, and computes it with the SVD.",
          durationSeconds: 4620,
          premiereDate: "2026-12-10",
          youtubeVideoId: "gE2sM7wHk-4",
          chapters: [
            { title: "Why reduce dimension?", start: 0 },
            { title: "The maximum-variance view", start: 1000 },
            { title: "Eigenvectors and the SVD", start: 2000 },
            { title: "Reconstruction error", start: 3000 },
            { title: "Beyond PCA", start: 3800 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/10-701/lecture-11-slides.pdf",
          slidesBytes: 4704270,
          notesBytes: 500610,
          notesUrl: "https://learn.cs.cmu.edu/materials/10-701/lecture-11-notes.pdf",
          readings: [
            {
              title: "Principal Component Analysis",
              source: "Bishop · Pattern Recognition and Machine Learning, §12.1",
            },
            {
              title: "Decomposing Signals in Components",
              source: "scikit-learn User Guide",
              url: "https://scikit-learn.org/stable/modules/decomposition.html",
            },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt: "What is the first principal component of a centered data set?",
              choices: [
                "The feature with the largest mean",
                "A randomly chosen unit vector",
                "The direction of maximum variance, the top eigenvector of the covariance matrix",
                "The direction of minimum variance",
              ],
              answer: 2,
              chapterIndex: 1,
              explanation:
                "Maximizing the variance of the projection u^T x over unit vectors u is solved by the eigenvector of the covariance matrix with the largest eigenvalue.",
            },
            {
              id: "q2",
              prompt: "What preprocessing step is essential before computing PCA?",
              choices: [
                "Center the data by subtracting the mean of each feature",
                "Sort the features alphabetically",
                "Normalize the labels",
                "Shuffle the rows",
              ],
              answer: 0,
              chapterIndex: 1,
              explanation:
                "PCA finds directions of variance around the mean; without centering, the first component tends to point toward the mean rather than along the spread of the data.",
            },
            {
              id: "q3",
              prompt: "What fraction of the total variance do the top k principal components explain?",
              choices: [
                "k divided by the number of features",
                "The sum of the top k eigenvalues divided by the sum of all eigenvalues",
                "The square of the largest eigenvalue",
                "The number of nonzero eigenvalues",
              ],
              answer: 1,
              chapterIndex: 2,
              explanation:
                "Each eigenvalue of the covariance matrix equals the variance along its eigenvector, and the eigenvalues sum to the total variance.",
            },
          ],
        },
        {
          id: "pac-learning-and-vc-dimension",
          title: "Learning Theory: PAC Learning and VC Dimension",
          summary:
            "Asks when low training error guarantees low test error, and answers with PAC bounds for finite hypothesis classes and the VC dimension for infinite ones.",
          durationSeconds: 4980,
          premiereDate: "2026-12-15",
          youtubeVideoId: "Lp9fQ3vRa6c",
          chapters: [
            { title: "Can we trust training error?", start: 0 },
            { title: "The PAC framework", start: 1000 },
            { title: "Finite hypothesis classes", start: 2100 },
            { title: "VC dimension", start: 3200 },
            { title: "Bounds in practice", start: 4100 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/10-701/lecture-12-slides.pdf",
          slidesBytes: 3880627,
          notesBytes: 288661,
          notesUrl: "https://learn.cs.cmu.edu/materials/10-701/lecture-12-notes.pdf",
          readings: [
            {
              title: "A Formal Learning Model",
              source: "Shalev-Shwartz & Ben-David · Understanding Machine Learning, Ch. 3",
              url: SSBD,
            },
            {
              title: "The VC-Dimension",
              source: "Shalev-Shwartz & Ben-David · Understanding Machine Learning, Ch. 6",
              url: SSBD,
            },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt: "What is the VC dimension of linear classifiers (halfspaces with a bias term) in d dimensions?",
              choices: ["d", "2d", "d + 1", "Infinite"],
              answer: 2,
              chapterIndex: 3,
              explanation:
                "Halfspaces with a bias can shatter d + 1 points in general position but no set of d + 2 points, so the VC dimension is d + 1.",
            },
            {
              id: "q2",
              prompt: "For a finite hypothesis class H in the realizable setting, how does the number of samples needed for PAC learning scale with H?",
              choices: [
                "Linearly in |H|",
                "Quadratically in |H|",
                "It does not depend on H",
                "Logarithmically, as log |H|",
              ],
              answer: 3,
              chapterIndex: 2,
              explanation:
                "A union bound over H gives a sample complexity of order (log |H| + log(1/delta)) / epsilon, so the class size enters only through its logarithm.",
            },
            {
              id: "q3",
              prompt: "What does it mean for a hypothesis class H to shatter a set of n points?",
              choices: [
                "For every one of the 2^n labelings of the points, some hypothesis in H produces it",
                "Some hypothesis in H labels all n points correctly",
                "H contains exactly 2^n hypotheses",
                "Every hypothesis in H misclassifies at least one of the points",
              ],
              answer: 0,
              chapterIndex: 3,
              explanation:
                "Shattering requires H to realize every possible labeling of the set; the VC dimension is the size of the largest set H can shatter.",
            },
          ],
        },
      ],
    },
  ],
};
