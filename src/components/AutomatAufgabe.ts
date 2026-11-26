// The logic of AutomatAufgabe.vue, the exercise of the automaton simulator. Pure functions, which the build tests over
// fixed seeds (the exercise contract). Two kinds of task, one per block (prop mode):
// - folge: an automaton of the data file, its start state and 3 to 5 inputs; the learner chooses the state it is in at
//   the end. Typical mistakes: the last input left out, the arrows read backwards, still at the start.
// - pfeil: one arrow of the diagram is missing; a sentence says what happens; the learner chooses where the arrow
//   leads. Typical mistakes: the arrow back to where it starts although the state changes; a change although nothing
//   changes.
// - fehler (chapter entwerfen): one arrow of an automaton is drawn wrong, and a test sequence of 2 to 4 inputs ends
//   elsewhere than it should; the learner chooses the wrong arrow. The task is drawn so that only that arrow, set
//   right, makes the sequence end as it should. Typical mistakes: an arrow the sequence does not pass; an arrow it
//   passes that is right.
// An answer is the number of the state chosen (folge, pfeil) or of the arrow chosen, its place in the list of
// transitions (fehler). Written for lernapps/informatik-automaten (#500).
import { end, fill, inputName, lines, run, stateName, transition, type Automat } from "./Automat.ts";

/** The props the logic needs. */
export interface Props {
  automata: Automat[];
  /** The numbers (nr) of the automata the tasks are drawn from. */
  use: number[];
  mode: "folge" | "pfeil" | "fehler";
  /**
   * The task, with {automat}, {start} and {inputs} (folge), {text}, {from} and {input} (pfeil), {automat}, {start},
   * {inputs}, {expected} and {actual} (fehler).
   */
  task: string;
  /** The word before an output in the text without JavaScript. */
  outputWord: string;
  /** The app's message for each typical mistake of the block's mode, in the order of about.mistakes, with {start}, {last}. */
  mistakes: string[];
  /** The message for any other wrong answer, with {start}. */
  other: string;
}

/** A task: the automaton, and the inputs (folge, fehler) or the arrow left out (pfeil). */
export interface Task {
  mode: "folge" | "pfeil" | "fehler";
  /** The automaton as drawn; in mode fehler with the wrong arrow. */
  automat: Automat;
  inputs: number[];
  hidden: { from: number; input: number } | undefined;
  /** fehler: the place of the wrong arrow in the transitions, where it should lead, where the sequence should end. */
  fehler: { index: number; right: number; expected: number } | undefined;
}

/** The number of the state chosen; undefined while none is. */
export type Answer = number | undefined;

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

const any = <T>(list: readonly T[], next: () => number): T => {
  const item = list[Math.floor(next() * list.length)];
  if (item === undefined) throw new Error("AutomatAufgabe: nothing to draw from");
  return item;
};

/** The automata a block may use. */
const usable = (props: Props) => props.automata.filter((a) => props.use.includes(a.nr));

/** The state reached when each arrow is read backwards: from where it points to where it starts. */
export function backwards(automat: Automat, inputs: readonly number[]): number {
  let state = automat.start;
  for (const input of inputs) {
    const back = automat.transitions.filter((t) => t.to === state && t.input === input && t.from !== state);
    if (back.length === 1 && back[0]) state = back[0].from;
  }
  return state;
}

/** The places of the transitions a sequence passes, in the order it passes them. */
export function passed(automat: Automat, inputs: readonly number[]): number[] {
  return run(automat, inputs).map((s) =>
    automat.transitions.findIndex((t) => t.from === s.from && t.input === s.input),
  );
}

/** Whether the arrow at `index`, set to some state, makes the sequence end at `expected`. */
function mends(automat: Automat, inputs: readonly number[], index: number, expected: number): boolean {
  return automat.states.some((_, to) => {
    const transitions = automat.transitions.map((t, j) => (j === index ? { ...t, to } : t));
    return end({ ...automat, transitions }, inputs) === expected;
  });
}

