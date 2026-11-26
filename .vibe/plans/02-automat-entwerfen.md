---
# Read by the hooks, the review, the evals. Schema: @lernapps/tooling/guidance/plan-front-matter.v1.schema.json
# Written by `lernapps plan` and the hooks. Never change a key or a value by hand.
# Archetype, as in the app's first plan. Allowed values: explainer, interactive, quiz.
archetype: explainer
# Current phase. Allowed values: explore, plan, code, commit.
phase: commit
# prePushFailures: failed pre-push runs of this increment, written by the hook.
prePushFailures: 0
# failedChecks: failed rules and runs, written by lernapps check and the hooks.
failedChecks: { checks-pass: 3 }
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
- Kein `scope`: weiter keine `open-task`, kein Material eines Erstellers (wie Plan 01).
- Die Simulator-Ansicht „entwerfen“ ist eine eigene Anzeige-Komponente `AutomatWerkstatt`, die mit der Übung
  `AutomatEntwurf` dieselbe Bearbeitung (`AutomatEditor.vue`) und dasselbe Modell teilt; `AutomatSimulator` bekommt
  nur die Ansicht `bild`. Grund: andere Props (eine Entwurfsaufgabe statt eines fertigen Automaten); das Modell bleibt
  `Automat.ts`.
- Fehlerbilder als eigene Anzeige-Komponente `AutomatBild` mit Daten `fehlerbilder.yaml` statt einer Ansicht `bild`
  im Simulator (guess): Ein Bild hat keine Knöpfe und darf unvollständig oder nicht eindeutig sein, das Modell des
  Simulators nicht. `AutomatAufgabe` `fehler` zieht nur Aufgaben, bei denen genau ein Pfeil die Folge repariert.
- Verbessern meldet vor der ersten Änderung keine Antwort (Laufzeitregel); „Prüfen“ fordert dann zum Ändern auf.
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

### Quellen (gelesen; Lehrpläne hat ein Hilfsagent gelesen, die NRW-Kernstellen habe ich im Text nachgesehen)

- Lernlandkarte Informatik, `automat-entwerfen` (9-10, Schritt 1, requires `zustandsdiagramm`).
- GI-Bildungsstandards Sek I 2025, 5.3, S. 18: „SA-4 modellieren Sachverhalte zustandsorientiert“ (Jg. 7-10); keine
  weitere Erläuterung, kein Beispiel.
- NRW, Kernlehrplan Wahlpflicht Informatik Gymnasium (G9) 2023,
  https://lehrplannavigator.nrw.de/system/files/media/document/file/g9_wpif_klp_2023_06_01.pdf, S. 13: „Für eine
  konkrete Problemstellung kann ein Automat entwickelt werden. Automaten arbeiten schrittweise Eingabefolgen ab …“;
  S. 17: „entwickeln einen Automaten für eine konkrete Problemstellung (MI)“, „analysieren die Funktionsweise eines
  Automaten mit Hilfe eines Zustandsübergangsdiagramms (DI)“. Realschule/Gesamtschule (WP, Ende Jg. 8) gleich, dazu
  „identifizieren unterschiedliche Zustände von Automaten“.
- Bayern: Realschule IT, Wahlmodul 2.7.2 (nach Jg. 8): „erzeugen Modelle, um Zustände und Verhalten … zu planen“,
  „Zustandsübergangsdiagramm“. Gymnasium: Automaten erst Inf13 (deterministisch, Startzustand …), nicht 9-10.
- Hessen KC Informatik Wahlunterricht Sek I (2021): Automaten nur nach EVA, keine Zustände. Niedersachsen KC Sek I
  (2014, Kopie gelesen, Original nicht geprüft), Modul „Modellierung von Automaten“: „entwickeln und implementieren ein
  Automatenmodell in Form eines Zustandsgraphen“, „analysieren die Funktionsfähigkeit …“.
- England: KS3 „model the state and behaviour of real-world problems“; GCSE (AQA 8525, OCR J277) ohne FSM; AQA A-level
  „state transition diagrams and state transition tables … Mealy machines only“.
