export const cardsMock = [
  {
    cardsState: "Backlog",
    colorCode: "blue",
    empty: false,
    cardRows: [
      {
        id: 1,
        cardTags: ["iOS"],
        cardTitle: "Add splash screen",
        cardDesc: "Use company logo",
        documentLink: "https://www.google.com/",
        cardVersion: "A1",
      },
      {
        id: 2,
        cardTags: ["Android"],
        cardTitle: "Onboarding animation v2",
        cardDesc: "Pilot version with Lootie",
        documentLink: "https://www.facebook.com/",
        cardVersion: "A2",
      },
    ],
  },
  {
    cardsState: "To Do",
    colorCode: "green",
    empty: true,
    cardRows: [],
  },
  {
    cardsState: "In Development",
    colorCode: "brown",
    empty: true,
    cardRows: [],
  },
  {
    cardsState: "Completed",
    colorCode: "purple",
    empty: true,
    cardRows: [],
  },
];

export const globalTagsLists = [
  {
    title: "iOS",
    colorCode: "black",
  },
  {
    title: "Android",
    colorCode: "green",
  },
  {
    title: "Macintosh",
    colorCode: "yellow",
  },
  {
    title: "Ubuntu",
    colorCode: "orange",
  },
  {
    title: "Centos",
    colorCode: "brown",
  },
  {
    title: "Windows",
    colorCode: "grey",
  },
];
