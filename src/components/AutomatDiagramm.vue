<script setup lang="ts">
// The state diagram of an automaton, drawn as SVG: states as circles with their name, the start arrow from the left,
// transitions as arrows labelled "input / output" (input blue, output orange, as E and A of the IPO picture of #490;
// the slash is the second mark beside the colour). The active state is filled, the arrow used last is thick, a
// selected state has a dashed ring. Used by AutomatSimulator and AutomatAufgabe; all words come from their props.
// Written for lernapps/informatik-automaten (#500).
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { inputName } from "./Automat.ts";
import {
  FONT,
  LINE,
  R,
  arrows,
  firstLine,
  freeDirection,
  labelLines,
  line,
  loop,
  NARROW_LINE,
  nameLines,
  startArrow,
  stateFont,
  viewBox,
  type Arrow,
} from "./AutomatDiagramm.ts";

type Automaton = {
  nr: number;
  name: string;
  start: number;
  states: { name: string; x: number; y: number; loop: number }[];
  inputs: { name: string }[];
  transitions: { from: number; input: number; to: number; bend: number; text: string }[];
  outputs: { from: number; input: number; text: string }[];
};

const props = defineProps<{
  automat: Automaton;
  /** The word at the start arrow. */
  startWord: string;
  /** The state the automaton is in now, filled; -1: none. */
  active: number;
  /** The arrow used last, from and to; -1: none. */
  used: { from: number; to: number };
  /** A state the learner chose, with a dashed ring; -1: none. */
  selected: number;
  /** A transition left out of the drawing, drawn as a dashed arrow with "?" (to `selected`, once chosen); from -1: none. */
  hidden: { from: number; input: number };
}>();
const emit = defineEmits<{ pick: [number] }>();

/** The lines of an arrow's label, with the names of its inputs. */
const label = (arrow: Arrow) =>
  labelLines(
    arrow.parts.map((p) => ({ input: inputName(props.automat, p.input), output: p.output })),
    narrow.value ? NARROW_LINE : 0,
  );

/** The shift of line `j` of a state's name: the lines centred on the middle of the circle. */
const nameDy = (name: string, j: number) => {
  const size = stateFont(name, narrow.value);
  const count = nameLines(name, narrow.value).length;
  return j === 0 ? size * 0.35 - ((count - 1) * size * 1.1) / 2 : size * 1.1;
};

// a narrow screen (a phone): long outputs on short lines and state names on short lines, written larger, so that
// the drawing, scaled down to the width, stays readable. Known only once mounted; the server draws the wide form.
const narrow = ref(false);
let query: MediaQueryList | undefined;
const watchWidth = () => {
  narrow.value = query?.matches ?? false;
};
onMounted(() => {
  query = window.matchMedia("(max-width: 30rem)");
  watchWidth();
  query.addEventListener("change", watchWidth);
});
onBeforeUnmount(() => query?.removeEventListener("change", watchWidth));

const all = computed(() => arrows(props.automat, props.hidden.from < 0 ? undefined : props.hidden));
const start = computed(() => startArrow(props.automat));

// the missing arrow: a short dashed stub below its state, or a dashed arrow to the state chosen
const gap = computed(() => {
  const h = props.hidden;
  const from = props.automat.states[h.from];
  if (!from) return undefined;
  const to = props.automat.states[props.selected];
  const input = inputName(props.automat, h.input);
  if (to === undefined) {
    const free = freeDirection(props.automat, h.from);
    const down = Math.sin((free * Math.PI) / 180);
    const rad = (free * Math.PI) / 180;
    const a = { x: from.x + Math.cos(rad) * R, y: from.y + Math.sin(rad) * R };
    const b = { x: from.x + Math.cos(rad) * (R + 46), y: from.y + Math.sin(rad) * (R + 46) };
    const left = Math.cos(rad) < -0.3;
    return {
      path: `M${a.x} ${a.y} L${b.x} ${b.y}`,
      lx: b.x + (left ? -8 : 8),
      ly: b.y + (down > 0.3 ? FONT : down < -0.3 ? 0 : FONT * 0.35),
      anchor: left ? "end" : "start",
      input,
    };
  }
  // the chosen arrow keeps clear of the arrows already drawn: a loop on the other side of the circle, a line bent
  // further out when an arrow between the two circles exists
  const taken = props.automat.transitions.some(
    (t) => (t.from === h.from && t.to === props.selected) || (t.from === props.selected && t.to === h.from),
  );
  const shape = props.selected === h.from ? loop(from, from.loop + 180) : line(from, to, taken ? 62 : 0);
  return { path: shape.path, head: shape.head, lx: shape.lx, ly: shape.ly, anchor: shape.anchor, input };
});

// the box holds the missing arrow and its label too: a few points around where they are
const box = computed(() => {
  const g = gap.value;
  const width = g ? (g.input.length + 2) * FONT * 0.56 : 0;
  const extra = g
    ? [
        { x: g.lx - (g.anchor === "start" ? 0 : width), y: g.ly - FONT },
        { x: g.lx + (g.anchor === "end" ? 0 : width), y: g.ly + 8 },
      ]
    : [];
  return viewBox(props.automat, all.value, (id) => inputName(props.automat, id), extra, narrow.value);
});
</script>

