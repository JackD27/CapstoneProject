import FormInput from "./FormInput";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import getUserInfo from '../../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import {Col, Row, Button, Card} from 'react-bootstrap';
import LandingPage from "./Landingpage";
import AlertFunction from './AlertMessage';
import "./loginPage.css"

const url = "http://localhost:8085/login";




const Login2 = () => {

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const [user, setUser] = useState(null)
  const [alert, setAlert] = useState(false)
  const [error, setError] = useState("");
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {

    const obj = getUserInfo(user)
    setUser(obj)

  }, []);

  if(user) {
    navigate('/')
    return
  }

  

  const footMessage = () => {
    if (error) {
      return <AlertFunction variant="danger" show={true} message={error}/>
    } 
  };

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Incorrect characters.",
      label: "Username",
      pattern: "^[A-Za-z0-9]{5,15}$",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Password",
      errorMessage: "Invalid password.",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post(url, values);
      console.log(res)
      const { accessToken } = res;
      //store token in localStorage
      localStorage.setItem("accessToken", accessToken);
      navigate("/");
      window.location.reload();
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  if(user) {
    navigate('/home')
    return
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Container style={{ marginTop: 150}}>
      <Row>
        <Col>
        <LandingPage></LandingPage>
      </Col>
      <Col>
    <Card className="loginCard">
      <Card.Header><h2 class="text-white">Log In</h2></Card.Header>
      <Card.Body>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        </Card.Body>
        <Card.Footer>
        <Button variant="success" onClick={handleSubmit}>Log In</Button>
        <Button variant="outline-success" style={{marginLeft: 250, color: "white"}} onClick={() => navigate("/register")}>Create Account?</Button>
        {footMessage()}
        </Card.Footer>
    </Card>
    </Col>
      </Row>
    </Container>
  );
};

export default Login2;