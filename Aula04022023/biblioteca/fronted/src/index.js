import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import App from './App'
import NavBar from './components/NavBar'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import CadastroAluguel from './components/cadastros/CadastroAluguel'
import CadastroLivro from './components/cadastros/CadastroLivro'
import CadastroCliente from './components/cadastros/CadastroCliente'
import Alugueis from './components/pages/Alugueis'
import Clientes from './components/pages/Clientes'
import Livros from './components/pages/Livros'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <NavBar />
    <Router>
      <Routes>
        <Route key="" path="/" element={<App/>}/>
        <Route key="aluguel" path="/aluguel" element={<CadastroAluguel estahEmEdicao={() => {return false }}/>}/>
        <Route key="livro" path="/livro" element={<CadastroLivro estahEmEdicao={() => {return false }}/>}/>
        <Route key="cliente" path="/cliente" element={<CadastroCliente estahEmEdicao={() => {return false }}/>}/>
        <Route key="alugueis" path="/alugueis" element={<Alugueis />}/>
        <Route key="clientes" path="/clientes" element={<Clientes />}/>
        <Route key="livros" path="/livros" element={<Livros />} />
        </Routes>
    </Router>
  </React.StrictMode>
)
