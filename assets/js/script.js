let moi = 0
let ordi = 0
let total = 0

function computerChoice() {
    const choices = ['Pierre', 'Feuille', 'Ciseaux'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function determineWinner(player, computer) {
    while (total < 10) {
        total += 1
        if (player === computer) {
            return 'Égalité!';
        } else if (
            (player === 'Pierre' && computer === 'Ciseaux') ||
            (player === 'Feuille' && computer === 'Pierre') ||
            (player === 'Ciseaux' && computer === 'Feuille')
        ) {
            moi += 1;
            playWinSound();
            return 'Vous avez gagné!';

        } else {
            ordi += 1;
            playWinSound2();
            return 'L\'ordinateur a gagné!';
        }
    }
}

function updateScore() {
    document.getElementById('moi').innerText = moi;
    document.getElementById('ordi').innerText = ordi;
    document.getElementById('nombrePartie').innerText = total
}

function playerChoice(choice) {
    const computer = computerChoice();
    const result = determineWinner(choice, computer);
    document.getElementById('userChoice').innerText = choice;
    document.getElementById('computerChoice').innerText = computer;
    document.getElementById('resultText').innerText = result;
    updateScore();
}

function endGame() {
    document.getElementById('restartButton').style.display = 'block';
    document.querySelector('.choices').style.display = 'block';
    if (total == 10) {
        finDuJeu();
    }

}

function restartGame() {
    moi = 0;
    ordi = 0;
    total = 1;

    updateScore();

    document.getElementById('restartButton').style.display = 'block';
    document.querySelector('.choices').style.display = 'block';
    document.getElementById('resultText').innerText = '';
}

function playWinSound() {
    const winSound = document.getElementById('winSound');
    winSound.currentTime = 0; // Réinitialise le son à 0 secondes
    winSound.play(); // Joue le son de victoire
}

function playWinSound2() {
    const nowinSound = document.getElementById('nowinSound');
    nowinSound.currentTime = 0; // Réinitialise le son à 0 secondes
    nowinSound.play(); // Joue le son de la défaite
}

function finDuJeu() {
    const defeat = document.querySelector('defeat');
    const Victoire = document.querySelector('Victoire');

    const le_jeu = document.querySelector('.le_jeu');
    const finJeu = document.querySelector('.finJeu');

    if (total == 10) {
        le_jeu.style.display = 'none'
        finJeu.style.display = 'block'
        if (moi > ordi) {
            defeat.style.display = 'none';
            defeat.play();
        } else if (moi < ordi) {
            Victoire.style.display = 'none';
            Victoire.play();
        }
    }

}








