const urlParamsId = new URLSearchParams(window.location.search);
const provinceId = urlParamsId.get("id");

async function getProvince(provinceId) {
  try {
    const response = await fetch(`/quiz/${provinceId}`);

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
