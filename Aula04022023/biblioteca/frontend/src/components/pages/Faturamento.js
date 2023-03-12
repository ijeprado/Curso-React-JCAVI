import React, { useState } from "react"
import api from "../../service/api"
import { Button, Table } from "react-bootstrap"
import moment from "moment"
import DatePicker from "react-datepicker"

function Faturamento() {
  const [formData, setFormData] = useState({
    dataInicial: null,
    dataFinal: null,
  })
  const [faturamento, setFaturamento] = useState([])

  function getDataStr(data) {
    return (
      ("0" + data.getDate()).slice(-2) +
      ("0" + (data.getMonth() + 1)).slice(-2) +
      data.getFullYear()
    )
  }

  async function getFaturamento() {
    await api
      .get(
        `/faturamento/${getDataStr(formData.dataInicial)}/${getDataStr(
          formData.dataFinal
        )}`
      )
      .then((response) => {
        setFaturamento(response.data)
      })
      .catch((e) => {
        alert(e)
      })
  }

  function pesquise() {
    if (formData.dataInicial && formData.dataFinal) {
      getFaturamento()
    }
  }

  let totalArrecadado = 0.0
  let totalAArrecadar = 0.0
  const fim = moment()

  return (
    <div>
      <table width="80%" align="center">
        <tbody>
          <tr>
            <td>
              <br />
              <h2>Faturamento</h2>
              <br />
              <table>
                <tbody>
                  <tr>
                    <td>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              {" "}
                              <DatePicker
                                name="dataInicial"
                                selected={
                                  formData.dataInicial
                                    ? formData.dataInicial
                                    : null
                                }
                                onChange={(date) => {
                                  if (date) {
                                    const dataFormatada = `${
                                      date.getMonth() + 1
                                    }/${date.getDate()}/${date.getFullYear()}`
                                    const d = new Date(dataFormatada)
                                    setFormData({
                                      ...formData,
                                      dataInicial: d,
                                    })
                                  } else {
                                    setFormData({
                                      ...formData,
                                      dataInicial: null,
                                    })
                                  }
                                }}
                                placeholderText="Data Inicial"
                                locale="br"
                                dateFormat="dd/MM/yyyy"
                                isClearable
                                size="sm"
                              />
                            </td>
                            <td>
                              <DatePicker
                                name="dataFinal"
                                selected={
                                  formData.dataFinal ? formData.dataFinal : null
                                }
                                onChange={(date) => {
                                  if (date) {
                                    const dataFormatada = `${
                                      date.getMonth() + 1
                                    }/${date.getDate()}/${date.getFullYear()}`
                                    const d = new Date(dataFormatada)
                                    setFormData({ ...formData, dataFinal: d })
                                  } else {
                                    setFormData({
                                      ...formData,
                                      dataFinal: null,
                                    })
                                  }
                                }}
                                placeholderText="Data Final"
                                locale="br"
                                dateFormat="dd/MM/yyyy"
                                isClearable
                                size="sm"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td>
                      <Button size="sm" onClick={pesquise} style={{"background-color": "#581385"}}>
                        Pesquisar
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />
              {faturamento && faturamento.length > 0 && (
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>
                        <div className="th">Livro</div>
                      </th>
                      <th>
                        <div className="th">Data</div>
                      </th>
                      <th>
                        <div className="tdCentralizado">Data Retorno</div>
                      </th>
                      <th>
                        <div className="tdCentralizado">Valor Diária</div>
                      </th>
                      <th>
                        <div className="th">Valor Arrecadado</div>
                      </th>
                      <th>
                        <div className="th">Valor a Arrecadar</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {faturamento.map((aluguel, idx) => {
                      if (aluguel.valorArrecadado) {
                        totalArrecadado =
                          totalArrecadado + parseFloat(aluguel.valorArrecadado)
                      }
                      else {
                        totalAArrecadar = totalAArrecadar +
                          aluguel.Livro.valorDiaria * fim.diff(aluguel.data, 'days')
                      }

                      return (
                        <tr row={idx} key={Math.random()}>
                          <td>{aluguel.Livro.titulo}</td>
                          <td>
                            <div className="tdCentralizado">
                              {moment(aluguel.data).format("DD/MM/YYYY")}
                            </div>
                          </td>
                          <td>
                            <div className="tdCentralizado">
                              {aluguel.dataDevolucao &&
                                moment(aluguel.dataDevolucao).format(
                                  "DD/MM/YYYY"
                                )}
                            </div>
                          </td>
                          <td>
                            <div className="tdDireita">
                              {aluguel.Livro.valorDiaria
                                .toFixed(2)
                                .replace(".", ",")}
                            </div>
                          </td>
                          <td>
                            <div className="tdDireita">
                              {aluguel.valorArrecadado &&
                                parseFloat(aluguel.valorArrecadado)
                                  .toFixed(2)
                                  .replace(".", ",")}
                            </div>
                          </td>
                          <td>
                            <div className="tdDireita">
                                {!aluguel.dataDevolucao && (aluguel.Livro.valorDiaria * fim.diff(aluguel.data, 'days')).toFixed(2).replace('.', ',') }
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                    <tr><td colspan="4" align="center">Total</td>
                    <td><div className="tdDireita">{totalArrecadado.toFixed(2).replace('.', ',')}</div></td>
                    <td><div className="tdDireita">{totalAArrecadar.toFixed(2).replace('.', ',')}</div></td></tr>
                  </tbody>
                </Table>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Faturamento
