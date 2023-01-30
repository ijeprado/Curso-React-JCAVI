const express = require('express')
const cors = require('cors')

const server = express()

server.use(express.json())
server.use(cors())

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

function consultaChamado(numero) {
    return prisma.chamado.findUnique({
        where: {
            numero
        }
    })
}

server.get('/chamados', async (req, res) => {
    const chamados = await prisma.chamado.findMany()
    return res.json(chamados)
})

server.get('/chamado/:numero', async (req, res) => {
    const chamado = await consultaChamado(req.params.numero)
    return chamado ? res.json(chamado) : res.status(400).json('Chamado não encontrado')
})

server.post('/chamado', async (req, res) => {
    if (await consultaChamado(req.body.numero)) {
        res.status(400).json('Chamado já cadastrado')
    }
    else {
        const chamado = await prisma.chamado.create({
            data: req.body
        })
        return res.json(chamado)
    }
})

server.delete('/chamado/:numero', async(req, res) => {
    if (await consultaChamado(req.params.numero)) {
        await prisma.chamado.delete({
            where: {
                numero: req.params.numero 
            }
        })
        return res.json('Chamado excluído')
    }
    else {
        return res.status(500).json('Veículo não encontrado')
    }
})

server.put('/chamado', async(req, res) => {
    if (await consultaChamado(req.body.numero)) {
        const chamado = await prisma.chamado.update({
            data: req.body,
            where: {
                numero: req.body.numero 
            }
        })
        return res.json(chamado)
    }
    else {
        return res.status(500).json('Chamado não encontrado')
    } 
})

server.listen(3001, () => {
    console.log('Servidor SQLIte iniciado')
})