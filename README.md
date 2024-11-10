[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/rKbf-r4Q)


# Read me Assignment 3 | Visualizzazione a partire da un Dataset, Rivers of the world

Questo progetto visualizza dati sui fiumi in un grafico a barre, dove ogni barra rappresenta un fiume e ogni continente è differenziato da un colore. Dei fiumi viene rappresentata la lunghezza e l’area. Il nome dei fiumi è indicato a sinistra delle barre corrispondenti e il nome dei continenti. I dati sono caricati dal file CSV indicato, e la visualizzazione è responsive, adattandosi alla larghezza della finestra.

## Struttura del Codice e Descrizione delle Variabili

### Variabili Principali

- **`rivers`**: Array per memorizzare i dati dei fiumi caricati dal file CSV.
- **`maxRiverLength`**: Lunghezza massima tra i fiumi, usata per scalare la lunghezza delle barre.
- **`maxRiverAreaLengthRatio`**: Rapporto massimo area/lunghezza, usato per scalare la larghezza delle barre.
- **`barSpacing`**: Spaziatura verticale tra le barre.
- **`maxNameWidth`**: Larghezza massima dei nomi dei fiumi, per evitare sovrapposizioni.
- **`textColor`**: Colore del testo per i nomi dei fiumi e le etichette dei continenti.

### Mappa dei Colori per Continente

Il dizionario `continentColors` associa un colore a ogni continente, migliorando la leggibilità e l'estetica della visualizzazione.

### Funzioni Principali

- **`preload()`**: Carica i dati dal file CSV in modo asincrono.
  
- **`setup()`**: Imposta le variabili e disegna il canvas. Calcola la lunghezza massima, il rapporto area/lunghezza massimo, e la larghezza dei nomi. Raggruppa i fiumi per continente e richiama le funzioni per disegnare le etichette dei continenti e le barre.

- **`calculateCanvasHeight()`**: Calcola l'altezza necessaria del canvas in base al numero di fiumi e alla spaziatura delle barre.

- **`groupBy(table, column)`**: Raggruppa i dati in base alla colonna specificata (es. continente), restituendo un oggetto con chiavi per ciascun continente e array di fiumi come valori.

- **`drawContinentLabel(continent, y)`**: Disegna l'etichetta per un continente sopra il gruppo di fiumi corrispondente.

- **`drawRivers(rivers, startY, continent)`**: Disegna ciascuna barra rappresentante un fiume per un dato continente.

- **`windowResized()`**: Ridimensiona il canvas automaticamente per renderlo responsive.

## Responsività

Quando la finestra viene ridimensionata, il metodo `windowResized()` aggiorna la larghezza del canvas, mantenendo l’altezza calcolata. Questo garantisce una visualizzazione adattiva su schermi di diverse dimensioni. Per attuare il ridimensionamento occorre riaggiornare la pagina.


### Struttura del CSV di Esempio

| name       | continent      | length | area     |
|------------|----------------|--------|----------|
| Amazon     | South America  | 6400   | 7050000  |
| Nile       | Africa         | 6650   | 3254555  |
| Mississippi| North America  | 3730   | 2980000  |

Questo file fornisce i dati che verranno caricati e visualizzati tramite il codice.

