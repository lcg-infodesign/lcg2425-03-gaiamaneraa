# Visualizzazione dei Dati dei Fiumi

Questo progetto visualizza dati sui fiumi in un grafico a barre, dove ogni barra rappresenta un fiume e ogni continente è differenziato da un colore. Vengono visualizzati la lunghezza e l’area dei fiumi, oltre a un grafico delle temperature medie a destra delle barre. I nomi dei fiumi sono inclusi all'interno delle barre, e il nome dei continenti è visibile come etichetta sopra i gruppi di barre corrispondenti. I dati sono caricati da un file CSV e la visualizzazione è responsive, adattandosi alla larghezza della finestra.

---

## **Struttura del Codice e Descrizione delle Variabili**

### **Variabili Principali**

- **`rivers`**: Array per memorizzare i dati dei fiumi caricati dal file CSV.
- **`maxRiverLength`**: Lunghezza massima tra i fiumi, usata per scalare la lunghezza delle barre.
- **`maxRiverAreaLengthRatio`**: Rapporto massimo area/lunghezza, usato per scalare la larghezza delle barre.
- **`barSpacing`**: Spaziatura verticale tra le barre.
- **`temperatureDiagramSpace`**: Spazio riservato per il diagramma delle temperature.
- **`textColor`**: Colore del testo per i nomi dei continenti e le etichette.
- **`riverTextColor`**: Colore del testo interno alle barre che rappresentano i fiumi.

### **Mappa dei Colori per Continente**

Il dizionario `continentColors` associa un colore a ogni continente, migliorando la leggibilità e l'estetica della visualizzazione.

---

## **Funzioni Principali**

### **Caricamento e Impostazioni**

- **`preload()`**: Carica i dati dal file CSV in modo asincrono.
- **`setup()`**: Imposta le variabili e disegna il canvas. Calcola la lunghezza massima, il rapporto area/lunghezza massimo, e la larghezza dei nomi. Raggruppa i fiumi per continente e richiama le funzioni per disegnare le etichette dei continenti, le barre, e il grafico delle temperature.

### **Calcoli e Supporto**

- **`calculateCanvasHeight()`**: Calcola l'altezza necessaria del canvas in base al numero di fiumi e alla spaziatura delle barre.
- **`groupBy(table, column)`**: Raggruppa i dati in base alla colonna specificata (es. continente), restituendo un oggetto con chiavi per ciascun continente e array di fiumi come valori.

### **Disegno dei Grafici**

- **`drawContinentLabel(continent, y)`**: Disegna l'etichetta per un continente sopra il gruppo di fiumi corrispondente.
- **`drawRivers(rivers, startY, continent)`**: Disegna ciascuna barra rappresentante un fiume per un dato continente. Aggiunge il nome del fiume all’interno della barra.
- **`drawTemperatureDiagram()`**: Disegna un grafico lineare delle temperature medie, con i valori associati ai fiumi.
  
### **Responsività**

- **`windowResized()`**: Ridimensiona il canvas automaticamente per renderlo responsive. Questo garantisce una visualizzazione adattiva su schermi di diverse dimensioni.

---

## **Nuove Funzionalità**

1. **Testo Interno alle Barre**: I nomi dei fiumi ora appaiono all'interno delle barre stesse, aumentando la leggibilità e rendendo il grafico più intuitivo.
2. **Diagramma delle Temperature**: Aggiunto un diagramma lineare che mostra le temperature medie dei fiumi. Il diagramma è posizionato a destra del grafico principale.
3. **Responsive per Temperature**: Lo spazio per il diagramma delle temperature si ridimensiona automaticamente in base alla larghezza della finestra.

---

## **Struttura del CSV di Esempio**

| name       | continent      | length | area     | temperature |
|------------|----------------|--------|----------|-------------|
| Amazon     | South America  | 6400   | 7050000  | 28.2        |
| Nile       | Africa         | 6650   | 3254555  | 30.5        |
| Mississippi| North America  | 3730   | 2980000  | 16.7        |

Questo file fornisce i dati che verranno caricati e visualizzati tramite il codice.
