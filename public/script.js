const loginForm = document.querySelector("#loginForm");
const usernameInput = document.querySelector("#username");

async function submitHandler(e){
    e.preventDefault()
    console.log(usernameInput.value)
    try{
        await fetch(`/api/login?username=${usernameInput.value}`)
        console.log(usernameInput.value)
        nombreUsuario(usernameInput.value);
        window.location.href = "/";
    }catch(err){
        console.log(err);
    }

    
}

function nombreUsuario(texto){
    console.log("asd")
    document.querySelector("#bodyHtml").innerHTML = `<h1>Bienvenido ${texto}</h1>`
}

loginForm.addEventListener("submit", submitHandler); 