import { expect, test } from "vite-plus/test";
import { end, isComplete, type Automat } from "./Automat.ts";
import {
  about,
  backwards,
  check,
  describe,
  generate,
  mistakes,
  params,
  passed,
  reason,
  show,
  solution,
  template,
  wrong,
  type Props,
} from "./AutomatAufgabe.ts";

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
const folge: Props = {
  automata: [saft, lampe],
  use: [0, 1],
  mode: "folge",
  task: "{automat}: Start bei „{start}“. Eingaben: {inputs}. Wo ist er am Ende?",
  outputWord: "Ausgabe",
  mistakes: [
    "Die letzte Eingabe „{last}“ fehlt.",
    "Lies die Pfeile vom Anfang zur Spitze.",
    "Du stehst noch bei „{start}“.",
  ],
  other: "Fang bei „{start}“ an und folge jedem Pfeil.",
};
const pfeil: Props = {
  ...folge,
  mode: "pfeil",
  task: "{text} Wohin führt „{input}“ von „{from}“?",
  mistakes: ["Es ändert sich etwas.", "Es ändert sich nichts."],
};

test("the fixtures are complete automata", () => {
  expect(isComplete(saft)).toBe(true);
  expect(isComplete(lampe)).toBe(true);
});

test("folge: same task per seed, 3 to 5 inputs, the last input changes the state", () => {
  for (let seed = 1; seed <= 50; seed++) {
    const task = generate(seed, folge);
    expect(generate(seed, folge)).toEqual(task);
    expect(task.inputs.length).toBeGreaterThanOrEqual(3);
    expect(task.inputs.length).toBeLessThanOrEqual(5);
    expect(end(task.automat, task.inputs.slice(0, -1))).not.toBe(solution(task));
  }
});

test("only the automata of use are drawn", () => {
  for (let seed = 1; seed <= 30; seed++) expect(generate(seed, { ...folge, use: [1] }).automat.nr).toBe(1);
});

test("folge: the solution is right; wrong and every mistake are wrong; no answer is not checked", () => {
  for (let seed = 1; seed <= 50; seed++) {
    const task = generate(seed, folge);
    expect(check(task, solution(task))).toBe(true);
    expect(check(task, wrong(task))).toBe(false);
    expect(check(task, undefined)).toBe(false);
    const m = mistakes(task);
    expect(m).toHaveLength(about.mistakes.length);
    for (const answer of m) if (answer !== undefined) expect(check(task, answer)).toBe(false);
  }
});

test("folge: the reason names the mistake, never the solution", () => {
  const task = { mode: "folge" as const, automat: saft, inputs: [0, 0, 1], hidden: undefined, fehler: undefined };
  expect(solution(task)).toBe(0);
  expect(reason(task, 2, folge)).toBe("Die letzte Eingabe „Knopf“ fehlt.");
  expect(reason(task, 1, folge)).toBe("Fang bei „0 € drin“ an und folge jedem Pfeil.");
  expect(reason(task, 0, folge)).toBeUndefined();
  const start = { ...task, inputs: [0, 1, 1] };
  expect(end(saft, start.inputs.slice(0, -1))).toBe(1);
  // reading backwards from 0 € with Münze finds no arrow into 0 € with Münze: the learner stays
  expect(backwards(saft, [0, 0, 1])).toBe(2);
  // Knopf, Münze, Münze: right is 2 € drin; backwards: Knopf leads back to 2 € drin, then Münze to 1 € and 0 € drin
  const back = { ...task, inputs: [1, 0, 0] };
  expect(solution(back)).toBe(2);
  expect(backwards(saft, back.inputs)).toBe(0);
  expect(reason(back, 0, folge)).toBe("Lies die Pfeile vom Anfang zur Spitze.");
  expect(reason(back, 1, folge)).toBe("Die letzte Eingabe „Münze“ fehlt.");
});

test("pfeil: same task per seed; the solution is the end of the missing arrow; the mistakes are wrong", () => {
  for (let seed = 1; seed <= 50; seed++) {
    const task = generate(seed, pfeil);
    expect(generate(seed, pfeil)).toEqual(task);
    expect(task.hidden).toBeDefined();
    expect(check(task, solution(task))).toBe(true);
    expect(check(task, wrong(task))).toBe(false);
    for (const answer of mistakes(task)) if (answer !== undefined) expect(check(task, answer)).toBe(false);
  }
});

