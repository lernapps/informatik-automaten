import { expect, test } from "vite-plus/test";
import { firstEmpty, sequence, setTarget, target, toggle, empty, type Aufgabe } from "./AutomatEntwurf.ts";

// AutomatEditor shows a design and changes it with these functions of AutomatEntwurf.ts.
const aufgabe: Aufgabe = {
  id: "licht",
  name: "Licht",
  text: "",
  inputs: [{ id: "knopf", name: "Knopf" }],
  cards: [
    { id: "aus", name: "aus", art: "zustand", warum: "", x: 0, y: 0, loop: 0 },
    { id: "an", name: "an", art: "zustand", warum: "", x: 0, y: 0, loop: 0 },
  ],
  start: "aus",
  loesung: [],
  tests: [],
};

test("a row is empty until a target is chosen, and empty again when its target is switched off", () => {
  let e = toggle(toggle(empty(), aufgabe, "aus"), aufgabe, "an");
  expect(firstEmpty(e, aufgabe)).toEqual({ state: "aus", input: "knopf" });
  e = setTarget(e, "aus", "knopf", "an");
  expect(target(e, "aus", "knopf")).toBe("an");
  expect(firstEmpty(e, aufgabe)).toEqual({ state: "an", input: "knopf" });
  e = toggle(e, aufgabe, "an");
  expect(target(e, "aus", "knopf")).toBe("");
});

test("a sequence is shown by the names of its inputs", () => {
  expect(sequence(aufgabe, ["knopf", "knopf"])).toBe("Knopf, Knopf");
});
