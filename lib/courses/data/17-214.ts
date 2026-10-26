import type { Course } from "../types";

export const course: Course = {
  code: "17-214",
  title: "Principles of Software Construction",
  summary:
    "How to design, implement, and reason about software that is bigger than one file: object-oriented design, specifications and testing, design patterns, API design, and concurrency, all in Java.",
  instructors: [{ name: "Hammad Ahmad", photo: "/landing/faculty/ahmad.png" }],
  level: "Undergraduate",
  prerequisites: [
    "You've written programs of a few hundred lines in some language",
    "Basic data structures: lists, maps, trees, and when to use each",
    "Comfortable reading code you didn't write and tracing what it does",
    "No prior Java needed, but expect to pick up its syntax quickly as you go",
  ],
  easierCourses: [
    {
      code: "15-122",
      title: "Principles of Imperative Computation",
      href: "https://www.cs.cmu.edu/~15122/",
      reason: "Builds the habit of writing contracts and reasoning about code correctness that this course leans on.",
    },
    {
      code: "15-112",
      title: "Fundamentals of Programming and Computer Science",
      href: "https://www.cs.cmu.edu/~112/",
      reason: "Gets you writing and debugging programs of a few hundred lines, the scale this course starts from.",
    },
  ],
  premiereDate: "2026-11-10",
  youtubePlaylistId: "PLq7Wm3xK9vB2nRtY5hJ8cLd4FgS6aZ1pE",
  units: [
    {
      id: "designing-classes",
      title: "Designing classes",
      lectures: [
        {
          id: "object-oriented-design",
          title: "Objects, Interfaces, and Polymorphism",
          summary:
            "Introduces objects as bundles of state and behavior and shows how interfaces and dynamic dispatch let code depend on what an object does rather than what it is.",
          durationSeconds: 4740,
          premiereDate: "2026-11-10",
          youtubeVideoId: "Hq4vT8nKe2W",
          chapters: [
            { title: "Why software construction", start: 0 },
            { title: "Objects and classes in Java", start: 840 },
            { title: "Interfaces as contracts", start: 1920 },
            { title: "Dynamic dispatch", start: 2940 },
            { title: "Polymorphism in practice", start: 3900 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/17-214/lecture-01-slides.pdf",
          slidesBytes: 3349278,
          notesBytes: 327039,
          notesUrl: "https://learn.cs.cmu.edu/materials/17-214/lecture-01-notes.pdf",
          readings: [
            { title: "Refer to objects by their interfaces", source: "Bloch · Effective Java (3rd ed.), Item 64" },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt:
                "A variable has static type Shape (an interface) and holds a Circle object. When you call shape.area(), which implementation runs?",
              choices: [
                "A default implementation defined in the Shape interface, always",
                "Circle's area() method, chosen at run time from the object's actual class",
                "Whichever area() method was compiled first",
                "The call fails to compile because Shape is an interface",
              ],
              answer: 1,
              chapterIndex: 3,
              explanation:
                "Java uses dynamic dispatch: the method that runs is chosen by the run-time class of the object, not the declared type of the variable.",
            },
            {
              id: "q2",
              prompt: "What is the main benefit of writing client code against an interface instead of a concrete class?",
              choices: [
                "The code runs faster because interface calls are inlined",
                "The compiler can skip type checking",
                "Interfaces let you store more fields per object",
                "Any class implementing the interface can be swapped in without changing the client",
              ],
              answer: 3,
              chapterIndex: 2,
              explanation:
                "Depending only on the interface means the client relies on promised behavior, so new or different implementations can be substituted freely.",
            },
            {
              id: "q3",
              prompt: "Which statement about a Java interface is true?",
              choices: [
                "A class can implement several interfaces at once",
                "An interface can have instance fields that each implementing object gets a copy of",
                "You can create an object directly with new on an interface name and no class body",
                "A class may implement only one interface if it also extends a class",
              ],
              answer: 0,
              chapterIndex: 2,
              explanation:
                "Java allows a class to implement any number of interfaces, even while extending a single superclass; interfaces cannot hold instance fields.",
            },
          ],
        },
        {
          id: "specifications-and-testing",
          title: "Specifications and Unit Testing",
          summary:
            "Covers writing method specifications with preconditions and postconditions and turning them into focused unit tests with JUnit.",
          durationSeconds: 4860,
          premiereDate: "2026-11-12",
          youtubeVideoId: "pR7cX3mZ0aJ",
          chapters: [
            { title: "What a specification promises", start: 0 },
            { title: "Preconditions and postconditions", start: 900 },
            { title: "Unit tests with JUnit", start: 2010 },
            { title: "Choosing test cases", start: 3060 },
            { title: "Coverage and its limits", start: 4080 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/17-214/lecture-02-slides.pdf",
          slidesBytes: 1273283,
          notesBytes: 609040,
          notesUrl: "https://learn.cs.cmu.edu/materials/17-214/lecture-02-notes.pdf",
          readings: [
            { title: "JUnit 5 User Guide", source: "JUnit", url: "https://junit.org/junit5/docs/current/user-guide/" },
            { title: "Specifications", source: "Liskov and Guttag · Program Development in Java, Ch. 9" },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt: "If a caller violates a method's precondition, what does the specification guarantee?",
              choices: [
                "The method will throw an IllegalArgumentException",
                "The method will return null",
                "Nothing: the method's behavior is unspecified",
                "The postcondition still holds",
              ],
              answer: 2,
              chapterIndex: 1,
              explanation:
                "A precondition is the caller's obligation; if it is not met, the specification makes no promise about what the method does.",
            },
            {
              id: "q2",
              prompt: "Your test suite reaches 100% line coverage. What can you conclude?",
              choices: [
                "Every line ran at least once during testing, but bugs may remain",
                "The code has no bugs",
                "Every possible input has been tested",
                "Every branch combination has been exercised",
              ],
              answer: 0,
              chapterIndex: 4,
              explanation:
                "Line coverage only says each line executed; it says nothing about untested inputs, branch combinations, or whether the assertions check the right things.",
            },
            {
              id: "q3",
              prompt: "Which unit test is most likely to catch an off-by-one bug in a method that sums the first n elements of an array?",
              choices: [
                "A test with a large random array, checking that the result is not null",
                "A test that only checks that the method returns without throwing",
                "A test that runs the method a thousand times for timing",
                "Tests at the boundaries, such as n = 0, n = 1, and n equal to the array length",
              ],
              answer: 3,
              chapterIndex: 3,
              explanation:
                "Off-by-one errors show up at boundaries, so boundary-value tests with exact expected sums are the ones that expose them.",
            },
          ],
        },
        {
          id: "information-hiding",
          title: "Information Hiding and Encapsulation",
          summary:
            "Explains how hiding representation behind a small public interface, guarded by class invariants, keeps modules independent and safe to change.",
          durationSeconds: 4620,
          premiereDate: "2026-11-17",
          youtubeVideoId: "b2LsNw6Yt_D",
          chapters: [
            { title: "Parnas and information hiding", start: 0 },
            { title: "Access modifiers in Java", start: 780 },
            { title: "Class invariants", start: 1800 },
            { title: "Defensive copying", start: 2820 },
            { title: "Immutable classes", start: 3720 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/17-214/lecture-03-slides.pdf",
          slidesBytes: 4705210,
          notesBytes: 615030,
          notesUrl: "https://learn.cs.cmu.edu/materials/17-214/lecture-03-notes.pdf",
          readings: [
            { title: "Minimize the accessibility of classes and members", source: "Bloch · Effective Java (3rd ed.), Item 15" },
            { title: "Minimize mutability", source: "Bloch · Effective Java (3rd ed.), Item 17" },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt:
                "A class stores a private List field and has a getter that returns that same list object. What is the problem?",
              choices: [
                "Private fields cannot be returned from public methods",
                "Callers can modify the list and break the class's invariants without going through its methods",
                "Returning a list is slower than returning an array",
                "The getter will cause a compile error because List is an interface",
              ],
              answer: 1,
              chapterIndex: 3,
              explanation:
                "Returning the internal mutable list leaks the representation, so outside code can change it directly; return a copy or an unmodifiable view instead.",
            },
            {
              id: "q2",
              prompt: "What is a class invariant?",
              choices: [
                "A field declared final",
                "A method that never changes",
                "A property of the object's state that every public method preserves",
                "A constant shared by all instances of the class",
              ],
              answer: 2,
              chapterIndex: 2,
              explanation:
                "An invariant is a condition on the object's state that holds after construction and after every public method returns.",
            },
            {
              id: "q3",
              prompt: "Why does information hiding make a system easier to change?",
              choices: [
                "Hidden code is compiled separately and runs faster",
                "It removes the need for documentation",
                "It prevents the code from ever having bugs",
                "Clients depend only on the public interface, so the hidden implementation can change without breaking them",
              ],
              answer: 3,
              chapterIndex: 0,
              explanation:
                "When a design decision is hidden inside a module, changing that decision affects only the module, not the code that uses it.",
            },
          ],
        },
      ],
    },
    {
      id: "designing-systems",
      title: "Designing systems",
      lectures: [
        {
          id: "design-patterns",
          title: "Design Patterns: Strategy, Observer, and Composite",
          summary:
            "Introduces design patterns as named, reusable solutions and works through Strategy, Observer, and Composite with Java examples.",
          durationSeconds: 4920,
          premiereDate: "2026-11-19",
          youtubeVideoId: "Vk9eJ1uGm4s",
          chapters: [
            { title: "What a design pattern is", start: 0 },
            { title: "Strategy", start: 720 },
            { title: "Observer", start: 1860 },
            { title: "Composite", start: 3000 },
            { title: "Choosing a pattern", start: 4140 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/17-214/lecture-04-slides.pdf",
          slidesBytes: 2738540,
          notesBytes: 559791,
          notesUrl: "https://learn.cs.cmu.edu/materials/17-214/lecture-04-notes.pdf",
          readings: [
            { title: "Design Patterns: Introduction", source: "Gamma, Helm, Johnson, and Vlissides · Design Patterns, Ch. 1" },
            { title: "Strategy", source: "Refactoring.Guru", url: "https://refactoring.guru/design-patterns/strategy" },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt:
                "A sorting routine should work with different comparison rules chosen by the caller. Which pattern fits best?",
              choices: [
                "Strategy",
                "Composite",
                "Singleton",
                "Observer",
              ],
              answer: 0,
              chapterIndex: 1,
              explanation:
                "Strategy encapsulates an interchangeable algorithm behind an interface, which is exactly what passing a Comparator to a sort does.",
            },
            {
              id: "q2",
              prompt: "In the Observer pattern, what does the subject know about its observers?",
              choices: [
                "Their concrete classes, so it can call specialized methods",
                "Nothing at all; observers poll the subject for changes",
                "Only that they implement a common observer interface it can notify",
                "Their internal state, so it can update them directly",
              ],
              answer: 2,
              chapterIndex: 2,
              explanation:
                "The subject holds observers through a shared interface and just notifies them, which keeps it decoupled from their concrete types.",
            },
            {
              id: "q3",
              prompt: "What problem does the Composite pattern solve?",
              choices: [
                "Ensuring a class has only one instance",
                "Letting clients treat individual objects and groups of objects uniformly through one interface",
                "Converting one interface into another a client expects",
                "Notifying many objects when one changes",
              ],
              answer: 1,
              chapterIndex: 3,
              explanation:
                "Composite builds tree structures where leaves and containers share an interface, so client code does not need to tell them apart.",
            },
          ],
        },
        {
          id: "responsibility-assignment-and-refactoring",
          title: "Assigning Responsibilities and Refactoring",
          summary:
            "Uses GRASP principles such as Information Expert, Low Coupling, and High Cohesion to decide which class does what, then shows how refactoring improves an existing design safely.",
          durationSeconds: 4680,
          premiereDate: "2026-11-24",
          youtubeVideoId: "nC5yQ8rTo3f",
          chapters: [
            { title: "From domain model to classes", start: 0 },
            { title: "Information Expert and Creator", start: 960 },
            { title: "Coupling and cohesion", start: 1980 },
            { title: "Code smells", start: 2880 },
            { title: "Refactoring under tests", start: 3780 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/17-214/lecture-05-slides.pdf",
          slidesBytes: 4596963,
          notesBytes: 338137,
          notesUrl: "https://learn.cs.cmu.edu/materials/17-214/lecture-05-notes.pdf",
          readings: [
            { title: "GRASP: Designing Objects with Responsibilities", source: "Larman · Applying UML and Patterns (3rd ed.), Ch. 17" },
            { title: "Bad Smells in Code", source: "Fowler · Refactoring: Improving the Design of Existing Code (2nd ed.), Ch. 3" },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt:
                "Under the Information Expert principle, which class should compute an order's total price?",
              choices: [
                "A separate PriceUtils class with static methods",
                "The user interface class that displays the total",
                "The database class that stores orders",
                "The Order class, since it holds the line items needed to compute the total",
              ],
              answer: 3,
              chapterIndex: 1,
              explanation:
                "Information Expert assigns a responsibility to the class that already has the information needed to fulfill it, which here is Order.",
            },
            {
              id: "q2",
              prompt: "What distinguishes a refactoring from other code changes?",
              choices: [
                "It changes the code's structure without changing its observable behavior",
                "It adds a new feature while cleaning up the code",
                "It always makes the program run faster",
                "It can only be done by an IDE tool",
              ],
              answer: 0,
              chapterIndex: 4,
              explanation:
                "Refactoring is by definition behavior-preserving; that is why a good test suite is needed to confirm nothing changed.",
            },
            {
              id: "q3",
              prompt: "A class handles file parsing, tax calculation, and email sending. Which design property is weakest?",
              choices: [
                "Polymorphism",
                "Coupling",
                "Cohesion",
                "Encapsulation of fields",
              ],
              answer: 2,
              chapterIndex: 2,
              explanation:
                "Cohesion measures how closely a class's responsibilities relate; mixing three unrelated jobs in one class gives low cohesion.",
            },
          ],
        },
        {
          id: "api-design",
          title: "Designing APIs and Libraries",
          summary:
            "Covers what makes an API easy to use and hard to misuse, from naming and minimal surface area to exceptions and evolving an API without breaking clients.",
          durationSeconds: 4560,
          premiereDate: "2026-11-26",
          youtubeVideoId: "Zt3hF6pWq8L",
          chapters: [
            { title: "Why API design matters", start: 0 },
            { title: "Naming and minimal surface", start: 840 },
            { title: "Hard to misuse", start: 1800 },
            { title: "Exceptions and error handling", start: 2760 },
            { title: "Evolving an API", start: 3660 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/17-214/lecture-06-slides.pdf",
          slidesBytes: 4671885,
          notesBytes: 611697,
          notesUrl: "https://learn.cs.cmu.edu/materials/17-214/lecture-06-notes.pdf",
          readings: [
            { title: "Design method signatures carefully", source: "Bloch · Effective Java (3rd ed.), Item 51" },
            { title: "Favor the use of standard exceptions", source: "Bloch · Effective Java (3rd ed.), Item 72" },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt: "Why is it risky to add a public method to a widely used API \"just in case\"?",
              choices: [
                "Public methods slow down the whole library",
                "Once clients depend on it, it is very hard to remove or change",
                "Java limits the number of public methods per class",
                "Public methods cannot be documented",
              ],
              answer: 1,
              chapterIndex: 1,
              explanation:
                "Anything public becomes a commitment: removing or changing it breaks clients, so when in doubt, leave it out.",
            },
            {
              id: "q2",
              prompt:
                "A method takes four boolean parameters in a row. What is the main design problem?",
              choices: [
                "Booleans use too much memory",
                "Java does not allow more than three boolean parameters",
                "Booleans cannot be passed by value",
                "Callers can easily pass them in the wrong order and the compiler will not catch it",
              ],
              answer: 3,
              chapterIndex: 2,
              explanation:
                "Long runs of same-typed parameters are easy to transpose silently; enums or a builder make such calls clearer and harder to misuse.",
            },
            {
              id: "q3",
              prompt: "A caller passes a negative size to a constructor that requires a positive size. What is the best response?",
              choices: [
                "Silently use the absolute value",
                "Store it and fail later when the object is used",
                "Throw IllegalArgumentException immediately with a clear message",
                "Return a default object with size zero",
              ],
              answer: 2,
              chapterIndex: 3,
              explanation:
                "Failing fast with a standard exception reports the error close to its cause, instead of hiding it or letting it surface far away.",
            },
          ],
        },
      ],
    },
    {
      id: "concurrency",
      title: "Concurrency",
      lectures: [
        {
          id: "concurrency-basics",
          title: "Threads, Races, and Synchronization",
          summary:
            "Introduces Java threads and shared mutable state, shows how race conditions arise, and uses locks to make compound actions atomic.",
          durationSeconds: 4800,
          premiereDate: "2026-12-01",
          youtubeVideoId: "a8DkR2vXs-N",
          chapters: [
            { title: "Why concurrency", start: 0 },
            { title: "Threads in Java", start: 900 },
            { title: "Race conditions", start: 1920 },
            { title: "Locks and synchronized", start: 2940 },
            { title: "Deadlock", start: 3960 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/17-214/lecture-07-slides.pdf",
          slidesBytes: 2612630,
          notesBytes: 201804,
          notesUrl: "https://learn.cs.cmu.edu/materials/17-214/lecture-07-notes.pdf",
          readings: [
            { title: "Thread Safety", source: "Goetz et al. · Java Concurrency in Practice, Ch. 2" },
            { title: "Concurrency", source: "The Java Tutorials", url: "https://docs.oracle.com/javase/tutorial/essential/concurrency/" },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt:
                "Two threads each run count++ 1,000 times on a shared int field with no synchronization. What can the final value be?",
              choices: [
                "Always exactly 2,000",
                "Always exactly 1,000",
                "Always more than 2,000",
                "Any value up to 2,000, because increments can be lost",
              ],
              answer: 3,
              chapterIndex: 2,
              explanation:
                "count++ is a read, an add, and a write; two threads can read the same value and both write back the same result, losing updates.",
            },
            {
              id: "q2",
              prompt: "What does a synchronized block guarantee?",
              choices: [
                "Only one thread at a time holding the same lock can run code guarded by that lock",
                "The code inside it runs faster",
                "No thread can ever be interrupted",
                "Deadlock cannot occur anywhere in the program",
              ],
              answer: 0,
              chapterIndex: 3,
              explanation:
                "synchronized gives mutual exclusion on a lock, plus visibility of changes made under it, but it does not rule out deadlock.",
            },
            {
              id: "q3",
              prompt:
                "Thread A holds lock X and waits for lock Y, while thread B holds Y and waits for X. What is this?",
              choices: [
                "A race condition",
                "Deadlock",
                "Starvation caused by thread priorities",
                "A memory leak",
              ],
              answer: 1,
              chapterIndex: 4,
              explanation:
                "Each thread waits forever for a lock the other holds; acquiring locks in a single global order prevents this cycle.",
            },
          ],
        },
        {
          id: "concurrency-abstractions",
          title: "Higher-Level Concurrency: Immutability, Executors, and Thread-Safe Collections",
          summary:
            "Shows how to avoid hand-rolled locking by using immutable objects, executor services, futures, and the java.util.concurrent collections.",
          durationSeconds: 4980,
          premiereDate: "2026-12-03",
          youtubeVideoId: "mW6tJ0cBy5P",
          chapters: [
            { title: "Avoiding shared mutable state", start: 0 },
            { title: "Immutability for thread safety", start: 780 },
            { title: "Executors and thread pools", start: 1860 },
            { title: "Futures and CompletableFuture", start: 3000 },
            { title: "Concurrent collections", start: 4080 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/17-214/lecture-08-slides.pdf",
          slidesBytes: 3682037,
          notesBytes: 193148,
          notesUrl: "https://learn.cs.cmu.edu/materials/17-214/lecture-08-notes.pdf",
          readings: [
            { title: "Task Execution", source: "Goetz et al. · Java Concurrency in Practice, Ch. 6" },
            { title: "Prefer executors, tasks, and streams to threads", source: "Bloch · Effective Java (3rd ed.), Item 80" },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt: "Why can a properly constructed immutable object be shared between threads without locking?",
              choices: [
                "Java automatically locks immutable objects",
                "Immutable objects are copied for each thread",
                "Its state never changes after construction, so there is nothing for threads to race on",
                "Immutable objects can only be used by one thread",
              ],
              answer: 2,
              chapterIndex: 1,
              explanation:
                "Races need at least one write to shared state; an immutable object has no writes after construction, so concurrent reads are safe.",
            },
            {
              id: "q2",
              prompt: "What is the main advantage of submitting tasks to an ExecutorService instead of creating a new Thread per task?",
              choices: [
                "Tasks submitted to an executor can never throw exceptions",
                "It reuses a managed pool of threads and separates what to run from how it is run",
                "It guarantees tasks finish in the order they were submitted",
                "It makes all shared data thread-safe automatically",
              ],
              answer: 1,
              chapterIndex: 2,
              explanation:
                "Executors decouple task submission from execution policy and reuse threads, avoiding the cost and risk of unbounded thread creation.",
            },
            {
              id: "q3",
              prompt:
                "Several threads update word counts in a shared map. Which choice is thread-safe without extra locking around each update?",
              choices: [
                "ConcurrentHashMap with its merge method",
                "HashMap with get followed by put",
                "TreeMap with get followed by put",
                "ConcurrentHashMap with get followed by put",
              ],
              answer: 0,
              chapterIndex: 4,
              explanation:
                "ConcurrentHashMap.merge performs the read-modify-write atomically; a separate get then put is a check-then-act race even on a concurrent map.",
            },
          ],
        },
      ],
    },
  ],
};
