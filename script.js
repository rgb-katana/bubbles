'use strict';

// After hitting start button it will wait 5 seconds and tell:
// GET READY 3 2 1

// Then, the circles will start showing up and getting bigger
// Move the menu to the right and set timer.

///////////////////////////////////////////////////////////
// Variable declarations.
const playgrounds = document.querySelector('.playgrounds');
const controls = document.querySelector('.controls');
let changeColor;

///////////////////////////////////////////////////////////
// Functions

function randomColor() {
  const randomInt = () => Math.trunc(Math.random() * 255);
  return `rgb(${randomInt()}, ${randomInt()}, ${randomInt()})`;
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
    changeColor = setInterval(
      () => (playgrounds.style.backgroundColor = randomColor()),
      500
    );
  }
});

controls.addEventListener('click', (e) => {
  if (e.target.classList.contains('stop')) {
    clearInterval(changeColor);
  }
});
