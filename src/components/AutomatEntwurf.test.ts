import { expect, test } from "vite-plus/test";
import {
  automat,
  check,
  describe,
  empty,
  generate,
  loesung,
  mistakes,
  problem,
  reason,
  runEnd,
  setTarget,
  solution,
  toggle,
  wrong,
  type Aufgabe,
  type Props,
} from "./AutomatEntwurf.ts";

/** The car park barrier of the data file, in German. */
const schranke: Aufgabe = {
  id: "schranke",
  name: "Schranke",
  text: "Am Anfang ist die Schranke zu.",
  inputs: [
    { id: "ticket", name: "Ticket" },
    { id: "auto", name: "Auto fährt durch" },
  ],
  cards: [
    { id: "zu", name: "Schranke zu", art: "zustand", warum: "Niemand kommt durch.", x: 0, y: 0, loop: 0 },
    { id: "offen", name: "Schranke offen", art: "zustand", warum: "Ein Auto darf durch.", x: 0, y: 0, loop: 0 },
    { id: "hebt", name: "Schranke geht hoch", art: "ausgabe", warum: "Das ist eine Ausgabe.", x: 0, y: 0, loop: 0 },
  ],
  start: "zu",
  loesung: [
    { from: "zu", input: "ticket", to: "offen" },
    { from: "zu", input: "auto", to: "zu" },
    { from: "offen", input: "ticket", to: "offen" },
    { from: "offen", input: "auto", to: "zu" },
  ],
  tests: [
    { inputs: ["ticket"], end: "offen", hidden: false },
    { inputs: ["ticket", "auto"], end: "zu", hidden: false },
    { inputs: ["ticket", "ticket"], end: "offen", hidden: true },
  ],
};
const texts = {
  noStates: "Wähle Zustände.",
  noStart: "Wähle einen Startzustand.",
  wrongStart: "Start {start} passt nicht.",
  incomplete: "Leer: {state} – {input}.",
  testFails: "{inputs} endet bei {actual}, soll {expected}.",
  hiddenFails: "Verdeckt: {inputs} endet bei {actual}, soll {expected}.",
};
const neu: Props = { aufgaben: [schranke], use: ["schranke"], mode: "neu", ...texts };
const verbessern: Props = { ...neu, mode: "verbessern" };

test("the data's design passes; a card that is no state, an empty row or a wrong arrow fails", () => {
  const task = generate(1, neu);
  expect(check(task, solution(task))).toBe(true);
  expect(check(task, wrong(task))).toBe(false);
  expect(check(task, undefined)).toBe(false);
  for (const m of mistakes(task)) if (m !== undefined) expect(check(task, m)).toBe(false);
});

test("another valid design passes too: the check is by properties, not by the data's design", () => {
  const task = generate(1, neu);
  // the same automaton with the states in another order and the arrows in another order
  const other = { states: ["offen", "zu"], start: "zu", arrows: [...loesung(schranke).arrows].reverse() };
  expect(check(task, other)).toBe(true);
});

test("the reason names the first problem, never the solution", () => {
  const task = generate(1, neu);
  const right = loesung(schranke);
  expect(reason(task, { ...right, states: [...right.states, "hebt"] }, neu)).toBe(
    "Schranke geht hoch: Das ist eine Ausgabe.",
  );
  expect(reason(task, { ...right, start: "" }, neu)).toBe("Wähle einen Startzustand.");
  expect(reason(task, { ...right, start: "offen" }, neu)).toBe("Start Schranke offen passt nicht.");
  expect(reason(task, setTarget(right, "offen", "auto", ""), neu)).toBe("Leer: Schranke offen – Auto fährt durch.");
  expect(reason(task, setTarget(right, "zu", "ticket", "zu"), neu)).toBe(
    "Ticket endet bei Schranke zu, soll Schranke offen.",
  );
  // passes the visible tests, fails the hidden one: a second ticket at open closes the barrier
  const hiddenOnly = setTarget(right, "offen", "ticket", "zu");
  expect(problem(schranke, hiddenOnly)).toMatchObject({ kind: "test", test: { hidden: true } });
  expect(reason(task, hiddenOnly, neu)).toBe("Verdeckt: Ticket, Ticket endet bei Schranke zu, soll Schranke offen.");
  expect(reason(task, right, neu)).toBeUndefined();
});

test("verbessern starts from a design with one wrong arrow that a visible test finds", () => {
  for (let seed = 1; seed <= 30; seed++) {
    const task = generate(seed, verbessern);
    expect(generate(seed, verbessern)).toEqual(task);
    const p = problem(schranke, task.start);
    expect(p?.kind).toBe("test");
    if (p?.kind === "test") expect(p.test.hidden).toBe(false);
  }
});

test("toggle and setTarget keep the design consistent", () => {
  let e = toggle(empty(), schranke, "offen");
  e = toggle(e, schranke, "zu");
  expect(e.states).toEqual(["zu", "offen"]);
  e = { ...e, start: "offen" };
  e = setTarget(e, "zu", "ticket", "offen");
  e = toggle(e, schranke, "offen");
  expect(e).toEqual({ states: ["zu"], start: "", arrows: [] });
  expect(runEnd({ states: ["zu"], start: "zu", arrows: [] }, ["ticket"])).toBe("");
});

test("the drawing: the start state on the left, one arrow per row set", () => {
  const a = automat(schranke, loesung(schranke));
  expect(a.states.map((s) => s.name)).toEqual(["Schranke zu", "Schranke offen"]);
  expect(a.states[0]?.x).toBeLessThan(a.states[1]?.x ?? 0);
  expect(a.transitions).toHaveLength(4);
  expect(automat(schranke, empty()).states).toHaveLength(0);
});

test("describe shows the visible tests only", () => {
  const d = describe(generate(1, neu), neu, "de");
  expect(d.task).toContain("- Ticket → „Schranke offen“");
  expect(d.task).not.toContain("Ticket, Ticket");
  expect(d.solution).toContain("Start: „Schranke zu“");
});
