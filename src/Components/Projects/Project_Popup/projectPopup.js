import React, { useState, Fragment } from 'react';

//Components
//CSS
import './projectPopup.css'

function ProjectPopup(props) {
  const [projectName, setProjectName] = useState("");

  const handleSubmit = event => {
    if (event.target.id === "project_name") setProjectName(event.target.value);
  }

  const addProject = async e => {
    const inputLine = document.querySelector("#addProjectPopup input");
    if (inputLine.value === "") {
      console.log("Please add a name to your project to continue");
      return;
    }
    console.log("Running addProject");
    const response = await fetch('http://localhost:3000/api/project/add', {
      method: "POST",
      cors: "cors",
      headers: new Headers({
        'content-type': 'application/json',
        'authorization': JSON.parse(sessionStorage.authCredentials).session
      }),
      body: JSON.stringify({
        name: projectName
      })
    });
    const data = await response.json();
    console.log(data.message);
    if(response.status === 200){
      const projectTemps = [...props.projects];
      const newProject = data.project;
      let session = JSON.parse(sessionStorage.getItem("authCredentials"));
  
      session.activeProject = data.activeProject;
      localStorage.activeProject = data.activeProject;
      projectTemps.push(newProject)
  
      sessionStorage.setItem("authCredentials", JSON.stringify(session));
      props.setProjects(projectTemps);
      props.manageAddProjectPopup();
    }
  }

  return (
    <div id="addProjectPopup">
      <header>
        <button onClick={props.manageAddProjectPopup}>X</button>
      </header>
      <div className="project_container_form">
        <span className="inline">Name</span>
        <span className="inline" onChange={handleSubmit}>
          <input type="text" placeholder="       ProjectNamexxxxx" id="project_name" />
        </span>
      </div>
      <footer>
        <button onClick={addProject}> Submit </button>
      </footer>
    </div>
  )
}

export default ProjectPopup;