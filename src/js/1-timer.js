import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const inputDate = document.querySelector('#datetime-picker');

const startButton = document.querySelector('button[data-start]');
startButton.disabled = true;
startButton.addEventListener('click', goTimer);

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (
      Math.floor(selectedDates[0].getTime() / 60000) >
      Math.floor(Date.now() / 60000)
    ) {
      userSelectedDate = selectedDates[0];
      startButton.disabled = false;
    } else {
      startButton.disabled = true;
      iziToast.show({
        title: 'Ops.',
        titleColor: 'white',
        message: 'Please choose a date in the future',
        messageColor: 'white',
        color: 'red',
        position: 'topCenter',
        timeout: '5000',
      });
    }
  },
};

flatpickr('#datetime-picker', options);

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

const daysValue = document.querySelector('span[data-days]');
const hoursValue = document.querySelector('span[data-hours]');
const minutesValue = document.querySelector('span[data-minutes]');
const secondsValue = document.querySelector('span[data-seconds]');

function goTimer(event) {
  if (
    Math.floor(userSelectedDate.getTime() / 60000) <=
    Math.floor(Date.now() / 60000)
  ) {
    startButton.disabled = true;
    iziToast.show({
      title: 'Ops.',
      titleColor: 'white',
      message: 'Please choose a date in the future',
      messageColor: 'white',
      color: 'red',
      position: 'topCenter',
      timeout: '5000',
    });
    return;
  }
  startButton.disabled = true;
  inputDate.disabled = true;
  const destinationTame = new Date(inputDate.value);

  const intervalTimer = setInterval(() => {
    let haveTime = destinationTame.getTime() - Date.now();

    let isEnd = false;
    if (haveTime <= 0) {
      haveTime = 0;
      isEnd = true;
    }

    const arrayTime = convertMs(haveTime);

    daysValue.textContent = String(arrayTime.days).padStart(2, '0');
    hoursValue.textContent = String(arrayTime.hours).padStart(2, '0');
    minutesValue.textContent = String(arrayTime.minutes).padStart(2, '0');
    secondsValue.textContent = String(arrayTime.seconds).padStart(2, '0');

    if (isEnd) {
      clearInterval(intervalTimer);
    }
  }, 1000);
}
