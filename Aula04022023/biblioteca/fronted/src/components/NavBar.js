import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Locação de Livros</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Listagens" id="listagens">
              <NavDropdown.Item href="livros">Livros</NavDropdown.Item>
              <NavDropdown.Item href="clientes">Clientes</NavDropdown.Item>
              <NavDropdown.Item href="alugueis">Aluguéis</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Cadastrar" id="basic-nav-dropdown">
              <NavDropdown.Item href="livro">Livro</NavDropdown.Item>
              <NavDropdown.Item href="cliente">Cliente</NavDropdown.Item>
              <NavDropdown.Item href="aluguel">Aluguel</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar