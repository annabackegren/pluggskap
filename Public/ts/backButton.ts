const backBtn = document.querySelector<HTMLButtonElement>("#back-button");

if (backBtn) {
  backBtn.addEventListener("click", function (): void {
    if (window.location.pathname.includes("quiz.html")) {
      window.location.href = "../HTML/map.html";
    } else {
      window.history.back();
    }
  });
}
