import React, { memo, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowUp, faArrowDown, faTimes } from '@fortawesome/free-solid-svg-icons';

//Components
//CSS
import './paragraphSidebar.css'

function ParagraphSidebar({ paragraphs, activeParagraph, setActiveParagraph, addParagraph, removeParagraph, updateComponentDimensions }) {
  const changeActiveParagraph = (direction, e) => {
    let nextIndex;
    for (let i = 0; i < paragraphs.length; i++) {
      if (paragraphs[i].paragraphID === activeParagraph) {
        if (direction === "up") nextIndex = i - 1;
        if (direction === "down") nextIndex = i + 1;
      }
    }
    if (nextIndex >= paragraphs.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = paragraphs.length - 1;
    setActiveParagraph(paragraphs[nextIndex].paragraphID);
  }

  const addParagraphEventHandler = async () => {
    await addParagraph();
    updateComponentDimensions();
  }

  const removeParagraphEventHandler = async () => {
    await removeParagraph();
    updateComponentDimensions();
  }

  useEffect(() => {
    updateComponentDimensions();
  }, [updateComponentDimensions]);

  return (
    <div className="sidebar_container" id="paragraph_sidebar">
      <button id="add_paragraph" onClick={addParagraphEventHandler}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
      <button id="cycle_up" onClick={(e) => { changeActiveParagraph("up", e) }}>
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
      <button id="cycle_down" onClick={(e) => { changeActiveParagraph("down", e) }}>
        <FontAwesomeIcon icon={faArrowDown} />
      </button>
      <button id="delete_paragraph" onClick={removeParagraph}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
}

export default memo(ParagraphSidebar);
