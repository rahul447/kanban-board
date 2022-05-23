import "./styles.scss";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { globalTagsLists } from "./Configs";
import { cardsMock } from "./Configs";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(tag, tagList, theme) {
  return {
    fontWeight:
      tagList.indexOf(tag) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const AddCard = ({ saveCardCallBack }) => {
  const theme = useTheme();
  const [tagList, updateTagList] = React.useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const handleTagChange = (event) => {
    const {
      target: { value },
    } = event;
    updateTagList(typeof value === "string" ? value.split(",") : value);
  };

  const saveCard = (e) => {
    e.preventDefault();

    const backLogObj = {
      ...cardsMock.find((mock) => mock.cardsState === "Backlog"),
    };

    const backLogCardRows = backLogObj.cardRows;
    const cardObj = {
      id: backLogCardRows[backLogCardRows.length - 1].id + 1,
      cardTags: tagList,
      cardTitle: title,
      cardDesc: description,
      DocumentLink: link,
      cardVersion: "A1",
    };

    saveCardCallBack(cardObj);
  };

  const renderTagSelection = () => {
    return (
      <FormControl sx={{ m: 1, width: 300 }}>
        <Select
          id="select-tags"
          multiple
          value={tagList}
          onChange={handleTagChange}
          input={<OutlinedInput id="select-multiple-tags" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {globalTagsLists.map(({ title }) => (
            <MenuItem
              key={title}
              value={title}
              style={getStyles(title, tagList, theme)}
            >
              {title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  return (
    <div className="add-card-ui">
      <h1>Add a New Card</h1>
      <form className="add-card-form" onSubmit={saveCard}>
        <label>
          Tag
          <div>{renderTagSelection()}</div>
        </label>
        <label>
          Title
          <input
            type="text"
            placeholder="enter card title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description
          <textarea
            value={description}
            placeholder="enter card description"
            onChange={(e) => setDescription(e.target.value)}
            rows="8"
            cols="50"
          />
        </label>
        <label>
          Link
          <input
            type="text"
            placeholder="paste link url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddCard;
