// The logic of designing an automaton (chapter entwerfen, 9-10): the exercise AutomatEntwurf and the display
// AutomatWerkstatt share it, and AutomatEditor shows a design. A task of the data file entwuerfe gives the inputs, the
// state cards (some of them inputs or outputs, which are no states), the start, test sequences (some hidden until
// "Prüfen") and one valid design (loesung). A design is the cards chosen as states, the start state and one target for
// each pair of state and input. It is checked by its properties, never against loesung: only state cards, the start
// as the task says, complete, every test sequence ends where the task says. The tests pass every arrow. Mode verbessern starts
// from loesung with one arrow changed, so that a test sequence fails. Turned into an Automat (Automat.ts), a design is
// drawn by AutomatDiagramm. Written for lernapps/informatik-automaten (#500).
import { fill, type Automat } from "./Automat.ts";
import { freeDirection } from "./AutomatDiagramm.ts";

/** A state card: a card of the task; art zustand is a state, eingabe and ausgabe are not. */
export interface Card {
  id: string;
  name: string;
  art: string;
  warum: string;
  /** Its place in the drawing; 0, 0: on a circle with the others. loop: the direction of its arrow back to itself. */
  x: number;
  y: number;
  loop: number;
}

/** A design task of the data file entwuerfe. */
export interface Aufgabe {
  id: string;
  name: string;
  text: string;
  inputs: { id: string; name: string }[];
  cards: Card[];
  start: string;
  loesung: { from: string; input: string; to: string }[];
  tests: { inputs: string[]; end: string; hidden: boolean }[];
}

/** A design: the cards chosen as states, in the order of the task's cards, the start state and the arrows. */
export interface Entwurf {
  states: string[];
  start: string;
  arrows: { from: string; input: string; to: string }[];
}

/** The texts of the exercise's feedback, with placeholders. */
export interface Texts {
  /** No state chosen yet. */
  noStates: string;
  /** States chosen, but no start. */
  noStart: string;
  /** The start is another state than the task says, with {start}. */
  wrongStart: string;
  /** A row left empty, with {state} and {input}. */
  incomplete: string;
  /** A visible test sequence ends elsewhere, with {inputs}, {expected} and {actual}. */
  testFails: string;
  /** A hidden test sequence ends elsewhere, with {inputs}, {expected} and {actual}. */
  hiddenFails: string;
}

export interface Props extends Texts {
  aufgaben: Aufgabe[];
  /** The ids of the tasks this block draws from. */
  use: string[];
  /** neu: an empty design; verbessern: loesung with one arrow changed. */
  mode: "neu" | "verbessern";
}

/** A task: the design task, and for verbessern the design to start from. */
export interface Task {
  aufgabe: Aufgabe;
  start: Entwurf;
}

export type Answer = Entwurf | undefined;

/** A small seeded random generator (mulberry32), its seed mixed first so that neighbouring task numbers differ. */
function random(seed: number): () => number {
  let state = (Math.imul(seed ^ 0x5bd1e995, 0x9e3779b1) ^ 0x85ebca6b) >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** The items of `list` in an order drawn with `next`. */
function shuffle<T>(list: readonly T[], next: () => number): T[] {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [out[i], out[j]] = [out[j] as T, out[i] as T];
  }
  return out;
}

/** An empty design. */
export const empty = (): Entwurf => ({ states: [], start: "", arrows: [] });

/** The valid design of the data. */
export function loesung(aufgabe: Aufgabe): Entwurf {
  return {
    states: aufgabe.cards.filter((c) => c.art === "zustand").map((c) => c.id),
    start: aufgabe.start,
    arrows: aufgabe.loesung.map((a) => ({ ...a })),
  };
}

/** The target of the row state × input, or "" when it is empty. */
export const target = (entwurf: Entwurf, state: string, input: string): string =>
  entwurf.arrows.find((a) => a.from === state && a.input === input)?.to ?? "";

