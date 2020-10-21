import React, { useState, useEffect, memo } from 'react';

//Components
import TimelinePart from '../../../Components/Timeline/Timeline_Part/timelinePart';
//CSS
import './timeline_manager.css';

function TimeLineManager({ plots, setPlots, acts, scenes, charachters, updateTimeline}) {

  useEffect(() => {
    // action on update of movies
    // console.log(plots);
}, [plots, acts, scenes]);

  const testingFunction = () => { 
    // console.log(plots); 
    setPlots({ test: "Test" }); 
    console.log(plots) 
  }

  const renderTimelineStructure = () => {
    const timelineAct = [];
    for (let i = 0; i < acts; i++) {
      const tempScenes = scenes.filter(scene => (scene.act === (i + 1).toString()));
      const height = (tempScenes.length <= 3) ? `${3 * 18}vh` : `${tempScenes.length * 18}vh`;
      const style = { height: height };
      timelineAct.push(
        <TimelinePart
          scenes={tempScenes}
          style={style}
          key={i}
        />
      );
    }
    return timelineAct.map(act => {
      return act;
    });
  }

  return (
    <div id="timeline_manager">
      <div id="button_container">
        {/* <button onClick={e => { updateTimeline(e, "act") }}>+ Add Act</button> */}
        <button onClick={testingFunction}>+ Add Act</button>
        {/* <button onClick={e => { updateTimeline(e, "scene") }}>+ Add Scene</button> */}
        <button onClick={testingFunction}>+ Add Scene</button>
      </div>
      {renderTimelineStructure()}
    </div>
  );
}

export default TimeLineManager;