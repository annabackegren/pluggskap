const url = "http://localhost:3000/user/login";

const form = document.querySelector("#loginform");
const loginError = document.querySelector("#loginerror");

loginError.style.display = "none";

function clearInputs() {
  const username = document.querySelector("#username");
  const password = document.querySelector("#password");

  username.value = "";
  password.value = "";
}

clearInputs();

async function loginReq() {
  try {
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
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
      let showUsername = localStorage.getItem("usernameIndex");
      localStorage.setItem("token", JSON.stringify(loginMsg.token));
      let showToken = localStorage.getItem("token");
      console.log(showToken);
      console.log(showUsername);
      window.location.href = "http://localhost:3000/html/homepage.html";
    } else {
      console.log("fel");
      loginError.style.display = "block";
    }
  } catch (err) {
    console.error(err);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  loginReq();
});
