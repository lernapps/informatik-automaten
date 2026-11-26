---
# Read by the hooks, the review, the evals. Schema: @lernapps/tooling/guidance/plan-front-matter.v1.schema.json
# Written by `lernapps plan` and the hooks. Never change a key or a value by hand.
# Archetype, null until chosen in Explore. Allowed values: explainer, interactive, quiz.
archetype: explainer
# Current phase. Allowed values: explore, plan, code, commit.
phase: explore
# prePushFailures: failed pre-push runs, written by the hook.
prePushFailures: 0
# failedChecks: failed rules and runs, written by lernapps check and the hooks.
failedChecks: {}
---

# Plan: sprachen-automaten, first version

<!--
For you, the assistant. The process is in AGENTS.md; this plan holds the method.
- `npx --no -- lernapps plan next` prints the task to do now, `plan done` ticks it and prints the next one.
- You write only below Goal, Key decisions, Notes, Answers, Entry draft, Content method and Retrospective, in the
  creator's language. Delete the comment of a section once the section is filled.
- Work on the branch `work`, locally: push nothing before Commit.
-->

*Started 2026-11-26. Explore, Plan, Code, Commit.*

## Goal

Kinder der Klassen 5-6 spielen einen Getränkeautomaten nach (ein Kind ist der Automat), merken dabei, dass er sich etwas
merkt (seinen Zustand), und bauen ihn im Automaten-Simulator als Zustandsdiagramm nach. Danach lesen sie fremde
Zustandsdiagramme (Ampel, Drehkreuz) und sagen voraus, wohin ein Automat bei einer Folge von Eingaben springt.

## Key decisions

