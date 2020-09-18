import React, { useState, useEffect, Fragment } from 'react';
import M from 'materialize-css';

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
          owner: props.projectDetails.owner,
          scriptType: props.projectDetails.scriptType,
          scriptOptions: props.projectDetails.scriptOptions
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
      body: JSON.stringify({ project: JSON.parse(sessionStorage.authCredentials).activeProject })
    });
    const data = await response.json();
    console.log(data.message);
    updateAuthCredentials('activeProject');
    updateAuthCredentials('projectName');
  }

  const updateAuthCredentials = removedElement => {
    if(sessionStorage.authCredentials){
      const authCredentials = JSON.parse(sessionStorage.authCredentials);
      const temp = {};
      Object.keys(authCredentials).forEach(key => {
        if(key !== removedElement) temp[key] = authCredentials[key]
      });
      console.log(temp);
      sessionStorage.setItem('authCredentials', JSON.stringify(temp));
    }
  }

  const handleChange = e => {
    const projectDetailsTemp = Object.assign({}, props.projectDetails);
    if (e.target.name === 'name') projectDetailsTemp.name = e.target.value;
    if (e.target.name === 'ownerName') projectDetailsTemp.owner = e.target.value;
    if (e.target.name === 'scriptType') projectDetailsTemp.scriptType = e.target.value;
    if (e.target.name === 'scriptTypeOptions') projectDetailsTemp.scriptOptions = e.target.value;
    props.setProjectDetails(projectDetailsTemp);
  }

  const handleDelete = e => {
    if (window.confirm("Are you sure you want to delete this project")) {
      deleteProject();
    }
  }

  const setSelectedOptionForScreenType = () => {
    const options = document.getElementById('scriptType');
    const index = Array.from(options.options).findIndex(ele => ele.value === props.projectDetails.scriptType);
    options.options[index].setAttribute("selected", "selected");
  }

  const createForm = () => {
    const value = (props.projectDetails.name) ? props.projectDetails.name : '';
    const scriptTypeOptions = 
      (props.projectDetails.scriptType === 'Movie') ? 
        "Number of Acts" :
      (props.projectDetails.scriptType === 'Episodic') ? 
        "Number of Episodes" : ""

    return (
      <Fragment>
        <input type="text" name="name" value={value} onChange={handleChange} />
        <div className="container" id="created_on">
          Created On: {props.projectDetails.createdOn}
        </div>
        <div className="container" id="owner_container">
          <span>Project Owner</span>
          <input type="text" name="ownerName" value={props.projectDetails.owner} onChange={handleChange} />
        </div>
        <div className="container" id="script_type_container">
          <span>Script Type</span>
          <select name="scriptType" id="scriptType" onChange={handleChange}>
            <option value="Movie">Movie</option>
            <option value="Episodic">Episodic</option>
          </select>
        </div>
        <div className="container" id="script_type_options">
          <span>{scriptTypeOptions}</span>
          <input type="number" name="scriptTypeOptions" value={props.projectDetails.scriptOptions} onChange={handleChange} />
        </div>
        <div className="container" id="submit_button_container">
          <button onClick={editProjectDetails}>Edit Details</button>
          <button onClick={handleDelete}>Delete Project</button>
        </div>
      </Fragment>
    )
  }

  useEffect(() => {
    M.AutoInit();
    setSelectedOptionForScreenType();
    props.getProjectDetail();
  }, [])

  return (
    <div className="container" id="project_detail_container">
      {createForm()}
    </div>
  );
}

export default ProjectDetails;