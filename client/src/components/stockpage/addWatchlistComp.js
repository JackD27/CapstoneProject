import FormInput from "../register/FormInput";
import React, { useState} from "react";
import axios from "axios";
import getUserInfo from '../../utilities/decodeJwt';
import {Button, Card, Form} from 'react-bootstrap';
import AlertFunction from '../register/AlertMessage';
import "../register/loginPage.css"

const url = "http://localhost:8085/addWatchlistItem";

const AddWatchlistComp = () => {

  const [error, setError] = useState("");
  const [isSuccess, setSuccess] = useState(null);

  const footMessage = () => {
    if (error) {
      return <AlertFunction variant="danger" show={true} message={error}/>
    } 
    if(isSuccess){
      return <AlertFunction variant="success" show={true} message="Submitted stock to watchlist."/>
    }
  };

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      handleSubmit()
    }
  }


  const [values, setValues] = useState({
    ticker: "",
    userId: getUserInfo().user_id,
  });
  
  const inputs = [
    {
      id: 1,
      name: "ticker",
      type: "text",
      placeholder: "Ticker",
      label: "Stock Ticker",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    try {
      const { data: res } = await axios.post(url, values);
      
      setValues({
        ticker: "",
        userId: getUserInfo().user_id,
      });
      setError(false);
      setSuccess(true)
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


  const onChange = async (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Card className="loginCard">
      <Card.Header><h2 class="text-white">Add Stock to Watchlist</h2></Card.Header>
      <Card.Body>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
            onKeyPress={handleKeyPress}
          />
        ))}
        </Card.Body>
        <Card.Footer>
        <Button variant="success" onClick={handleSubmit}>Submit</Button>
        {footMessage()}
        </Card.Footer>
    </Card>
  );
};

export default AddWatchlistComp;