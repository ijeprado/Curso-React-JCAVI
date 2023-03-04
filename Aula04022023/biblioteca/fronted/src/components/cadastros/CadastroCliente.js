import { useEffect, useRef, useState } from "react"
import { Form, InputGroup, Button } from "react-bootstrap"
import api from "../../service/api"
const { validateBr } = require('js-brasil')

function CadastroCliente(props) {
  const formRefs = {cpf: useRef(null), nome: useRef(null)}
  const [formData, setFormData] = useState({ cpf: "", nome: "", id: "" })

  useEffect(() => {
    if (props.estahEmEdicao()) {
      let cliente = null
      cliente = props.inicializacaoEdicao()
      if (cliente) {
        setFormData({
          id: cliente.id,
          cpf: cliente.cpf,
          nome: cliente.nome,
        })
      }
    } else {
      setFormData({ id: "", cpf: "", nome: "" })
    }
  }, [props])

  async function cadastrarCliente() {
    if (formData.cpf.length === 0) {
      alert("CPF não foi informado")
      formRefs.cpf.current.focus()
      return
    }
    else if (!validateBr.cpf(formData.cpf)) {
      alert("CPF inválido")
      formRefs.cpf.current.focus()
      return
    } else if (formData.nome.length === 0) {
      alert("Nome não foi informado")
      formRefs.nome.current.focus()
      return
    }
    else {
      await api.get(`/findByCpf/${formData.cpf}`).then((response) => {
        if (response.data) {
          alert("CPF já cadastrado anteriormente")
          formData.cpf.current.focus()
          return
        }
      }
    )}
    if (props.estahEmEdicao()) {
      await api
        .put("/cliente", {
          cpf: formData.cpf,
          nome: formData.nome,
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
    } else {
      await api
        .post("/cliente", {
          cpf: formData.cpf,
          nome: formData.nome,
        })
        .then(() => {
          alert("Cadastro realizado com sucesso")
          setFormData({ cpf: "", nome: "", id: "" })
          formRefs.cpf.current.focus()
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
    <>
      <h1>
          {props.estahEmEdicao() ? "Alteração de cliente" : "Novo cliente"}
      </h1>
        <InputGroup className="mb-2 mt-3 w-50">
          <Form.Control
            name="cpf"
            value={formData.cpf}
            onChange={changeHandler}
            ref={formRefs.cpf}
            placeholder="CPF"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />
        </InputGroup>
        <InputGroup className="mb-2 mt-3 w-50">
          <Form.Control
            name="nome"
            value={formData.nome}
            onChange={changeHandler}
            ref={formRefs.nome}
            placeholder="Nome"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />
        </InputGroup>
        <Button variant="primary" onClick={cadastrarCliente}>
          Salvar
        </Button>
    </>
  )
}

export default CadastroCliente
