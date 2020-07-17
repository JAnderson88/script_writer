import React from 'react';
import { Redirect } from 'react-router';

//Components
//Layout
import Header from '../Layout/Header/header';
import HomeMain from '../Layout/Main/Home/home_main';
import Footer from '../Layout/Footer/footer';


function Home() {
  if(!JSON.parse(sessionStorage.getItem("authCredentials")).email) return <Redirect to="/login" />
  return (
    <div className="layout" id="home">
      <Header />
      <HomeMain />
      <Footer />
    </div>
  )
}

export default Home;