---
# Read by the hooks, the review, the evals. Schema: @lernapps/tooling/guidance/plan-front-matter.v1.schema.json
# Written by `lernapps plan` and the hooks. Never change a key or a value by hand.
# Archetype, null until chosen in Explore. Allowed values: explainer, interactive, quiz.
archetype: explainer
# Current phase. Allowed values: explore, plan, code, commit.
phase: code
# prePushFailures: failed pre-push runs, written by the hook.
prePushFailures: 0
# failedChecks: failed rules and runs, written by lernapps check and the hooks.
failedChecks: { checks-pass: 2 }
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
- Sammel-Wiederholung am Kapitelanfang (`recap: informatik/eva-prinzip`), nur `eva-prinzip` wie die Karte
  (Orchestrator). Sie zeigt das EVA-Bild (Kopie von `EvaBild` aus #490) und daran, was ihm fehlt: das Gedächtnis.
- Der Simulator ist eine Komponentenfamilie mit einem gemeinsamen Modell `Automat.ts` (Zustände, Übergänge,
  Startzustand, Schritt): `AutomatDiagramm` zeichnet, `AutomatSimulator` spielt (Anzeige), `AutomatAufgabe` ist die
  Übungskomponente. Automaten liegen als Daten in `src/data/automaten.yaml`. Kapitel 2 ergänzt einen Entwurfsmodus,
  ohne Modell und Daten umzubauen.
- Kein `scope`: keine `open-task` und kein Material eines Erstellers; laut structure.md optional.
- Sprachen `[de, en]`: Deutsch in einfacher Sprache mit „du“, Englisch vollständig, Plain English mit „you“; Texte in
  Bildern über Props der Komponenten (wie `EvaBild` in #490).

## Notes

### Strang und Bausteine

Strang `informatik/sprachen-automaten` (Karte informatik.json, Status `draft`, explainerFocus `strand`). Beide
Bausteine von Welle 1 haben `practisedBy: []` (Lücken).

| Kapitel | Seite (Datei) | Baustein (id) | Stufe, Schritt | requires | opens |
|---|---|---|---|---|---|
| 1 Automaten im Alltag | `alltag/das-brauchst-du` | recap: `informatik/eva-prinzip` | – | – | – |
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

Voraussetzung von außerhalb: `eva-prinzip` (direkt, aus #490). Sie steht auf der Sammel-Wiederholung „Das brauchst du
hier“, kompakt, ohne neue Inhalte. #490 (informatik-computer) ist noch im
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
  #490) baut für das „Schulfest der 6b“ (so genannt, ohne Datum; #494 knüpft dort an) einen Saftautomaten aus einem Karton. Jona sitzt im Karton und *ist* der Automat, Mia
  kauft, Selin schreibt den Plan auf. Seite 1: Jona spielt und merkt, dass er sich das Geld merken muss. Seite 2: Selin
  zeichnet den Plan als Zustandsdiagramm, damit auch andere Kinder den Automaten spielen können; danach lesen sie
  weitere Pläne (Drehkreuz am Schwimmbad, Fußgängerampel). Ausblick: In Klasse 9-10 entwirfst du selbst einen Automaten.
- Getränkeautomat (fest für die App): Ein Saft kostet 2 €, der Automat nimmt nur 1-€-Münzen. Zustände „0 € drin“,
  „1 € drin“, „2 € drin“ (Startzustand „0 € drin“). Eingaben „1 € einwerfen“, „Knopf drücken“. Übergänge: 0 →(Münze) 1,
  1 →(Münze) 2, 2 →(Münze) 2 mit Ausgabe „Münze kommt zurück“, 0 und 1 →(Knopf) bleiben, 2 →(Knopf) 0 mit Ausgabe „Saft
  fällt heraus“. Jeder Zustand hat für jede Eingabe einen Pfeil, auch wenn sich nichts ändert (Schleife). So ist das
  Diagramm vollständig und der Simulator weiß immer, wohin.
- Ausgaben: an den Übergängen (was beim Springen passiert). Im Diagramm steht am Pfeil „Eingabe / Ausgabe“, im Simulator
  die Ausgabe als Satz. Keine deutsche Quelle legt eine Schreibweise fest; Isaac Computer Science schreibt die
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
- [x] **Checkpoint:** research. Show in plain words: the strand or why none, the competencies by chapter, the didactic
      approach, the scope, every "(guess)", the sources and what is unchecked, the archetype and its reason. Stop and
      wait. Changes: change them, then ask again.
      Creator: Einverstanden, weiter mit dem Plan. Sammel-Wiederholung: nur eva-prinzip, wie die Karte; EVA-Bild aus #490 nutzen und zeigen, was ihm fehlt: das Gedächtnis. Geschichte passt; 'Schulfest der 6b' ohne Datum. Typische Fehler vom fachlichen Prüfer bestätigen lassen.

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

- [x] Map the content as "Map the content" of skill `lernapps-explainer-design` says, and write the result under
      "Content method".
- [x] Choose a pattern per competency as skill `lernapps-exercise-patterns` says, and add it to "Content method".
- [x] Add to "Content method" one line per page, as "Engagement" of skill `lernapps-explainer-design` says: the
      opening task, the change of activity, the reward, the story.
- [x] Add the tasks of Code, each one a piece of work that ends in a commit. First the pattern: one complete page or
      screen, `npx --no -- lernapps plan add --at pattern "<task>"`. Then the others, one call each:
      `npx --no -- lernapps plan add --at pages "<task>"`. Each task says what it builds and what it shows.
- [x] Draw a sketch of each screen, component or interactive exercise: a static SVG or image, or the steps with what
      learners see after each. Keep the files in `.vibe/sketches/`.
- [x] Show the creator, short: goal, competencies by chapter, the Code tasks, the sketches, and the content method in
      plain words (what learners see and do, what the app cannot do). At most 2 questions.
- [x] **Checkpoint:** confirm the plan and the content method. Stop and wait for an explicit yes. Changes: change
      them, then ask again.
      Creator: Ja, so bauen. Musterseite zustandsdiagramm: ja. Satz: jeder Zustand braucht für jede Eingabe einen Pfeil. Fußgängerampel ohne Uhr: 'Zeit um' als Eingabe.

### Content method

**Aufbau.** `src/app.yaml` mit `format: 2`, `strand: informatik/sprachen-automaten`, `languages: [de, en]`, Kapitel
`alltag` (Welle 1) mit den Seiten `das-brauchst-du` (recap `informatik/eva-prinzip`), `automaten-im-alltag`,
`zustandsdiagramm`. Kapitel 2 später als Ordner `entwerfen`. Abschnitte mit gleichen ids auf jeder Seite:
`einstieg` (Szene und erste Aufgabe), `ausprobieren` (nur wo der Simulator bedient wird), `idee` (das Neue, mit
Definition und „Merke“), `mitmachen` (unplugged-Anleitung), `uebung`. Titel passen zur Seite.

**Voraussetzungen:** `eva-prinzip` → Sammel-Wiederholung (Seite 0). `automaten-im-alltag` → von Seite 1 geübt, kein
recap für Seite 2. Kein Link nach #490 (noch nicht veröffentlicht); die Runtime verlinkt den Baustein auf der Karte.

**Muster je Baustein** (Fehler und Rückmeldungen wie unter Notes):
- Wiederholung (recap, höchstens 1 Übung): `EvaBild` mit dem Saftautomaten (E: Münze, Knopf; V: prüft das Geld;
  A: Saft); ein `single-choice` „Mia drückt den Knopf. Was sagt dir das EVA-Bild darüber, ob Saft kommt?“ → „Nichts:
  Es hängt davon ab, was vorher passiert ist“. Text: Das EVA-Bild zeigt den Weg, aber kein Gedächtnis.
- automaten-im-alltag (erklären, wie er abhängig von Eingabe und Zustand reagiert):
  - `single-choice` Einstieg: Mia drückt den Knopf, Jona hat bisher 1 € bekommen. Was passiert? (Wiederholungsfehler:
    „Saft kommt, weil sie gedrückt hat“).
  - `generated` mit `pick: 1` aus `data/saft-situationen.yaml` (Felder `geld`, `eingabe`, `reaktion`, `neu`, je
    Datensatz der richtige Satz) und `compare: { choice: [...] }` über die festen vier Reaktionen („Saft fällt heraus“,
    „Nichts passiert“, „Der Automat merkt sich 1 € mehr“, „Die Münze kommt zurück“); `mistakes` für „gleicher Knopf,
    gleiche Reaktion“. Pflichtübung.
  - `AutomatAufgabe` Modus `folge`, Ansicht `kasten` (ohne Diagramm): Start „0 € drin“, 3-5 Eingaben gezogen; „Was
    merkt sich Jona am Ende?“ Antwort ist ein Zustand. `reason`: erster Schritt, an dem die Folge falsch weitergeht
    („Nach dem dritten Schritt sind 2 € drin; Knopf gibt Saft und der Automat ist wieder leer“).
  - `matching` Alltagsautomat → was er sich merkt (Ampel → welche Farbe leuchtet; Aufzug → in welchem Stockwerk er
    ist; Drehkreuz → ob schon bezahlt ist; Waschmaschine → welcher Schritt dran ist).
  - `true-false` „Ein Automat reagiert auf dieselbe Eingabe immer gleich.“ (falsch, mit Grund).
- zustandsdiagramm (darstellen und lesen):
  - `number` Einstieg: „Wie viele verschiedene Dinge muss sich Jona merken können?“ (3: 0 €, 1 €, 2 €).
  - `matching` Teil des Diagramms → Bedeutung (Kreis → Zustand; Pfeil → Übergang; Wort oben am Pfeil → Eingabe; Wort
    unten am Pfeil → Ausgabe; Pfeil „Start“ → Startzustand), mit dem Diagramm als `material`.
  - `AutomatAufgabe` Modus `folge`, Ansicht `diagramm`, aus allen Automaten der Datendatei: Startzustand, Eingabefolge,
    Endzustand anklicken. `reason` nennt den ersten falschen Schritt und den Fehler (Pfeilrichtung, nicht beim Start
    begonnen, Schleife übersehen).
  - `AutomatAufgabe` Modus `pfeil` (darstellen): ein Pfeil des Diagramms fehlt (gestrichelt mit „?“); ein Satz sagt,
    was passiert („Wenn 1 € drin ist und du eine Münze einwirfst, …“); das Kind wählt den Zielzustand. `reason`:
    Ziel = Start des Pfeils („das ist der Zustand, aus dem der Pfeil kommt“), Ziel ohne Bezug zum Satz.
  - `single-choice` „Welche Zeile fehlt in Selins Tabelle?“ (Tabelle ↔ Diagramm), Pflichtübung neben `true-false`
    „Wenn sich nichts ändert, braucht es keinen Pfeil.“ (falsch in diesem Explainer: Wir zeichnen eine Schleife).
- Je Seite mindestens 4 Übungen, höchstens die Hälfte ratbar, jede falsche Option mit `info`, `generated` mit
  `mistakes` und `hint`.

**Bilder** (eigene SVG, `source: eigene Zeichnung`, `licence: CC-BY-4.0`, ohne Text im Bild):
- `schulfest.svg` (Seite 1, Einstieg): Jona im Karton-Saftautomaten mit Schlitz und Knopf, Mia davor mit einer Münze,
  Selin mit Notizblock. Figuren aus `klasse-6b.svg` (#490, Herkunft im Dateikopf). Zeigt die Szene, nicht die Antwort.
- Der Simulator ist das wiederkehrende Bild; er ist eine Komponente, weil sein Text übersetzt wird.

**Komponenten** (kein Block kann einen Automaten zeichnen, schalten oder eine Zustandsfolge prüfen;
`prefer-built-in-block`; Code zusammen unter 20 kB gzip):
- `Automat.ts` (Modell, rein): Typ `Automat` mit `states` (`id`, `name`, `x`, `y`), `start`, `inputs` (`id`, `name`),
  `transitions` (`from`, `input`, `to`, optional `output`, `bend`); `step`, `run`, `isComplete`. Kapitel 2 nutzt es
  zum Prüfen eines entworfenen Automaten gegen Testfolgen.
- `AutomatDiagramm.vue` (Zeichnung, SVG): Zustände als Kreise mit Namen (aktiver dick umrandet und gefüllt), Startpfeil
  von links mit „Start“, Übergänge als Pfeile, Schleifen über oder unter dem Kreis, gebogen bei Gegenrichtung. Am Pfeil
  „Eingabe / Ausgabe“: die Eingabe blau, nach dem Schrägstrich die Ausgabe orange (Schrägstrich als Zeichen neben der
  Farbe); ohne Ausgabe nur die Eingabe. Pfeile mit gleichem Start und Ziel werden zusammengefasst („Münze, Knopf“).
  Was es zeigt: Die Kinder lesen Kreis = was er sich merkt, Pfeil = wohin er bei einer Eingabe springt.
- `AutomatSimulator.vue` (Anzeige, `nojs` mit der Tabelle aller Übergänge): Ansicht `kasten` (Seite 1: nur der
  Zettel „Jona merkt sich: …“) oder `diagramm` (Seite 2); Knöpfe je Eingabe, Ausgabezeile, Verlauf, „Zurück zum
  Start“. Tastatur: Knöpfe sind `button`; der aktive Zustand wird mit `aria-live` angesagt. Kapitel 2 bekommt die
  Ansicht `entwerfen`.
- `AutomatAufgabe.vue` (Übungskomponente, `AutomatAufgabe.ts` mit `generate`, `check`, `solution`, `wrong`, `reason`,
  `describe`, `about`, `template`, `params`, `mistakes`, `show`): Modi `folge` und `pfeil`. Prüft den gewählten
  Zustand. Kann nicht: freie Diagramme zeichnen (Kapitel 2), nicht-deterministische Automaten.
- `EvaBild.vue` (Kopie aus #490 mit Herkunft im Dateikopf, nur auf der Wiederholung).

**Datendateien** (`src/data/`, Texte als `{ de, en }`): `automaten.yaml` (Saftautomat, Drehkreuz, Fußgängerampel mit
Knopf, Tür mit Zahlencode, Lichtschalter mit Taster; je Automat `id`, `name`, `states`, `start`, `inputs`,
`transitions`), `saft-situationen.yaml` (Zustand, Eingabe, Reaktion). Jeder Automat steht einmal, alle Blöcke lesen ihn
mit `{ data: automaten }`.

**Engagement je Seite:**
0. das-brauchst-du: Einstieg „Mia wirft 1 € ein und drückt den Knopf“ im EVA-Bild – Wechsel: EVA-Bild ansehen, eine
   Frage – Lohn: Du weißt, was dem EVA-Bild fehlt – Geschichte: Die 6b plant den Saftautomaten fürs Schulfest der 6b;
   nächste Seite: Jona spielt den Automaten.
1. automaten-im-alltag: Einstieg „Mia drückt den Knopf, aber es kommt kein Saft. Warum?“ (Bild Schulfest) – Wechsel:
   Bild, Frage, Simulator (Kasten) bedienen, Definition Zustand, Spielanleitung, Alltagsautomaten zuordnen,
   Folgen durchrechnen – Lohn: Jona spielt den Automaten ohne Fehler; du erkennst, was Alltagsautomaten sich merken –
   Geschichte: Jona braucht eine Pause; nächste Seite: Selin schreibt einen Plan, nach dem jedes Kind Automat sein kann.
2. zustandsdiagramm (Musterseite): Einstieg „Wie viele Dinge muss sich Jona merken?“ – Wechsel: Selins Tabelle, das
   Diagramm entsteht, Simulator (Diagramm) bedienen, Merke-Kasten zu Lesefehlern, Spielstein-Spiel, Diagramme lesen und
   Pfeile ergänzen – Lohn: Selins Plan hängt am Automaten, Mia spielt ihn nach Plan; Rückblick aufs Kapitel – Geschichte:
   Das Schulfest beginnt; Ausblick: In Klasse 9-10 entwirfst du selbst einen Automaten (Ampel).

**Wiederholen mit Absicht:** Der Saftautomat kommt auf allen drei Seiten vor: als EVA-Bild (was fehlt), als Kasten mit
Zettel (Zustand), als Diagramm (Zustände und Übergänge). Die Alltagsautomaten von Seite 1 kommen auf Seite 2 als
Diagramme wieder.

**Ein neues Kapitel:** eigener Ordner (`entwerfen`), gleiche Abschnitts-ids, Simulator mit Ansicht `entwerfen`,
Automaten in `automaten.yaml` ergänzen, Figuren wie im Inhaltsleitfaden (in 9-10 ohne gezeichnete Kinder: eine
Ampelsteuerung als Fall).

## Code

<!--
- Build the app, locally on `work`, on your own. After each task: `plan done`, then one commit with the work and this
  plan. The hooks check each commit; a failing check is fixed from its message, as skill `lernapps-cli` says.
- What you cannot decide: choose, write it under "Key decisions" with "(guess)", go on.
- The creator asks for a change: say your reading in one sentence first, then change every place it holds for
  (`feedback-applied-everywhere`).
-->

### Tasks

- [x] Load skill `lernapps-cli`. Create the app as its section "Create" says:
      `npx --no -- lernapps create --archetype explainer`.
- [x] Fill the content guide `.agents/skills/app-content/SKILL.md` from "Notes" and "Content method": every heading,
      no "FILL IN" left. Commit it before any content.
- [x] Load skill `lernapps-explainer`.
- [x] Load skill `lernapps-content-questions`. Read whole, with your file tool:
      `.agents/skills/lernapps-explainer/references/blocks.md` and
      `.agents/skills/lernapps-explainer/references/exercises.md`. A foreign language: also
      `references/language-tasks.md` in the same folder. A component in the plan: also `references/components.md`.
- [x] Decide whether the app needs `scope`, as "`scope`" in
      `.agents/skills/lernapps-explainer/references/structure.md` says. Write the choice under "Key decisions".
- [x] Simulator-Kern: Automat.ts, AutomatDiagramm, AutomatSimulator, AutomatAufgabe mit Tests und data/automaten.yaml; zeigt Kreise, Pfeile, Eingabe und Ausgabe am Pfeil, Startpfeil, Tastaturbedienung
- [x] Musterseite alltag/zustandsdiagramm in de und en: Selins Tabelle, Diagramm des Saftautomaten im Simulator, Merke zu Lesefehlern, Spielstein-Anleitung, Übungen number, matching, AutomatAufgabe folge und pfeil, single-choice, true-false; zeigt das Seitenmuster und den Simulator
<!-- tasks: pattern (2 added): the one page or screen that is the pattern for the others -->
- [x] **Checkpoint:** the pattern page. Load skill `lernapps-learner-check` and do its learner check on the page. Fix
      what it finds. Then show the creator the page and ask whether the others may follow it. Stop and wait. A
      change: change the pattern first.
      Creator: Ja, die beiden übrigen Seiten folgen diesem Muster. Grün aktiver Zustand, Blau Eingabe, Orange Ausgabe festgelegt. 360 px: mindestens 12 px. Zweiter Lernenden-Check vor Veröffentlichen mit der Musterseite.
- [x] Seite alltag/automaten-im-alltag (de, en): Bild schulfest mit Klasse 6b, Simulator Ansicht kasten, Definition Zustand, Spielanleitung, generated aus saft-situationen, AutomatAufgabe folge, matching Alltagsautomaten, true-false; zeigt Reaktion abhängig von Eingabe und Zustand
- [x] Seite alltag/das-brauchst-du (de, en): recap eva-prinzip mit EvaBild (Kopie aus #490) am Saftautomaten und einer Frage; zeigt, was dem EVA-Bild fehlt
<!-- tasks: pages (2 added): the other pages or screens, after the pattern -->
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
