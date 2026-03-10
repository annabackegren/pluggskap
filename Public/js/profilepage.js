const resulturl = "http://localhost:3000/result";
const protectedurl = "http://localhost:3000/protected";

let authToken = JSON.parse(localStorage.getItem("token"));

const username = document.querySelector("#username");
const password = document.querySelector("#password");
const changeOverlay = document.querySelector("#user-info");
const changeBtn = document.querySelector("#change-user-info");
const page = document.querySelector("#user-info-box");
const deleteBtn = document.querySelector("#delete-user");
const deleteBox = document.querySelector("#confirm-delete-user-box");
const userUpdated = document.querySelector("#user-updated");
const closeUserBtn = document.querySelector("#close-user-box");
const closeDeleteBtn = document.querySelector("#close-delete-box");

userUpdated.style.display = "none";
changeOverlay.style.display = "none";

closeUserBtn.addEventListener("click", (e) => {
  e.preventDefault();
  changeOverlay.style.display = "none";
});

closeDeleteBtn.addEventListener("click", () => {
  deleteBox.style.display = "none";
});

changeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  changeOverlay.style.display = "block";
});

changeOverlay.addEventListener("click", (e) => {
  if (deleteBox.style.display === "block") {
    deleteBox.style.display = "none";
  }
  e.stopPropagation();
});

deleteBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  deleteBox.style.display = "block";
});

deleteBox.addEventListener("click", (e) => {
  e.stopPropagation();
});

document.addEventListener("click", () => {
  if (changeOverlay.style.display === "block") {
    changeOverlay.style.display = "none";
  }
  if (deleteBox.style.display === "block") {
    deleteBox.style.display = "none";
  }
});

function clearInputs() {
  const username = document.querySelector("#username");
  const password = document.querySelector("#password");

  username.value = "";
  password.value = "";
}

clearInputs();

async function getUser() {
  let username = JSON.parse(localStorage.getItem("usernameIndex"));

  const userurl = `http://localhost:3000/user/${username}`;
  try {
    const response = await fetch(userurl);
    const result = await response.json();
    return result.userId;
  } catch (err) {
    console.error(err);
  }
}

async function updateUser() {
  let resultUserId = await getUser();
  try {
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
    const response = await fetch(protectedurl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: JSON.stringify({
        userId: resultUserId,
        userName: username.value,
        userPassword: password.value,
      }),
    });
    console.log(await response.json());
    if ((await response.status) === 200) {
      userUpdated.style.display = "block";
      username.value = "";
      password.value = "";
    }
  } catch (err) {
    console.error(err);
  }
}

async function deleteUser() {
  let resultUserId = await getUser();
  try {
    const response = await fetch(protectedurl + "/" + resultUserId, {
      method: "DELETE",
      headers: { Authorization: authToken },
    });
    console.log(await response.json());
    if ((await response.status) === 200) {
      window.location.href = "http://localhost:3000/html/index.html";
    }
  } catch (err) {
    console.error(err);
  }
}

const updateUserBtn = document.querySelector("#change-user-button");
const confirmDeleteBtn = document.querySelector("#confirm-delete-user");

updateUserBtn.addEventListener("click", (e) => {
  e.preventDefault();
  updateUser();
});

confirmDeleteBtn.addEventListener("click", () => {
  deleteUser();
});

// här börjar mardrömmen  :)

async function loadResults() {
  let resultUserId = await getUser();

  try {
    const response = await fetch(
      "http://localhost:3000/result/" + resultUserId,
    );
    const results = await response.json();
    const resultsList = document.getElementById("results-list");

    if (!results || results.length === 0) {
      resultsList.innerHTML = "<p>Inga resultat ännu</p>";
      return;
    }
    results.forEach((result) => {
      const resultItem = document.createElement("div");
      resultItem.className = "result-item";
      resultItem.innerHTML = ` <div class= "result-header">
        <span class="result-province">Landskap: ${result.resultProvinceId}</span>
        <span class="result-score">${result.resultScore}/10</span>
      </div>
      <div class="result-bar">
      <div class="result-bar-fill" style="width: ${result.resultScore * 10}%"></div>
      </div>
      `;
      resultsList.appendChild(resultItem);
    });
  } catch (error) {
    console.error(error);
  }
}

loadResults();
