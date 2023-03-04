import { useEffect, useRef, useState } from "react"
import { Form, InputGroup, Button } from "react-bootstrap"

import api from "../../service/api"

function CadastroLivro(props) {
  const formRefs = {titulo: useRef(null), autor: useRef(null), valorDiaria: useRef(null)}
  const [formData, setFormData] = useState({id: "", titulo: "", autor: "", valorDiaria: ""})
 
  useEffect(() => {
    if (props.estahEmEdicao()) {
      let livro = null
      livro = props.inicializacaoEdicao()
      if (livro) {
        setFormData({id: livro.idLivro, titulo: livro.titulo, autor: livro.autor, valorDiaria: livro.valorDiaria})
      }
    }
    else {
      setFormData({id: "", titulo: "", autor: "", valorDiaria: ""})
    }
  }, [props])

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
    if (props.estahEmEdicao()) {
      await api.put('/livro', {
        titulo: formData.titulo,
        autor: formData.autor,
        valorDiaria: formData.valorDiaria,
        id: formData.id
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
        valorDiaria: parseFloat(formData.valorDiaria)
      })
      .then(() => {
        setFormData({id: "", titulo: "", autor: "", valorDiaria: ""})
        formRefs.titulo.current.focus()
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
    <>
      <h1>{ props.estahEmEdicao() ? 'Alteração de livro' : 'Novo livro'}</h1>
          <InputGroup className="mb-2 mt-3 w-50">
            <Form.Control
              name = "titulo"
              value={formData.titulo}
              onChange={changeHandler}
              ref={formRefs.titulo}
              placeholder="Titulo"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
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
            />
          </InputGroup>
          <InputGroup className="mb-2 mt-3 w-50">
            <Form.Control
              name="valorDiaria"
              value={formData.valorDiaria/* ? parseFloat(formData.valorDiaria).toFixed(2).replace('.', ',') : ""*/}
              onChange={changeHandler}
              ref={formRefs.valorDiaria}
              placeholder="Valor Diária"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
          <Button variant="primary" onClick={cadastrarLivro}>
            Salvar
          </Button>  
      </>
  )
}

export default CadastroLivro