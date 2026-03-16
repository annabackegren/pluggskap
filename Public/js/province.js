const urlParamsId = new URLSearchParams(window.location.search);
const provinceId = urlParamsId.get("id");

const provinceHeaderName = document.querySelector(".province-header h1"),
  provinceHeaderCoatOfArms = document.querySelector(".province-header img"),
  animalCard = document.querySelector('[data-type="animal"]'),
  animalImg = animalCard.querySelector("img"),
  animalName = animalCard.querySelector("p"),
  plantCard = document.querySelector('[data-type="plant"]'),
  plantImg = plantCard.querySelector("img"),
  plantName = plantCard.querySelector("p"),
  birdCard = document.querySelector('[data-type="bird"]'),
  birdImg = birdCard.querySelector("img"),
  birdName = birdCard.querySelector("p"),
  foodCard = document.querySelector('[data-type="food"]'),
  foodImg = foodCard.querySelector("img"),
  foodName = foodCard.querySelector("p");

const feedbackInfoMessage = document.querySelector("#feedback-info-message");
const feedbackMessage = document.querySelector("#feedback-message");

if (!feedbackMessage || feedbackMessage.children.length === 0) {
  feedbackInfoMessage.classList.remove("hidden");
} else {
  feedbackInfoMessage.classList.add("hidden");
}

let provinceData = null;

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
    console.error(`Error fetching province`, error);
  }
}

async function getMyFeedbackProvince(provinceId) {
  let username = JSON.parse(localStorage.getItem("usernameIndex"));

  try {
    const response = await fetch(
      `/feedback/${username}/province/${provinceId}`,
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const feedbackData = await response.json();
    return feedbackData;
  } catch (error) {
    console.error(`Error fetching feedback`, error);
  }
}

function renderFeedback(feedbackData) {
  if (!feedbackData || feedbackData.length === 0) {
    feedbackInfoMessage.classList.remove("hidden");
    return;
  } else {
    feedbackInfoMessage.classList.add("hidden");
  }
  feedbackMessage.innerHTML = "";

  feedbackData.forEach((message) => {
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

async function initFeedback() {
  const feedbackData = await getMyFeedbackProvince(provinceId);
  console.log("Feedback data: ", feedbackData);
  renderFeedback(feedbackData);
  return;
}

initFeedback();

function renderProvince(province) {
  provinceHeaderName.textContent = province.name;
  provinceHeaderCoatOfArms.src = province.coatOfArms;

  animalImg.src = province.animal.image;
  animalName.textContent = province.animal.name;

  plantImg.src = province.plant.image;
  plantName.textContent = province.plant.name;

  birdImg.src = province.bird.image;
  birdName.textContent = province.bird.name;

  foodImg.src = province.food.image;
  foodName.textContent = province.food.name;
}

document.addEventListener("DOMContentLoaded", async () => {
  if (provinceId) {
    provinceData = await getProvince(provinceId);
    if (provinceData) renderProvince(provinceData);
  }

  const popup = document.querySelector("#popup");
  const popupContent = popup.querySelector(".popup-content");
  const cards = document.querySelectorAll(".card-button");

  cards.forEach((card) => {
    card.addEventListener("click", async () => {
      const type = card.dataset.type;
      popup.style.display = "flex";
      document.body.style.overflow = "hidden";
      let data;

      switch (type) {
        case "animal":
          data = provinceData.animal;
          break;
        case "plant":
          data = provinceData.plant;
          break;
        case "bird":
          data = provinceData.bird;
          break;
        case "food":
          data = provinceData.food;
          break;
        default:
          return;
      }

      popupContent.innerHTML = `
        <span class="close">X</span>
          <div class="popup-header">
            <figure><img src="${data.image}" alt="Province ${type}"/></figure>
            <h3>${data.name}</h3>
          </div>
          
          <dl>
            ${
              type === "animal"
                ? `
            <dt>Vikt:</dt>
            <dd>${data.weight}</dd>
            <dt>Höjd:</dt>
            <dd>${data.height}</dd>
            <dt>Äter:</dt>
            <dd>${data.food}</dd>
            `
                : ""
            } ${
              type === "bird"
                ? `
            <dt>Vikt:</dt>
            <dd>${data.weight}</dd>
            <dt>Vingspann:</dt>
            <dd>${data.wingspan}</dd>
            <dt>Äter:</dt>
            <dd>${data.food}</dd>
            <dt>Stannfågel/Flyttfågel:</dt>
            <dd>${data.stay === true ? "Stannfågel" : "Flyttfågel"}</dd>
            `
                : ""
            } ${
              type === "plant"
                ? `
            <dt>Typ av växt:</dt>
            <dd>${data.type}</dd>
            <dt>Säsong:</dt>
            <dd>${data.season}</dd>
            <dt>Fridlyst:</dt>
            <dd>${data.protected === true ? "Ja" : "Nej"}</dd>
            `
                : ""
            } ${
              type === "food"
                ? `
            <dt>Beskrivning:</dt>
            <dd>${data.description}</dd>
            <dt>Recept:</dt>
            <dd>
              <a href="${data.recipeLink}" target="_blank" rel="noopener noreferrer">
              Lämna sidan för att se receptet >>
              </a>
            </dd>
            `
                : ""
            }
          </dl>

      `;
    });
  });

  // STÄNGA POPUP

  function closePopup() {
    popup.style.display = "none";
    document.body.style.overflow = "";
  }

  popupContent.addEventListener("click", (e) => {
    if (e.target.classList.contains("close")) closePopup();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePopup();
    }
  });

  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      closePopup();
    }
  });

  const quizButton = document.querySelector(".quiz-button");
  if (provinceId) {
    quizButton.href = `quiz.html?id=${encodeURIComponent(provinceId)}`;
  }
});
