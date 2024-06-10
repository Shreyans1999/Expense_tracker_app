const BTN = document.getElementById("submit");
BTN.addEventListener('click', function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const user = {
        email: email 
    };
    axios.post('http://localhost:3000/forget-password', user)
        .then((response) => {
            console.log(response);
            alert("Email sent successfully");
        })
        .catch((err) => {
            console.log(err);
        });
});
