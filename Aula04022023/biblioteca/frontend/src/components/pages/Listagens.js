import React from 'react'
import { Button } from 'react-bootstrap'

function Listagens() {
  return (
    <table width="80%" align="center"><tbody><tr><td><br/><br/></td></tr>
      <tr><td align="center">
      <Button variant="primary" onClick={() => {window.location = "/livros"}} style={{"background-color": "#581385"}}>
        Livros
      </Button></td><td align="center">
      <Button variant="primary" onClick={() => {window.location = "/clientes"}} style={{"background-color": "#581385"}}>
        Clientes
      </Button></td><td align="center">
      <Button variant="primary" onClick={() => {window.location = "/alugueis"}} style={{"background-color": "#581385"}}>
        Aluguéis
      </Button></td><td align="center">
      <Button variant="primary" onClick={() => {window.location = "/categorias"}} style={{"background-color": "#581385"}}>
        Categorias de Livro
      </Button></td></tr></tbody></table>
  )
}

export default Listagens