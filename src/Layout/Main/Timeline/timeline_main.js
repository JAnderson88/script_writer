import React, { useState, useEffect, memo } from 'react';
// import plotsGenerator from '../../../Modules/Test/plotsGenerator';

//Components
import SuggestionContainer from '../../../Components/Suggestions/SuggestionContainer/suggestionContainer';
import SceneSelector from '../../../Components/Scenes/SceneSelector/sceneSelector';
import TimeLineManager from '../../../Components/Timeline/Timeline_Manager/timeline_manager';
//CSS
import './timeline_main.css';

function TimelineMain() {
  const [suggestions, setSuggestions] = useState([]);
  const [plots, setPlots] = useState([]);
  const [acts, setActs] = useState(0);
  const [charachters, setCharachters] = useState([]);
  const [currentPlotIndex, setCurrentPlotIndex] = useState(0);
  const [colorIndexArray, setColorIndexArray] = useState([]);

  const setReferenceIndexes = (plots) => {
    // console.log(plots);
    return plots.map((scene, index) => {
      scene.refrenceIndex = index;
      return scene;
    });
  }

  const getSuggestions = async () => {
    console.log("Running getSuggestions");
    const response = await fetch(`http://localhost:3000/api/suggestion/?project=${JSON.parse(sessionStorage.authCredentials).activeProject}`, {
      method: "GET",
      cors: "cors",
      headers: new Headers({
        'content-type': 'application/json',
        'authorization': JSON.parse(sessionStorage.authCredentials).session
      })
    });
    const data = await response.json();
    console.log(data.message);
    const tempSuggestions = JSON.parse(data.suggestions);
    const plotSuggestions = tempSuggestions.filter(suggestion => suggestion.classification === 'plot_point');
    setSuggestions(plotSuggestions);
  }

  const getPlots = async () => {
    console.log("Running getPlots");
    const response = await fetch(`http://localhost:3000/api/timeline/?project=${JSON.parse(sessionStorage.authCredentials).activeProject}`, {
      method: "GET",
      cors: "cors",
      headers: new Headers({
        'content-type': 'application/json',
        'authorization': JSON.parse(sessionStorage.authCredentials).session
      })
    });
    const data = await response.json();
    console.log(data.message);
    setPlots(setReferenceIndexes(data.timeline));
    setActs(data.acts);
    setColorIndexArray(data.colorArray);
  }

  const updateTimeline = async (method, plot = {}, options = {}) => {
    console.log("Running updateTimeline");
    if (method === "add" && options.type === "scene" && options.act === 0) {
      if (options.act === 0 || options.act === undefined) return
    }
    const response = await fetch(`http://localhost:3000/api/timeline/edit`, {
      method: "PUT",
      cors: "cors",
      headers: new Headers({
        'content-type': 'application/json',
        'authorization': JSON.parse(sessionStorage.authCredentials).session
      }),
      body: JSON.stringify({
        project: JSON.parse(sessionStorage.authCredentials).activeProject,
        data: { method, plot, options }
      })
    });
    const data = await response.json();
    console.log(data.message);
    if (data.timeline) setPlots(setReferenceIndexes(data.timeline));
    if (data.acts) setActs(data.acts);
    if (data.colorArray) {
      setColorIndexArray(data.colorArray);
    }
    if (currentPlotIndex >= data.timeline.length - 1) {
      console.log("In this block");
      setCurrentPlotIndex(data.timeline.length - 1);
    }
  }

  const cycleCurrentPlot = (direction, index) => {
    console.log("Running cycleCurrentPlot");
    if (direction === "none") {
      if (!index || typeof index !== "number") {
        if (index >= 0 && index < plots.length - 1) {
          setCurrentPlotIndex(index);
        }
      }
    }
    if (direction === "left") {
      if (currentPlotIndex === 0) return;
      setCurrentPlotIndex(currentPlotIndex - 1);
    }
    if (direction === "right") {
      if (currentPlotIndex >= plots.length - 1) return;
      setCurrentPlotIndex(currentPlotIndex + 1);
    }
  }

  const componentDidMount = async () => {
    await getSuggestions();
    await getPlots();
  }

  useEffect(() => {
    componentDidMount();
    console.log(colorIndexArray);
  }, []);

  const displaySuggestionContainer = (suggestions.length > 0) ? <SuggestionContainer suggestions={suggestions} /> : '';

  return (
    <div className="main" id="timeline_main">
      {displaySuggestionContainer}
      <SceneSelector
        plots={plots}
        acts={acts}
        charachters={charachters}
        updateTimeline={updateTimeline}
        currentPlotIndex={currentPlotIndex}
        setCurrentPlotIndex={setCurrentPlotIndex}
        cycleCurrentPlot={cycleCurrentPlot}
        colorIndexArray={colorIndexArray}
      />
      <TimeLineManager
        plots={plots}
        acts={acts}
        charachters={charachters}
        colorIndexArray={colorIndexArray}
        currentPlotIndex={currentPlotIndex}
        setCurrentPlotIndex={setCurrentPlotIndex}
        updateTimeline={updateTimeline}
      />
    </div>
  )
}

export default TimelineMain;