// The geometry of AutomatDiagramm.vue: where the circles, arrows, arrowheads and labels of a state diagram go. Pure
// functions, tested in AutomatDiagramm.test.ts. Arrows with the same start and end share one arrow and one label
// ("Münze, Knopf"); an arrow whose reverse exists bends to its own side; an arrow back to the same circle is a loop in
// the direction the state gives. Written for lernapps/informatik-automaten (#500).
import { output, type Automat } from "./Automat.ts";

/** The radius of a state's circle, and the size of the font, in drawing units. */
export const R = 58;
export const FONT = 26;
/** The height of a line of a label. */
export const LINE = FONT * 1.15;

/** One arrow of the drawing: its path, its arrowhead, its label and the transitions it stands for. */
export interface Arrow {
  key: string;
  from: number;
  to: number;
  /** The inputs it stands for, with the output of each (undefined: none). */
  parts: { input: number; output: string | undefined }[];
  path: string;
  head: string;
  /** Where the label stands (its first line, or its last when it grows up), and how it is anchored. */
  lx: number;
  ly: number;
  anchor: "start" | "middle" | "end";
  /** Whether a label of several lines grows upwards from ly (it stands above its arrow). */
  up: boolean;
}

/** A point. */
interface P {
  x: number;
  y: number;
}

const round = (n: number) => Math.round(n * 10) / 10;
const pt = (p: P) => `${round(p.x)} ${round(p.y)}`;

/** The arrowhead at `tip`, pointing in the direction from `back` to `tip`. */
export function head(tip: P, back: P, size = 13): string {
  const dx = tip.x - back.x;
  const dy = tip.y - back.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const left = { x: tip.x - ux * size - uy * size * 0.5, y: tip.y - uy * size + ux * size * 0.5 };
  const right = { x: tip.x - ux * size + uy * size * 0.5, y: tip.y - uy * size - ux * size * 0.5 };
  return `${pt(tip)} ${pt(left)} ${pt(right)}`;
}

/** The anchor of a label that sits in direction (dx, dy) from its point. */
const anchorOf = (dx: number): "start" | "middle" | "end" => (dx > 0.35 ? "start" : dx < -0.35 ? "end" : "middle");

/** The arrows of the automaton, grouped by start and end, in the order of their first transition. */
export function arrows(automat: Automat, hidden?: { from: number; input: number }): Arrow[] {
  const groups = new Map<string, { from: number; to: number; bend: number; parts: Arrow["parts"] }>();
  for (const t of automat.transitions) {
    if (hidden && t.from === hidden.from && t.input === hidden.input) continue;
    const key = `${t.from}>${t.to}`;
    const group = groups.get(key) ?? { from: t.from, to: t.to, bend: t.bend, parts: [] };
    group.parts.push({ input: t.input, output: output(automat, t.from, t.input) });
    if (t.bend !== 0) group.bend = t.bend;
    groups.set(key, group);
  }
  return [...groups.entries()].flatMap(([key, g]) => {
    const a = automat.states[g.from];
    const b = automat.states[g.to];
    if (!a || !b) return [];
    const reverse = g.from !== g.to && groups.has(`${g.to}>${g.from}`);
    const shape = g.from === g.to ? loop(a, a.loop) : line(a, b, g.bend !== 0 ? g.bend : reverse ? 34 : 0);
    return [{ key, from: g.from, to: g.to, parts: g.parts, ...shape }];
  });
}