/** A task of mode fehler: an arrow set wrong, and a sequence that only setting that arrow right mends. */
function fehlerTask(automata: readonly Automat[], next: () => number): Task {
  for (let tries = 0; tries < 2000; tries++) {
    const right = any(automata, next);
    const index = Math.floor(next() * right.transitions.length);
    const t = right.transitions[index];
    if (!t) continue;
    const to = any(
      right.states.map((_, n) => n).filter((n) => n !== t.to),
      next,
    );
    const automat = {
      ...right,
      transitions: right.transitions.map((x, j) => (j === index ? { ...x, to, bend: 0 } : x)),
    };
    const count = 2 + Math.floor(next() * 3);
    const inputs = Array.from({ length: count }, () => Math.floor(next() * right.inputs.length));
    const expected = end(right, inputs);
    if (end(automat, inputs) === expected) continue;
    const used = passed(automat, inputs);
    if (!used.includes(index)) continue;
    if (used.some((u) => u !== index && mends(automat, inputs, u, expected))) continue;
    return { mode: "fehler", automat, inputs, hidden: undefined, fehler: { index, right: t.to, expected } };
  }
  throw new Error("AutomatAufgabe: no task of mode fehler found");
}

/** The task of `seed`. folge: the last input changes the state, so that leaving it out is a mistake of its own. */
export function generate(seed: number, props: Props): Task {
  const next = random(seed);
  const automata = usable(props);
  if (props.mode === "fehler") return fehlerTask(automata, next);
  if (props.mode === "pfeil") {
    const automat = any(automata, next);
    const t = any(automat.transitions, next);
    return { mode: "pfeil", automat, inputs: [], hidden: { from: t.from, input: t.input }, fehler: undefined };
  }
  // the automaton and the state the sequence ends in are drawn first, so that every state is the answer equally often
  // (else the juice machine mostly ends empty, and the first button would win)
  const automat = any(automata, next);
  const target = Math.floor(next() * automat.states.length);
  let fallback: Task | undefined;
  for (let tries = 0; tries < 400; tries++) {
    const count = 3 + Math.floor(next() * 3);
    const inputs = Array.from({ length: count }, () => Math.floor(next() * automat.inputs.length));
    const task: Task = { mode: "folge", automat, inputs, hidden: undefined, fehler: undefined };
    const changes = end(automat, inputs.slice(0, -1)) !== end(automat, inputs);
    if (changes) fallback ??= task;
    if (changes && end(automat, inputs) === target) return task;
  }
  return fallback ?? { mode: "folge", automat, inputs: [0, 0, 0], hidden: undefined, fehler: undefined };
}

/** The right answer: the state at the end (folge), the end of the missing arrow (pfeil), the wrong arrow (fehler). */
export function solution(task: Task): number {
  if (task.mode === "fehler" && task.fehler) return task.fehler.index;
  if (task.mode === "pfeil" && task.hidden) {
    return transition(task.automat, task.hidden.from, task.hidden.input)?.to ?? task.hidden.from;
  }
  return end(task.automat, task.inputs);
}

/** Whether the state chosen is the right one. */
export function check(task: Task, answer: Answer): boolean {
  return answer !== undefined && answer === solution(task);
}

/** A wrong answer: another state of the automaton, or another arrow. */
export function wrong(task: Task): number {
  return solution(task) === 0 ? 1 : 0;
}

/**
 * The answer of each typical mistake, in the order of about.mistakes of the mode; undefined where it would be right.
 * folge: the last input left out; the arrows read backwards; still at the start.
 * pfeil: the arrow back to its own state although the state changes; another state (state 0, or 1 when the arrow
 * starts at 0) although nothing changes.
 * fehler: the first arrow the sequence does not pass; the first arrow it passes that is right.
 * folge with two states: none, since every wrong answer is the other state.
 */
export function mistakes(task: Task, _props?: Props): (number | undefined)[] {
  const right = solution(task);
  if (task.mode === "fehler") {
    const used = passed(task.automat, task.inputs);
    const unused = task.automat.transitions.findIndex((_, j) => !used.includes(j));
    const other = used.find((u) => u !== right);
    return [undefined, undefined, undefined, undefined, undefined, unused < 0 ? undefined : unused, other];
  }
  const keep = (answer: number) => (answer === right ? undefined : answer);
  if (task.mode === "pfeil" && task.hidden) {
    const other = task.hidden.from === 0 ? 1 : 0;
    return [
      undefined,
      undefined,
      undefined,
      keep(task.hidden.from),
      right === task.hidden.from ? keep(other) : undefined,
      undefined,
      undefined,
    ];
  }
  // with two states every wrong answer is the other state: no typical mistake can be told apart, only the general hint
  if (task.automat.states.length < 3)
    return [undefined, undefined, undefined, undefined, undefined, undefined, undefined];
  return [
    keep(end(task.automat, task.inputs.slice(0, -1))),
    keep(backwards(task.automat, task.inputs)),
    keep(task.automat.start),
    undefined,
    undefined,
    undefined,
    undefined,
  ];
}

