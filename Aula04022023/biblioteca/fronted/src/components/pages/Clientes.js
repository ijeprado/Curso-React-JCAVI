import TableClientes from "../tabelas/TableClientes"
import { useState } from "react"
import ModalCadastroCliente from "../modais/ModalCadastroCliente"

let dadosTela = { id: "", cpf: "", nome: ""}

function Clientes() {
  const [showCadastro, setShowCadastro] = useState(false)
  /* A variável autalizacao serve pra tabela saber se tem que ser renderizada novamente ou não */
  const [atualizacao, setAtualizacao] = useState(0)

  const handleCloseCadastro = () => { 
    setShowCadastro(false)
    sessionStorage.setItem("idCliente", 0)
  }  
  const handleShowCadastro = () => {
    setShowCadastro(true)
  }  
  const handleCadastro = () => setAtualizacao(atualizacao + 1);
  /* callback a ser utilizado pela tela de edição de cliente */
  const inicializacaoEdicao = () => {
    if (sessionStorage.getItem("idCliente") !== '0') {
      return {id: dadosTela.id, cpf: dadosTela.cpf, nome: dadosTela.nome}
    }
    else {
      return null
    }     
  }
  function estahEmEdicao() {
    return (sessionStorage.getItem("idCliente") !== '0')
  }

  const editar = (dados) => {
    sessionStorage.setItem("idCliente", dados.id)
    dadosTela.id = dados.id
    dadosTela.cpf = dados.cpf
    dadosTela.nome = dados.nome

    handleShowCadastro(dadosTela)
  }

  return (
    <div className="container">
      <br />
      <br />
      <TableClientes atualizacao={atualizacao} setValoresEdicao={editar} />
      <ModalCadastroCliente
        show={showCadastro}
        handleCadastro={handleCadastro}
        handleClose={handleCloseCadastro}
        inicializacaoEdicao={inicializacaoEdicao}
        estahEmEdicao={estahEmEdicao}
      />
    </div>
  )
}

export default Clientes
