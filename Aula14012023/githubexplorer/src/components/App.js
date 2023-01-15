import { Form, InputGroup, Button, Row, Col } from 'react-bootstrap'
import './App.css'
import api from '../services/api'
import { useEffect, useState } from 'react'
import CardUsuario from './CardUsuario'
import CardRepo from './CardRepo'

function App() {
  const [repos, setRepos] = useState([])
  const [usuarioPesquisa, setUsuarioPesquisa] = useState("")
  const [usuario, setUsuario] = useState()

  function pesquisar() {
    api.get(`/users/${usuarioPesquisa}/repos`)
      .then((response) => {
        setRepos(response.data)
      })
  }

  useEffect(() => {
    api.get(`/users/${usuarioPesquisa}`).then((response) => {
      setUsuario(response.data)
    })
  }, [repos])

  return (
    <div class="container">
      <h1>Explore repositórios no github</h1>
      <div className='form mb-3'>
        <InputGroup>
          <Form.Control
            placeholder="Digite o nome do usuário"
            value={usuarioPesquisa} onChange={(e) => { setUsuarioPesquisa(e.target.value) }}
          />
        </InputGroup>
        <Button className="button" variant="primary" onClick={pesquisar}>Pesquisar</Button>
      </div>
      {
        usuario && (
          <CardUsuario usuario={usuario} />
        )
      }
      <Row className="justify-content-md-center">
        {
          repos.map((repo) => {
            return (
              <Col md="auto">
                <CardRepo repo={repo} />
              </Col>
            )
          })
        }
      </Row>
    </div>
  );
}

export default App;
