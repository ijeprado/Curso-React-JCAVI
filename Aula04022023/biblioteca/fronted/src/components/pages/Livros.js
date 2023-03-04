import TableLivros from "../tabelas/TableLivros"
import { useState } from "react"
import ModalCadastroLivro from "../modais/ModalCadastroLivro"

function Livros() {
  const [showCadastro, setShowCadastro] = useState(false)
  const [editData, setEditData] = useState({id: 0, titulo: "", autor: "", valorDiaria: ""})

  /* A variável autalizacao serve pra tabela saber se tem que ser renderizada novamente ou não */
  const [atualizacao, setAtualizacao] = useState(0)

  const handleCloseCadastro = () => { 
    setShowCadastro(false)
    setEditData({id: 0, titulo: "", autor: "", valorDiaria: ""})
    sessionStorage.setItem("idLivro", 0)
  }

  const handleShowCadastro = (id, titulo, autor, valorDiaria) => {
    if (sessionStorage.getItem("idLivro") && (sessionStorage.getItem("idLivro") !== '0')) {
      setEditData({id: id, titulo: titulo, autor: autor, valorDiaria: valorDiaria})
    }
    setShowCadastro(true)
  }
  const handleCadastro = () => setAtualizacao(atualizacao + 1)

  /* callback a ser utilizado pela tela de edição de livro */
  const inicializacaoEdicao = () => {
    if (sessionStorage.getItem("idLivro") && (sessionStorage.getItem("idLivro") !== '0')) {
      return {id: editData.id, titulo: editData.titulo, autor: editData.autor, valorDiaria: editData.valorDiaria}
    }
    else {
      return null
    }     
  }

  function estahEmEdicao() {
    return sessionStorage.getItem("idLivro") && (sessionStorage.getItem("idLivro") !== '0')
  }

  /* Função chamada da tela de tabela para preencher os valores dos estados */
  const editar = (id, titulo, autor, valorDiaria) => {
    sessionStorage.setItem('idLivro', id)
    setEditData({id: id, titulo: titulo, autor: autor, valorDiaria: valorDiaria})
    handleShowCadastro(id, titulo, autor, valorDiaria)
  }  

  return (
    <div className="container">
      <br/>
      <br/>
      <TableLivros atualizacao={atualizacao} handleShowCadastro={handleShowCadastro}
      setValoresEdicao={editar} />
      <ModalCadastroLivro show={showCadastro} handleCadastro={handleCadastro}
      handleClose={handleCloseCadastro} inicializacaoEdicao={inicializacaoEdicao} 
      estahEmEdicao={estahEmEdicao}/>
    </div>
  )
}

export default Livros