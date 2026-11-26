<script setup lang="ts">
// The exercise of the automaton simulator, for the task of the number seed (logic in AutomatAufgabe.ts): above the
// task text the automaton as a state diagram (view diagramm) or no figure (view kasten, the rules are on the page);
// below a button for each state. The learner chooses the state the automaton is in after the inputs (mode folge) or
// the state the missing arrow leads to (mode pfeil); a circle can be clicked too. The choice shows as a dashed ring,
// and in mode pfeil the dashed arrow points to it; nothing shows whether it is right. It is the input of the task: it
// emits the state chosen, and the explainer draws "Prüfen", checks and gives the feedback. Mode fehler (chapter
// entwerfen): a button for each arrow ("Mitte – runter → oben"); the arrow chosen is drawn thick.
// Written for lernapps/informatik-automaten (#500).
import { computed, ref } from "vue";
import AutomatDiagramm from "./AutomatDiagramm.vue";
import { arrowText, generate, taskText } from "./AutomatAufgabe.ts";

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
  /** The numbers (nr) of the automata the tasks are drawn from. */
  use: number[];
  /** folge: the state after a sequence of inputs; pfeil: where a missing arrow leads; fehler: which arrow is wrong. */
  mode: "folge" | "pfeil" | "fehler";
  /** diagramm: the state diagram above the task; kasten: no figure. */
  view: "diagramm" | "kasten";
  /**
   * The task, with {automat}, {start} and {inputs} (folge), {text}, {from} and {input} (pfeil), {automat}, {start},
   * {inputs}, {expected} and {actual} (fehler).
   */
  task: string;
  /** The word at the start arrow. */
  startWord: string;
  /** The label of the group of state buttons (of arrow buttons in mode fehler). */
  chooseLabel: string;
  /** The word before an output in the text without JavaScript. */
  outputWord: string;
  /** The app's message for each typical mistake of the mode, in the order of about.mistakes, with {start}, {last}. */
  mistakes: string[];
  /** The message for any other wrong answer, with {start}. */
  other: string;
  /** The task number, which the explainer gives. */
  seed: number;
  /** Whether the explainer checked the answer shown now. */
  checked?: boolean;
}>();
const emit = defineEmits<{ answer: [number | undefined] }>();

const current = computed(() => generate(props.seed, props));
const chosen = ref<number | undefined>(undefined);
// mode fehler: the arrow chosen, drawn thick
const chosenArrow = computed(() => {
  const t =
    mode.value === "fehler" && chosen.value !== undefined ? current.value.automat.transitions[chosen.value] : undefined;
  return t ? { from: t.from, to: t.to } : { from: -1, to: -1 };
});
const mode = computed(() => current.value.mode);

function pickState(n: number): void {
  if (mode.value !== "fehler") choose(n);
}

function choose(n: number): void {
  chosen.value = n;
  emit("answer", n);
}
</script>

<template>
  <div class="automat-aufgabe" :class="{ 'automat-aufgabe-checked': checked }">
    <AutomatDiagramm
      v-if="view === 'diagramm'"
      :automat="current.automat"
      :start-word="startWord"
      :active="-1"
      :used="chosenArrow"
      :selected="mode === 'fehler' ? -1 : (chosen ?? -1)"
      :hidden="current.hidden ?? { from: -1, input: -1 }"
      @pick="pickState"
    />
    <p>{{ taskText(current, props) }}</p>
    <div v-if="mode === 'fehler'" class="automat-aufgabe-states" role="group" :aria-label="chooseLabel">
      <button
        v-for="(_, i) in current.automat.transitions"
        :key="i"
        type="button"
        :aria-pressed="chosen === i"
        @click="choose(i)"
      >
        {{ arrowText(current.automat, i) }}
      </button>
    </div>
    <div v-else class="automat-aufgabe-states" role="group" :aria-label="chooseLabel">
      <button
        v-for="(state, i) in current.automat.states"
        :key="i"
        type="button"
        :aria-pressed="chosen === i"
        @click="choose(i)"
      >
        {{ state.name }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.automat-aufgabe-states {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.5rem 0;
}

.automat-aufgabe-states button {
  min-height: 44px;
  min-width: 6rem;
  padding: 0.4rem 1rem;
  border: 2px solid var(--page-border);
  border-radius: 999px;
  background: var(--page-surface);
  color: var(--page-text);
  font: inherit;
  cursor: pointer;
}

.automat-aufgabe-states button[aria-pressed="true"] {
  border-color: var(--page-accent);
  background: var(--page-accent);
  color: var(--page-on-accent);
  font-weight: bold;
}
</style>
