# Skizzen: Was die Kinder nach jedem Schritt sehen

## AutomatSimulator, Ansicht `diagramm` (Seite zustandsdiagramm) – Bild: simulator-diagramm.svg

1. Start: „0 € drin“ ist gefüllt und dick umrandet. Ausgabe „–“. Verlauf „Start (0 € drin)“.
2. Klick „Münze“: Der Pfeil 0 → 1 leuchtet kurz, „1 € drin“ ist jetzt aktiv. Ausgabe „–“. Verlauf „… → Münze → 1 € drin“.
   Bildschirmleser: „Jetzt: 1 € drin.“
3. Klick „Knopf“: Schleife an „1 € drin“ leuchtet, Zustand bleibt. Ausgabe „–“ (nichts passiert).
4. Klick „Münze“: „2 € drin“. Klick „Knopf“: Pfeil unten leuchtet, „0 € drin“ aktiv, Ausgabe „Saft fällt heraus“.
5. „Zurück zum Start“: wie 1.
- Schmal (360 px): das SVG skaliert mit (viewBox), Knöpfe umbrechen in Zeilen, mind. 44 px hoch.

## AutomatSimulator, Ansicht `kasten` (Seite automaten-im-alltag)

Statt des Diagramms ein Karton mit Schlitz und Knopf und Jonas Zettel: „Jona merkt sich: 0 € drin“. Gleiche Knöpfe,
gleiche Ausgabezeile. Kein Kreis, kein Pfeil: Das Diagramm kommt erst auf der nächsten Seite.

## AutomatAufgabe, Modus `folge`

- Oben: Diagramm (oder Kasten), darunter „Start bei 0 € drin. Eingaben: Münze, Knopf, Münze, Münze. In welchem Zustand
  ist der Automat jetzt?“ Darunter ein Knopf je Zustand (Radio-Gruppe, Tastatur: Pfeiltasten, Leertaste).
- Nach Wahl: gewählter Zustand im Diagramm markiert (keine Lösung). „Prüfen“ zeichnet der Explainer.
- Falsch: „Schau auf den 2. Schritt: Bei 1 € drin führt der Pfeil Knopf zurück zu 1 € drin, nicht weiter.“

## AutomatAufgabe, Modus `pfeil`

- Diagramm mit einem gestrichelten Pfeil ohne Ziel, Beschriftung „?“. Satz: „Ist die Tür offen und jemand drückt
  ‚Zu‘, dann …“ Darunter je Zustand ein Knopf: „Der Pfeil führt zu …“.
- Nach Wahl: der gestrichelte Pfeil zeigt zum gewählten Zustand.
