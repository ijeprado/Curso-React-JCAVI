import React from 'react'
import { Button } from 'react-bootstrap'

function Cadastros() {
  return (
    <table width="80%" align="center"><tbody><tr><td><br/><br/></td></tr>
      <tr><td align="center">
      <Button variant="primary" onClick={() => {window.location = "/livro"}} style={{"background-color": "#581385"}}>
        Livro
      </Button></td><td align="center">
      <Button variant="primary" onClick={() => {window.location = "/cliente"}} style={{"background-color": "#581385"}}>
        Cliente
      </Button></td><td align="center">
      <Button variant="primary" onClick={() => {window.location = "/aluguel"}} style={{"background-color": "#581385"}}>
        Aluguel
      </Button></td><td align="center">
      <Button variant="primary" onClick={() => {window.location = "/categoria"}} style={{"background-color": "#581385"}}>
        Categoria de Livro
      </Button></td></tr></tbody></table>
  )
}

export default Cadastros