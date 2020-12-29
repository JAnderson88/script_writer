import React, { useState, useEffect, memo, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faTimes, faUnlock } from '@fortawesome/free-solid-svg-icons';
import M from 'materialize-css';

//Components
import SuggestionIcon from '../../Suggestions/SuggestionIcon/suggestionIcon';
//CSS
import './paragraphs.css';

function Paragraph({
  instanceBody,
  tags,
  id,
  pageNum,
  setNumPages,
  pageDimensions,
  activeParagraph,
  setActiveParagraph,
  updateParagraph,
  removeParagraph,
  suggestions,
  addSuggestions,
  removeSuggestions,
  pageSize,
  setPageSize,
  calculatePageHeight,
}) {
  const [body, updateBody] = useState(instanceBody);
  const [tag, updateTag] = useState(tags);
  const [locked, setLocked] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState({ height: "14px" });
  const [selectedText, setSelectedText] = useState("");

  const handleChange = (e) => {
    if (!locked) {
      if (e.target.className === "tags") updateTag(e.target.value);
      if (e.target.parentNode.className === "body") {
        updateBody(e.target.value);
        resizeTextArea();
      }
    }
  };

  const updateManager = e => {
    if (tag !== tags || body !== instanceBody) {
      updateParagraph(tag, body, id);
    }
  }

  useEffect(() => {
    updateBody(instanceBody);
    updateTag(tags);
    resizeTextArea();
    M.AutoInit();
  }, [instanceBody, tags, pageSize]);

  const resizeTextArea = async () => {
    const chars = body.length;
    const lines = Math.ceil(chars / 85);
    const height = (lines * 16);
    setTextareaHeight({height: `${height}px`});
    const pageHeight = calculatePageHeight();
    if (pageHeight !== pageSize) setPageSize(pageHeight);
    if (pageHeight > pageDimensions.pageHeight){
      setNumPages(pageNum + 1);
    }
  }

  const selectionManager = e => {
    if (!locked) return;
    if (e.target.className === "paragraph_body") {
      return setSelectedText(window.getSelection().toString());
    }
    const classification = (e.target.className === "plot_point") ? "plot_point" : "charachter";
    return addSuggestions(id, classification, selectedText);
  }

  const displayActiveParagraph = () => {
    let paragraphClass = 'paragraph_container';
    paragraphClass += (id === activeParagraph) ? ' active_paragraph locked' : ' unactive_paragraph locked';
    paragraphClass += (body === '') ? ' empty' : '';
    return paragraphClass;
  }

  const renderSuggestionButtons = (!locked) ?
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
    for (let i = 0; i < suggestions.length; i++) {
      returnArray.push(
        <SuggestionIcon
          id={suggestions[i]._id}
          key={i}
          paragraph={id}
          classification={suggestions[i].classification}
          data={suggestions[i].data}
          removeSuggestions={removeSuggestions}
        />
      );
    }
    return returnArray;
  }

  const displaySuggestionContainer = (suggestions && suggestions.length > 0) ?
    <div className="suggestion_icon_container">
      {displaySuggestions()}
    </div> : '';

  return (
    <Fragment>
      <div className={displayActiveParagraph()} onClick={() => { setActiveParagraph(id) }}>
        <header>
          <input type="text" className="tags" value={tag} onChange={handleChange} onFocus={() => { setActiveParagraph(id) }} onBlur={updateManager} />
          <div className="button_container">
            {renderSuggestionButtons}
            <button className="lock" onClick={() => { setLocked(!locked) }}>
              {displayLockIcon}
            </button>
            <button className="remove" onClick={() => { removeParagraph(id) }}>
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
            onFocus={() => { setActiveParagraph(id) }}
            onBlur={updateManager}
            onSelect={selectionManager}
          />
        </div>
        {displaySuggestionContainer}
      </div>
    </Fragment>
  );
}

export default Paragraph;