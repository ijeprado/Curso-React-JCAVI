import { useEffect, useRef, useState } from "react";
import { Modal, Form, InputGroup, Button, Col } from "react-bootstrap";

import api from "../../service/api";

function ModalCadastroCliente(props) {
  const formRefs = {cpf: useRef(null), nome: useRef(null)}
  const [formData, setFormData] = useState({ cpf: "", nome: "", id: "" });

  useEffect(() => {
    if (props.estahEmEdicao()) {
      let cliente = null;
      cliente = props.inicializacaoEdicao();
      if (cliente) {
        setFormData({
          id: cliente.id,
          cpf: cliente.cpf,
          nome: cliente.nome,
        });
      }
    } else {
      setFormData({ id: "", cpf: "", nome: "" });
    }
  }, [props]);

  async function cadastrarCliente() {
    if (formData.cpf.length === 0) {
      alert("CPF não foi informado")
      formRefs.cpf.current.focus()
      return;
    } else if (formData.nome.length === 0) {
      alert("Nome não foi informado");
      formRefs.nome.current.focus()
      return;
    }
    if (props.estahEmEdicao()) {
      await api
        .put("/cliente", {
          cpf: formData.cpf,
          nome: formData.nome,
          id: formData.id
        })
        .then(() => {
          alert("Alteração realizada com sucesso");
          props.handleCadastro();
          props.handleClose();
        })
        .catch((e) => {
          alert(e);
        });
    } else {
      await api
        .post("/cliente", {
          cpf: formData.cpf,
          nome: formData.nome,
        })
        .then(() => {
          alert("Cadastro realizado com sucesso");
          props.handleCadastro();
          props.handleClose();
          setFormData({ cpf: "", nome: "", id: "" });
        })
        .catch((e) => {
          alert(e);
        });
    }
  }

  function changeHandler(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.estahEmEdicao() ? "Alteração de cliente" : "Novo cliente"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-2 mt-3 w-50">
          <Col sm="6">
          <Form.Control
            name="cpf"
            value={formData.cpf}
            onChange={changeHandler}
            ref={formRefs.cpf}
            placeholder="CPF"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            size="sm"
          /></Col>
        </InputGroup>
        <InputGroup className="mb-2 mt-3 w-50">
          <Form.Control
            name="nome"
            value={formData.nome}
            onChange={changeHandler}
            ref={formRefs.nome}
            placeholder="Nome"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            size="sm"
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose} size="sm">
          Fechar
        </Button>
        <Button variant="primary" onClick={cadastrarCliente} size="sm" style={{"background-color": "#581385"}}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCadastroCliente;
