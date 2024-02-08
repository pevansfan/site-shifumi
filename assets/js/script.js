// CAROUSEL

let slideIndex = 0;
showSlide(slideIndex);

function prevSlide() {
    showSlide(slideIndex -= 1);
}

function nextSlide() {
    showSlide(slideIndex += 1);
}

function showSlide(n) {
    const slides = document.getElementsByClassName('slides')[0].getElementsByTagName('img');
    if (n >= slides.length) {
        slideIndex = 0;
    }
    if (n < 0) {
        slideIndex = slides.length - 1;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slides[slideIndex].style.display = 'block';



    // Garder l'avatar du joueur 
    let avatar = document.querySelector('#avatar');
    if (slideIndex == 0) {
        avatar.src = 'assets/img/mario.jpg'
    }
    if (slideIndex == 1) {
        avatar.src = 'assets/img/luigi.jpg'
    }
    if (slideIndex == 2) {
        avatar.src = 'assets/img/peach.jpg'
    }
    if (slideIndex == 3) {
        avatar.src = 'assets/img/yoshi.jpg'
    }



    // choix aléatoire de l'avatar IA
    let avatarIa = document.querySelector('#avatar-IA');
    let nombreAleatoire = Math.floor(Math.random() * 4);

    if (nombreAleatoire == 0) {
        avatarIa.src = 'assets/img/mario.jpg'
    }
    if (nombreAleatoire == 1) {
        avatarIa.src = 'assets/img/luigi.jpg'
    }
    if (nombreAleatoire == 2) {
        avatarIa.src = 'assets/img/peach.jpg'
    }
    if (nombreAleatoire == 3) {
        avatarIa.src = 'assets/img/yoshi.jpg'
    }

}












// REGLES DU JEU avec une fênetre modale

function regles() {
    const modalContainer = document.querySelector(".modal-container");
    const modalTriggers = document.querySelectorAll(".modal-trigger");

    modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

    function toggleModal() {
        modalContainer.classList.toggle("active")
    }

}
regles()











// PASSER D'UNE PAGE A L'AUTRE

// pour aller de la premiere a la deuxieme page
function showSecondPage() {
    const accueil = document.getElementById('accueil');
    const shifumi = document.getElementById('shifumi');

    accueil.style.display = 'none'; // Cache la première page
    shifumi.style.display = 'block'; // Affiche la seconde page


    // PSEUDO
    const input = document.getElementById('name');
    const pseudo = input.value; // Récupère la valeur de l'input

    const displayDiv = document.getElementById('pseudoDisplay');
    displayDiv.textContent = pseudo; // Affiche le pseudo dans une autre div

    // PSEUDO IA

    const computerNames = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Omega', 'Sigma', 'Theta'];
    const randomIndex = Math.floor(Math.random() * computerNames.length);

    const randomPseudo = document.getElementById('pseudoIA');
    const pseudoIA = computerNames[randomIndex];

    randomPseudo.textContent = pseudoIA
}













// LE JEU

let moi = 0
let ordi = 0
let total = 0

function computerChoice() {
    const carte1 = document.getElementById('carte1')
    const carte2 = document.getElementById('carte2')
    const carte3 = document.getElementById('carte3')
    const choices = ['Pierre', 'Feuille', 'Ciseaux'];
    const randomIndex = Math.floor(Math.random() * 3);
    choix = choices[randomIndex]

    return choix
}

function determineWinner(player, computer) {
    while (total < 10) {
        total += 1
        if (player === computer) {
            playWinSound3();
            return 'Égalité!';
        } else if (
            (player === 'Pierre' && computer === 'Ciseaux') ||
            (player === 'Feuille' && computer === 'Pierre') ||
            (player === 'Ciseaux' && computer === 'Feuille')
        ) {
            moi += 1;
            playWinSound();
            return ' ';

        } else {
            ordi += 1;
            playWinSound2();
            return ' ';
        }
    } if (total == 10) {

        endGame()
        if (moi > ordi) {
            document.getElementById('shifumi').style.display = "none"
            document.getElementById('fin').style.display = "block"
            document.getElementById('deafet_img').style.display = "none"
            document.getElementById('egalite_img').style.display = "none"
            document.getElementById('Victoire_img').style.display = "block"
            let audio = new Audio("assets/audio/Super_Mario_Bros._Music_-_Level_Complete.mp3")
            audio.autoplay = true;
            audio.play();
        } else if (moi < ordi) {
            document.getElementById('shifumi').style.display = "none"
            document.getElementById('fin').style.display = "block"
            document.getElementById('Victoire_img').style.display = "none"
            document.getElementById('egalite_img').style.display = "none"
            document.getElementById('deafet_img').style.display = "block"
            let audio = new Audio("assets/audio/Mario_Death_-_Sound_Effect_HD.mp3")
            audio.autoplay = true;
            audio.play();

        } else if (moi == ordi) {
            document.getElementById('shifumi').style.display = "none"
            document.getElementById('fin').style.display = "block"
            document.getElementById('Victoire_img').style.display = "none"
            document.getElementById('deafet_img').style.display = "none"
            document.getElementById('egalite_img').style.display = "block"
            let audio = new Audio("assets/audio/Mario_Jump_Sound_Effect.mp3")
            audio.autoplay = true;
            audio.play();
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
    nowinSound.currentTime = 2; // Réinitialise le son à 0 secondes
    nowinSound.play(); // Joue le son de la défaite
}

function playWinSound3() {
    const egaliteSound = document.getElementById('egaliteSound');
    egaliteSound.currentTime = 0; // Réinitialise le son à 0 secondes
    egaliteSound.play(); // Joue le son de l'égalité
}















// REJOUER

// Récupère la référence du bouton et des divs
var bouton = document.getElementById("restartButton");
var div3 = document.getElementById('fin');
var div4 = document.getElementById('shifumi');

// Ajoute un gestionnaire d'événement au clic sur le bouton
bouton.addEventListener('click', function () {
    // Rend invisible div1 et visible div2
    div3.style.display = 'none';
    div4.style.display = 'block';
});



// ACCUEIL

var bouton2 = document.getElementById("restartButton2");
var div1 = document.getElementById('fin');
var div2 = document.getElementById('accueil');

// Ajoute un gestionnaire d'événement au clic sur le bouton
bouton2.addEventListener('click', function () {
    // Rend invisible div1 et visible div2
    div1.style.display = 'none';
    div2.style.display = 'block';
});