/** The design with the row state × input set to `to` ("" empties it). */
export function setTarget(entwurf: Entwurf, state: string, input: string, to: string): Entwurf {
  const arrows = entwurf.arrows.filter((a) => !(a.from === state && a.input === input));
  if (to !== "") arrows.push({ from: state, input, to });
  return { ...entwurf, arrows };
}

/** The design with the card switched on or off; switched off, its rows and the arrows into it go, and it stops being start. */
export function toggle(entwurf: Entwurf, aufgabe: Aufgabe, card: string): Entwurf {
  if (entwurf.states.includes(card)) {
    return {
      states: entwurf.states.filter((s) => s !== card),
      start: entwurf.start === card ? "" : entwurf.start,
      arrows: entwurf.arrows.filter((a) => a.from !== card && a.to !== card),
    };
  }
  const order = aufgabe.cards.map((c) => c.id);
  const states = [...entwurf.states, card].sort((a, b) => order.indexOf(a) - order.indexOf(b));
  return { ...entwurf, states };
}

/** Where a sequence of inputs ends, from the start; "" when a row on the way is empty. */
export function runEnd(entwurf: Entwurf, inputs: readonly string[]): string {
  let state = entwurf.start;
  for (const input of inputs) {
    if (state === "") return "";
    state = target(entwurf, state, input);
  }
  return state;
}

/** The first empty row, in the order of states and inputs. */
export function firstEmpty(entwurf: Entwurf, aufgabe: Aufgabe): { state: string; input: string } | undefined {
  for (const state of entwurf.states) {
    for (const input of aufgabe.inputs) {
      const to = target(entwurf, state, input.id);
      if (to === "" || !entwurf.states.includes(to)) return { state, input: input.id };
    }
  }
  return undefined;
}

/** The problem of a design, the first of: a card that is no state; no start; another start; an empty row; a failed test. */
export type Problem =
  | { kind: "card"; card: Card }
  | { kind: "noStart" }
  | { kind: "wrongStart" }
  | { kind: "incomplete"; state: string; input: string }
  | { kind: "test"; test: Aufgabe["tests"][number]; actual: string };

export function problem(aufgabe: Aufgabe, entwurf: Entwurf): Problem | undefined {
  const notState = aufgabe.cards.find((c) => c.art !== "zustand" && entwurf.states.includes(c.id));
  if (notState) return { kind: "card", card: notState };
  if (entwurf.start === "" || !entwurf.states.includes(entwurf.start)) return { kind: "noStart" };
  if (entwurf.start !== aufgabe.start) return { kind: "wrongStart" };
  const gap = firstEmpty(entwurf, aufgabe);
  if (gap) return { kind: "incomplete", ...gap };
  // the visible tests first, then the hidden ones
  const ordered = [...aufgabe.tests.filter((t) => !t.hidden), ...aufgabe.tests.filter((t) => t.hidden)];
  for (const test of ordered) {
    const actual = runEnd(entwurf, test.inputs);
    if (actual !== test.end) return { kind: "test", test, actual };
  }
  return undefined;
}

/** The task of `seed`: a design task of `use`; for verbessern, loesung with one arrow changed so that a visible test fails. */
export function generate(seed: number, props: Props): Task {
  const next = random(seed);
  // the first number of neighbouring seeds is still alike: drop it
  next();
  next();
  const tasks = props.aufgaben.filter((a) => props.use.includes(a.id));
  const drawn = tasks[Math.floor(next() * tasks.length)] ?? props.aufgaben[0];
  if (drawn === undefined) throw new Error("AutomatEntwurf: the data file entwuerfe is empty");
  // the cards in an order of the task, so that neither the start nor the cards that are no states keep their place
  const aufgabe = { ...drawn, cards: shuffle(drawn.cards, next) };
  if (props.mode === "neu") return { aufgabe, start: empty() };
  const right = loesung(aufgabe);
  const candidates = right.arrows.flatMap((arrow, index) =>
    right.states
      .filter((s) => s !== arrow.to)
      .map((to) => ({ index, to }))
      .filter(({ index: i, to }) => {
        const changed = {
          ...right,
          arrows: right.arrows.map((a, j) => (j === i ? { ...a, to } : a)),
        };
        const failing = problem(aufgabe, changed);
        return failing?.kind === "test" && !failing.test.hidden;
      }),
  );
  const pick = candidates[Math.floor(next() * candidates.length)];
  if (pick === undefined) return { aufgabe, start: right };
  return {
    aufgabe,
    start: {
      ...right,
      arrows: right.arrows.map((a, j) => (j === pick.index ? { ...a, to: pick.to } : a)),
    },
  };
}

