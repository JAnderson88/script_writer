import React, { useState, useEffect, Fragment } from 'react';
import timelineColors from '../../../Modules/Colors/timelineColors';

//Componenets
//CSS
import './timelinePart.css';

function TimelinePart({ scenes, style }) {

  const USEABLE_COLORS = useState(timelineColors());
  const [index, setIndex] = useState(0);

  const cycleColors = () => {
    return (index < USEABLE_COLORS[0].length - 1) ? setIndex(index + 1) : setIndex(0);
  }

  const cycleActiveBox = e => {
    console.dir(e.target);
    console.log(e.target.className);
    if (e.target.className.includes("active")) {
      e.target.classList.remove("active");
    } else {
      e.target.classList.add("active");
    }
  }

  useEffect(() => {
    // console.log(style);
  });

  const renderTimelinePart = () => {
    const classes = `timeline ${USEABLE_COLORS[0][index]}`;
    return <div className={classes} onClick={cycleColors}></div>
  }

  const renderTimlineScenes = () => {
    return scenes.map((scene, index) => {
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
        <div className="scene_box" onClick={cycleActiveBox}>
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