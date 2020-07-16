import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';


//Components
//Layout
import Header from '../Layout/LogIn/header';
import LogInMain from '../Layout/Main/LogIn/login_main';
import Footer from '../Layout/LogIn/footer';


function Index() {
  const [isAuthenticated, setAuthentication] = useState(sessionStorage.getItem("authCredentials"));

  if(isAuthenticated) return <Redirect to="/home" />

  return (
    <div className="layout" id="index">
      <Header />
      <LogInMain />
      <Footer />
    </div>
  )
}

export default Index;