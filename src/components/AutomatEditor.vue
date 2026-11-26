<script setup lang="ts">
// Editing a design (chapter entwerfen), shared by the exercise AutomatEntwurf and the display AutomatWerkstatt, in the
// four steps of the page: 1 the inputs (given by the task), 2 the state cards to switch on or off (checkboxes) and the
// start state (radio buttons), 3 one row per state and input with a list of targets, and the diagram, drawn as the
// design grows (AutomatDiagramm), 4 the test sequences of the task, each with a button that runs it and shows its way
// step by step and where it ends, ✓ or ✗ beside it. With hints (the workshop), a ticked card that is no state says why.
// No dragging; everything works with the keyboard.
// Logic in AutomatEntwurf.ts. Written for lernapps/informatik-automaten (#500).
import { computed, ref } from "vue";
import AutomatDiagramm from "./AutomatDiagramm.vue";
import { automat, runEnd, sequence, setTarget, target, toggle, type Aufgabe, type Entwurf } from "./AutomatEntwurf.ts";

const props = defineProps<{
  aufgabe: Aufgabe;
  entwurf: Entwurf;
  /** A key that makes the ids of the fields unique on the page. */
  uid: string;
  /** Whether a ticked card that is no state says why (the workshop, not the exercise). */
  hints: boolean;
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
}>();
const emit = defineEmits<{ change: [Entwurf] }>();

const name = (id: string) =>
  props.aufgabe.cards.find((c) => c.id === id)?.name ?? props.aufgabe.inputs.find((i) => i.id === id)?.name ?? id;

const drawn = computed(() => automat(props.aufgabe, props.entwurf));
const visible = computed(() => props.aufgabe.tests.filter((t) => !t.hidden));
// the test played last: its end is shown in the diagram, each played test shows its way and its end
const played = ref<Record<number, string>>({});
const ways = ref<Record<number, string>>({});
const lastEnd = ref("");

function change(next: Entwurf): void {
  played.value = {};
  ways.value = {};
  lastEnd.value = "";
  emit("change", next);
}

function play(index: number): void {
  const test = visible.value[index];
  if (!test) return;
  const end = runEnd(props.entwurf, test.inputs);
  // the way: the start, then each input and the state it leads to, until a row is empty
  const parts = [props.entwurf.start === "" ? "–" : name(props.entwurf.start)];
  let state = props.entwurf.start;
  for (const input of test.inputs) {
    if (state === "") break;
    state = target(props.entwurf, state, input);
    parts.push(`${name(input)} → ${state === "" ? "–" : name(state)}`);
  }
  ways.value = { ...ways.value, [index]: parts.join(" · ") };
  played.value = { ...played.value, [index]: end };
  lastEnd.value = end;
}

const active = computed(() => props.entwurf.states.indexOf(lastEnd.value));
</script>

