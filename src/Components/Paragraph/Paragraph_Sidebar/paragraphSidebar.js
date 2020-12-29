import React, { memo, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowUp, faArrowDown, faTimes } from '@fortawesome/free-solid-svg-icons';

//Components
//CSS
import './paragraphSidebar.css'

function ParagraphSidebar(
  { 
    paragraphs, 
    setParagraphs, 
    activeParagraph, 
    setActiveParagraph, 
    addParagraph, 
    removeParagraph, 
    reconfigureTreatment, 
    updateComponentDimensions 
  }) {

  const moveParagraph = async (direction) => {
    const tempParagraphs = [...paragraphs];
    for (let i = 0; i < tempParagraphs.length; i++) {
      if (tempParagraphs[i].paragraphID === activeParagraph) {
        if (direction === 'up' && i !== 0) {
          const tempSlot = {...tempParagraphs[i-1]};
          tempParagraphs[i-1] = tempParagraphs[i];
          tempParagraphs[i] = tempSlot;
          return await reconfigureTreatment(tempParagraphs)
        }
        if (direction === 'down' && i !== (tempParagraphs.length -1)) {
          const tempSlot = {...tempParagraphs[i+1]};
          tempParagraphs[i+1] = tempParagraphs[i];
          tempParagraphs[i] = tempSlot;
          return await reconfigureTreatment(tempParagraphs)
        }
      }
    }
  }

  const addParagraphEventHandler = async () => {
    await addParagraph();
    updateComponentDimensions();
  }

  const removeParagraphEventHandler = async () => {
    await removeParagraph(activeParagraph);
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
      <button id="cycle_up" onClick={(e) => { moveParagraph("up") }}>
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
      <button id="cycle_down" onClick={(e) => { moveParagraph("down") }}>
        <FontAwesomeIcon icon={faArrowDown} />
      </button>
      <button id="delete_paragraph" onClick={removeParagraphEventHandler}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
}

export default memo(ParagraphSidebar);
