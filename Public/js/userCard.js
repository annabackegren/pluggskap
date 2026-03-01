async function user() {
  const userEl = document.querySelector(".user-card");

  if (userEl) {
    const result = await fetch("../HTML/userCard.html"),
      user = await result.text();
    userEl.innerHTML = user;
  }

  //   let showUsername = JSON.parse(localStorage.getItem("usernameIndex"));
  //   const user = document.getElementById("username");

  //   user.textContent = showUsername || "Förnamn Efternamn";
}
user();
