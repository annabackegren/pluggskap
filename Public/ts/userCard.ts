async function user(): Promise<void> {
  const userEl = document.querySelector<HTMLElement>(".user-card");

  if (userEl) {
    const result = await fetch("../HTML/userCard.html");
    const user = await result.text();
    userEl.innerHTML = user;

    const showUserName: string | null = JSON.parse(
      localStorage.getItem("usernameIndex") ?? '""',
    );
    const usernameEl = document.getElementById("user-name");

    if (usernameEl) {
      usernameEl.textContent = showUserName || "Förnamn Efternamn";
    }
  }

  const userCardBox = document.querySelector<HTMLElement>("#user-card-box");
  const changeUserInfo =
    document.querySelector<HTMLElement>("#change-user-info");

  if (userCardBox && changeUserInfo) {
    userCardBox.appendChild(changeUserInfo);
  }
}

user();
