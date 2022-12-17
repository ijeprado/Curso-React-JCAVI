import './App.css';
import { Button, Form, InputGroup, Table } from 'react-bootstrap'
import { useState } from 'react';
import {FaBeer} from 'react-icons/fa'

function App() {
  const [placa, setPlaca] = useState('')
  const [modelo, setModelo] = useState('')
  const [marca, setMarca] = useState('')
  const [ano, setAno] = useState('')

  const [veiculos, setVeiculos] = useState([
    {placa: 'NPC-9191', marca: 'Mercedes Benz', modelo: 'Basculante', ano: 2009},
    {placa: 'OGQ-9631', marca: 'Volkswage', modelo: 'Fox 1.0', ano: 2012},
    {placa: 'JZI-3472', marca: 'FIAT', modelo: 'Strada', ano: 2001},
    {placa: 'OBK-0112', marca: 'FIAT', modelo: 'Uno Mille Economy', ano: 2013},
    {placa: 'JZE-5683', marca: 'Kia', modelo: 'Besta 12P GS', ano: 2001}
  ])

  function cadastrar() { 
    if ((placa === "") || (modelo === "") || (marca === "") || (ano === "")) {
      alert('É necessário preencher todos os campos para efetuar o cadastro')
      return
    }

    let achou = false 
    veiculos.forEach(veiculo => {
      achou = achou || veiculo.placa === placa
    })
    if(achou) {
      alert('Veículo já foi cadastrado anteriormente')
    } else {
      const veiculo = {
        placa,
        marca, 
        modelo,
        ano
      }
      veiculos.push(veiculo)
  
      setVeiculos([...veiculos])
  
      limparForm()
    }
  }

  function limparForm() {
    setAno('')
    setMarca('')
    setModelo('')
    setPlaca('')
  }

  function pesquisar() {
    if ((placa === "") && (modelo === "") && (marca === "") && (ano === "")) {
      alert('É necessário preencher pelo menos um filtro')
      return
    }
    let numEncontrados = 0
    veiculos.forEach(veiculo => {
      if (((placa === "") || (placa === veiculo.placa)) && 
          ((modelo === "") || (modelo === veiculo.modelo)) &&
          ((marca === "") || (marca === veiculo.marca)) &&
          ((ano === "") || (parseInt(ano) === veiculo.ano))) {
        numEncontrados++
      }
    })
    alert(`Número de veículos encontrados: ${numEncontrados}`)
  }

  function excluir(placa) {
    veiculos.forEach((veiculo, index) => {
      if (veiculo.placa === placa) {
        veiculos.splice(index, 1)
      }
    })
    setVeiculos([...veiculos])
    alert('Veículo excluído com sucesso')
  }

  return (
    <>      
      <div className="container">
        <InputGroup className="mb-2 mt-3">
          <Form.Control
            value={placa}
            onChange={(e) => {
              setPlaca(e.target.value)
            }}
            placeholder="Placa"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control
            value={marca}
            onChange={(e) => {
              setMarca(e.target.value)
            }}
            placeholder="Marca"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control
            value={modelo}
            onChange={(e) => {
              setModelo(e.target.value)
            }}
            placeholder="Modelo"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control
            value={ano}
            onChange={(e) => {
              setAno(e.target.value)
            }}
            placeholder="Ano"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />
        </InputGroup>
        <table><tbody><tr><td><Button className="mb-3" onClick={cadastrar}>Cadastrar</Button></td>
                          <td><Button className="mb-3" onClick={pesquisar}>Pesquisar</Button></td></tr>
               </tbody></table>  
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="th">
                Placa
              </th>
              <th className="th">
                Marca
              </th>
              <th>
                Modelo
              </th>
              <th>
                Ano
              </th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {
          veiculos.map((veiculo) => {
            return(
              <tr>
              <td>{veiculo.placa}</td>
              <td>{veiculo.marca}</td>
              <td>{veiculo.modelo}</td>
              <td>{veiculo.ano}</td>
              <td>
                <Button onClick={() => {excluir(veiculo.placa)}}><FaBeer /></Button>
              </td>
              </tr>    
            )  
          })
        }
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default App;
