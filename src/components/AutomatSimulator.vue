<script setup lang="ts">
// The automaton simulator: a button for each input; a click makes the automaton jump along its arrow. The view
// "diagramm" shows the state diagram (AutomatDiagramm) with the active state filled and the arrow used last thick;
// the view "kasten" shows only the machine and what it remembers (a note), before the diagram is introduced. Below:
// what came out, the history and "back to start". The new state is announced to screen readers. Chapter 2 (9-10)
// adds a view for designing on the same model (Automat.ts). Written for lernapps/informatik-automaten (#500).
import { computed, ref } from "vue";
import { fill, stateName, step, type Step } from "./Automat.ts";
import AutomatDiagramm from "./AutomatDiagramm.vue";
import { pick, verlauf } from "./AutomatSimulator.ts";

const props = defineProps<{
  /** Every automaton of the data file automaten. */
  automata: {
    nr: number;
    name: string;
    start: number;
    states: { name: string; x: number; y: number; loop: number }[];
    inputs: { name: string }[];
    transitions: { from: number; input: number; to: number; bend: number; text: string }[];
    outputs: { from: number; input: number; text: string }[];
  }[];
  /** The number (nr) of the automaton shown. */
  automat: number;
  /** "diagramm": the state diagram; "kasten": only the machine and its note. */
  view: "diagramm" | "kasten";
  /** The word at the start arrow. */
  startWord: string;
  /** The label of the group of input buttons. */
  inputsLabel: string;
  /** The line of the state now, with {state}; in the view kasten the note, e.g. "Jona merkt sich: {state}". */
  now: string;
  /** The line of the output, with {output}. */
  outputLine: string;
  /** The text when nothing came out. */
  noOutput: string;
  /** The word before the history. */
  historyWord: string;
  /** The label of the reset button. */
  reset: string;
}>();

const automat = computed(() => pick(props.automata, props.automat));
const state = ref(automat.value.start);
const steps = ref<Step[]>([]);
const last = computed(() => steps.value.at(-1));

function press(input: number): void {
  const s = step(automat.value, state.value, input);
  steps.value = [...steps.value, s];
  state.value = s.to;
}

function restart(): void {
  state.value = automat.value.start;
  steps.value = [];
}

const nowText = computed(() => fill(props.now, { state: stateName(automat.value, state.value) }));
const outText = computed(() => fill(props.outputLine, { output: last.value?.output ?? props.noOutput }));
</script>

<template>
  <div class="automat-simulator">
    <AutomatDiagramm
      v-if="view === 'diagramm'"
      :automat="automat"
      :start-word="startWord"
      :active="state"
      :used="last ? { from: last.from, to: last.to } : { from: -1, to: -1 }"
      :selected="-1"
      :hidden="{ from: -1, input: -1 }"
    />
    <div v-else class="automat-simulator-kasten" aria-hidden="true">
      <span class="automat-simulator-schlitz"></span>
      <span class="automat-simulator-zettel">{{ nowText }}</span>
      <span class="automat-simulator-fach">{{ last?.output ?? "" }}</span>
    </div>
    <div class="automat-simulator-inputs" role="group" :aria-label="inputsLabel">
      <button v-for="(input, i) in automat.inputs" :key="i" type="button" @click="press(i)">
        {{ input.name }}
      </button>
    </div>
    <p class="automat-simulator-status" aria-live="polite">
      <strong class="automat-simulator-now">{{ nowText }}</strong
      ><br />
      <span class="automat-simulator-output">{{ outText }}</span>
    </p>
    <p class="automat-simulator-history">{{ historyWord }} {{ verlauf(automat, steps) }}</p>
    <p class="automat-simulator-reset">
      <button type="button" @click="restart">{{ reset }}</button>
    </p>
  </div>
</template>

<style scoped>
.automat-simulator {
  margin: 1rem 0;
  padding: 0.75rem;
  border: 1px solid var(--page-border);
  border-radius: 0.6rem;
  background: var(--page-surface);
  color: var(--page-text);
}

.automat-simulator-inputs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

/* the input buttons in the input colour of the diagram (E of the IPO picture), the state green, the output orange */
.automat-simulator {
  --automat-input: #2f5fb3;
  --automat-on-input: #fff;
  --automat-state: #23704a;
  --automat-output: #a4500f;
}

@media (prefers-color-scheme: dark) {
  .automat-simulator {
    --automat-input: #8fb0ee;
    --automat-on-input: #0d1a33;
    --automat-state: #6cc995;
    --automat-output: #f0a060;
  }
}

.automat-simulator-inputs button {
  min-height: 44px;
  min-width: 6rem;
  padding: 0.4rem 1rem;
  border: 2px solid var(--automat-input);
  border-radius: 0.5rem;
  background: var(--automat-input);
  color: var(--automat-on-input);
  font: inherit;
  font-weight: bold;
  cursor: pointer;
}

.automat-simulator-reset button {
  min-height: 44px;
  padding: 0.4rem 1rem;
  border: 1px solid var(--page-border);
  border-radius: 0.5rem;
  background: var(--page-background);
  color: var(--page-text);
  font: inherit;
  cursor: pointer;
}

.automat-simulator-status {
  margin: 0.75rem 0 0.25rem;
}

.automat-simulator-now {
  color: var(--automat-state);
}

.automat-simulator-output {
  color: var(--automat-output);
  font-style: italic;
}

.automat-simulator-history {
  margin: 0.25rem 0;
  color: var(--page-muted);
  font-size: 0.9em;
}

/* the view kasten: a cardboard machine with a coin slot, the note of what it remembers and the drawer below */
.automat-simulator-kasten {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  max-width: 16rem;
  margin: 0.5rem auto;
  padding: 0.75rem;
  border: 3px solid #8a6a3d;
  border-radius: 0.4rem;
  background: var(--page-background);
  text-align: center;
}

.automat-simulator-schlitz {
  justify-self: end;
  width: 2.5rem;
  height: 0.4rem;
  border-radius: 0.2rem;
  background: var(--page-text);
}

.automat-simulator-zettel {
  padding: 0.5rem;
  border: 1px solid var(--page-border);
  background: var(--page-surface);
  font-weight: bold;
  transform: rotate(-2deg);
}

.automat-simulator-fach {
  min-height: 2.2rem;
  padding: 0.4rem;
  border: 2px solid var(--page-border);
  border-radius: 0.3rem;
  font-style: italic;
}
</style>
