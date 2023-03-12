import { useEffect, useRef, useState } from "react"
import { Modal, Form, InputGroup, Button, Col } from "react-bootstrap"

import api from "../../service/api"

function ModalCadastroLivro(props) {
  const formRefs = {titulo: useRef(null), autor: useRef(null), valorDiaria: useRef(null), categoriaId: useRef(null)}
  const [formData, setFormData] = useState({id: "", titulo: "", autor: "", valorDiaria: "", categoriaId: ""})
  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    if (props.estahEmEdicao()) {
      let livro = null
      livro = props.inicializacaoEdicao()
      if (livro) {
        setFormData({id: livro.idLivro, titulo: livro.titulo, autor: livro.autor, valorDiaria: parseFloat(livro.valorDiaria).toFixed(2).replace('.', ','),
          categoriaId: livro.categoriaId})
      }
    }
    else {
      setFormData({id: "", titulo: "", autor: "", valorDiaria: "", categoriaId: ""})
    }
    getCategorias()
    if (formRefs.titulo.current) {
      formRefs.titulo.current.focus()
    }
  }, [props, formRefs.titulo])

  async function getCategorias() {
    await api.get("/categorias").then((response) => {
      setCategorias(response.data)
    })
  }

  async function cadastrarLivro() {
    if (formData.titulo.length === 0) {
      alert('Título não foi informado')
      formRefs.titulo.current.focus()
      return
    }
    else if (formData.autor.length === 0) {
      alert('Autor não foi informado')
      formRefs.autor.current.focus()
      return
    }
    else if (formData.valorDiaria.length === 0) {
      alert('Valor da diária não foi informado')
      formRefs.valorDiaria.current.focus()
      return
    }
    else if (formData.categoriaId.length === 0) {
      alert('Categoria não foi informada')
      formRefs.categoriaId.current.focus()
      return
    }
    if (props.estahEmEdicao()) {
      await api.put('/livro', {
        titulo: formData.titulo,
        autor: formData.autor,
        valorDiaria: formData.valorDiaria,
        id: formData.id ? formData.id : sessionStorage.getItem("idLivro"),
        categoriaId: parseInt(formData.categoriaId)
      })
      .then(() => {
        alert("Alteração realizada com sucesso")
        props.handleCadastro()
        props.handleClose()
      })
      .catch((e) => {
        alert(e)
      })
    }
    else {
      await api
        .post("/livro", {
        titulo: formData.titulo,
        autor: formData.autor,
        valorDiaria: parseFloat(formData.valorDiaria),
        categoriaId: formData.categoriaId
      })
      .then(() => {
        alert("Cadastro realizado com sucesso")
        setFormData({id: "", titulo: "", autor: "", valorDiaria: "", categoriaId: ""})
        props.handleCadastro()
        props.handleClose()
      })
      .catch((e) => {
        alert(e)
      })
    }
  }

  function changeHandler(e) {
    setFormData({...formData, [e.target.name]: e.target.value })
  }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{ props.estahEmEdicao() ? 'Alteração de livro' : 'Novo livro'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-2 mt-3 w-50">
          <Form.Control
            name = "titulo"
            value={formData.titulo}
            onChange={changeHandler}
            ref={formRefs.titulo}
            placeholder="Titulo"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            size="sm"
          />
        </InputGroup>
        <InputGroup className="mb-2 mt-3 w-50">
          <Form.Control
            name="autor"
            value={formData.autor}
            onChange={changeHandler}
            ref={formRefs.autor}
            placeholder="Autor"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            size="sm"
          />
        </InputGroup>
        <Col sm="5">
            <Form.Select
              name="categoriaId"
              onChange={changeHandler}
              ref={formRefs.categoriaId}
              value={formData.categoriaId}
              aria-label="Default select example"
              size="sm"
            >
              <option>Selecione a categoria</option>
              {categorias.map((c, key) => {
                return (
                  <option value={c.id} key={key}>
                    {c.classificacao + " - " + c.descricao}
                  </option>
                )
              })}
            </Form.Select></Col>
        <InputGroup className="mb-2 mt-3 w-50">
          <Form.Control
            name="valorDiaria"
            value={formData.valorDiaria}
            onChange={changeHandler}
            ref={formRefs.valorDiaria}
            placeholder="Valor Diária"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            size="sm"
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose} size="sm">
          Fechar
        </Button>
        <Button variant="primary" onClick={cadastrarLivro} size="sm" style={{"background-color": "#581385"}}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalCadastroLivro