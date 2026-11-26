import { expect, test } from "vite-plus/test";
import { end, fill, isComplete, lines, missing, run, step, type Automat } from "./Automat.ts";

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
test("a step follows the arrow of the input and gives its output", () => {
  expect(step(saft, 0, 0)).toEqual({ from: 0, input: 0, to: 1, output: undefined });
  expect(step(saft, 2, 1)).toEqual({ from: 2, input: 1, to: 0, output: "Saft fällt heraus" });
  expect(step(saft, 2, 0).output).toBe("Münze kommt zurück");
});

test("the same input gives another reaction in another state", () => {
  expect(step(saft, 1, 1).to).toBe(1);
  expect(step(saft, 2, 1).to).toBe(0);
});

test("without an arrow the automaton stays", () => {
  const half: Automat = { ...lampe, transitions: lampe.transitions.slice(0, 1) };
  expect(step(half, 1, 0)).toEqual({ from: 1, input: 0, to: 1, output: undefined });
  expect(missing(half)).toEqual([{ state: 1, input: 0 }]);
  expect(isComplete(half)).toBe(false);
});

test("a run starts at the start state and ends where the last input leads", () => {
  expect(run(saft, []).length).toBe(0);
  expect(end(saft, [])).toBe(0);
  expect(end(saft, [0, 0, 0])).toBe(2);
  expect(end(saft, [0, 0, 1])).toBe(0);
  expect(end(lampe, [0, 0, 0])).toBe(1);
  expect(end(saft, [1], 2)).toBe(0);
});

test("complete: one arrow per state and input, all to states of the automaton", () => {
  expect(isComplete(saft)).toBe(true);
  expect(isComplete(lampe)).toBe(true);
  expect(isComplete({ ...saft, transitions: [...saft.transitions, tr(0, 0, 2)] })).toBe(false);
  expect(isComplete({ ...lampe, transitions: [tr(0, 0, 5), tr(1, 0, 0)] })).toBe(false);
  expect(isComplete({ ...lampe, start: 5 })).toBe(false);
});

test("fill and lines", () => {
  expect(fill("{a} und {b}, {c}", { a: 1, b: "zwei" })).toBe("1 und zwei, {c}");
  expect(lines(saft, "Ausgabe")).toContain("2 € drin – Knopf → 0 € drin (Ausgabe: Saft fällt heraus)");
  expect(lines(saft, "Ausgabe")).toContain("0 € drin – Münze → 1 € drin");
});
