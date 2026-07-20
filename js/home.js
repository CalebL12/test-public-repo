/* Aspirean Wealth - homepage behavior (externalized for strict CSP) */
(function () {
  var TEAM = [
    { name: "Chris Winkler", role: "Founder | Principal", photo: "assets/team-chris-winkler.jpg",
      bio: ["My earliest inspirations came from my own family. My mother and grandparents immigrated to the US from war-torn Lebanon when she was six. I watched my grandfather work two full-time jobs, and my young single mom worked two to give me access to opportunities she did not have. They never attained what many would recognize as wealth, materially. What they left me was a legacy of hard work, personal sacrifice, and great compassion for others.",
            "After attending Purdue University and twelve years in advisor development, practice management, and senior leadership at a large privately held wealth management firm, I discovered my greatest fulfillment came from working closely with clients. I resigned to form our firm in 2009.",
            "We are private and boutique by design. The clients we work with become long-term partnerships, and often great friendships. Away from the office, my wife Lauren and I have twins, Audri and Camden. I stay busy training for triathlons, hiking, playing golf, gardening, collecting wine, and cooking."] },
    { name: "Paul Grace", role: "Founder | Wealth Manager", photo: "assets/team-paul-grace.jpg",
      bio: ["One of the most important things humans can do is help one another, and one of the things many people need help with is managing their financial lives so they can be free to enjoy them. The byline of my business has always been straight talk, genuine advice, and exceptional service.",
            "As both a wealth manager and tax advisor, I create and maintain my clients' financial plans and investment portfolios so they can live with greater peace of mind. I graduated from UC San Diego, did graduate studies at Tulane, and spent nearly five years as an auditor for the IRS before establishing my own tax and wealth management firms.",
            "Outside of work I enjoy swimming, hiking, running, skiing, and weight training. My beloved, Maria, and I travel to Kauai twice a year, and I help make Zen Buddhist meditation practice accessible in the San Francisco area."] },
    { name: "Brad Alvarez", role: "COO | CCO | Principal", photo: "assets/team-brad-alvarez.jpg",
      bio: ["I began my career in financial services in 2005 after six years in the US Navy's nuclear field, where I was selected and certified as a command financial specialist on the submarine USS Michigan. What started as a personal interest in the rules of money became a passion for helping others who had not started thinking about it yet.",
            "At Aspirean I build, implement, and oversee the firm's internal systems, processes, and compliance requirements, and I support our advisors with portfolio design, research, and client education. I take great pride in our scientific priority to portfolio design: research, process, and time-tested data.",
            "My wife Kristina and I share a dune-top home in Miller Beach, Indiana, near the beaches and trails of the Indiana Dunes National Park, with our many rescued four-legged children."] },
    { name: "Marian Jung, CPA", role: "Wealth Manager | Senior Associate", photo: "assets/team-marian-jung.jpg",
      bio: ["To me, maintaining balance in one's life, not only financially but physically, emotionally, and spiritually, is essential. Clients are like family, so they always come first. I am a phone call away for immediate needs and big life changes, whether that means buying a house, starting a new job, or helping aging parents.",
            "I graduated from UC Berkeley with my degree in business and joined Arthur Andersen & Co., where I learned the intricacies of small businesses and how owners' business and personal objectives intertwine. I also carry a personal understanding of caring for aging parents, having managed the care and livelihood of my 99-year-old mother for years.",
            "I met my husband Patrick dancing, and locally we enjoy gardening, hiking, and occasionally still getting out to dance. I love flower arranging from our bountiful garden and often share arrangements with my clients."] },
    { name: "Kevin Ostafinski", role: "Advanced Planning Lead", photo: "assets/team-kevin-ostafinski.jpg",
      bio: ["Kevin leads advanced planning at Aspirean, coordinating the complex strategies that sit behind our clients' plans: exit structuring, equity compensation, trust and estate design, and the tax work that ties them together.",
            "When a plan calls for more than the standard playbook, Kevin is the one who builds what it actually needs and makes sure every professional involved is working from the same page."] },
    { name: "Caleb Luis", role: "Associate Advisor", photo: "assets/team-caleb-luis.jpg",
      bio: ["Caleb supports Aspirean's client relationships and planning work, helping ensure that every meeting is prepared, every follow-up happens, and nothing a client is counting on falls through the cracks.",
            "He works alongside the firm's wealth managers across all three offices."] },
    { name: "Marcia Dinges", role: "Client Services Director", photo: "assets/team-marcia-dinges.jpg",
      bio: ["I have always loved helping people in any way that I can, and that passion translates directly into my work as client services director. I enjoy not only resolving our clients' challenges but getting to know each and every one of them personally.",
            "I have worked in financial services for forty years, from banking to the investment field, and I hold a Series 7 securities license. I take care of the details so our clients' experience stays seamless, from account questions to executing requests efficiently and diligently.",
            "I live in Michigan and volunteer at our local hospital and the museum in my hometown of Three Oaks. I travel to the Atlanta area a few times each year to visit my son, daughter-in-law, and two granddaughters."] }
  ];

  var track = document.getElementById("team-track");
  var modal = document.getElementById("team-modal");
  if (!track || !modal) return;

  var lastFocus = null;

  function card(m, i) {
    var b = document.createElement("button");
    b.className = "team-card";
    b.type = "button";
    b.setAttribute("data-i", i);
    b.innerHTML =
      '<img class="team-photo" loading="lazy" src="' + m.photo + '" alt="Portrait of ' + m.name + '">' +
      '<p class="team-name">' + m.name + "</p>" +
      '<p class="team-role">' + m.role + "</p>";
    var ph = b.querySelector(".team-photo");
    if (ph) ph.addEventListener("error", function () { ph.style.visibility = "hidden"; });
    b.addEventListener("click", function () { openModal(m, b); });
    return b;
  }

  TEAM.forEach(function (m, i) { track.appendChild(card(m, i)); });

  function openModal(m, trigger) {
    lastFocus = trigger;
    document.getElementById("tm-photo").src = m.photo;
    document.getElementById("tm-photo").alt = "Portrait of " + m.name;
    document.getElementById("tm-name").textContent = m.name;
    document.getElementById("tm-role").textContent = m.role;
    document.getElementById("tm-bio").innerHTML = m.bio.map(function (p) { return "<p>" + p + "</p>"; }).join("");
    modal.hidden = false;
    document.body.classList.add("modal-open");
    modal.querySelector(".team-modal-close").focus();
  }
  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    if (lastFocus) lastFocus.focus();
  }
  modal.addEventListener("click", function (e) { if (e.target.hasAttribute("data-close")) closeModal(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !modal.hidden) closeModal(); });
})();

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
