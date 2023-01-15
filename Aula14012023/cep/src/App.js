import { useState } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import './App.css'
import api from './services/api'

function App() {
  const [cep, setCep] = useState()
  const [nome, setNome] = useState('')
  const [logradouro, setLogradouro] = useState('')
  const [bairro, setBairro] = useState('')
  const [localidade, setLocalidade] = useState('')
  const [uf, setUF] = useState('')

  function pesquisarCEP() {
    api.get(`/${cep.replace('-', '')}/json`)
      .then((response) => {
        setLogradouro(response.data.logradouro)
        setBairro(response.data.bairro)
        setLocalidade(response.data.localidade)
        setUF(response.data.uf)
      })
  }

  return (
    <div className="container">
      <h1>Cadastro de pessoa</h1>
      <div className="form mb-3">
        <table width="300px"><tbody><tr><td>
        <InputGroup>
          <Form.Control
            placeholder='Nome da pessoa'
            value={nome}
            onChange={(e) => {setNome(e.target.value)}}
          />
        </InputGroup>
        <table width="300px"><tbody><tr><td width="150px">
        <InputGroup>
          <Form.Control
            placeholder='CEP'
            value={cep}
            onChange={(e) => {setCep(e.target.value)}}
          />
        </InputGroup></td><td>
          <Button className="button" onClick={pesquisarCEP}>Pesquisar CEP</Button></td></tr>
        <tr><td colspan="2">
          <InputGroup>
          <Form.Control
            placeholder='Logradouro'
            value={logradouro}
            onChange={(e) => {setLogradouro(e.target.value)}}
          />
        </InputGroup></td></tr>
        <tr><td colspan="2">
          <InputGroup>
          <Form.Control
            placeholder='Bairro'
            value={bairro}
            onChange={(e) => {setBairro(e.target.value)}}
          />
        </InputGroup></td></tr>
        <tr><td>
          <InputGroup>
          <Form.Control
            placeholder='Localidade'
            value={localidade}
            onChange={(e) => {setLocalidade(e.target.value)}}
          /></InputGroup></td><td>
          <InputGroup>
          <Form.Control
            placeholder='UF'
            value={uf}
            onChange={(e) => {setUF(e.target.value)}}
          />
        </InputGroup></td></tr></tbody></table>        
        </td></tr></tbody></table>
      </div>
    </div>
  )
}

export default App
