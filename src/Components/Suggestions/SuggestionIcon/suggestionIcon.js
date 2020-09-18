import React, { useState, useEffect, memo, Fragment } from 'react';

//Components
//CSS
import './suggestionIcon.css';

function SuggestionIcon({ id, paragraph, classification, data, removeSuggestions }) {

  const displayClassIcon = (classification === 'plot_point') ? 'P' : 'C';
  const displayTruncInfo = (data.length > 25) ? (`${data.substring(0, 25)}...`) : data;

  return (
    <div className="suggestion_icon">
      <div>
        {displayClassIcon}
      </div>
      <div>
        {displayTruncInfo}
      </div>
      <div>
        <button onClick={() => { removeSuggestions(id, paragraph) }}>X</button>
      </div>
    </div>
  );
}

export default memo(SuggestionIcon);