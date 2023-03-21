/* 
   -    L'utente clicca su un bottone per generare una griglia quadrata
   -    Ogni cella ha un numero progressivo da 1 a 100 (inclusi)
   -    La griglia deve essere 10 x 10
   -    Al click su ogni casella:
        -   La casella diventa azzura
        -   In console deve essere riportato il nr appartenente alla casella cliccata
*/

const cellTotNum = 100;
const numbers = genNumArray(cellTotNum, 1);
const bombs = genBombs(16, 1, 100);
const maxTries = cellTotNum - bombs.length;
const nonBombClicks = [];
let score = 0;
console.log(bombs);
console.log(maxTries);

const cellGrid = document.querySelector(".grid-row");
for (let i = 0; i < numbers.length; i++) {
    const currentNumber = numbers[i];
    const addContent = genCell(currentNumber);
    addContent.addEventListener("click", handleItemClick)
    cellGrid.append(addContent);
}

const playBtn = document.querySelector(".play-btn");
playBtn.addEventListener("click", function () {
    this.classList.remove("play-btn");
    this.classList.add("grey-out");
    const content = document.querySelector(".grid-row");
    content.classList.remove("display-none");
    content.classList.add("flex")
});

//FUNCTIONS//

//Genera un array di numeri interi da 1 a 100 disposti sequenzialmente
function genNumArray(totalNum, firstNum) {
    const numArray = [];
    for (let i = firstNum; i <= totalNum; i++) {
        numArray.push(i);
        // console.log(i);
    }
    return numArray;
}

//Genera una nuova cella con uno span per l'inserimento del testo
function genCell(text) {
    const newCell = document.createElement("div");
    newCell.classList.add("cell");
    newCell.innerHTML = `<span><strong>${text}</strong></span>`;
    return newCell;
}

//Gestisce il click dell'utente sulle celle
function handleItemClick() {
    const numToLog = parseInt(this.querySelector("span").textContent);

    if (bombs.includes(numToLog)) {
        this.classList.add("red");
        const content = document.querySelector(".grid-row");
        content.classList.add("no-click");
        console.log("BOOOOM! Hai calpestato una bomba.");
        alert("BOOOOM! Hai calpestato una bomba. Resetta la partita e riprova!")
    }
    else if (!bombs.includes(numToLog)) {
        this.classList.add("light-blue");
        score++;
        console.log("Punteggio: " + score);
        nonBombClicks.push(numToLog)
        console.log(nonBombClicks);

        if (nonBombClicks.length === maxTries) {
            const content = document.querySelector(".grid-row");
            content.classList.add("no-click");
            console.log("Complimenti, hai fatto il botto: VITTORIA!");
            alert("Complimenti, hai fatto il botto: VITTORIA! Perchè non fai un'altra partita?")
        }
    }
}

//Restituisce un array di numeri generati randomicamente, scegliendo la capienza dell'array ed il range min <-> max per la generazione randomica
function genBombs(totNumsInArray, minRndCap, maxRndCap) {
    const bombsArray = [];
    while (bombsArray.length < totNumsInArray) {
        let rndNumber = Math.floor(Math.random() * (maxRndCap - minRndCap + 1)) + minRndCap;

        if (!bombsArray.includes(rndNumber)) {
            bombsArray.push(rndNumber);
        }
    }
    return bombsArray;
}