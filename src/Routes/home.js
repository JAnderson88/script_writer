import React from 'react';

//Components
//Layout
import Header from '../Layout/Header/header';
import HomeMain from '../Layout/Main/Home/home_main';
import Footer from '../Layout/Footer/footer';


function Home() {
  return (
    <div className="layout" id="home">
      <Header />
      <HomeMain />
      <Footer />
    </div>
  )
}

export default Home;