let rivers = []; // Array per memorizzare i dati dei fiumi caricati dal file CSV
let maxRiverLength = 0; // Lunghezza massima di un fiume nel dataset (per il ridimensionamento delle barre)
let maxRiverAreaLengthRatio = 0; // Rapporto massimo area/lunghezza (per il ridimensionamento delle larghezze delle barre)
let barSpacing = 50; // Spaziatura verticale tra le barre che rappresentano i fiumi
let temperatureDiagramSpace = 0; // Spazio riservato per i diagrammi delle temperature sul lato sinistro
let textColor = "#081f5c"; // Colore del testo per titoli e continenti
let riverTextColor = "#eef0f6"; // Colore del testo per i nomi dei fiumi
let temperatureRange; // Variabile che conterrà l'intervallo di temperature minimo e massimo

// Mappa dei colori per ciascun continente, utilizzata per colorare le barre dei fiumi.
const continentColors = {
  "africa": "#334eac",
  "south america": "#7096d1",
  "north america": "#a1b0ff",
  "asia": "#4563ff",
  "europe": "#567c8d",
  "australia": "#7481ab",
  "oceania": "#3345a4"
};

function preload() {
  // Carica i dati dal file CSV (asincrono) e li memorizza nell'array `rivers`
  rivers = loadTable("assets/data.csv", "csv", "header");

  console.log(rivers); // Stampa il contenuto del dataset nella console per il debug
}

function setup() {
  createCanvas(windowWidth, calculateCanvasHeight()); // Crea un canvas di larghezza dinamica e altezza basata sul numero di fiumi
  background("#eef0f6"); // Imposta lo sfondo con un colore chiaro

  // Calcolo di valori massimi nel dataset per il ridimensionamento
  for (let r of rivers.rows) {
    let length = float(r.get("length")); // Estrae la lunghezza del fiume
    let area = float(r.get("area")); // Estrae l'area del bacino del fiume
    maxRiverLength = max(maxRiverLength, length); // Aggiorna la lunghezza massima
    maxRiverAreaLengthRatio = max(maxRiverAreaLengthRatio, area / length); // Aggiorna il rapporto massimo area/lunghezza
  }

  temperatureDiagramSpace = windowWidth / 5; // Definisce lo spazio a sinistra per il diagramma delle temperature

  temperatureRange = getTemperatureRange(rivers); // Calcola l'intervallo di temperature (min e max) dai dati

  // Raggruppa i fiumi per continente
  let groupedRivers = groupBy(rivers, "continent");

  // Disegna il titolo e l'introduzione nella parte superiore del canvas
  drawTitleAndIntroduction();

  // Disegna i fiumi raggruppati per continente
  let y = 100; // Posizione verticale iniziale per il primo gruppo di continenti
  for (let continent in groupedRivers) {
    let cont = new String(continent); // Converte il nome del continente in stringa
    cont = cont[0].toUpperCase() + cont.substring(1); // Capitalizza la prima lettera
    drawContinentLabel(cont, y); // Disegna l'etichetta del continente
    oldY = y + 40; // Altezza di inizio del piano cartesiano
    y = drawRivers(groupedRivers[continent], y + 40, continent); // Disegna le barre dei fiumi del continente
    drawCartesianPlane(oldY, y, temperatureDiagramSpace - 20); // Disegna il piano cartesiano per le temperature
    y += 50; // Aggiunge spazio tra i gruppi di continenti
  }
}

function getTemperatureRange(table) {
  // Calcola il range minimo e massimo delle temperature nel dataset
  let minTemp = Infinity;
  let maxTemp = -Infinity;

  for (let i = 0; i < table.getRowCount(); i++) {
    let minT = table.getNum(i, "min_temp"); // Temperatura minima per il fiume
    let maxT = table.getNum(i, "max_temp"); // Temperatura massima per il fiume

    if (minT < minTemp) minTemp = minT; // Aggiorna la temperatura minima
    if (maxT > maxTemp) maxTemp = maxT; // Aggiorna la temperatura massima
  }

  return [minTemp, maxTemp]; // Restituisce un array con temperatura minima e massima
}

function drawCartesianPlane(startY, endY, endX) {
  // Disegna il piano cartesiano per il diagramma delle temperature
  stroke(0);
  line(30, startY, 30, endY); // Disegna l'asse Y
  line(30, endY, endX, endY); // Disegna l'asse X

  let [minTemp, maxTemp] = temperatureRange; // Estrae i valori di temperatura minima e massima
  let tempStep = 10; // Passo delle temperature da mostrare
  let tickCount = (maxTemp - minTemp) / tempStep; // Numero di tacche sull'asse X
  let xStep = (endX - 30) / tickCount; // Distanza tra le tacche

  textAlign(CENTER, CENTER); // Allinea il testo al centro delle tacche
  for (let i = 0; i <= tickCount; i++) {
    let x = 30 + i * xStep; // Posizione X della tacca
    let temp = minTemp + i * tempStep; // Valore di temperatura associato

    stroke(0);
    line(x, endY + 2.5, x, endY - 2.5); // Disegna la tacca
    fill(0);
    text(temp.toFixed(1), x, endY + 10); // Mostra il valore della temperatura
  }

  // Disegna l'etichetta dell'asse X
  fill(0);
  textAlign(CENTER, CENTER);
  stroke(NaN);
  text("Temperature (°C)", endX / 2, endY + 30); // Etichetta
}

