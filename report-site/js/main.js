// Reading progress bar
const bar = document.getElementById("progress");
if (bar) {
  const update = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.width = max > 0 ? (h.scrollTop / max) * 100 + "%" : "0%";
  };
  document.addEventListener("scroll", update, { passive: true });
  update();
}

// Section navigation toggle
const toggle = document.getElementById("nav-toggle");
const nav = document.getElementById("site-nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Outline rail: highlight the section currently in view
const outline = document.querySelector(".outline");
if (outline) {
  const links = Array.from(outline.querySelectorAll('a[href^="#"]'));
  const sections = links
    .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
    .filter(Boolean);
  let ticking = false;
  const mark = () => {
    ticking = false;
    const line = window.scrollY + window.innerHeight * 0.3;
    // Only show the rail once the reader is into the article
    outline.classList.toggle("visible", sections.length > 0 && line >= sections[0].offsetTop);
    let current = sections[0];
    sections.forEach((s) => { if (s.offsetTop <= line) current = s; });
    links.forEach((a) => {
      if (a.getAttribute("href") === "#" + current.id) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  };
  document.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(mark); }
  }, { passive: true });
  window.addEventListener("resize", mark);
  mark();
}

// Thanks page: start the download automatically
const dl = document.getElementById("auto-download");
if (dl) {
  setTimeout(() => dl.click(), 600);
}

// Toast notifications
function showToast(message, isError) {
  let stack = document.querySelector(".toast-stack");
  if (!stack) {
    stack = document.createElement("div");
    stack.className = "toast-stack";
    stack.setAttribute("role", "status");
    stack.setAttribute("aria-live", "polite");
    document.body.appendChild(stack);
  }
  const t = document.createElement("div");
  t.className = "toast" + (isError ? " toast-error" : "");
  t.textContent = message;
  stack.appendChild(t);
  requestAnimationFrame(() => t.classList.add("show"));
  setTimeout(() => {
    t.classList.remove("show");
    setTimeout(() => t.remove(), 300);
  }, 6000);
}

// Netlify forms: AJAX submit with toast feedback.
// Falls back to the native POST + redirect if JS never runs.
const SENT_MESSAGE = "Request sent. We'll be back in touch within a few business days.";
document.querySelectorAll('form[data-netlify="true"]').forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const data = new URLSearchParams(new FormData(form));
    if (!data.has("form-name")) data.set("form-name", form.getAttribute("name"));
    if (btn) btn.disabled = true;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: data.toString(),
    })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        const action = form.getAttribute("action") || "";
        if (action.indexOf("/thanks") === 0) {
          // The download/notify flow confirms on the thanks page itself
          window.location.assign(action);
          return;
        }
        form.reset();
        if (btn) btn.disabled = false;
        showToast(SENT_MESSAGE);
      })
      .catch(() => {
        if (btn) btn.disabled = false;
        showToast("Couldn't send — please check your connection and try again.", true);
      });
  });
});

// Confirmation toast when a native (no-JS) submit redirects back with ?sent=true
if (window.location.search.indexOf("sent=true") !== -1) {
  showToast(SENT_MESSAGE);
  history.replaceState(null, "", window.location.pathname);
}
