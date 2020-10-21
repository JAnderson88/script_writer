import React, { useState, useEffect, memo } from 'react';
import plotsGenerator from '../../../Modules/Test/plotsGenerator';

//Components
import SuggestionContainer from '../../../Components/Suggestions/SuggestionContainer/suggestionContainer';
import SceneSelector from '../../../Components/Scenes/SceneSelector/sceneSelector';
import TimeLineManager from '../../../Components/Timeline/Timeline_Manager/timeline_manager';
//CSS
import './timeline_main.css';

function TimelineMain() {
  const [suggestions, setSuggestions] = useState([]);
  const [plots, setPlots] = useState([]);
  let [acts, setActs] = useState(0);
  const [scenes, setScenes] = useState([]);
  const [charachters, setCharachters] = useState([]);
  let [activePlot, setActivePlot] = useState(0);

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

  const getPlots = async() => {
    const newPlots = await plotsGenerator();
    const numActs = newPlots.reduce((acc, curr) => {
      return Math.max(acc, curr.act);
    }, 0);
    const newScenes = newPlots.map(plot => {
      return { act: plot.act, scene: plot.scene, data: plot.data }
    });
    setPlots(newPlots);
    setActs(numActs);
    setScenes(newScenes);
  }

  const updateTimeline = async(e, type) => {
    console.log(type);
    console.log("Running updateTimeline");
  }

  const componentDidMount = async () => {
    await getSuggestions();
    await getPlots();
  }
  
  useEffect(() => {
    componentDidMount();
  }, []);

  const displaySuggestionContainer = (suggestions.length > 0) ? <SuggestionContainer suggestions={suggestions} /> : '';

  return (
    <div className="main" id="timeline_main">
      {displaySuggestionContainer}
      <SceneSelector
        plots={plots}
        setPlots={setPlots}
        activePlot={activePlot}
        setActivePlot={setActivePlot}
        acts={acts}
        scenes={scenes}
        charachters={charachters}
        updateTimeline={updateTimeline}
      />
      <TimeLineManager
        plots={plots}
        setPlots={setPlots}
        activePlot={activePlot}
        setActivePlot={setActivePlot}
        acts={acts}
        scenes={scenes}
        charachters={charachters}
        updateTimeline={updateTimeline}
      />
    </div>
  )
}

export default TimelineMain;