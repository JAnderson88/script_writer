import React, { useState, useEffect, memo, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faTimes, faUnlock } from '@fortawesome/free-solid-svg-icons';

//Components
//CSS
import './paragraphs.css';
import { render } from '@testing-library/react';

function Paragraph(props) {
  const [body, updateBody] = useState(props.body);
  const [tag, updateTag] = useState(props.tags);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    updateBody(props.body);
    updateTag(props.tag)
  }, [props]);

  const handleChange = (e) => {
    if (!locked) {
      if (e.target.className === "tags") updateTag(e.target.value);
      if (e.target.parentNode.className === "body") updateBody(e.target.value);
    }
  };

  const updateManager = e => {
    props.updateParagraph(tag, body, props.id);
  }

  const displayActiveParagraph = (props.id === props.activeParagraph) ? 'paragraph_container active_paragraph locked' : 'paragraph_container locked';
  const renderSuggestionButtons = (locked) ?
    <Fragment>
      <button className="plot_point" disabled>P</button>
      <button className="charachters" disabled>C</button>
    </Fragment>
    :
    <Fragment>
      <button className="plot_point">P</button>
      <button className="charachters">C</button>
    </Fragment>

  const displayLockIcon = (locked) ? <FontAwesomeIcon icon={faLock} /> : <FontAwesomeIcon icon={faUnlock} />

  return (
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
        <textarea className="paragraph_body" value={body} onChange={handleChange} onFocus={() => { props.setActiveParagraph(props.id) }} onBlur={updateManager} />
      </div>
    </div>
  );
}

export default memo(Paragraph);