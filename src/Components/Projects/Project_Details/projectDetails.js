import React, { useState, useEffect, Fragment } from 'react';

//Components
//CSS
import './projectDetails.css';

function ProjectDetails(props) {

  const editProjectDetails = async () => {
    console.log("Editing Project Details");
    const response = await fetch(`http://localhost:3000/api/project/edit`, {
      method: "POST",
      cors: "cors",
      headers: new Headers({
        'content-type': 'application/json',
        'authorization': JSON.parse(sessionStorage.authCredentials).session
      }),
      body: JSON.stringify({
        project: JSON.parse(sessionStorage.authCredentials).activeProject,
        data: {
          name: props.projectDetails.name,
          owner: props.projectDetails.owner
        }
      })     
    });
    const data = await response.json();
    console.log(data.message);
  }

  const deleteProject = async () => {
    console.log("deleting project");
    const response = await fetch(`http://localhost:3000/api/project/delete`, {
      method: "DELETE",
      cors: "cors",
      headers: new Headers({
        'content-type': 'application/json',
        'authorization': JSON.parse(sessionStorage.authCredentials).session
      }),
      body: JSON.stringify({ project: JSON.parse(sessionStorage.authCredentials).activeProject,})
    });
    const data = await response.json();
    console.log(data.message);
  }

  const handleChange = e => {
    const projectDetailsTemp = Object.assign({}, props.projectDetails)
    if (e.target.name === 'name') projectDetailsTemp.name = e.target.value;
    if (e.target.name === 'ownerName') projectDetailsTemp.owner = e.target.value;
    props.setProjectDetails(projectDetailsTemp);
  }

  const handleDelete = e => {
    if(window.confirm("Are you sure you want to delete this project")){
      deleteProject();
    }
  }

  const createForm = () => {
    const value = (props.projectDetails.name) ? props.projectDetails.name : '';

    return (
      <Fragment>
        <input type="text" name="name" value={value} onChange={handleChange} />
        <div className="project_detail_heading" id="created_on">
          Created On: {props.projectDetails.createdOn}
        </div>
        <div className="owner_container">
          <span>Project Owner</span>
          <input type="text" name="ownerName" value={props.projectDetails.owner} onChange={handleChange}/>
        </div>
        <div className="submit_button_container">
          <button onClick={editProjectDetails}>Edit Details</button>
          <button onClick={handleDelete}>Delete Project</button>
        </div>
      </Fragment>
    )
  }

  useEffect(() => {
    props.getProjectDetail();
  }, [])

  return (
    <div className="container" id="project_detail_container">
      {createForm()}
    </div>
  )
}

export default ProjectDetails;