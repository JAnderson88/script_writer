import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';

//Components
//Layout
import Header from '../Layout/Header/header';
import HomeMain from '../Layout/Main/Home/home_main';
import Footer from '../Layout/Footer/footer';
//CSS



function Home() {
  if (
    sessionStorage.getItem("authCredentials") === null ||
    !JSON.parse(sessionStorage.getItem("authCredentials")).session
  ) return <Redirect to="/login" />
  return (
    <div className="layout" id="home">
      <Header />
      <HomeMain />
      <Footer />
    </div>
  )
}

export default Home;