- Lehrmaterial (keine Lehrplanquelle): inf-schule.de, Zustandsbasierte Modellierung: Ampel mit Taster und Timer;
  „Drückt ein Benutzer den Knopf, während ein Timer läuft, so geschieht nichts“; Determinismus: „Pro Zustand darf jedes
  Ereignis höchstens einmal an einem ausgehenden Übergang vorkommen.“ Ausgabe am Übergang wie in diesem Explainer.
- Nicht geprüft: Hessen „KI und Digitale Welt“ (404), RLP 7/8 (502), Edexcel GCSE, Volltext Henry et al. 2022.
- Begriffe neu in Kapitel 2 (guess): „vollständig“ (jeder Zustand hat für jede Eingabe einen Pfeil) und „eindeutig“
  (höchstens einen), mit dem Fachwort „deterministisch“ einmal genannt; „Testfolge“. Kein Lehrplan für 7-10 nennt
  sie, inf-schule nennt „deterministisch“.

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
- [x] Load skill `lernapps-content-research`. Research what the content guide does not cover. Write under "Notes":
      the new competencies by chapter with their ids, the sources you opened.
- [x] Write under "Notes" the didactic approach per competency and the scope (in, out, data range).
- [x] The increment needs a kind of content the guide does not cover (a new page structure, screen, component or kind
      of exercise): load skills `lernapps-explainer-design` and `lernapps-exercise-patterns`. Else skip this task.
- [x] **Checkpoint:** research. Show in plain words: the new competencies by chapter, the didactic approach, the
      scope, every "(guess)", the sources and what is unchecked. Stop and wait. Changes: change them, then ask again.
      Creator: Einverstanden, weiter mit dem Plan. Zwei Seiten für einen Baustein: ja. Ausgaben: nur Zustände und Übergänge entwerfen; in einem Satz erwähnen, dass man Ausgaben auch an die Übergänge schreiben kann. Begriffe vollständig, eindeutig (deterministisch einmal), Testfolge passen. inf-schule nur als Anregung.

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

- [x] Load skill `lernapps-content-growth`. Add the tasks of Code as slices, one per competency, in the guide's
      order, one call each: `npx --no -- lernapps plan add --at slices "<task>"`. Say in each which sub-agent may
      write it in parallel, if any.
- [x] Write "Content method": the guide's patterns, figures and components per slice. Anything new: map it as skill
      `lernapps-explainer-design` says, and say why the guide's patterns do not fit.
- [x] Draw a sketch of each new component or interactive exercise, in `.vibe/sketches/`.
- [x] Show the creator, short: goal, new competencies by chapter, slices; in plain words what learners see and do and
      what is new. At most 2 questions.
- [x] **Checkpoint:** confirm the plan and the content method. Stop and wait for an explicit yes. Changes: change
      them, then ask again.
      Creator: Ja, so bauen. Musterseite ampel-entwerfen zuerst. ✓/✗ vor Prüfen: ja; Prüfen testet zusätzlich ein bis zwei verdeckte Testfolgen aus den Daten, Rückmeldung nennt sie erst dann; Seite sagt, dass Prüfen weitere Folgen testet.

### Content method

**Aufbau.** `src/entwerfen/chapter.yaml` („Einen Automaten entwerfen“), in `src/app.yaml` nach `alltag`. Seiten
`ampel-entwerfen`, `entwurf-testen`, beide `competencies: [automat-entwerfen]`. Abschnitts-ids wie Kapitel 1
(`einstieg`, `idee`, `ausprobieren`, `mitmachen` entfällt hier, `uebung`, am Kapitelende `rueckblick`). Voraussetzung
`zustandsdiagramm`: übt Kapitel 1; Link auf `/alltag/zustandsdiagramm/` im Einstieg, kein recap.

**Fall statt Bild.** Chat der 9b als `text`-Block mit Zeilen „**Selin:** …“ (je Seite ein Chat im Einstieg, kurz);
keine gezeichneten Kinder. Ausgaben: ein Satz auf Seite 1, dass man sie wie in Kapitel 1 an die Übergänge schreiben
kann; entworfen werden nur Zustände und Übergänge.

