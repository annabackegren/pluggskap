async function loadStudents() {
  const response = await fetch("http://localhost:3000/user");
  const users = await response.json();
  const studentSelect = document.getElementById("studentId");

  users.forEach((user) => {
    const option = document.createElement("option");
    option.value = user.userId;
    option.textContent = user.userName;
    studentSelect.appendChild(option);
  });
}

async function loadProvinces() {
  const response = await fetch("http://localhost:3000/province");
  const provinces = await response.json();
  const provinceSelect = document.getElementById("provinceId");

  provinces.foreach((province) => {
    const option = document.createElement("option");
    option.value = province.provinceId;
    option.textContent = province.provinceName;
    provinceSelect.appendChild(option);
  });
}
loadStudents();
loadProvinces();

const form = document.getElementById("feedbackForm");
const studentId = document.getElementById("studentId");
const provinceId = document.getElementById("provinceId");
const feedbackMessage = document.getElementById("feedbackMessage");
const message = document.getElementById("message");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const data = {
    feedbackMessage: feedbackMessage.value,
    feedbackTeacherId: 1,
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
