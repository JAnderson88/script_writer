import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

//Componenets
//CSS
import '../LogIn/login.css';

function LogIn() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isAuthenticated, setAuthentication] = useState(false);

  const handleSubmit = async event => {
    if (event.target.name === "email") setEmailValue(event.target.value);
    if (event.target.name === "password") setPasswordValue(event.target.value);
  }

  const submitLogin = async () => {
    console.log("Running submitLogin");
    const inputEmail = document.querySelector('input[name="email"]');
    const inputPassword = document.querySelector('input[name="password"]');
    if (inputEmail.checkValidity() && inputPassword.checkValidity()){
      const response = await fetch('http://localhost:3000/api/user/login', {
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
      console.log(data.message);
      if (response.status === 200) {
        sessionStorage.setItem('authCredentials', JSON.stringify(data.sessionInfo));
        setAuthentication(true);
      } else {
        //Add notification to user that logIn was unsuccesful
      }
    }
  }

  if (isAuthenticated) return <Redirect to="/home" />
  return (
    <div className="lg_card" id="login_card">
      <div className="lg_card_header">Log In</div>
      <div className="input-field">
        <label htmlFor="email">Email</label>
        <input className="validate" type="email" name="email" placeholder="email@email.com" onChange={handleSubmit} />
        <span className="helper-text" data-error="Not a valid email"></span>
      </div>
      <div className="input-field">
        <label htmlFor="password">Password</label>
        <input className="validate" type="password" name="password" onChange={handleSubmit} />
      </div>
      <button onClick={submitLogin}>Log In</button>
    </div>
  )
}

export default LogIn;