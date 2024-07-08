const SubmitBtn = document.getElementById("submit");
SubmitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const login = {
    email: email,
    password: password,
  };

  axios.post(`https://localhost:3000/login-user/${login.email}`, login)
    .then((response) => {
      console.log(response.data.token);
      localStorage.setItem("token", response.data.token);
      window.location.href = "../main_screen/main.html";
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(login.email);
  console.log(login.password);
});

const forgetBTN = document.getElementById("forgot-password");
forgetBTN.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("test");
  window.location.href = './forget -pass/forget.html'
});
