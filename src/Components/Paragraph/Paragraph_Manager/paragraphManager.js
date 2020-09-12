import React, { useState, useEffect, memo } from 'react';

//Components
import Paragraph from '../../../Components/Paragraph/Paragraphs/paragraphs';
//CSS
import './paragraphManager.css';

function ParagraphManager(props) {
  const [suggestions, setSuggestions] = useState({});

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
    const newSuggestions = {};
    for(let i=0; i<props.paragraphs.length; i++){
      if(!newSuggestions[props.paragraphs[i].paragraphID]) newSuggestions[props.paragraphs[i].paragraphID] = [];
    }
    console.log(newSuggestions);
    JSON.parse(data.suggestions).forEach(suggestion => {
      newSuggestions[suggestion.paragraph].push(suggestion);
    });
    setSuggestions(newSuggestions);
  }

  const addSuggetions = async (id, classification, info) => {
    console.log("Running addSuggestions");
    const response = await fetch(`http://localhost:3000/api/suggestion/add`, {
      method: "POST",
      cors: "cors",
      headers: new Headers({
        'content-type': 'application/json',
        'authorization': JSON.parse(sessionStorage.authCredentials).session
      }),
      body: JSON.stringify({
        project: JSON.parse(localStorage.getItem("treatment")).project,
        data: JSON.stringify({ paragraph: id, classification, data: info })
      })
    });
    const data = await response.json();
    const newSuggestions = JSON.parse(JSON.stringify(suggestions));
    newSuggestions[data.suggestion.paragraph].push(data.suggestion);
    console.log(data.message);
    setSuggestions(newSuggestions);
  }

  const removeSuggestions = async (id, paragraph) => {
    console.log("Running removeSuggestions");
    const response = await fetch(`http://localhost:3000/api/suggestion/remove`, {
      method: "DELETE",
      cors: "cors",
      headers: new Headers({
        'content-type': 'application/json',
        'authorization': JSON.parse(sessionStorage.authCredentials).session
      }),
      body: JSON.stringify({
        project: JSON.parse(localStorage.getItem("treatment")).project,
        data: { id }
      })
    });
    const data = await response.json();
    console.log(data.message);
    let removeIndex = suggestions[paragraph].findIndex(suggestion => suggestion._id === id);
    if (removeIndex === -1) return console.log(removeIndex);
    const newSuggestions = JSON.parse(JSON.stringify(suggestions));
    newSuggestions[paragraph] = [...suggestions[paragraph].slice(0, removeIndex), ...suggestions[paragraph].slice(removeIndex + 1)];
    setSuggestions(newSuggestions);
  }

  useEffect(() => {
    getSuggestions();
    console.log(suggestions);
  }, []);

  const displayParagraphs = () => {
    if (Object.keys(props.paragraphs).length === 0) {
      return '';
    } else {
      return props.paragraphs.map((paragraph, index) => {
        return <Paragraph
          body={paragraph.body}
          tags={paragraph.tags}
          key={paragraph.paragraphID}
          id={paragraph.paragraphID}
          index={index}
          activeParagraph={props.activeParagraph}
          setActiveParagraph={props.setActiveParagraph}
          updateParagraph={props.updateParagraph}
          removeParagraph={props.removeParagraph}
          suggestions={suggestions[paragraph.paragraphID]}
          setSuggestions={setSuggestions}
          addSuggestions={addSuggetions}
          removeSuggestions={removeSuggestions}
        />
      })
    }
  }

  return (
    <div id="paragraph_manager">
      {displayParagraphs()}
    </div>
  )
}

export default memo(ParagraphManager);