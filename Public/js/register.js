const url = "http://localhost:3000/user/";

const form = document.querySelector("#userinfo");
const submitbtn = document.querySelector("#submitbtn");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmpassword");
const gdprcheck = document.querySelector("#gdprcheck");
const passwordError = document.querySelector("#passworderror");
const cfpasswordError = document.querySelector("#cfpassworderror");
const userCreated = document.querySelector("#usercreated");
const loginBtn = document.querySelector("#loginbtn");
const larareBtn = document.querySelector("#lararebtn");
const elevBtn = document.querySelector("#elevbtn");
const usernameError = document.querySelector("#username-exists");

loginBtn.style.display = "none";
userCreated.style.display = "none";
cfpasswordError.style.display = "none";
passwordError.style.display = "none";
usernameError.style.display = "none";
submitbtn.disabled = true;

function clearInputs() {
  const larareBtn = document.querySelector("#lararebtn");
  const elevBtn = document.querySelector("#elevbtn");
  const gdprcheck = document.querySelector("#gdprcheck");
  const username = document.querySelector("#username");

  username.value = "";
  larareBtn.checked = false;
  elevBtn.checked = false;
  gdprcheck.checked = false;
}

clearInputs();

function checkForm() {
  if (
    password.value.length > 3 &&
    confirmPassword.value.length > 3 &&
    password.value === confirmPassword.value &&
    gdprcheck.checked === true &&
    (larareBtn.checked === true || elevBtn.checked === true)
  ) {
    submitbtn.disabled = false;
  } else {
    submitbtn.disabled = true;
  }
}

function errorForm() {
  if (password.value.length > 3) {
    passwordError.style.display = "none";
  } else {
    passwordError.style.display = "block";
  }
  if (confirmPassword.value === password.value || confirmPassword.value < 1) {
    cfpasswordError.style.display = "none";
  } else {
    cfpasswordError.style.display = "block";
  }
}

larareBtn.addEventListener("change", checkForm);
elevBtn.addEventListener("change", checkForm);

gdprcheck.addEventListener("change", checkForm);

password.addEventListener("keyup", () => {
  checkForm();
  errorForm();
});

confirmPassword.addEventListener("keyup", () => {
  checkForm();
  errorForm();
});

username.addEventListener("keyup", () => {
  username.classList.remove("username-error");
  usernameError.style.display = "none";
});

async function sendData() {
  try {
    const usertype = document.querySelector(".usertype:checked");
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
    const confirmPassword = document.querySelector("#confirmpassword");
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userType: usertype.value,
        userName: username.value,
        userPassword: confirmPassword.value,
      }),
    });
    console.log(await response.json());
    if ((await response.status) === 200) {
      form.style.display = "none";
      userCreated.style.display = "block";
      loginBtn.style.display = "block";
    } else {
      usernameError.style.display = "block";
      username.classList.add("username-error");
      window.scrollTo(0, 0);
    }
  } catch (err) {
    console.error(err);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendData();
});
