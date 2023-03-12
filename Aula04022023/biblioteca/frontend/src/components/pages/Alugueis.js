import TableAlugueis from "../tabelas/TableAlugueis"
import { useState } from "react"
import ModalCadastroAluguel from "./../modais/ModalCadastroAluguel"
import FiltroCollapse from '../FiltroCollapse'

let dadosTela = {id: "", idLivro: "", idCliente: "", data: null, dataDevolucao: null}

function Alugueis() {
  const [filtros, setFiltros] = useState({tipoFiltro: 2, idCliente: "", idLivro: "", dataInicial: null, dataFinal: null,
    dataDevolucaoInicial: null, dataDevolucaoFinal: null})
  const [showCadastroAluguel, setShowCadastroAluguel] = useState(false)
  /* A variável autalizacao serve pra tabela saber se tem que ser renderizada novamente ou não */
  const [atualizacao, setAtualizacao] = useState(0)
  const handleCloseCadastroAluguel = () => {
    setShowCadastroAluguel(false)
    dadosTela = {id: "", idLivro: "", idCliente: "", data: null, dataDevolucao: null}
    sessionStorage.setItem('idAluguel', 0)
  }
  const handleShowCadastroAluguel = (idAluguel, idLivro, idCliente, data, dataDevolucao) => {
    if (sessionStorage.getItem("idAluguel") && (sessionStorage.getItem("idAluguel") !== '0')) {
      dadosTela = {id: idAluguel, idLivro: idLivro, idCliente: idCliente, data: data ? new Date(data) : null, dataDevolucao: dataDevolucao ? new Date(dataDevolucao) : null}
    }
    setShowCadastroAluguel(true)
  }
  const handleCadastroAluguel = () => setAtualizacao(atualizacao + 1)

  const editar = (idAluguel, idLivro, idCliente, data, dataDevolucao) => {
    sessionStorage.setItem('idAluguel', idAluguel)
    handleShowCadastroAluguel(idAluguel, idLivro, idCliente, data, dataDevolucao)
  }

  function estahEmEdicao() {
    return sessionStorage.getItem("idAluguel") && (sessionStorage.getItem('idAluguel') !== '0')
  }

  /* callback a ser utilizado pela tela de devolução de livro */
  const inicializacaoEdicao = () => {
    if (dadosTela.id) {
      return dadosTela
    }
    else {
      return null
    }     
  }

  function getTipoFiltro() {
    return filtros.tipoFiltro
  }

  function filtrar(formData) {
    setFiltros(formData)
    setAtualizacao(atualizacao + 1)
  }

  function filtrarRadioButton(tipoFiltro) {
    setFiltros({...filtros, tipoFiltro: tipoFiltro})
  }

  function getFiltros() {
    return filtros
  }

  return (
    <div className="container">
      <br /><br />
      <TableAlugueis atualizacao={atualizacao} 
                     setValoresEdicao={editar} getTipoFiltro={getTipoFiltro}
                     getFiltros={getFiltros}/>
      <ModalCadastroAluguel show={showCadastroAluguel} handleCadastro={handleCadastroAluguel}
      handleClose={handleCloseCadastroAluguel} estahEmEdicao={estahEmEdicao} 
      inicializacaoEdicao={inicializacaoEdicao} />
      <FiltroCollapse filtrar={filtrar} filtrarRadioButton={filtrarRadioButton}
        setFiltro={filtrarRadioButton} />
    </div>
  )
}

export default Alugueis