<template>
  <div class="automat-editor">
    <p class="automat-editor-inputs">
      <strong>{{ labels.inputs }}</strong>
      <span v-for="input in aufgabe.inputs" :key="input.id" class="automat-editor-input">{{ input.name }}</span>
    </p>
    <fieldset class="automat-editor-cards">
      <legend>{{ labels.states }}</legend>
      <label v-for="card in aufgabe.cards" :key="card.id" class="automat-editor-card">
        <input
          type="checkbox"
          :checked="entwurf.states.includes(card.id)"
          @change="change(toggle(entwurf, aufgabe, card.id))"
        />
        {{ card.name }}
      </label>
      <p
        v-for="card in hints ? aufgabe.cards.filter((c) => c.art !== 'zustand' && entwurf.states.includes(c.id)) : []"
        :key="`hint-${card.id}`"
        class="automat-editor-hint"
      >
        {{ card.name }}: {{ card.warum }}
      </p>
    </fieldset>
    <p v-if="entwurf.states.length === 0" class="automat-editor-note">{{ labels.empty }}</p>
    <fieldset v-if="entwurf.states.length > 0" class="automat-editor-start">
      <legend>{{ labels.start }}</legend>
      <label v-for="state in entwurf.states" :key="state" class="automat-editor-card">
        <input
          type="radio"
          :name="`${uid}-start`"
          :checked="entwurf.start === state"
          @change="change({ ...entwurf, start: state })"
        />
        {{ name(state) }}
      </label>
    </fieldset>
    <fieldset v-if="entwurf.states.length > 0" class="automat-editor-rows">
      <legend>{{ labels.arrows }}</legend>
      <template v-for="state in entwurf.states" :key="state">
        <label v-for="input in aufgabe.inputs" :key="input.id" class="automat-editor-row">
          <span
            >{{ name(state) }} – <span class="automat-editor-input">{{ input.name }}</span> →</span
          >
          <select
            :class="{ 'automat-editor-empty': target(entwurf, state, input.id) === '' }"
            :value="target(entwurf, state, input.id)"
            @change="change(setTarget(entwurf, state, input.id, ($event.target as HTMLSelectElement).value))"
          >
            <option value="">{{ labels.choose }}</option>
            <option v-for="to in entwurf.states" :key="to" :value="to">{{ name(to) }}</option>
          </select>
        </label>
      </template>
    </fieldset>
    <div v-if="entwurf.states.length > 0" class="automat-editor-diagram">
      <p class="automat-editor-heading">{{ labels.diagram }}</p>
      <AutomatDiagramm
        :automat="drawn"
        :start-word="entwurf.start === '' ? '' : labels.startWord"
        :active="active"
        :used="{ from: -1, to: -1 }"
        :selected="-1"
        :hidden="{ from: -1, input: -1 }"
      />
    </div>
    <div class="automat-editor-tests">
      <p class="automat-editor-heading">{{ labels.tests }}</p>
      <ul>
        <li v-for="(test, i) in visible" :key="i">
          <span
            >{{ sequence(aufgabe, test.inputs) }} → {{ labels.expected }} <strong>{{ name(test.end) }}</strong></span
          >
          <button type="button" @click="play(i)">{{ labels.play }}</button>
          <span v-if="ways[i]" class="automat-editor-way">{{ ways[i] }}</span>
          <span v-if="played[i] !== undefined" class="automat-editor-result" aria-live="polite">
            {{ labels.endsAt }} {{ played[i] === "" ? "–" : name(played[i] ?? "") }}
            <span :class="played[i] === test.end ? 'automat-editor-ok' : 'automat-editor-bad'">{{
              played[i] === test.end ? "✓" : "✗"
            }}</span>
          </span>
        </li>
      </ul>
      <p v-if="labels.hiddenNote" class="automat-editor-note">{{ labels.hiddenNote }}</p>
    </div>
  </div>
</template>

<style scoped>
.automat-editor {
  --automat-input: #2f5fb3;
  --automat-ok: #23704a;
  --automat-bad: #b3261e;
  display: grid;
  gap: 0.75rem;
}

@media (prefers-color-scheme: dark) {
  .automat-editor {
    --automat-input: #8fb0ee;
    --automat-ok: #6cc995;
    --automat-bad: #f2a199;
  }
}

.automat-editor fieldset {
  margin: 0;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--page-border);
  border-radius: 0.5rem;
}

.automat-editor legend,
.automat-editor-heading {
  margin: 0 0 0.25rem;
  font-weight: bold;
}

.automat-editor-cards,
.automat-editor-start {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.automat-editor-card {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  min-height: 44px;
  padding: 0 0.6rem;
  border: 1px solid var(--page-border);
  border-radius: 0.4rem;
  background: var(--page-background);
}

.automat-editor-card input {
  width: 1.2rem;
  height: 1.2rem;
}

.automat-editor-rows {
  display: grid;
  gap: 0.4rem;
}

.automat-editor-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem 0.5rem;
}

.automat-editor-row select {
  min-height: 44px;
  min-width: 10rem;
  font: inherit;
}

.automat-editor-row select.automat-editor-empty {
  border: 2px dashed var(--page-border);
}

.automat-editor-input {
  color: var(--automat-input);
  font-weight: bold;
}

.automat-editor-tests ul {
  margin: 0;
  padding-left: 1.2rem;
}

.automat-editor-tests li {
  margin: 0.4rem 0;
}

.automat-editor-tests button {
  min-height: 44px;
  margin: 0 0.5rem;
  padding: 0.3rem 0.8rem;
  border: 1px solid var(--page-border);
  border-radius: 0.4rem;
  background: var(--page-background);
  color: var(--page-text);
  font: inherit;
  cursor: pointer;
}

.automat-editor-ok {
  color: var(--automat-ok);
  font-weight: bold;
}

.automat-editor-bad {
  color: var(--automat-bad);
  font-weight: bold;
}

.automat-editor-inputs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.75rem;
  margin: 0;
}

.automat-editor-hint {
  flex-basis: 100%;
  margin: 0.25rem 0 0;
  color: var(--page-muted);
}

.automat-editor-way {
  display: block;
  color: var(--page-muted);
  font-size: 0.9em;
}

.automat-editor-note {
  color: var(--page-muted);
  font-size: 0.9em;
}
</style>
