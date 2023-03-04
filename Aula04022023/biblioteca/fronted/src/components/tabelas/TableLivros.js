import { useEffect, useState } from "react"
import api from "../../service/api"
import Table from "react-bootstrap/Table"
import { BiEditAlt, BiTrash } from "react-icons/bi"
import { Button } from "react-bootstrap"

function TableLivros(props) {
  const [livros, setLivros] = useState([])

  useEffect(() => {
    getLivros()
  }, [props.atualizacao])

  async function getLivros() {
    await api
      .get("/livros")
      .then((response) => {
        setLivros(response.data)
      })
      .catch((e) => {
        alert(e)
      })
  }

  function editar(idLivro, titulo, autor, valorDiaria) {
    props.setValoresEdicao(idLivro, titulo, autor, valorDiaria)
  }

  async function excluir(idLivro) {
    await api
      .delete(`/livro/${idLivro}`)
      .then(() => {
        getLivros()
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
            <th className="tdCentralizado">Título</th>
            <th>
              <div className="tdCentralizado">Autor</div>
            </th>
            <th>
              <div className="tdCentralizado">Alugado</div>
            </th>
            <th>
              <div className="tdCentralizado">Valor Diária</div>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro, idx) => {
            return (
              <tr row={idx} key={Math.random()}>
                <td>{livro.titulo}</td>
                <td>{livro.autor}</td>
                <td>
                  <div className="tdCentralizado">
                    {livro.isAlugado ? "Sim" : "Não"}
                  </div>
                </td>
                <td>
                  <div className="tdDireita">
                    {parseFloat(livro.valorDiaria).toFixed(2).replace(".", ",")}
                  </div>
                </td>
                <td className="tdCentralizado">
                  <Button
                    onClick={() => {
                      editar(
                        livro.id,
                        livro.titulo,
                        livro.autor,
                        livro.valorDiaria
                      )
                    }}
                  >
                    <BiEditAlt />
                  </Button>
                  &nbsp;
                  <Button
                    onClick={() => {
                      if (window.confirm("Confirma a exclusão do livro?")) {
                        excluir(livro.id)
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
  )
}

export default TableLivros
