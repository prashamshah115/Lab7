## TEAM MEMBERS

Prasham Shah

1) Within a Github Action that runs whenever code is pushed. 
This is because immediate feedback on every push will prevent bad code from merging into main. 

This option has zero manual steps, a consistent environment, immediate visibility, and is best to use. 

2) No. 

3) In Navigation mode, Lighthouse launches a brand-new browser tab and performs a full page load exactly as a user would when they first visit your site. It captures metrics such as FCP, LCP, TBT, and TTI, all of which shine a light on how quickly your page becomes usable and responsive under real-world network conditions. Navigation audits are ideal for gauging the performance of your initial page download, render, and load phases. However, once that load finishes, Navigation mode stops collecting data—it cannot follow a user as they click buttons, open menus, or interact with dynamic components, so it won’t tell you whether a modal dialog or dropdown remains accessible after the initial load.

Snapshot mode, on the other hand, freezes the page at a single point in time—whether that’s immediately after load or after you’ve manually triggered a certain state in DevTools—and then runs its suite of audits against the static DOM as it exists at that moment. Because it doesn’t replay a network loading sequence, Snapshot mode skips performance timing metrics like LCP or TBT and instead focuses on structural best practices: accessibility checks, meta-tag and SEO validations, and adherence to progressive-web-app guidelines. This makes it especially useful when you want to verify that a particular interactive state—say, a form with client-side validation or a dynamically inserted modal—meets accessibility standards and coding best practices without the noise of load-time metrics.
   
4) - Properly size and serve images in next-gen formats
   - Add a meta viewport tag and preload LCP image
   - leverage long-term caching for static assets



