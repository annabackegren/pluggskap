const url = "http://localhost:3000/user/login";

interface Login {
  token: string;
  message: string;
}

const form = document.querySelector<HTMLFormElement>("#loginform");
const loginError = document.querySelector<HTMLSpanElement>("#loginerror");

if (loginError) loginError.style.display = "none";

function clearInputs() {
  const username = document.querySelector<HTMLInputElement>("#username");
  const password = document.querySelector<HTMLInputElement>("#password");

  if(username) username.value = "";
  if(password) password.value = "";
}

clearInputs();

async function loginReq() {
  try {

    const username = document.querySelector<HTMLInputElement>("#username");
    const password = document.querySelector<HTMLInputElement>("#password");

    if (!username || !password) return

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: username.value,
        userPassword: password.value,
      }),
    });
    const loginMsg = await response.json();
    if ((await response.status) === 200) {
      localStorage.setItem("usernameIndex", JSON.stringify(username.value));
      localStorage.setItem("token", JSON.stringify(loginMsg.token));
      window.location.href = "http://localhost:3000/html/homepage.html";
    } else {
      console.log("fel");
      if (loginError) loginError.style.display = "block";
    }
  } catch (err) {
    console.error(err);
  }
}

form?.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();
  loginReq();
});
