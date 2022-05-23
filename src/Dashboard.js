import "./styles.scss";
import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { cardsMock } from "./Configs";
import Cards from "./Cards";
import { getTagsSet } from "./utils";
import AddCard from "./AddCard";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

export default function Dashboard() {
  const [searchVal, setSearchVal] = useState("");
  const [visibleCards, setVisibleCards] = useState(cardsMock);
  const [tagsList, setTagsList] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const tagsSet = getTagsSet();

    const tagsList = [];

    for (let value of tagsSet.values()) {
      tagsList.push({ label: value });
    }
    setTagsList(tagsList);
  }, [cardsMock]);

  const setSearchState = (event) => {
    setSearchVal(event.target.value.toLowerCase());
  };

  const renderTagsFilter = () => {
    return (
      <Autocomplete
        disablePortal
        id="select-tag"
        options={tagsList}
        sx={{ width: "10rem" }}
        renderInput={(params) => <TextField {...params} label="Tags" />}
        renderOption={(props, option) => (
          <Box sx={{ width: 300 }} {...props}>
            {option.label}
          </Box>
        )}
        onChange={(event) => {
          const filterVal = event.target.outerText;
          filterVal ? setSearchVal(filterVal) : setSearchVal("");
          filterMock(filterVal);
        }}
      />
    );
  };

  const filterMock = (searchVal) => {
    if (searchVal) {
      const filteredCardsMock = cardsMock.map((cardMock) => {
        const { cardRows, ...rest } = cardMock;

        const modifiedCardRows =
          cardRows && cardRows.length > 0
            ? cardRows.filter(
                ({ cardTitle, cardDesc, cardVersion, cardTags }) => {
                  return (
                    cardTitle.toLowerCase().includes(searchVal) ||
                    cardDesc.toLowerCase().includes(searchVal) ||
                    cardVersion.toLowerCase().includes(searchVal) ||
                    cardTags.includes(searchVal)
                  );
                }
              )
            : cardRows;

        let modifiedMock = { ...rest, cardRows: modifiedCardRows };
        return modifiedMock;
      });

      console.log("filteredCardsMock :", filteredCardsMock);
      setVisibleCards(filteredCardsMock);
    } else setVisibleCards(cardsMock);
  };

  const filterSearchResults = (event) => {
    if (event.key === "Enter") {
      filterMock(searchVal);
    }
  };

  const updateCards = (newCard) => {
    const backLogObj = {
      ...cardsMock.find((mock) => mock.cardsState === "Backlog"),
    };

    const backLogCardRows = backLogObj.cardRows;

    backLogCardRows.push(newCard);
    const allExceptBackLogCards = cardsMock.filter(
      (mock) => mock.cardsState !== "Backlog"
    );
    setVisibleCards([backLogObj, ...allExceptBackLogCards]);
    handleClose();
  };

  return (
    <>
      <div className="dashboard">
        <h1>Kanban Board</h1>
        <div className="search-tags-container">
          <div className="search-wrapper">
            <input
              placeholder="search this board"
              name="search"
              value={searchVal}
              onKeyDown={filterSearchResults}
              onChange={setSearchState}
              className="search-input"
            ></input>
            <i className="fa fa-search search-icon" aria-hidden="true"></i>
          </div>
          {renderTagsFilter()}
        </div>
        <div className="cards-container">
          <Cards handleOpen={handleOpen} visibleCards={visibleCards}></Cards>
        </div>
      </div>
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <AddCard
            saveCardCallBack={(newCard) => updateCards(newCard)}
          ></AddCard>
        </Modal>
      )}
    </>
  );
}
