import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('input');

const stateRadios = document.getElementsByName('state');

form.addEventListener('submit', doPromise);

function doPromise(event) {
  event.preventDefault();

  let selectedState;
  for (let i = 0; i < stateRadios.length; i++) {
    if (stateRadios[i].checked) {
      selectedState = stateRadios[i].value;
    }
  }

  let isSuccess;

  if (selectedState === 'fulfilled') {
    isSuccess = true;
  } else if (selectedState === 'rejected') {
    isSuccess = false;
  } else {
    return;
  }
  const delay = inputDelay.value;
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        resolve({
          message: `✅ Fulfilled promise in ${delay}ms`,
          messageColor: 'white',
          color: 'green',
          position: 'topLeft',
          timeout: 4000,
        });
      } else {
        reject({
          message: `❌ Rejected promise in ${delay}ms`,
          messageColor: 'white',
          color: 'red',
          position: 'topLeft',
          timeout: 4000,
        });
      }
    }, inputDelay.value);
  }).then(
    ok => {
      iziToast.show(ok);
    },
    error => {
      iziToast.show(error);
    }
  );
}
