const inputs = document.querySelector(".inputs"),
  hintTag = document.querySelector(".hint span"),
  guessLeft = document.querySelector(".guess-left span"),
  wrongLetter = document.querySelector(".wrong-letter span"),
  resetBtn = document.querySelector(".reset-btn"),
  scoreDisplay = document.getElementById("score"), // Menyimpan elemen yang menampilkan skor
  typingInput = document.querySelector(".typing-input");


let word, maxGuesses, incorrectLetters = [], score = 0, correctLetters = [];

function randomWord() {
  let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
  word = ranItem.word;
  maxGuesses = word.length >= 5 ? 8 : 6;
  correctLetters = [];
  incorrectLetters = [];
  hintTag.innerText = ranItem.hint;
  guessLeft.innerText = maxGuesses;
  scoreDisplay.textContent = score; // Perbarui skor di tampilan
  wrongLetter.innerText = incorrectLetters;

  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled>`;
  }
  inputs.innerHTML = html; // Memperbarui semua elemen input sekaligus setelah iterasi selesai
}
randomWord();

function showAlertWithCustomTitle(message) {
  alert(message);
}

function initGame(e) {
  let key = e.target.value.toLowerCase();
  if (key.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
    if (word.includes(key)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] === key) {
          correctLetters.push(key); // Perhatikan penggunaan push() untuk menambahkan huruf ke dalam array correctLetters
        }
      }
      // Tambah skor jika jawaban benar
      score++;
      scoreDisplay.textContent = score; // Perbarui skor di tampilan
    } else {
      maxGuesses--;
      incorrectLetters.push(` ${key}`);
    }
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;
  }
  typingInput.value = "";
  updateInputsDisplay(); // Panggil fungsi untuk memperbarui tampilan kata yang ditebak

  // Periksa apakah permainan selesai setiap kali pengguna memasukkan huruf
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
    showAlertWithCustomTitle(`Congrats! You found the word ${word.toUpperCase()}\nYour score is ${score}`);
    randomWord();
  } else if (maxGuesses < 1) {
    showAlertWithCustomTitle(`Game over! You don't have remaining guesses\nYour score is ${score}`);
    for (let i = 0; i < word.length; i++) {
      inputs.querySelectorAll("input")[i].value = word[i];
    }
  }
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
