const backBtn = document.querySelector<HTMLButtonElement>("#back-button");

if (backBtn) {
  backBtn.addEventListener("click", function (): void {
    window.history.back();
  });
}
