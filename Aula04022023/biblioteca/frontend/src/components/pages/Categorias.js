import TableCategorias from "../tabelas/TableCategorias"
import { useState } from "react"
import ModalCadastroCategoria from "../modais/ModalCadastroCategoria"

function Categorias() {
  const [showCadastro, setShowCadastro] = useState(false)
  const [editData, setEditData] = useState({id: 0, classificacao: "", descricao: "", idCategoriaSuperior: ""})

  /* A variável autalizacao serve pra tabela saber se tem que ser renderizada novamente ou não */
  const [atualizacao, setAtualizacao] = useState(0)

  const handleCloseCadastro = () => { 
    setShowCadastro(false)
    setEditData({id: 0, classificacao: "", descricao: "", idCategoriaSuperior: ""})
    sessionStorage.setItem("idCategoria", 0)
  }

  const handleShowCadastro = (id, classificacao, descricao, idCategoriaSuperior) => {
    if (sessionStorage.getItem("idCategoria") && (sessionStorage.getItem("idCategoria") !== '0')) {
      setEditData({id: id, classificacao: classificacao, descricao: descricao, idCategoriaSuperior: idCategoriaSuperior})
    }
    setShowCadastro(true)
  }
  const handleCadastro = () => setAtualizacao(atualizacao + 1)

  /* callback a ser utilizado pela tela de edição de Categoria */
  const inicializacaoEdicao = () => {
    if (sessionStorage.getItem("idCategoria") && (sessionStorage.getItem("idCategoria") !== '0')) {
      return {id: editData.id, classificacao: editData.classificacao, descricao: editData.descricao, idCategoriaSuperior: editData.idCategoriaSuperior}
    }
    else {
      return null
    }     
  }

  function estahEmEdicao() {
    return sessionStorage.getItem("idCategoria") && (sessionStorage.getItem("idCategoria") !== '0')
  }

  /* Função chamada da tela de tabela para preencher os valores dos estados */
  const editar = (id, classificacao, descricao, idCategoriaSuperior) => {
    sessionStorage.setItem('idCategoria', id)
    setEditData({id: id, classificacao: classificacao, descricao: descricao, idCategoriaSuperior: idCategoriaSuperior})
    handleShowCadastro(id, classificacao, descricao, idCategoriaSuperior)
  }  

  return (
    <div className="container">
      <br/>
      <br/>
      <TableCategorias atualizacao={atualizacao} handleShowCadastro={handleShowCadastro}
      setValoresEdicao={editar} />
      <ModalCadastroCategoria show={showCadastro} handleCadastro={handleCadastro}
      handleClose={handleCloseCadastro} inicializacaoEdicao={inicializacaoEdicao} 
      estahEmEdicao={estahEmEdicao}/>
    </div>
  )
}

export default Categorias