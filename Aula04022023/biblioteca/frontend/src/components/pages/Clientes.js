import TableClientes from "../tabelas/TableClientes"
import { useState } from "react"
import ModalCadastroCliente from "../modais/ModalCadastroCliente"
import { Button } from "react-bootstrap"
import api from "../../service/api"

let dadosTela = { id: "", cpf: "", nome: ""}

function Clientes() {
  const [showCadastro, setShowCadastro] = useState(false)
  const [atualizacao, setAtualizacao] = useState(0)
  const [mostreCampoArquivoImportacao, setMostreCampoArquivoImportacao] = useState(false)
  const [arquivoDeClientes, setArquivoDeClientes] = useState(null)

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

  const uploadArquivoClientes = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append("arquivo", arquivoDeClientes)
    await api.post('/importarClientes', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(() => {        
        alert('Importação realizada com sucesso')
      })
      .catch((e) => {
        alert(e)
      })
    setMostreCampoArquivoImportacao(false)
    setAtualizacao(atualizacao + 1)  
  }

  return (
    <div className="container">
      <br />
      <br />
      <TableClientes atualizacao={atualizacao} setValoresEdicao={editar} />
      <table><tbody><tr><td>{!mostreCampoArquivoImportacao &&
        (<Button size="sm" onClick={() => {setMostreCampoArquivoImportacao(true)}} style={{"background-color": "#581385"}}>Importação</Button>)}</td></tr></tbody></table>
      {mostreCampoArquivoImportacao && (
      <div>
        <form onSubmit={uploadArquivoClientes} enctype="multipart/form-data" method="post">        
        <input type="file" name="arquivoDeClientes" onChange={(e) => { setArquivoDeClientes(e.target.files[0])}}/><br/><br/>
        <button type="submit">Importar</button>
        </form>
      </div>)}  
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
