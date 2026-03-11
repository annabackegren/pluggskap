if (localStorage.getItem("usernameIndex") === null) {
  window.location.href = "http://localhost:3000/html/index.html";
}

const mapbtn = document.querySelector("#mapbtn");
const mypagebtn = document.querySelector("#mypagebtn");

mapbtn.addEventListener("click", () => {
  window.location.href = "map.html";
});

mypagebtn.addEventListener("click", () => {
  window.location.href = "profilepage.html";
});
