import React, { useState, useEffect, Fragment } from 'react';

//Components
import LogOut from '../../Auth/LogOut/logout';
//CSS
import '../Navbar/navbar.css';

function Navbar() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [navigationBarOpen, setNavigationBarOpen] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', e => {
      setWindowWidth(window.innerWidth);
    });
  })

  const renderNavigationBar = () => {
    if (navigationBarOpen) {
      return (
        <div className="open">
          <ul className="navbar">
            <li><a href="/">Home</a></li>
            <li><a href="/treatment">Treatment</a></li>
            <li><a href="/timeline">Timeline</a></li>
            <li><a href="/charachters">Charachters</a></li>
            <li><a href="/script">Script</a></li>
            <li><a href="/statistics">Statistics</a></li>
            <li><LogOut /></li>
          </ul>
        </div>
      )
    }
  }

  const renderNavigation = () => {
    if (windowWidth < 415) {
      return (
        <Fragment>
          <button onClick={() => { (navigationBarOpen === false) ? setNavigationBarOpen(true) : setNavigationBarOpen(false); }}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </button>
          {renderNavigationBar()}
        </Fragment>
      )
    } else {
      return (
        <ul className="navbar">
          <li><a href="/">Home</a></li>
          <li><a href="/treatment">Treatment</a></li>
          <li><a href="/timeline">Timeline</a></li>
          <li><a href="/charachters">Charachters</a></li>
          <li><a href="/script">Script</a></li>
          <li><a href="/statistics">Statistics</a></li>
          <li><LogOut /></li>
        </ul>
      )
    }
  }

  return (
    <Fragment>
      {renderNavigation()}
    </Fragment>
  )
}

export default Navbar;