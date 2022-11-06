'use strict';

// After hitting start button it will wait 5 seconds and tell:
// GET READY 3 2 1

// Then, the circles will start showing up with 1px, 1px and getting bigger to 50px
// Move the menu to the right and set timer!!!

// Try not to spawn to circles in the same position.

// Make the circles increase

///////////////////////////////////////////////////////////
// Variable declarations.
const playgrounds = document.querySelector('.playgrounds');
const controls = document.querySelector('.controls');
let changeColor;
let playState = false;
let totalBubbles = 0;
const bubbles = [];

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
  bubbles.push(bubble);
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

controls.addEventListener('click', (e) => {
  if (e.target.classList.contains('start')) {
    changeColor = setInterval(function () {
      playgrounds.style.backgroundColor = randomColor();
      spawnCircle();
    }, 1000);
    playState = true;
  }
});

controls.addEventListener('click', (e) => {
  if (e.target.classList.contains('stop')) {
    clearInterval(changeColor);
    clearInterval(bubbleDeleter);
    playState = false;
  }
});
