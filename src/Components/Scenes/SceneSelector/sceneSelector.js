import React, { useState, useEffect, memo, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import M from 'materialize-css';

//Components
//CSS
import './sceneSelector.css';

function SceneSelector({ plots, acts, charachters, updateTimeline, currentPlotIndex, setCurrentPlotIndex, cycleCurrentPlot, colorIndexArray }) {

  const [detailsText, setDetailsText] = useState("");
  const [actOptions, setActOptions] = useState(0);
  const [actValue, setActValue] = useState(0);
  const [sceneOptions, setSceneOptions] = useState({});
  const [sceneValue, setSceneValue] = useState(0);

  const handleChange = e => {
    if (e.target.name === "details") setDetailsText(e.target.value);
    if (e.target.parentNode.id === "act") {
      setActValue(parseInt(e.target.textContent));
      setSceneValue(0);
    }
    if (e.target.parentNode.id === "scene") {
      setSceneValue(parseInt(e.target.textContent));
      for (let i = 0; i < plots.length; i++) {
        if (plots[i].act === actValue.toString() && (plots[i].sceneId + 1) === parseInt(e.target.textContent)) {
          setCurrentPlotIndex(i);
        }
      }
    }
  }

  const deriveSceneOptionsValues = () => {
    const tempSceneOptions = {}
    for (let i = 0; i < plots.length; i++) {
      tempSceneOptions[plots[i].act] = (!tempSceneOptions[plots[i].act]) ? 1 : tempSceneOptions[plots[i].act] + 1;
    }
    setSceneOptions(tempSceneOptions);
  }

  const handleRemoveElement = async e => {
    e.persist();
    if (e.target.classList.value === "remove_act"){
      const response = window.confirm("Are you sure you wish to delete this Act? Removing this act will delete all scenes associated with this act");
      if (response) {
        await updateTimeline("remove", {}, {type: "act", act: actValue});
      }
    }
    if (e.target.classList.value === "remove_scene"){
      const response = window.confirm("Are you sure you wish to delete this scene?");
      if (response) {
        await updateTimeline("remove", plots[currentPlotIndex], {type: "scene"});
      }
    }
  }

  const renderActCycler = () => {
    let options = [];
    options.push(<div key="top" className="empty"></div>);
    for (let i = 0; i <= actOptions; i++) {
      const selected = (actValue === i + 1) ? "selected" : "";
      options.push(
        <div className={selected} key={i + 1} onClick={handleChange}>
          {i + 1}
        </div>
      );
    }
    options.push(<div key="bottom" className="empty"></div>);
    return (
      <Fragment>
        {options.map(option => { return option; })}
      </Fragment>
    );
  }

  const renderSceneCycler = () => {
    let options = [];
    options.push(<div key="top" className="empty"></div>);
    for (let i = 1; i <= sceneOptions[actValue]; i++) {
      const selected = (sceneValue === i) ? "selected" : "";
      options.push(
        <div className={selected} key={i.toString()} onClick={handleChange}>
          {i}
        </div>
      );
    }
    options.push(<div key="bottom" className="empty"></div>);
    return (
      <Fragment>
        {options.map(option => { return option; })}
      </Fragment>
    );
  }

  useEffect(() => {
    M.AutoInit();
    if (plots.length > 0 && currentPlotIndex < plots.length) {
      setDetailsText(plots[currentPlotIndex].data);
      setActValue(parseInt(plots[currentPlotIndex].act));
      deriveSceneOptionsValues();
      setSceneValue(parseInt(plots[currentPlotIndex].sceneId) + 1);
    }
    setActOptions(acts);
    if (plots.length === 0) document.querySelector("#details").disabled = true;
    if (plots.length > 0) document.querySelector("#details").disabled = false;
  }, [plots, acts, currentPlotIndex, actOptions]);

  return (
    <div id="scene_selector">
      <header>
        <div className="arrow_container" onClick={() => { cycleCurrentPlot("left") }}>
          <FontAwesomeIcon icon={faArrowCircleLeft} />
        </div>
        <div id="scene_number_display">
          {(plots.length === 0) ? 0 : currentPlotIndex + 1}
        </div>
        <div className="arrow_container" onClick={() => { cycleCurrentPlot("right") }}>
          <FontAwesomeIcon icon={faArrowCircleRight} />
        </div>
      </header>
      <div id="scene_selector_body">
        <div className="details_container">
          <textarea name="details" id="details" onChange={handleChange} onBlur={() => { updateTimeline("edit", plots[currentPlotIndex], { data: detailsText }) }} value={detailsText} />
        </div>
        <div className="scene_props_container">
          <div id="act_container">
            <div className="cycler" id="act">
              {renderActCycler()}
            </div>
            <div>
              <button className="add_act" onClick={async e => { await updateTimeline("add", {}, { type: "act" }) }}> + </button>
              <button className="remove_act" onClick={handleRemoveElement}> x </button>
            </div>
          </div>
          <div id="scene_container">
            <div className="cycler" id="scene">
              {renderSceneCycler()}
            </div>
            <div>
              <button className="add_scene" onClick={async e => { await updateTimeline("add", {}, { type: "scene", act: actValue }) }}> + </button>
              <button className="remove_scene" onClick={handleRemoveElement}> x </button>
            </div>
          </div>
          <div id="charachter_container"></div>
        </div>
      </div>
    </div>
  );
}

export default SceneSelector;