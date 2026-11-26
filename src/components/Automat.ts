// The model of the automaton simulator of this explainer: states, inputs, transitions with an optional output, a start
// state. Pure functions, shared by AutomatDiagramm (drawing), AutomatSimulator (playing) and AutomatAufgabe (exercise).
// Chapter 2 (designing an automaton, 9-10) builds on the same model and data shape: isComplete and run check a
// designed automaton against test sequences. Written for lernapps/informatik-automaten (#500).

/** A state: its name as shown in the circle, its place in the drawing and where its own arrow goes. A state is
 * named everywhere by its number: its place in the list of states, from 0. */
export interface State {
  name: string;
  /** Centre of the circle in a drawing area of about 600 × 300. */
  x: number;
  y: number;
  /** The direction of an arrow back to the same circle, in degrees: -90 above, 90 below. */
  loop: number;
}

/** An input: its name as shown on the button and at the arrow. Named by its place in the list, from 0. */
export interface Input {
  name: string;
}

/** A transition: in state `from`, the input `input` makes the automaton jump to `to`. */
export interface Transition {
  from: number;
  input: number;
  to: number;
  /** The bend of the arrow: 0 straight (or bent by itself when the reverse arrow exists), else the bend in units. */
  bend: number;
  /** What happens, in everyday words, for the exercise that asks for the missing arrow. */
  text: string;
}

/** An output: what comes out when the automaton takes the transition from `from` with `input`. */
export interface Output {
  from: number;
  input: number;
  text: string;
}

/** An automaton of the data file automaten, found by its number nr. (Numbers, not ids: every text the build passes to a
 * component is a learner text in every language.) */
export interface Automat {
  nr: number;
  name: string;
  start: number;
  states: State[];
  inputs: Input[];
  transitions: Transition[];
  outputs: Output[];
}

/** The result of one step: the transition taken (none if the automaton has no arrow for it) and its output. */
export interface Step {
  from: number;
  input: number;
  to: number;
  output: string | undefined;
}

/** The transition from `state` with `input`, if there is one. */
export const transition = (automat: Automat, state: number, input: number): Transition | undefined =>
  automat.transitions.find((t) => t.from === state && t.input === input);

/** The output of the transition from `state` with `input`, if it has one. */
export const output = (automat: Automat, state: number, input: number): string | undefined =>
  automat.outputs.find((o) => o.from === state && o.input === input)?.text;

/** One step: where the automaton goes from `state` with `input`. Without an arrow it stays. */
export function step(automat: Automat, state: number, input: number): Step {
  const t = transition(automat, state, input);
  return { from: state, input, to: t ? t.to : state, output: t ? output(automat, state, input) : undefined };
}

/** All steps of a sequence of inputs, from `from` (the start state unless given). */
export function run(automat: Automat, inputs: readonly number[], from = automat.start): Step[] {
  const steps: Step[] = [];
  let state = from;
  for (const input of inputs) {
    const s = step(automat, state, input);
    steps.push(s);
    state = s.to;
  }
  return steps;
}

/** The state after a sequence of inputs. */
export const end = (automat: Automat, inputs: readonly number[], from = automat.start): number =>
  run(automat, inputs, from).at(-1)?.to ?? from;

/** The pairs of state and input that have no arrow; empty when the automaton is complete. */
export function missing(automat: Automat): { state: number; input: number }[] {
  return automat.states.flatMap((_, s) =>
    automat.inputs.flatMap((_, i) => (transition(automat, s, i) === undefined ? [{ state: s, input: i }] : [])),
  );
}

/** Whether every state has exactly one arrow for every input, and every arrow leads to a state of the automaton. */
export function isComplete(automat: Automat): boolean {
  const isState = (n: number) => Number.isInteger(n) && n >= 0 && n < automat.states.length;
  const once = automat.states.every((_, s) =>
    automat.inputs.every((_, i) => automat.transitions.filter((t) => t.from === s && t.input === i).length === 1),
  );
  return once && isState(automat.start) && automat.transitions.every((t) => isState(t.from) && isState(t.to));
}

/** The name of a state, or its number when there is none. */
export const stateName = (automat: Automat, n: number): string => automat.states[n]?.name ?? String(n);

/** The name of an input, or its number when there is none. */
export const inputName = (automat: Automat, n: number): string => automat.inputs[n]?.name ?? String(n);

/** A text with each {name} replaced by its value. */
export function fill(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (all, key: string) => (key in values ? String(values[key]) : all));
}

/** Every arrow of the automaton as a line of text: "0 € drin – Münze → 1 € drin (Ausgabe: …)". */
export function lines(automat: Automat, outputWord: string): string[] {
  return automat.transitions.map((t) => {
    const out = output(automat, t.from, t.input);
    const tail = out === undefined ? "" : ` (${outputWord}: ${out})`;
    return `${stateName(automat, t.from)} – ${inputName(automat, t.input)} → ${stateName(automat, t.to)}${tail}`;
  });
}
