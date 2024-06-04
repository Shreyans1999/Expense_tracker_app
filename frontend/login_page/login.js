const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', function (event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const login = { email, password };

  axios.post('http://localhost:3000/login-user', login)
    .then(response => {
      // Display success message
      alert(response.data.message);
      // Redirect to main screen
      window.location.href = "../main_screen/main.html";
    })
    .catch(err => {
      // Display error message
      alert(err.response.data.message);
    });
});