/** Where the mistakes of a mode start in the list of mistakes: the props' messages are those of the block's mode. */
const OFFSET = { folge: 0, pfeil: 3, fehler: 5 };

/** The values a text of the props may name. */
interface Values {
  automat: string;
  start: string;
  inputs: string;
  last: string;
  text: string;
  from: string;
  input: string;
  outputWord: string;
  expected: string;
  actual: string;
}

/** The values of a task. */
function values(task: Task, props: Props): Values {
  const a = task.automat;
  const last = task.inputs.at(-1);
  return {
    automat: a.name,
    start: stateName(a, a.start),
    inputs: task.inputs.map((i) => inputName(a, i)).join(", "),
    last: last === undefined ? "" : inputName(a, last),
    text: task.hidden ? (transition(a, task.hidden.from, task.hidden.input)?.text ?? "") : "",
    from: task.hidden ? stateName(a, task.hidden.from) : "",
    input: task.hidden ? inputName(a, task.hidden.input) : "",
    outputWord: props.outputWord,
    expected: task.fehler ? stateName(a, task.fehler.expected) : "",
    actual: task.fehler ? stateName(a, end(a, task.inputs)) : "",
  };
}

/** The task as the learner reads it. */
export const taskText = (task: Task, props: Props) => fill(props.task, { ...values(task, props) });

/** The app's message for a wrong answer: that of its typical mistake, else the general one; never the solution. */
export function reason(task: Task, answer: Answer, props: Props, _lang?: string): string | undefined {
  if (answer === undefined || check(task, answer)) return undefined;
  if (task.mode === "fehler") {
    // every wrong arrow is one of the two kinds: not passed, or passed and right
    const kind = passed(task.automat, task.inputs).includes(answer) ? 1 : 0;
    return fill(props.mistakes[kind] ?? props.other, { ...values(task, props) });
  }
  const index = mistakes(task).findIndex((m) => m === answer);
  const message = index < 0 ? props.other : (props.mistakes[index - OFFSET[task.mode]] ?? props.other);
  return fill(message, { ...values(task, props) });
}

/** An arrow as text: "Mitte – runter → oben". */
export function arrowText(automat: Automat, index: number): string {
  const t = automat.transitions[index];
  return t ? `${stateName(automat, t.from)} – ${inputName(automat, t.input)} → ${stateName(automat, t.to)}` : "–";
}

/** An answer as text: the name of the state, or the arrow. */
export function show(answer: Answer, task: Task, _props?: Props, _lang?: string): string {
  if (answer === undefined) return "–";
  return task.mode === "fehler" ? arrowText(task.automat, answer) : stateName(task.automat, answer);
}

/** The arrows of the task's diagram as text, without the missing one. */
export function arrowsText(task: Task, props: Props): string[] {
  const shown: Automat = task.hidden
    ? {
        ...task.automat,
        transitions: task.automat.transitions.filter(
          (t) => !(t.from === task.hidden?.from && t.input === task.hidden?.input),
        ),
      }
    : task.automat;
  return lines(shown, props.outputWord);
}

/** The task as a learner sees it, with the diagram as a list of arrows, and its solution. */
export function describe(task: Task, props: Props, _lang: string): { task: string; solution: string } {
  const a = task.automat;
  const arrows = arrowsText(task, props)
    .map((l) => `- ${l}`)
    .join("\n");
  const right = solution(task);
  const steps = run(a, task.inputs)
    .map((s) => `${inputName(a, s.input)} → ${stateName(a, s.to)}`)
    .join(", ");
  return {
    task: `${taskText(task, props)}\n\n**${a.name}** (Start: ${stateName(a, a.start)}):\n\n${arrows}`,
    solution:
      task.mode === "fehler" && task.fehler
        ? `${stateName(a, a.start)}: ${steps}. → **${arrowText(a, right)}** (→ ${stateName(a, task.fehler.right)})`
        : task.mode === "folge"
          ? `${stateName(a, a.start)}: ${steps}. → **${stateName(a, right)}**`
          : `→ **${stateName(a, right)}**`,
  };
}

