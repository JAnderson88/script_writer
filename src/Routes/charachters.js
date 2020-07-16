import React from 'react';

//Components
//Layout
import Header from '../Layout/Header/header';
import CharachterMain from '../Layout/Main/Charachter/charachter_main';
import Footer from '../Layout/Footer/footer';

function Charachter() {
  return (
    <div className="layout" id="charachter">
      <Header />
      <CharachterMain />
      <Footer />
    </div>
  )
}

export default Charachter;