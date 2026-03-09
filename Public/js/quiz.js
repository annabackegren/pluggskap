const urlParamsId = new URLSearchParams(window.location.search),
  provinceId = urlParamsId.get("id");

const provinceHeaderName = document.querySelector(".quiz-header h1"),
  questionCounter = document.querySelector("#question-counter"),
  questionText = document.querySelector("#question-text"),
  questionAnswer = document.querySelector("#question-answers"),
  nextButton = document.querySelector("#next-button"),
  restartButton = document.querySelector("#restart-button"),
  backButton = document.querySelector("#back-province-button"),
  endButtons = document.querySelector("#quiz-end-buttons");

let questions = [],
  currentIndex = 0,
  score = 0,
  userId = null,
  provinceName = "";

// ------------- HELPERS -------------

function shuffleArray(array) {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

function quizFeedback(score, total, province) {
  const percent = (score / total) * 100;

  if (percent === 100) return `Du är en expert på ${province}!`;
  if (percent >= 80) return `Du kan nästan allt om ${province}!`;
  if (percent >= 60) return `Du har bra koll på ${province}!`;
  if (percent >= 40)
    return `Läs på lite mer om ${province} så sitter det snart!`;
  return `Gå tillbaka till ${province} och försök igen!`;
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

async function getUser() {
  let username = JSON.parse(localStorage.getItem("usernameIndex"));

  const userurl = `/user/${username}`;
  try {
    const response = await fetch(userurl);
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const user = await response.json();
    console.log("userId är: ", user.userId);
    return user.userId;
  } catch (error) {
    console.error(`Error fetching userId: `, error);
  }
}

async function getProvince(provinceId) {
  try {
    const response = await fetch(`/province/${provinceId}`);

    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(`Error fetching province with id ${provinceId}`, error);
  }
}

async function getQuestions(provinceId) {
  try {
    const response = await fetch(`/quiz/${provinceId}`);

    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    console.log("Alla frågor från backend: ", data);

    questions = shuffleArray(data).slice(0, 5);
    currentIndex = 0;

    renderCurrentQuestion();
  } catch (error) {
    console.error(`Error fetching question with id for ${provinceId}`, error);
  }
}

async function saveResult() {
  try {
    await fetch("/result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resultScore: score,
        resultUserId: userId,
        resultProvinceId: provinceId,
      }),
    });
  } catch (error) {
    console.error("Kunde inte spara resultatet:", error);
  }
}

// ------------- QUIZ -------------

function renderProvince(province) {
  provinceName = province.name;
  provinceHeaderName.textContent = `Quiz för ${provinceName}`;
}

function renderCurrentQuestion() {
  if (currentIndex >= questions.length) {
    quizEnd();
    return;
  }

  const question = questions[currentIndex];

  questionCounter.textContent = `Fråga ${currentIndex + 1} / ${questions.length}`;
  questionText.textContent = question.questionText;

  nextButton.style.display = "block";
  nextButton.disabled = true;
  endButtons.style.display = "none";

  renderAnswers(question);
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

function quizEnd() {
  const feedback = quizFeedback(score, questions.length, provinceName);
  questionText.textContent = `Du fick ${score}/${questions.length} rätt!`;
  questionAnswer.innerHTML = `<p class="quiz-feedback">${feedback}</p>`;

  nextButton.style.display = "none";
  endButtons.style.display = "flex";

  saveResult();

  return;
}

// ------------- INIT QUIZFUNCTIONS -------------

async function loadUser() {
  userId = await getUser();
}

async function loadProvince() {
  const provinceData = await getProvince(provinceId);

  if (provinceData) {
    renderProvince(provinceData);
  }
}

function buttonEvents() {
  nextButton.addEventListener("click", () => {
    currentIndex++;
    renderCurrentQuestion();
  });

  restartButton.addEventListener("click", async () => {
    questions = shuffleArray(questions).slice(0, 5);
    currentIndex = 0;
    score = 0;
    renderCurrentQuestion();
  });

  backButton.addEventListener("click", async () => {
    window.location.href = "/map.html";
  });
}

// ------------- INIT QUIZ -------------

async function initQuiz() {
  if (!provinceId) return;

  await loadUser();
  await loadProvince();
  await getQuestions(provinceId);
  buttonEvents();
}

initQuiz();