// Funzione per disegnare titolo e introduzinone
function drawTitleAndIntroduction() {
  textSize(40); // Imposta la dimensione del testo
  textAlign(LEFT, CENTER); // Allinea il testo a sinistra
  stroke(NaN); // Colore del bordo del testo
  fill(textColor); // Colore di riempimento del testo
  textStyle(BOLD); // Imposta il testo in grassetto
  text("Fiumi del mondo", 10, 30)

  textSize(12); // Imposta la dimensione del testo
  textAlign(LEFT, CENTER);
  textStyle(NORMAL);
  text("Vediamo come viene bla bla bla", 10, 70)
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
  stroke(NaN); // Colore del bordo del testo
  fill(textColor); // Colore di riempimento del testo
  textStyle(BOLD); // Imposta il testo in grassetto
  text(continent, 10, y + 20); // Disegna il testo con un padding di 20 pixel dall'alto
}

// Disegna i fiumi per ciascun continente con un colore specifico
function drawRivers(rivers, startY, continent) {
  let y = startY; // Imposta y iniziale
  let riverColor = continentColors[continent] || "#000000"; // Colore del fiume specifico per il continente, o nero di default
  let [minTemp, maxTemp] = temperatureRange;

  alreadyDrawn = new Set();
  for (let r of rivers) {
    if (!alreadyDrawn.has(r.get("name"))) {
      let name = r.get("name"); // Nome del fiume
      let length = float(r.get("length")); // Lunghezza del fiume
      let area = float(r.get("area")); // Area del fiume

      // Calcola la lunghezza e la larghezza della barra in base alle dimensioni del canvas
      let barLength = map(length, 0, maxRiverLength, 50, width - temperatureDiagramSpace - 100); // Lunghezza della barra ridimensionata
      let barWidth = map(area / length, 0, maxRiverAreaLengthRatio, 20, 100); // Larghezza della barra ridimensionata

      // Disegna la barra che rappresenta il fiume, con il colore del continente
      stroke(riverColor); // Colore del bordo della barra
      fill(riverColor); // Colore di riempimento della barra
      rect(temperatureDiagramSpace, y, barLength, barWidth); // Disegna la barra

      // Disegna il nome del fiume a sinistra della barra
      stroke(NaN); // Colore del bordo del testo
      fill(riverTextColor); // Colore di riempimento del testo
      textStyle(NORMAL); // Imposta il testo normale
      textSize(12); // Imposta la dimensione del testo
      textAlign(LEFT, CENTER); // Allinea il testo a destra
      text(name, temperatureDiagramSpace + 20, y + barWidth / 2); // Disegna il nome al centro della barra

      let minT = r.getNum("min_temp");
      let maxT = r.getNum("max_temp");
      let xMin = map(minT, minTemp, maxTemp, 30, temperatureDiagramSpace - 20);
      let xMax = map(maxT, minTemp, maxTemp, 30, temperatureDiagramSpace - 20);

      drawGradientLine(xMin, y + barWidth / 2, xMax, y + barWidth / 2, tempToColor(minT), tempToColor(maxT));

      // Draw dots
      fill(tempToColor(minT));
      noStroke();
      ellipse(xMin, y + barWidth / 2, 20, 20);

      fill(tempToColor(maxT));
      ellipse(xMax, y + barWidth / 2, 20, 20);

      y += barWidth + 10; // Incrementa y per il prossimo fiume}

      alreadyDrawn.add(name);
    }
  }
  return y; // Restituisce la nuova coordinata y
}

function tempToColor(temp) {
  let [minTemp, maxTemp] = temperatureRange;
  let t = map(temp, minTemp, maxTemp, 0, 1);
  return lerpColor(color(0, 0, 255), color(255, 0, 0), t); // Blue to red
}

function drawGradientLine(x1, y1, x2, y2, color1, color2) {
  let gradientSteps = 100; // Number of steps in gradient
  for (let i = 0; i < gradientSteps; i++) {
    let t = i / gradientSteps;
    let x = lerp(x1, x2, t);
    let nextX = lerp(x1, x2, t + 1 / gradientSteps);
    stroke(lerpColor(color1, color2, t));
    strokeWeight(4);
    line(x, y1, nextX, y2);
    strokeWeight(1);
  }
}

// Ridimensiona la larghezza del canvas alla dimensione della finestra, mantenendo l'altezza calcolata
function windowResized() {
  resizeCanvas(windowWidth, calculateCanvasHeight()); // Aggiorna le dimensioni del canvas in base alla larghezza della finestra
}