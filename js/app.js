// Du skapar ett enkelt UI där användaren klickar på sten, sax, eller påse
// samtidigt som "datorn" slumpar mellan sten, sax eller påse. 
// Vinnaren i nuvarande omgång visas och du bygger en poängräknare där totalvinnaren är den som först når till fem vinster. 

const gameScoreDiv = document.querySelector("#game-score");

window.onload = () => {
    showResults();
}


const roundMessageDiv = document.querySelector("#score-message");
const playerChoiceDiv = document.querySelector("#player-choice");
const computerChoiceDiv = document.querySelector("#computer-choice");

const restartGameDiv = document.querySelector("#restart-game");
restartGameDiv.onclick = () => restartGame();

const totalScore = {playerScore: 0, computerScore: 0}
const maxScore = 5;



// Datorn slumpar fram antingen en Sten, Sax eller Påse;
const getComputerChoice = () => {
const rpsChoice = ["Rock", "Paper", "Scissors"];
const randomNumber = Math.floor(Math.random() * rpsChoice.length);
return rpsChoice[randomNumber];
}


const getResult = (playerChoice, computerChoice) => {

    let score;

    if (playerChoice == getComputerChoice) {
        score = 0;
    } else if (playerChoice == 'Rock' && computerChoice == 'Scissors') {
        score = 1;
    } else if (playerChoice == 'Paper' && computerChoice == 'Rock') {
        score = 1;
    } else if (playerChoice == 'Scissors' && computerChoice == 'Paper') {
        score = 1;
    } else {
        score = 0;
    }

    return score;
}

const showResults = () => {
    let pscore = totalScore['playerScore'];
    let cscore = totalScore['computerScore'];
    gameScoreDiv.innerHTML = `${pscore} - ${cscore}`;
}



// Användaren klickar på en knapp, antingen Sten, Sax eller Påse
const onClickRPS = (playerChoice) => {
    const computerChoice = getComputerChoice();
    const playerscore = getResult(playerChoice, computerChoice);
    const computerscore = getResult(computerChoice, playerChoice);
    totalScore['playerScore'] += playerscore;
    totalScore['computerScore'] += computerscore;

    let playerbox = `<i class="far fa-hand-${playerChoice.toLowerCase()}"></i>`;
    let computerbox = `<i class="far fa-hand-${computerChoice.toLowerCase()}"></i>`;
    playerChoiceDiv.innerHTML = playerbox;
    computerChoiceDiv.innerHTML = computerbox;

    if (playerscore === 1) {
        roundMessageDiv.innerText = "You Won!";
    } else if (computerscore === 1) {
        roundMessageDiv.innerText = "You Lose!";
    } else if (playerscore === computerscore) {
        roundMessageDiv.innerText = "Its a Tie!";
    }

    if (totalScore['playerScore'] == maxScore) {
        let rpsButtons = document.querySelectorAll(".rpsButton");
            rpsButtons.forEach(rpsButton => {
            rpsButton.disabled = true;
        });
        restartGameDiv.innerHTML = `<button class="restart-button">Restart Game</button>`;
    } else if (totalScore['computerScore'] == maxScore) {
        let rpsButtons = document.querySelectorAll(".rpsButton");
            rpsButtons.forEach(rpsButton => {
            rpsButton.disabled = true;
        });
        restartGameDiv.innerHTML = `<button class="restart-button">Restart Game</button>`;
    }

    console.log(totalScore);
    console.log({"PlayerChoice": playerChoice});
    console.log({"ComputerChoice": computerChoice});
    showResults(playerscore, computerscore);
}

const playGame = () => {
    const rpsButtons = document.querySelectorAll(".rpsButton");
    rpsButtons.forEach(rpsButton => {
        rpsButton.onclick = () => onClickRPS(rpsButton.value);
    });
}

const restartGame = () => {
    window.location.reload();
}


playGame();