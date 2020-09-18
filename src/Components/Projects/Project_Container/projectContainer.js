import React, { useState, Fragment } from 'react';

//Components
import ProjectPopup from '../Project_Popup/projectPopup';
import ProjectIcons from '../Project_Icons/projectIcons';
//CSS
import './projectContainer.css';

function ProjectContainer(props) {
  const [openPopup, setPopup] = useState(false);

  const manageAddProjectPopup = () => {
    setPopup((openPopup) ? false : true);
  }

  const displayIcons = projects => {
    return projects.map((project, index) => {
      return <ProjectIcons name={project.name} key={index} identifier={project._id} owner={project.owner} setProjectDetails={props.setProjectDetails}/>
    })
  }

  const popup = (openPopup) ?
    (<ProjectPopup
      projects={props.projects}
      manageAddProjectPopup={manageAddProjectPopup}
      setProjects={props.setProjects}
    />) : "";

  const projectIcons = (props.projects.length > 0) ? displayIcons(props.projects) : "";

  return (
    <Fragment>
      {popup}
      <div className="container" id="project_container">
        <header>
          <button onClick={manageAddProjectPopup}>+ Add Projet</button>
        </header>
        <div className="main_container" id="projects_display">
          {projectIcons}
        </div>
      </div>
    </Fragment>
  )
}
export default ProjectContainer;