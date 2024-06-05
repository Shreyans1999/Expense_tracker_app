const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const login = {
        email: email,
        password: password
    };
    
    axios.post('http://localhost:3000/login-user', login).then((response) => {
        localStorage.setItem('token', response.data.token);
        window.location.href = "../main_screen/main.html";
    }).catch(err => {
        console.log(err);
    });
});
