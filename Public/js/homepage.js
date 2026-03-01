let showUsername = JSON.parse(localStorage.getItem("usernameIndex"));
const user = document.getElementById("username");

user.textContent = showUsername || "Förnamn Efternamn";
