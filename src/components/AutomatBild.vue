<script setup lang="ts">
// A design as a picture (chapter entwerfen, page entwurf-testen): only the state diagram of a design of the data file
// fehlerbilder, without buttons, to show a mistake (an arrow missing, two arrows with the same input, an arrow
// wrong). The page's text says what to look at; the nojs text describes the arrows and stays as a folded description.
// Written for lernapps/informatik-automaten (#500).
import { computed } from "vue";
import AutomatDiagramm from "./AutomatDiagramm.vue";
import { bildAutomat } from "./AutomatBild.ts";

defineOptions({ nojs: "caption" });

const props = defineProps<{
  /** Every design of the data file fehlerbilder. */
  bilder: {
    nr: number;
    name: string;
    start: number;
    states: { name: string; x: number; y: number; loop: number }[];
    inputs: { name: string }[];
    transitions: { from: number; input: number; to: number; bend: number }[];
  }[];
  /** The number (nr) of the design shown. */
  bild: number;
  /** The word at the start arrow. */
  startWord: string;
}>();

const automat = computed(() => bildAutomat(props.bilder, props.bild));
</script>

<template>
  <figure class="automat-bild">
    <AutomatDiagramm
      :automat="automat"
      :start-word="startWord"
      :active="-1"
      :used="{ from: -1, to: -1 }"
      :selected="-1"
      :hidden="{ from: -1, input: -1 }"
    />
    <figcaption>{{ automat.name }}</figcaption>
  </figure>
</template>

<style scoped>
.automat-bild {
  margin: 1rem 0;
  padding: 0.75rem;
  border: 1px solid var(--page-border);
  border-radius: 0.6rem;
  background: var(--page-surface);
  color: var(--page-text);
}

.automat-bild figcaption {
  margin-top: 0.25rem;
  font-weight: bold;
}
</style>
