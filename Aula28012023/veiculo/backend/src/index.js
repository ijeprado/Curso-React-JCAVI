const express = require('express')
const cors = require('cors')

const server = express()

server.use(express.json())

server.use(cors())

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

function consultaVeiculo(placa) {
    return prisma.veiculo.findUnique({
        where: {
            placa
        }
    })
}

server.get('/veiculos', async (req, res) => {
    const veiculos = await prisma.veiculo.findMany()
    return res.json(veiculos)
})

server.get('/veiculo/:placa', async (req, res) => {
    const veiculo = await consultaVeiculo(req.params.placa)
    return veiculo ? res.json(veiculo) : res.status(500).json('Veículo não encontrado')
})

server.post('/veiculo', async (req, res) => {
    if (await consultaVeiculo(req.body.placa)) {
        res.status(400).json('Veículo já cadastrado')
    }
    else {
        const veiculo = await prisma.veiculo.create({
            data: req.body
        })
        return res.json(veiculo)
    }
})

server.delete('/veiculo/:placa', async(req, res) => {
    if (await consultaVeiculo(req.params.placa)) {
        await prisma.veiculo.delete({
            where: {
                placa: req.params.placa 
            }
        })
        return res.json('Veículo excluído')
    }
    else {
        return res.status(500).json('Veículo não encontrado')
    }
})

server.put('/veiculo', async(req, res) => {
    if (await consultaVeiculo(req.body.placa)) {
        const veiculo = await prisma.veiculo.update({
            data: req.body,
            where: {
                placa: req.body.placa 
            }
        })
        return res.json(veiculo)
    }
    else {
        return res.status(500).json('Veículo não encontrado')
    } 
})

server.listen(3001, () => {
    console.log('Servidor SQLIte iniciado')
})