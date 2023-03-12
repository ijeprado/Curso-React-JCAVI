import { useEffect, useRef, useState } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { registerLocale } from "react-datepicker"
import br from "date-fns/locale/pt-BR"
import api from "./../../service/api"
import moment from "moment"

registerLocale("br", br)

function ModalCadastroAluguel(props) {
  const [livros, setLivros] = useState([])
  const [clientes, setClientes] = useState([])
  const formRefs = {idCliente: useRef(null), idLivro: useRef(null), data: useRef(null), dataDevolucao: useRef(null)}
  const [formData, setFormData] = useState({idCliente: "", idLivro: "", data: null, dataDevolucao: null, id: null})

  useEffect(() => {
    getClientes()
    getLivros()
    if (props.estahEmEdicao()) {
      let aluguel = null
      aluguel = props.inicializacaoEdicao()
      if (aluguel) {
        setFormData({idCliente: aluguel.idCliente, idLivro: aluguel.idLivro, data: new Date(aluguel.data), id: aluguel.id, dataDevolucao: aluguel.dataDevolucao})
      }
    }
  }, [props])

  async function getClientes() {
    await api.get("/clientes").then((response) => {
      setClientes(response.data)
    })
  }

  async function getLivros() {
    await api.get("/livros").then((response) => {
      setLivros(response.data)
    })
  }

  async function devolverLivro() {
    if (!formData.dataDevolucao) {
      alert('Data da devolução não foi informada')
      formRefs.dataDevolucao.current.focus()
      return
    }
    else {
      const hoje = moment()
      if (hoje.isBefore(formData.dataDevolucao)) {
        alert('Data da devolução não pode ser posterior')
        formRefs.dataDevolucao.current.focus()
        return
      }
    }
    await api.put("/aluguel", {
      data: formData.data,
      dataDevolucao: formData.dataDevolucao,
      idLivro: formData.idLivro,
      idAluguel: formData.id
    }).then(() => {
      alert("Devolução realizada com sucesso")
      setFormData({idCliente: "", idLivro: "", data: null, dataDevolucao: null, id: null})
      props.handleCadastro()
      props.handleClose()
    }).catch((e) => {
        alert(e)
      })
    props.handleCadastro()
  }

  async function cadastrarAluguel() {
    if (formData.idLivro.length === 0) {
      alert('Livro não foi definido')
      formRefs.idLivro.current.focus()
      return
    }
    else if (formData.idCliente.length === 0) {
      alert('Cliente não foi definido')
      formRefs.idCliente.current.focus()
      return
    }
    else if (!formData.data) {
      alert('Data do aluguel não foi informada')
      formRefs.data.current.focus()
      return
    }
    await api
      .post("/aluguel", {
        clienteId: parseInt(formData.idCliente),
        livroId: parseInt(formData.idLivro),
        data: formData.data
      })
      .then(() => {
        alert("Aluguel realizado com sucesso")
        setFormData({idCliente: "", idLivro: "", data: null, dataDevolucao: null, idAluguel: null})
        props.handleCadastro()
        props.handleClose()
      })
      .catch((e) => {
        alert(e)
      })
  }

  function Salvar() {
    props.estahEmEdicao() ? devolverLivro() : cadastrarAluguel()
  }

  function changeHandler(e) {
    setFormData({...formData, [e.target.name]: e.target.value })
  }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.estahEmEdicao() ? "Devolução de livro" : "Novo aluguel"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Select
          name="idCliente"
          onChange={changeHandler}
          ref={formRefs.idCliente}
          value={formData.idCliente}
          aria-label="Default select example"
          disabled={props.estahEmEdicao()}
          size="sm"
        >
          <option>Selecione o cliente</option>
          {clientes.map((c, key) => {
            return (
              <option value={c.id} key={key}>
                {c.nome}
              </option>
            )
          })}
        </Form.Select>
        <br />
        <Form.Select
          name="idLivro"
          onChange={changeHandler}
          ref={formRefs.idLivro}
          value={formData.idLivro}
          aria-label="Default select example"
          disabled={props.estahEmEdicao()}
          size="sm"
        >
          <option>Selecione o livro</option>
          {livros.map((l, key) => {
            return (
              <option value={l.id} key={key}>
                {l.titulo}
              </option>
            )
          })}
        </Form.Select>
        <br />
        {props.estahEmEdicao() && <div>Data de retirada:</div>}
        <DatePicker
          name="data"
          selected={formData.data ? formData.data : null}
          onChange={(date) => {
            const dataFormatada = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
            const d = new Date(dataFormatada)
            setFormData({...formData, data: d})
          }}
          ref={formRefs.data}
          placeholderText="Data de Aluguel"
          locale="br"
          dateFormat="dd/MM/yyyy"
          disabled={props.estahEmEdicao()}
          size="sm"
        />
        {props.estahEmEdicao() && (
          <>
            {formData.dataDevolucao ? (<div>Data de retirada:</div>) : <><br/><br/></>}
            <DatePicker
              name="dataDevolucao"
              selected={formData.dataDevolucao ? formData.dataDevolucao : null}
              onChange={(date) => {
                const dataFormatada = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
                const d = new Date(dataFormatada)
                setFormData({...formData, dataDevolucao: d})
              }}
              ref={formRefs.dataDevolucao}
              placeholderText="Data de Devolução"
              locale="br"
              dateFormat="dd/MM/yyyy"
              size="sm"
            />
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose} size="sm">
          Fechar
        </Button>
        <Button variant="primary" onClick={Salvar} size="sm" style={{"background-color": "#581385"}}>
          { props.estahEmEdicao() ? "Devolver" : "Salvar" }
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalCadastroAluguel
