let rivers = []; // Array per memorizzare i dati dei fiumi caricati dal file CSV
let maxRiverLength = 0; // Variabile per conservare la lunghezza massima tra tutti i fiumi (per il ridimensionamento)
let maxRiverAreaLengthRatio = 0; // Variabile per il massimo rapporto area/lunghezza dei fiumi (per il ridimensionamento)
let barSpacing = 50; // Spaziatura verticale tra ogni barra che rappresenta un fiume
let maxNameWidth = 0; // Larghezza massima dei nomi dei fiumi (per evitare sovrapposizioni sul bordo sinistro)
let textColor = "#081f5c"; // Colore del testo da usare per i nomi dei fiumi e le etichette dei continenti

// Mappa dei colori per ciascun continente, utilizzata per colorare i rettangoli che rappresentano i fiumi.
const continentColors = {
  "africa": "#334eac",         // Colore per i fiumi in Africa
  "south america": "#7096d1",   // Colore per i fiumi in Sud America
  "north america": "#a1b0ff",   // Colore per i fiumi in Nord America
  "asia": "#4563ff",            // Colore per i fiumi in Asia
  "europe": "#567c8d",          // Colore per i fiumi in Europa
  "australia": "#7481ab",       // Colore per i fiumi in Australia
  "oceania": "#3345a4"          // Colore per i fiumi in Oceania
};

function preload() {
  // Carica i dati dal file CSV in modo asincrono
  rivers = loadTable("assets/data.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, calculateCanvasHeight()); // Crea un canvas con larghezza dinamica e altezza calcolata
  background("#eef0f6"); // Imposta uno sfondo chiaro per il canvas
  
  // Calcola i valori massimi per il ridimensionamento delle barre dei fiumi
  for (let r of rivers.rows) {
    let length = float(r.get("length")); // Lunghezza del fiume
    let area = float(r.get("area")); // Area del bacino del fiume
    maxRiverLength = max(maxRiverLength, length); // Trova la lunghezza massima tra i fiumi
    maxRiverAreaLengthRatio = max(maxRiverAreaLengthRatio, area / length); // Trova il rapporto area/lunghezza massimo

    // Calcola la larghezza massima dei nomi dei fiumi per il posizionamento
    let name = r.get("name");
    maxNameWidth = max(maxNameWidth, textWidth(name));
  }
  
  // Aggiungi padding per assicurare che i nomi non tocchino il bordo sinistro
  maxNameWidth += 20;
  
  // Raggruppa i fiumi per continente
  let groupedRivers = groupBy(rivers, "continent");
  
  // Disegna i fiumi raggruppati per continente
  let y = 50; // Coordinata y iniziale
  for (let continent in groupedRivers) {
    let cont = new String(continent); // Converti il nome del continente in stringa
    cont = cont[0].toUpperCase() + cont.substring(1); // Capitalizza la prima lettera del continente
    drawContinentLabel(cont, y); // Disegna l'etichetta del continente
    y = drawRivers(groupedRivers[continent], y + 30, continent); // Disegna i fiumi del continente
  }
}

// Calcola l'altezza del canvas in base al numero totale di fiumi
function calculateCanvasHeight() {
  let totalRivers = rivers.getRowCount(); // Conta i fiumi nel dataset
  return totalRivers * barSpacing + 100; // Restituisce l'altezza necessaria per contenere tutte le barre
}

// Funzione per raggruppare i dati in base a una colonna specifica (continente)
function groupBy(table, column) {
  let grouped = {}; // Oggetto per contenere i gruppi
  for (let r of table.rows) {
    let key = r.get(column).toLowerCase(); // Chiave del gruppo (continente in minuscolo)
    if (!grouped[key]) grouped[key] = []; // Crea un array se il gruppo non esiste
    grouped[key].push(r); // Aggiunge il fiume all'array del continente
  }
  return grouped; // Restituisce l'oggetto raggruppato
}

// Disegna l'etichetta per il continente con padding e stile grassetto
function drawContinentLabel(continent, y) {
  console.log(continent); // Stampa il nome del continente nella console
  textSize(16); // Imposta la dimensione del testo
  textAlign(LEFT, CENTER); // Allinea il testo a sinistra
  stroke(textColor); // Colore del bordo del testo
  fill(textColor); // Colore di riempimento del testo
  textStyle(BOLD); // Imposta il testo in grassetto
  text(continent, 10, y + 20); // Disegna il testo con un padding di 20 pixel dall'alto
}

// Disegna i fiumi per ciascun continente con un colore specifico
function drawRivers(rivers, startY, continent) {
  let y = startY; // Imposta y iniziale
  let riverColor = continentColors[continent] || "#000000"; // Colore del fiume specifico per il continente, o nero di default

  for (let r of rivers) {
    let name = r.get("name"); // Nome del fiume
    let length = float(r.get("length")); // Lunghezza del fiume
    let area = float(r.get("area")); // Area del fiume
    
    // Calcola la lunghezza e la larghezza della barra in base alle dimensioni del canvas
    let barLength = map(length, 0, maxRiverLength, 50, width - maxNameWidth - 100); // Lunghezza della barra ridimensionata
    let barWidth = map(area / length, 0, maxRiverAreaLengthRatio, 10, 100); // Larghezza della barra ridimensionata
    
    // Disegna il nome del fiume a sinistra della barra
    stroke(textColor); // Colore del bordo del testo
    fill(textColor); // Colore di riempimento del testo
    textStyle(NORMAL); // Imposta il testo normale
    textSize(12); // Imposta la dimensione del testo
    textAlign(RIGHT, CENTER); // Allinea il testo a destra
    text(name, maxNameWidth - 10, y + barWidth / 2); // Disegna il nome al centro della barra
    
    // Disegna la barra che rappresenta il fiume, con il colore del continente
    stroke(riverColor); // Colore del bordo della barra
    fill(riverColor); // Colore di riempimento della barra
    rect(maxNameWidth, y, barLength, barWidth); // Disegna la barra
    y += barWidth + 10; // Incrementa y per il prossimo fiume
  }
  return y; // Restituisce la nuova coordinata y
}

// Ridimensiona la larghezza del canvas alla dimensione della finestra, mantenendo l'altezza calcolata
function windowResized() {
  resizeCanvas(windowWidth, calculateCanvasHeight()); // Aggiorna le dimensioni del canvas in base alla larghezza della finestra
}
