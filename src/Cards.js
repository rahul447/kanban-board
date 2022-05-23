import "./styles.scss";
import React from "react";
import Card from "./Card";

const Cards = ({ handleOpen, visibleCards }) => {
  const renderCardRows = (cardRows) => {
    return cardRows.map((card, key) => {
      return <Card key={`card-${key}`} {...card}></Card>;
    });
  };

  const renderAddCardButton = (cardsState, colorCode) => {
    return (
      <div
        className="plus-sign"
        style={{
          border: `1px dotted ${colorCode}`,
          padding: "3rem",
          margin: "0.5rem",
        }}
        onClick={handleOpen}
      >
        {cardsState === "Backlog" ? (
          <span>&#43;</span>
        ) : (
          <span className="drag-drop-button">Drag and drop here</span>
        )}
      </div>
    );
  };

  const renderCards = (visibleCards) => {
    return visibleCards.map(({ cardsState, cardRows, colorCode }, key) => {
      return (
        <React.Fragment key={`card-mock-${key}`}>
          <div className="cards">
            <div
              style={{
                backgroundColor: colorCode,
                color: "white",
                padding: ".4rem",
              }}
            >
              {cardsState}
            </div>
            {cardRows && cardRows.length > 0 && renderCardRows(cardRows)}
            {renderAddCardButton(cardsState, colorCode)}
          </div>
        </React.Fragment>
      );
    });
  };

  return renderCards(visibleCards);
};

export default Cards;
