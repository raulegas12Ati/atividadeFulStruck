const button = document.querySelector("button")
button.onclick = (event) => {
    event.preventDefault()
    signUpEagle()
}
async function signUpEagle() {
    const name = document.querySelector("#name").value
    const email = document.querySelector("#email").value
    const age = document.querySelector("#age").value
    const nickname = document.querySelector("#nickname").value
    const password = document.querySelector("#password").value



    if (name === "" || email === "" || age === "" || nickname === "" || password === "") {
        alert("Preencha TODAS as informações!")
        return
    }

    const users = {
        name,
        email,
        age,
        nickname,
        password
    }

    console.log(users)

    //enviar o user para o backend
    const response = await fetch("http://localhost:3333/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ users })
    }).then(response => response.json())

    const { message } = response

    alert(message)

    window.location.href = "../../front.html"
}