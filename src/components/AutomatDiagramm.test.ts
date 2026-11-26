import { expect, test } from "vite-plus/test";
import { inputName, type Automat } from "./Automat.ts";
import { arrows, head, labelText, line, loop, nameLines, startArrow, stateFont, viewBox } from "./AutomatDiagramm.ts";

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
test("arrows with the same start and end share one arrow; loops and reverse arrows get their shape", () => {
  const all = arrows(saft);
  expect(all.map((a) => a.key)).toEqual(["0>1", "0>0", "1>2", "1>1", "2>2", "2>0"]);
  const both: Automat = {
    ...lampe,
    inputs: [...lampe.inputs, { name: "X" }],
    transitions: [...lampe.transitions, tr(0, 1, 1), tr(1, 1, 1)],
  };
  const grouped = arrows(both).find((a) => a.key === "0>1");
  expect(grouped?.parts.map((p) => p.input)).toEqual([0, 1]);
  // the light: both arrows bent, to opposite sides
  const [there, back] = arrows(lampe);
  expect(there?.path).toContain("Q");
  expect(back?.path).toContain("Q");
  expect((there?.ly ?? 0) < 150).toBe(true);
  expect((back?.ly ?? 0) > 150).toBe(true);
});

test("labels carry input and output", () => {
  const knopf = arrows(saft).find((a) => a.key === "2>0");
  expect(knopf?.parts).toEqual([{ input: 1, output: "Saft fällt heraus" }]);
  expect(
    labelText([
      { input: "Knopf", output: "Saft" },
      { input: "Münze", output: undefined },
    ]),
  ).toBe("Knopf / Saft, Münze");
});

test("a hidden transition is left out", () => {
  expect(arrows(saft, { from: 2, input: 1 }).map((a) => a.key)).not.toContain("2>0");
});

test("a straight arrow to the right has its label above, in the middle", () => {
  const l = line({ x: 100, y: 100 }, { x: 300, y: 100 }, 0);
  expect(l.path).toBe("M158 100 L242 100");
  expect(l.anchor).toBe("middle");
  expect(l.lx).toBe(200);
  expect(l.ly < 100).toBe(true);
});

test("a loop above has its label above the circle", () => {
  const l = loop({ x: 100, y: 200 }, -90);
  expect(l.ly < 100).toBe(true);
  expect(l.anchor).toBe("middle");
});

test("an arrowhead is a triangle at the tip", () => {
  expect(head({ x: 10, y: 0 }, { x: 0, y: 0 }, 10)).toBe("10 0 0 5 0 -5");
});

test("long names break at the space nearest the middle", () => {
  expect(nameLines("0 € drin")).toEqual(["0 € drin"]);
  expect(nameLines("Fußgänger grün")).toEqual(["Fußgänger", "grün"]);
});

test("the view box holds circles, start arrow and labels", () => {
  const box = viewBox(saft, arrows(saft), (id) => inputName(saft, id))
    .split(" ")
    .map(Number);
  const [x = 0, y = 0, w = 0, h = 0] = box;
  expect(x).toBeLessThan(110 - 58 - 64);
  expect(x + w).toBeGreaterThan(490 + 58);
  expect(y).toBeLessThan(170 - 58 * 2);
  expect(y + h).toBeGreaterThan(170 + 58);
  expect(startArrow(saft)?.path).toBe("M-12 170 L52 170");
});

test("a long state name gets a smaller font, a short one 22", () => {
  expect(stateFont("aus")).toBe(22);
  expect(stateFont("Fußgänger grün")).toBeLessThan(22);
});
