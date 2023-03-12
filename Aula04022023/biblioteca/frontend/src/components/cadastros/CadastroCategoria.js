import { useEffect, useRef, useState } from "react";
import { Form, InputGroup, Button, Col } from "react-bootstrap";

import api from "../../service/api";

function CadastroCategoria(props) {
  const [categorias, setCategorias] = useState()
  const formRefs = {
    descricao: useRef(null),
    classificacao: useRef(null),
    categoriaSuperior: useRef(null),
  };
  const [formData, setFormData] = useState({
    id: "",
    descricao: "",
    classificacao: "",
    categoriaSuperiorId: "",
  });

  useEffect(() => {
    getCategorias()
    if (props.estahEmEdicao()) {
      let categoria = null;
      categoria = props.inicializacaoEdicao();
      if (categoria) {
        setFormData({
          id: categoria.id,
          descricao: categoria.descricao,
          classificacao: categoria.classificacao,
          categoriaSuperiorId: categoria.categoriaSuperiorId,
        });
      }
    } else {
      setFormData({
        id: "",
        descricao: "",
        classificacao: "",
        categoriaSuperiorId: "",
      })
      if (formRefs.classificacao && formRefs.classificacao.current) {        
        formRefs.classificacao.current.focus();
      }
    }
  }, [props, formRefs.classificacao]);

  async function getCategorias() {
    await api.get("/categorias").then((response) => {
      setCategorias(response.data)
    })
  }

  async function cadastrarCategoria() {
    if (formData.descricao.length === 0) {
      alert("Descrição não foi informada");
      formRefs.descricao.current.focus();
      return;
    } else if (formData.classificacao.length === 0) {
      alert("Classificação não foi informada");
      formRefs.classificacao.current.focus();
      return;
    }
    if (props.estahEmEdicao()) {
      await api
        .put("/categoria", {
          descricao: formData.descricao,
          autor: formData.classificacao,
          categoriaSuperiorId: formData.categoriaSuperiorId,
          id: formData.id,
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
        .post("/categoria", {
          descricao: formData.descricao,
          classificacao: formData.classificacao,
          categoriaSuperiorId: formData.categoriaSuperiorId,
        })
        .then(() => {
          setFormData({
            id: "",
            classificacao: "",
            descricao: "",
            categoriaSuperiorId: "",
          });
          formRefs.classificacao.current.focus();
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
    <table width="80%" align="center">
      <tbody>
        <tr>
          <td>
            <br />
            <h1>
              {props.estahEmEdicao()
                ? "Alteração de categoria"
                : "Nova categoria"}
            </h1>
            <InputGroup className="mb-2 mt-3 w-50">
              <Form.Control
                name="classificacao"
                value={formData.classificacao}
                onChange={changeHandler}
                ref={formRefs.classificacao}
                placeholder="Classificação"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                size="sm"
              />
            </InputGroup>
            <InputGroup className="mb-2 mt-3 w-50">
              <Form.Control
                name="descricao"
                value={formData.descricao}
                onChange={changeHandler}
                ref={formRefs.descricao}
                placeholder="Descrição"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                size="sm"
              />
            </InputGroup>
            {categorias && (categorias.length > 0) && (<><Col sm="5">
            <Form.Select
              name="categoriaSuperiorId"
              onChange={changeHandler}
              ref={formRefs.categoriaSuperior}
              value={formData.categoriaSuperiorId}
              aria-label="Default select example"
              size="sm"
            >
              <option>Selecione a categoria superior</option>
              {categorias.map((c, key) => {
                return (
                  <option value={c.id} key={key}>
                    {c.classificacao + " - " + c.descricao}
                  </option>
                )
              })}
            </Form.Select></Col><br/></>)}        
            <Button variant="primary" onClick={cadastrarCategoria} size="sm" style={{"background-color": "#581385"}}>
              Salvar
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default CadastroCategoria;
