/* Aspirean Wealth — shared behavior.
   One orchestrated hero moment, quiet scroll reveals, nothing fidgety. */
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector(".site-header");

  /* header solidifies past the hero */
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-solid", window.scrollY > 60);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* mobile nav */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      header.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        header.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* contact form → Netlify Forms (AJAX submit, inline thank-you) */
  const form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;
      try {
        const res = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(new FormData(form)).toString(),
        });
        if (!res.ok) throw new Error("send failed");
        const done = document.createElement("div");
        done.className = "form-sent";
        done.setAttribute("role", "status");
        done.textContent = "Thank you. A person, not a queue, will reply within two business days.";
        form.replaceWith(done);
      } catch (err) {
        if (btn) btn.disabled = false;
        let note = form.querySelector(".form-error");
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

  if (reduce || typeof gsap === "undefined") return; /* calm path: content is already visible */

  gsap.registerPlugin(ScrollTrigger);

  /* Lenis shares GSAP's clock */
  if (typeof Lenis !== "undefined") {
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* hero: one choreographed arrival + slow Ken Burns drift */
  const heroTitle = document.querySelector(".hero h1, .page-hero h1");
  if (heroTitle) {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } });
    tl.from(".hero .eyebrow, .page-hero .eyebrow", { y: 18, opacity: 0 })
      .from(".hero h1, .page-hero h1", { y: 40, opacity: 0 }, "-=0.55")
      .from(".hero .lead, .page-hero .lead", { y: 24, opacity: 0 }, "-=0.6")
      .from(".hero-actions", { y: 16, opacity: 0 }, "-=0.55");

    /* Ken Burns only on the homepage hero, not interior photo heroes */
    const heroImg = document.querySelector(".hero .hero-media img");
    if (heroImg) {
      gsap.to(heroImg, { scale: 1.0, duration: 14, ease: "none" });
    }
  }

  /* fluid expand / collapse for persona blocks and FAQ items */
  gsap.utils.toArray("details.persona, details.faq-item").forEach((d) => {
    const summary = d.querySelector("summary");
    const content = d.querySelector(".persona-qs, .faq-body");
    if (!summary || !content) return;
    summary.addEventListener("click", (e) => {
      e.preventDefault();
      if (gsap.isTweening(content)) return;
      gsap.set(content, { overflow: "hidden" });
      if (!d.open) {
        d.open = true;
        gsap.fromTo(content,
          { height: 0, opacity: 0, y: -10 },
          { height: "auto", opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
            onComplete: () => { gsap.set(content, { clearProps: "all" }); ScrollTrigger.refresh(); } });
      } else {
        gsap.to(content, { height: 0, opacity: 0, y: -10, duration: 0.42, ease: "power2.inOut",
          onComplete: () => { d.open = false; gsap.set(content, { clearProps: "all" }); ScrollTrigger.refresh(); } });
      }
    });
  });

  /* quiet reveals, once each */
  gsap.utils.toArray(".reveal").forEach((el) => {
    gsap.from(el, {
      y: 36, opacity: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 82%", once: true },
    });
  });

  /* photos drift slightly against the scroll */
  gsap.utils.toArray("img[data-parallax]").forEach((img) => {
    const wrap = img.closest("[data-parallax-wrap]") || img.parentElement;
    gsap.fromTo(img, { yPercent: -6 }, {
      yPercent: 6, ease: "none", force3D: true,
      scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: 1.4 },
    });
  });

  /* the horizon motif draws itself in */
  gsap.utils.toArray(".horizon[data-draw]").forEach((el) => {
    gsap.from(el, {
      scaleX: 0, duration: 1.2, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });
})();
