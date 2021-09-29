import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  // registration-view.jsx
axios.post('https://rocky-bayou-72593.herokuapp.com/users', {
  Username: username,
  Password: password,
  Email: email,
  Birthday: birthday
})
.then(response => {
  const data = response.data;
  console.log(data);
  window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
})
.catch(e => {
  console.log('error registering the user')
});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegistration(username);
  };

  return (
    <Row className="register-wrapper justify-content-md-center">
     <Col xs={12} md={8} lg={6}>
    <Form className="register-form">

      <Form.Group>
      <Form.Label className="username">Username:
      <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Label>
      <Form.Label className="name">Name:
      <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Label>
      <Form.Label className="password">Password:
      <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Label>
      <Form.Label className="email">E-mail:
      <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Form.Label>
      <Form.Label className="birthday">Birth date:
      <Form.Control type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
      </Form.Label>
      </Form.Group>
      
    
      <button className="registerBtn" type="submit" onClick={handleSubmit}>Register </button>
      </Form>
      </Col>
      </Row>
       
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
  }),
  onRegistration: PropTypes.func.isRequired,
};