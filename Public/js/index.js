async function header() {
  const headerEl = document.querySelector("#header");

  if (headerEl) {
    const result = await fetch("../HTML/header.html");
    const header = await result.text();
    headerEl.innerHTML = header;

    const links = document.querySelectorAll("nav a");
    links.forEach((link) => {
      if (link.href === window.location.href) {
        link.classList.add("active");
      }
    });
  }
}

header();
