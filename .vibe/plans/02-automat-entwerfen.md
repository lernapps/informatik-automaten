---
# Read by the hooks, the review, the evals. Schema: @lernapps/tooling/guidance/plan-front-matter.v1.schema.json
# Written by `lernapps plan` and the hooks. Never change a key or a value by hand.
# Archetype, as in the app's first plan. Allowed values: explainer, interactive, quiz.
archetype: explainer
# Current phase. Allowed values: explore, plan, code, commit.
phase: explore
# prePushFailures: failed pre-push runs of this increment, written by the hook.
prePushFailures: 0
# failedChecks: failed rules and runs, written by lernapps check and the hooks.
failedChecks: {}
---

# Increment: automat-entwerfen

<!--
For you, the assistant. One increment of a published app: new competencies, chapters, pages, rounds, questions, or a
correction. The process is in AGENTS.md; this plan holds the method.
- `npx --no -- lernapps plan next` prints the task to do now, `plan done` ticks it and prints the next one.
- You write only below Goal, Key decisions, Notes, Answers, Content method and Retrospective, in the creator's
  language. Delete the comment of a section once the section is filled.
- The first version's decisions stand: archetype, content method, content guide. Never change an earlier plan.
- Work on the branch `increment/<NN>-<short name>`. Until Commit everything is local: push nothing.
-->

*Started 2026-11-26. Explore, Plan, Code, Commit.*

## Goal

Jugendliche der Klassen 9-10 entwerfen für eine Aufgabe (eine Bedarfsampel, eine Parkhausschranke) selbst einen
Automaten: Sie wählen die Zustände, legen für jeden Zustand und jede Eingabe den Übergang fest und testen den Entwurf
im Simulator mit Eingabefolgen. Sie finden Fehler in fremden Entwürfen (fehlender Pfeil, zwei Pfeile mit derselben
Eingabe, falscher Übergang) und verbessern sie.

## Key decisions

- Kapitel 2 `entwerfen` (9-10) mit dem Baustein `automat-entwerfen`, Branch `increment/9-10` von `main` (Auftrag
  Welle 3). Archetyp, Simulator-Bild (Kreise, Pfeile, Eingabe blau, Ausgabe orange, Zustand grün), Datenform und
  Regeln aus Kapitel 1 bleiben.
- Zwei Seiten für den einen Baustein (guess, Frage am Checkpoint): `entwerfen/ampel-entwerfen` (entwerfen, Schritt für
  Schritt) und `entwerfen/entwurf-testen` (testen, Fehler finden und verbessern). Der Baustein ist groß (GI SA-4
  „modellieren“), eine Seite würde über 350 Wörter.
- Neue Übungskomponente `AutomatEntwurf` (entwerfen) und eine Bearbeitungsansicht, die sich Simulator und Übung
  teilen. Geprüft wird über Eigenschaften (vollständig, deterministisch, besteht alle Testfolgen der Aufgabe, keine
  Eingabe oder Ausgabe als Zustand), keine Musterlösung. Bedienung nur mit Knöpfen und Auswahllisten, ohne Ziehen,
  mit Tastatur; Text ohne JS.
- Kein Wechsel auf ids: Kapitel 1 nutzt Nummern und funktioniert. Neue Props für Zustands-Karten bekommen `@verbatim`
  (app-templates 0.24), wo ein Text als Schlüssel dient.
- Geschichte: Klasse 9b (Jona, Selin, Mia, alle 14, zwei Jahre nach der 6b) als Chat (Textblock mit Zeilen
  „**Selin:** …“), ein realer Fall statt gezeichneter Kinder.

## Notes

### Baustein und Kapitel

| Kapitel | Seite (Datei) | Baustein | Stufe, Schritt | requires | opens |
|---|---|---|---|---|---|
| 2 Einen Automaten entwerfen | `entwerfen/ampel-entwerfen` | automat-entwerfen | 9-10, 1 | zustandsdiagramm | 0 |
| 2 | `entwerfen/entwurf-testen` | automat-entwerfen | 9-10, 1 | zustandsdiagramm | 0 |

