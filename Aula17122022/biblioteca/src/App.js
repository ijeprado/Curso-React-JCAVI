import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'react-datepicker/dist/react-datepicker.css'

import { BiTrash } from 'react-icons/bi'
import { Button, Form, InputGroup, Table } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import { registerLocale } from  "react-datepicker";
import br from 'date-fns/locale/pt-BR'

import { useState } from 'react';

registerLocale('br', br)

function App() {
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  const [data, setData] = useState(null)
  
  const [livros, setLivros] = useState([])

  function cadastrar() {
    if ((titulo === "") || (autor === "") || (data === "")) {
      alert('É necessário preencher todos os campos para efetuar o cadastro')
      return
    }

    let achou = false 
    livros.forEach(livro => {
      achou = achou || livro.titulo === titulo
    })
    if(achou) {
      alert('Livro já foi cadastrado anteriormente')
    } else {
      let codigo = 0
      livros.forEach(livro => {
        if (livro.codigo > codigo) {
          codigo = livro.codigo
        }
      })
      codigo++
      const livro = {
        codigo,
        titulo,
        autor, 
        data
      }
      livros.push(livro)
  
      setLivros([...livros])
  
      limparForm()
    }
  }

  function limparForm() {
    setTitulo('')
    setAutor('')
    setData(null)
  }

  function excluir(codigo) {
    livros.forEach((livro, index) => {
      if (livro.codigo === codigo) {
        livros.splice(index, 1)
      }
    })
    setLivros([...livros])
    alert('Livro excluído com sucesso')
  }

  return (
    <div className="container">
        <InputGroup className="mb-2 mt-3 w-50">
          <Form.Control value={titulo} onChange={(e) => {setTitulo(e.target.value)}} placeholder="Titulo"
          aria-label="Default" aria-describedby="inputGroup-sizing-default"
          />            
        </InputGroup>      
        <InputGroup className="mb-2 w-50">
          <Form.Control value={autor} onChange={(e) => {setAutor(e.target.value)}} placeholder="Autor"
          aria-label="Default" aria-describedby="inputGroup-sizing-default"
          />            
        </InputGroup>
      <DatePicker selected={data ? data : null} onChange={(date) => setData(date)} placeholderText="Data de Publicação" 
                  locale="br" dateFormat="dd/MM/yyyy" />
      <br />
      <br />
      <table><tbody><tr><td><Button onClick={cadastrar}>Inserir</Button></td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Número de livros: {livros.length}</td></tr></tbody></table>      
      <br />
      <Table class="table table-bordered table-hover table-sm">
          <thead>
            <tr>
            <th className="th">Código</th>
            <th><div className="th">Título</div></th>
            <th><div className="th">Autor</div></th>
            <th><div className="th">Data de Publicação</div></th>
            <th className="th">Ação</th>
            </tr>
          </thead>
          <tbody>
            {
              livros.map((livro, key) => {
                return (
                <tr key={key}>
                 <td>{livro.codigo.toString()}</td>
                 <td>{livro.titulo}</td>
                 <td>{livro.autor}</td>
                 <td><div  className="tdCentralizado">{livro ? livro.data.toLocaleDateString() : ""}</div></td>
                 <td className="th">
                   <Button onClick={() => {excluir(livro.codigo)}}><BiTrash /></Button>
                </td></tr>
              )})
            }
          </tbody>
        </Table>
    </div>
  );
}

export default App;
