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
  Ausgabe) erklären und Geräte und Vorgänge den drei Phasen zuordnen.“). Eine Frage `eva-was-fehlt`.
- Seite `alltag/automaten-im-alltag`, `competencies: [automaten-im-alltag]`: „Ich kann an einem Automaten aus dem
  Alltag, zum Beispiel einem Getränkeautomaten, erklären, wie er abhängig von Eingabe und Zustand reagiert.“
- Seite `alltag/zustandsdiagramm`, `competencies: [zustandsdiagramm]`: „Ich kann das Verhalten eines Automaten mit
  Zuständen und Übergängen in einem Zustandsdiagramm darstellen und ein solches Diagramm lesen.“

Kapitel `entwerfen` (Inkrement): `automat-entwerfen`: „Ich kann für eine konkrete Aufgabe, zum Beispiel eine
Ampelsteuerung, einen Automaten mit Zuständen und Übergängen entwerfen.“

Die Übungs-ids stehen in den Seiten; dieses Dokument nennt sie unter „Exercise patterns“.

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
- Seite 0 Wiederholung → Seite 1 (Jona spielt, Zustand) → Seite 2 (Selins Plan als Diagramm, fremde Diagramme lesen,
  Rückblick, Ausblick auf 9-10).

## Terminology

- Anrede „du“ (de), „you“ (en). Deutsch in einfacher Sprache (kurze Sätze, ein Gedanke je Satz), Englisch Plain
  English.
- Fachwörter (beim ersten Auftreten erklärt, als `definition` im Glossar): **Automat** (automaton, Mehrzahl automata),
  **Zustand** (state): „was sich der Automat gerade merkt“; **Eingabe** (input); **Ausgabe** (output); **Übergang**
  (transition): „der Sprung von einem Zustand zum nächsten bei einer Eingabe“; **Startzustand** (start state);
  **Zustandsdiagramm** (state diagram; einmal „also called a state transition diagram“).
- Vermieden: Mealy, Moore, Endzustand, akzeptierender Zustand, Wort, Sprache (#504); Schleife im Sinn von Programmen
  (#495) – den Pfeil zurück zum selben Zustand nennen wir „Pfeil zurück zum selben Kreis“ (en: „arrow back to the same
  circle“), nicht „Schleife“.
- Regel der App: Jeder Zustand hat für jede Eingabe genau einen Pfeil, auch wenn sich nichts ändert.
- Produktnamen nur als Beispiel; keine Marken.

## Exercise patterns

- **Reaktion vorhersagen** (automaten-im-alltag): `generated` mit `pick: 1` aus `src/data/saft-situationen.yaml`,
  Antwort `{ choice: [...] }` über die festen Reaktionen; `mistakes` für „gleicher Knopf, gleiche Reaktion“.
- **Folge durchspielen** (beide Bausteine): Übungskomponente `AutomatAufgabe` mit `mode: folge`; Startzustand und
  3-5 Eingaben werden gezogen, das Kind wählt den Endzustand. `view: kasten` auf Seite 1, `view: diagramm` auf Seite 2.
  `reason` nennt den ersten Schritt, an dem die Wahl abweicht.
- **Pfeil ergänzen** (zustandsdiagramm): `AutomatAufgabe` mit `mode: pfeil`; ein Pfeil fehlt (gestrichelt, „?“), ein
  Satz sagt, was passiert; das Kind wählt das Ziel.
- **Was merkt er sich?** (automaten-im-alltag): `matching` Alltagsautomat → was er sich merkt.
- **Teile des Diagramms** (zustandsdiagramm): `matching` Teil → Bedeutung.
- **Fehlvorstellung prüfen**: `true-false` mit Grund („Ein Automat reagiert auf dieselbe Eingabe immer gleich.“).
- Jede Seite: mindestens 4 Übungen, höchstens die Hälfte Auswahl ohne Komponente; jede falsche Option mit `info`.

## Figures

- **Der Automaten-Simulator ist das Bild der App** (Komponenten, weil Text im Bild übersetzt wird):
  - Zustände als Kreise mit Namen; aktiver Zustand gefüllt und dick umrandet (Farbe `--page-accent`).
  - Startpfeil von links mit dem Wort „Start“.
  - Übergänge als Pfeile mit Spitze; gebogen, wenn es die Gegenrichtung gibt; Pfeil zurück zum selben Kreis oben oder
    unten am Kreis.
  - Beschriftung am Pfeil „Eingabe / Ausgabe“: Eingabe blau #2f5fb3 (dunkel: #8fb0ee), Ausgabe orange #a4500f (dunkel:
    #f0a060), wie E und A im EVA-Bild (#490); der Schrägstrich ist das zweite Zeichen neben der Farbe. Ohne Ausgabe nur
    die Eingabe. Gleicher Start und gleiches Ziel: eine Beschriftung „Münze, Knopf“.
  - Unter dem Diagramm: ein Knopf je Eingabe, „Zurück zum Start“, die Ausgabezeile, der Verlauf; der neue Zustand wird
    über `aria-live` angesagt. Ohne JS: Tabelle aller Übergänge (`nojs`).
- Koordinaten der Zustände stehen in `src/data/automaten.yaml` (`x`, `y` in einer Fläche 0-600 × 0-300).
- Bilder: eigene SVG ohne Text, `source: eigene Zeichnung`, `licence: CC-BY-4.0`. `schulfest.svg` (Seite 1).
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

## Adding a chapter or round

1. Neuer Ordner `src/entwerfen/` mit `chapter.yaml`, in `src/app.yaml` unter `chapters` eintragen; Seite
   `automat-entwerfen.yaml` mit `competencies: [automat-entwerfen]` und den Abschnitts-ids oben.
2. Neue Automaten (Ampelsteuerung) in `src/data/automaten.yaml`, gleiche Felder.
3. Simulator: `AutomatSimulator` bekommt die Ansicht `entwerfen` (Zustände anlegen, Pfeile setzen, Folge testen);
   prüfen mit `Automat.ts` (`run`, `isComplete`) gegen Testfolgen. Modell und Datenform nicht umbauen.
4. In 9-10 keine gezeichneten Kinder: ein Fall (eine Ampel an der Schule).
5. `npx --no -- lernapps check`, dann Commit.

## Rules learned from mistakes

None yet.
