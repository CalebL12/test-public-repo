/* Aspirean Wealth — shared behavior.
   One orchestrated hero moment, quiet scroll reveals, nothing fidgety.
   Structured as a re-runnable page init so Swup content swaps
   (team navigation) can rebind everything against fresh DOM. */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.Asp = window.Asp || {};

  /* header solidifies past the hero — one persistent listener, fresh query
     each tick so it survives content swaps */
  var onScroll = function () {
    var header = document.querySelector(".site-header");
    if (header) header.classList.toggle("is-solid", window.scrollY > 60);
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  Asp.initPage = function () {
    onScroll();

    /* mobile nav */
    var header = document.querySelector(".site-header");
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".nav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        header.classList.toggle("is-open", open);
        toggle.setAttribute("aria-expanded", String(open));
      });
      nav.addEventListener("click", function (e) {
        if (e.target.tagName === "A") {
          nav.classList.remove("is-open");
          header.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }

    /* contact form → Netlify Forms (AJAX submit, inline thank-you) */
    var form = document.querySelector("[data-contact-form]");
    if (form) {
      form.addEventListener("submit", async function (e) {
        e.preventDefault();
        var btn = form.querySelector('button[type="submit"]');
        if (btn) btn.disabled = true;
        try {
          var res = await fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(new FormData(form)).toString(),
          });
          if (!res.ok) throw new Error("send failed");
          var done = document.createElement("div");
          done.className = "form-sent";
          done.setAttribute("role", "status");
          done.textContent = "Thank you - you\u2019ll hear from us shortly.";
          form.replaceWith(done);
        } catch (err) {
          if (btn) btn.disabled = false;
          var note = form.querySelector(".form-error");
          if (!note) {
            note = document.createElement("p");
            note.className = "form-note form-error";
            note.setAttribute("role", "alert");
            form.appendChild(note);
          }
          note.textContent = "Something went wrong sending your note. Please call (844) 687-5342 or try again.";
        }
      });
    }

    /* hide images that fail to load (replaces inline onerror, blocked by CSP) */
    document.querySelectorAll("img[data-hide-on-error]").forEach(function (img) {
      img.addEventListener("error", function () { img.style.display = "none"; });
      if (img.complete && img.naturalWidth === 0) img.style.display = "none";
    });

    if (reduce || typeof gsap === "undefined") return; /* calm path: content is already visible */

    gsap.registerPlugin(ScrollTrigger);

    /* hero: one choreographed arrival + slow Ken Burns drift */
    var heroTitle = document.querySelector(".hero h1, .page-hero h1");
    if (heroTitle) {
      var tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } });
      tl.from(".hero .eyebrow, .page-hero .eyebrow", { y: 18, opacity: 0 })
        .from(".hero h1, .page-hero h1", { y: 40, opacity: 0 }, "-=0.55")
        .from(".hero .lead, .page-hero .lead", { y: 24, opacity: 0 }, "-=0.6")
        .from(".hero-actions", { y: 16, opacity: 0 }, "-=0.55");

      /* Ken Burns only on the homepage hero, not interior photo heroes */
      var heroImg = document.querySelector(".hero .hero-media img");
      if (heroImg) {
        gsap.to(heroImg, { scale: 1.0, duration: 14, ease: "none" });
      }
    }

    /* fluid expand / collapse for persona blocks and FAQ items */
    gsap.utils.toArray("details.persona, details.faq-item").forEach(function (d) {
      var summary = d.querySelector("summary");
      var content = d.querySelector(".persona-qs, .faq-body");
      if (!summary || !content) return;
      summary.addEventListener("click", function (e) {
        e.preventDefault();
        if (gsap.isTweening(content)) return;
        gsap.set(content, { overflow: "hidden" });
        if (!d.open) {
          d.open = true;
          gsap.fromTo(content,
            { height: 0, opacity: 0, y: -10 },
            { height: "auto", opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
              onComplete: function () { gsap.set(content, { clearProps: "all" }); ScrollTrigger.refresh(); } });
        } else {
          gsap.to(content, { height: 0, opacity: 0, y: -10, duration: 0.42, ease: "power2.inOut",
            onComplete: function () { d.open = false; gsap.set(content, { clearProps: "all" }); ScrollTrigger.refresh(); } });
        }
      });
    });

    /* quiet reveals, once each */
    gsap.utils.toArray(".reveal").forEach(function (el) {
      gsap.from(el, {
        y: 36, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
      });
    });

    /* photos drift slightly against the scroll */
    gsap.utils.toArray("img[data-parallax]").forEach(function (img) {
      var wrap = img.closest("[data-parallax-wrap]") || img.parentElement;
      gsap.fromTo(img, { yPercent: -6 }, {
        yPercent: 6, ease: "none", force3D: true,
        scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: 1.4 },
      });
    });

    /* the horizon motif draws itself in */
    gsap.utils.toArray(".horizon[data-draw]").forEach(function (el) {
      gsap.from(el, {
        scaleX: 0, duration: 1.2, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });
  };

  /* ---- boot: once per full page load ---- */
  if ("scrollRestoration" in history) history.scrollRestoration = "auto";

  if (!reduce && typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    /* Lenis shares GSAP's clock — created once, survives content swaps */
    if (typeof Lenis !== "undefined" && !Asp.lenis) {
      var lenis = new Lenis({ duration: 1.25, smoothWheel: true });
      Asp.lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);

      /* landing on a #hash (e.g. index.html#team): re-settle after images
         load and Lenis takes over, so the anchor position holds */
      if (location.hash) {
        var settle = function () {
          var t = document.querySelector(location.hash);
          if (t) lenis.scrollTo(t, { immediate: true, offset: -92 });
        };
        window.addEventListener("load", function () { setTimeout(settle, 300); }, { once: true });
      }
    }
  }

  Asp.initPage();
})();
