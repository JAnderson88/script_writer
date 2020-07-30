import React, { useState, Fragment } from 'react';

//Components
//CSS
import './projectIcons.css';

function ProjectIcons(props){
  const getProjectDetail = async () => {
    console.log("running getProjectDeatail");
    const response = await fetch(`http://localhost:3000/api/project?project=${JSON.parse(sessionStorage.authCredentials).activeProject}`, {
      method: "GET",
      cors: "cors",
      headers: new Headers({
        'content-type': 'application/json',
        'authorization': JSON.parse(sessionStorage.authCredentials).session
      })
    });
    const data = await response.json();
    console.log(data.message);
    const dateString = data.project.createdOn.substring(0,10)
    props.setProjectDetails({
      name: data.project.name,
      createdOn: dateString
    })
  }

  const setActiveProject = async e => {
    const authCredentials = JSON.parse(sessionStorage.getItem("authCredentials"));
    // console.log(props.identifier);
    authCredentials.activeProject = props.identifier;
    // console.log(authCredentials);
    sessionStorage.setItem("authCredentials", JSON.stringify(authCredentials));
    // console.log(sessionStorage.getItem("authCredentials"));
    await getProjectDetail();
  }

  return(
    <div className="project_icon" onClick={setActiveProject}>
      {props.name}
    </div>
  )
}

export default ProjectIcons;