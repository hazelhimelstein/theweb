const people = [
  { id: 1, label: "Hazel" },
  { id: 2, label: "Brooke" },
  { id: 3, label: "Alex" },
  { id: 4, label: "Liza" },
  { id: 5, label: "Neha" },
  { id: 6, label: "Josie" }
];

const relationships = [
  {
    from: 1,
    to: 2,
    color: "red",
    label: "Roommates"
  },
  {
    from: 1,
    to: 4,
    color: "hotpink",
    dashes: true,
    label: "Hookup+"
  },
  {
    from: 3,
    to: 4,
    color: "red",
    label: "Roommates"
  },
  {
    from: 2,
    to: 3,
    color: "red",
    label: "Hookup+"
  },
  {
    from: 4,
    to: 5,
    color: "red",
    label: "Hookup"
  },
  {
    from: 2,
    to: 3,
    color: "red",
    label: "Hookup+"
  },
  {
    from: 1,
    to: 6,
    color: "red",
    label: "Hookup+"
  }
];
