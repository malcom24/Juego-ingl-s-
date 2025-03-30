let currentTeam = 1;
let scores = { team1: 0, team2: 0 };
let currentExpression = null;

// Drag and Drop Functionality
const cards = document.querySelectorAll('.card');
const dropzones = document.querySelectorAll('.dropzone');

cards.forEach(card => {
    card.addEventListener('dragstart', () => {
        card.classList.add('dragging');
    });

    card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
    });
});

dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragover', e => {
        e.preventDefault();
    });

    dropzone.addEventListener('drop', e => {
        e.preventDefault();
        const card = document.querySelector('.dragging');
        if (card.dataset.match === dropzone.dataset.match) {
            dropzone.appendChild(card);
            scores[`team${currentTeam}`] += 1;
            updateScore();
            currentExpression = card.dataset.match;
        }
    });
});

// Update Score
function updateScore() {
    document.getElementById('score-team1').textContent = scores.team1;
    document.getElementById('score-team2').textContent = scores.team2;
    currentTeam = currentTeam === 1 ? 2 : 1; // Switch teams
}

// Speak Functionality
function speak(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
}

// Check Sentence
function checkSentence() {
    const sentence = document.getElementById('sentence').value.toLowerCase();
    if (!currentExpression) {
        alert('Primero empareja una expresión.');
        return;
    }

    // Simple validation: Check if the sentence contains the expression
    if (sentence.includes(currentExpression)) {
        scores[`team${currentTeam}`] += 3;
        updateScore();
        alert('¡Oración correcta! +3 puntos');
    } else {
        alert('La oración debe incluir la expresión: ' + currentExpression);
    }

    document.getElementById('sentence').value = ''; // Clear input
}

