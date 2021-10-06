import React, { useState } from "react";
//import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");

  // registration-view.jsx
axios.post('https://rocky-bayou-72593.herokuapp.com/users', {
  Username: username,
  Password: password,
  Email: email,
  Birthday: birthdate
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
    console.log(username, password, email, birthdate);
    props.onRegistration(username);
  };

  return (
      <Form className="register justify-content-md-center">
        <Row>
        <Form.Group controlId="formName">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" value={name} onChange={e => 
            setName(e.target.value)} />
          {Object.keys(nameError).map((key) => {
            return (
              <div key={key}>
                {nameError[key]}
              </div>
            );
          })}
        </Form.Group>
      </Row>
      
      <Row>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={username} onChange={e => 
          setUsername(e.target.value)} />
        {Object.keys(usernameError).map((key) => {
          return (
            <div key={key}>
              {usernameError[key]}
            </div>
          );
        })}
      </Form.Group>
      </Row>

      <Row>
        <Form.Group controlId="formPassword">
          <Form.Label>Create Password:</Form.Label>
          <Form.Control type="password" value={password} onChange={e => 
            setPassword(e.target.value)} />
          {Object.keys(passwordError).map((key) => {
            return (
              <div key={key}>
                {passwordError[key]}
              </div>
            );
          })}
        </Form.Group>
      </Row>

      <Row>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
          {Object.keys(emailError).map((key) => {
            return (
              <div key={key}>
                {emailError[key]}
              </div>
            );
          })}
        </Form.Group>
      </Row>

      <Row>
      <Form.Group controlId="formBirthdate">
        <Form.Label>Birthdate:</Form.Label>
        <Form.Control type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)} />
        {Object.keys(birthdateError).map((key) => {
          return (
            <div key={key}>
              {birthdateError[key]}
            </div>
          );
        })}
      </Form.Group>
      </Row>
      
    
      <Row>
      <span>
        <Button type="submit" onClick={handleSubmit}>Submit</Button>
        {' '}
        <Link to="/">
          <Button variant="secondary" type="button">Back</Button>
        </Link>
      </span>
      </Row>
    </Form >
  );
}

/*RegistrationView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
  }),
  onRegistration: PropTypes.func.isRequired,
};*/