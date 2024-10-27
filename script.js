// script.js

const words = ["apple", "grape", "mango", "peach", "berry"];  // Add more words
const answer = words[Math.floor(Math.random() * words.length)];
let currentRow = 0;
let currentGuess = "";

const grid = document.getElementById("grid");
const keyboard = document.getElementById("keyboard");

// Initialize Grid
for (let i = 0; i < 30; i++) {  // 6 rows x 5 columns
  const tile = document.createElement("div");
  tile.classList.add("tile");
  tile.setAttribute("id", `tile-${i}`);
  grid.appendChild(tile);
}

// Initialize Keyboard
const keys = "qwertyuiopasdfghjklzxcvbnm";
keys.split("").forEach(letter => {
  const key = document.createElement("button");
  key.classList.add("key");
  key.innerText = letter;
  key.addEventListener("click", () => addLetter(letter));
  keyboard.appendChild(key);
});

const enterKey = document.createElement("button");
enterKey.classList.add("key", "enter");
enterKey.innerText = "Enter";
enterKey.addEventListener("click", submitGuess);
keyboard.appendChild(enterKey);

const backspaceKey = document.createElement("button");
backspaceKey.classList.add("key", "backspace");
backspaceKey.innerText = "⌫";
backspaceKey.addEventListener("click", deleteLetter);
keyboard.appendChild(backspaceKey);

// Functions for game logic
function addLetter(letter) {
  if (currentGuess.length < 5) {
    currentGuess += letter;
    updateGrid();
  }
}

function deleteLetter() {
  currentGuess = currentGuess.slice(0, -1);
  updateGrid();
}

function updateGrid() {
  const start = currentRow * 5;
  for (let i = 0; i < 5; i++) {
    const tile = document.getElementById(`tile-${start + i}`);
    tile.innerText = currentGuess[i] || "";
  }
}

function submitGuess() {
  if (currentGuess.length !== 5) return;
  const feedback = checkGuess();
  applyFeedback(feedback);
  if (currentGuess === answer) {
    alert("You guessed it!");
    return;
  } else if (currentRow === 5) {
    alert(`Out of tries! The word was: ${answer}`);
  }
  currentGuess = "";
  currentRow++;
}

function checkGuess() {
  const feedback = [];
  for (let i = 0; i < 5; i++) {
    if (currentGuess[i] === answer[i]) feedback.push("correct");
    else if (answer.includes(currentGuess[i])) feedback.push("present");
    else feedback.push("absent");
  }
  return feedback;
}

function applyFeedback(feedback) {
  const start = currentRow * 5;
  for (let i = 0; i < 5; i++) {
    const tile = document.getElementById(`tile-${start + i}`);
    tile.classList.add(feedback[i]);
  }
}
