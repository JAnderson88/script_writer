import React, { useState, useEffect, memo } from 'react';

//Components
import TimelinePart from '../../../Components/Timeline/Timeline_Part/timelinePart';
//CSS
import './timeline_manager.css';

function TimeLineManager({ plots, acts, charachters, colorIndexArray, currentPlotIndex, setCurrentPlotIndex, updateTimeline }) {

  useEffect(() => {
    // console.log(colorIndexArray);
  }, [plots, acts, colorIndexArray, currentPlotIndex]);

  const renderTimelineStructure = () => {
    const timelineAct = [];
    for (let i = 0; i <= acts; i++) {
      const tempScenes = plots.filter(scene => (scene.act === (i+1).toString()));
      const height = (tempScenes.length <= 3) ? `${3 * 18}vh` : `${tempScenes.length * 18}vh`;
      const style = { height: height };
      timelineAct.push(
        <TimelinePart
          act={i+1}
          scenes={tempScenes}
          style={style}
          clrIndex={colorIndexArray[i]}
          colorReference={colorIndexArray}
          key={i}
          currentPlotIndex={currentPlotIndex}
          setCurrentPlotIndex={setCurrentPlotIndex}
          updateTimeline={updateTimeline}
        />
      );
    }
    return timelineAct.map(act => {
      return act;
    });
  }

  return (
    <div id="timeline_manager">
      {renderTimelineStructure()}
    </div>
  );
}

export default TimeLineManager;