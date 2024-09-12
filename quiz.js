let runden = 0;
let richtigeAntwort;
let gesperrt = true;
let punkte = 0;

// async function fetchJson() {

//     const response = await fetch("fragen.json")
//     let data = await response.json();
//     let zufaelligerIndex = Math.round(Math.random() * 20 + 0.5);             Hier gibts wiederholungen--->blöd bei so wenig Fragen
//     let zufaelligeFrage = data[zufaelligerIndex].frage
//     let answer1 = data[zufaelligerIndex].antwort1
//     let answer2 = data[zufaelligerIndex].antwort2
//     let answer3 = data[zufaelligerIndex].antwort3
//     let rightAnswer = data[zufaelligerIndex].richtigeAntwort
//     let dataObject = [zufaelligeFrage, answer1, answer2, answer3, rightAnswer]
//     return dataObject;
// }

async function fetchJson() {


    //let zufallsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];
    const zufallsArray = Array.from({ length: 40 }, (v, i) => i + 1);
    for (let i = zufallsArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [zufallsArray[i], zufallsArray[j]] = [zufallsArray[j], zufallsArray[i]];
    }/////////////////-----------------Fisher-Yates-Algorithmus shuffelt das array durch-----------------------------/////////////////////
    let zufaelligerIndex = zufallsArray[0];
    const response = await fetch("fragen.json")
    let data = await response.json();
    let zufaelligeFrage = data[zufaelligerIndex].frage
    let answer1 = data[zufaelligerIndex].antwort1
    let answer2 = data[zufaelligerIndex].antwort2
    let answer3 = data[zufaelligerIndex].antwort3
    let rightAnswer = data[zufaelligerIndex].richtigeAntwort
    let dataObject = [zufaelligeFrage, answer1, answer2, answer3, rightAnswer]
    return dataObject;
}

function tippeButton(gewaehlterButton) {
    gewaehlterButton.style.boxShadow = "10px 10px 20px grey inset"; 
    if (gesperrt == true) {
        return;
    }
    gesperrt = true;
    let richtigerButton = document.getElementById(richtigeAntwort);    
    if (gewaehlterButton.id == richtigeAntwort) {
        gewaehlterButton.style.background = "#00FF00";
        punkte++;
        
    }
    else{
        gewaehlterButton.style.background = "#FF0000";
        punkte--;
        richtigerButton.style.background = "#00FF00";
    }
}

async function starteNeueRunde() {//muss async, weil fetch mit await arbeitet
    buttonReset();

    if (runden < 15) {
        gesperrt = false;
        runden++;

        let jsonArray = await fetchJson();
        document.getElementById("Frage").innerHTML = jsonArray[0];      
        document.getElementById("Antworten").innerHTML = jsonArray.slice(1, 4).join(' ');  
        richtigeAntwort = jsonArray[4];     
        if (richtigeAntwort == gewaehlterButton.id) {
            punkte++;
        }
        //setTimeout(starteNeueRunde, 10000);
    }
    else {
        alert("Das Spiel ist zu Ende. Du hast " + punkte + " Punkte geholt");
    }
}

function buttonReset() {
    document.getElementById("1").style.boxShadow = "15px 15px 15px grey";
    document.getElementById("1").style.background = "white";
    document.getElementById("2").style.boxShadow = "15px 15px 15px grey";
    document.getElementById("2").style.background = "white";
    document.getElementById("3").style.boxShadow = "15px 15px 15px grey";
    document.getElementById("3").style.background = "white";
}

function reset() {
    buttonReset();
    runden = 0;
    punkte = 0;
    document.getElementById("Frage").innerHTML = "Willkommen zum Quiz";
    document.getElementById("Antworten").innerHTML = "Klicke hier, um dein Quiz zu starten.";
}

function next() {
    if (runden == 0) {
        return;//raus aus Funktion
    }
    buttonReset();
    starteNeueRunde();
}