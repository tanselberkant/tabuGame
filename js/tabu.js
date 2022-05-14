const tabuGameContainer = document.getElementById('tabuGameContainer');
const gamePlayInfo = document.getElementById('gamePlayInfo');
const gameStarterInfo = document.getElementById('gameStarterInfo');
const countdown = document.getElementById('countdown');
let trueCountSpan = document.getElementById('trueCounter');
let trueCount = parseInt(trueCountSpan.innerHTML);

const endGameCountainer = document.getElementById('endGameContainer');
let resultLine = document.getElementById('resultHeader');

const restartGameBtn = document.getElementById('restartGameBtn');

const tabuMainWord = document.getElementById('tabuMainWord');
const tabuForbiddenWordsContainer = document.getElementById(
  'tabuForbiddenWordsContainer'
);

// Game menu bringer
var timeleft = 60;
addEventListener('keyup', (e) => {
  e.preventDefault();
  if (e.keyCode === 13) {
    tabuGameContainer.classList.remove('hideElement');
    gameStarterInfo.classList.remove('showElement');
    gamePlayInfo.classList.remove('hideElement');
    gameStarterInfo.classList.add('hideElement');
    tabuGameContainer.classList.add('showElement');
    gamePlayInfo.classList.add('showElement');
    getRandomTabuData();
    // Timer
    let timer = setInterval(() => {
      if (timeleft <= 0) {
        clearInterval(timer);
        countdown.innerHTML = 'Süre bitti';
        diplayEndGameModal();
      } else {
        countdown.innerHTML = `${timeleft} saniye kaldı !`;
      }
      timeleft -= 1;
    }, 1000);
  }
});

// True Counter Functions ----------------
const trueCountIncreaser = () => {
  trueCount++;
  trueCountSpan.innerHTML = `${trueCount}`;
  getRandomTabuData();
};

addEventListener('keyup', (e) => {
  e.preventDefault();
  if (e.keyCode === 84) {
    console.log(timeleft);
    if (timeleft > 0 && timeleft < 59) {
      trueCountIncreaser();
    }
  }
});


// End Game Functions
const diplayEndGameModal = () => {
  endGameCountainer.classList.remove('hideElement');
  resultLine.innerHTML = trueCount;
  tabuGameContainer.classList.remove('showElement');
  tabuGameContainer.classList.add('hideElement');
};

restartGameBtn.addEventListener('click', () => {
  window.location.reload();
});

// Tabu Game
tabuData = [];

let card;
const getRandomTabuData = () => {
  card = tabuData[Math.floor(Math.random() * tabuData.length)];
  let forbiddenWordsArray = Object.values(card.forbidden);
  // console.log(forbiddenWordsArray);
  
  tabuMainWord.innerHTML = card.word.toUpperCase();
  tabuForbiddenWordsContainer.innerHTML = '';  
  const wordList = document.createElement('ul');
  
  forbiddenWordsArray.map((word) => {
    let forbiddenWord = document.createElement('li');
    forbiddenWord.innerHTML = word;
    wordList.appendChild(forbiddenWord);
  });
  tabuForbiddenWordsContainer.appendChild(wordList);
};

// pass card functions
addEventListener('keyup', (e) => {
    e.preventDefault();
    if(e.keyCode === 32) {
        // alert('kop')
        getRandomTabuData();
    }
})

