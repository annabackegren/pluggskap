const resulturl = "/result";
const protectedurl = "/protected";

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
const updateUserBtn = document.querySelector("#change-user-button");
const confirmDeleteBtn = document.querySelector("#confirm-delete-user");

userUpdated.style.display = "none";
changeOverlay.style.display = "none";

closeUserBtn.addEventListener("click", (e) => {
  e.preventDefault();
  changeOverlay.style.display = "none";
  username.value = "";
  password.value = "";
  updateUserBtn.disabled = true;
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
  username.value = "";
  password.value = "";
  updateUserBtn.disabled = true;
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

  const userurl = `/user/${username}`;
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
      window.location.href = "/html/index.html";
    }
  } catch (err) {
    console.error(err);
  }
}

updateUserBtn.disabled = true;

function checkUpdateForm() {
  if (
    username.value.length < 1 ||
    username.value.length > 10 ||
    password.value.length < 4
  ) {
    updateUserBtn.disabled = true;
  } else {
    updateUserBtn.disabled = false;
  }
}

username.addEventListener("keyup", () => {
  checkUpdateForm();
});

password.addEventListener("keyup", () => {
  checkUpdateForm();
});

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
    const response = await fetch("/result/" + resultUserId);
    const results = await response.json();
    const resultsList = document.getElementById("results-list");

    if (!results || results.length === 0) {
      resultsList.innerHTML = "<p>Inga resultat ännu</p>";
      return;
    }
    results.forEach(async (result, index) => {
      const resultItem = document.createElement("div");
      resultItem.className = "result-item";
      const canvasId = "chart-" + index;
      let provinceName = result.resultProvinceId;
      try {
        const provinceResponse = await fetch(
          "/province/" + result.resultProvinceId,
        );
        const provinceData = await provinceResponse.json();
        provinceName = provinceData.name;
      } catch (error) {
        console.error(error);
      }
      resultItem.innerHTML = `
      <div class="result-header">
      <span class="result-province"><strong>Landskap:</strong> ${provinceName}</span>
      <span class="result-score"> ${result.resultScore}/5</span>
      <button class="show-more-btn">Läs mer>></button>
      </div>
      <div class="chart-container">
      <canvas id="${canvasId}"></canvas>
      </div>
      <div class="feedback-content" style="display: none;">
      <p>Kommentar från Lärare:</p>
      <p>Ingen kommentar ännu</p>
      </div>
      `;
      resultsList.appendChild(resultItem);
      createResultChart(canvasId, result.resultScore);
      const btn = resultItem.querySelector(".show-more-btn");
      const feedback = resultItem.querySelector(".feedback-content");

      btn.addEventListener("click", function () {
        if (feedback.style.display === "none") {
          feedback.style.display = "block";
          btn.textContent = "Dölj>>";
        } else {
          feedback.style.display = "none";
          btn.textContent = "Läs mer >>";
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
}

loadResults();
