import React, { useState, useEffect } from 'react';

//Components
import ProjectDetails from '../../../Components/Projects/Project_Details/projectDetails';
import ProjectPopup from '../../../Components/Projects/Project_Popup/projectPopup';
import ProjectIcons from '../../../Components/Projects/Project_Icons/projectIcons';
//CSS
import './home_main.css';

function HomeMain() {
  const [projects, setProjects] = useState([]);
  const [projectDetails, setProjectDetails] = useState({});
  const [activeProject, setActiveProject] = useState('');
  const [openPopup, setPopup] = useState(false);

  const updateProjects = async () => {
    setProjects(await fetchProjects());
  }

  const manageAddProjectPopup = () => {
    setPopup((openPopup) ? false : true);
  }

  const displayIcons = projects => {
    return projects.map((project, index) => {
      return <ProjectIcons
        name={project.name}
        key={index}
        identifier={project.identifier}
        owner={project.owner}
        setActiveProject={setActiveProject}
        getProjectDetail={getProjectDetail}
      />
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

  const getProjectDetail = async () => {
    console.log("running getProjectDetail");
    const response = await fetch(`http://localhost:3000/api/project?project=${activeProject}`, {
      method: "GET",
      cors: "cors",
      headers: new Headers({
        'content-type': 'application/json',
        'authorization': JSON.parse(sessionStorage.authCredentials).session
      })
    });
    const data = await response.json();
    console.log(data.message);
    if(data.project){
      const dateString = data.project.createdOn.substring(0, 10);
      setProjectDetails({
        name: data.project.name,
        createdOn: dateString,
        owner: data.project.owner,
        identifier: data.project.identifier,
        scriptType: data.project.scriptType,
        scriptOptions: data.project.scriptOptions
      });
    }
  }

  useEffect(() => {
    updateProjects();
  }, []);

  const popup = (openPopup) ?
    (<ProjectPopup
      projects={projects}
      manageAddProjectPopup={manageAddProjectPopup}
      setProjects={setProjects}
    />) : "";

  if (activeProject && !projectDetails.name){
    getProjectDetail();
  }

  const projectDetail = (projectDetails.name || projectDetails.name === "") ?
    <ProjectDetails
      activeProject={activeProject}
      projectDetails={projectDetails}
      projects={projects}
      setProjects={setProjects}
      setActiveProject={setActiveProject}
      setProjectDetails={setProjectDetails}
      getProjectDetail={getProjectDetail}
    /> : "";
  const projectIcons = (projects.length > 0) ? displayIcons(projects) : "";

  return (
    <div className="main" id="home_main">
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
  );
}

export default HomeMain;