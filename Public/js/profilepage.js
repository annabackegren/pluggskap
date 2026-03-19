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

  const userurl = `http://localhost:3000/user/${username}`;
  try {
    const response = await fetch(userurl);
    const result = await response.json();
    return result;
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
        userId: resultUserId.userId,
        userName: username.value,
        userPassword: password.value,
      }),
    });
    if ((await response.status) === 200) {
      userUpdated.style.display = "block";
      localStorage.setItem("usernameIndex", JSON.stringify(username.value));
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
    const response = await fetch(protectedurl + "/" + resultUserId.userId, {
      method: "DELETE",
      headers: { Authorization: authToken },
    });
    if ((await response.status) === 200) {
      window.location.href = "http://localhost:3000/html/index.html";
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

async function checkUserType() {
  const user = await getUser();

  if (user.userType === "elev") {
    async function loadResults() {
      let resultUserId = await getUser();

      try {
        const response = await fetch(
          "http://localhost:3000/result/" + resultUserId.userId,
        );
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
              "http://localhost:3000/province/" + result.resultProvinceId,
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
      <button class="show-more-btn" type="button">Läs mer>></button>
      </div>
      <div class="chart-container">
      <canvas id="${canvasId}"></canvas>
      </div>
      <div class="feedback-content" style="display: none;">
      <p>Kommentar från Lärare:</p>
      <p id="feedback-msg"></p>
      </div>
      `;
          resultsList.appendChild(resultItem);
          createResultChart(canvasId, result.resultScore);
          const btn = resultItem.querySelector(".show-more-btn");
          const feedback = resultItem.querySelector(".feedback-content");
          let feedbackMsg = resultItem.querySelector("#feedback-msg");

          const feedbackResponse = await fetch(
            `http://localhost:3000/feedback/${resultUserId.userName}/province/${result.resultProvinceId}`,
          );

          const feedbackData = await feedbackResponse.json();

          if (feedbackData.length === 0) {
            btn.style.display = "none";
          } else {
            feedbackMsg.textContent = feedbackData[0].feedbackMessage;
          }

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
  } else if (user.userType === "larare") {
    // Lärare

    const teacherElements = document.querySelectorAll(".teacherPage");
    teacherElements.forEach((el) => {
      el.style.display = "block";
    });

    async function loadStudents() {
      const response = await fetch("http://localhost:3000/user");
      const users = await response.json();
      const studentSelect = document.getElementById("studentId");

      users.forEach((user) => {
        if (user.userType === "elev") {
          const option = document.createElement("option");
          option.value = user.userId;
          option.textContent = user.userName;
          studentSelect.appendChild(option);
        }
      });
    }

    async function loadProvinces() {
      const response = await fetch("http://localhost:3000/province");
      const provinces = await response.json();
      const provinceSelect = document.getElementById("provinceId");

      provinces.forEach((province) => {
        const option = document.createElement("option");
        option.value = province.id;
        option.textContent = province.name;
        provinceSelect.appendChild(option);
      });
    }

    async function loadResults() {
      const studentSelect = document.getElementById("studentId");
      const provinceSelect = document.getElementById("provinceId");

      let studentId = studentSelect.value;
      let provinceId = provinceSelect.value;

      const resultsList = document.getElementById("results-list");
      resultsList.innerHTML = "";

      if (!studentId || !provinceId) return;

      try {
        const response = await fetch(
          `http://localhost:3000/result/${studentId}/${provinceId}`,
        );
        const results = await response.json();

        if (!results || results.length === 0) {
          resultsList.innerHTML = "<p>Inga resultat ännu</p>";
        }

        results.forEach(async (result, index) => {
          const resultItem = document.createElement("div");
          resultItem.className = "result-item";
          const canvasId = "chart-" + index;
          let provinceName = result.resultProvinceId;
          resultItem.innerHTML = "";
          try {
            const provinceResponse = await fetch(
              "http://localhost:3000/province/" + result.resultProvinceId,
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
      </div>
      <div class="chart-container">
      <canvas id="${canvasId}"></canvas>
      `;
          resultsList.appendChild(resultItem);
          createResultChart(canvasId, result.resultScore);
        });
      } catch (error) {
        console.error(error);
      }
    }

    loadStudents();
    loadProvinces();

    const studentSelect = document.getElementById("studentId");
    const provinceSelect = document.getElementById("provinceId");

    studentSelect.addEventListener("change", () => {
      loadResults();
    });

    provinceSelect.addEventListener("change", () => {
      loadResults();
    });

    const form = document.getElementById("feedbackForm");
    const studentId = document.getElementById("studentId");
    const provinceId = document.getElementById("provinceId");
    const feedbackReport = document.getElementById("feedbackReport");
    const message = document.getElementById("message");

    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      let teacherId = await getUser();

      const data = {
        feedbackMessage: feedbackReport.value,
        feedbackTeacherId: teacherId.userId,
        feedbackStudentId: studentId.value,
        feedbackProvinceId: provinceId.value,
      };

      try {
        const response = await fetch("http://localhost:3000/feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          message.textContent = "Feedback skickad!";
          form.reset();
        } else {
          message.textContent = "Något gick fel";
        }
      } catch (error) {
        console.error(error);
        message.textContent = "Kunde inte ansluta till servern";
      }
    });
  }
}

checkUserType();
