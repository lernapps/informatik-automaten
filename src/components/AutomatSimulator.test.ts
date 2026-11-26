import { expect, test } from "vite-plus/test";
import { run, type Automat } from "./Automat.ts";
import { pick, verlauf } from "./AutomatSimulator.ts";

/** The juice machine of the data file, in German, and the hall light. */
const tr = (from: number, input: number, to: number) => ({ from, input, to, bend: 0, text: `${from} ${input}` });
const saft: Automat = {
  nr: 0,
  name: "Saftautomat",
  start: 0,
  states: [
    { name: "0 € drin", x: 110, y: 170, loop: -90 },
    { name: "1 € drin", x: 300, y: 170, loop: -90 },
    { name: "2 € drin", x: 490, y: 170, loop: -90 },
  ],
  inputs: [{ name: "Münze" }, { name: "Knopf" }],
  transitions: [tr(0, 0, 1), tr(0, 1, 0), tr(1, 0, 2), tr(1, 1, 1), tr(2, 0, 2), { ...tr(2, 1, 0), bend: 55 }],
  outputs: [
    { from: 2, input: 0, text: "Münze kommt zurück" },
    { from: 2, input: 1, text: "Saft fällt heraus" },
  ],
};
const lampe: Automat = {
  nr: 1,
  name: "Flurlicht",
  start: 0,
  states: [
    { name: "aus", x: 170, y: 150, loop: -90 },
    { name: "an", x: 430, y: 150, loop: -90 },
  ],
  inputs: [{ name: "Taster" }],
  transitions: [tr(0, 0, 1), tr(1, 0, 0)],
  outputs: [],
};

test("pick finds the automaton by its number, else the first", () => {
  expect(pick([saft, lampe], 1)).toBe(lampe);
  expect(pick([saft, lampe], 7)).toBe(saft);
  expect(() => pick([], 0)).toThrow();
});

test("the history starts at the start state and names each input and the state it led to", () => {
  expect(verlauf(saft, [])).toBe("0 € drin");
  expect(verlauf(saft, run(saft, [0, 1, 0, 1]))).toBe(
    "0 € drin → Münze → 1 € drin → Knopf → 1 € drin → Münze → 2 € drin → Knopf → 0 € drin",
  );
});
