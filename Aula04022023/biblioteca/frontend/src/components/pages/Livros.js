import TableLivros from "../tabelas/TableLivros"
import { useEffect, useState } from "react"
import ModalCadastroLivro from "../modais/ModalCadastroLivro"
import api from "../../service/api"
import { Col, Form } from "react-bootstrap"

function Livros() {
  const [showCadastro, setShowCadastro] = useState(false)
  const [editData, setEditData] = useState({id: 0, titulo: "", autor: "", valorDiaria: "", categoriaId: ""})
  const [atualizacao, setAtualizacao] = useState(0)
  const [categoriaLivro, setCategoriaLivro] = useState()
  const [categorias, setCategorias] = useState()

  useEffect(() => {
    getCategorias()
  }, [])

  async function getCategorias() {
    await api.get("/categorias").then((response) => {
      setCategorias(response.data)
    })
  }

  const handleCloseCadastro = () => { 
    setShowCadastro(false)
    setEditData({id: 0, titulo: "", autor: "", valorDiaria: "", categoriaId: ""})
    sessionStorage.setItem("idLivro", 0)
  }

  const handleShowCadastro = (id, titulo, autor, valorDiaria, categoriaId) => {
    if (sessionStorage.getItem("idLivro") && (sessionStorage.getItem("idLivro") !== '0')) {
      setEditData({id: id, titulo: titulo, autor: autor, valorDiaria: valorDiaria, categoriaId: categoriaId})
    }
    setShowCadastro(true)
  }
  const handleCadastro = () => setAtualizacao(atualizacao + 1)

  /* callback a ser utilizado pela tela de edição de livro */
  const inicializacaoEdicao = () => {
    if (sessionStorage.getItem("idLivro") && (sessionStorage.getItem("idLivro") !== '0')) {
      return {id: editData.id, titulo: editData.titulo, autor: editData.autor, valorDiaria: editData.valorDiaria, categoriaId: editData.categoriaId}
    }
    else {
      return null
    }     
  }

  function estahEmEdicao() {
    return sessionStorage.getItem("idLivro") && (sessionStorage.getItem("idLivro") !== '0')
  }

  /* Função chamada da tela de tabela para preencher os valores dos estados */
  const editar = (id, titulo, autor, valorDiaria, categoriaId) => {
    sessionStorage.setItem('idLivro', id)
    setEditData({id: id, titulo: titulo, autor: autor, valorDiaria: valorDiaria, categoriaId: categoriaId})
    handleShowCadastro(id, titulo, autor, valorDiaria, categoriaId)
  }  

  return (
    <div className="container">
      <br/>
      <h2 align="center">Listagem de Livros</h2><br/>
      <br/>
      {categorias && (categorias.length > 0) && (<table><tbody><tr>
      <td>        
        <Col sm="12">
          <Form.Select
          name="categoriaId"
          onChange={(e) => {setCategoriaLivro(e.target.value)}}
          value={categoriaLivro}
          aria-label="Default select example"
          size="sm"
          >
          <option>Selecione a categoria</option>
          {categorias.map((c, key) => {
            return (
              <option value={c.id} key={key}>
                {c.classificacao + " - " + c.descricao}
              </option>
            )
          })}          
          </Form.Select></Col><br />
        </td></tr></tbody></table>)}      
      <TableLivros atualizacao={atualizacao} handleShowCadastro={handleShowCadastro}
      setValoresEdicao={editar} categoriaLivro={categoriaLivro} />            
      <ModalCadastroLivro show={showCadastro} handleCadastro={handleCadastro}
      handleClose={handleCloseCadastro} inicializacaoEdicao={inicializacaoEdicao} 
      estahEmEdicao={estahEmEdicao}/>
    </div>
  )
}

export default Livros