„Ich kann für eine konkrete Aufgabe, zum Beispiel eine Ampelsteuerung, einen Automaten mit Zuständen und Übergängen
entwerfen.“ (Karte, wörtlich). Voraussetzung `zustandsdiagramm` übt Kapitel 1: keine Wiederholungsseite; Seite 1 von
Kapitel 2 erinnert in zwei Sätzen und verlinkt `/alltag/zustandsdiagramm/`.

### Didaktik

- Fall statt Bildergeschichte (9-10): Die 9b (Jona, Selin, Mia, alle 14) baut in der Technik-AG ein Modell der neuen
  Bedarfsampel vor der Schule, gesteuert von einem kleinen Computer. Bevor programmiert wird, entwerfen sie den
  Automaten. Der Chat (Textblock, Zeilen „**Selin:** …“) trägt die Seiten.
- Methode in vier Schritten, die auf beiden Seiten gleich heißt: 1. Eingaben sammeln. 2. Zustände finden: Was muss
  sich die Ampel merken? (nicht: was passiert in einem Moment). 3. Für jeden Zustand jede Eingabe festlegen (Tabelle,
  dann Diagramm). 4. Mit Eingabefolgen testen.
- Bedarfsampel (fest): Eingaben „Knopf“, „Zeit um“. Zustände „Autos grün“, „Anforderung“ (Autos noch grün, Knopf
  gedrückt), „Autos gelb“, „Fußgänger grün“, „Autos rot-gelb“. Das Kernproblem: „Autos grün“ und „Anforderung“ sehen
  gleich aus und sind zwei Zustände (schon in Kapitel 1 angelegt).
- Entwerfen im Simulator ohne Ziehen: Zustände aus Karten wählen (darunter Karten, die Eingaben oder Ausgaben sind),
  Startzustand wählen, für jede Zeile „Zustand × Eingabe“ das Ziel aus einer Liste wählen. Das Diagramm zeichnet sich
  dabei mit. Testfolgen der Aufgabe lassen sich abspielen; der Simulator zeigt, wo eine Folge anders endet.
- Prüfung über Eigenschaften: alle Zeilen gefüllt (vollständig), je Zeile ein Ziel (eindeutig, durch die Bedienung
  immer erfüllt; auf Seite 2 als Fehlerart geübt), alle Testfolgen der Aufgabe enden im erwarteten Zustand, keine
  Eingabe- oder Ausgabe-Karte als Zustand. Mehrere richtige Entwürfe sind möglich.
- Seite 2: drei Fehlerarten in fremden Entwürfen: Pfeil fehlt (unvollständig), zwei Pfeile mit derselben Eingabe aus
  einem Zustand (nicht eindeutig), Pfeil führt falsch (Testfolge scheitert). Gute Testfolgen: jede Eingabe in jedem
  Zustand einmal.
- Hürden (guess, der fachliche Prüfer bestätigt): Zustand mit Handlung oder Ausgabe verwechselt („Knopf gedrückt“,
  „Licht wechselt“); zwei gleich aussehende Lagen zu einem Zustand zusammengelegt; Zeilen vergessen (Knopf während
  „Fußgänger grün“); nur den „Gutfall“ testen; „Zeit um“ als Uhr statt als Eingabe denken.

### Umfang

- Drin: Entwurf deterministischer, vollständiger Automaten mit 2-5 Zuständen und 2-3 Eingaben; Ausgaben am Übergang
  wie in Kapitel 1 (lesen, im Entwurf optional nicht gefordert, guess); Testfolgen; Fehlerarten.
- Aufgaben zum Entwerfen (Daten `src/data/entwuerfe.yaml`): Bedarfsampel, Parkhausschranke (Ticket, Auto fährt
  durch), Zahlenschloss mit Code 2-7, Drehtür im Museum (Karte, drücken). Je Aufgabe: Zustandskarten mit Ablenkern,
  Eingaben, Startzustand, Testfolgen mit erwartetem Endzustand.
