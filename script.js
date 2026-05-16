const text =
"The quick brown fox jumps over the lazy dog. Practice daily to improve your typing speed and accuracy.";

const paragraph = document.getElementById("paragraph");

function loadParagraph() {

    paragraph.innerHTML = "";

    text.split("").forEach(char => {

        paragraph.innerHTML += `<span>${char}</span>`;
    });
}

loadParagraph();

const input = document.getElementById("input");

const timeTag = document.getElementById("time");
const wpmTag = document.getElementById("wpm");
const accuracyTag = document.getElementById("accuracy");

const restartBtn = document.getElementById("restartBtn");

let timer = 60;
let timeLeft = timer;
let timerStarted = false;

let interval;

input.addEventListener("input", startTest);

function startTest() {

    if (!timerStarted) {

        interval = setInterval(updateTimer, 1000);

        timerStarted = true;
    }

    calculateResults();
}

function updateTimer() {

    if (timeLeft > 0) {

        timeLeft--;

        timeTag.innerText = timeLeft;

    } else {

        clearInterval(interval);

        input.disabled = true;
    }
}

function calculateResults() {

    const typedText = input.value;

    const characters = paragraph.querySelectorAll("span");

    let correctChars = 0;

    characters.forEach((char, index) => {

        const typedChar = typedText[index];

        if (typedChar == null) {

            char.classList.remove("correct");
            char.classList.remove("incorrect");

        }

        else if (typedChar === char.innerText) {

            char.classList.add("correct");
            char.classList.remove("incorrect");

            correctChars++;
        }

        else {

            char.classList.add("incorrect");
            char.classList.remove("correct");
        }
    });

    // Accuracy

    let accuracy = Math.floor((correctChars / typedText.length) * 100);

    if (!accuracy || accuracy < 0) {

        accuracy = 0;
    }

    accuracyTag.innerText = accuracy;

    // WPM

    let wordsTyped = typedText.trim().split(" ").length;

    let timePassed = timer - timeLeft;

    let wpm = Math.floor((wordsTyped / timePassed) * 60);

    if (!wpm || wpm < 0 || wpm === Infinity) {

        wpm = 0;
    }

    wpmTag.innerText = wpm;
}

restartBtn.addEventListener("click", restartTest);

function restartTest() {

    clearInterval(interval);

    timeLeft = timer;

    timerStarted = false;

    input.disabled = false;

    input.value = "";

    timeTag.innerText = timer;

    wpmTag.innerText = 0;

    accuracyTag.innerText = 100;

    loadParagraph();
}

// Practice Mode

function setDifficulty(level) {

    const practiceParagraph =
        document.getElementById("practiceParagraph");

    if (!practiceParagraph) return;

    if (level === "easy") {

        practiceParagraph.innerText =
            "Cats are cute animals. They love milk and sleep a lot.";

    }

    else if (level === "medium") {

        practiceParagraph.innerText =
            "Typing every day can improve your speed and accuracy significantly.";

    }

    else if (level === "hard") {

        practiceParagraph.innerText =
            "JavaScript is a powerful programming language used for creating interactive web applications.";
    }
}