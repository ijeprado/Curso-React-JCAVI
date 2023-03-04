const { PrismaClient } = require("@prisma/client")
const moment = require("moment")
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database("./prisma/dev.db")

const prisma = new PrismaClient()

async function get(req, res) {
  const {tipoFiltro} = req.params
  switch (parseInt(tipoFiltro)) {
    case 0:
      res.json(
        await prisma.aluguel.findMany({
          include: {
            Livro: {
              select: {
                valorDiaria: true,
                titulo: true,
              },
            },
            Cliente: {
              select: {
                nome: true,
              },
            },
          },
          where: {
            dataDevolucao: {
              equals: null,
            },
          },
        })
      )
      break
    case 1:
      res.json(
        await prisma.aluguel.findMany({
          include: {
            Livro: {
              select: {
                valorDiaria: true,
                titulo: true,
              },
            },
            Cliente: {
              select: {
                nome: true,
              },
            },
          },
          where: {
            dataDevolucao: {
              not: null,
            },
          },
        })
      )
      break
    case 2:
      res.json(
        await prisma.aluguel.findMany({
          include: {
            Livro: {
              select: {
                valorDiaria: true,
                titulo: true,
              },
            },
            Cliente: {
              select: {
                nome: true,
              },
            },
          },
        })
      )
      break
  }
}

async function put(req, res) {
  let { data, dataDevolucao, idLivro, idAluguel } = req.body
  let livro = await prisma.livro.findUnique({
    where: {
      id: parseInt(idLivro),
    },
  })
  dataDevolucao = new Date(dataDevolucao)
  const dias = moment(dataDevolucao).diff(data, "days")
  const valorArrecadado = parseInt(dias) * parseFloat(livro.valorDiaria)
  const aluguel = await prisma.aluguel.update({
    data: { dataDevolucao, valorArrecadado },
    where: {
      id: parseInt(idAluguel),
    },
  })
  livro = await prisma.livro.update({
    data: { isAlugado: false },
    where: {
      id: parseInt(idLivro),
    },
  })
  return res.json(aluguel)
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
  const aluguel = await prisma.aluguel.create({
    data: req.body,
  })
  livro = await prisma.livro.update({
    data: { isAlugado: true },
    where: {
      id: parseInt(aluguel.livroId),
    },
  })
  res.json(aluguel)
}

function getData(strData, inicio) {
  const dia = parseInt(strData.slice(0,2))
  const mes = parseInt(strData.slice(2,4)) - 1
  const ano = parseInt(strData.slice(4,8))
  const data = new Date(ano, mes, dia, 0, 0)
  return `'${data.getFullYear() + '-' + ("0" + (data.getMonth() + 1)).slice(-2) + '-' +
    ("0" + data.getDate()).slice(-2) + (inicio ? ' 00:00:00' : ' 23:59:59')}'`   
}

function getAlugueis(req, res) {
  const {tipoFiltro} = req.params
  const {idCliente} = req.params
  const {idLivro} = req.params
  let {dtInicial} = req.params
  let {dtFinal} = req.params
  let {dtInicialDevolucao} = req.params
  let {dtFinalDevolucao} = req.params
  let sql = 'select a.data, a.datadevolucao, c.nome as nomeCliente, l.titulo as tituloLivro, ' +
  'a.valorarrecadado, a.id, a.livroId, a.clienteId, l.valorDiaria as valorDiariaLivro ' +
  'from aluguel a join cliente c on a.clienteId = c.id' +
  '               join livro l on a.livroId = l.id '
  if (tipoFiltro == '0') {
    sql += "where a.dataDevolucao is null"
  }
  else if (tipoFiltro == '1') {
    sql += "where not (a.dataDevolucao is null)"
  }
  else {
    sql += "where 1=1"
  }

  if (idCliente !== '0') {
    sql += ' and a.clienteId = ' + idCliente
  }

  if (idLivro !== '0') {
    sql += ' and a.livroId = ' + idLivro
  }

  if (dtInicial !== '0') {
    sql += ` and datetime(round(a.data / 1000), 'unixepoch') >= ${getData(dtInicial, true)}`
  }

  if (dtFinal !== '0') {
    sql += ` and datetime(round(a.data / 1000), 'unixepoch') <= ${getData(dtFinal, false)}`
  }

  if (dtInicialDevolucao !== '0') {
    sql += ` and datetime(round(a.dataDevolucao / 1000), 'unixepoch') >= ${getData(dtInicialDevolucao, true)}`
  }

  if (dtFinalDevolucao !== '0') {
    sql += ` and datetime(round(a.dataDevolucao / 1000), 'unixepoch') <= ${getData(dtFinalDevolucao, false)}`
  }

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

module.exports = { create, get, put, remove, getAlugueis }
