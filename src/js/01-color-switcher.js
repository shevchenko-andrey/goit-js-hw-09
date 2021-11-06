buttonStartRef = document.querySelector('button[data-start]');
console.log('🚀 ~ file: 01-color-switcher.js ~ line 2 ~ buttonStartRef', buttonStartRef);
buttonStopRef = document.querySelector('button[data-stop]');
console.log('🚀 ~ file: 01-color-switcher.js ~ line 4 ~ buttonStopRef', buttonStopRef);
const intervalId = () => setInterval(onChangeBackgroundColor, 1000);
buttonStartRef.addEventListener('click', onClickStart);
// buttonStartRef.addEventListener('click', onClickStop);

// function onClickStart(e) {
//   e.target.setAttribute((disabled = true));
//   setInterval(() => true);
//   document.boby.style.backgroundColor = getRandomHexColor();
// }
function onClickStart(e) {
  console.log(e.target);
  onDisabled(e);
  //   intervalId();
}
// function onClickStop(e) {
//   onDisabled(e);
//   clearInterval(intervalId);
// }
// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }
function onDisabled(e) {
  e.target.hasAttribute('disabled')
    ? e.target.removeAttribute('bisabled')
    : e.target.setAttribute("disabled", true);
}
// e.target.setAttribute(('disabled', true));
// function onChangeBackgroundColor() {
//   document.boby.style.backgroundColor = getRandomHexColor();
// }
