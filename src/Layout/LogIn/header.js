import React, { Fragment } from 'react';

//Componenets
//CSS
import '../LogIn/header.css';

function Header() {
  return (
    <Fragment>
      <header>
        <footer>
          <div className="nav_container_right">
            <a href="/login">Log In</a>
            <a href="/register">Register</a>
          </div>
        </footer>
      </header>
    </Fragment>
  )
}

export default Header;