import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

//Componenets
//CSS

import '../Register/register.css';

function Register(){
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isAuthenticated, setAuthentication] = useState(false);

  const handleSubmit = event => {
    if (event.target.name === "email") setEmailValue(event.target.value)
    if (event.target.name === "password") setPasswordValue(event.target.value)
  } 

  const submitRegister = async () => {
    const response = await fetch('http://localhost:3000/api/user/add', {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue
      })
    });
    const data = await response.json();
    console.log(data)
    sessionStorage.setItem('authCredentials', JSON.stringify(data.sessionInfo));
    setAuthentication(true);
  }

  if(isAuthenticated) return <Redirect to="/home" />

  return (
    <div className="lg_card" id="register_card">
      <div className="lg_card_header"> Register </div>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" placeholder="email@email.com" onChange={handleSubmit}/>
      <label htmlFor="password">Password</label>
      <input type="password" name="password" onChange={handleSubmit} />
      <button onClick={submitRegister}>Register</button>
    </div>
  );
}

export default Register;