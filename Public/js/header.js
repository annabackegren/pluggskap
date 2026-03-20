async function header() {
  const headerEl = document.querySelector("#header");

  if (headerEl) {
    const result = await fetch("/html/header.html"),
      header = await result.text();
    headerEl.innerHTML = header;

    const links = headerEl.querySelectorAll("nav a"),
      button = headerEl.querySelector("#hamburger"),
      menu = headerEl.querySelector("#menulist"),
      hamburgerWrapper = headerEl.querySelector("#hamburger-wrapper"),
      currentPage = window.location.pathname.split("/").pop();

    if (
      currentPage === "index.html" ||
      localStorage.getItem("usernameIndex") === null
    ) {
      menu.style.display = "none";
      if (hamburgerWrapper) {
        hamburgerWrapper.style.display = "none";
      }
    }

    const homeLink = headerEl.querySelector("#home-link");
    if (localStorage.getItem("usernameIndex") === null) {
      homeLink.href = "/html/index.html";
    } else {
      homeLink.href = "/html/homepage.html";
    }

    links.forEach((link) => {
      if (link.href === window.location.href) {
        link.classList.add("active");
      }
    });

    button.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        menu.classList.toggle("open");
      }
    });

    const logoutBtn = document.querySelector("#logoutbtn");

    logoutBtn.addEventListener("click", (e) => {
      localStorage.removeItem("usernameIndex");
      localStorage.removeItem("token");
      window.location.href = "/html/index.html";
    });
  }
}

header();