- Nicht drin: Endzustände und akzeptierte Wörter, Minimierung, Mealy/Moore als Begriffe, Programmieren der Ampel
  (#495), Zeit als Uhr.
- Sprachen de und en (Plain English, „you“).

## Explore

<!--
- All content questions belong here; Plan maps the answers onto the app. Ask; write no code.
- Skip what earlier answers or the app already tell. At most 2 questions per message, one topic each.
-->

### Tasks

- [x] Read the README of the archetype's template (its path is in skill `lernapps-app`): what the app can do now.
      Tell the creator what is new, if it matters for this increment.
- [x] Load the content guide `.agents/skills/app-content/SKILL.md` and read the earlier plans in `.vibe/plans/`: what
      the app teaches, how its content is made, what is open.
- [x] Interview, one topic per question, the creator's words under "Answers": which competencies, chapters or rounds,
      for which school years; hurdles and examples; the amount; any change of look and feel or of terms. No answer:
      ask once more, then write your assumption with "(guess)".
- [ ] Load skill `lernapps-content-research`. Research what the content guide does not cover. Write under "Notes":
      the new competencies by chapter with their ids, the sources you opened.
- [ ] Write under "Notes" the didactic approach per competency and the scope (in, out, data range).
- [ ] The increment needs a kind of content the guide does not cover (a new page structure, screen, component or kind
      of exercise): load skills `lernapps-explainer-design` and `lernapps-exercise-patterns`. Else skip this task.
- [ ] **Checkpoint:** research. Show in plain words: the new competencies by chapter, the didactic approach, the
      scope, every "(guess)", the sources and what is unchecked. Stop and wait. Changes: change them, then ask again.

### Answers

- Auftrag (Orchestrator, Welle 3): „Kapitel 2 ‚Einen Automaten entwerfen‘ (Baustein `automat-entwerfen`) … Der
  Simulator bekommt die Ansicht `entwerfen` auf demselben Modell; die Jugendlichen entwerfen z. B. eine
  Ampelsteuerung und testen sie mit Eingabefolgen.“
- „Klasse in Welle 3: 9b, alle 14, zwei Jahre nach der 6b. Chat als Textblock mit Zeilen ‚**Selin:** …‘.“
- „Entwerfen prüfen: über Eigenschaften (vollständig, deterministisch, besteht die Eingabefolgen der Aufgabe), keine
  Musterlösung. Bedienung ganz ohne Ziehen, mit Tastatur, Text ohne JS.“
- „Zuerst `lernapps update`“ (erledigt: tooling 0.20.2, app-templates 0.24).
- Hürden: im Auftrag nicht genannt (guess, siehe Notes).

## Plan

<!--
- Map the new content onto the app with the guide's patterns. The creator confirms the plan in one read.
- After the yes you work on your own.
-->

### Tasks

- [ ] Load skill `lernapps-content-growth`. Add the tasks of Code as slices, one per competency, in the guide's
      order, one call each: `npx --no -- lernapps plan add --at slices "<task>"`. Say in each which sub-agent may
      write it in parallel, if any.
- [ ] Write "Content method": the guide's patterns, figures and components per slice. Anything new: map it as skill
      `lernapps-explainer-design` says, and say why the guide's patterns do not fit.
- [ ] Draw a sketch of each new component or interactive exercise, in `.vibe/sketches/`.
- [ ] Show the creator, short: goal, new competencies by chapter, slices; in plain words what learners see and do and
      what is new. At most 2 questions.
- [ ] **Checkpoint:** confirm the plan and the content method. Stop and wait for an explicit yes. Changes: change
      them, then ask again.

### Content method

<!-- One line each: the guide's patterns, figures and components used, and where; anything new, what it does and
cannot. Something new goes into the guide in the slice that adds it. -->
<!-- An explainer: per figure, model and component its learning action in two to four sentences
(`explainer-representation-explained`); per page its prerequisites the app does not practise, and which get a recap
page, which a link. -->

## Code

<!--
- Build locally on the branch, on your own. After each task: `plan done`, then one commit with the work and this
  plan. The hooks check each commit; a failing check is fixed from its message, as skill `lernapps-cli` says.
- What you cannot decide: choose, write it under "Key decisions" with "(guess)", go on.
- The creator asks for a change: say your reading in one sentence first.
-->

### Tasks

- [ ] `git switch -c increment/<NN>-<short name>` from `main`. Commit this plan on it.
- [ ] Load skill `lernapps-cli`. Update the app as its section "Update" says. Commit the update alone and fix its
      findings before any content. The update replaces the `lernapps-*` skills: read again those you use.
- [ ] Load skill `lernapps-explainer` and the content guide.
- [ ] Load skill `lernapps-content-questions`. Read whole, with your file tool:
      `.agents/skills/lernapps-explainer/references/blocks.md` and
      `.agents/skills/lernapps-explainer/references/exercises.md`. A foreign language: also
      `references/language-tasks.md` in the same folder. A component in the plan: also `references/components.md`.
- [ ] Decide whether the app needs `scope`, as "`scope`" in
      `.agents/skills/lernapps-explainer/references/structure.md` says. Write the choice under "Key decisions".
<!-- tasks: slices: one per competency, as written in Plan -->
- [ ] **Checkpoint:** the pattern page, after the first slice. A slice in a pattern the app already has: show it to
      the creator and go on. A new pattern: load skill `lernapps-learner-check`, do its learner check, fix what it
      finds, then ask the creator whether the others may follow it, and wait.
- [ ] Update the content guide so that it describes the app as it is now (`app-content-matches`).
- [ ] Run `npx --no -- lernapps check` until it passes.
- [ ] Look at every changed screen, at 360 px and on a desktop, as "Look at the app" of skill `lernapps-cli` says.

## Commit

<!--
- Publish with the creator's yes. A push to `main` publishes.
- Open the pull requests (to `main`, to the catalog) without asking: they publish nothing.
-->

### Tasks

- [ ] If pages or exercises changed, load skill `lernapps-explainer-self-assessment` and update the self-assessment
      as it says. Commit.
- [ ] Load skill `lernapps-github`. Push the branch, open the preview pull request and see its checks to green, as it
      says.
- [ ] **Checkpoint:** publish. Show what the increment adds and the preview link. Ask whether it may go online. Stop
      and wait for the yes.
- [ ] Load skill `lernapps-commit`. Publish as skill `lernapps-github` says: the pull request squash-merged into
      `main`, the run of `Pages` watched to its end.
- [ ] Open the address the job `deploy` printed and confirm the new content. Never use a derived address.
- [ ] The app is listed and its entry changes (school years, summary): load skill `lernapps-listing` and write the
      changed entry. Else skip this task.
- [ ] Fill the retrospective.
- [ ] Commit this plan on `main` and push it. A push of only `.vibe/` publishes nothing.
- [ ] The entry changed: open the pull request to the catalog as skill `lernapps-listing` says, without asking first,
      and see it to "bestanden". Else skip this task: `npx --no -- lernapps plan skip "entry unchanged"`.
- [ ] **Checkpoint:** list. Tell the creator the result: the pull request and its result, or, when the entry did not
      change, that the catalog takes over the app by itself. Tick it with their reply.
- [ ] If the plan changed since its last push, commit it on `main` and push again.

## Retrospective

<!-- At the end of Commit. Facts, short, no names. Read by review and evals. -->

### Phases reached

<!-- Last phase completed, checkpoints passed. E.g. "commit; confirmed, published". -->

### Creator turns after the plan

<!-- Number of creator messages after the confirmation, topic of each. Target: at most 3. -->

### Where I had to guess

<!-- Each gap in plan, skills, content guide, messages or answers, and your choice. "None" if none. -->
