const mapbtn = document.querySelector("#mapbtn");
const mypagebtn = document.querySelector("#mypagebtn");

mapbtn.addEventListener("click", () => {
  window.location.href = "http://localhost:3000/html/map.html";
});

mypagebtn.addEventListener("click", () => {
  window.location.href = "http://localhost:3000/html/profilepage.html";
});