**Muster aus dem Leitfaden** (weiter genutzt): `AutomatAufgabe` Modus `folge` (Bedarfsampel lesen),
`true-false` gegen Fehlvorstellungen, `matching`, `single-choice` mit `info` je Option, Simulator-Bild.

**Neu, und warum kein vorhandenes Muster passt:**
- **Übungskomponente `AutomatEntwurf`** (entwerfen; kein Block kann einen Entwurf mit frei gewählten Zuständen
  prüfen): je Aufgabe aus `src/data/entwuerfe.yaml` (Bedarfsampel, Parkhausschranke, Zahlenschloss 2-7, Drehtür im
  Museum) die Aufgabe, die Eingaben, 5-7 Zustandskarten (darunter 1-2 Karten, die eine Eingabe, Ausgabe oder Handlung
  sind, mit Grund) und 3-5 Testfolgen mit erwartetem Endzustand. Bedienung: Karten an- und abwählen (Checkboxen),
  Startzustand wählen (Radio), je Zeile „Zustand × Eingabe“ das Ziel aus einer Auswahlliste; das Diagramm (Kreise auf
  einem Kreis angeordnet) zeichnet sich mit; „Testfolgen abspielen“ zeigt je Folge, wo sie endet. Antwort: der Entwurf.
  `check` prüft Eigenschaften: keine Nicht-Zustand-Karte; Startzustand wie in der Aufgabe beschrieben; vollständig;
  alle Testfolgen enden richtig. `reason` nennt die erste verletzte Eigenschaft (die Karte mit ihrem Grund, die leere
  Zeile, die gescheiterte Testfolge mit ihrem Ende), nie die Lösung. `solution` ist ein gültiger Entwurf aus den Daten
  (nur für „Lösung zeigen“ und den Tutor; geprüft wird nicht gegen ihn). Modus `verbessern` (Seite 2): Der Entwurf
  startet mit einem gültigen Entwurf, in dem ein Pfeil verändert ist; die Kinder finden ihn mit den Testfolgen.
  Kann nicht: eigene Zustandsnamen eintippen (nur Karten), Ausgaben festlegen, nicht-deterministische Entwürfe bauen
  (die Bedienung erlaubt je Zeile ein Ziel; das Thema „eindeutig“ übt Seite 2 mit Bildern und Fragen).
- **Simulator-Ansicht `entwerfen`** (Seite 1, Ausprobieren, keine Übung): dieselbe Bedienung mit der Bedarfsampel,
  ohne Prüfen, mit „Testfolge abspielen“ Schritt für Schritt. Ansicht `bild`: nur das Diagramm ohne Knöpfe, für die
  Fehlerbilder auf Seite 2 (`src/data/fehlerbilder.yaml`: ein Entwurf mit fehlendem Pfeil, einer mit zwei Pfeilen
  derselben Eingabe).
- **`AutomatAufgabe` Modus `fehler`** (Seite 2): ein Automat aus `automaten.yaml` mit einem veränderten Pfeil und eine
  Testfolge, die falsch endet; die Kinder wählen den falschen Pfeil aus einer Liste („Mitte – runter → oben“).
  `reason`: ein Pfeil, den die Folge gar nicht benutzt, oder ein benutzter, aber richtiger.
- **`generated` Zeilen zählen** (Seite 2): „n Zustände, m Eingaben: Wie viele Pfeile braucht ein vollständiger
  Entwurf?“ Antwort n·m; Fehler n+m, n, m.

**Seiten und Übungen:**
1. `ampel-entwerfen`: Einstieg Chat (Bedarfsampel vor der Schule) + `multiple-choice` „Welche sind Eingaben der
   Bedarfsampel?“ – Idee: vier Schritte als Liste, Zustandskarten-Tabelle, Definitionen „vollständig“, „eindeutig
   (deterministisch)“, „Testfolge“ – Ausprobieren: Simulator `entwerfen` (Bedarfsampel) – Übung: `ordering` der vier
   Schritte, `single-choice` „Warum braucht die Ampel ‚Anforderung‘?“, `AutomatEntwurf` (alle vier Aufgaben),
   `true-false` „Die Ampel braucht eine Uhr als Zustand“.
