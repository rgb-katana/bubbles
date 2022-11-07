'use strict';

// After hitting start button it will wait 5 seconds and tell:
// GET READY 3 2 1

// Then, the circles will start showing up with 1px, 1px and getting bigger to 50px
// Move the menu to the right and set timer!!!

// Try not to spawn to circles in the same position.

// Make the circles increase

///////////////////////////////////////////////////////////
// Variable declarations.
const timer = document.querySelector('.timer');
const playgrounds = document.querySelector('.playgrounds');
const controls = document.querySelector('.controls');
let changeColor;
let totalBubbles = 0;
let hits = 0;
let timerExpire;

///////////////////////////////////////////////////////////
// Functions

function disappear(elem) {
  elem.remove();
}

function randomColor() {
  const randomInt = () => Math.trunc(Math.random() * 255);
  return `rgb(${randomInt()}, ${randomInt()}, ${randomInt()})`;
}

function spawnCircle() {
  const offsetTopPG = playgrounds.offsetTop;
  const offsetLeftPG = playgrounds.offsetLeft;
  const offsetRightPG = window.innerWidth - offsetLeftPG;
  const offsetBotPG = window.innerHeight - offsetTopPG;
  const yCoord = function () {
    return Math.trunc(Math.random() * (offsetBotPG - offsetTopPG - 130));
  };
  const xCoord = function () {
    return Math.trunc(Math.random() * (offsetRightPG - offsetLeftPG - 70));
  };
  totalBubbles += 1;
  playgrounds.insertAdjacentHTML(
    'afterbegin',
    `<div class="bubble bubble${totalBubbles}"></div>`
  );
  const bubble = document.querySelector(`.bubble${totalBubbles}`);
  bubble.style.position = 'absolute';
  bubble.style.top = `${yCoord()}px`;
  bubble.style.left = `${xCoord()}px`;
  return bubble;
}

///////////////////////////////////////////////////////////
// Event listeners.

controls.addEventListener('mouseover', (e) => {
  if (e.target.classList.contains('button')) {
    e.target.classList.add('hovered');
  }
});

controls.addEventListener('mouseout', (e) => {
  if (e.target.classList.contains('button')) {
    e.target.classList.remove('hovered');
  }
});

function play(e) {
  clearInterval(changeColor);
  clearInterval(timerExpire);
  playgrounds.innerHTML = '';
  document.querySelector('.results').classList.add('hidden');
  document.querySelector('.game').classList.remove('hidden');
  hits = 0;
  totalBubbles = 0;
  let time = 30;
  timer.textContent = `00:${time}`;
  if (
    e.target.classList.contains('start') ||
    e.target.classList.contains('retry')
  ) {
    changeColor = setInterval(function () {
      spawnCircle();
    }, 500);
    timerExpire = setInterval(function () {
      time = (--time).toString().padStart(2, '0');
      timer.textContent = `00:${time}`;
      if (time === '00') {
        clearInterval(changeColor);
        clearInterval(timerExpire);
        document.querySelector('.game').classList.add('hidden');
        document.querySelector('.results').classList.remove('hidden');
        document.querySelector('.score').textContent = hits;
        document.querySelector('.total').textContent = totalBubbles;
        const retry = document.querySelector('.retry');
        retry.addEventListener('mouseover', (e) => {
          e.target.classList.add('hovered');
        });
        retry.addEventListener('mouseout', (e) => {
          e.target.classList.remove('hovered');
        });
        retry.addEventListener('click', (e) => play(e));
      }
    }, 1000);
  }
}

controls.addEventListener('click', (e) => play(e));

// Differentiate timer and bubbles 1000 500 250

controls.addEventListener('click', (e) => {
  if (e.target.classList.contains('stop')) {
    clearInterval(changeColor);
    clearInterval(timerExpire);
    playgrounds.style.backgroundColor = 'blue';
  }
});

playgrounds.addEventListener('click', function (e) {
  if (e.target.classList.contains('bubble')) {
    hits++;
    e.target.remove();
    playgrounds.style.backgroundColor = randomColor();
  }
});
