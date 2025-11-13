import express from "express"
import cors from "cors"
import mysql from "mysql2"
import { persons } from "./persons.js"

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())

app.get("/", (request, response) => {
    response.json(persons)
})

app.post("/cadastrar", (request, response) => {
    const { name, email, age, nickname, password } = request.body.user
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