- Archetyp `explainer`: Der Auftrag (lernapps/apps#500) verlangt einen Explainer im Format 2; die Kinder brauchen
  Erklärseiten mit Bild und Simulator vor dem Üben. Was er nicht kann (kein Spiel, kein Timer, eigenes Aussehen nur in
  Komponenten), braucht der Auftrag nicht.
- Strang `informatik/sprachen-automaten`, Welle 1 nur Kapitel 1 (5-6) mit `automaten-im-alltag` und `zustandsdiagramm`.
  Kapitel 2 (`automat-entwerfen`, 9-10) kommt als Inkrement auf `increment/9-10`; ich plane es mit, baue es nicht.
- Sammel-Wiederholung am Kapitelanfang (`recap`): Die Karte nennt als Voraussetzung `eva-prinzip`
  (requires von `automaten-im-alltag`); der Auftrag nennt `informatiksysteme-im-alltag`. Ich wiederhole beide kompakt
  (guess, Frage an der Checkpoint Recherche).
- Der Simulator ist eine Komponentenfamilie mit einem gemeinsamen Modell `Automat.ts` (Zustände, Übergänge,
  Startzustand, Schritt): `AutomatDiagramm` zeichnet, `AutomatSimulator` spielt (Anzeige), `AutomatAufgabe` ist die
  Übungskomponente. Automaten liegen als Daten in `src/data/automaten.yaml`. Kapitel 2 ergänzt einen Entwurfsmodus,
  ohne Modell und Daten umzubauen.
- Sprachen `[de, en]`: Deutsch in einfacher Sprache mit „du“, Englisch vollständig, Plain English mit „you“; Texte in
  Bildern über Props der Komponenten (wie `EvaBild` in #490).

## Notes

### Strang und Bausteine

Strang `informatik/sprachen-automaten` (Karte informatik.json, Status `draft`, explainerFocus `strand`). Beide
Bausteine von Welle 1 haben `practisedBy: []` (Lücken).

| Kapitel | Seite (Datei) | Baustein (id) | Stufe, Schritt | requires | opens |
|---|---|---|---|---|---|
| 1 Automaten im Alltag | `alltag/das-brauchst-du` | recap: `informatik/informatiksysteme-im-alltag`, `informatik/eva-prinzip` | – | – | – |
| 1 | `alltag/automaten-im-alltag` | automaten-im-alltag | 5-6, 5 | eva-prinzip | 2 |
| 1 | `alltag/zustandsdiagramm` | zustandsdiagramm | 5-6, 6 | automaten-im-alltag | 1 |
| 2 Einen Automaten entwerfen (Inkrement) | `entwerfen/automat-entwerfen` | automat-entwerfen | 9-10, 1 | zustandsdiagramm | 0 |

„Ich kann …“-Sätze wörtlich aus der Karte:
- automaten-im-alltag: „Ich kann an einem Automaten aus dem Alltag, zum Beispiel einem Getränkeautomaten, erklären, wie
  er abhängig von Eingabe und Zustand reagiert.“
- zustandsdiagramm: „Ich kann das Verhalten eines Automaten mit Zuständen und Übergängen in einem Zustandsdiagramm
  darstellen und ein solches Diagramm lesen.“
- automat-entwerfen (Kapitel 2): „Ich kann für eine konkrete Aufgabe, zum Beispiel eine Ampelsteuerung, einen
  Automaten mit Zuständen und Übergängen entwerfen.“

Voraussetzungen von außerhalb: `eva-prinzip` (direkt), `informatiksysteme-im-alltag` (über die Kette in #490). Beide
auf der Sammel-Wiederholung „Das brauchst du hier“, kompakt, ohne neue Inhalte. #490 (informatik-computer) ist noch im
Bau; ich verlinke keine Seite dort, die Runtime verlinkt die Bausteine auf der Karte.

### Quellen (geöffnet und gelesen; Lehrpläne hat ein Hilfsagent gelesen, die Kernstellen GI und NRW habe ich im Text
nachgesehen)

- Lernlandkarte Informatik: https://lernapps.net/apps/map/informatik.json (Strang sprachen-automaten).
- GI: Bildungsstandards Informatik Sek I (Januar 2025), doi:10.18420/rec2025_052,
  https://www.mnu.de/images/fachbereiche/Informatik/Bildungsstandards_Sek_I_2025__pdf-A_.pdf, S. 18, Abschnitt 5.3:
  „Automaten sind Rechnermodelle, deren Verhalten durch Zustände und Zustandsübergänge beschrieben wird.“ Jg. 5-6 nur
  SA-1 (formale Sprachen); SA-3 „analysieren das Verhalten endlicher Automaten“ und SA-4 „modellieren Sachverhalte
  zustandsorientiert“ erst in Jg. 7-10. **Die Karte setzt die zwei Bausteine früher an als die GI (Fund an der Karte,
  gemeldet).**
- NRW: Kernlehrplan Informatik Klasse 5 und 6, MSB NRW 2021,
  https://lehrplannavigator.nrw.de/system/files/media/document/file/si_kl5u6_if_klp_2021_07_01.pdf, S. 14: Automaten
  „treffen Entscheidungen, die aus einer Verknüpfung von Eingabe und Zustand resultieren“, Beispiele „Fahrkarten- und
  Getränkeautomaten“; S. 18: „erläutern die Funktionsweise eines Automaten aus ihrer Lebenswelt“, „stellen Abläufe in
  Automaten graphisch dar“. Das Wort Zustandsdiagramm steht dort nicht.
- Bayern LehrplanPLUS: in Gymnasium NT 5-7 und Mittelschule Informatik 5-6 nichts zu Automaten. Realschule IT, Modul
  2.7.2 (https://www.lehrplanplus.bayern.de/fachlehrplan/realschule/7/it): „Zustandsübergangsdiagramm“, ohne feste
  Jahrgangsstufe.
- Hessen: Handreichung „Digitale Welt“, HMKB/HMDI, November 2024,
  https://kultus.hessen.de/sites/kultus.hessen.de/files/2024-11/hmkb_digwelt_nov24_barrierefrei_v2.pdf: kein Zustand,
  kein Übergang; „Sprachen und Automaten“ nur als Aufzählung der GI-Bereiche (S. 7).
- Englisch: Isaac Computer Science, „Finite state machines“, https://isaaccomputerscience.org/concepts/dsa_toc_fsm
  (A level): state, transition, input, output, start state, state transition diagram; Startzustand mit geradem Pfeil von
  links, Zustände als Kreise, Übergänge als Pfeile mit der Eingabe. National Curriculum England KS3: „model the state
  and behaviour of real-world problems“
  (https://www.gov.uk/government/publications/national-curriculum-in-england-computing-programmes-of-study).
- Nicht geprüft: NRW Informatik WP 7-10 (für Kapitel 2), ältere bayerische Pläne, ein Secondary-Glossar von Teach
  Computing.
- Fachbegriffe der App: Automat (automaton, Mehrzahl automata; im Text „machine“ wo es um das Gerät geht), Zustand
  (state), Übergang (transition), Eingabe (input), Ausgabe (output), Startzustand (start state), Zustandsdiagramm
  (state diagram; einmal: „also called a state transition diagram“).

### Didaktik

- Leitbild **Automaten-Simulator**: Zustände sind Kreise mit Namen, Übergänge Pfeile mit der Eingabe daran, der
  Startzustand hat einen Pfeil „von außen“. Unter dem Diagramm stehen die Eingaben als Knöpfe; ein Klick lässt den
  Automaten springen: Der aktive Zustand ist farbig und dick umrandet, der benutzte Pfeil leuchtet kurz, darunter
  steht, was der Automat ausgibt („Ein Getränk fällt heraus“), und eine Zeile mit dem Verlauf. Zurück auf Start mit
  einem Knopf.
- Abgrenzung zum EVA-Prinzip (#490): EVA sagt, *was* ein Gerät tut (Eingabe → Verarbeitung → Ausgabe). Ein Automat hat
  zusätzlich **Zustände, die er sich merkt**: Dieselbe Eingabe (Knopf drücken) gibt je nach Zustand eine andere
  Ausgabe (Getränk oder nichts). Die Wiederholungsseite zeigt die drei EVA-Kästen in den Farben von #490 (E blau
  #2f5fb3, V grün #23704a, A orange #a4500f); die Seite `automaten-im-alltag` stellt die Frage, die EVA allein nicht
  beantwortet.
- Geschichte (bis Klasse 6: gezeichnete, erfundene Kinder): Die Klasse 6b (Jona, Selin, Mia, je 11, Aussehen wie in
  #490) baut für das Schulfest einen Saftautomaten aus einem Karton. Jona sitzt im Karton und *ist* der Automat, Mia
  kauft, Selin schreibt den Plan auf. Seite 1: Jona spielt und merkt, dass er sich das Geld merken muss. Seite 2: Selin
  zeichnet den Plan als Zustandsdiagramm, damit auch andere Kinder den Automaten spielen können; danach lesen sie
  weitere Pläne (Drehkreuz am Schwimmbad, Fußgängerampel). Ausblick: In Klasse 9-10 entwirfst du selbst einen Automaten.
- Getränkeautomat (fest für die App): Ein Saft kostet 2 €, der Automat nimmt nur 1-€-Münzen. Zustände „0 € drin“,
  „1 € drin“, „2 € drin“ (Startzustand „0 € drin“). Eingaben „1 € einwerfen“, „Knopf drücken“. Übergänge: 0 →(Münze) 1,
  1 →(Münze) 2, 2 →(Münze) 2 mit Ausgabe „Münze kommt zurück“, 0 und 1 →(Knopf) bleiben, 2 →(Knopf) 0 mit Ausgabe „Saft
  fällt heraus“. Jeder Zustand hat für jede Eingabe einen Pfeil, auch wenn sich nichts ändert (Schleife). So ist das
  Diagramm vollständig und der Simulator weiß immer, wohin.
- Ausgaben: an den Übergängen (was beim Springen passiert). Im Diagramm steht am Pfeil oben die Eingabe, darunter die
  Ausgabe, im Simulator als Satz. Keine deutsche Quelle legt eine Schreibweise fest; Isaac Computer Science schreibt die
  Ausgabe ebenfalls an den Übergang. Farben aus EVA: Eingabe blau #2f5fb3, Ausgabe orange #a4500f, dazu je ein
  Wort-Zeichen (kein Farbcode allein). Die Begriffe Mealy und Moore kommen nicht vor.
- Unplugged (Anleitung auf der Seite, geprüft wird mit Übungen): S. 1 „Automat spielen“: ein Kind ist der Automat mit
  einem Zettel, auf dem es sich das Geld merkt; eins kauft. S. 2 „Nach Plan spielen“: das Diagramm auf Papier, ein Kind
  zeigt mit einem Spielstein auf den Zustand und zieht bei jeder Eingabe den Pfeil entlang.

### Wie die Kinder hinkommen, welcher Fehler abgefangen wird (guess, Hürden nennt der Auftrag nicht)

- automaten-im-alltag: Sie drücken im Simulator zweimal denselben Knopf und bekommen einmal nichts, einmal Saft. Daraus
  leiten sie ab: Die Reaktion hängt von der Eingabe *und* vom Zustand ab. Dann suchen sie bei Alltagsautomaten, was sie
  sich merken (Ampel: welche Farbe; Aufzug: welches Stockwerk; Drehkreuz: ob bezahlt). Fehler: „Gleicher Knopf, gleiche
  Reaktion“ (EVA ohne Gedächtnis); „Der Automat ist kaputt oder es ist Zufall“; „Der Zustand ist die Eingabe“ (Münze
  einwerfen ist kein Zustand); „Zustand = was gerade ausgegeben wird“.
- zustandsdiagramm: Sie sehen, wie Selin Jonas Plan Zeile für Zeile in Kreise und Pfeile übersetzt, lesen dann
  Diagramme, indem sie Eingabefolgen „mit dem Finger“ durchgehen und den Endzustand nennen, und ergänzen fehlende Pfeile.
  Fehler: Pfeil in falscher Richtung gelesen (vom Ziel zum Start); Startzustand vergessen (beim aktuellen statt beim
  Startzustand anfangen); Schleife übersehen („bei Knopf passiert nichts, also gibt es keinen Pfeil“); Eingabe mit
  Zustand verwechselt (Beschriftung am Kreis statt am Pfeil); eine Eingabe der Folge übersprungen.

### Umfang

- Drin (Welle 1): die zwei Bausteine, ein Getränkeautomat, zum Lesen und Üben weitere kleine Automaten aus dem Alltag
  (Drehkreuz, Fußgängerampel mit Knopf, Lichtschalter mit einem Taster, Tür mit Zahlencode), je 2-4 Zustände, 1-3
  Eingaben, deterministisch und vollständig (jeder Zustand hat für jede Eingabe genau einen Pfeil).
- Nicht drin: Endzustände, akzeptierte Wörter, formale Sprachen (#504); Mealy/Moore als Begriffe; Abläufe mit Schleifen
  und Verzweigungen (#495); das EVA-Prinzip selbst (#490, nur Wiederholung); selbst entwerfen (Kapitel 2, Inkrement).
- Kapitel 2 (mitgeplant): Seite `entwerfen/automat-entwerfen`, Ampelsteuerung. Der Simulator bekommt einen Modus
  „entwerfen“ (Zustände anlegen, Pfeile ziehen, Eingabefolge testen) auf demselben Modell `Automat.ts` und derselben
  Datenform; eine Übung prüft einen entworfenen Automaten gegen Testfolgen.
- Sprachen: Deutsch (einfache Sprache, „du“) und Englisch (Plain English, „you“), je ein vollständiger Seitenbaum.

## Explore

<!--
- Find out what the app teaches, for whom, how much and how it looks. Ask; write no code, run no `create`.
- An answer counts only in the creator's words under "Answers". At most 2 questions per message, one topic each.
-->

### Tasks

- [x] Check the start: the folder `.agents/skills/lernapps-app` exists (else stop and tell the creator that the folder
      was not started with `init`), and `git branch --show-current` prints `work` (else `git switch -c work`).
- [x] Load skill `lernapps-app`. Tell the creator in two sentences what a lernapps app is and where it will live: at
      their own address, free and public, and once listed as a copy on lernapps.net. Say that the technical part
      (GitHub) comes at the end and that you do it.
- [x] Interview: ask the topics "Goal" and "Learners" of "Answers".
- [x] Load skill `lernapps-map-assignment` and read the learning map of the subject as it says. The creator brings
      the content themselves (material, a word list, the pages): note under "Notes" which competencies of the map it
      covers. Else write the skill's assignment, with its story; the creator's yes answers the topics Content and
      Amount. A subject without a map: skip this task and say so.
- [x] Load skill `lernapps-exercise-patterns` and read its reference for the subject. Note under "Notes" how learners
      will practise what the goal names.
- [x] Choose the archetype as skill `lernapps-app` says: read the README of each archetype in question, then tell the
      creator in plain words what the chosen one can and cannot do. Write the archetype and its reason under "Key
      decisions".
- [x] Run `npx --no -- lernapps skills --archetype <name>` with the chosen archetype. It installs the archetype's
      skills and adds the archetype's tasks to this plan.
- [x] Load skill `lernapps-explainer-design`. An explainer has the look of the runtime: write "fixed by the
      archetype" under the topic "Look and feel" of "Answers".
- [x] Interview: ask every other topic of "Answers", in order. Leave out only a topic that an answer of the creator
      already covers, and note which answer. A topic nobody answered is asked once before you write an assumption
      with "(guess)".
- [x] Load skill `lernapps-content-research` and research as it says. Write under "Notes": the strand or subject, the
      competencies by chapter with their ids, the sources you opened.
- [x] Write under "Notes" which competency goes on which page and which pages form a chapter, as "Map the content" of
      skill `lernapps-explainer-design` says. Per page, name the prerequisites the app does not practise.
- [x] Write under "Notes", one line per competency: how learners get there (they derive it, they do not only read it
      off), and which misconception the feedback catches.
- [x] Write under "Notes" the scope: what is in, what is out and why, the data range (for example "all main-group
      elements", never a silent "1–20"), the languages.
- [ ] **Checkpoint:** research. Show in plain words: the strand or why none, the competencies by chapter, the didactic
      approach, the scope, every "(guess)", the sources and what is unchecked, the archetype and its reason. Stop and
      wait. Changes: change them, then ask again.

### Answers

<!-- The interview: per topic the creator's answer, in their words. Keep the topics. -->

Die Rolle „Ersteller“ hat in diesem Epic der Orchestrator (lernapps/apps#509). Die Antworten stehen im Auftrag
(lernapps/apps#500) und in den gemeinsamen Regeln; ich zitiere sie.

- Goal: „Ich kann Automaten im Alltag erkennen und ihr Verhalten mit einem Zustandsdiagramm beschreiben.“ (Kapitel 1,
  #500)
- Learners: Informatik, „Stufen 5-6, 9-10“; Welle 1: „Stufe 5-6: Kapitel 1 mit 2 Bausteinen“. Vorwissen: EVA-Prinzip
  und Informatiksysteme aus #490.
- Model and focus: „Ein Automaten-Simulator: Zustände sind Kreise, Übergänge Pfeile mit Eingaben. Man klickt Eingaben
  und sieht den Automaten springen.“ (#500, Didaktik). Kein Vorbild im Katalog.
- Hurdles: im Auftrag nicht genannt. Meine Annahmen unter Notes (guess).
- Content: „Ein Getränkeautomat wird erst gespielt (eine Person ist der Automat), dann im Simulator als
  Zustandsdiagramm nachgebaut.“ (#500). Ich schreibe die Inhalte aus Karte, GI-Bildungsstandards und Lehrplänen HE,
  BY, NRW.
- Amount: „Welle 1 (Stufe 5-6): Kapitel 1 mit 2 Bausteinen. Kapitel 2 (9-10) kommt später als Inkrement“.
- Languages: „Jede App in Deutsch und Englisch, ein Seitenbaum je Sprache.“ (Regeln)
- Look and feel: fixed by the archetype. Farben im Simulator: eigene, mit Kontrast in hell und dunkel.
- Terms: „Fachbegriffe: Zustand, Übergang, Eingabe, Startzustand.“; en: „state, transition, input“ (Regeln).
  „Produktnamen nur als Beispiel.“
- Finding the app: Eintrag macht der Orchestrator; Suchwörter (guess): Automat Zustand Übergang, Zustandsdiagramm
  Klasse 5 6, Getränkeautomat Informatik.

## Plan

<!--
- Map the confirmed content onto the archetype. No new content questions: a gap in the content goes back to Explore.
- The creator confirms the plan in one read. After the yes you work on your own.
-->

### Tasks

- [ ] Map the content as "Map the content" of skill `lernapps-explainer-design` says, and write the result under
      "Content method".
- [ ] Choose a pattern per competency as skill `lernapps-exercise-patterns` says, and add it to "Content method".
- [ ] Add to "Content method" one line per page, as "Engagement" of skill `lernapps-explainer-design` says: the
      opening task, the change of activity, the reward, the story.
- [ ] Add the tasks of Code, each one a piece of work that ends in a commit. First the pattern: one complete page or
      screen, `npx --no -- lernapps plan add --at pattern "<task>"`. Then the others, one call each:
      `npx --no -- lernapps plan add --at pages "<task>"`. Each task says what it builds and what it shows.
- [ ] Draw a sketch of each screen, component or interactive exercise: a static SVG or image, or the steps with what
      learners see after each. Keep the files in `.vibe/sketches/`.
- [ ] Show the creator, short: goal, competencies by chapter, the Code tasks, the sketches, and the content method in
      plain words (what learners see and do, what the app cannot do). At most 2 questions.
- [ ] **Checkpoint:** confirm the plan and the content method. Stop and wait for an explicit yes. Changes: change
      them, then ask again.

### Content method

<!-- One line each: the patterns and where; the figures and how they are made; the data files; each component, what it
checks and what it cannot; how a later agent adds a chapter. It becomes the content guide in Code. -->
<!-- An explainer: per figure, model and component its learning action in two to four sentences
(`explainer-representation-explained`); per page its prerequisites the app does not practise, and which get a recap
page, which a link. -->

## Code

<!--
- Build the app, locally on `work`, on your own. After each task: `plan done`, then one commit with the work and this
  plan. The hooks check each commit; a failing check is fixed from its message, as skill `lernapps-cli` says.
- What you cannot decide: choose, write it under "Key decisions" with "(guess)", go on.
- The creator asks for a change: say your reading in one sentence first, then change every place it holds for
  (`feedback-applied-everywhere`).
-->

### Tasks

- [ ] Load skill `lernapps-cli`. Create the app as its section "Create" says:
      `npx --no -- lernapps create --archetype explainer`.
- [ ] Fill the content guide `.agents/skills/app-content/SKILL.md` from "Notes" and "Content method": every heading,
      no "FILL IN" left. Commit it before any content.
- [ ] Load skill `lernapps-explainer`.
- [ ] Load skill `lernapps-content-questions`. Read whole, with your file tool:
      `.agents/skills/lernapps-explainer/references/blocks.md` and
      `.agents/skills/lernapps-explainer/references/exercises.md`. A foreign language: also
      `references/language-tasks.md` in the same folder. A component in the plan: also `references/components.md`.
- [ ] Decide whether the app needs `scope`, as "`scope`" in
      `.agents/skills/lernapps-explainer/references/structure.md` says. Write the choice under "Key decisions".
<!-- tasks: pattern: the one page or screen that is the pattern for the others -->
- [ ] **Checkpoint:** the pattern page. Load skill `lernapps-learner-check` and do its learner check on the page. Fix
      what it finds. Then show the creator the page and ask whether the others may follow it. Stop and wait. A
      change: change the pattern first.
<!-- tasks: pages: the other pages or screens, after the pattern -->
- [ ] Update the content guide so that it describes the app as built (`app-content-matches`).
- [ ] Run `npx --no -- lernapps check` until it passes.
- [ ] Look at every screen and state, at 360 px and on a desktop, as "Look at the app" of skill `lernapps-cli` says.
      Compare each with its sketch.
- [ ] Do the whole-app check of skill `lernapps-learner-check`. Fix what it finds and write under "Notes" what you
      fixed.

## Commit

<!--
- Put the app on GitHub, publish it with the creator's yes, then list it. A push to `main` publishes.
- Open the pull requests (to `main`, to the catalog) without asking: they publish nothing.
- The creator asked to stop before publishing (a trial): stop here and say so.
-->

### Tasks

- [ ] Load skill `lernapps-explainer-self-assessment`. Add the self-assessment as it says, or write under "Key
      decisions" why the app has none. Commit.
- [ ] Load skill `lernapps-github`. Set up the repository and Pages as it says. Ask for the repository's name and
      every click only the creator can make, in one message.
- [ ] Push `work`, open the preview pull request and see its checks to green, as skill `lernapps-github` says.
- [ ] **Checkpoint:** publish. Show what the app does and the preview link from the comment "Vorschau der App". Ask
      whether it may go online. Stop and wait for the yes.
- [ ] Load skill `lernapps-commit`. Publish as skill `lernapps-github` says: `work` into `main` as one squash commit,
      the run of `Pages` watched to its end.
- [ ] Open the address the job `deploy` printed and confirm that the app shows. Never use a derived address.
- [ ] Load skill `lernapps-listing`. Write the entry under "Entry draft" as it says, with the creator's answer to
      "Finding the app".
- [ ] Fill the retrospective.
- [ ] Commit this plan on `main` and push it: the listing check and the review read it there.
- [ ] **Checkpoint:** list. Open the listing pull request as skill `lernapps-listing` says, without asking first: the
      pull request is the review. See it to "bestanden", then show the creator the pull request and its result.
- [ ] If the plan changed since its last push, commit it on `main` and push again.

### Entry draft

<!-- YAML valid against the entry schema the listing skill names. Only known values, never invented. -->

```yaml
```

## Retrospective

<!-- At the end of Commit, before the listing pull request. Facts, short, no names. Read by review and evals. -->

### Phases reached

<!-- Last phase completed, checkpoints passed. E.g. "commit; confirmed, published". -->

### Creator turns after the plan

<!-- Number of creator messages after the confirmation, topic of each. Target: at most 3. -->

### Where I had to guess

<!-- Each gap in plan, skills, messages or answers, and your choice. "None" if none. -->
