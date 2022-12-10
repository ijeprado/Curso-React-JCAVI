import { useState } from 'react';
import './App.css';

function App() {
  const [nome, setNome] = useState('')
  const [idade, setIdade] = useState('')
  const [pessoas, setPessoas] = useState([])

  function cadastrar() {
    alert('sdsdsd')
  }
  return (
    <>
      <div className="form m5">
        <h1>Olá, React!</h1>
        <input className="m5" placeholder="Nome" value={nome} onChange={(e) => { setNome(e.target.value) }} />
        <input className="m5" placeholder="Idade" value={idade} onChange={(e) => (setIdade(e.target.value))}
          type="number" />
        <button className="m5" onClick={cadastrar}>Cadastrar</button>
      </div>
      <table>
        <tr>
          <th>Nome</th>
          <th>Idade</th>
        </tr>
        
        <tr>
          <td></td>
          <td></td>
        </tr>
      </table>
    </>
  );
}

export default App;
