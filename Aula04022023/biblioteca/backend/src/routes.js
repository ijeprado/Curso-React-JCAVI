const { Router } = require('express')
const routes = Router()
const clienteController = require('./modules/Cliente/ClienteController')
const livroController = require('./modules/Livros/LivroController')
const aluguelController = require('./modules/Aluguel/AluguelController')

routes.get('/', (req, res) => {
    return res.json("Server Up")
})

routes.get('/clientes', clienteController.get)
routes.post('/cliente', clienteController.create)
routes.put('/cliente', clienteController.update)
routes.delete('/cliente/:id', clienteController.remove)
routes.get('/findByCpf/:cpf', clienteController.findByCpf)

routes.get('/livros', livroController.get)
routes.get('/livrosDisponiveis', livroController.getDisponiveis)
routes.post('/livro', livroController.create)
routes.put('/livro', livroController.update)
routes.delete('/livro/:id', livroController.remove)

routes.get('/alugueis/:tipoFiltro', aluguelController.get)
routes.post('/aluguel', aluguelController.create)
routes.put('/aluguel', aluguelController.put)
routes.delete('/aluguel/:id', aluguelController.remove)
routes.get('/alugueis/:tipoFiltro/:idCliente/:idLivro/:dtInicial/:dtFinal/:dtInicialDevolucao/:dtFinalDevolucao', aluguelController.getAlugueis)

module.exports = {routes}