/** An arrow from circle `a` to circle `b`, straight or bent by `bend` to its left. */
export function line(a: P, b: P, bend: number): Omit<Arrow, "key" | "from" | "to" | "parts"> {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  // the normal to the left of the direction of travel (in screen coordinates, y down)
  const nx = uy;
  const ny = -ux;
  const mid = { x: (a.x + b.x) / 2 + nx * bend * 2, y: (a.y + b.y) / 2 + ny * bend * 2 };
  const toward = (from: P, to: P) => {
    const ex = to.x - from.x;
    const ey = to.y - from.y;
    const el = Math.hypot(ex, ey) || 1;
    return { x: from.x + (ex / el) * R, y: from.y + (ey / el) * R };
  };
  const start = bend === 0 ? toward(a, b) : toward(a, mid);
  const tip = bend === 0 ? toward(b, a) : toward(b, mid);
  const path = bend === 0 ? `M${pt(start)} L${pt(tip)}` : `M${pt(start)} Q${pt(mid)} ${pt(tip)}`;
  // the point of the curve halfway, then the label a little further to the left side
  const half = bend === 0 ? { x: (start.x + tip.x) / 2, y: (start.y + tip.y) / 2 } : quadHalf(start, mid, tip);
  // the side of the label: the side the arrow bends to; a straight arrow has its label above, or right of it when it
  // runs up or down
  let side = Math.sign(bend);
  if (side === 0) side = ny < -0.2 || (Math.abs(ny) <= 0.2 && nx > 0) ? 1 : -1;
  const ox = nx * side;
  const oy = ny * side;
  const gap = 10;
  const lx = half.x + ox * gap;
  const ly = half.y + oy * gap + (oy > 0.3 ? FONT * 0.8 : oy < -0.3 ? 0 : FONT * 0.35);
  return { path, head: head(tip, bend === 0 ? start : mid), lx, ly, anchor: anchorOf(ox), up: oy < -0.3 };
}

/** The point halfway along a quadratic curve. */
const quadHalf = (p0: P, c: P, p1: P): P => ({
  x: 0.25 * p0.x + 0.5 * c.x + 0.25 * p1.x,
  y: 0.25 * p0.y + 0.5 * c.y + 0.25 * p1.y,
});

/** An arrow back to the same circle, bulging out in the direction `degrees`. */
export function loop(s: P, degrees: number): Omit<Arrow, "key" | "from" | "to" | "parts"> {
  const rad = (degrees * Math.PI) / 180;
  const spread = (24 * Math.PI) / 180;
  const on = (angle: number, dist: number) => ({ x: s.x + Math.cos(angle) * dist, y: s.y + Math.sin(angle) * dist });
  const start = on(rad - spread, R);
  const tip = on(rad + spread, R);
  const c1 = on(rad - spread * 1.6, R * 2.5);
  const c2 = on(rad + spread * 1.6, R * 2.5);
  const top = on(rad, R * 1.95);
  const ux = Math.cos(rad);
  const uy = Math.sin(rad);
  return {
    path: `M${pt(start)} C${pt(c1)} ${pt(c2)} ${pt(tip)}`,
    head: head(tip, c2),
    lx: top.x + ux * 8,
    ly: top.y + (uy > 0.3 ? FONT * 0.95 : uy < -0.3 ? -6 : FONT * 0.35),
    anchor: anchorOf(ux),
    up: uy < -0.3,
  };
}

/** The lines of a state's name in its circle: split at the space nearest the middle when it is long. */
export function nameLines(name: string): string[] {
  if (name.length <= 9 || !name.includes(" ")) return [name];
  const middle = name.length / 2;
  let best = -1;
  for (let i = 0; i < name.length; i++)
    if (name[i] === " " && (best < 0 || Math.abs(i - middle) < Math.abs(best - middle))) best = i;
  return [name.slice(0, best), name.slice(best + 1)];
}

/** The font size of a state's name: 22, smaller for a long word, so that it fits inside the circle. */
export function stateFont(name: string): number {
  const longest = Math.max(...nameLines(name).map((l) => l.length));
  return Math.min(22, Math.floor((2 * R * 0.82) / (longest * 0.56)));
}

/** The text of a label, for its width: the inputs joined, each with " / output". */
export const labelText = (parts: { input: string; output: string | undefined }[]) =>
  parts.map((p) => (p.output === undefined ? p.input : `${p.input} / ${p.output}`)).join(", ");

/** One line of a label: inputs (with a slash when an output follows) or an output. */
export interface LabelLine {
  inputs: string;
  slash: boolean;
  output: string;
}

