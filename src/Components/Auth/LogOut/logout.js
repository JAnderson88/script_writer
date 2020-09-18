import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';

//Components
//CSS
import './logout.css';

function Logout() {
  const [isLoggedOut, setLoggedOut] = useState(false);

  const submitLogout = async e => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/api/user/logout', {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify({
        session: sessionStorage.getItem('authCredentials')
      })
    });
    const data = await response.json();
    console.log(data);
    localStorage.removeItem('activeProject');
    sessionStorage.removeItem('authCredentials');
    setLoggedOut(true);
  }

  if(isLoggedOut) return <Redirect to="/" />
  return (
    <Fragment>
      <a id="logout" onClick={submitLogout}>Log Out</a>
    </Fragment>
  );
}

export default Logout;