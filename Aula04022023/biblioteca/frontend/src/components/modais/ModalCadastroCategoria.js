import { useEffect, useRef, useState } from "react"
import { Modal, Form, InputGroup, Button, Col } from "react-bootstrap"

import api from "../../service/api"

function ModalCadastroCategoria(props) {
  const formRefs = {classificacao: useRef(null), descricao: useRef(null), categoriaSuperiorId: useRef(null)}
  const [formData, setFormData] = useState({id: "", titulo: "", autor: "", valorDiaria: "", categoriaSuperiorId: ""})
  const [categorias, setCategorias] = useState()
 
  useEffect(() => {
    getCategorias()
    if (props.estahEmEdicao()) {
      let categoria = null
      categoria = props.inicializacaoEdicao()
      if (categoria) {
        setFormData({id: categoria.id, classificacao: categoria.classificacao, descricao: categoria.descricao, categoriaSuperiorId: categoria.categoriaSuperiorId})
      }
    }
    else {
      setFormData({id: "", classificacao: "", descricao: "", categoriaSuperiorId: ""})
    }
    if (formRefs.classificacao && formRefs.classificacao.current) {
      formRefs.classificacao.current.focus()    
    }
  }, [props, formRefs.classificacao])

  async function getCategorias() {
    await api.get("/categorias").then((response) => {
      setCategorias(response.data)
    })
  }

  async function cadastrarCategoria() {
    if (formData.classificacao.length === 0) {
      alert('Classificação não foi informada')
      formRefs.classificacao.current.focus()
      return
    }
    else if (formData.descricao.length === 0) {
      alert('Descrição não foi informada')
      formRefs.descricao.current.focus()
      return
    }
    if (props.estahEmEdicao()) {
      await api.put('/categoria', {
        classificacao: formData.classificacao,
        descricao: formData.descricao,
        idCategoriaSuperior: formData.idCategoriaSuperior,
        id: formData.id ? formData.id : sessionStorage.getItem("idCategoria")
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
        .post("/categoria", {
        classificacao: formData.classificacao,
        descricao: formData.descricao,
        idCategoriaSuperior: formData.idCategoriaSuperior
      })
      .then(() => {
        alert("Cadastro realizado com sucesso")
        setFormData({id: "", classificacao: "", descricao: "", categoriaSuperiorId: ""})
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
        <Modal.Title>{ props.estahEmEdicao() ? 'Alteração de Categoria' : 'Novo Categoria'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col sm="3">
        <InputGroup className="mb-2 mt-3 w-50">
          <Form.Control
            name = "classificacao"
            value={formData.classificacao}
            onChange={changeHandler}
            ref={formRefs.classificacao}
            placeholder="Classificação"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            size="sm"
          />
        </InputGroup></Col>
        <InputGroup className="mb-2 mt-3 w-50">
          <Form.Control
            name="descricao"
            value={formData.descricao}
            onChange={changeHandler}
            ref={formRefs.descricao}
            placeholder="Descrição"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            size="sm"
          />
        </InputGroup>
        {categorias && (categorias.length > 0) && (<Col sm="7">
            <Form.Select
              name="categoriaId"
              onChange={changeHandler}
              ref={formRefs.categoriaSuperiorId}
              value={formData.categoriaSuperiorId}
              aria-label="Default select example"
              size="sm"
            >
              <option>Selecione a categoria superior</option>
              {categorias.map((c, key) => {
                return (
                  <option value={c.id} key={key}>
                    {c.classificacao + " - " + c.descricao}
                  </option>
                )
              })}
            </Form.Select></Col>)}        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose} size="sm">
          Fechar
        </Button>
        <Button variant="primary" onClick={cadastrarCategoria} size="sm" style={{"background-color": "#581385"}}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalCadastroCategoria