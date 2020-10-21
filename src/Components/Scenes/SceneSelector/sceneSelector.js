import React, { useState, useEffect, memo, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import M from 'materialize-css';

//Components
//CSS
import './sceneSelector.css';

function SceneSelector({ plots, setPlots, activePlot, setActivePlot, acts, scenes, charachters, updateTimeline }) {

  let [currentPlotIndex, setCurrentPlotIndex] = useState(0);
  const [detailsText, setDetailsText] = useState("");

  const handleChange = e => {
    if (e.target.name === "details") setDetailsText(e.target.value);
  }

  const cycleCurrentPlot = (direction) => {
    console.log("Running cycleCurrentPlot")
    if (direction === "left") {
      if (currentPlotIndex === 0) return;
      setCurrentPlotIndex(currentPlotIndex - 1);
      // setDetailsText(plots[currentPlotIndex].data);
    }
    if (direction === "right") {
      if (currentPlotIndex >= plots.length - 1) return;
      setCurrentPlotIndex(currentPlotIndex + 1);
      // setDetailsText(plots[currentPlotIndex].data);
    }
  }

  const renderInput = (type, data) => {
    let options = [];
    const length = (typeof data === "number") ? data : data.length;
    options.push(<option key="0">0</option>);
    for (let i = 1; i <= length; i++) {
      options.push(<option key={i.toString()}>{i.toString()}</option>);
    }
    return (
      <select name={type} id={type}>
        {options.map(option => {
          return option;
        })}
      </select>
    );
  }

  const renderCharachterInput = () => {
    let options = [];
    options.push(<option key="0">Select Charachter</option>);
    for (let i = 1; i <= charachters.length; i++) {
      options.push(<option key={i}>{charachters[i]}</option>)
    }
    return (
      <select name="charachter" id="charachter">
        {options.map(option => {
          return option
        })}
      </select>
    );
  }

  useEffect(() => {
    M.AutoInit();
    if (plots.length > 0) setDetailsText(plots[currentPlotIndex].data);
  }, [plots, acts, scenes, currentPlotIndex]);

  return (
    <div id="scene_selector">
      <header>
        <div className="arrow_container" onClick={() => { cycleCurrentPlot("left") }}>
          <FontAwesomeIcon icon={faArrowCircleLeft} />
        </div>
        <div id="scene_number_display">
          {currentPlotIndex + 1}
        </div>
        <div className="arrow_container" onClick={() => { cycleCurrentPlot("right") }}>
          <FontAwesomeIcon icon={faArrowCircleRight} />
        </div>
      </header>
      <div id="scene_selector_body">
        <div className="details_container">
          <textarea name="details" id="details" onChange={handleChange} onBlur={e => { updateTimeline(e, "plot") }} value={detailsText}></textarea>
        </div>
        <div className="scene_props_container">
          <div id="act_container">
            <label htmlFor="act">Act</label>
            {renderInput("act", acts)}
          </div>
          <div id="scence_container">
            <label htmlFor="scene">Scene</label>
            {renderInput("scene", scenes)}
          </div>
          <div id="character_container">
            <label htmlFor="charachter">Charachter</label>
            <div>
              {renderCharachterInput()}
            </div>
            <div className="add_scene_triangle" onClick={e => { updateTimeline(e, "scene") }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SceneSelector;