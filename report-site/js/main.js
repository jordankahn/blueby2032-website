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

// Thanks page: start the download automatically
const dl = document.getElementById("auto-download");
if (dl) {
  setTimeout(() => dl.click(), 600);
}
