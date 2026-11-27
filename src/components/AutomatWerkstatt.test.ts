import { expect, test } from "vite-plus/test";
import { empty, problem, type Aufgabe } from "./AutomatEntwurf.ts";

// AutomatWerkstatt starts from an empty design, which has no state and so no start.
const aufgabe: Aufgabe = {
  id: "x",
  name: "x",
  text: "",
  inputs: [],
  cards: [],
  start: "a",
  loesung: [],
  tests: [],
};

test("the workshop starts empty", () => {
  expect(empty()).toEqual({ states: [], start: "", arrows: [] });
  expect(problem(aufgabe, empty())).toEqual({ kind: "noStart" });
});
