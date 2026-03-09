const mapbtn = document.querySelector("#mapbtn");
const mypagebtn = document.querySelector("#mypagebtn");

mapbtn.addEventListener("click", () => {
  window.location.href = "map.html";
});

mypagebtn.addEventListener("click", () => {
  window.location.href = "profilepage.html";
});
