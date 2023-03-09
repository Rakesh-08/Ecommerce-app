let BASE_URL = "https://relevel-ecomm-be.herokuapp.com/ecomm/api/v1";

const logoutBtn = document.getElementById("logoutBtn");
const userIntro = document.getElementById("userIntro");

// event listeners

logoutBtn.addEventListener("click", logOut);

function logOut() {
  let confirmation = confirm("Are you sure");

  if (confirmation) {
    localStorage.removeItem("username");
    window.location = "login.html";
  }
}

if (!localStorage.getItem("username")) {
  window.location.href = "login.html";
} else {
  userIntro.innerText = `Hi ${localStorage.getItem("username")}`;
}
