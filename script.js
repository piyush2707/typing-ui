const quotes = [
  "Typing fast is a skill you can master with practice.",
  "Piyush Joshi built this clean typing speed web app.",
  "The quick brown fox jumps over the lazy dog.",
  "Consistent effort leads to great results in life.",
  "Design, develop, and deploy your web projects."
];

let timer;
let timeLeft = 0;
let isRunning = false;

const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("input");
const timeEl = document.getElementById("time");
const speedEl = document.getElementById("speed");
const accuracyEl = document.getElementById("accuracy");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

let currentQuote = "";

function startTest() {
  if (isRunning) return;
  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteEl.textContent = currentQuote;
  inputEl.disabled = false;
  inputEl.value = "";
  inputEl.focus();
  isRunning = true;
  timeLeft = 0;
  timer = setInterval(() => {
    timeLeft++;
    timeEl.textContent = timeLeft;
  }, 1000);
}

function resetTest() {
  clearInterval(timer);
  isRunning = false;
  quoteEl.textContent = "Click start to begin typing...";
  inputEl.disabled = true;
  inputEl.value = "";
  timeEl.textContent = "0";
  speedEl.textContent = "0";
  accuracyEl.textContent = "0";
}

function calculateResults() {
  clearInterval(timer);
  const inputText = inputEl.value.trim();
  const quoteWords = currentQuote.split(" ");
  const inputWords = inputText.split(" ");
  
  let correctWords = 0;
  for (let i = 0; i < inputWords.length; i++) {
    if (inputWords[i] === quoteWords[i]) correctWords++;
  }

  const speed = Math.round((inputWords.length / timeLeft) * 60) || 0;
  const accuracy = Math.round((correctWords / quoteWords.length) * 100) || 0;

  speedEl.textContent = speed;
  accuracyEl.textContent = accuracy;
  isRunning = false;
}

inputEl.addEventListener("input", () => {
  if (inputEl.value.trim() === currentQuote) {
    calculateResults();
  }
});

startBtn.addEventListener("click", startTest);
resetBtn.addEventListener("click", resetTest);
