import { useEffect, useState } from "react"
import api from "../../service/api"
import { Table, Button } from 'react-bootstrap'
import { BiEditAlt, BiTrash } from "react-icons/bi"

function TableClientes(props) {
  const [clientes, setClientes] = useState([])

  useEffect(() => {
    getClientes()
  }, [props.atualizacao])

  async function getClientes() {
    await api.get('/clientes').then((response) => {
      setClientes(response.data)
    }).catch((e) => {
      alert(e)
    })
  }

  function editar(id, cpf, nome) {
    const dados = {id: id, cpf: cpf, nome: nome}
    props.setValoresEdicao(dados)
  }

  async function excluir(idCliente) {
    await api
      .delete(`/cliente/${idCliente}`)
      .then(() => {
        getClientes()
      })
      .catch((e) => {
        alert(e.response.data)
      })
  }

  return (
    <div className="Container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="th">CPF</th>
            <th><div className="th">Nome</div></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente, idx) => {
            return (
              <tr row={idx} key={Math.random()}>
              <td>{cliente.cpf}</td>
              <td>{cliente.nome}</td>
              <td className="tdCentralizado"><Button onClick={() => {editar(cliente.id, cliente.cpf, cliente.nome)}}><BiEditAlt />              
              </Button>&nbsp;
              <Button
                    onClick={() => {
                      if (window.confirm("Confirma a exclusão do cliente?")) {
                        excluir(cliente.id)
                      }
                    }}
                  >
                    <BiTrash />
                  </Button>
              </td>
            </tr>  
            )
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default TableClientes
