import { useCallback, useEffect, useState } from "react"
import api from "../../service/api"
import Table from "react-bootstrap/Table"
import { BiEditAlt, BiTrash } from "react-icons/bi"
import { Button } from "react-bootstrap"

function TableLivros(props) {
  const [livros, setLivros] = useState([])

  const getLivrosCallback = useCallback(async () => {
    const categoriaLivro = props.categoriaLivro
    if (categoriaLivro && (categoriaLivro !== 'Selecione a categoria')) {
      await api
      .get(`/findByCategoriaSQL/${props.categoriaLivro}`)
      .then((response) => {
        setLivros(response.data.data)
      })
      .catch((e) => {
        alert(e)
      })
    }
    else {
      await api
      .get("/livros")
      .then((response) => {
        setLivros(response.data)
      })
      .catch((e) => {
        alert(e)
      })
    }
  }, [props])


  useEffect(() => {
    getLivrosCallback()
  }, [props.atualizacao, getLivrosCallback])

  function editar(idLivro, titulo, autor, valorDiaria, categoriaId) {
    props.setValoresEdicao(idLivro, titulo, autor, valorDiaria, categoriaId)
  }

  async function excluir(idLivro) {
    await api
      .delete(`/livro/${idLivro}`)
      .then(() => {
        getLivrosCallback()
      })
      .catch((e) => {
        alert(e.response.data)
      })
  }

  return (
    <div className="Container">
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th><div className="tdCentralizado">Título</div></th>
            <th>
              <div className="tdCentralizado">Autor</div>
            </th>
            <th>
              <div className="tdCentralizado">Categoria</div>
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
                  {livro.classificacao ? livro.classificacao + ' - ' + livro.descricao : 
                  (livro.Categoria ? livro.Categoria.classificacao + ' - ' + livro.Categoria.descricao : '')}
                </td>
                <td>
                  <div className="tdCentralizado">
                    {livro.isAlugado ? "Sim" : "Não"}
                  </div>
                </td>
                <td><div className="tdDireita">
                    {parseFloat(livro.valorDiaria).toFixed(2).replace(".", ",")}
                  </div>
                </td>
                <td className="tdCentralizado">
                  <Button size="sm"
                    onClick={() => {
                      editar(
                        livro.id,
                        livro.titulo,
                        livro.autor,
                        livro.valorDiaria,
                        livro.categoriaId
                      )
                    }} style={{"background-color": "#581385"}}
                  >
                    <BiEditAlt />
                  </Button>
                  &nbsp;
                  <Button size="sm"
                    onClick={() => {
                      if (window.confirm("Confirma a exclusão do livro?")) {
                        excluir(livro.id)
                      }
                    }} style={{"background-color": "#581385"}}
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
