function toggleMenu(menuId) {
  const meny = document.getElementById(menuId);
  if (meny.style.display === "none") {
    meny.style.display = "block";
  } else {
    meny.style.display = "none";
  }
}

const button = document.getElementById("hamburger");
button.addEventListener("click", () => {
  toggleMenu("menulist");
});

let showUsername = JSON.parse(localStorage.getItem("usernameIndex"));
const user = document.getElementById("username");

user.textContent = showUsername || "Förnamn Efternamn";
