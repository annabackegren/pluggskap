fetch("../HTML/backButton.html")
    .then(function (response) { return response.text(); })
    .then(function (html) {
    document.body.insertAdjacentHTML("beforeend", html);
    var backBtn = document.querySelector("#back-button");
    if (backBtn) {
        backBtn.addEventListener("click", function () {
            if (window.location.pathname.includes("province.html")) {
                window.location.href = "../HTML/map.html";
            }
            else {
                window.history.back();
            }
        });
    }
});
