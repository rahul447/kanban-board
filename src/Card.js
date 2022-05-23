import "./styles.scss";
import React, { useState } from "react";

const Card = ({ cardTags, cardTitle, cardDesc, DocumentLink, cardVersion }) => {
  const renderCardTags = () => {
    return (
      <div className="card-tags">
        {cardTags.map(({ title, colorCode }, key) => {
          return (
            <span
              style={{
                backgroundColor: colorCode,
                color: "white",
                padding: "0.2rem",
              }}
              key={`card-tag-${key}`}
            >
              {title}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="card-wrapper">
      {renderCardTags()}
      <div className="card-title-version">
        <div>{cardTitle}</div>
        <div>{cardVersion}</div>
      </div>
      <div>{cardDesc}</div>
      <div>
        <span>Document Link</span>
      </div>
    </div>
  );
};

export default Card;
