async function receiveData() {
    const users = await fetch("http://localhost:3333").then(response => response.json())

    users.map(users => {
        document.querySelector("main").innerHTML += `
        <section>
            <h2>Nome: ${users.name}</h2>
            <p>E-mail: ${users.email}</p>
            <p>Idade: ${users.age}</p>
            <p>Apelido: ${users.nickname}</p>
        </section>
        `
    })
}

receiveData()