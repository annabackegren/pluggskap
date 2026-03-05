const resulturl = "http://localhost:3000/result";

async function getUser() {
  let username = JSON.parse(localStorage.getItem("usernameIndex"));

  const userurl = `http://localhost:3000/user/${username}`;
  try {
    const response = await fetch(userurl);
    const result = await response.json();
    return result.userId;
  } catch (err) {
    console.error(err);
  }
}

let resultUserId = getUser();

console.log(resultUserId);

// async function sendResult() {
//   try {
//     const response = await fetch(resulturl, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         resultScore: "",
//         resultUserId: "",
//         resultProvinceId: "",
//       }),
//     });
//     console.log(await response.json());
//   } catch (err) {
//     console.error(err);
//   }
// }
