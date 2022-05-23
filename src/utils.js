import { cardsMock } from "./Configs";

export const getTagsSet = () => {
  const tagsSet = cardsMock.reduce((acc, { cardRows }) => {
    cardRows &&
      cardRows.length > 0 &&
      cardRows.map(({ cardTags }) => cardTags.map((tag) => acc.add(tag)));

    return acc;
  }, new Set());
  return tagsSet;
};
