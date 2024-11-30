// Constants
const diceImagePath = "images/";
const diceImageNames = {
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six"
};
const maxRolls = 3;

// Game State
let playerTotalScore = 0;
let computerTotalScore = 0;
let rollCount = 0;

// Helper Functions
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function calculateScore(dice1, dice2) {
    if (dice1 === 1 || dice2 === 1) {
        return 0;
    } else if (dice1 === dice2) {
        return (dice1 + dice2) * 2;
    } else {
        return dice1 + dice2;
    }
}

function updateDiceImages(diceElement, diceValues) {
    diceElement.innerHTML = diceValues
        .map(d => `<img src="${diceImagePath}dice-six-faces-${diceImageNames[d]}.png" alt="Dice ${diceImageNames[d]}" />`)
        .join("");
}

function updateUI(playerScore, computerScore, playerDice, computerDice) {
    updateDiceImages(document.getElementById("player-dice"), playerDice);
    updateDiceImages(document.getElementById("computer-dice"), computerDice);

    document.getElementById("player-round-score").innerText = playerScore;
    document.getElementById("computer-round-score").innerText = computerScore;

    document.getElementById("player-total-score").innerText = playerTotalScore;
    document.getElementById("computer-total-score").innerText = computerTotalScore;
}

function checkWinner() {
    if (rollCount === maxRolls) {
        const winnerMessage = document.getElementById("winner-message");
        if (playerTotalScore > computerTotalScore) {
            winnerMessage.innerText = "Player Wins!";
        } else if (computerTotalScore > playerTotalScore) {
            winnerMessage.innerText = "Computer Wins!";
        } else {
            winnerMessage.innerText = "It's a Tie!";
        }
    }
}

// Event Handlers
document.getElementById("roll-dice").addEventListener("click", () => {
    if (rollCount < maxRolls) {
        const playerDice = [rollDice(), rollDice()];
        const computerDice = [rollDice(), rollDice()];

        const playerScore = calculateScore(...playerDice);
        const computerScore = calculateScore(...computerDice);

        playerTotalScore += playerScore;
        computerTotalScore += computerScore;

        rollCount++;
        updateUI(playerScore, computerScore, playerDice, computerDice);
        checkWinner();
    }
});

document.getElementById("reset-game").addEventListener("click", () => {
    playerTotalScore = 0;
    computerTotalScore = 0;
    rollCount = 0;

    updateUI(0, 0, [1, 1], [1, 1]);
    document.getElementById("winner-message").innerText = "";
});
