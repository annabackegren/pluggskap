async function loadSvg() {
  const response = await fetch("../assets/svg/map.svg");
  const svgText = await response.text();
  document.querySelector("#svg-container").innerHTML = svgText;

  initSvgClick();
}

// Klick på path eller circle
function initSvgClick() {
  const container = document.querySelector("#svg-container");
  container.addEventListener("click", (event) => {
    const element = event.target.closest("path, circle");
    if (!element) return;

    console.log("Klickad:", element.id);

    // Om det är en circle -> hitta motsvarande path
    let targetPath;

    if (element.tagName === "circle") {
      targetPath = container.querySelector(`path[id="${element.id}"]`);
    } else {
      targetPath = element;
    }

    if (!targetPath) return;
    resetPaths();
    // targetPath.classList.add("active");

    const provinceName = targetPath.getAttribute("name");
    const provinceId = targetPath.id;

    const encodedName = encodeURIComponent(provinceName);
    const encodedId = encodeURIComponent(provinceId);

    window.location.href = `/html/province/${encodedName}?id=${encodedId}`;
  });
}

// Återställ alla paths till default
function resetPaths() {
  document
    .querySelectorAll("#svg-container path")
    .forEach((path) => path.classList.remove("active"));
}

document.addEventListener("DOMContentLoaded", loadSvg);
