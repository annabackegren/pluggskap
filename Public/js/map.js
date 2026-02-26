document.addEventListener("DOMContentLoaded", function () {
  const feedbackInfoMessage = document.querySelector("#feedback-info-message");
  const feedbackMessage = document.querySelector("#feedback-message");

  if (!feedbackMessage || feedbackMessage.children.length === 0) {
    feedbackInfoMessage.classList.remove("hidden");
  } else {
    feedbackInfoMessage.classList.add("hidden");
  }
});
