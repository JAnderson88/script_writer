import React, { useState, useEffect, memo } from 'react';

//Components
import Paragraph from '../../../Components/Paragraph/Paragraphs/paragraphs';
//CSS
import './paragraphManager.css';

function ParagraphManager(props){

  useEffect(() => {}, []);

  const displayParagraphs = () => {
    if(Object.keys(props.paragraphs).length === 0){
      return '';
    } else {
      return props.paragraphs.map(paragraph => {
        return <Paragraph 
          body={paragraph.body} 
          tags={paragraph.tags} 
          key={paragraph.paragraphID} 
          id={paragraph.paragraphID} 
          activeParagraph={props.activeParagraph}
          setActiveParagraph={props.setActiveParagraph}
          updateParagraph={props.updateParagraph} 
          removeParagraph={props.removeParagraph}
        />
      })
    }
  }

  return(
    <div id="paragraph_manager">
      {displayParagraphs()}
    </div>
  )
}

export default memo(ParagraphManager);