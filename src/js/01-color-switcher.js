buttonStartRef = document.querySelector('button[data-start]');
buttonStopRef = document.querySelector('button[data-stop]');
bodyRef = document.body;
let intervalId;
buttonStartRef.addEventListener('click', onClickStart);
buttonStopRef.addEventListener('click', onClickStop);

function onClickStart(e) {
  e.target.setAttribute('disabled', true);
  buttonStopRef.removeAttribute('disabled');
  intervalId = setInterval(onChangeBackgroundColor, 1000);
}
function onClickStop(e) {
  e.target.setAttribute('disabled', true);
  buttonStartRef.removeAttribute('disabled');
  clearInterval(intervalId);
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onChangeBackgroundColor() {
  bodyRef.style.backgroundColor = getRandomHexColor();
}
