
  // ---------- Petal mark (logo-derived geometry) ----------
  // 8 petals at 45deg increments, alternating two gray tones, plus dark center star
  function renderPetalMark(svgEl, scattered) {
    if (!svgEl) return; // 👈 FIX CRASH

    const ns = "http://www.w3.org/2000/svg";
    svgEl.innerHTML = "";
    const g = document.createElementNS(ns, "g");
    g.setAttribute("style", "transform-origin: 100px 100px;");

    for (let i = 0; i < 8; i++) {
      const angle = i * 45;
      const dark = i % 2 === 0;
      const offset = scattered ? (i % 2 === 0 ? 14 : -10) : 0;
      const rot = scattered ? angle + (i % 2 === 0 ? 6 : -6) : angle;
      const path = document.createElementNS(ns, "path");
      path.setAttribute("d", "M100 100 C 80 60, 85 20, 100 5 C 115 20, 120 60, 100 100 Z");
      path.setAttribute("fill", dark ? "#5A5A5A" : "#8C8C8C");
      path.setAttribute("transform", `rotate(${rot} 100 100) translate(0 ${offset})`);
      path.setAttribute("opacity", scattered ? "0.85" : "1");
      g.appendChild(path);
    }

    const center = document.createElementNS(ns, "path");
    center.setAttribute("d", "M100 70 L110 85 L128 80 L118 96 L132 108 L113 110 L116 129 L100 117 L84 129 L87 110 L68 108 L82 96 L72 80 L90 85 Z");
    center.setAttribute("fill", "#1A1A1A");
    g.appendChild(center);

    svgEl.appendChild(g);
  }

  // Render all the static (formed) petal marks across the page
  document.querySelectorAll('#nav-petal, #work-petal, .team-petal, #done-petal, #footer-petal')
    .forEach(el => renderPetalMark(el, false));

  // Hero petal: starts scattered, animates to formed
  const heroSvg = document.getElementById('hero-petal');
  renderPetalMark(heroSvg, true);
  setTimeout(() => {
    renderPetalMark(heroSvg, false);
    document.getElementById('hero-mark-spin').classList.add('formed');
  }, 250);

  // ---------- Nav scroll state ----------
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 24) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // ---------- Contact form ----------
  console.log("FORM SUBMITTED");
  console.log("FORM SUBMIT TRIGGERED");

emailjs.send(
  "YOUR_SERVICE_ID",
  "YOUR_TEMPLATE_ID",
  {
    name: "test",
    business: "test",
    email: "test@test.com",
    message: "hello"
  }
).then(
  res => console.log("SUCCESS", res),
  err => console.log("ERROR", err)
);