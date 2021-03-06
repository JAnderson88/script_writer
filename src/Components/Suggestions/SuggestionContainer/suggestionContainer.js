import React, { useState, useEffect, Fragment } from 'react';

//Components
import SuggestionBox from '../SuggestionBox/suggestionBox';
//CSS
import './suggestionContainer.css';

function SuggestionContainer({ suggestions }) {

  const displaySuggestions = () => {
    return suggestions.map(suggestion => {
      return <SuggestionBox suggestion={suggestion} />
    })
  }

  return (
    <div className="container" id="suggestion_container">
      {displaySuggestions()}
    </div>
  );
}

export default SuggestionContainer;