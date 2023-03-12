const fs = require('file-system')
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const utf8 = require('utf8')

async function create(req, res) {
  const cliente = await prisma.cliente.create({
    data: req.body,
  });
  res.json(cliente);
}

async function get(req, res) {
  res.json(
    await prisma.cliente.findMany({
      orderBy: [
        {
          nome: "asc",
        },
      ],
    })
  );
}

async function findByCpf(req, res) {
  res.json(
    await prisma.cliente.findFirst({
      where: {
        cpf: req.params.cpf,
      },
    })
  );
}

async function update(req, res) {
  const cliente = await prisma.cliente.findUnique({
    where: {
      id: parseInt(req.body.id),
    },
  });
  cliente.cpf = req.body.cpf;
  cliente.nome = req.body.nome;
  clienteUpdate = await prisma.cliente.update({
    data: cliente,
    where: {
      id: cliente.id,
    },
  });
  res.json(cliente);
}

async function remove(req, res) {
  let { id } = req.params;
  await prisma.cliente
    .delete({
      where: {
        id: parseInt(id),
      },
    })
    .then(() => {
      res.json("Cliente excluído");
    })
    .catch(() => {
      res.status(500).json("Cliente já associado a aluguel");
    });
}

function importarCpf(csv, cpf, i) {
  let novoCpf = cpf
  if ((parseInt(csv[i]) >= 48) && ((parseInt(csv[i]) <= 57))) { // 0 a 9
    for (let j = 0; j < 14; j++) {
      let codigo = parseInt(csv[i + j])
      let caractere = String.fromCharCode(codigo) 
      novoCpf += caractere
    }
  }
  else {
    return false
  }
  return novoCpf
}

async function importarClientes(req, res) {
  if (req.file) {
    const csv = fs.readFileSync(req.file.path)
    let i = 0
    let cpf = ''
    let nome = ''
    while (i < csv.length) {
      cpf = importarCpf(csv, cpf, i) 
      if (!cpf) {
        i++
        continue
      }
      else {
        cliente = await prisma.cliente.findUnique({
          where: {
            cpf: cpf
          }
        })
        if (cliente) {
          while ((i < csv.length) && (csv[i] !== 10)) {
            i++
          }
          cpf = ''
          nome = ''
          i++
          continue    
        }
        else {
          i += 14
        }
      }
      if (String.fromCharCode(parseInt(csv[i])) === ';' )  {
        i++
      }
      while ((i < csv.length) && (csv[i] !== 13)) {
        let codigo = parseInt(csv[i])
        let caractere = String.fromCharCode(codigo) 
        nome += caractere
        i++
      }
      i++
      await prisma.cliente.create({
        data: {cpf: cpf, nome: utf8.decode(nome)},
      })
      if (csv[i] === 10) {
        cpf = ''
        nome = ''
      }
      i++
    }
    return res.json({
      erro: false,
      mensagem: "Upload realizado com sucesso!",
    })
  }
  return res.status(400).json({
    erro: true,
    mensagem: "Problema no upload",
  })
}

module.exports = { create, update, get, remove, findByCpf, importarClientes };
