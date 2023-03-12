const { Router } = require('express')
const routes = Router()
const clienteController = require('./modules/Cliente/ClienteController')
const livroController = require('./modules/Livros/LivroController')
const aluguelController = require('./modules/Aluguel/AluguelController')
const categoriaController = require('./modules/Categoria/CategoriaController')
const uploadUser = require('./middlewares/uploadImage')

routes.get('/', (req, res) => {
    return res.json("Server Up")
})

routes.get('/clientes', clienteController.get)
routes.post('/cliente', clienteController.create)
routes.put('/cliente', clienteController.update)
routes.delete('/cliente/:id', clienteController.remove)
routes.get('/findByCpf/:cpf', clienteController.findByCpf)
routes.post('/importarClientes', uploadUser.single('arquivo'), clienteController.importarClientes)

routes.get('/livros', livroController.get)
routes.get('/livrosDisponiveis', livroController.getDisponiveis)
routes.post('/livro', livroController.create)
routes.put('/livro', livroController.update)
routes.delete('/livro/:id', livroController.remove)
routes.get('/findByCategoria/:categoriaId', livroController.findByCategoria)
routes.get('/findByCategoriaSQL/:categoriaId', livroController.findByCategoriaSQL)

routes.get('/alugueis/:tipoFiltro', aluguelController.get)
routes.post('/aluguel', aluguelController.create)
routes.put('/aluguel', aluguelController.put)
routes.delete('/aluguel/:id', aluguelController.remove)
routes.get('/alugueis/:tipoFiltro/:idCliente/:idLivro/:dtInicial/:dtFinal/:dtInicialDevolucao/:dtFinalDevolucao', aluguelController.getAlugueis)
routes.get('/historico/:idCliente', aluguelController.getHistorico)
routes.get('/faturamento/:dataInicial/:dataFinal', aluguelController.getFaturamento)

routes.get('/categorias', categoriaController.get)
routes.post('/categoria', categoriaController.create)
routes.put('/categoria', categoriaController.put)

module.exports = {routes}