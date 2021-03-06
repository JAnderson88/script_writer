import React, { useState, useEffect, memo } from 'react';

//Components
import ParagraphSidebar from '../../../Components/Paragraph/Paragraph_Sidebar/paragraphSidebar';
import ParagraphManager from '../../../Components/Paragraph/Paragraph_Manager/paragraphManager';
//CSS
import './treatment_main.css';

function TreatmentMain() {
  const [detachmentHeight, setDetachmentHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(null);
  const [mainHeight, setMainHeight] = useState(null);
  const [sidebarOffset, setSidebarOffset] = useState(null);
  const [sidebarHeight, setSidebarHeight] = useState(null);
  const [paragraphs, setParagraphs] = useState([]);
  const [activeParagraph, setActiveParagraph] = useState("");
  const [noParagraphs, setNoParagraphs] = useState(false);
  const projectName = (JSON.parse(sessionStorage.authCredentials).projectName) ? JSON.parse(sessionStorage.authCredentials).projectName : '';

  const addParagraph = async () => {
    console.log("Running addParagraph");
    const response = await fetch('http://localhost:3000/api/treatment/edit', {
      method: "PUT",
      cors: "cors",
      headers: new Headers({
        'content-type': 'application/json',
        'authorization': JSON.parse(sessionStorage.authCredentials).session
      }),
      body: JSON.stringify({
        project: JSON.parse(sessionStorage.authCredentials).activeProject,
        data: { method: "add" }
      })
    });
    const data = await response.json();
    console.log(data.message);
    localStorage.treatment = JSON.stringify(data.treatment);
    if (noParagraphs) setNoParagraphs(false);
    setParagraphs(data.treatment.paragraphs);
    setActiveParagraph(data.treatment.paragraphs[data.treatment.paragraphs.length -1].paragraphID);
  }

  const updateParagraph = async (tags = "", body = "", id) => {
    console.log("Running updateParagraph");
    const response = await fetch('http://localhost:3000/api/treatment/edit', {
      method: "PUT",
      cors: "cors",
      headers: new Headers({
        'content-type': 'application/json',
        'authorization': JSON.parse(sessionStorage.authCredentials).session
      }),
      body: JSON.stringify({
        project: JSON.parse(sessionStorage.authCredentials).activeProject,
        data: { method: "edit", tags, body, id }
      })
    });
    const data = await response.json();
    console.log(data.message);
    setParagraphs(data.treatment.paragraphs);
  }

  const getTreatment = async () => {
    console.log("Running getTreatment");
    const response = await fetch(`http://localhost:3000/api/treatment/?project=${JSON.parse(sessionStorage.authCredentials).activeProject}`, {
      method: "GET",
      cors: "cors",
      headers: new Headers({
        'content-type': 'application/json',
        'authorization': JSON.parse(sessionStorage.authCredentials).session
      })
    });
    const data = await response.json();
    console.log(data.message);
    localStorage.treatment = data.treatment;
    if (JSON.parse(data.treatment).paragraphs.length === 0) return setNoParagraphs(true);
    setParagraphs(JSON.parse(data.treatment).paragraphs);
  }

  const reconfigureTreatment = async newParagraphs => {
    console.log("Running reconfigureTreatment");
    const response = await fetch('http://localhost:3000/api/treatment/edit', {
      method: "PUT",
      cors: "cors",
      headers: new Headers({
        'content-type': 'application/json',
        'authorization': JSON.parse(sessionStorage.authCredentials).session
      }),
      body: JSON.stringify({
        project: JSON.parse(sessionStorage.authCredentials).activeProject,
        data: { method: "reconfigure", newParagraphs }
      }),
    });
    const data = await response.json();
    console.log(data.message);
    localStorage.treatment = data.treatment;
    setParagraphs(data.treatment.paragraphs);
  }

  const removeParagraph = async (id) => {
    console.log("Running removeParagraph");
    const response = await fetch('http://localhost:3000/api/treatment/edit', {
      method: "PUT",
      cors: "cors",
      headers: new Headers({
        'content-type': 'application/json',
        'authorization': JSON.parse(sessionStorage.authCredentials).session
      }),
      body: JSON.stringify({
        project: JSON.parse(sessionStorage.authCredentials).activeProject,
        data: { method: "delete", id }
      })
    });
    const data = await response.json();
    console.log(data.message);
    localStorage.treatment = data.treatment;
    if (data.treatment.paragraphs.length === 0) setNoParagraphs(true);
    setParagraphs(data.treatment.paragraphs);
  }

  const onWindowScroll = () => {
    setDetachmentHeight(window.scrollY + sidebarOffset + sidebarHeight);
  }

  const updateComponentDimensions = () => {
    setMainHeight(document.querySelector('.layout > .main').clientHeight);
    setSidebarOffset(document.getElementById("paragraph_sidebar").offsetTop);
  }

  const componentDidMount = async () => {
    if (headerHeight === null) setHeaderHeight(document.querySelector('.layout > header').clientHeight);
    if (mainHeight === null) setMainHeight(document.querySelector('.layout > .main').clientHeight);
    if (sidebarOffset === null) setSidebarOffset(document.getElementById("paragraph_sidebar").offsetTop);
    if (sidebarHeight === null) setSidebarHeight(document.getElementById("paragraph_sidebar").clientHeight);
    window.addEventListener('scroll', onWindowScroll);
    if (Object.keys(paragraphs).length === 0 && !noParagraphs) await getTreatment();
    return () => { window.addEventListener('scroll', onWindowScroll) };
  }

  useEffect(() => {
    if (paragraphs && Object.keys(paragraphs).length > 0 && activeParagraph === "") {
      setActiveParagraph(paragraphs[0].paragraphID);
    }
    componentDidMount();
  }, [componentDidMount]);

  const setScrollBarVisibility = () => {
    return (detachmentHeight > (headerHeight + mainHeight)) ? '' : 
      <ParagraphSidebar 
        paragraphs={paragraphs} 
        setParagraphs={setParagraphs}
        activeParagraph={activeParagraph} 
        setActiveParagraph={setActiveParagraph}
        addParagraph={addParagraph} 
        removeParagraph={removeParagraph} 
        reconfigureTreatment={reconfigureTreatment}
        updateComponentDimensions={updateComponentDimensions}
      />
  };

  const displayParagraphManager = () => {
    return (paragraphs && paragraphs.length > 0) ? 
      <ParagraphManager 
        paragraphs={paragraphs} 
        setActiveParagraph={setActiveParagraph} 
        activeParagraph={activeParagraph} 
        setParagraphs={setParagraphs} 
        updateParagraph={updateParagraph} 
        removeParagraph={removeParagraph} 
      /> 
    : '';
  };

  return (
    <div className="main" id="treatment_main">
      <div className="container" id="project_title_holder">
        {projectName}
      </div>
      {setScrollBarVisibility()}
      {displayParagraphManager()}
    </div>
  );
};

export default memo(TreatmentMain);