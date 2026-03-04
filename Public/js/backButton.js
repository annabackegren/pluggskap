fetch("../HTML/backButton.html")
  .then((response) => response.text())
  .then((html) => {
    console.log("Hämtade backbutton");
    document.body.insertAdjacentHTML("beforeend", html);

    const backBtn = document.getElementById("back-button");

    backBtn.addEventListener("click", function () {
      window.history.back();
    });
  });
