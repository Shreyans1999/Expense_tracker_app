
const submitBtn=document.getElementById('submit');
submitBtn.addEventListener('click',function(event){
    event.preventDefault();
    const name=document.getElementById('name').value;
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;

    const RegisterUser={
        name:name,
        email:email,
        password:password
    }
    if(name&&email&&password){
        axios.post('https://localhost:3000/register-user',RegisterUser).then((response)=>{
        console.log(response)
        window.location.href="../login_page/login.html"
    }).catch(err=>console.log(err))
    }
    else{
        alert('Fill all detail')
    }
   
})