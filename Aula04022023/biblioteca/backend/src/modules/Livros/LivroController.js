const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function create(req, res) {
  const livro = await prisma.livro.create({
    data: req.body,
  })
  res.json(livro)
}

async function update(req, res) {
  const livro = await prisma.livro.findUnique({
    where: {
      id: parseInt(req.body.id),
    },
  })
  livro.autor = req.body.autor
  livro.titulo = req.body.titulo
  livro.valorDiaria = parseFloat(req.body.valorDiaria.replace(",", "."))
  livroUpdate = await prisma.livro.update({
    data: livro,
    where: {
      id: livro.id,
    }
  })
  res.json(livro)
}

async function remove(req, res) {
  let { id } = req.params
  await prisma.livro.delete({
    where: {
      id: parseInt(id),
    }
  }).then(() => {
    res.json("Livro excluído")
  }).catch (() => {
    res.status(500).json("Livro já associado a aluguel")
  })
}

async function getDisponiveis(req, res) {
  res.json(
    await prisma.livro.findMany({
      orderBy: [
        {
          titulo: "asc",
        }
      ],
      where: 
        {
          isAlugado: false
        }
    })
  )
}

async function get(req, res) {
  res.json(
    await prisma.livro.findMany({
      orderBy: [
        {
          titulo: "asc",
        },
      ]
    })
  )
}

module.exports = { create, update, remove, get, getDisponiveis }
