/* Aspirean Wealth — team navigation (Swup).
   Scoped SPA-style transitions between the homepage and advisor
   profile pages only. Everything else on the site navigates normally.
   Profile pages remain real, indexable URLs; Swup fetches and swaps
   them client-side so opening and closing a profile never reloads
   the page or loses scroll position. On browsers with the View
   Transitions API, the advisor's photo morphs from card to profile. */
(function () {
  if (typeof Swup === "undefined") return;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var swup = new Swup({
    containers: ["#swup"],
    /* only team-card links and links explicitly opted in via data-swup */
    linkSelector: 'a.team-card[href], a[data-swup][href]',
    native: !reduce,
    plugins: [
      new SwupPreloadPlugin({ preloadHoveredLinks: true }),
      new SwupScrollPlugin({ animateScroll: false, offset: 92 })
    ]
  });

  /* fresh DOM after every swap: rebuild scroll triggers and rebind behavior */
  swup.hooks.on("content:replace", function () {
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.getAll().forEach(function (t) { t.kill(); });
    }
    if (window.Asp && window.Asp.initPage) window.Asp.initPage();
    if (window.Asp && window.Asp.initHome) window.Asp.initHome();
    if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
  });

  /* keep GA pageviews accurate across client-side navigations */
  swup.hooks.on("visit:end", function () {
    if (typeof gtag === "function") {
      gtag("event", "page_view", {
        page_location: window.location.href,
        page_title: document.title
      });
    }
  });
})();
