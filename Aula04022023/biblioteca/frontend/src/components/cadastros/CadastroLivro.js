import { useEffect, useRef, useState } from "react"
import { Form, InputGroup, Button, Col } from "react-bootstrap"

import api from "../../service/api"

function CadastroLivro(props) {
  const formRefs = {
    titulo: useRef(null),
    autor: useRef(null),
    valorDiaria: useRef(null),
    categoriaId: useRef(null)
  }
  const [formData, setFormData] = useState({id: "", titulo: "", autor: "", valorDiaria: "",
    categoriaId: ""})
  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    if (props.estahEmEdicao()) {
      let livro = null
      livro = props.inicializacaoEdicao()
      if (livro) {
        setFormData({
          id: livro.idLivro,
          titulo: livro.titulo,
          autor: livro.autor,
          valorDiaria: livro.valorDiaria,
          categoriaId: livro.categoriaId
        })
      }
    } else {
      setFormData({ id: "", titulo: "", autor: "", valorDiaria: "", categoriaId: "" })
    }
    getCategorias()
    formRefs.titulo.current.focus()
  }, [props, formRefs.titulo])

  async function getCategorias() {
    await api.get("/categorias").then((response) => {
      setCategorias(response.data)
    })
  }

  async function cadastrarLivro() {
    if (formData.titulo.length === 0) {
      alert("Título não foi informado")
      formRefs.titulo.current.focus()
      return
    } else if (formData.autor.length === 0) {
      alert("Autor não foi informado")
      formRefs.autor.current.focus()
      return
    } else if (formData.valorDiaria.length === 0) {
      alert("Valor da diária não foi informado")
      formRefs.valorDiaria.current.focus()
      return
    }
    if (props.estahEmEdicao()) {
      await api
        .put("/livro", {
          titulo: formData.titulo,
          autor: formData.autor,
          valorDiaria: formData.valorDiaria,
          id: formData.id,
          categoriaId: formData.categoriaId
        })
        .then(() => {
          alert("Alteração realizada com sucesso")
          props.handleCadastro()
          props.handleClose()
        })
        .catch((e) => {
          alert(e)
        })
    } else {
      await api
        .post("/livro", {
          titulo: formData.titulo,
          autor: formData.autor,
          valorDiaria: parseFloat(formData.valorDiaria.replace(',', '.')),
          categoriaId: parseInt(formData.categoriaId)
        })
        .then(() => {
          setFormData({ id: "", titulo: "", autor: "", valorDiaria: "", categoriaId: ""})
          formRefs.titulo.current.focus()
        })
        .catch((e) => {
          alert(e)
        })
    }
  }

  function changeHandler(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <table width="80%" align="center">
      <tbody>
        <tr>
          <td>
            <br />
            <h1>
              {props.estahEmEdicao() ? "Alteração de livro" : "Novo livro"}
            </h1>
            <InputGroup className="mb-2 mt-3 w-50">
              <Form.Control
                name="titulo"
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
            <Col sm="3">
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
                    {c.descricao}
                  </option>
                )
              })}
            </Form.Select></Col>
            <InputGroup className="mb-2 mt-3 w-50">
              <Col sm="3">
              <Form.Control
                name="valorDiaria"
                value={
                  formData.valorDiaria /* ? parseFloat(formData.valorDiaria).toFixed(2).replace('.', ',') : ""*/
                }
                onChange={changeHandler}
                ref={formRefs.valorDiaria}
                placeholder="Valor Diária"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                size="sm"
              /></Col>
            </InputGroup>
            <Button variant="primary" onClick={cadastrarLivro} size="sm" style={{"background-color": "#581385"}}>
              Salvar
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default CadastroLivro
