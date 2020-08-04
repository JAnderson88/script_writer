import React, { useState, Fragment } from 'react';

//Components
//CSS
import './projectIcons.css';

function ProjectIcons(props){

  const setActiveProject = async e => {
    const authCredentials = JSON.parse(sessionStorage.getItem("authCredentials"));
    authCredentials.activeProject = props.identifier;
    localStorage.activeProject = props.identifier;
    console.log(authCredentials);
    sessionStorage.setItem("authCredentials", JSON.stringify(authCredentials));
    await props.getProjectDetail();
  }

  return(
    <div className="project_icon" onClick={setActiveProject}>
      {props.name}
    </div>
  )
}

export default ProjectIcons;