import React, { Fragment } from 'react';

//CSS
import '../Navbar/navbar.css';

function Navbar() {
  return (
    <Fragment>
      <ul className="navbar">
        <li><a href="/">Home</a></li>
        <li><a href="/treatment">Treatment</a></li>
        <li><a href="/timeline">Timeline</a></li>
        <li><a href="/charachters">Charachters</a></li>
        <li><a href="/script">Script</a></li>
        <li><a href="/statistics">Statistics</a></li>
      </ul>
    </Fragment>
  )
}

export default Navbar;