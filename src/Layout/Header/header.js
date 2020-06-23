import React, { Fragment } from 'react';

//Componenets
import Navbar from '../../Components/Navigation/Navbar/navbar';
//CSS
import '../Header/header.css';

function Header() {
  return (
    <Fragment>
      <header>
        <Navbar />
      </header>
    </Fragment>
  )
}

export default Header;