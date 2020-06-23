import React, { Fragment } from 'react';

//Components
//Layout
import Header from '../Layout/Header/header';
import ScriptMain from '../Layout/Main/Script/script_main';
import Footer from '../Layout/Footer/footer';


function Script() {
  return (
    <div className="layout" id="script">
      <Header />
      <ScriptMain />
      <Footer />
    </div>
  )
}

export default Script;