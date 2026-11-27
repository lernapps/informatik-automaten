# Skizze: AutomatEntwurf (Übung) und Simulator-Ansicht „entwerfen“

Alles mit Knöpfen, Checkboxen und Auswahllisten; kein Ziehen. Tab-Reihenfolge von oben nach unten.

```
Aufgabe: Bedarfsampel vor der Schule. Am Anfang haben die Autos Grün. Eingaben: Knopf, Zeit um.

1 Zustände wählen (Was muss sich die Ampel merken?)
  [x] Autos grün        [x] Anforderung        [x] Autos gelb
  [x] Fußgänger grün    [x] Autos rot-gelb     [ ] Knopf gedrückt     [ ] Licht wechselt
  Startzustand: (•) Autos grün  ( ) Anforderung  ( ) …        (nur gewählte Karten)

2 Übergänge festlegen (für jeden Zustand jede Eingabe)
  Autos grün      – Knopf   → [Anforderung   ▾]
  Autos grün      – Zeit um → [Autos grün    ▾]
  Anforderung     – Knopf   → [– bitte wählen ▾]     ← leer: Zeile hervorgehoben
  …

3 Diagramm (zeichnet sich mit; Kreise auf einem Kreis, Startpfeil, Pfeile mit Eingabe)

4 Testfolgen
  Knopf, Zeit um, Zeit um → soll: Fußgänger grün      [ ▶ abspielen ]   endet bei: Autos gelb ✗
  Zeit um, Zeit um        → soll: Autos grün          [ ▶ abspielen ]   endet bei: Autos grün ✓
```

- Vor „Prüfen“ zeigt die Übung bei den Testfolgen nur, wo ein Lauf endet, wenn man „abspielen“ drückt (das ist
  Testen, keine Lösung). ✓/✗ steht neben dem Ende, weil das erwartete Ende Teil der Aufgabe ist.
  (Prüfen dieser Regel mit `explainer-figure-hides-answer`: Die Aufgabe nennt das erwartete Ende; der Entwurf ist die
  Leistung. Unklar → ✓/✗ erst nach „Prüfen“; guess: ✓/✗ sofort, wie ein echter Test.)
- Nach „Prüfen“ (Explainer): Rückmeldung mit der ersten verletzten Eigenschaft.
- Schmal (360 px): Karten in einer Spalte, Zeilen untereinander („Autos grün – Knopf →“ über der Liste), Diagramm
  unter den Zeilen.
- Ohne JS (`describe`): die Aufgabe, die Karten, die Eingaben, die Testfolgen als Liste.

## Modus „verbessern“ (Seite 2)

Wie oben, aber Schritt 1 und 2 sind schon gefüllt (ein gültiger Entwurf mit einem veränderten Pfeil); eine Testfolge
endet falsch. Die Kinder spielen die Folgen ab, finden die Zeile und ändern sie.

## Simulator-Ansicht „bild“ (Seite 2)

Nur das Diagramm eines Fehlerbilds, ohne Knöpfe; darunter eine Zeile, die sagt, was zu sehen ist (nojs: die Pfeile
als Liste).

## AutomatAufgabe Modus „fehler“

Diagramm wie bei „folge“; Text: „Die Testfolge Knopf, Zeit um, Zeit um soll bei ‚Fußgänger grün‘ enden, endet aber bei
‚Autos gelb‘. Welcher Pfeil ist falsch?“ Darunter ein Knopf je Pfeil („Anforderung – Zeit um → Autos grün“).
