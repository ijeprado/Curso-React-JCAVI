import { useEffect, useState } from "react"
import api from "../../service/api"
import Table from "react-bootstrap/Table"
import { BiEditAlt, BiTrash } from "react-icons/bi"
import { Button } from "react-bootstrap"

function TableCategorias(props) {
  const [Categorias, setCategorias] = useState([])

  useEffect(() => {
    getCategorias()
  }, [props.atualizacao])

  async function getCategorias() {
    await api
      .get("/categorias")
      .then((response) => {
        setCategorias(response.data)
      })
      .catch((e) => {
        alert(e)
      })
  }

  function editar(idCategoria, classificacao, descricao, categoriaSuperior) {
    props.setValoresEdicao(idCategoria, classificacao, descricao, categoriaSuperior)
  }

  async function excluir(idCategoria) {
    await api
      .delete(`/Categoria/${idCategoria}`)
      .then(() => {
        getCategorias()
      })
      .catch((e) => {
        alert(e.response.data)
      })
  }

  return (
    <div className="Container">
      <h2 align="center">Listagem de Categorias</h2><br/>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th className="tdCentralizado">Classificação</th>
            <th>
              <div className="tdCentralizado">Descrição</div>
            </th>
            <th>
              <div className="tdCentralizado">Categoria Superior</div>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Categorias.map((categoria, idx) => {
            return (
              <tr row={idx} key={Math.random()}>
                <td>{categoria.classificacao}</td>
                <td>{categoria.descricao}</td>
                <td>{categoria.categoriaSuperior ? categoria.categoriaSuperior.classificacao + " - " + categoria.categoriaSuperior.descricao : ""}</td>
                <td className="tdCentralizado">
                  <Button size="sm"
                    onClick={() => {
                      editar(
                        categoria.id,
                        categoria.classificacao,
                        categoria.descricao,
                        categoria.idCategoriaSuperior
                      )
                    }}
                    style={{"background-color": "#581385"}}>
                    <BiEditAlt />
                  </Button>
                  &nbsp;
                  <Button size="sm"
                    onClick={() => {
                      if (window.confirm("Confirma a exclusão da Categoria?")) {
                        excluir(categoria.id)
                      }
                    }}
                    style={{"background-color": "#581385"}}>
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

export default TableCategorias
