import React, { Fragment } from 'react';

//Components
//Layout
import Header from '../Layout/Header/header';
import TimelineMain from '../Layout/Main/Timeline/timeline_main';
import Footer from '../Layout/Footer/footer';


function Timeline() {
  return (
    <div className="layout" id="timeline">
      <Header />
      <TimelineMain />
      <Footer />
    </div>
  )
}

export default Timeline;