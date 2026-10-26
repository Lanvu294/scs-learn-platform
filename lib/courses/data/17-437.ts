import type { Course } from "../types";

export const course: Course = {
  code: "17-437",
  title: "Web Application Development",
  summary:
    "Build real, database-backed web applications with Python and Django, from HTTP and HTML through models, forms, Ajax, and security. By the end you can design, secure, and deploy a complete web app.",
  instructors: [{ name: "Terry Lee", photo: "/landing/faculty/lee.png" }],
  level: "Advanced undergraduate",
  prerequisites: [
    "Comfortable writing Python programs a few hundred lines long",
    "Object-oriented design: classes, inheritance, and splitting code into modules",
    "Basic command line and git: navigating folders, running scripts, committing and pushing",
    "No prior web development experience needed; HTTP, HTML, CSS, and JavaScript are taught from the start",
  ],
  easierCourses: [
    {
      code: "17-214",
      title: "Principles of Software Construction",
      href: "/courses/17-214",
      reason: "Builds the object-oriented design and testing habits that larger web apps depend on.",
    },
    {
      code: "15-112",
      title: "Fundamentals of Programming and Computer Science",
      href: "https://www.cs.cmu.edu/~112/",
      reason: "Gets you fluent in Python, the language every assignment here is written in.",
    },
  ],
  premiereDate: "2026-11-03",
  youtubePlaylistId: "PLw7Qk3mZt9RxLp2VbN8cJ4hYfD6sGa1Ue",
  units: [
    {
      id: "how-the-web-works",
      title: "How the web works",
      lectures: [
        {
          id: "http-request-response",
          title: "HTTP and the Request-Response Cycle",
          summary:
            "How a browser and server talk: URLs, HTTP methods, headers, status codes, and why the protocol is stateless.",
          durationSeconds: 4740,
          premiereDate: "2026-11-03",
          youtubeVideoId: "hT3pQx8LmZa",
          chapters: [
            { title: "What happens when you type a URL", start: 0 },
            { title: "Anatomy of an HTTP request", start: 860 },
            { title: "Methods and status codes", start: 1920 },
            { title: "Statelessness and cookies", start: 2950 },
            { title: "Inspecting traffic with dev tools", start: 3880 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/17-437/lecture-01-slides.pdf",
          slidesBytes: 3455288,
          notesBytes: 569326,
          notesUrl: "https://learn.cs.cmu.edu/materials/17-437/lecture-01-notes.pdf",
          readings: [
            {
              title: "An overview of HTTP",
              source: "MDN Web Docs",
              url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview",
            },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt: "Which HTTP method is defined as safe, meaning it should not change state on the server?",
              choices: ["POST", "PUT", "GET", "DELETE"],
              answer: 2,
              chapterIndex: 2,
              explanation:
                "GET is meant only to retrieve a resource, so browsers, caches, and crawlers may repeat it freely. POST, PUT, and DELETE are all intended to modify server state.",
            },
            {
              id: "q2",
              prompt: "What does it mean that HTTP is stateless?",
              choices: [
                "Every request is encrypted independently",
                "Each request stands on its own; the protocol keeps no memory of earlier requests",
                "The server may not store anything in a database",
                "The connection must close after every response",
              ],
              answer: 1,
              chapterIndex: 3,
              explanation:
                "HTTP itself does not link one request to the next, which is why apps use cookies and sessions to carry state. Servers can still use databases, and connections can be kept alive.",
            },
            {
              id: "q3",
              prompt: "A browser receives a 302 response with a Location header. What does it do next?",
              choices: [
                "Shows an error page to the user",
                "Retries the same request after a delay",
                "Caches the response body permanently",
                "Sends a new request to the URL in the Location header",
              ],
              answer: 3,
              chapterIndex: 2,
              explanation:
                "3xx status codes are redirects, and the Location header tells the browser where to go. The browser follows it automatically with a new request.",
            },
          ],
        },
        {
          id: "html-and-css",
          title: "HTML Structure and CSS Styling",
          summary:
            "Marking up content with semantic HTML and styling it with CSS selectors, the box model, and modern layout.",
          durationSeconds: 4860,
          premiereDate: "2026-11-05",
          youtubeVideoId: "Kc9vR2wNq4E",
          chapters: [
            { title: "Documents, elements, and the DOM", start: 0 },
            { title: "Semantic HTML", start: 780 },
            { title: "Selectors and the cascade", start: 1840 },
            { title: "The box model", start: 2900 },
            { title: "Layout with flexbox and grid", start: 3820 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/17-437/lecture-02-slides.pdf",
          slidesBytes: 3877115,
          notesBytes: 271016,
          notesUrl: "https://learn.cs.cmu.edu/materials/17-437/lecture-02-notes.pdf",
          readings: [
            {
              title: "HTML",
              source: "MDN Web Docs",
              url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
            },
            {
              title: "CSS",
              source: "MDN Web Docs",
              url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
            },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt: "Which CSS selector has the highest specificity?",
              choices: ["a", "nav a", "#nav", ".nav a"],
              answer: 2,
              chapterIndex: 2,
              explanation:
                "An ID selector outweighs any number of class and element selectors. \".nav a\" has one class and one element, which is still lower than one ID.",
            },
            {
              id: "q2",
              prompt: "Why use semantic elements like <nav> and <article> instead of generic <div>s?",
              choices: [
                "They describe the meaning of the content, which helps assistive technology, search engines, and other developers",
                "They make the page load faster",
                "They are required for CSS to apply",
                "They prevent JavaScript from modifying the page",
              ],
              answer: 0,
              chapterIndex: 1,
              explanation:
                "Semantic elements carry meaning about what the content is, so screen readers and other tools can navigate it. They have no special effect on speed, styling, or scripting.",
            },
            {
              id: "q3",
              prompt:
                "With the default box-sizing: content-box, an element has width: 200px, padding: 10px, and a 2px border. How wide is it on screen, ignoring margin?",
              choices: ["200px", "212px", "220px", "224px"],
              answer: 3,
              chapterIndex: 3,
              explanation:
                "In content-box sizing, width covers only the content, so padding and border are added on both sides: 200 + 2×10 + 2×2 = 224px.",
            },
          ],
        },
      ],
    },
    {
      id: "server-side-with-django",
      title: "Server-side with Django",
      lectures: [
        {
          id: "django-routing-views-templates",
          title: "Django Routing, Views, and Templates",
          summary:
            "How Django maps a URL to a view function and renders an HTML response from a template.",
          durationSeconds: 4680,
          premiereDate: "2026-11-10",
          youtubeVideoId: "mP4xZ7tYb0s",
          chapters: [
            { title: "Projects, apps, and the request flow", start: 0 },
            { title: "URL patterns and converters", start: 920 },
            { title: "Writing view functions", start: 1860 },
            { title: "Templates and context", start: 2790 },
            { title: "Template inheritance and auto-escaping", start: 3700 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/17-437/lecture-03-slides.pdf",
          slidesBytes: 2255728,
          notesBytes: 409389,
          notesUrl: "https://learn.cs.cmu.edu/materials/17-437/lecture-03-notes.pdf",
          readings: [
            {
              title: "URL dispatcher",
              source: "Django documentation",
              url: "https://docs.djangoproject.com/en/stable/topics/http/urls/",
            },
            {
              title: "Templates",
              source: "Django documentation",
              url: "https://docs.djangoproject.com/en/stable/topics/templates/",
            },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt: "What does a Django view function return when it handles a request successfully?",
              choices: [
                "A string of HTML",
                "A dictionary of template context",
                "An HttpResponse object",
                "The name of a template file",
              ],
              answer: 2,
              chapterIndex: 2,
              explanation:
                "Django expects every view to return an HttpResponse (or raise an exception). Shortcuts like render() build that HttpResponse from a template and context for you.",
            },
            {
              id: "q2",
              prompt:
                "Given path(\"posts/<int:post_id>/\", views.post_detail), how is the view called for a request to /posts/42/?",
              choices: [
                "post_detail(request) with 42 available only in request.GET",
                "post_detail(request, post_id=42), with 42 as an integer",
                "post_detail(request, post_id=\"42\"), with 42 as a string",
                "post_detail(42)",
              ],
              answer: 1,
              chapterIndex: 1,
              explanation:
                "Captured path segments are passed to the view as keyword arguments after request. The int converter turns the matched text into a Python int.",
            },
            {
              id: "q3",
              prompt: "Why does the Django template language auto-escape variables by default?",
              choices: [
                "To make pages render faster",
                "To shorten the generated HTML",
                "To translate text into the user's language",
                "To stop user-supplied text from being interpreted as HTML or JavaScript",
              ],
              answer: 3,
              chapterIndex: 4,
              explanation:
                "Auto-escaping converts characters like < and > into HTML entities, so data a user typed is shown as text instead of run as markup. This is a key defense against cross-site scripting.",
            },
          ],
        },
        {
          id: "django-models-orm",
          title: "Models and the Django ORM",
          summary:
            "Defining data as Python model classes, evolving the schema with migrations, and querying it through the ORM.",
          durationSeconds: 4920,
          premiereDate: "2026-11-12",
          youtubeVideoId: "Zr8Lw1fHd5J",
          chapters: [
            { title: "Relational databases in one slide", start: 0 },
            { title: "Defining models and fields", start: 840 },
            { title: "Migrations", start: 1900 },
            { title: "Querying with QuerySets", start: 2880 },
            { title: "Relationships: ForeignKey and ManyToMany", start: 3950 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/17-437/lecture-04-slides.pdf",
          slidesBytes: 2751139,
          notesBytes: 265877,
          notesUrl: "https://learn.cs.cmu.edu/materials/17-437/lecture-04-notes.pdf",
          readings: [
            {
              title: "Models",
              source: "Django documentation",
              url: "https://docs.djangoproject.com/en/stable/topics/db/models/",
            },
            {
              title: "Making queries",
              source: "Django documentation",
              url: "https://docs.djangoproject.com/en/stable/topics/db/queries/",
            },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt: "You add a new field to a model. What must happen before the database table has that column?",
              choices: [
                "Run makemigrations to create a migration, then migrate to apply it",
                "Restart the development server",
                "Nothing; Django adds the column on the next query",
                "Delete and recreate the database by hand",
              ],
              answer: 0,
              chapterIndex: 2,
              explanation:
                "makemigrations records the model change as a migration file, and migrate applies it to the database schema. Restarting the server does not change the schema.",
            },
            {
              id: "q2",
              prompt: "A Comment model has post = models.ForeignKey(Post, on_delete=models.CASCADE). What relationship does this describe?",
              choices: [
                "Each post has exactly one comment",
                "Many comments can belong to one post, and each comment belongs to one post",
                "Each comment can belong to many posts",
                "Posts and comments are stored in the same table",
              ],
              answer: 1,
              chapterIndex: 4,
              explanation:
                "A ForeignKey is a many-to-one link: each comment row stores one post id, and many comments can share it.",
            },
            {
              id: "q3",
              prompt: "When does qs = Post.objects.filter(published=True) actually query the database?",
              choices: [
                "Immediately, on that line",
                "When the server starts",
                "Only when the model is saved",
                "When the QuerySet is evaluated, for example by iterating over it or calling list(qs)",
              ],
              answer: 3,
              chapterIndex: 3,
              explanation:
                "QuerySets are lazy: building and chaining filters runs no SQL. The query is sent only when the results are needed.",
            },
          ],
        },
        {
          id: "django-forms-validation",
          title: "Forms and Validation",
          summary:
            "Accepting user input safely with Django forms, server-side validation, and the post/redirect/get pattern.",
          durationSeconds: 4560,
          premiereDate: "2026-11-17",
          youtubeVideoId: "bN6qJ0eVx3c",
          chapters: [
            { title: "HTML forms, GET, and POST", start: 0 },
            { title: "Django Form classes", start: 810 },
            { title: "Validation and cleaned_data", start: 1750 },
            { title: "ModelForms", start: 2760 },
            { title: "Post/redirect/get", start: 3690 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/17-437/lecture-05-slides.pdf",
          slidesBytes: 1272176,
          notesBytes: 646025,
          notesUrl: "https://learn.cs.cmu.edu/materials/17-437/lecture-05-notes.pdf",
          readings: [
            {
              title: "Working with forms",
              source: "Django documentation",
              url: "https://docs.djangoproject.com/en/stable/topics/forms/",
            },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt: "Your form already validates input in the browser. Why validate it again on the server?",
              choices: [
                "Browsers cannot check required fields",
                "Server-side validation makes the page load faster",
                "Anyone can bypass the browser and send arbitrary requests directly to the server",
                "Django refuses to save data that was validated in the browser",
              ],
              answer: 2,
              chapterIndex: 2,
              explanation:
                "Client-side checks are a convenience for honest users; an attacker can edit the page or send requests with a tool like curl. Only checks on the server can be trusted.",
            },
            {
              id: "q2",
              prompt: "After form.is_valid() returns True, where should a view read the validated, type-converted values?",
              choices: [
                "request.POST",
                "form.data",
                "form.errors",
                "form.cleaned_data",
              ],
              answer: 3,
              chapterIndex: 2,
              explanation:
                "is_valid() runs each field's cleaning and stores the converted results in cleaned_data. request.POST and form.data still hold the raw submitted strings.",
            },
            {
              id: "q3",
              prompt: "Why should a view redirect after successfully handling a POST instead of rendering a page directly?",
              choices: [
                "Redirects are required for CSRF protection to work",
                "So refreshing the resulting page does not resubmit the form",
                "Because a POST response cannot contain HTML",
                "To clear the database transaction",
              ],
              answer: 1,
              chapterIndex: 4,
              explanation:
                "With post/redirect/get, the browser ends up on a page loaded by GET, so a refresh repeats the harmless GET rather than the POST that created data.",
            },
          ],
        },
      ],
    },
    {
      id: "client-side-and-shipping",
      title: "Client side and shipping",
      lectures: [
        {
          id: "javascript-and-ajax",
          title: "JavaScript, the DOM, and Ajax",
          summary:
            "Making pages interactive with JavaScript and the DOM, and updating them with data fetched from Django views.",
          durationSeconds: 4800,
          premiereDate: "2026-11-19",
          youtubeVideoId: "Wd2sF9kCy7o",
          chapters: [
            { title: "JavaScript for Python programmers", start: 0 },
            { title: "Selecting and changing the DOM", start: 890 },
            { title: "Events", start: 1830 },
            { title: "fetch, Promises, and async/await", start: 2820 },
            { title: "JSON endpoints in Django", start: 3860 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/17-437/lecture-06-slides.pdf",
          slidesBytes: 2687233,
          notesBytes: 385319,
          notesUrl: "https://learn.cs.cmu.edu/materials/17-437/lecture-06-notes.pdf",
          readings: [
            {
              title: "Using the Fetch API",
              source: "MDN Web Docs",
              url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
            },
            {
              title: "Document Object Model (DOM)",
              source: "MDN Web Docs",
              url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model",
            },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt: "What is the main benefit of Ajax in a web app?",
              choices: [
                "Updating part of the page with new data without a full page reload",
                "Running Python code inside the browser",
                "Making the server stateful",
                "Removing the need for a database",
              ],
              answer: 0,
              chapterIndex: 3,
              explanation:
                "Ajax lets JavaScript request data in the background and patch the DOM, so the user keeps their place while the page updates.",
            },
            {
              id: "q2",
              prompt: "What does calling fetch(url) return?",
              choices: [
                "The response body as a string",
                "A Promise that resolves to a Response object",
                "A parsed JavaScript object",
                "Nothing; it blocks until the request finishes",
              ],
              answer: 1,
              chapterIndex: 3,
              explanation:
                "fetch is asynchronous and returns a Promise right away. Once it resolves to a Response, you call a method like response.json() to read the body.",
            },
            {
              id: "q3",
              prompt:
                "A POST sent with fetch to a Django view gets a 403 Forbidden, while the same form submitted normally works. What is the most likely cause?",
              choices: [
                "Django does not accept requests from JavaScript",
                "fetch can only send GET requests",
                "The view must return JSON instead of HTML",
                "The request is missing the CSRF token, for example in an X-CSRFToken header",
              ],
              answer: 3,
              chapterIndex: 4,
              explanation:
                "Django's CSRF middleware rejects unsafe requests without a valid token with 403. A normal form includes it via {% csrf_token %}, but a fetch call must send it explicitly.",
            },
          ],
        },
        {
          id: "web-security",
          title: "Web Security: XSS, CSRF, and SQL Injection",
          summary:
            "How the three classic web attacks work and the defenses Django gives you against each one.",
          durationSeconds: 4950,
          premiereDate: "2026-11-24",
          youtubeVideoId: "gX5tM3uRa8P",
          chapters: [
            { title: "Thinking like an attacker", start: 0 },
            { title: "SQL injection", start: 900 },
            { title: "Cross-site scripting (XSS)", start: 1980 },
            { title: "Cross-site request forgery (CSRF)", start: 3010 },
            { title: "Django's security defaults", start: 4040 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/17-437/lecture-07-slides.pdf",
          slidesBytes: 2687258,
          notesBytes: 509608,
          notesUrl: "https://learn.cs.cmu.edu/materials/17-437/lecture-07-notes.pdf",
          readings: [
            {
              title: "Cross Site Scripting (XSS)",
              source: "OWASP",
              url: "https://owasp.org/www-community/attacks/xss/",
            },
            {
              title: "Security in Django",
              source: "Django documentation",
              url: "https://docs.djangoproject.com/en/stable/topics/security/",
            },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt: "What is the most reliable defense against SQL injection?",
              choices: [
                "Hiding database error messages from users",
                "Removing quote characters from user input",
                "Using parameterized queries, such as those the Django ORM generates, instead of building SQL strings from input",
                "Requiring users to log in",
              ],
              answer: 2,
              chapterIndex: 1,
              explanation:
                "Parameterized queries send user data separately from the SQL text, so it can never be parsed as SQL. Filtering characters or hiding errors leaves gaps.",
            },
            {
              id: "q2",
              prompt: "In a stored XSS attack, where does the malicious script come from?",
              choices: [
                "A browser extension the victim installed",
                "Input the attacker saved on the site, such as a comment, that is later shown to other users without escaping",
                "A forged request sent from another website",
                "A compromised database password",
              ],
              answer: 1,
              chapterIndex: 2,
              explanation:
                "Stored XSS happens when attacker-supplied content is saved and later rendered as HTML in other users' browsers. Escaping output, as Django templates do by default, prevents it.",
            },
            {
              id: "q3",
              prompt: "What makes a CSRF attack possible?",
              choices: [
                "The browser automatically attaches the victim's cookies to requests sent to the target site, even when another site triggers them",
                "The attacker steals the victim's password",
                "The server stores passwords in plain text",
                "The target site does not use HTTPS",
              ],
              answer: 0,
              chapterIndex: 3,
              explanation:
                "CSRF abuses the victim's existing logged-in session: the forged request carries their session cookie. A secret CSRF token that the attacker's page cannot read lets the server reject such requests.",
            },
          ],
        },
        {
          id: "deploying-django",
          title: "Deploying a Django Application",
          summary:
            "Taking an app from runserver to production: settings, static files, an application server, and HTTPS.",
          durationSeconds: 4620,
          premiereDate: "2026-11-26",
          youtubeVideoId: "Yq1nE6vTk2H",
          chapters: [
            { title: "Why runserver is not production", start: 0 },
            { title: "Production settings and secrets", start: 830 },
            { title: "Static files and collectstatic", start: 1780 },
            { title: "Gunicorn behind nginx", start: 2740 },
            { title: "HTTPS and the deployment checklist", start: 3720 },
          ],
          slidesUrl: "https://learn.cs.cmu.edu/materials/17-437/lecture-08-slides.pdf",
          slidesBytes: 3174619,
          notesBytes: 249231,
          notesUrl: "https://learn.cs.cmu.edu/materials/17-437/lecture-08-notes.pdf",
          readings: [
            {
              title: "Deployment checklist",
              source: "Django documentation",
              url: "https://docs.djangoproject.com/en/stable/howto/deployment/checklist/",
            },
            {
              title: "How to deploy Django",
              source: "Django documentation",
              url: "https://docs.djangoproject.com/en/stable/howto/deployment/",
            },
          ],
          selfCheck: [
            {
              id: "q1",
              prompt: "What does running manage.py collectstatic do?",
              choices: [
                "Copies every app's static files into STATIC_ROOT so a web server can serve them",
                "Compresses the database",
                "Deletes unused templates",
                "Runs the test suite against production settings",
              ],
              answer: 0,
              chapterIndex: 2,
              explanation:
                "collectstatic gathers static files from all apps into one directory. In production a web server or similar tool serves that directory directly, since Django does not serve static files when DEBUG is False.",
            },
            {
              id: "q2",
              prompt: "Why must DEBUG be set to False in production?",
              choices: [
                "It makes the database faster",
                "Debug error pages expose stack traces, settings, and code details to anyone who triggers an error",
                "Templates cannot render while DEBUG is True",
                "HTTPS only works when DEBUG is False",
              ],
              answer: 1,
              chapterIndex: 1,
              explanation:
                "With DEBUG on, an error shows a detailed page full of internal information an attacker can use. Django's deployment checklist lists turning it off as essential.",
            },
            {
              id: "q3",
              prompt: "In a typical setup with nginx in front, what is Gunicorn's job?",
              choices: [
                "Storing the application's data",
                "Issuing HTTPS certificates",
                "Compiling Python to JavaScript",
                "Running the Django application through its WSGI interface and returning responses to the web server",
              ],
              answer: 3,
              chapterIndex: 3,
              explanation:
                "Gunicorn is a WSGI server: it runs worker processes that call your Django app. nginx sits in front, handling client connections, TLS, and static files and forwarding the rest to Gunicorn.",
            },
          ],
        },
      ],
    },
  ],
};