/** The task once, with its placeholders: the prop task. */
export function template(props: Props, _lang: string): string {
  return props.task;
}

/** What sets a task: the automaton and its inputs (folge) or the missing arrow (pfeil). */
export function params(task: Task, props: Props, _lang: string): Record<string, string> {
  const v = values(task, props);
  if (task.mode === "fehler") {
    return { automat: v.automat, start: v.start, inputs: v.inputs, expected: v.expected, actual: v.actual };
  }
  return task.mode === "folge"
    ? { automat: v.automat, start: v.start, inputs: v.inputs }
    : { automat: v.automat, text: v.text, from: v.from, input: v.input };
}

/** What the exercise is, for a tutor. The mistakes of folge come first (3), then those of pfeil (2), then fehler (2). */
export const about = {
  task: {
    de: "folge: Ein Automat ist als Zustandsdiagramm (oder als Kasten mit Zettel) zu sehen, dazu ein Startzustand und 3 bis 5 Eingaben. Das Kind wählt den Zustand am Ende. pfeil: Ein Pfeil des Diagramms fehlt, ein Satz sagt, was passiert; das Kind wählt, wohin der Pfeil führt. fehler: Ein Pfeil ist falsch gezeichnet, eine Testfolge endet deshalb woanders als verlangt; die Jugendlichen wählen den falschen Pfeil. Dann drücken sie „Prüfen“.",
    en: "folge: an automaton is shown as a state diagram (or as a box with a note), with a start state and 3 to 5 inputs. The child chooses the state at the end. pfeil: one arrow of the diagram is missing and a sentence says what happens; the child chooses where the arrow leads. fehler: one arrow is drawn wrong, so a test sequence ends elsewhere than asked; the learners choose the wrong arrow. Then they press “Check”.",
  },
  answer: {
    de: "Ein Zustand: ein Knopf unter dem Diagramm oder ein Kreis. fehler: ein Pfeil, ein Knopf je Pfeil.",
    en: "A state: a button below the diagram or a circle. fehler: an arrow, one button per arrow.",
  },
  correct: {
    de: "folge: der Zustand, in dem der Automat nach der letzten Eingabe ist, wenn er beim Startzustand beginnt und bei jeder Eingabe dem Pfeil mit diesem Wort folgt. pfeil: der Zustand, zu dem der fehlende Pfeil führt. fehler: der einzige Pfeil auf dem Weg der Testfolge, der richtig gesetzt die Folge im verlangten Zustand enden lässt.",
    en: "folge: the state the automaton is in after the last input, starting at the start state and following the arrow with each input's word. pfeil: the state the missing arrow leads to. fehler: the only arrow on the way of the test sequence that, set right, makes the sequence end in the state asked for.",
  },
  mistakes: [
    {
      de: "folge: Die letzte Eingabe vergessen.",
      en: "folge: the last input left out.",
    },
    {
      de: "folge: Pfeile rückwärts gelesen, von der Spitze zum Anfang.",
      en: "folge: arrows read backwards, from the head to the tail.",
    },
    {
      de: "folge: Beim Startzustand stehen geblieben.",
      en: "folge: stayed at the start state.",
    },
    {
      de: "pfeil: Der Pfeil führt zurück zum selben Kreis, obwohl sich laut Satz etwas ändert.",
      en: "pfeil: the arrow goes back to the same circle, although the sentence says something changes.",
    },
    {
      de: "pfeil: Der Pfeil führt zu einem anderen Kreis, obwohl sich laut Satz nichts ändert.",
      en: "pfeil: the arrow goes to another circle, although the sentence says nothing changes.",
    },
    {
      de: "fehler: Einen Pfeil gewählt, über den die Testfolge gar nicht läuft.",
      en: "fehler: an arrow chosen that the test sequence does not pass.",
    },
    {
      de: "fehler: Einen Pfeil auf dem Weg gewählt, der richtig ist; geändert endet die Folge trotzdem nicht wie verlangt.",
      en: "fehler: an arrow on the way chosen that is right; changed, the sequence still does not end as asked.",
    },
  ],
};
