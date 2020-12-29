import React, { useState, useEffect, memo, Fragment } from 'react';

//Components
import Paragraph from '../../Paragraph/Paragraphs/paragraphs';
//CSS
import './page.css';

function Page({
  pageNum,
  type,
  title,
  setNumPages,
  paragraphs,
  activeParagraph,
  setActiveParagraph,
  updateParagraph,
  removeParagraph,
  pageDimensions,
  setPageDimensions,
  suggestions,
  addSuggestions,
  removeSuggestions,
}) {
  const [pageSize, setPageSize] = useState(0);

  const setPageMargins = () => {
    if (Object.keys(pageDimensions).length === 0) {
      const page = document.querySelector(".page.cover");
      const tempDimensions = {};
      tempDimensions.pageWidth = page.clientWidth;
      tempDimensions.pageHeight = page.clientHeight;
      tempDimensions.marginHeight = Math.ceil(page.clientHeight * (1.25 / 11));
      setPageDimensions(tempDimensions);
    }
  }

  const calculatePageHeight = () => {
    const unactiveParagraphs = document.querySelectorAll(".unactive_paragraph");
    const activeParagraph = document.querySelector(".active_paragraph .body");
    let pageHeight = pageDimensions.marginHeight * 2;
    if (activeParagraph) {
      for (let i=0; i<unactiveParagraphs.length; i++){
        pageHeight += (unactiveParagraphs[i].clientHeight + 18);
      }
      pageHeight += (activeParagraph.clientHeight + 18);
    }
    return pageHeight;
  }

  useEffect(() => {
    if (pageDimensions !== undefined) {
      if (Object.keys(pageDimensions).length === 0) {
        setPageMargins();
      }
      if (pageSize === 0 && pageDimensions.marginHeight){
        setPageSize((pageDimensions.marginHeight * 2));
      }
    }
  }, [paragraphs, pageDimensions, pageNum]);

  const displayParagraphs = () => {
    if (Object.keys(paragraphs).length === 0) {
      return '';
    } else {
      return paragraphs.map((paragraph, index) => {
        return <Paragraph
          instanceBody={paragraph.body}
          tags={paragraph.tags}
          key={index}
          id={paragraph.paragraphID}
          pageNum={pageNum}
          setNumPages={setNumPages}
          pageDimensions={pageDimensions}
          activeParagraph={activeParagraph}
          setActiveParagraph={setActiveParagraph}
          updateParagraph={updateParagraph}
          removeParagraph={removeParagraph}
          suggestions={suggestions[paragraph.paragraphID]}
          addSuggestions={addSuggestions}
          removeSuggestions={removeSuggestions}
          pageSize={pageSize}
          setPageSize={setPageSize}
          calculatePageHeight={calculatePageHeight}
        />
      })
    }
  }

  if (type === "cover") {
    const createdBy = (localStorage.createdBy !== "") ? <div className="created_by">Written By: {localStorage.createdBy}</div> : "";
    return (
      <section className="page cover" data-pagenum={pageNum}>
        <div className="project_title">{title}</div>
        {createdBy}
      </section>
    );
  }

  return (
    <section className="page" data-pagenum={pageNum}>
      {displayParagraphs()}
    </section>
  );
}

export default (Page);