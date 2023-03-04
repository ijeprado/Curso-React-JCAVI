import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import api from "../service/api"
import RadioButtons from "./RadioButtons"
import DatePicker from "react-datepicker"

function FiltroCollapse(props) {
  const [formData, setFormData] = useState({
    idCliente: "",
    idLivro: "",
    dataInicial: null,
    dataFinal: null,
    dataDevolucaoInicial: null,
    dataDevolucaoFinal: null,
    tipoFiltro: 2,
  })
  const [livros, setLivros] = useState([])
  const [clientes, setClientes] = useState([])

  useEffect(() => {
    getClientes()
    getLivros()
  }, [])

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

  const altereTipoDeFiltro = (idxRadioButton) => {
    setFormData((previousState) => {
      return { ...previousState, tipoFiltro: idxRadioButton }
    })
  }

  function clickRadioButton(idxRadioButton) {
    altereTipoDeFiltro(idxRadioButton)
  }

  function changeHandler(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function filtrar() {
    if (
      (formData.dataDevolucaoFinal && !formData.dataDevolucaoInicial) ||
      (!formData.dataDevolucaoFinal && formData.dataDevolucaoInicial)
    ) {
      alert("Período de devolução não foi preenchido")
    } else if (
      (formData.dataFinal && !formData.dataInicial) ||
      (!formData.dataFinal && formData.dataInicial)
    ) {
      alert("Período de aluguel não foi preenchido")
    } else {
      props.filtrar(formData)
    }
  }

  return (
    <>
      <button
        data-bs-toggle="collapse"
        data-bs-target="#filtros"
        id="btnFiltros"
      >
        Filtros
      </button>
      <div id="filtros" className="collapse">
        <RadioButtons clickRadioButton={clickRadioButton} />
        <table>
          <tbody>
            <tr>
              <td>
                <Form.Select
                  name="idCliente"
                  onChange={changeHandler}
                  value={formData.idCliente}
                  aria-label="Default select example"
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
              </td>
              <td>
                {" "}
                <Form.Select
                  name="idLivro"
                  onChange={changeHandler}
                  value={formData.idLivro}
                  aria-label="Default select example"
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
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <td>
                {" "}
                <DatePicker
                  name="dataInicial"
                  selected={formData.dataInicial ? formData.dataInicial : null}
                  onChange={(date) => {
                    if (date) {
                    const dataFormatada = `${
                      date.getMonth() + 1
                    }/${date.getDate()}/${date.getFullYear()}`
                    const d = new Date(dataFormatada)
                    setFormData({ ...formData, dataInicial: d })
                  } else {
                    setFormData({ ...formData, dataInicial: null })
                  }}}
                  placeholderText="Data Inicial"
                  locale="br"
                  dateFormat="dd/MM/yyyy"
                  isClearable
                />
              </td>
              <td>
                <DatePicker
                  name="dataFinal"
                  selected={formData.dataFinal ? formData.dataFinal : null}
                  onChange={(date) => {
                    if (date) {
                    const dataFormatada = `${
                      date.getMonth() + 1
                    }/${date.getDate()}/${date.getFullYear()}`
                    const d = new Date(dataFormatada)
                    setFormData({ ...formData, dataFinal: d })
                  } else {
                    setFormData({ ...formData, dataFinal: null})
                  }}}
                  placeholderText="Data Final"
                  locale="br"
                  dateFormat="dd/MM/yyyy"
                  isClearable
                />
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <td>
                {" "}
                <DatePicker
                  name="dataDevolucaoInicial"
                  selected={
                    formData.dataDevolucaoInicial
                      ? formData.dataDevolucaoInicial
                      : null
                  }
                  onChange={(date) => {
                    if (date) {
                    const dataFormatada = `${
                      date.getMonth() + 1
                    }/${date.getDate()}/${date.getFullYear()}`
                    const d = new Date(dataFormatada)
                    setFormData({ ...formData, dataDevolucaoInicial: d })
                  } else 
                  {
                    setFormData({ ...formData, dataDevolucaoInicial: null})
                  }}}
                  placeholderText="Devolução Inicial"
                  locale="br"
                  dateFormat="dd/MM/yyyy"
                  isClearable
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  name="dataDevolucaoFinal"
                  selected={
                    formData.dataDevolucaoFinal
                      ? formData.dataDevolucaoFinal
                      : null
                  }
                  onChange={(date) => {
                    if (date) {
                    const dataFormatada = `${
                      date.getMonth() + 1
                    }/${date.getDate()}/${date.getFullYear()}`
                    const d = new Date(dataFormatada)
                    setFormData({ ...formData, dataDevolucaoFinal: d })
                  }
                  else {
                    setFormData({ ...formData, dataDevolucaoFinal: null})
                  }}}
                  placeholderText="Devolução Final"
                  locale="br"
                  dateFormat="dd/MM/yyyy"
                  isClearable
                />
              </td>
            </tr>
          </tbody>
        </table>
        <Button
          onClick={() => {
            filtrar()
          }}
        >
          Filtrar
        </Button>
      </div>
    </>
  )
}

export default FiltroCollapse
