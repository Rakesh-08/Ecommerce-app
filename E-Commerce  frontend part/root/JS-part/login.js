// variables

const loginForm = getelement("loginForm");
const signupForm = getelement("signupForm");

const showLoginBtn = getelement("showLoginBtn");
const showSignupBtn = getelement("showSignupBtn");

const loginUsername = getelement("loginUsername");
const signupUsername = getelement("signupUsername");

const loginPassword = getelement("loginPassword");
const signupPassword = getelement("signupPassword");

const loginBtn = getelement("loginBtn");
const signupBtn = getelement("signupBtn");

const signupEmail = getelement("signupEmail");
const authErrMsg = getelement("authErrMsg");
const sucessErrMsg = getelement("sucessErrMsg");

const BASE_URL = "https://relevel-ecomm-be.herokuapp.com/ecomm/api/v1";
// Event listeners

showSignupBtn.addEventListener("click", showsignup);
showLoginBtn.addEventListener("click", showlogin);

loginBtn.addEventListener("click", loginFn);
signupBtn.addEventListener("click", signupFn);

// functions

function getelement(id) {
  return document.getElementById(id);
}

function createCart() {
  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("accessToken");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  fetch(BASE_URL + "/carts", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ userId }),
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("cartId", data.id);
      window.location.href = "index.html";
    })
    .catch((err) => console.log(err));
}

function showsignup() {
  signupForm.classList.remove("d-none");
  loginForm.classList.add("d-none");
  updateAuthSuccessMsg("");
  updateAuthErrMsg("");
}
function showlogin() {
  loginForm.classList.remove("d-none");
  signupForm.classList.add("d-none");
  updateAuthSuccessMsg("");
  updateAuthErrMsg("");
}

function signupFn() {
  if (signupUsername.value == "") {
    updateAuthErrMsg("username cannot be empty");
  } else if (signupPassword.value == "") {
    updateAuthErrMsg("Password should not be empty");
  } else {
    const userData = {
      username: signupUsername.value,
      password: signupPassword.value,
      email: signupEmail.value,
    };

    fetch(BASE_URL + "/auth/signup", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        signupUsername.value = "";
        signupPassword.value = "";
        signupEmail.value = "";

        updateAuthErrMsg(data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
function loginFn() {
  if (loginUsername.value == "") {
    updateAuthErrMsg("Username cannot be empty");
  } else if (loginPassword.value == "") {
    updateAuthErrMsg("Password should not be empty");
  } else {
    const userData = {
      username: loginUsername.value,
      password: loginPassword.value,
    };

    fetch(BASE_URL + "/auth/signin", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.accessToken) {
          localStorage.setItem("username", data.username);
          localStorage.setItem("id", data.id);
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("email", data.email);

          createCart();
        } else {
          loginUsername.value = "";
          loginPassword.value = "";
          updateAuthErrMsg(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
function updateAuthErrMsg(msg) {
  authErrMsg.innerText = msg;
}
function updateAuthSuccessMsg(msg) {
  sucessErrMsg.innerText = msg;
}