test("pfeil: the reasons for a change and for no change", () => {
  const change = {
    mode: "pfeil" as const,
    automat: saft,
    inputs: [],
    hidden: { from: 2, input: 1 },
    fehler: undefined,
  };
  expect(solution(change)).toBe(0);
  expect(reason(change, 2, pfeil)).toBe("Es ändert sich etwas.");
  const stay = { ...change, hidden: { from: 1, input: 1 }, fehler: undefined };
  expect(solution(stay)).toBe(1);
  expect(reason(stay, 0, pfeil)).toBe("Es ändert sich nichts.");
  expect(reason(stay, 2, pfeil)).toBe("Fang bei „0 € drin“ an und folge jedem Pfeil.");
});

test("describe gives the task and the diagram as text, without the missing arrow; show and params", () => {
  const task = { mode: "pfeil" as const, automat: saft, inputs: [], hidden: { from: 2, input: 1 }, fehler: undefined };
  const d = describe(task, pfeil, "de");
  expect(d.task).toContain("2 1 Wohin führt „Knopf“ von „2 € drin“?");
  expect(d.task).toContain("- 0 € drin – Münze → 1 € drin");
  expect(d.task).not.toContain("2 € drin – Knopf");
  expect(d.solution).toContain("0 € drin");
  expect(show(1, task)).toBe("1 € drin");
  expect(template(pfeil, "de")).toBe(pfeil.task);
  expect(Object.keys(params(task, pfeil, "de"))).toEqual(["automat", "text", "from", "input"]);
  const f = { mode: "folge" as const, automat: saft, inputs: [0, 1, 0], hidden: undefined, fehler: undefined };
  expect(describe(f, folge, "de").task).toContain("Eingaben: Münze, Knopf, Münze.");
  expect(describe(f, folge, "de").solution).toContain("**2 € drin**");
  expect(Object.keys(params(f, folge, "de"))).toEqual(["automat", "start", "inputs"]);
});

test("folge with two states: no typical mistake, only the general message", () => {
  const task = { mode: "folge" as const, automat: lampe, inputs: [0, 0, 0], hidden: undefined, fehler: undefined };
  expect(solution(task)).toBe(1);
  expect(mistakes(task)).toEqual([undefined, undefined, undefined, undefined, undefined, undefined, undefined]);
  expect(reason(task, 0, folge)).toBe("Fang bei „aus“ an und folge jedem Pfeil.");
});

const fehlerProps: Props = {
  ...folge,
  mode: "fehler",
  task: "{automat}: {inputs} soll bei „{expected}“ enden, endet aber bei „{actual}“.",
  mistakes: [
    "Über diesen Pfeil läuft die Folge nicht.",
    "Dieser Pfeil stimmt; die Folge endet trotzdem nicht bei „{expected}“.",
  ],
};

test("fehler: one arrow drawn wrong, passed by the sequence, and only it mends the sequence", () => {
  for (let seed = 1; seed <= 67; seed++) {
    const task = generate(seed, fehlerProps);
    expect(generate(seed, fehlerProps)).toEqual(task);
    const f = task.fehler;
    expect(f).toBeDefined();
    if (!f) continue;
    const used = passed(task.automat, task.inputs);
    expect(used).toContain(f.index);
    expect(end(task.automat, task.inputs)).not.toBe(f.expected);
    const mended = {
      ...task.automat,
      transitions: task.automat.transitions.map((t, j) => (j === f.index ? { ...t, to: f.right } : t)),
    };
    expect(end(mended, task.inputs)).toBe(f.expected);
    expect(check(task, solution(task))).toBe(true);
    expect(reason(task, solution(task), fehlerProps)).toBeUndefined();
    const [unused, other] = mistakes(task).slice(5);
    if (unused !== undefined)
      expect(reason(task, unused, fehlerProps)).toBe("Über diesen Pfeil läuft die Folge nicht.");
    if (other !== undefined) expect(reason(task, other, fehlerProps)).toContain("Dieser Pfeil stimmt");
    expect(show(solution(task), task)).toMatch(/ – .* → /);
  }
});

test("fehler: the diagram shows no outputs", () => {
  for (let seed = 1; seed <= 20; seed++) expect(generate(seed, fehlerProps).automat.outputs).toEqual([]);
});
