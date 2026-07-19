/* Aspirean Wealth - perspectives page behavior */
/* Perspectives: the signal line, drawn once on arrival.
   Noise on the left resolves into a calm horizon on the right. */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var path = document.getElementById("px-signal-path");
  if (!path) return;
  var W = 1440, MID = 62, N = 160, seed = 7;
  function rand() { seed = (seed * 16807) % 2147483647; return seed / 2147483647 - 0.5; }
  var d = "M 0 " + MID;
  for (var i = 1; i <= N; i++) {
    var x = (i / N) * W;
    var calm = Math.pow(1 - i / N, 2.2); /* jitter decays left to right */
    d += " L " + x.toFixed(1) + " " + (MID + rand() * 60 * calm).toFixed(1);
  }
  path.setAttribute("d", d);
  if (!reduce && typeof gsap !== "undefined") {
    var len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(path, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut", delay: 0.5 });
  }
})();
