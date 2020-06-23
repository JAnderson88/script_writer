import React, { Fragment } from 'react';

//Components
//Layout
import Header from '../Layout/Header/header';
import StatisticsMain from '../Layout/Main/Statistics/statistics_main';
import Footer from '../Layout/Footer/footer';


function Statistics() {
  return (
    <div className="layout" id="statistics">
      <Header />
      <StatisticsMain />
      <Footer />
    </div>
  )
}

export default Statistics;