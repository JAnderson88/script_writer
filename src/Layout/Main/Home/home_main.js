import React, { useState, useEffect } from 'react';

//Components
import ProjectContainer from '../../../Components/Projects/Project_Container/projectContainer';
import ProjectDetails from '../../../Components/Projects/Project_Details/projectDetails';
import ProjectPopup from '../../../Components/Projects/Project_Popup/projectPopup';
import ProjectIcons from '../../../Components/Projects/Project_Icons/projectIcons';
//CSS
import './home_main.css';

function HomeMain() {
  const [projects, setProjects] = useState([]);
  const [projectDetails, setProjectDetails] = useState({});
  const [openPopup, setPopup] = useState(false);

  const updateProjects = async () => {
    setProjects(await fetchProjects())
  }

  const manageAddProjectPopup = () => {
    console.log("Opening/Clogsing Popup")
    setPopup((openPopup) ? false : true);
  }

  const displayIcons = projects => {
    return projects.map((project, index) => {
      return <ProjectIcons name={project.name} key={index} identifier={project._id} owner={project.owner} setProjectDetails={setProjectDetails}/>
    })
  }

  const fetchProjects = async () => {
    console.log("running fetchProjects");
    const response = await fetch('http://localhost:3000/api/project', {
      method: "GET",
      cors: "cors",
      headers: new Headers({
        'content-type': 'application/json', 
        'authorization': JSON.parse(sessionStorage.authCredentials).session
      })
    });
    const data = await response.json();
    return data.projects;
  }

  useEffect(() => {
    updateProjects()
  }, []);

  const popup = (openPopup) ?
  (<ProjectPopup
    projects={projects}
    manageAddProjectPopup={manageAddProjectPopup}
    setProjects={setProjects}
  />) : "";
  const projectDetail = (projectDetails.name || projectDetails.name === "") ? <ProjectDetails projectDetails={projectDetails} setProjectDetails={setProjectDetails}/> : "";
  const projectIcons = (projects.length > 0) ? displayIcons(projects) : "";

  return (
    <div className="main" id="home_main">
      {/* {projectContainer} */}
      {/* <ProjectContainer projects={projects} setProjects={setProjects} setProjectDetails={setProjectDetails}/> */}
      {popup}
      <div className="container" id="project_container">
        <header>
          <button onClick={manageAddProjectPopup}>+ Add Projet</button>
        </header>
        <div className="main_container" id="projects_display">
          {projectIcons}
        </div>
      </div>
      {projectDetail}
    </div>
  )
}

export default HomeMain;