2. `entwurf-testen`: Einstieg Chat (Mias Entwurf, die Testfolge scheitert) + `single-choice` – Idee: drei Fehlerarten,
   je mit Simulator `bild`, gute Testfolgen (jede Eingabe in jedem Zustand) – Übung: `generated` Zeilen zählen,
   `AutomatAufgabe` `fehler`, `AutomatEntwurf` `verbessern`, `matching` Fehlerbild → Fehlerart – Rückblick aufs Kapitel
   und auf die App.

**Engagement:** 1. Einstieg „Was muss sich die Ampel merken?“ – Wechsel Chat, Liste, Tabelle, Simulator, Übungen –
Lohn: ein eigener Entwurf, der alle Testfolgen besteht – weiter: Mia testet ihn. 2. Einstieg „Mias Entwurf lässt die
Fußgänger nie gehen. Warum?“ – Wechsel Bilder, Fragen, Fehler suchen, verbessern – Lohn: die Technik-AG programmiert
nach dem geprüften Entwurf – Rückblick vom Saftautomaten der 6b bis zur Ampel der 9b.

**Selbsteinschätzung:** Kapitel `entwerfen` bekommt eine mit `AutomatEntwurf` (zweimal), `fehler`, Zeilen zählen.

**Budget:** eigener Code aller Komponenten zusammen unter 20 kB gzip (jetzt etwa 7 kB).

## Code

<!--
- Build locally on the branch, on your own. After each task: `plan done`, then one commit with the work and this
  plan. The hooks check each commit; a failing check is fixed from its message, as skill `lernapps-cli` says.
- What you cannot decide: choose, write it under "Key decisions" with "(guess)", go on.
- The creator asks for a change: say your reading in one sentence first.
-->

### Tasks

- [x] `git switch -c increment/<NN>-<short name>` from `main`. Commit this plan on it.
- [x] Load skill `lernapps-cli`. Update the app as its section "Update" says. Commit the update alone and fix its
      findings before any content. The update replaces the `lernapps-*` skills: read again those you use.
- [x] Load skill `lernapps-explainer` and the content guide.
- [x] Load skill `lernapps-content-questions`. Read whole, with your file tool:
      `.agents/skills/lernapps-explainer/references/blocks.md` and
      `.agents/skills/lernapps-explainer/references/exercises.md`. A foreign language: also
      `references/language-tasks.md` in the same folder. A component in the plan: also `references/components.md`.
- [x] Decide whether the app needs `scope`, as "`scope`" in
      `.agents/skills/lernapps-explainer/references/structure.md` says. Write the choice under "Key decisions".
- [x] Slice 1 (ich, kein Subagent; gemeinsame Komponenten): Entwurfs-Komponenten (AutomatEntwurf.ts/.vue mit Tests, Simulator-Ansicht entwerfen, Daten entwuerfe.yaml) und Musterseite entwerfen/ampel-entwerfen (de, en): Chat der 9b, vier Schritte, Simulator entwerfen, Definitionen vollständig/eindeutig/Testfolge, Übungen
- [x] Slice 2 (ich, kein Subagent; nutzt dieselben Komponenten): Seite entwerfen/entwurf-testen (de, en): drei Fehlerarten mit Bildern, Testfolgen wählen, AutomatAufgabe Modus fehler, AutomatEntwurf Modus verbessern, generated Zeilen zählen
<!-- tasks: slices (2 added): one per competency, as written in Plan -->
- [x] **Checkpoint:** the pattern page, after the first slice. A slice in a pattern the app already has: show it to
      the creator and go on. A new pattern: load skill `lernapps-learner-check`, do its learner check, fix what it
      finds, then ask the creator whether the others may follow it, and wait.
      Creator: Ja, Seite 2 entwurf-testen folgt diesem Muster. Die verdeckten Testfolgen und die eigene Meldung bei leerer Auswahl sind gut umgesetzt.
- [x] Update the content guide so that it describes the app as it is now (`app-content-matches`).
- [x] Run `npx --no -- lernapps check` until it passes.
- [x] Look at every changed screen, at 360 px and on a desktop, as "Look at the app" of skill `lernapps-cli` says.

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
