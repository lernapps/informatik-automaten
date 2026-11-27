// The logic of AutomatBild.vue: a design of the data file fehlerbilder as an automaton of the model (Automat.ts),
// so that AutomatDiagramm draws it. A design there may lack an arrow or have two arrows with the same input from one
// state; it has no outputs and no texts. Written for lernapps/informatik-automaten (#500).
import type { Automat } from "./Automat.ts";

/** A design of the data file fehlerbilder. */
export interface Bild {
  nr: number;
  name: string;
  start: number;
  states: { name: string; x: number; y: number; loop: number }[];
  inputs: { name: string }[];
  transitions: { from: number; input: number; to: number; bend: number }[];
}

/** The design with the number `nr` (else the first) as an automaton without outputs. */
export function bildAutomat(bilder: readonly Bild[], nr: number): Automat {
  const bild = bilder.find((b) => b.nr === nr) ?? bilder[0];
  if (bild === undefined) throw new Error("AutomatBild: the data file fehlerbilder is empty");
  return { ...bild, transitions: bild.transitions.map((t) => ({ ...t, text: "" })), outputs: [] };
}
