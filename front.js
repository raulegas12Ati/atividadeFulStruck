function init() {
    const menu = document.querySelector("nav ul")

    //Recupera o user do SectionStore e convert para objeto
    const user = JSON.parse(sessionStorage.getItem("user"))

    //Verificar se existe um usuario para que o menu seja alterado
    if(user){
        menu.innerHTML +=`
        <li>
            <a href="./pages/usuarios/usuarios.html">Usuários</a>
        </li>
        <li>
            <h2>Usuário: ${user.name}</h2>
        </li>
        <li>
            <button id="logout">Sair</button>
        </li>
        `

        const logoutButton = document.querySelector("#logout")
        logoutButton.addEventListener("click", logout)

        return
    }

    //Se o usuário não estver logado
    menu.innerHTML += `   
    <li>
        <a href="./pages/login/login.html">Login</a>
    </li>
    `
}

init()

function logout(){
    //remove o user do sessionStorage
    sessionStorage.removeItem("user")
    alert("Você saiu, mas não se preocupe: você pode voltar outras vezes! Tchau... Que a porta bate onde o sol não bate")
    window.location.reload()
}