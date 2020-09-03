import React, { Fragment } from 'react';
import { Redirect } from 'react-router';

//Components
//Layout
import Header from '../Layout/Header/header';
import TreatmentMain from '../Layout/Main/Treatment/treatment_main';
import Footer from '../Layout/Footer/footer';


function Treatment(){
  if (
    sessionStorage.getItem("authCredentials") === null ||
    !JSON.parse(sessionStorage.getItem("authCredentials")).session
  ) return <Redirect to="/login" />
  return(
    <div className="layout" id="treatment">
      <Header />
      <TreatmentMain />
      <Footer />
    </div>
  )
}

export default Treatment;