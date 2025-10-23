const button = document.querySelector("button")
button.addEventListener("click", receiveData)

async function receiveData() {
    const persons = await fetch("http://localhost:3333").then(response => response.json())

    persons.map(persons => {
        document.querySelector("main").innerHTML += `
        <section>
            <h2>Nome: ${persons.name}</h2>
            <p>E-mail: ${persons.email}</p>
            <p>Idade: ${persons.age}</p>
            <p>Apelido: ${persons.nickname}</p>
        </section>
        `
    })
}