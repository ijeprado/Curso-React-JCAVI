import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CadastroAluguel from "./cadastros/CadastroAluguel"
import CadastroLivro from "./cadastros/CadastroLivro"
import CadastroCliente from "./cadastros/CadastroCliente"
import Alugueis from "./pages/Alugueis"
import Clientes from "./pages/Clientes"
import Livros from "./pages/Livros"
import Home from "./pages/Home"
import Historico from "./pages/Historico"
import Faturamento from "./pages/Faturamento"
import CadastroCategoria from "./cadastros/CadastroCategoria"
import Listagens from './pages/Listagens'
import Cadastros from './pages/Cadastros'
import Categorias from './pages/Categorias'

function Rotas() {
  return (
      <Router>
        <Routes>
          <Route key="" path="/" element={<Home />} />
          <Route
            key="aluguel"
            path="/aluguel"
            element={
              <CadastroAluguel
                estahEmEdicao={() => {
                  return false
                }}
              />
            }
          />
          <Route
            key="livro"
            path="/livro"
            element={
              <CadastroLivro
                estahEmEdicao={() => {
                  return false
                }}
              />
            }
          />
          <Route
            key="cliente"
            path="/cliente"
            element={
              <CadastroCliente
                estahEmEdicao={() => {
                  return false
                }}
              />
            }
          />
          <Route
            key="categoria"
            path="/categoria"
            element={
              <CadastroCategoria
                estahEmEdicao={() => {
                  return false
                }}
              />
            }
          />
          <Route key="alugueis" path="/alugueis" element={<Alugueis />} />
          <Route key="clientes" path="/clientes" element={<Clientes />} />
          <Route key="livros" path="/livros" element={<Livros />} />
          <Route key="historico" path="/historico" element={<Historico />} />
          <Route key="faturamento" path="/faturamento" element={<Faturamento />} />
          <Route key="listagens" path="/listagens" element={<Listagens />} />
          <Route key="cadastros" path="/cadastros" element={<Cadastros />} />
          <Route key="categorias" path="/categorias" element={<Categorias />} />
        </Routes>
      </Router>
)}

export default Rotas
