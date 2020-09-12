import React, { useState, useEffect, memo } from 'react';

//Components
import SuggestionContainer from '../../../Components/Suggestions/SuggestionContainer/suggestionContainer';
//CSS
import './timeline_main.css';

function TimelineMain() {
  const [suggestions, setSuggestions] = useState([]);

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
    const tempSuggestions = JSON.parse(data.suggestions);
    const plotSuggestions = tempSuggestions.filter(suggestion => suggestion.classification === 'plot_point');
    setSuggestions(plotSuggestions);
  }

  useEffect(()=>{
    getSuggestions();
  }, []);

  const displaySuggestionContainer = (suggestions.length > 0) ? <SuggestionContainer suggestions={suggestions} /> : '';

  return (
    <div className="main" id="timeline_main">
      {displaySuggestionContainer}
    </div>
  )
}

export default TimelineMain;