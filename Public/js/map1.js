// const urlParamsId = new URLSearchParams(window.location.search);

const feedbackInfoMessage = document.querySelector("#feedback-info-message");
const feedbackMessage = document.querySelector("#feedback-message");

if (!feedbackMessage || feedbackMessage.children.length === 0) {
  feedbackInfoMessage.classList.remove("hidden");
} else {
  feedbackInfoMessage.classList.add("hidden");
}

async function getMyFeedback() {
  let username = JSON.parse(localStorage.getItem("usernameIndex"));

  try {
    const response = await fetch(`/feedback/${username}`);

    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(`Error fetching feedback`, error);
  }
}

function renderFeedback(feedback) {
  if (!feedback || feedback.length === 0) {
    feedbackInfoMessage.classList.remove("hidden");
    return;
  } else {
    feedbackInfoMessage.classList.add("hidden");
  }
  feedbackMessage.innerHTML = "";

  feedback.forEach((message) => {
    const li = document.createElement("li");

    const h3 = document.createElement("h3");
    h3.textContent = message.provinceName;

    const pMessage = document.createElement("p");
    pMessage.textContent = message.feedbackMessage;
    const spanTeacherName = document.createElement("span");
    spanTeacherName.textContent = ` -${message.teacherName}`;

    li.appendChild(h3);
    li.appendChild(pMessage);
    pMessage.appendChild(spanTeacherName);

    feedbackMessage.appendChild(li);
  });
}

async function init() {
  const feedback = await getMyFeedback();
  console.log("Feedback: ", feedback);
  renderFeedback(feedback);
}

init();
