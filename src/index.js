import './style.css';
import fetchData, { forecast } from './weatherParser';
import {
  updateWeatherBoard,
  updateWeatherPallete,
  updateForecastPallete,
} from './domHandler';

// console.log(imgs['./clear-day.svg']);
const currContext = {
  location: 'pune',
  date: (new Date()).toISOString(),
};

function mediate(context) {
  let data;
  fetchData(context)
    .then((response) => {
      data = response;
      updateWeatherBoard(data);
      // console.log('day:', data.day);
      updateWeatherPallete(data.day);
    });

  let forecastData;
  forecast(context)
    .then((response) => {
      forecastData = response;
      updateForecastPallete(forecastData);
    // console.log(forecastData);
    });
}
mediate(currContext);

(function runContext() {
  const searchElement = document.querySelector('#search');
  const searchBtn = document.querySelector('#search-btn');

  const fireChange = () => {
    [currContext.location, currContext.date] = [searchElement.value, (new Date()).toISOString()];

    mediate(currContext);
  };

  const form = document.querySelector('form');
  const error = document.querySelector('.errorClass');

  function showError() {
    if (searchElement.validity.valueMissing) {
      error.textContent = 'Please enter a value!';
    } else {
      error.textContent = 'Please enter at least 3 characters!';
    }
  }

  searchElement.addEventListener('input', () => {
    if (!searchElement.validity.valid) {
      showError();
    } else error.textContent = '';
  });

  form.addEventListener('submit', (e) => {
    if (!searchElement.validity.valid) {
      showError();
      e.preventDefault();
    } else {
      e.preventDefault();
      fireChange();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      if (!searchElement.validity.valid) {
        showError();
        e.preventDefault();
      } else {
        e.preventDefault();
        fireChange();
      }
    }
  });
}());
