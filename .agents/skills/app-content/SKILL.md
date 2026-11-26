---
name: app-content
description: Use for any content work in this app - researching, writing, extending, correcting or reviewing its competencies, chapters, pages, rounds, questions, exercises, figures, terms or sources. This app's own content decisions; they take precedence over the generic lernapps content skills. Load it before you change any content.
---

# Content guide of this app

Explainer „Automaten und Zustände“ (lernapps/apps#500) im Epic Informatik (#509). Strang
`informatik/sprachen-automaten`, Format 2, Sprachen `[de, en]`. Welle 1: Kapitel `alltag` (Stufe 5-6). Kapitel 2
`entwerfen` (9-10, `automat-entwerfen`) kommt als Inkrement auf `increment/9-10` mit demselben Simulator.

## Curriculum

- Richtstufe 5-6 nach der Lernlandkarte Informatik (https://lernapps.net/apps/map/informatik.json); die Karte gibt
  Bausteine und Reihenfolge vor.
- NRW, Kernlehrplan Informatik Klasse 5 und 6, MSB NRW 2021, S. 14 (Automaten „treffen Entscheidungen, die aus einer
  Verknüpfung von Eingabe und Zustand resultieren“, Beispiel Getränkeautomat) und S. 18 („erläutern die Funktionsweise
  eines Automaten aus ihrer Lebenswelt“, „stellen Abläufe in Automaten graphisch dar“).
- GI-Bildungsstandards Sek I 2025, S. 18, Abschnitt 5.3: Automaten = „Rechnermodelle, deren Verhalten durch Zustände
  und Zustandsübergänge beschrieben wird“; SA-3/SA-4 dort erst Jg. 7-10. Die App folgt der Karte (5-6); der Fund ging
  an den Orchestrator.
- Bayern (Gymnasium NT 5-7, Mittelschule 5-6) und Hessen („Digitale Welt“ 2024): keine Automaten in 5-6.

## Competencies

Kapitel `alltag` „Automaten im Alltag“:

- Seite `alltag/das-brauchst-du`: `recap: informatik/eva-prinzip` („Ich kann das EVA-Prinzip (Eingabe, Verarbeitung,
  Ausgabe) erklären und Geräte und Vorgänge den drei Phasen zuordnen.“). `EvaBild` am Saftautomaten, Schublade mit
  der Frage „Wie viel Geld ist schon drin?“; eine Frage `eva-was-fehlt`.
- Seite `alltag/automaten-im-alltag`, `competencies: [automaten-im-alltag]`: „Ich kann an einem Automaten aus dem
  Alltag, zum Beispiel einem Getränkeautomaten, erklären, wie er abhängig von Eingabe und Zustand reagiert.“
  Übungen: `kein-saft` (single-choice, Einstieg), `immer-gleich` (true-false), `was-passiert` (generated),
  `zettel-am-ende` (AutomatAufgabe folge, kasten), `alltag-merken` (matching), `zustand-oder-eingabe`
  (single-choice: Zustand, Eingabe oder Ausgabe?).
- Seite `alltag/zustandsdiagramm`, `competencies: [zustandsdiagramm]`: „Ich kann das Verhalten eines Automaten mit
  Zuständen und Übergängen in einem Zustandsdiagramm darstellen und ein solches Diagramm lesen.“ Übungen:
  `zustaende-zaehlen` (number), `saft-bekommen` (single-choice zum Simulator), `diagramm-teile` (matching),
  `folge-lesen` (AutomatAufgabe folge, diagramm), `pfeil-ergaenzen` (AutomatAufgabe pfeil), `diagramm-jetzt`
  (true-false).

Kapitel `entwerfen` „Einen Automaten entwerfen“ (9-10, Plan 02):

- Seite `entwerfen/ampel-entwerfen`, `competencies: [automat-entwerfen]`. Übungen: `ampel-eingaben`
  (multiple-choice), `schritte-ordnen` (ordering), `warum-wartet` (single-choice), `entwurf-neu` (AutomatEntwurf
  `neu`), `uhr-zustand` (true-false).
- Seite `entwerfen/entwurf-testen`, `competencies: [automat-entwerfen]`. Einstieg: Chat (Mia testet nur ohne Knopf,
  Jonas Folge findet den Fehler), `AutomatBild` 0 (Mias Ampel), `warum-nicht-gefunden` (single-choice). Idee: drei
  Fehlerarten (Pfeil fehlt → nicht vollständig, `AutomatBild` 1; zwei Pfeile mit derselben Eingabe → nicht eindeutig,
  `AutomatBild` 2; Pfeil führt falsch → nur eine Testfolge über ihn zeigt es), Definition „eindeutig“ (Fachwort
  „deterministisch“ einmal), Pfeile = Zustände mal Eingaben, gute Testfolgen laufen zusammen über jeden Pfeil. Übung:
  `pfeile-zaehlen` (generated), `falscher-pfeil` (AutomatAufgabe `fehler`), `entwurf-verbessern` (AutomatEntwurf
  `verbessern`, alle vier Aufgaben), `fehlerarten` (matching), `alle-tests-gruen` (true-false). Rückblick auf Kapitel
  und App (Mia setzt den Pfeil richtig, von der 6b bis zur 9b).

`automat-entwerfen`: „Ich kann für eine konkrete Aufgabe, zum Beispiel eine
Ampelsteuerung, einen Automaten mit Zuständen und Übergängen entwerfen.“

Die Übungs-ids stehen oben je Seite; die Muster dazu unter „Exercise patterns“.

## Content structure

- Abschnitte mit festen ids, in dieser Reihenfolge, wo die Seite sie braucht: `einstieg` (Szene, erste Aufgabe, Ziel
  der Seite), `ausprobieren` (nur wo der Simulator bedient wird), `idee` (das Neue: Definition, „Merke“), `mitmachen`
  (Anleitung zum Spielen ohne Computer), `uebung` (die Übungen, leicht → schwer), am Kapitelende `rueckblick`.
- Höchstens 350 Wörter Lesetext je Seite, höchstens 4 Textblöcke hintereinander.
- Geschichte „Schulfest der 6b“ (ohne Datum; #494 knüpft dort an): Die Klasse 6b baut einen Saftautomaten aus einem
  Karton. **Jona** (11) sitzt im Karton und ist der Automat, **Mia** (11) kauft, **Selin** (11) schreibt den Plan.
  Aussehen fest aus #490 (`src/images/klasse-6b.svg`, defs `#jona`, `#selin`, `#mia`): Jona kurze rotblonde Haare
  #c8642a, Haut #f3d2b3, grüner Kapuzenpulli #2e8b57; Selin lange dunkelbraune Haare mit Pferdeschwanz #3b2314, Haut
  #d9a27a, orange Jacke #e07b24; Mia schwarze Locken #222, runde Brille, Haut #8d5a3b, lila Jacke #7b4fb8. Kopf, runder
  Körper, Umriss #333, keine Arme oder Beine.
- Der Saftautomat (fest auf allen Seiten): Ein Saft kostet 2 €, der Automat nimmt nur 1-€-Münzen. Zustände „0 € drin“
  (Start), „1 € drin“, „2 € drin“; Eingaben „Münze“ und „Knopf“. Münze: 0 → 1 → 2, bei 2 bleibt er bei 2 und gibt
  „Münze kommt zurück“ aus. Knopf: bei 0 und 1 bleibt er (keine Ausgabe), bei 2 → 0 mit „Saft fällt heraus“.
- Seite 0 Wiederholung → Seite 1 (Jona spielt, Zustand; endet mit `ausblick`) → Seite 2 (Selins Plan als Tabelle,
  dann als Diagramm im Simulator, Merke, Spielstein-Spiel, fremde Diagramme lesen und ergänzen, `rueckblick` aufs
  Kapitel mit Ausblick auf 9-10). Die anderen Automaten (Lampe mit Druckknopf, Drehkreuz, Aufzug, Fußgängerampel)
  stellt Seite 1 in `alltag-merken` vor und Seite 2 in einem Text am Anfang von `uebung`.

## Terminology

- Anrede „du“ (de), „you“ (en). Deutsch in einfacher Sprache (kurze Sätze, ein Gedanke je Satz), Englisch Plain
  English.
- Fachwörter (beim ersten Auftreten erklärt, als `definition` im Glossar): **Automat** (automaton, Mehrzahl automata),
  **Zustand** (state): „was sich der Automat gerade merkt“; **Eingabe** (input); **Ausgabe** (output); **Übergang**
  (transition): „der Sprung von einem Zustand zum nächsten bei einer Eingabe“; **Startzustand** (start state);
  **Zustandsdiagramm** (state diagram; einmal „also called a state transition diagram“).
- Vermieden: Mealy, Moore, Endzustand, akzeptierender Zustand, Wort, Sprache (#504); Schleife im Sinn von Programmen
  (#495) – den Pfeil zurück zum selben Zustand nennen wir „Pfeil zurück zum selben Kreis“ (en: „arrow back to the same
  circle“), nicht „Schleife“. Den Übergang nennen wir im Fließtext auch „Sprung“ und erklären ihn so.
- Tabelle auf Seite 2 mit Spalten „Jetzt | Eingabe / Ausgabe | Danach“, wie die Beschriftung am Pfeil.
- Englisch: Automatennamen großgeschrieben („Juice machine“), englische Anführungszeichen “…”, „green man“ statt
  wörtlicher Übersetzung; Eingaben in den Aufgaben ohne Anführungszeichen aufgezählt („coin, button, coin“).
- Regel der App: Jeder Zustand hat für jede Eingabe genau einen Pfeil; ändert sich der Zustand nicht, führt er zurück
  zum selben Kreis, auch wenn etwas herauskommt (Merke auf Seite 2).
- Produktnamen nur als Beispiel; keine Marken.

## Exercise patterns

- **Entwerfen** (automat-entwerfen): Übungskomponente `AutomatEntwurf` (`mode: neu` oder `verbessern`) mit Aufgaben aus
  `src/data/entwuerfe.yaml` (`ampel`, `schranke`, `schloss`, `handy`; `use: [ids]`, `@verbatim`). Zustandskarten
  wählen (Checkbox), Startzustand (Radio), je Zustand × Eingabe ein Ziel (Auswahlliste); Diagramm und Testfolgen mit
  „abspielen“ (✓/✗ sofort). Geprüft über Eigenschaften (`problem` in `AutomatEntwurf.ts`): keine Eingabe-/Ausgabe-Karte,
  Startzustand der Aufgabe, vollständig, alle Testfolgen inkl. `hidden: true` (erst „Prüfen“; die Seite sagt das).
  `loesung` nur für „Lösung zeigen“ und den Tutor. Ohne Prüfen: Anzeige `AutomatWerkstatt` (eine Aufgabe, `aufgabe: <id>`).
  Die Ampel ist das Beispiel der Werkstatt; `entwurf-neu` zieht nur `schranke`, `schloss`, `handy`. „Prüfen“ ohne
  Zustand meldet `noStates`. Karten heißen kurz und ohne Wort über 9 Zeichen („jemand wartet“, „Grün zum Gehen“,
  „2 getippt“, „1 Fehler“); jede Karte hat `x`, `y`, `loop`. Sind alle gewählten Karten platziert (`x > 0`), zeichnet
  das Diagramm sie dort (Handy: entsperrt unten zwischen gesperrt und 1 Fehler), sonst im Kreis. Tutor-Tabelle: kurze
  Lösung je Zustand („↺“ = bleibt), nur der Fehler „Pfeil falsch“ als Antwort (sonst über 64 kB; Seite 2 hat
  61 kB).

- **Fehler finden** (automat-entwerfen): `AutomatAufgabe` mit `mode: fehler` (`use: [0, 2, 3, 4]`): ein Pfeil eines
  Automaten aus `automaten.yaml` ist umgesetzt, eine Testfolge von 2-4 Eingaben endet deshalb falsch; ein Knopf je
  Pfeil („Mitte – runter → oben“), der gewählte Pfeil dick. Gezogen wird nur, wenn kein anderer Pfeil auf dem Weg
  die Folge reparieren kann. Antwort: die Stelle des Pfeils in `transitions`. Meldungen: Pfeil nicht auf dem Weg;
  Pfeil auf dem Weg, aber richtig. Platzhalter `{expected}`, `{actual}`.
- **Pfeile zählen**: `generated` n Zustände (2-6), m Eingaben (2-4), `n != m`; Antwort n·m; Fehler n+m, n, m.
- **Verbessern**: `AutomatEntwurf` `mode: verbessern` startet mit der Lösung, in der ein Pfeil so geändert ist, dass
  eine sichtbare Testfolge scheitert. Vor der ersten Änderung meldet die Übung keine Antwort (Laufzeitprüfung):
  „Prüfen“ zeigt dann `noStates`, auf dieser Seite als Aufforderung, den falschen Pfeil zu ändern.

- **Reaktion vorhersagen** (automaten-im-alltag): `generated` mit `pick: 1` aus `src/data/saft-situationen.yaml`,
  Antwort `{ choice: [...] }` über die festen Reaktionen; `mistakes` für „gleicher Knopf, gleiche Reaktion“.
- **Folge durchspielen** (beide Bausteine): Übungskomponente `AutomatAufgabe` mit `mode: folge`; Startzustand und
  3-5 Eingaben werden gezogen (die letzte ändert den Zustand), das Kind wählt den Endzustand (Knopf je Zustand oder
  Klick auf den Kreis). `view: kasten` auf Seite 1 (nur Saftautomat, `use: [0]`), `view: diagramm` auf Seite 2
  (`use: [0, 1, 2, 3, 4]`). Typische Fehler mit eigener Meldung: letzte Eingabe vergessen, Pfeil rückwärts gelesen,
  beim Start stehen geblieben; sonst eine allgemeine Meldung. Nie die Lösung.
- **Pfeil ergänzen** (zustandsdiagramm): `AutomatAufgabe` mit `mode: pfeil`; ein Pfeil fehlt (gestrichelter Stummel
  mit „Eingabe ?“), der `text` des Übergangs sagt, was passiert; das Kind wählt das Ziel, der gestrichelte Pfeil zeigt
  dann dorthin. Fehler mit eigener Meldung: zurück zum selben Kreis, obwohl sich etwas ändert; zu einem anderen Kreis,
  obwohl der Zustand bleibt.
- **Simulator-Frage**: `single-choice` „Mit welchen Eingaben bekommst du einen Saft?“ direkt nach dem Simulator, damit
  das Ausprobieren geprüft wird.
- **Was merkt er sich?** (automaten-im-alltag): `matching` Alltagsautomat → was er sich merkt.
- **Teile des Diagramms** (zustandsdiagramm): `matching` Teil → Bedeutung.
- **Fehlvorstellung prüfen**: `true-false` mit Grund („Ein Automat reagiert auf dieselbe Eingabe immer gleich.“).
- Jede Seite: mindestens 4 Übungen, höchstens die Hälfte Auswahl ohne Komponente; jede falsche Option mit `info`.

## Figures

- **Der Automaten-Simulator ist das Bild der App** (Komponenten, weil Text im Bild übersetzt wird):
  - Zustände als Kreise mit Namen; der aktive Zustand grün gefüllt und dick umrandet (#23704a, dunkel #6cc995, wie V
    und die Speicher-Schublade im EVA-Bild); der zuletzt benutzte Pfeil dick und grün.
  - Startpfeil von links mit dem Wort „Start“.
  - Übergänge als Pfeile mit Spitze; gebogen, wenn es die Gegenrichtung gibt; Pfeil zurück zum selben Kreis oben oder
    unten am Kreis.
  - Beschriftung am Pfeil: Eingabe blau fett #2f5fb3 (dunkel: #8fb0ee), mit Ausgabe gefolgt von „ /“ und darunter die
    Ausgabe orange kursiv #a4500f (dunkel: #f0a060), wie E und A im EVA-Bild (#490); der Schrägstrich ist das zweite
    Zeichen neben der Farbe. Gleicher Start und gleiches Ziel: eine Beschriftung „Münze, Knopf“.
  - Seite der Beschriftung eines geraden Pfeils: weg von der Mitte aller Kreise; liegt der Pfeil nah an der Mitte, auf
    der Seite weiter weg von den Mitten der anderen Pfeile (`line` in `AutomatDiagramm.ts`).
  - Schmaler Bildschirm (unter 30rem, erst nach dem Laden): lange Ausgaben in Zeilen bis 11 Zeichen, Zustandsnamen in
    Zeilen bis 6 Zeichen und bis Schriftgröße 30. Gemessen bei 360 px: jede Schrift ≥ 12 px. Zustandsnamen ohne ein
    Wort über 9 Zeichen (deshalb „Grün zum Gehen“ statt „Fußgänger grün“).
  - Die Eingabe-Knöpfe des Simulators blau, „Jetzt: …“ grün, „Ausgabe: …“ orange.
  - Ansicht `kasten` (Seite 1): Karton mit Münzschlitz, Zettel „Jona merkt sich: …“ und Ausgabefach, kein Diagramm.
  - Unter dem Diagramm: ein Knopf je Eingabe, „Zurück zum Start“, die Ausgabezeile, der Verlauf; der neue Zustand wird
    über `aria-live` angesagt. Ohne JS: Tabelle aller Übergänge (`nojs`).
- `src/data/automaten.yaml`: Automaten mit Nummer `nr` (0 Saftautomat, 1 Lampe mit Druckknopf, 2 Drehkreuz am
  Schwimmbad, 3 Aufzug, 4 Fußgängerampel); Zustände und Eingaben heißen mit ihrer Stelle in der Liste ab 0 (`start`,
  `from`, `to`, `input`). Keine ids als Text: Jeder `string`-Prop ist für den Build ein Lerntext in jeder Sprache.
  Je Zustand `x`, `y` (Fläche etwa 600 × 300; der Aufzug steht senkrecht) und `loop` (Richtung des Pfeils zurück zum
  selben Kreis, Grad). Je Übergang `bend` und `text` (was passiert, ohne den Zielzustand zu nennen). `outputs`
  getrennt. Blöcke nennen Automaten mit `automat: <nr>` bzw. `use: [<nr>, …]`.
- `src/data/fehlerbilder.yaml`: Entwürfe mit Fehler für `AutomatBild` (nur Diagramm, Name darunter, `nojs:
  caption` mit allen Pfeilen): 0 Mias Ampel (jemand wartet – Zeit um → Autos grün), 1 Drehkreuz A (bei „frei“ fehlt
  „Chip“), 2 Drehkreuz B (zwei Pfeile „Chip“ aus „gesperrt“). Form wie `automaten.yaml` ohne `text` und `outputs`.
- Plätze der Ampel (in `entwuerfe.yaml` und `fehlerbilder.yaml` gleich): Autos grün 110,250 (Schleife 135°), jemand
  wartet 200,70, Autos gelb 430,70, Grün zum Gehen 520,250, Autos rot-gelb 380,400. Schranke: zu 170,160, offen
  430,160.
- `src/data/saft-situationen.yaml`: sechs Lagen (Zustand × Eingabe) des Saftautomaten mit Reaktion, typischer falscher
  Reaktion, Grund für Fehler und Lösung; für `was-passiert`.
- Bilder: eigene SVG ohne Text, `source: eigene Zeichnung`, `licence: CC-BY-4.0`. `schulfest.svg` (Seite 1): Jona im
  Karton, Mia mit Münze, Selin mit Notizblock; Figuren-defs aus `klasse-6b.svg` von #490 kopiert (Herkunft im
  Dateikopf).
- Wiederholung: `EvaBild` (Kopie aus #490, Farben E #2f5fb3, V #23704a, A #a4500f).

## Sources

- Lernlandkarte Informatik, Strang `sprachen-automaten`.
- GI-Bildungsstandards Informatik Sek I (Januar 2025), doi:10.18420/rec2025_052,
  https://www.mnu.de/images/fachbereiche/Informatik/Bildungsstandards_Sek_I_2025__pdf-A_.pdf, S. 18.
- NRW Kernlehrplan Informatik 5/6 (2021),
  https://lehrplannavigator.nrw.de/system/files/media/document/file/si_kl5u6_if_klp_2021_07_01.pdf, S. 14, 18.
- Englische Begriffe: Isaac Computer Science „Finite state machines“,
  https://isaaccomputerscience.org/concepts/dsa_toc_fsm; National Curriculum England, Computing KS3.
- Alle Beispiele sind erfunden; kein Material eines Erstellers.

- Kapitel 2 erzählt als Chat der 9b (Jona, Selin, Mia, alle 14, zwei Jahre nach der 6b): ein `text`-Block mit Zeilen
  „**Selin:** …“, je Zeile ein eigener Absatz (Leerzeile dazwischen, sonst laufen sie zusammen), ohne Bilder von Personen. Begriffe neu: vollständig, eindeutig (deterministisch), Testfolge.

## Adding a chapter or round

1. Neuer Ordner `src/entwerfen/` mit `chapter.yaml`, in `src/app.yaml` unter `chapters` eintragen; Seite
   `automat-entwerfen.yaml` mit `competencies: [automat-entwerfen]` und den Abschnitts-ids oben.
2. Neue Automaten (Ampelsteuerung) in `src/data/automaten.yaml`, gleiche Felder.
3. Simulator: `AutomatSimulator` bekommt die Ansicht `entwerfen` (Zustände anlegen, Pfeile setzen, Folge testen);
   prüfen mit `Automat.ts` (`run`, `isComplete`) gegen Testfolgen. Modell und Datenform nicht umbauen.
4. In 9-10 keine gezeichneten Kinder: ein Fall (eine Ampel an der Schule).
5. 1 bis 3 ihrer Übungen in `selfAssessment` aufnehmen, wie Skill `lernapps-explainer-self-assessment` sagt. Kapitel
   `alltag` hat zwei Schritte: `was-passiert`, `zettel-am-ende`, `zustand-oder-eingabe` und `folge-lesen`,
   `pfeil-ergaenzen`, `diagramm-teile`.
6. `npx --no -- lernapps check`, dann Commit.

## Rules learned from mistakes

- Sätze für „Pfeil ergänzen“ nannten den Zielzustand („er bleibt leer“) und verrieten die Antwort (Lernenden-Check):
  `text` beschreibt nur, was passiert; das Kind erschließt den Zustand.
- Blau war dreifach belegt (Eingabe, aktiver Zustand, Knöpfe): Zustand grün.
- Eine Tabelle direkt unter der Zählfrage verriet die Antwort: Material, das eine Frage beantwortet, steht danach.
- Fragen im Fließtext („Wie kommst du an einen Saft?“) ohne Übung: jede solche Frage bekommt eine Übung.
- Neue Automaten in Übungen ohne Einführung verwirrten: erst kurz vorstellen.
- Fachliche Prüfung: „Ampel → welche Farbe leuchtet“ lehrte „Zustand = was man sieht“ (die Ampel hat zwei Zustände
  mit gleichen Farben); „Geld kommt zurück“ klang nach voller Erstattung (jetzt „Münze kommt zurück“); „behalten“
  ließ „2 € drin“ als Ziel lesen. Im selben Zustand reagiert ein Automat immer gleich: das steht positiv im Merke.
- Bei zwei Zuständen ist jede falsche Antwort „der andere Zustand“: dann keine eigene Fehlermeldung, nur die
  allgemeine.
- Englisch: Saft-Zustände „€0 paid“ statt „€0 in“.
- Benachbarte Aufgabennummern lieferten mit mulberry32 denselben Automaten: Seed vorher mischen (`AutomatAufgabe.ts`).
