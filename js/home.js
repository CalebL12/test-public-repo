/* Aspirean Wealth - homepage behavior (externalized for strict CSP) */

window.Asp = window.Asp || {};
window.Asp.initHome = function () {
/* Who we serve: the selector. Three cohorts, one visible at a time,
   because the copy asks the reader to start with the one that sounds
   like them. Accessible tabs; without JS all three read stacked. */
(function () {
  var tablist = document.querySelector("[data-ptabs]");
  if (!tablist) return;
  var tabs = Array.prototype.slice.call(tablist.querySelectorAll(".ptab"));
  var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute("aria-controls")); });
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGsap = typeof gsap !== "undefined";
  var current = 0;

  /* JS is running: hide the inactive panels the no-JS path leaves visible */
  panels.forEach(function (p, i) { if (i !== 0) p.hidden = true; });

  function select(i, focus) {
    if (i === current) return;
    var prev = current; current = i;
    tabs.forEach(function (t, k) {
      t.classList.toggle("is-active", k === i);
      t.setAttribute("aria-selected", String(k === i));
      t.setAttribute("tabindex", k === i ? "0" : "-1");
    });
    panels[prev].hidden = true;
    panels[i].hidden = false;
    if (focus) tabs[i].focus();
    if (!reduce && hasGsap) {
      gsap.fromTo(panels[i].querySelector(".ppanel-rail"),
        { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" });
      gsap.fromTo(panels[i].querySelectorAll(".qa"),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power2.out", stagger: 0.07 });
      if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
    }
  }

  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { select(i, false); });
    t.addEventListener("keydown", function (e) {
      var k = e.key;
      if (k === "ArrowRight" || k === "ArrowDown") { e.preventDefault(); select((i + 1) % tabs.length, true); }
      if (k === "ArrowLeft" || k === "ArrowUp") { e.preventDefault(); select((i - 1 + tabs.length) % tabs.length, true); }
      if (k === "Home") { e.preventDefault(); select(0, true); }
      if (k === "End") { e.preventDefault(); select(tabs.length - 1, true); }
    });
  });
})();

/* Homepage scroll choreography: the headline arrives line by line on
   the baseline grid, the hero settles back as the page takes over,
   ledger rows and index rows enter as one gesture, and the thesis
   reads itself in at the center of the page. */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || typeof gsap === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  /* the headline arrives line by line, from behind its own baselines */
  var h1 = document.querySelector(".hero h1");
  if (h1 && h1.innerHTML.indexOf("<br") !== -1) {
    h1.innerHTML = h1.innerHTML.split(/<br\s*\/?>/i).map(function (line) {
      return '<span class="hl"><span class="hl-in">' + line + "</span></span>";
    }).join("");
    gsap.from(".hero h1 .hl-in", { yPercent: 110, duration: 1.05, ease: "power3.out", stagger: 0.1, delay: 0.3 });
  }

  /* grouped arrivals: rows enter as one gesture */
  function batch(sel, trigger) {
    gsap.from(sel, {
      y: 28, opacity: 0, duration: 0.7, ease: "power2.out", stagger: 0.12,
      scrollTrigger: { trigger: trigger, start: "top 78%", once: true }
    });
  }
  batch(".cost-ledger .cost-row", ".cost-ledger");
  batch(".svc-index .svc", ".svc-index");
  batch(".expect-grid > div", ".expect-grid");
  batch(".steps-v .step-row", ".steps-v");
  batch(".team-grid .team-card", ".team-grid");

  /* the visible cohort's questions arrive as one gesture on first view */
  var firstList = document.querySelector(".ppanel:not([hidden]) .wws-list");
  if (firstList) {
    gsap.from(firstList.querySelectorAll(".qa"), {
      y: 24, opacity: 0, duration: 0.7, ease: "power2.out", stagger: 0.1,
      scrollTrigger: { trigger: firstList, start: "top 80%", once: true }
    });
  }

  /* the thesis quote reads itself in as you pass it */
  var q = document.querySelector("[data-quote]");
  if (q) {
    (function wrapWords(el) {
      Array.prototype.slice.call(el.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var s = document.createElement("span");
            s.className = "qw"; s.textContent = part;
            frag.appendChild(s);
          });
          el.replaceChild(frag, n);
        } else if (n.nodeType === 1) { wrapWords(n); }
      });
    })(q);
    gsap.fromTo(q.querySelectorAll(".qw"),
      { opacity: 0.16 },
      { opacity: 1, ease: "none", stagger: 0.04,
        scrollTrigger: { trigger: q, start: "top 78%", end: "top 34%", scrub: true } });
  }
})();
};

window.Asp.initHome();
