import { useState } from 'react';
import './App.css';

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

  return (
    <>
      <div className="form m5">
        <h1>Cadastro de automóveis</h1>
        <input className="m5" placeholder="Placa" value={placa} onChange={(e) => { setPlaca(e.target.value) }} />
        <input className="m5" placeholder="Marca" value={marca} onChange={(e) => (setMarca(e.target.value))} />
        <input className="m5" placeholder="Modelo" value={modelo} onChange={(e) => (setModelo(e.target.value))} />
        <input className="m5" placeholder="Ano" value={ano} onChange={(e) => (setAno(e.target.value))} />
        <table><tbody><tr><td><button className="m5" onClick={cadastrar}>Cadastrar</button></td>
                          <td><button className="m5" onClick={pesquisar}>Pesquisar</button></td></tr>
               </tbody></table>              
      </div>
      <table>
        <tr>
          <th>Placa</th>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Ano</th>
        </tr>
        {
          veiculos.map((veiculo) => {
            return(
              <tr>
              <td>{veiculo.placa}</td>
              <td>{veiculo.marca}</td>
              <td>{veiculo.modelo}</td>
              <td>{veiculo.ano}</td>
              </tr>    
            )  
          })
        }
      </table>
    </>    
  );
}

export default App;
