import React, { useState, Fragment } from 'react';

//Components
//CSS
import './projectIcons.css';

function ProjectIcons({name, identifier, setActiveProject, getProjectDetail }){

  const manageActiveProject = async e => {
    const authCredentials = JSON.parse(sessionStorage.getItem("authCredentials"));
    authCredentials.activeProject = identifier;
    authCredentials.projectName = name;
    sessionStorage.setItem("authCredentials", JSON.stringify(authCredentials));
    setActiveProject(identifier);
    await getProjectDetail();
  }

  return(
    <div className="project_icon" onClick={manageActiveProject}>
      {name}
    </div>
  )
}

export default ProjectIcons;