/** Whether the design has every property the task asks for. */
export function check(task: Task, answer: Answer): boolean {
  return answer !== undefined && problem(task.aufgabe, answer) === undefined;
}

/** One valid design: the data's. */
export function solution(task: Task): Entwurf {
  return loesung(task.aufgabe);
}

/** A wrong design: valid, but with a card that is no state. */
export function wrong(task: Task): Entwurf {
  const right = loesung(task.aufgabe);
  const extra = task.aufgabe.cards.find((c) => c.art !== "zustand");
  return extra ? { ...right, states: [...right.states, extra.id] } : { ...right, start: "" };
}

/**
 * The answer of each typical mistake of about.mistakes, for the tutor's table: only the wrong arrow, since a card that
 * is no state and a row left empty are the solution with one piece more or less, which about.mistakes already says and
 * which would make the tutor page too long.
 */
export function mistakes(task: Task, _props?: Props): (Entwurf | undefined)[] {
  // verbessern: the design given, left as it is
  if (task.start.states.length > 0) return [undefined, undefined, check(task, task.start) ? undefined : task.start];
  const changed = generate(1, {
    aufgaben: [task.aufgabe],
    use: [task.aufgabe.id],
    mode: "verbessern",
    noStates: "",
    noStart: "",
    wrongStart: "",
    incomplete: "",
    testFails: "",
    hiddenFails: "",
  }).start;
  return [undefined, undefined, check(task, changed) ? undefined : changed];
}

const name = (aufgabe: Aufgabe, id: string) =>
  aufgabe.cards.find((c) => c.id === id)?.name ?? aufgabe.inputs.find((i) => i.id === id)?.name ?? id;

/** A sequence of inputs as text: "Knopf, Zeit um". */
export const sequence = (aufgabe: Aufgabe, inputs: readonly string[]) => inputs.map((i) => name(aufgabe, i)).join(", ");

/** The app's message for a wrong design: the first problem, never the solution. A card that is no state: its reason. */
export function reason(task: Task, answer: Answer, props: Props, _lang?: string): string | undefined {
  if (answer === undefined || answer.states.length === 0) return props.noStates;
  const p = problem(task.aufgabe, answer);
  if (p === undefined) return undefined;
  const a = task.aufgabe;
  switch (p.kind) {
    case "card":
      return `${p.card.name}: ${p.card.warum}`;
    case "noStart":
      return props.noStart;
    case "wrongStart":
      return fill(props.wrongStart, { start: name(a, answer.start) });
    case "incomplete":
      return fill(props.incomplete, {
        state: name(a, p.state),
        input: name(a, p.input),
      });
    case "test":
      return fill(p.test.hidden ? props.hiddenFails : props.testFails, {
        inputs: sequence(a, p.test.inputs),
        expected: name(a, p.test.end),
        actual: p.actual === "" ? "–" : name(a, p.actual),
      });
  }
}

