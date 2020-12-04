import React, { useState, useEffect, Fragment } from 'react';
import timelineColors from '../../../Modules/Colors/timelineColors';

//Componenets
//CSS
import './timelinePart.css';

function TimelinePart({ act, scenes, style, clrIndex, colorReference, currentPlotIndex, setCurrentPlotIndex, updateTimeline }) {

  const USEABLE_COLORS = useState(timelineColors());
  const [colorIndex, setColorIndex] = useState(null);

  const cycleColors = async e => {
    const index = act;
    const findNewIndex = (index) => {
      let changed = false;
      while (!changed) {
        for (let i = 0; i < colorReference.length; i++) {
          if (i === colorReference.length - 1 && colorReference[i] !== index) changed = true;
          if (colorReference[i] === index) {
            index = (parseInt(index) <= USEABLE_COLORS[0].length - 1) ? (parseInt(index) + 1).toString() : "0";
            break;
          }
        }
      }
      return index.toString();
    }
    const value = findNewIndex(colorIndex);
    await updateTimeline("color", {}, { index, value });
  }


  useEffect(() => {
    if (clrIndex !== undefined) setColorIndex(clrIndex);
  }, [clrIndex, colorIndex, currentPlotIndex, colorReference]);

  const renderTimelinePart = () => {
    const classes = `timeline ${USEABLE_COLORS[0][colorIndex]}`;
    return <div className={classes} onClick={cycleColors} data-act={act}></div>
  }

  const renderTimlineScenes = () => {
    return scenes.map((scene, index) => {
      const insertedClass = (scene.refrenceIndex === currentPlotIndex) ? "scene_box active" : "scene_box";
      const line = ((index + 1) % 3 === 1) ?
        <div className="small_line"><hr /></div> :
        ((index + 1) % 3 === 2) ?
          <div className="long_line"><hr /></div> :
          <Fragment>
            <div className="long_line"><hr /></div>
            <div className="long_line"><hr /></div>
          </Fragment>

      return <div className="timeline_scene_row" key={index}>
        {line}
        <div className={insertedClass} onClick={() => { setCurrentPlotIndex(scene.refrenceIndex) }}>
          {scene.data}
        </div>
      </div>
    })
  }

  return (
    <div className="timeline_act_container" style={style}>
      <div className="timeline_act">
        {renderTimelinePart()}
      </div>
      <div className="timeline_scene_container">
        {renderTimlineScenes()}
      </div>
    </div>
  );
}

export default TimelinePart;