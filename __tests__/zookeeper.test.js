const fs = require("fs");
jest.mock("fs");

const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper
} = require("../lib/zookeepers.js");

const { zookeepers } = require("../data/zookeepers");

test("creates a zookeeper object", () => {
  const zookeeper = createNewZookeeper(
    { name:"Sarah", id: "usfhu32" },
    zookeepers
  );

  expect(zookeeper.name).toBe("Sarah");
  expect(zookeeper.id).toBe("usfhu32");
});

test("filters by query", () => {
  const startingKeepers = [
    {
      id: "3",
      name: "Sarah",
      age: 33,
      favoriteAnimal: "red panda"
    },
    {
      id: "4",
      name: "Lindsay",
      age: 26,
      favoriteAnimal: "lynx"
    },
  ];

  const updatedKeepers = filterByQuery({ favoriteAnimal: "red panda" }, startingKeepers);

  expect(updatedKeepers.length).toEqual(1);
});

test("finds by id", () => {
  const startingKeepers = [
    {
      id: "3",
      name: "Sarah",
      age: 33,
      favoriteAnimal: "red panda"
    },
    {
      id: "4",
      name: "Lindsay",
      age: 26,
      favoriteAnimal: "lynx"
    },
  ];

  const result = findById("3", startingKeepers);

  expect(result.name).toBe("Sarah");
});

test("validates age", () => {
  const keeper = {
    id: "3",
    name: "Sarah",
    age: 33,
    favoriteAnimal: "red panda"
  };

  const invalidKeeper = {
    id: "3",
    name: "Sarah",
    age: "33"
  };

  const result = validateZookeeper(keeper);
  const result2 = validateZookeeper(invalidKeeper);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});