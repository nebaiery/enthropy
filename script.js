document.addEventListener("DOMContentLoaded", function () {
  // ---------- Petal mark (logo-derived geometry) ----------
  function renderPetalMark(svgEl, scattered) {
    if (!svgEl) return; // Safely returns if element doesn't exist

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

  // Render static elements safely
  document.querySelectorAll('#nav-petal, #work-petal, .team-petal, #done-petal, #footer-petal')
    .forEach(el => renderPetalMark(el, false));

  // Hero petal setup with safe guard checks
  const heroSvg = document.getElementById('hero-petal');
  if (heroSvg) {
    renderPetalMark(heroSvg, true);
    setTimeout(() => {
      renderPetalMark(heroSvg, false);
      const spinner = document.getElementById('hero-mark-spin');
      if (spinner) spinner.classList.add('formed');
    }, 250);
  }

  // ---------- Nav scroll state with guard ----------
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 24) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  // ---------- Contact form with safety checks ----------
  // Check if EmailJS is loaded globally first
  if (typeof emailjs !== "undefined") {
    emailjs.init("WIXCPCAJ5LHk6s6Np");
  } else {
    console.warn("EmailJS SDK is missing. Form submissions won't work.");
  }

  const form = document.getElementById("contact-form");
  const done = document.getElementById("contact-done");

  // Only bind the submit event if the form exists on the current page
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      console.log("FORM SUBMITTED");

      const submitBtn = form.querySelector("button");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }

      // Quick check to ensure form inputs actually exist with these names
      const nameVal = form.name ? form.name.value : "";
      const businessVal = form.business ? form.business.value : "";
      const emailVal = form.email ? form.email.value : "";
      const messageVal = form.message ? form.message.value : "";

      if (typeof emailjs !== "undefined") {
        emailjs.send(
          "service_poddp8p",
          "template_f9detvj",
          {
            name: nameVal,
            business: businessVal,
            email: emailVal,
            message: messageVal
          }
        )
        .then((res) => {
          console.log("SUCCESS", res);
          form.classList.add("hide");
          if (done) done.classList.add("show");
        })
        .catch((err) => {
          console.log("ERROR", err);
          alert("Failed to send message. Check console.");
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Send message";
          }
        });
      }
    });
  }
});