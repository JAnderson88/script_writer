import React from 'react';

//Componenets
import LogIn from '../../../Components/Auth/LogIn/login';
import Register from '../../../Components/Auth/Register/register';
//CSS
import '../LogIn/login_main.css';

function LoginMain() {
  const authComponent = (window.location.href.includes('/register')) ? (<Register />) : (<LogIn />);

  return (
    <div className="main" id="login_main">
      {authComponent}
    </div>
  )
}

export default LoginMain;