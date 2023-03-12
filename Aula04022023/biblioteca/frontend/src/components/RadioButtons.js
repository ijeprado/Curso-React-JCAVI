import { Form } from "react-bootstrap"

function RadioButtons(props) {
  function radioButtonClick(idx) {
    props.clickRadioButton(idx)
  }

  return(<Form>
    <div key="inline-radio" className="mb-3">
      <Form.Check
        inline
        label="Somente alugados"
        name="group1"
        type="radio"
        id="inline-radio-1"
        onClick={() => {radioButtonClick(0)}}
        size="sm"
      />
      <Form.Check
        inline
        label="Somente entregues"
        name="group1"
        type="radio"
        id="inline-radio-2"
        onClick={() => {radioButtonClick(1)}}
        size="sm"
      />
      <Form.Check
        inline
        label="Todos os aluguéis"
        name="group1"
        type="radio"
        id="inline-radio-3"
        onClick={() => {radioButtonClick(2)}}
        size="sm"
      />
    </div>
  </Form>)
}

export default RadioButtons
