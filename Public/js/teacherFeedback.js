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