<template>
  <svg class="automat-diagramm" :viewBox="box" role="presentation" aria-hidden="true">
    <g v-if="start" class="automat-diagramm-start">
      <path :d="start.path" />
      <polygon :points="start.head" />
      <text :x="start.lx" :y="start.ly">{{ startWord }}</text>
    </g>
    <g
      v-for="arrow in all"
      :key="arrow.key"
      :class="['automat-diagramm-arrow', { used: arrow.key === `${used.from}>${used.to}` }]"
    >
      <path :d="arrow.path" />
      <polygon :points="arrow.head" />
      <text :y="arrow.ly" :text-anchor="arrow.anchor">
        <tspan
          v-for="(l, i) in label(arrow)"
          :key="i"
          :x="arrow.lx"
          :dy="i === 0 ? firstLine(label(arrow).length, arrow.up) : LINE"
          :class="l.output ? 'automat-diagramm-output' : 'automat-diagramm-input'"
        >
          {{ l.output || l.inputs }}
          <tspan v-if="l.slash" class="automat-diagramm-slash">{{ " /" }}</tspan>
        </tspan>
      </text>
    </g>
    <g v-if="gap" class="automat-diagramm-arrow automat-diagramm-gap">
      <path :d="gap.path" />
      <polygon v-if="gap.head" :points="gap.head" />
      <text :x="gap.lx" :y="gap.ly" :text-anchor="gap.anchor">
        <tspan class="automat-diagramm-input">{{ gap.input }}</tspan>
        <tspan v-if="selected < 0" dx="6">?</tspan>
      </text>
    </g>
    <g
      v-for="(state, i) in automat.states"
      :key="i"
      :class="['automat-diagramm-state', { active: i === active, selected: i === selected }]"
      @click="emit('pick', i)"
    >
      <circle v-if="i === selected" class="automat-diagramm-ring" :cx="state.x" :cy="state.y" :r="R + 7" />
      <circle :cx="state.x" :cy="state.y" :r="R" />
      <text :x="state.x" :y="state.y" text-anchor="middle" :style="{ fontSize: `${stateFont(state.name, narrow)}px` }">
        <tspan v-for="(part, j) in nameLines(state.name, narrow)" :key="j" :x="state.x" :dy="nameDy(state.name, j)">
          {{ part }}
        </tspan>
      </text>
    </g>
  </svg>
</template>

<style scoped>
.automat-diagramm {
  /* the colours of the IPO picture of #490: input blue, the state (what is kept) green, output orange */
  --automat-input: #2f5fb3;
  --automat-state: #23704a;
  --automat-on-state: #fff;
  --automat-output: #a4500f;
  display: block;
  width: 100%;
  max-width: 40rem;
  height: auto;
  max-height: 70vh;
  margin: 0.5rem auto;
  font-size: 26px;
  font-family: inherit;
}

@media (prefers-color-scheme: dark) {
  .automat-diagramm {
    --automat-input: #8fb0ee;
    --automat-state: #6cc995;
    --automat-on-state: #0d2418;
    --automat-output: #f0a060;
  }
}

.automat-diagramm text {
  fill: var(--page-text);
  white-space: pre;
}

.automat-diagramm .automat-diagramm-slash {
  fill: var(--page-text);
  font-style: normal;
  font-weight: normal;
}

.automat-diagramm-arrow path,
.automat-diagramm-start path {
  fill: none;
  stroke: var(--page-text);
  stroke-width: 2;
}

.automat-diagramm-arrow polygon,
.automat-diagramm-start polygon {
  fill: var(--page-text);
}

.automat-diagramm-arrow.used path {
  stroke: var(--automat-state);
  stroke-width: 6;
}

.automat-diagramm-arrow.used polygon {
  fill: var(--automat-state);
}

.automat-diagramm-gap path {
  stroke-dasharray: 7 5;
}

.automat-diagramm .automat-diagramm-input {
  fill: var(--automat-input);
  font-weight: bold;
}

.automat-diagramm .automat-diagramm-output {
  fill: var(--automat-output);
  font-style: italic;
}

.automat-diagramm-state {
  cursor: pointer;
}

.automat-diagramm-state text {
  font-size: 22px;
}

.automat-diagramm-state circle {
  fill: var(--page-surface);
  stroke: var(--page-text);
  stroke-width: 2;
}

.automat-diagramm-state.active circle {
  fill: var(--automat-state);
  stroke: var(--automat-state);
  stroke-width: 6;
}

.automat-diagramm-state.active text {
  fill: var(--automat-on-state);
  font-weight: bold;
}

.automat-diagramm-state .automat-diagramm-ring {
  fill: none;
  stroke: var(--page-accent);
  stroke-width: 3;
  stroke-dasharray: 6 4;
}
</style>
