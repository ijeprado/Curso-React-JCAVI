import React, { useEffect, useState } from "react";
import api from "../../service/api";
import { Button, Form, Table } from "react-bootstrap";
import moment from "moment";

function Historico() {
  const [clientes, setClientes] = useState([]);
  const [idCliente, setIdCliente] = useState();
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    getClientes();
  }, []);

  async function getClientes() {
    await api
      .get("/clientes")
      .then((response) => {
        setClientes(response.data);
      })
      .catch((e) => {
        alert(e);
      })
  }

  function changeHandler(e) {
    setIdCliente(e.target.value);
  }

  async function getHistorico() {
    await api
      .get(`/historico/${idCliente}`)
      .then((response) => {
        setHistorico(response.data);
      })
      .catch((e) => {
        alert(e);
      })
  }

  function pesquise() {
    if (idCliente && (idCliente !== 0)) {
      getHistorico()
    }
  }

  let totalArrecadado = 0

  return (
    <div>
      <table width="50%" align="center">
        <tbody>
          <tr>
            <td>
              <br />
              <br />
              <br />
              <table>
                <tbody>
                  <tr>
                    <td>
                      {" "}
                      <Form.Select
                        name="idCliente"
                        onChange={changeHandler}
                        value={idCliente}
                        aria-label="Default select example"
                        size="sm"
                      >
                        <option>Selecione o cliente</option>
                        {clientes.map((c, key) => {
                          return (
                            <option value={c.id} key={key}>
                              {c.nome}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </td>
                    <td>
                      <Button size="sm" onClick={pesquise} style={{"background-color": "#581385"}}>Pesquisar</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <br/>
              {historico && (historico.length > 0) && (
              <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th><div className="th">Livro</div></th>
                  <th><div className="th">Data</div></th>
                  <th><div className="tdCentralizado">Data Retorno</div></th>
                  <th><div className="tdCentralizado">Valor Diária</div></th>            
                  <th><div className="th">Valor Aluguel</div></th>
                </tr>
              </thead>
              <tbody>
                {
                historico.map((aluguel, idx) => {
                  if (aluguel.valorArrecadado) {
                      totalArrecadado = totalArrecadado + aluguel.valorArrecadado
                  }
                  return (
                    <tr row={idx} key={Math.random()}>
                    <td>{aluguel.Livro.titulo}</td>
                    <td><div className="tdCentralizado">{moment(aluguel.data).format('DD/MM/YYYY')}</div></td>
                    <td><div className="tdCentralizado">{aluguel.dataDevolucao && moment(aluguel.dataDevolucao).format('DD/MM/YYYY')}</div></td>
                    <td><div className="tdDireita">{aluguel.Livro.valorDiaria.toFixed(2).replace('.', ',')}</div></td>
                    <td><div className="tdDireita">{aluguel.valorArrecadado && parseFloat(aluguel.valorArrecadado).toFixed(2).replace('.', ',')}</div></td>
                    </tr>  
                  )
                })}
              </tbody>
            </Table>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Historico;
