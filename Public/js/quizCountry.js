// const urlParamsId = new URLSearchParams(window.location.search),
//   provinceId = urlParamsId.get("id");

const provinceHeaderName = document.querySelector(".quiz-header h1"),
  questionCounter = document.querySelector("#question-counter"),
  chartContainer = document.querySelector(".chart-container"),
  questionText = document.querySelector("#question-text"),
  questionImg = document.querySelector("#question-img"),
  quizEndImg = document.querySelector("#quiz-end-img"),
  questionAnswer = document.querySelector("#question-answers"),
  nextButton = document.querySelector("#next-button"),
  feedbackText = document.querySelector("#quiz-feedback"),
  restartButton = document.querySelector("#restart-button"),
  backButton = document.querySelector("#back-province-button"),
  endButtons = document.querySelector("#quiz-end-buttons");

let questions = [],
  currentIndex = 0,
  score = 0;
//   userId = null,
//   provinceName = "";

// ------------- HELPERS -------------

function shuffleArray(array) {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

function quizFeedback(score, total) {
  // function quizFeedback(score, total, province) {
  const percent = (score / total) * 100;

  if (percent === 100)
    return `Bra jobbat! Du verkar vara en expert på Sverige!`;
  if (percent >= 80) return `Snyggt! Du kan ju nästan allt om Sverige!`;
  if (percent >= 60) return `Bra koll du verkar ha!`;
  if (percent >= 40)
    return `Läs på lite mer om Sveriges landskap så sitter det snart!`;
  return `Läs på lite mer om landskapen och försök sedan igen!`;
}

function createAnswerButton(answer) {
  const btn = document.createElement("button");
  btn.textContent = answer.text;
  btn.classList.add("button");

  btn.dataset.correct = answer.correct;

  btn.addEventListener("click", () => selectAnswer(btn, answer.correct));

  return btn;
}

// ------------- FETCH -------------

// async function getUser() {
//   let username = JSON.parse(localStorage.getItem("usernameIndex"));

//   const userurl = `/user/${username}`;
//   try {
//     const response = await fetch(userurl);
//     if (!response.ok) {
//       throw new Error("Something went wrong");
//     }

//     const user = await response.json();
//     console.log("userId är: ", user.userId);
//     return user.userId;
//   } catch (error) {
//     console.error(`Error fetching userId: `, error);
//   }
// }

// async function getProvince(provinceId) {
//   try {
//     const response = await fetch(`/province/${provinceId}`);

//     if (!response.ok) {
//       throw new Error("Something went wrong");
//     }
//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.error(`Error fetching province with id ${provinceId}`, error);
//   }
// }

async function getQuestions() {
  try {
    const response = await fetch(`/quiz/country`);

    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    console.log("Alla frågor från backend: ", data);

    questions = data;
    currentIndex = 0;

    renderCurrentQuestion();
  } catch (error) {
    console.error(`Error fetching questions`, error);
  }
}

// async function getQuestions(provinceId) {
//   try {
//     const response = await fetch(`/quiz/${provinceId}`);

//     if (!response.ok) {
//       throw new Error("Something went wrong");
//     }
//     const data = await response.json();
//     console.log("Alla frågor från backend: ", data);

//     questions = data;
//     currentIndex = 0;

//     renderCurrentQuestion();
//   } catch (error) {
//     console.error(`Error fetching question with id for ${provinceId}`, error);
//   }
// }

// async function saveResult() {
//   console.log(score, userId, provinceId);
//   try {
//     await fetch("/result", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         resultScore: score,
//         resultUserId: userId,
//         resultProvinceId: provinceId,
//       }),
//     });
//   } catch (error) {
//     console.error("Kunde inte spara resultatet:", error);
//   }
// }

// ------------- QUIZ -------------

// function renderProvince(province) {
//   provinceName = province.name;
//   provinceHeaderName.textContent = provinceName;
// }

function renderCurrentQuestion() {
  if (currentIndex >= questions.length) {
    quizEnd();
    return;
  }

  if (currentIndex === questions.length - 1) {
    changeButtonText();
  }

  const question = questions[currentIndex];

  questionCounter.textContent = `Fråga ${currentIndex + 1} / ${questions.length}`;
  questionText.textContent = question.questionText;

  questionImg.style.display = "block";
  questionImg.src = question.questionImg;

  quizEndImg.style.display = "none";
  questionCounter.style.display = "block";
  chartContainer.style.display = "block";
  questionAnswer.style.display = "grid";
  nextButton.style.display = "block";
  nextButton.disabled = true;
  feedbackText.style.display = "none";
  endButtons.style.display = "none";

  renderAnswers(question);

  updateChart(currentIndex + 1);
}

function renderAnswers(question) {
  const answers = [
    { text: question.questionAnswerC, correct: true },
    { text: question.questionAnswerW1, correct: false },
    { text: question.questionAnswerW2, correct: false },
    { text: question.questionAnswerW3, correct: false },
  ];

  const shuffledAnswers = shuffleArray(answers);

  questionAnswer.innerHTML = "";

  shuffledAnswers.forEach((answer) => {
    questionAnswer.appendChild(createAnswerButton(answer));
  });
}

function selectAnswer(button, correct) {
  const buttons = questionAnswer.querySelectorAll("button");

  buttons.forEach((btn) => {
    btn.disabled = true;

    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    }
  });

  if (correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }
  nextButton.disabled = false;
}

function changeButtonText() {
  nextButton.textContent = "Visa resultat >>";
}

function quizEnd() {
  const feedback = quizFeedback(score, questions.length);
  //   const feedback = quizFeedback(score, questions.length, provinceName);
  questionText.textContent = `Du fick ${score} av ${questions.length} rätt!`;
  feedbackText.style.display = "block";
  feedbackText.textContent = `${feedback}`;

  questionImg.style.display = "none";
  quizEndImg.style.display = "block";
  questionAnswer.style.display = "none";
  questionCounter.style.display = "none";
  chartContainer.style.display = "none";
  nextButton.style.display = "none";
  endButtons.style.display = "flex";

  //   saveResult();

  return;
}

// ------------- INIT QUIZFUNCTIONS -------------

// async function loadUser() {
//   userId = await getUser();
// }

// async function loadProvince() {
//   const provinceData = await getProvince(provinceId);

//   if (provinceData) {
//     renderProvince(provinceData);
//   }
// }

async function buttonEvents() {
  nextButton.addEventListener("click", () => {
    currentIndex++;
    renderCurrentQuestion();
  });

  restartButton.addEventListener("click", async () => {
    await getQuestions();
    currentIndex = 0;
    score = 0;

    nextButton.textContent = "Nästa fråga >>";
    renderCurrentQuestion();
  });

  //   const previousUrl = document.referrer;
  backButton.addEventListener("click", async () => {
    window.location.href = "index.html";
  });
}

// ------------- INIT QUIZ -------------

async function initQuiz() {
  //   if (!provinceId) return;

  //   await loadUser();
  //   await loadProvince();
  await getQuestions();
  //   await getQuestions(provinceId);
  buttonEvents();
}

initQuiz();