/**
 * The lines of a label: the inputs without output on one line ("Münze, Knopf"); each input with an output on a line of
 * its own ending in " /", and its output on the next line. Two short lines fit a phone better than one long one.
 */
export function labelLines(parts: { input: string; output: string | undefined }[]): LabelLine[] {
  const plain = parts.filter((p) => p.output === undefined).map((p) => p.input);
  const out: LabelLine[] = plain.length > 0 ? [{ inputs: plain.join(", "), slash: false, output: "" }] : [];
  for (const p of parts) {
    if (p.output === undefined) continue;
    out.push({ inputs: p.input, slash: true, output: "" }, { inputs: "", slash: false, output: p.output });
  }
  return out;
}

/** The offset of the first line of a label from ly: upwards by all but one line when it grows up. */
export const firstLine = (count: number, up: boolean) => (up ? -(count - 1) * LINE : 0);

/** The box that holds the whole drawing, with a margin: circles, the start arrow, every label and the extra points. */
export function viewBox(
  automat: Automat,
  all: Arrow[],
  names: (input: number) => string,
  extra: readonly { x: number; y: number }[] = [],
): string {
  const xs: number[] = extra.map((p) => p.x);
  const ys: number[] = extra.map((p) => p.y);
  for (const s of automat.states) {
    xs.push(s.x - R, s.x + R);
    ys.push(s.y - R, s.y + R);
  }
  const start = automat.states[automat.start];
  if (start) xs.push(start.x - R - 70);
  for (const a of all) {
    const label = labelLines(a.parts.map((p) => ({ input: names(p.input), output: p.output })));
    const longest = Math.max(...label.map((l) => l.inputs.length + l.output.length + (l.slash ? 2 : 0)));
    const width = longest * FONT * 0.56;
    const left = a.anchor === "start" ? a.lx : a.anchor === "end" ? a.lx - width : a.lx - width / 2;
    xs.push(left, left + width);
    const top = a.ly + firstLine(label.length, a.up);
    ys.push(top - FONT, top + (label.length - 1) * LINE + 6);
    if (a.from === a.to) {
      const s = automat.states[a.from];
      if (s) {
        const rad = (s.loop * Math.PI) / 180;
        ys.push(s.y + Math.sin(rad) * R * 2.3);
      }
    }
  }
  const m = 8;
  const x = Math.floor(Math.min(...xs) - m);
  const y = Math.floor(Math.min(...ys) - m);
  return `${x} ${y} ${Math.ceil(Math.max(...xs) + m - x)} ${Math.ceil(Math.max(...ys) + m - y)}`;
}

/**
 * The direction, in degrees, in which a short arrow can leave `state` with the most room: the farthest from the arrows
 * to other circles, from its loop and from the start arrow.
 */
export function freeDirection(automat: Automat, state: number): number {
  const s = automat.states[state];
  if (!s) return 90;
  const taken: number[] = [s.loop];
  if (automat.start === state) taken.push(180);
  for (const t of automat.transitions) {
    const other = t.from === state && t.to !== state ? t.to : t.to === state && t.from !== state ? t.from : -1;
    const o = automat.states[other];
    if (!o) continue;
    const angle = (Math.atan2(o.y - s.y, o.x - s.x) * 180) / Math.PI;
    taken.push(angle - 25, angle + 25);
  }
  const apart = (a: number, b: number) => Math.abs(((((a - b) % 360) + 540) % 360) - 180);
  let best = 90;
  let room = -1;
  for (let d = 90; d < 450; d += 15) {
    const r = Math.min(...taken.map((t) => apart(d, t)));
    if (r > room) {
      room = r;
      best = d % 360;
    }
  }
  return best;
}

/** The start arrow: from the left into the start state. */
export function startArrow(automat: Automat): { path: string; head: string; lx: number; ly: number } | undefined {
  const s = automat.states[automat.start];
  if (!s) return undefined;
  const from = { x: s.x - R - 64, y: s.y };
  const tip = { x: s.x - R, y: s.y };
  return { path: `M${pt(from)} L${pt(tip)}`, head: head(tip, from), lx: from.x, ly: s.y - 10 };
}
