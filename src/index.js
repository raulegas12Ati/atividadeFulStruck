import express, { response } from "express"
import cors from "cors"
import mysql from "mysql2"

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())

app.get("/", (request, response) => {
    const selectCommand = `
      SELECT name, email, age, nickname
      FROM raulegas_02ta
    `

    database.query(selectCommand, (error, users) => {
        if (error) {
            console.log(error)
            return
        }

        console.log(users)

        response.json(users)
    })
})

app.post("/cadastrar", (request, response) => {
    const { name, email, age, nickname, password } = request.body.users
    //Cadastrar usuario no backend
    const insertCommand = `
    INSERT INTO raulegas_02ta(name, email, age, nickname, password)
    VALUES (?, ?, ?, ?, ?)
    `

    database.query(insertCommand, [name, email, age, nickname, password], (error) => {
        if (error) {
            console.log(error)
            return
        }

        response.status(201).json({ message: "Usuario cadastrado com sucesso!" })
    })


})

//rota para o login
app.post("/login", (request, response) => {
    const { email, password } = request.body.users
    //Selecionar no banco de dados o usuario que tenha o email compativel
    const selectCommand = "SELECT * FROM raulegas_02ta WHERE email = ?"

    database.query(selectCommand, [email], (error, user) => {
        if (error) {
            console.log(error)
            return
        }

        //user = array [{}]
        //Tamanho do array = arrey.length
        //Verificar se o usuario existe e se a senha esta incorreta
        if (user.length === 0 || user[0].password !== password) {
            response.json({ message: "Usuário ou senha incorretos!" })
            return
        }

        response.json({
            id: user[0].id,
            name: user[0].name
        })
    })
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}!`)
})

const database = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    connectionLimit: 10
})