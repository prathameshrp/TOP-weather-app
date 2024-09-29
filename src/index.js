import './style.css';
import fetchData, { forecast } from './weatherParser';
import {
  updateWeatherBoard,
  updateWeatherPallete,
  updateForecastPallete,
} from './domHandler';

import validateData from './validateInput';

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
      const loads = document.querySelectorAll('.loading-mask');
      for (let i = 0; i < 2; i += 1) loads[i].style.display = 'none';
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
  validateData(mediate);
}());
