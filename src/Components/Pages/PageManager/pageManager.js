import React, { useState, useEffect, memo, Fragment } from 'react';

//Components
import Page from '../../../Components/Pages/Page/page';
//CSS
import './pageManager.css';

function PageManager({
  paragraphs,
  setActiveParagraph,
  activeParagraph,
  removeParagraph,
  updateParagraph,
  projectName,
  numPages,
  setNumPages
  }) {
  const [suggestions, setSuggestions] = useState({});
  const [pageDimensions, setPageDimensions] = useState({});


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
    for (let i = 0; i < paragraphs.length; i++) {
      if (!newSuggestions[paragraphs[i].paragraphID]) newSuggestions[paragraphs[i].paragraphID] = [];
    }
    JSON.parse(data.suggestions).forEach(suggestion => {
      newSuggestions[suggestion.paragraph].push(suggestion);
    });
    setSuggestions(newSuggestions);
  }

  const addSuggestions = async (id, classification, info) => {
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
  }, [paragraphs, pageDimensions, numPages]);

  const renderPages = () => {
    const pages = [];
    pages[0] = <Page
      pageNum={0}
      type="cover"
      title={projectName}
      key={0}
    />
    if (paragraphs.length > 0) {
      for (let i = 1; i <= numPages; i++) {
        const pageParagraphs = paragraphs.filter(paragraph => paragraph.page === i.toString());
        pages.push(
          <Page
            pageNum={i}
            type="page"
            key={i}
            setNumPages={setNumPages}
            paragraphs={pageParagraphs}
            activeParagraph={activeParagraph}
            setActiveParagraph={setActiveParagraph}
            updateParagraph={updateParagraph}
            removeParagraph={removeParagraph}
            pageDimensions={pageDimensions}
            setPageDimensions={setPageDimensions}
            suggestions={suggestions}
            addSuggestions={addSuggestions}
            removeSuggestions={removeSuggestions}
          />
        );
      }
    }
    return pages.map(page => {
      return page;
    });
  }

  return (
    <Fragment>
      {renderPages()}
    </Fragment>
  );
}

export default PageManager;