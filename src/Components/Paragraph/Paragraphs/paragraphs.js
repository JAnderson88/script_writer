import React, { useState, useEffect, memo, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faTimes, faUnlock } from '@fortawesome/free-solid-svg-icons';

//Components
import SuggestionIcon from '../../Suggestions/SuggestionIcon/suggestionIcon';
//CSS
import './paragraphs.css';

function Paragraph(props) {
  const [body, updateBody] = useState(props.body);
  const [tag, updateTag] = useState(props.tags);
  const [locked, setLocked] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState({ height: "14px" });
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    updateBody(props.body);
    updateTag(props.tag);
    resizeTextarea();
    // console.log(props.id);
  }, [props]);

  const handleChange = (e) => {
    if (!locked) {
      if (e.target.className === "tags") updateTag(e.target.value);
      if (e.target.parentNode.className === "body") {
        updateBody(e.target.value);
        resizeTextarea();
      }
    }
  };

  const updateManager = e => {
    props.updateParagraph(tag, body, props.id);
  }

  const resizeTextarea = () => {
    const margin = 16;
    const COURIER_MONOSPACE_CHAR_SIZE = 9;
    const charachtersPerLine = Math.floor((document.querySelectorAll(".paragraph_body")[props.index].clientWidth) / COURIER_MONOSPACE_CHAR_SIZE);
    const charachterSize = body.length;
    const bodyLines = Math.trunc(charachterSize / charachtersPerLine);
    const height = ((bodyLines * 12) + margin);
    setTextareaHeight({ height: `${height}px` });
  }

  const selectionManager = e => {
    if (locked) return;
    if (e.target.className === "paragraph_body") {
      return setSelectedText(window.getSelection().toString());
    }
    const classification = (e.target.className === "plot_point") ? "plot_point" : "charachter";
    return props.addSuggestions(props.id, classification, selectedText);
  }

  const displayActiveParagraph = (props.id === props.activeParagraph) ? 'paragraph_container active_paragraph locked' : 'paragraph_container unactive_paragraph locked';
  const renderSuggestionButtons = (locked) ?
    <Fragment>
      <button className="plot_point" disabled>P</button>
      <button className="charachter" disabled>C</button>
    </Fragment>
    :
    <Fragment>
      <button className="plot_point" onClick={selectionManager}>P</button>
      <button className="charachter" onClick={selectionManager}>C</button>
    </Fragment>

  const displayLockIcon = (locked) ? <FontAwesomeIcon icon={faLock} /> : <FontAwesomeIcon icon={faUnlock} />

  const displaySuggestions = () => {
    const returnArray = [];
    const numRows = (props.suggestions.length <= 3) ? 1 : Math.trunc(props.suggestions.length / 3);
    for (let i = 0; i < numRows; i++) {
      const row = [];
      for (let j = (i * 3); j < ((i * 3) + 3); j++) {
        const currentElement = ((i * 3) + j);
        if (currentElement >= props.suggestions.length) break;
        row.push(
          <SuggestionIcon
            id={props.suggestions[currentElement]._id}
            paragraph={props.id}
            classification={props.suggestions[currentElement].classification}
            data={props.suggestions[currentElement].data}
            removeSuggestions={props.removeSuggestions}
          />
        );
      }
      returnArray.push(row);
    }
    return returnArray;
  }

  const displaySuggestionContainer = (props.suggestions && props.suggestions.length > 0) ?
    <div className="suggestion_icon_container">
      {displaySuggestions()}
    </div>
    :
    ''

  return (
    <Fragment>
      <div className={displayActiveParagraph}>
        <header>
          <input type="text" className="tags" value={tag} onChange={handleChange} onFocus={() => { props.setActiveParagraph(props.id) }} onBlur={updateManager} />
          <div className="button_container">
            {renderSuggestionButtons}
            <button className="lock" onClick={() => { setLocked(!locked) }}>
              {displayLockIcon}
            </button>
            <button className="remove" onClick={() => { props.removeParagraph(props.id) }}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </header>
        <div className="body">
          <textarea
            className="paragraph_body"
            style={textareaHeight}
            value={body}
            onChange={handleChange}
            onFocus={() => { props.setActiveParagraph(props.id) }}
            onBlur={updateManager}
            onSelect={selectionManager}
          />
        </div>
        {displaySuggestionContainer}
      </div>
    </Fragment>
  );
}

export default memo(Paragraph);