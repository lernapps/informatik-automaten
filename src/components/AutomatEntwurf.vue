<script setup lang="ts">
// The exercise of designing an automaton (chapter entwerfen, 9-10), for the task of the number seed: the task text,
// then the editing of AutomatEditor (state cards, start, one target per state and input, the diagram, the visible test
// sequences to play). It is the input of the task: it emits the design on every change, and the explainer draws
// "Prüfen", checks its properties (AutomatEntwurf.ts, also hidden test sequences) and gives the feedback.
// Mode verbessern starts from a design with one wrong arrow. Written for lernapps/informatik-automaten (#500).
import { computed, ref } from "vue";
import AutomatEditor from "./AutomatEditor.vue";
import { generate, type Entwurf } from "./AutomatEntwurf.ts";

const props = defineProps<{
  /** Every design task of the data file entwuerfe. */
  aufgaben: {
    /** @verbatim */
    id: string;
    name: string;
    text: string;
    inputs: {
      /** @verbatim */
      id: string;
      name: string;
    }[];
    cards: {
      /** @verbatim */
      id: string;
      name: string;
      /** @verbatim */
      art: string;
      warum: string;
      x: number;
      y: number;
      loop: number;
    }[];
    /** @verbatim */
    start: string;
    /** @verbatim */
    loesung: { from: string; input: string; to: string }[];
    /** @verbatim */
    tests: { inputs: string[]; end: string; hidden: boolean }[];
  }[];
  /** The ids of the design tasks this block draws from. @verbatim */
  use: string[];
  /** neu: an empty design; verbessern: a design with one wrong arrow. */
  mode: "neu" | "verbessern";
  /** The sentence above the task text. */
  intro: string;
  /** The headings, buttons and words of the editing. */
  labels: {
    inputs: string;
    states: string;
    start: string;
    arrows: string;
    choose: string;
    diagram: string;
    tests: string;
    play: string;
    expected: string;
    endsAt: string;
    startWord: string;
    hiddenNote: string;
    empty: string;
    needStart: string;
  };
  /** No state chosen yet. */
  noStates: string;
  /** States chosen, but no start. */
  noStart: string;
  /** Another start than the task says, with {start}. */
  wrongStart: string;
  /** A row left empty, with {state} and {input}. */
  incomplete: string;
  /** A visible test sequence ends elsewhere, with {inputs}, {expected}, {actual}. */
  testFails: string;
  /** A hidden test sequence ends elsewhere, with {inputs}, {expected}, {actual}. */
  hiddenFails: string;
  /** The task number, which the explainer gives. */
  seed: number;
  /** Whether the explainer checked the design shown now. */
  checked?: boolean;
}>();
const emit = defineEmits<{ answer: [Entwurf | undefined] }>();

const current = computed(() => generate(props.seed, props));
const entwurf = ref<Entwurf>(current.value.start);

function change(next: Entwurf): void {
  entwurf.value = next;
  emit("answer", next.states.length === 0 ? undefined : next);
}
</script>

<template>
  <div class="automat-entwurf">
    <p>{{ intro }}</p>
    <p>
      <strong>{{ current.aufgabe.name }}.</strong> {{ current.aufgabe.text }}
    </p>
    <AutomatEditor
      :aufgabe="current.aufgabe"
      :entwurf="entwurf"
      :uid="`entwurf-${seed}-${current.aufgabe.id}`"
      :labels="labels"
      :hints="false"
      @change="change"
    />
  </div>
</template>
