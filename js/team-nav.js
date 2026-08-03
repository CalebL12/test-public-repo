/* Aspirean Wealth — team navigation (Swup).
   Scoped SPA-style transitions between the homepage and advisor
   profile pages only. Profile pages remain real, indexable URLs.

   Scroll is managed here, through Lenis, rather than by a plugin:
   Lenis owns the scroll position on this site, so any programmatic
   scroll that bypasses it gets overridden a frame later. Deposits:
   - opening a profile lands at the top of the profile
   - the "Our team" link lands at the team section
   - browser back/forward restores the exact prior position
   The jump happens inside the content swap, so on browsers with the
   View Transitions API it is captured in the transition itself and
   there is no visible correction afterward. */
(function () {
  if (typeof Swup === "undefined") return;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var native = !reduce && typeof document.startViewTransition === "function";

  /* swup owns scroll on these pages; the browser's own restoration
     would race our deposits with stale positions */
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  var swup = new Swup({
    containers: ["#swup"],
    linkSelector: 'a.team-card[href], a[data-swup][href]',
    native: native,
    animationSelector: (!native && !reduce) ? '[class*="transition-"]' : false,
    plugins: [new SwupPreloadPlugin({ preloadHoveredLinks: true })]
  });

  /* silence swup's built-in scroll-to-top / scroll-to-anchor: all
     scrolling on these pages goes through Lenis via jumpTo below,
     otherwise core's native scrollTo desyncs Lenis and the page
     drifts away from the deposit */
  swup.hooks.replace("scroll:top", function () { return true; });
  swup.hooks.replace("scroll:anchor", function () { return true; });

  function jumpTo(y) {
    if (window.Asp && window.Asp.lenis) {
      /* recalc first: Lenis clamps to its cached limit from the page
         we just left, which on a short profile page would truncate a
         deposit deep into the homepage */
      window.Asp.lenis.resize();
      window.Asp.lenis.scrollTo(y, { immediate: true, force: true });
    } else {
      window.scrollTo(0, y);
    }
  }

  /* last scroll position per URL, for history restoration.
     Tracked with our own current-path pointer: on popstate the URL has
     already changed by the time hooks run, so location.pathname would
     key the position of the page we are leaving to the wrong URL. */
  var positions = {};
  var currentPath = location.pathname;
  function pathOf(url) { return String(url || "").split("#")[0].split("?")[0]; }

  swup.hooks.on("visit:start", function () {
    positions[currentPath] = window.scrollY;
  });

  function hashTarget(hash) {
    var el = hash && document.querySelector(hash);
    return el ? Math.max(0, el.getBoundingClientRect().top + window.scrollY - 92) : 0;
  }

  swup.hooks.on("content:replace", function (visit) {
    /* provisional deposit target, so reveal binding knows the viewport.
       History visits have no triggering link element - more reliable
       across swup versions than the visit.history.popstate flag. */
    var pop = !(visit.trigger && visit.trigger.el);
    var y = pop ? (positions[pathOf(visit.to.url)] || 0) : hashTarget(visit.to.hash);

    /* rebuild page behavior against the fresh DOM */
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.getAll().forEach(function (t) { t.kill(); });
    }
    try {
      if (window.Asp && window.Asp.initPage) window.Asp.initPage({ swap: true, viewportY: y });
      if (window.Asp && window.Asp.initHome) window.Asp.initHome();
    } catch (e) {
      /* a page-script error must never abort the navigation */
      if (window.console) console.error(e);
    }

    /* refresh scroll triggers first - refresh carries scroll memory
       that would override a deposit made before it - then measure and
       deposit as the very last scroll mutation of the swap */
    if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
    if (!pop) y = hashTarget(visit.to.hash);
    jumpTo(y);
    currentPath = location.pathname;
  });

  /* safety net: with scrollRestoration manual, a full-page back/forward
     arrival (e.g. returning from a non-swup page) restores from our own
     record instead of landing at the top */
  window.addEventListener("pagehide", function () {
    try { sessionStorage.setItem("asp-y:" + location.pathname, String(window.scrollY)); } catch (e) {}
  });
  window.addEventListener("load", function () {
    var nav = performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
    if (!nav || nav.type !== "back_forward") return;
    var y = null;
    try { y = sessionStorage.getItem("asp-y:" + location.pathname); } catch (e) {}
    if (y !== null) setTimeout(function () { jumpTo(parseFloat(y)); }, 60);
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
