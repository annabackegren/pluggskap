if (localStorage.getItem("usernameIndex") === null) {
  window.location.href = "/html/index.html";
}

const mapbtn = document.querySelector("#mapbtn");
const mypagebtn = document.querySelector("#mypagebtn");
const quizbtn = document.querySelector("#quizbtn");

mapbtn.addEventListener("click", () => {
  window.location.href = "map.html";
});

mypagebtn.addEventListener("click", () => {
  window.location.href = "profilepage.html";
});

quizbtn.addEventListener("click", () => {
  window.location.href = `quiz.html?id=swe`;
});
