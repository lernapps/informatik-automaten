import { expect, test } from "vite-plus/test";
import { arrows } from "./AutomatDiagramm.ts";
import { bildAutomat, type Bild } from "./AutomatBild.ts";

// A turnstile with two arrows "Chip" out of "gesperrt": the picture of a design that is not deterministic.
const zwei: Bild = {
  nr: 2,
  name: "Drehkreuz",
  start: 0,
  states: [
    { name: "gesperrt", x: 170, y: 160, loop: -90 },
    { name: "frei", x: 430, y: 160, loop: -90 },
  ],
  inputs: [{ name: "Chip" }, { name: "drücken" }],
  transitions: [
    { from: 0, input: 0, to: 1, bend: 0 },
    { from: 0, input: 0, to: 0, bend: 0 },
    { from: 0, input: 1, to: 0, bend: 0 },
  ],
};

test("a design becomes an automaton without outputs, its arrows all drawn", () => {
  const a = bildAutomat([zwei], 2);
  expect(a.outputs).toEqual([]);
  expect(a.transitions).toHaveLength(3);
  expect(a.transitions.every((t) => t.text === "")).toBe(true);
  // the loop carries both inputs, the arrow to "frei" the second "Chip"
  expect(arrows(a).map((x) => x.parts.length)).toEqual([1, 2]);
  expect(bildAutomat([zwei], 9).name).toBe("Drehkreuz");
});
