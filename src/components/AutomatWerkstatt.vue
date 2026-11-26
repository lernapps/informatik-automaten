<script setup lang="ts">
// The automaton simulator's view for designing (chapter entwerfen): one design task of the data file entwuerfe to try
// out freely, with the editing of AutomatEditor, no check. The model is the simulator's (Automat.ts, via
// AutomatEntwurf.ts). Written for lernapps/informatik-automaten (#500).
import { computed, ref } from "vue";
import AutomatEditor from "./AutomatEditor.vue";
import { empty, type Entwurf } from "./AutomatEntwurf.ts";

defineOptions({ nojs: "caption" });

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
  /** The id of the design task shown. @verbatim */
  aufgabe: string;
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
  };
  /** The label of the button that empties the design. */
  reset: string;
}>();

const shown = computed(() => {
  const found = props.aufgaben.find((a) => a.id === props.aufgabe) ?? props.aufgaben[0];
  if (found === undefined) throw new Error("AutomatWerkstatt: the data file entwuerfe is empty");
  return found;
});
const entwurf = ref<Entwurf>(empty());
// "Alles leeren" mounts the editing afresh, so that the results of played tests go too
const round = ref(0);
</script>

<template>
  <div class="automat-werkstatt">
    <p>
      <strong>{{ shown.name }}.</strong> {{ shown.text }}
    </p>
    <AutomatEditor
      :key="round"
      :aufgabe="shown"
      :entwurf="entwurf"
      :uid="`werkstatt-${shown.id}`"
      :labels="labels"
      :hints="true"
      @change="entwurf = $event"
    />
    <p class="automat-werkstatt-reset">
      <button
        type="button"
        @click="
          entwurf = empty();
          round++;
        "
      >
        {{ reset }}
      </button>
    </p>
  </div>
</template>

<style scoped>
.automat-werkstatt {
  margin: 1rem 0;
  padding: 0.75rem;
  border: 1px solid var(--page-border);
  border-radius: 0.6rem;
  background: var(--page-surface);
  color: var(--page-text);
}

.automat-werkstatt-reset button {
  min-height: 44px;
  padding: 0.4rem 1rem;
  border: 1px solid var(--page-border);
  border-radius: 0.5rem;
  background: var(--page-background);
  color: var(--page-text);
  font: inherit;
  cursor: pointer;
}
</style>
