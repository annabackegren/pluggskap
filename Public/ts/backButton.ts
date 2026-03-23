fetch("../HTML/backButton.html")
  .then((response) => response.text())
  .then((html) => {
    document.body.insertAdjacentHTML("beforeend", html);

    const backBtn = document.querySelector<HTMLButtonElement>("#back-button");
    if (backBtn) {
      backBtn.addEventListener("click", function (): void {
        if (window.location.pathname.includes("province.html")) {
          window.location.href = "../HTML/map.html";
        } else {
          window.history.back();
        }
      });
    }
  });
