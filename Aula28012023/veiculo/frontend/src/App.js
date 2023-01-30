import { useEffect, useState } from "react"
import "./App.css"
import api from "./service/api"
import Table from "react-bootstrap/Table"
import Form from "react-bootstrap/Form"
import Button from 'react-bootstrap/Button'
import InputGroup from "react-bootstrap/InputGroup"

function App() {
  const [veiculos, setVeiculos] = useState([])
  const [placa, setPlaca] = useState('')
  const [marca, setMarca] = useState('')
  const [modelo, setModelo] = useState('')
  const [ano, setAno] = useState('')

  useEffect(() => {
    buscarVeiculosTable()
  }, []);

  async function buscarVeiculosTable() {
    return await api.get('/veiculos').then((response) => {
      setVeiculos(response.data)
    })
  }

  async function cadastrarVeiculo() {
    const veiculo = {placa, marca, modelo, ano: parseInt(ano)}
    await api.post('/veiculo', veiculo).then((response) => {
      setVeiculos([...veiculos, response.data])
      limparFormulario()
    }).catch(() => {
      alert('Veículo já cadastrado')
    })
  }

  function limparFormulario() {
    setAno('')
    setPlaca('')
    setMarca('')
  }

  async function excluirVeiculo(placa) {
    await api.delete(`/veiculo/${placa}`).then((response) => {
      buscarVeiculosTable()
      alert("Veículo excluído com sucesso")
    }).catch(() => {
      alert('Não possível encontrar o veículo')
    })
  }

  return (
    <div className="container">
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Placa"
          value={placa} onChange={ (e) => {setPlaca(e.target.value)}}
        />
        <Form.Control
          placeholder="Marca"
          value={marca} onChange={ (e) => {setMarca(e.target.value)}}
        />
        <Form.Control
          placeholder="Modelo"
          value={modelo} onChange={ (e) => {setModelo(e.target.value)}}
        />
        <Form.Control
          placeholder="Ano"
          value={ano} onChange={ (e) => {setAno(e.target.value)}}
        />
      </InputGroup>
      <Button onClick={cadastrarVeiculo}>
        Salvar
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Placa</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Ano</th>
            <tr></tr>
          </tr>
        </thead>
        <tbody>
          {
            veiculos.map((v) => {
              return (<tr>
                <td>{v.id}</td>
                <td>{v.placa}</td>
                <td>{v.marca}</td>
                <td>{v.modelo}</td>
                <td>{v.ano}</td>
                <td>
                  <Button onClick={() => {excluirVeiculo(v.placa)}}>x</Button>
                </td>
              </tr>)
            })
          }          
        </tbody>
      </Table>
    </div>
  );
}

export default App