/** The design as an Automat for the drawing: states on a circle, the start on the left; rows not set have no arrow. */
export function automat(aufgabe: Aufgabe, entwurf: Entwurf): Automat {
  const ids = entwurf.states;
  const n = ids.length;
  const startIndex = Math.max(0, ids.indexOf(entwurf.start));
  const radius = n <= 2 ? 150 : n === 3 ? 160 : 190;
  const placed = ids.every((id) => (aufgabe.cards.find((c) => c.id === id)?.x ?? 0) > 0);
  const states = ids.map((id, i) => {
    const card = aufgabe.cards.find((c) => c.id === id);
    if (placed && card) return { name: name(aufgabe, id), x: card.x, y: card.y, loop: card.loop };
    // the start state at 180°, the others clockwise around the centre
    const angle = Math.PI + ((i - startIndex) * 2 * Math.PI) / Math.max(n, 1);
    const x = 300 + Math.cos(angle) * radius;
    const y = 220 + Math.sin(angle) * (n <= 2 ? 0 : radius);
    // the loop points away from the centre, but not to the left of the start (the start arrow is there)
    let loop = (angle * 180) / Math.PI;
    if (n <= 2) loop = -90;
    else if (i === startIndex) loop = -90;
    return {
      name: name(aufgabe, id),
      x: Math.round(x),
      y: Math.round(y),
      loop: Math.round(loop),
    };
  });
  const inputs = aufgabe.inputs.map((i) => ({ name: i.name }));
  const transitions = entwurf.arrows
    .filter((a) => ids.includes(a.from) && ids.includes(a.to))
    .map((a) => ({
      from: ids.indexOf(a.from),
      input: aufgabe.inputs.findIndex((i) => i.id === a.input),
      to: ids.indexOf(a.to),
      bend: 0,
      text: "",
    }))
    .filter((t) => t.input >= 0);
  const drawn: Automat = {
    nr: 0,
    name: aufgabe.name,
    // no start chosen: no start arrow (-1 names no state)
    start: entwurf.start === "" ? -1 : startIndex,
    states,
    inputs,
    transitions,
    outputs: [],
  };
  // the start state's loop goes where there is most room (the start arrow comes from the left)
  const first = states[startIndex];
  if (first && n > 2 && !placed)
    first.loop = freeDirection(
      {
        ...drawn,
        states: states.map((s, i) => (i === startIndex ? { ...s, loop: 180 } : s)),
      },
      startIndex,
    );
  return drawn;
}

/** A design as text: its states, its start and its arrows. */
/** A name in the quotation marks of the language. */
const quote = (text: string, lang = "de") => (lang === "en" ? `“${text}”` : `„${text}“`);

/** A design as a list, for "Lösung zeigen": the states, the start, then one line per arrow. */
export function listing(entwurf: Entwurf, aufgabe: Aufgabe, lang: string): string {
  const q = (id: string) => quote(name(aufgabe, id), lang);
  const arrows = entwurf.arrows.map((r) => `- ${q(r.from)} – ${name(aufgabe, r.input)} → ${q(r.to)}`).join("\n");
  return `${entwurf.states.map(q).join(" · ")}\n\nStart: ${q(entwurf.start)}\n\n${arrows}`;
}

/** A design as short text, for the tutor. */
export function show(answer: Answer, task: Task, _props?: Props, _lang?: string): string {
  if (answer === undefined) return "–";
  const a = task.aufgabe;
  // short, one part per state: "Start A · A: x → B, y ↺ · B: …"; ↺ stays in the state, a state without arrows has "–"
  const parts = answer.states.map((state) => {
    const rows = answer.arrows
      .filter((r) => r.from === state)
      .map((r) => (r.to === state ? `${name(a, r.input)} ↺` : `${name(a, r.input)} → ${name(a, r.to)}`));
    return `${name(a, state)}: ${rows.length > 0 ? rows.join(", ") : "–"}`;
  });
  const start = answer.start === "" ? "–" : name(a, answer.start);
  return [`Start ${start}`, ...parts].join(" · ");
}

