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
const aiNums = genBombs(16, 1, 100);
console.log(aiNums);

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

//Gestisce il click dell'utente per un particolare caso
//[far diventare azzurre le celle che si cliccano e riportare il numero della cella cliccata sul log]
function handleItemClick() {
    const numToLog = parseInt(this.querySelector("span").textContent);

    if (aiNums.includes(numToLog)){
        this.classList.add("red");
    }
    else {
        this.classList.add("light-blue");
    }
}

//Restituisce un array di numeri generati randomicamente, scegliendo la capienza dell'array ed il range min <-> max per la generazione randomica
function genBombs(totNumsInArray, minRndCap, maxRndCap){
    const bombsArray = [];
    while (bombsArray.length < totNumsInArray){
        let rndNumber = Math.floor(Math.random() * (maxRndCap - minRndCap + 1) ) + minRndCap;
        
        if (!bombsArray.includes(rndNumber)){
            bombsArray.push(rndNumber);
        }
    }
    return bombsArray;
}