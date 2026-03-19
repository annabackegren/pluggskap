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
  console.log(provinces);
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
const feedbackMessage = document.getElementById("feedbackMessage");
const message = document.getElementById("message");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  let teacherId = await getUser();

  const data = {
    feedbackMessage: feedbackMessage.value,
    feedbackTeacherId: teacherId,
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
