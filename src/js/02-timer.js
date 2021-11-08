import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';
import 'notiflix/dist/notiflix-3.1.0.min.css';
const todayDate = Date.now();
let selectData = null;
let intervalId = null;
let workTimer = false;
Notify.init({
  width: '280px',
  position: 'right-top',
  distance: '10px',
  opacity: 1,
  clickToClose: true,
});
const refs = {
  datetimePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (refs.startBtn.hasAttribute('disabled') && workTimer === true) {
      return;
    } else if (selectedDates[0].getTime() < todayDate) {
      refs.startBtn.setAttribute('disabled', true);
      Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.removeAttribute('disabled');
      selectData = selectedDates[0].getTime();
    }
  },
});
refs.startBtn.addEventListener('click', onStartTimer);
function onStartTimer() {
  refs.startBtn.setAttribute('disabled', true);
  const differenceTime = calcDifferenceTime(todayDate, selectData);
  timer(differenceTime);
}
function calcDifferenceTime(todayDate, selectedData) {
  return selectedData - todayDate;
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function timerMarcup({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}
function timer(selectTime) {
  workTimer = true;
  intervalId = setInterval(() => {
    if (selectTime < 1000) {
      workTimer = false;
      return clearInterval(intervalId);
    }
    selectTime -= 1000;
    timerMarcup(convertMs(selectTime));
  }, 1000);
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
