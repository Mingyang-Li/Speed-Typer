const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');
const startGameBtn = document.getElementById('startGameBtn');

// List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];

//init word
let randomWord;

//init score
let score = 0;

//init time
let time = 0;

//focus text on start
text.focus();

//set difficulty
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//set diffculty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//start game btn clicked
startGameBtn.addEventListener('click', () => {
  //start counting down
  const timeInterval = setInterval(updateTime, 1000);
  time = 10;
  updateTime();
});

//get random word function
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

//add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

//update score
function updateScore() {
  score++
  scoreEl.innerHTML = score;
}

//update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';
  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

//finish game
function highfalutin() {
  endgameEl.innerHTML = `
  <h1>Time ran out</h1>
  <p>Your final score is ${score}</p>
  <button onclick = 'location.reload()'>Reload</button>
  `;
  endgameEl.style.display = 'flex';
}

addWordToDOM();

//event listeners (typing)
text.addEventListener('input', e => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordToDOM();
    //clear text field
    e.target.value = '';
    if (difficulty === 'easy') {
      time += 5;
    } else if (difficulty === 'medium') {
      time += 4;
    } else {
      time += 2;
    }
    updateScore();

  }
});

//settings btn click
settingsBtn.addEventListener('click', () => {
  settings.classList.toggle('hide');
});

//settings select difficulty
settings.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
