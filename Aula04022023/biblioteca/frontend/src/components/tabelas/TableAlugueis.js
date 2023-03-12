import { useEffect, useState, useCallback } from "react"
import "./TableAlugueis.css"
import api from "../../service/api"
import moment from "moment"
import { Table, Button } from 'react-bootstrap'
import { HiOutlineReceiptRefund } from 'react-icons/hi'
import { BiTrash } from "react-icons/bi"

function getDataStr(data) {
  return ("0" + data.getDate()).slice(-2) + 
         ("0" + (data.getMonth() + 1)).slice(-2) + 
         data.getFullYear() 
}

function TableAluguel(props) {
  const [alugueis, setAlugueis] = useState([])
  const [tipoFiltro, setTipoFiltro] = useState(2)
  const [atualizacao, setAtualizacao] = useState(-1)

  const getAlugueisCallback = useCallback(async () => {
    const filtros = props.getFiltros()
    setTipoFiltro(filtros.tipoFiltro)
    const idCliente = (filtros.idCliente && (filtros.idCliente !== '') && (filtros.idCliente !== 'Selecione o cliente')) ? filtros.idCliente : 0
    const idLivro = (filtros.idLivro && (filtros.idLivro !== '') && (filtros.idLivro !== 'Selecione o livro')) ? filtros.idLivro : 0
    const dataInicial = (filtros.dataInicial ? getDataStr(filtros.dataInicial) : "0")
    const dataFinal = (filtros.dataFinal ? getDataStr(filtros.dataFinal) : "0")
    const dataDevolucaoInicial = (filtros.dataDevolucaoInicial ? getDataStr(filtros.dataDevolucaoInicial) : "0")
    const dataDevolucaoFinal = (filtros.dataDevolucaoFinal ? getDataStr(filtros.dataDevolucaoFinal) : "0")
    await api.get(`/alugueis/${filtros.tipoFiltro}/${idCliente}/${idLivro}/${dataInicial}/${dataFinal}/${dataDevolucaoInicial}/${dataDevolucaoFinal}`).then((response) => {      
      setAlugueis(response.data.data)
    }).catch((e) => {
      alert(e)
    })
  }, [props])

  useEffect(() => {
    if (atualizacao !== props.atualizacao) {
      setAtualizacao(props.atualizacao)
      getAlugueisCallback()
    }
  }, [props.atualizacao, atualizacao, getAlugueisCallback])

  function devolver(idAluguel, idLivro, idCliente, data, dataDevolucao) {
    props.setValoresEdicao(idAluguel, idLivro, idCliente, data, dataDevolucao)
  }

  async function excluir(idAluguel) {
    await api
      .delete(`/aluguel/${idAluguel}`)
      .then(() => {
        getAlugueisCallback()
      })
      .catch((e) => {
        alert(e.response.data)
      })
  }

  let totalArrecadado = 0

  return (
    <div className="Container">
      <h2 align="center">Listagem de Aluguéis</h2><br/>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th><div className="th">Livro</div></th>
            <th><div className="th">Cliente</div></th>
            <th><div className="th">Data</div></th>
            {((tipoFiltro === 1) || (tipoFiltro === 2)) && 
             (<th><div className="tdCentralizado">Data Retorno</div></th>)}
            <th><div className="tdCentralizado">Valor Diária</div></th>            
            {((tipoFiltro === 1) || (tipoFiltro === 2)) && 
             (<th><div className="th">Valor Arrecadado</div></th>)}
            {((tipoFiltro === 0) || (tipoFiltro === 2)) && (<th id="ultColuna"></th>)}            
          </tr>
        </thead>
        <tbody>
          {
          alugueis.map((aluguel, idx) => {
            if (aluguel.valorArrecadado) {
                totalArrecadado = totalArrecadado + aluguel.valorArrecadado
            }
            return (
              <tr row={idx} key={Math.random()}>
              <td>{aluguel.tituloLivro}</td>
              <td>{aluguel.nomeCliente}</td>
              <td><div className="tdCentralizado">{moment(aluguel.data).format('DD/MM/YYYY')}</div></td>
              {((tipoFiltro === 1) || (tipoFiltro === 2)) && (<td><div className="tdCentralizado">{aluguel.dataDevolucao && moment(aluguel.dataDevolucao).format('DD/MM/YYYY')}</div></td>)}
              <td><div className="tdDireita">{aluguel.valorDiariaLivro.toFixed(2).replace('.', ',')}</div></td>
              {((tipoFiltro === 1) || (tipoFiltro === 2)) && (<td><div className="tdDireita">{aluguel.valorArrecadado && parseFloat(aluguel.valorArrecadado).toFixed(2).replace('.', ',')}</div></td>)}
              {((tipoFiltro === 0) || (tipoFiltro === 2)) && 
              (<td><div className="tdCentralizado">{
                !aluguel.valorArrecadado && (<>
                  <Button variant="primary" size="sm" onClick={() => {devolver(aluguel.id, aluguel.livroId, aluguel.clienteId, aluguel.data, aluguel.dataDevolucao)}
                  } style={{"background-color": "#581385"}}><HiOutlineReceiptRefund />                  
                  </Button>&nbsp;
                  <Button size="sm"
                    onClick={() => {
                      if (window.confirm("Confirma a exclusão do aluguel?")) {
                        excluir(aluguel.id)
                      }
                    }}
                    style={{"background-color": "#581385"}} >
                    <BiTrash />
                  </Button>
                  </>)}</div></td>
              )}              
              </tr>  
            )
          })}
          {(totalArrecadado > 0) && (
              <tr row={alugueis.length} key={Math.random()}>
              <td colSpan={(tipoFiltro === 2) ? 5 : ((tipoFiltro === 1) ? 5 : 2)}>Total Arrecadado</td>
              <td><div className="tdDireita">{totalArrecadado.toFixed(2).replace('.', ',')}</div></td>
              {tipoFiltro !== 1 && (<td></td>)}
              </tr>  
          )}  
        </tbody>
      </Table>
    </div>
  );
}

export default TableAluguel
