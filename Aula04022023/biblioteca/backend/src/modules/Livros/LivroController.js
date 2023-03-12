const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database("./prisma/dev.db")

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
  livro.categoriaId = req.body.categoriaId
  livroUpdate = await prisma.livro.update({
    data: livro,
    where: {
      id: livro.id,
    },
  })
  res.json(livro)
}

async function remove(req, res) {
  let { id } = req.params
  await prisma.livro
    .delete({
      where: {
        id: parseInt(id),
      },
    })
    .then(() => {
      res.json("Livro excluído")
    })
    .catch(() => {
      res.status(500).json("Livro já associado a aluguel")
    })
}

async function getDisponiveis(req, res) {
  res.json(
    await prisma.livro.findMany({
      orderBy: [
        {
          titulo: "asc",
        },
      ],
      where: {
        isAlugado: false,
      },
    })
  )
}

async function get(req, res) {
  res.json(
    await prisma.livro.findMany({
      include: {
        Categoria: {
          select: {
            descricao: true,
            classificacao: true,
          },
        },
      },
      orderBy: [
        {
          titulo: "asc",
        },
      ],
    })
  )
}

async function findByCategoria(req, res) {
  res.json(
    await prisma.livro.findMany({
      where: {
        categoriaId: parseInt(req.params.categoriaId)
      },
      include: {
        Categoria: {
          select: {
            descricao: true,
            classificacao: true,
          },
        },
      },
      orderBy: [
        {
          titulo: "asc",
        },
      ],
    })
  )
}

async function findByCategoriaSQL(req, res) {
  let sql = `SELECT c.classificacao, c.descricao, l.titulo, l.autor, c.categoriaSuperiorId, l.valorDiaria
  FROM livro l JOIN categoria c ON l.categoriaId = c.id
               LEFT JOIN categoria cs ON c.categoriaSuperiorId = cs.id             
  WHERE (cs.id = ${req.params.categoriaId}) or (c.id = ${req.params.categoriaId})
  ORDER BY c.classificacao`
  const params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message })
      return
    }
    res.json({
      "message": "success",
      "data": rows
    })
  })
}

module.exports = { create, update, remove, get, getDisponiveis, findByCategoria, findByCategoriaSQL }
