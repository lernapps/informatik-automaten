// The logic of AutomatSimulator.vue: which automaton of the data file it shows, and the text of its history line.
// Pure functions, tested in AutomatSimulator.test.ts. Written for lernapps/informatik-automaten (#500).
import { inputName, stateName, type Automat, type Step } from "./Automat.ts";

/** The automaton with the number `nr`, else the first one. */
export function pick(automata: readonly Automat[], nr: number): Automat {
  const found = automata.find((a) => a.nr === nr) ?? automata[0];
  if (found === undefined) throw new Error("AutomatSimulator: the data file automaten is empty");
  return found;
}

/** The history (Verlauf): the start state, then each input and the state it led to: "0 € drin → Münze → 1 € drin". */
export function verlauf(automat: Automat, steps: readonly Step[]): string {
  return [
    stateName(automat, automat.start),
    ...steps.flatMap((s) => [inputName(automat, s.input), stateName(automat, s.to)]),
  ].join(" → ");
}
