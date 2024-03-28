const inputs = document.querySelector(".inputs"),
  hintTag = document.querySelector(".hint span"),
  guessLeft = document.querySelector(".guess-left span"),
  wrongLetter = document.querySelector(".wrong-letter span"),
  resetBtn = document.querySelector(".reset-btn"),
  scoreDisplay = document.getElementById("score"),
  typingInput = document.querySelector(".typing-input");

let word, maxGuesses, incorrectLetters = [], score = 0, correctLetters = [], guessedWords = [];

function randomWord() {
  let filteredWordList = wordList.filter(item => !guessedWords.includes(item.word));
  let ranItem = filteredWordList[Math.floor(Math.random() * filteredWordList.length)];
  word = ranItem.word;
  maxGuesses = word.length >= 5 ? 8 : 6;
  correctLetters = [];
  incorrectLetters = [];
  hintTag.innerText = ranItem.hint;
  guessLeft.innerText = maxGuesses;
  scoreDisplay.textContent = score;
  wrongLetter.innerText = incorrectLetters;

  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled>`;
  }
  inputs.innerHTML = html;
}
randomWord();

function showAlertWithCustomTitle(message) {
  alert(message);
}

function initGame(e) {
  let key = e.key.toLowerCase();
  if (key.length === 1 && key.match(/^[A-Za-z]+$/)) {
    if (word.includes(key)) {
      if (!correctLetters.includes(key)) {
        correctLetters.push(key);
        score++; // Menambah skor jika huruf ditebak benar
      }
    } else {
      if (!incorrectLetters.includes(key)) {
        incorrectLetters.push(` ${key}`);
        score = Math.max(0, score - 1); // Mengurangi skor jika huruf ditebak salah
      }
      maxGuesses--;
    }
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;
    scoreDisplay.textContent = score; // Perbarui tampilan skor
  }
  typingInput.value = "";
  updateInputsDisplay();
  setTimeout(checkGameOver, 100);
}

function updateInputsDisplay() {
  for (let i = 0; i < word.length; i++) {
    if (correctLetters.includes(word[i])) {
      inputs.querySelectorAll("input")[i].value = word[i];
    }
  }
}

function checkGameOver() {
  if (correctLetters.length === word.length) {
    guessedWords.push(word);
    showAlertWithCustomTitle(`Congrats! You found the word ${word.toUpperCase()}\nYour score is ${score}`);
    randomWord();
  } else if (maxGuesses < 1) {
    guessedWords.push(word);
    showAlertWithCustomTitle(`Game over! You don't have remaining guesses\nYour score is ${score}`);
    for (let i = 0; i < word.length; i++) {
      inputs.querySelectorAll("input")[i].value = word[i];
    }
  }
}

resetBtn.addEventListener("click", () => {
  guessedWords = [];
  randomWord();
});
typingInput.addEventListener("input", () => {});
document.addEventListener("keydown", initGame);