/** The task as a learner sees it (the visible test sequences only), and one valid design. */
export function describe(task: Task, props: Props, lang: string): { task: string; solution: string } {
  const a = task.aufgabe;
  const cards = a.cards.map((c) => quote(c.name, lang)).join(" · ");
  const inputs = a.inputs.map((i) => quote(i.name, lang)).join(" · ");
  const tests = a.tests
    .filter((t) => !t.hidden)
    .map((t) => `- ${sequence(a, t.inputs)} → ${quote(name(a, t.end), lang)}`)
    .join("\n");
  const begin = props.mode === "verbessern" ? `\n\n${listing(task.start, a, lang)}` : "";
  return {
    task: `**${a.name}.** ${a.text}\n\n${cards}\n\n${inputs}\n\n${tests}${begin}`,
    solution: listing(solution(task), a, lang),
  };
}

/** The task once, with the design task as {Aufgabe}. */
export function template(_props: Props, _lang: string): string {
  return "{Aufgabe}";
}

/** What sets a task: the design task by its name. */
export function params(task: Task, _props: Props, _lang: string): Record<string, string> {
  return { Aufgabe: task.aufgabe.name };
}

/** What "Prüfen" says before a design is given: the block's message for no start. */
export function unanswered(props: Props, _lang: string): string {
  return props.noStates;
}

/** What the exercise is, for a tutor. */
export const about = {
  task: {
    de: "Die Jugendlichen entwerfen zu einer Aufgabe (Bedarfsampel, Parkhausschranke, Zahlenschloss, Handysperre) einen Automaten: Sie wählen aus Karten die Zustände (manche Karten sind Eingaben oder Ausgaben), den Startzustand und für jeden Zustand und jede Eingabe das Ziel. Sichtbare Testfolgen können sie abspielen. Dann drücken sie „Prüfen“; es prüft auch verdeckte Testfolgen.",
    en: "The learners design an automaton for a task (pedestrian crossing, car park barrier, combination lock, phone lock): from cards they choose the states (some cards are inputs or outputs), the start state and for each state and each input the target. They can play the visible test sequences. Then they press “Check”, which also tests hidden sequences.",
  },
  answer: {
    de: "Ein Entwurf: gewählte Zustände, Startzustand, je Zustand und Eingabe ein Ziel. In der Tabelle: je Zustand seine Pfeile, „↺“ heißt, der Pfeil führt zurück zum selben Zustand.",
    en: "A design: chosen states, start state, a target for each state and input. In the table: each state with its arrows; “↺” means the arrow leads back to the same state.",
  },
  correct: {
    de: "Richtig ist jeder Entwurf ohne Eingabe- oder Ausgabe-Karte, mit dem Startzustand der Aufgabe, vollständig, bei dem alle Testfolgen (auch die verdeckten) im erwarteten Zustand enden. Geprüft wird über diese Eigenschaften, nicht durch Vergleich mit der Lösung; die Testfolgen laufen zusammen über jeden Pfeil, sodass nur der Entwurf der Aufgabe sie alle besteht (die Reihenfolge der Karten ist egal).",
    en: "Right is any design with no input or output card, the task's start state, complete, in which every test sequence (also the hidden ones) ends in the expected state. It is checked by these properties, not by comparing with the solution; the test sequences pass every arrow between them, so only the design of the task passes them all (the order of the cards does not matter).",
  },
  mistakes: [
    {
      de: "Eine Eingabe oder Ausgabe als Zustand gewählt.",
      en: "An input or output chosen as a state.",
    },
    {
      de: "Eine Zeile leer gelassen: Für einen Zustand fehlt bei einer Eingabe das Ziel.",
      en: "A row left empty: for one state an input has no target.",
    },
    {
      de: "Ein Pfeil führt in den falschen Zustand: Eine Testfolge endet anders als verlangt.",
      en: "An arrow leads to the wrong state: a test sequence ends differently from what is asked.",
    },
  ],
};
