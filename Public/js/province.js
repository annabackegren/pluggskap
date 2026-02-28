document.addEventListener("DOMContentLoaded", () => {
  const popup = document.querySelector("#popup");
  const popupContent = popup.querySelector(".popup-content p");
  const closeBtn = popup.querySelector(".close");

  const cards = document.querySelectorAll(".card-button");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const type = card.dataset.type;
      popupContent.textContent = `Info om ${type}`;
      popup.style.display = "flex";
    });
  });

  // STÄNGA POPUP
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") popup.style.display = "none";
  });

  popup.addEventListener("click", (e) => {
    if (e.target === popup) popup.style.display = "none";
  });
});
