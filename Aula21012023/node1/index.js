const express = require('express')
const server = express()
server.use(express.json())

const cursos = ["Front End React", "BD", "Java"]

server.get('/cursos', (req, res) => {
    return res.json(cursos)
})

server.get('/cursos/:index', (req, res) => {
    const {index} = req.params
    if (index >= cursos.length) {
        return res.json("Índice inválido")
    }
    else {
        return res.json(cursos[index])
    }
})

server.post('/cursos', (req, res) => {
    const {nome} = req.body
    if (cursos.indexOf(nome) != -1) {
        return res.json("Nome já existe")
    }
    else {
        cursos.push(nome)
        return res.json(cursos)
    }
})

server.put('/cursos/:index', (req, res) => {
    const {index} = req.params
    if (index >= cursos.length) {
        return res.json("Índice inválido")
    }
    else if (cursos.indexOf(nome) != -1) {
        return res.json("Nome já existe")
    }
    else {
        const {nome} = req.body
        cursos[index] = nome
        return res.json(cursos)
    }
})

server.delete('/cursos/:index', (req, res) => {
    const {index} = req.params
    if (index >= cursos.length) {
        return res.json("Índice inválido")
    }
    else {
        cursos.splice(index, 1)
        return res.json(cursos)
    }
})

const porta = 3001

server.listen(porta, () => {
    console.log(`Rodando na porta ${porta}`)
})