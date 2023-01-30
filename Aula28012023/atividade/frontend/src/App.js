import "./App.css"
import api from "./services/api"
import Table  from "react-bootstrap/Table"
import Form   from "react-bootstrap/Form"
import Button from 'react-bootstrap/Button'
import InputGroup from "react-bootstrap/InputGroup"
import { useEffect, useState } from "react"

function App() {
  const [chamados, setChamados] = useState([])
  const [numero, setNumero] = useState('')
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [categoria, setCategoria] = useState('')
  const [prioridade, setPrioridade] = useState('')
  const [horasEstimadas, setHorasEstimadas] = useState('')

  useEffect(() => {
    buscarChamadosNaBase()
  }, [])

  async function buscarChamadosNaBase() {
    return await api.get('/chamados').then((response) => {
      setChamados(response.data)
    })
  }  
  
  async function inserirChamado() {
    const chamado = {numero, titulo, descricao, categoria, prioridade, 
      horasEstimadas: parseInt(horasEstimadas)}
    await api.post('/chamado', chamado).then((response) => {
      setChamados([...chamados, response.data])
      limparFormulario()
    }).catch(() => {
      alert('Veículo já cadastrado')
    })
  }

  async function excluirChamado(numero) {
    await api.delete(`/chamado/${numero}`).then((response) => {
      buscarChamadosNaBase()
      alert("Chamado excluído com sucesso")
    }).catch(() => {
      alert('Não possível encontrar o chamado')
    })
  }

  function limparFormulario() {
    setCategoria('')
    setDescricao('')
    setHorasEstimadas('')
    setNumero('')
    setPrioridade('')
    setTitulo('')
  }

  return (
    <div>
      <table width="800px"><tbody><tr><td>
      <table width="100px"><tbody><tr><td>
      <InputGroup className='mb-3'>
        <Form.Control
          placeholder="Número"
          value={numero} onChange={(e) => {setNumero(e.target.value)}}
        />
      </InputGroup>
      </td></tr></tbody></table>
      <InputGroup className='mb-3'>
        <Form.Control
          placeholder="Título"
          value={titulo} onChange={(e) => {setTitulo(e.target.value)}}
        />
      </InputGroup>
      <InputGroup className='mb-3'>
        <Form.Control
          placeholder="Descrição"
          value={descricao} onChange={(e) => {setDescricao(e.target.value)}}
        />
      </InputGroup>
      <table width="300px"><tbody><tr><td>
      <InputGroup className='mb-3'>
        <Form.Control
          placeholder="Categoria"
          value={categoria} onChange={(e) => {setCategoria(e.target.value)}}
        />
      </InputGroup>
      <InputGroup className='mb-3'>
        <Form.Control
          placeholder="Prioridade"
          value={prioridade} onChange={(e) => {setPrioridade(e.target.value)}}
        />
      </InputGroup>
      <InputGroup className='mb-3'>
        <Form.Control
          placeholder="Horas Estimadas"
          value={horasEstimadas} onChange={(e) => {setHorasEstimadas(e.target.value)}}
        />
      </InputGroup>
      </td></tr></tbody></table>
      <Button onClick={inserirChamado}>
        Inserir
      </Button>
      </td></tr></tbody></table>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Número</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Prioridade</th>
            <th>Horas Estimadas</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{
          chamados.map(c => {
            return(
            <tr>
            <td>{c.id}</td>
            <td>{c.numero}</td>
            <td>{c.titulo}</td>
            <td>{c.descricao}</td>
            <td>{c.categoria}</td>
            <td>{c.prioridade}</td>
            <td>{c.horasEstimadas}</td>
            <td><Button onClick={() => excluirChamado(c.numero)}>x</Button></td>
          </tr>
          )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default App;
