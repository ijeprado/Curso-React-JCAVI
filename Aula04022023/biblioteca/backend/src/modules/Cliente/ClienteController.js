const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function create(req, res) {
    const cliente = await prisma.cliente.create({
        data: req.body
    })
    res.json(cliente)
}

async function get(req, res) {
    res.json(await prisma.cliente.findMany(
        {
            orderBy: [{
                nome: 'asc'
            }]
        }
    ))
}

async function findByCpf(req, res) {
    res.json(await prisma.cliente.findFirst(
        {
            where: {
                cpf: req.params.cpf
            }
        }
    ))
}

async function update(req, res) {
    const cliente = await prisma.cliente.findUnique({
        where: {
            id: parseInt(req.body.id)
        }
    })
    cliente.cpf = req.body.cpf
    cliente.nome = req.body.nome
    clienteUpdate = await prisma.cliente.update({
        data: cliente,
        where: {
            id: cliente.id
        }
    })
    res.json(cliente)
}

async function remove(req, res) {
    let { id } = req.params
    await prisma.cliente.delete({
       where: {
          id: parseInt(id)
       } 
    }).then(() => {
        res.json('Cliente excluído')
    }).catch(() => {
        res.status(500).json("Cliente já associado a aluguel")
    })
}

module.exports = {create, update, get, remove, findByCpf} 