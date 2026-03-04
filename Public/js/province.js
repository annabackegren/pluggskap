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
    console.error(`Error fetching province with id ${provinceId}`, error);
  }
}

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
            <dt>Låter:</dt>
            <dd>
              <a href="${data.sound}" target="_blank" rel="noopener noreferrer">
              Lyssna
              </a>
            </dd>
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
  popupContent.addEventListener("click", (e) => {
    if (e.target.classList.contains("close")) {
      popup.style.display = "none";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") popup.style.display = "none";
  });

  popup.addEventListener("click", (e) => {
    if (e.target === popup) popup.style.display = "none";
  });

  const quizButton = document.querySelector(".quiz-button");
  if (provinceId) {
    quizButton.href = `quiz.html?id=${encodeURIComponent(provinceId)}`;
  }
});
