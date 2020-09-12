import React, { useState, Fragment } from 'react';

//Components
//CSS
import './suggestionBox.css';

function SuggestionBox(props){
  return (
    <div className="suggestion_box">
      {props.suggestion.data}
    </div>
  )
}

export default SuggestionBox;