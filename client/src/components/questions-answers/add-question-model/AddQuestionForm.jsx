import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { API_KEY, API_URL } from '../../../config/config.js';
import { actionCreators } from '../../../redux/index.js';
import { bindActionCreators } from 'redux';

const AddQuestionForm = ({ product_name, product_id, closeAddQuestionModal }) => {


  const addQuestionrModalIsOpen = useSelector(state => state.addQuestionModalIsOpen);
  const dispatch = useDispatch();
  const { fetchQuestionList } = bindActionCreators(actionCreators, dispatch);
  const [ body, setBody ] = useState('');
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ validateBody, setValidateBody ] = useState(false);
  const [ validateName, setValidateName ] = useState(false);
  const [ validateEmail, setValidateEmail ] = useState(false);
  const [submited, setSubmited] = useState(false);

  const productIdNumber = Number(product_id);

  const handleValidation = () =>{
    if(body.length !== 0 ){
      setValidateBody(true);
    }
    if(name.length !== 0 ){
      setValidateName(true);
    }
    if(email.length !== 0 ){
      setValidateEmail(true);
    }
  };

  const handleBodyChange = (e) =>  {
    setBody(e.target.value);
    if(body.length !== 0 ){
      setValidateBody(true);
    }
  };

  const handleNameChange = (e) =>  {
    setName(e.target.value);
    if(name.length !== 0 ){
      setValidateName(true);
    }
  };
  const handleEmailChange = (e) =>  {
    setEmail(e.target.value);
    if(email.length !== 0 ){
      setValidateEmail(true);
    }
  };

  const handleSubmit = (e)=> {
    e.preventDefault();
    setSubmited(true);
    // handleValidation();
    if(validateBody && validateName && validateEmail ) {
      dispatch({ type: 'TOGGLE_ADD_QUESTION'});
    }

    axios.post(`${API_URL}/qa/questions`, {
      body: body,
      name: name,
      email: email,
      product_id: productIdNumber
    }, { headers: { Authorization: API_KEY } })
    .then((res) => {
      console.log(res.data);
      fetchQuestionList(product_id, 1, 1000);

    })
    .catch(err => console.log('error from AddQuestionForm handlesubmit post request', err));
  };
  return (

  <Form onSubmit={handleSubmit}>

    <Form.Group controlId="question">
      <Form.Label>Your Question: </Form.Label>
        <Form.Control
          as="textarea"
          value={body}
          onChange={e => handleBodyChange(e)}
          placeholder="Your Question"
          style={{ height: '100px' }}
          />
          {!validateBody && submited ? <div className="validate">This field can not be empty</div> : null}
    </Form.Group>

    <Form.Group controlId="nickName">
      <Form.Label>What is your nickname: </Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={e => handleNameChange(e)}
          placeholder="What is your nickname?"
          />
          {!validateName && submited ? <div className="validate">This field can not be empty</div> : null}
    </Form.Group>

    <Form.Group controlId="email">
      <Form.Label>Your email: </Form.Label>
        <Form.Control
          type="text"
          placeholder="Your email"
          maxLength={60}
          value={email}
          onChange={e => handleEmailChange(e)}
          />
          {!validateEmail && submited ? <div className="validate">This field can not be empty</div> : null}
    </Form.Group>
    <br/>
      <Container className="modalTwoButtons">
        <Row className="flex-nowrap text-center">
          <Col className="flex-sm-fill">
            <Button
              type="submit"
              variant="outline-primary"
              size="sm"
              >Submit your Question
            </Button>
          </Col>

          <Col className="flex-sm-fill">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={closeAddQuestionModal}>
              Close
            </Button>
          </Col>
        </Row>
        </Container>
    <br />
  </Form>

  )

}

export default AddQuestionForm;