import React, { Fragment } from 'react';

//Components
//Layout
import Header from '../Layout/Header/header';
import TreatmentMain from '../Layout/Main/Treatment/treatment_main';
import Footer from '../Layout/Footer/footer';


function Treatment(){
  return(
    <div class="layout" id="treatment">
      <Header />
      <TreatmentMain />
      <Footer />
    </div>
  )
}

export default Treatment;