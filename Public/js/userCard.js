async function user() {
  const userEl = document.querySelector(".user-card");

  if (userEl) {
    const result = await fetch("../HTML/userCard.html"),
      user = await result.text();
    userEl.innerHTML = user;

    let showUsername = JSON.parse(localStorage.getItem("usernameIndex"));
    const usernameEl = document.getElementById("user-name");

    if (usernameEl)
      usernameEl.textContent = showUsername || "Förnamn Efternamn";

    try {
      const response = await fetch("/user/" + showUsername);
      const userData = await response.json();
      const profileImg = userEl.querySelector("img");

      if (profileImg && userData.userType === "larare") {
        profileImg.src = "../assets/img/misc/dancing.png";
      }
    } catch (error) {
      console.error(error);
    }
  }

  const userCardBox = document.querySelector("#user-card-box");
  const changeUserInfo = document.querySelector("#change-user-info");

  if (userCardBox && changeUserInfo) {
    userCardBox.appendChild(changeUserInfo);
  }
}
user();
