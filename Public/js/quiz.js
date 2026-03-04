const urlParamsId = new URLSearchParams(window.location.search);
const provinceId = urlParamsId.get("id");
const provinceHeaderName = document.querySelector(".province-header h1");

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
  provinceHeaderName.textContent = `Quiz för ${province.name}`;
}

document.addEventListener("DOMContentLoaded", async () => {
  if (!provinceId) return;

  const provinceData = await getProvince(provinceId);

  if (provinceData) {
    renderProvince(provinceData);
  }
});
