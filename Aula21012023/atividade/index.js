const express = require('express')
const server = express()
server.use(express.json())

const veiculos = [{"placa": "MEZ-9057", "modelo": "EcoSport", "marca": "Ford", "ano": 2009}]

server.get('/veiculos', (req, res) => {
    return res.json(veiculos)
})

function veiculoDeChave(pesquisa, chave) {
    let veiculo = null
    veiculos.forEach(v => {
        if (((pesquisa === "placa") && (v.placa === chave)) ||
            ((pesquisa === "modelo") && (v.modelo === chave)) ||
            ((pesquisa === "marca") && (v.marca === chave)) ||
            ((pesquisa === "ano") && (v.ano === ano)))  {
            veiculo = v
        }
    })
    return veiculo
}

function indiceVeiculo(pesquisa, chave) {
    let indice = -1    
    veiculos.forEach((v, idx) => {
        if (((pesquisa === "placa") && (v.placa === chave)) ||
            ((pesquisa === "modelo") && (v.modelo === chave)) ||
            ((pesquisa === "marca") && (v.marca === chave)) ||
            ((pesquisa === "ano") && (v.ano === ano)))  {
            indice = idx
        }
    })
    return indice
}

server.get('/veiculo/:pesquisa/:chave', (req, res) => {
    const {pesquisa} = req.params
    const {chave} = req.params
    
    if (indiceVeiculo(pesquisa, chave) == -1) {
        return res.status(500).json("Veículo não encontrado")
    }
    else {
        return res.json(veiculoDeChave(pesquisa, chave))
    }
})

server.post('/veiculos', (req, res) => {
    const veiculo = req.body

    if (indiceVeiculo(veiculo.placa) != -1) {
        return res.status(500).json("Veículo já existe")
    }
    else {        
        veiculos.push(veiculo)
        return res.json(veiculos)
    }
})

server.put('/veiculos', (req, res) => {
    const {placa} = req.body
    const idx = indiceVeiculo("placa", placa)
    if (idx == -1) {
        return res.status(500).json("Placa não encontrada")
    }
    else {
        const campoAlteracao = req.body.campoAlteracao
        const valorAlteracao = req.body.valorAlteracao
        if (campoAlteracao == "marca") {
            veiculos[idx].marca = valorAlteracao
        }
        else if (campoAlteracao == "modelo") {
            veiculos[idx].modelo = valorAlteracao
        }
        else {
            return res.status(500).json("Campo de alteração não permitido")
        }
        return res.json(veiculos)
    }
})

server.delete('/veiculos', (req, res) => {
    const {placa} = req.body
    const idx = indiceVeiculo("placa", placa)
    if (idx == -1) {
        return res.status(500).json("Placa não encontrada")
    }
    else {
        veiculos.splice(idx, 1)
        return res.json(veiculos)
    }
})

const porta = 3001

server.listen(porta, () => {
    console.log(`Rodando na porta ${porta}`)
})