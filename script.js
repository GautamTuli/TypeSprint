const text =
"The quick brown fox jumps over the lazy dog. Practice daily to improve your typing speed and accuracy.";

const paragraph = document.getElementById("paragraph");

// Load Paragraph

function loadParagraph() {

    if (!paragraph) return;

    paragraph.innerHTML = "";

    text.split("").forEach(char => {

        paragraph.innerHTML += `<span>${char}</span>`;
    });
}

loadParagraph();


// Elements

const input = document.getElementById("input");

const timeTag = document.getElementById("time");
const wpmTag = document.getElementById("wpm");
const accuracyTag = document.getElementById("accuracy");

const restartBtn = document.getElementById("restartBtn");


// Timer Variables

let timer = 60;
let timeLeft = timer;
let timerStarted = false;

let interval;


// Start Typing Test

if (input) {

    input.addEventListener("input", startTest);
}

function startTest() {

    if (!timerStarted) {

        interval = setInterval(updateTimer, 1000);

        timerStarted = true;
    }

    calculateResults();
}


// Update Timer

function updateTimer() {

    if (timeLeft > 0) {

        timeLeft--;

        if (timeTag) {

            timeTag.innerText = timeLeft;
        }

    } 
    
    else {

        clearInterval(interval);

        input.disabled = true;

        saveResult();
    }
}


// Calculate WPM + Accuracy

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

    let accuracy =
        Math.floor((correctChars / typedText.length) * 100);

    if (!accuracy || accuracy < 0) {

        accuracy = 0;
    }

    if (accuracyTag) {

        accuracyTag.innerText = accuracy;
    }


    // WPM

    let wordsTyped =
        typedText.trim().split(" ").length;

    let timePassed = timer - timeLeft;

    let wpm =
        Math.floor((wordsTyped / timePassed) * 60);

    if (!wpm || wpm < 0 || wpm === Infinity) {

        wpm = 0;
    }

    if (wpmTag) {

        wpmTag.innerText = wpm;
    }
}


// Restart Test

if (restartBtn) {

    restartBtn.addEventListener("click", restartTest);
}

function restartTest() {

    saveResult();

    clearInterval(interval);

    timeLeft = timer;

    timerStarted = false;

    input.disabled = false;

    input.value = "";

    if (timeTag) {

        timeTag.innerText = timer;
    }

    if (wpmTag) {

        wpmTag.innerText = 0;
    }

    if (accuracyTag) {

        accuracyTag.innerText = 100;
    }

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


// Save Result

function saveResult() {

    if (!wpmTag || !accuracyTag) return;

    const result = {

        wpm: wpmTag.innerText,

        accuracy: accuracyTag.innerText,

        date: new Date().toLocaleString()
    };

    let history =
        JSON.parse(localStorage.getItem("typingHistory")) || [];

    history.push(result);

    localStorage.setItem(
        "typingHistory",
        JSON.stringify(history)
    );
}


// Show History

function showHistory() {

    const historyContainer =
        document.getElementById("historyContainer");

    if (!historyContainer) return;

    let history =
        JSON.parse(localStorage.getItem("typingHistory")) || [];

    if (history.length === 0) {

        historyContainer.innerHTML =
            "<p>No history available.</p>";

        return;
    }

    history.reverse().forEach(result => {

        historyContainer.innerHTML += `

        <div class="history-card">

            <p><strong>WPM:</strong> ${result.wpm}</p>

            <p><strong>Accuracy:</strong> ${result.accuracy}%</p>

            <p><strong>Date:</strong> ${result.date}</p>

        </div>
        `;
    });
}

showHistory();

// Theme Settings

function setTheme(mode) {

    if (mode === "dark") {

        document.body.style.backgroundColor = "#0f172a";

        document.body.style.color = "white";
    }

    else if (mode === "light") {

        document.body.style.backgroundColor = "white";

        document.body.style.color = "black";
    }

    localStorage.setItem("theme", mode);
}


// Load Saved Theme

function loadTheme() {

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "light") {

        document.body.style.backgroundColor = "white";

        document.body.style.color = "black";
    }
}

loadTheme();