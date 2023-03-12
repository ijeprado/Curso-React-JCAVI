const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function get(req, res) {
    res.json(
        await prisma.categoria.findMany({
          include: {
            categoriaSuperior: {
              select: {
                classificacao: true,
                descricao: true
              }
            }
          },
          orderBy: [
                {
                    classificacao: "asc"
                }
            ]
        })
  )
}

async function put(req, res) {
  console.log(req.body)
  let { classificacao, descricao, id } = req.body
  const categoria = await prisma.categoria.update({
    data: { classificacao, descricao },
    where: {
      id: parseInt(id),
    },
  })
  return res.json(categoria)
}

async function remove(req, res) {
  let { id } = req.params
  await prisma.aluguel
    .delete({
      where: {
        id: parseInt(id),
      },
    })
    .then(() => {
      return res.json("Aluguel excluído")
    })
    .catch(() => {
      res.status(500).json("Erro ao tentar excluir aluguel")
    })
}

async function create(req, res) {
  let dados = {}
  if (req.body.categoriaSuperiorId === "") {
    dados = { classificacao: req.body.classificacao,
      descricao: req.body.descricao }
  }
  else {
    dados = { classificacao: req.body.classificacao,
      descricao: req.body.descricao, categoriaSuperiorId: parseInt(req.body.categoriaSuperiorId) }
  }
  const categoria = await prisma.categoria.create({
    data: dados
  })
  res.json(categoria)
}

module.exports = { create, get, put, remove }
