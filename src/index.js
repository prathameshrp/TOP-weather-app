import './style.css';
import fetchData, { forecast } from './weatherParser';
import {
  updateWeatherBoard,
  updateWeatherPallete,
  updateForecastPallete,
} from './domHandler';

import validateData from './validateInput';
import getLocation from './userLocation';

// console.log(imgs['./clear-day.svg']);
const currContext = {
  location: 'pune',
  date: (new Date()).toISOString(),
};

function clearDOM()
{
  const template = document.querySelector('.time-stamp-temp');
  const dayPallete = document.querySelector('.day-pallete');
  const template2 = document.querySelector('.day-stamp-temp');
  const forecastPallete = document.querySelector('.forecast-pallete');
  dayPallete.replaceChildren(template);

  forecastPallete.replaceChildren(template2);
}
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
    })
    .catch((err) => {
      const loads = document.querySelectorAll('.loading-mask');
      for (let i = 0; i < 2; i += 1) loads[i].textContent = '';
      const errClass = document.querySelector('.errorClass');
      errClass.textContent = 'INVALID PLACE! Please input a real location.';
      clearDOM();
    });

  let forecastData;
  forecast(context)
    .then((response) => {
      forecastData = response;
      updateForecastPallete(forecastData);
    // console.log(forecastData);
    })
    .catch((err) => {
        console.log('Unexpected Error');
    });
}
getLocation().then((response) => {
  const place = response.features[0].properties.village;
  currContext.location = place;
  mediate(currContext);
});

mediate(currContext);

(function runContext() {
  validateData(mediate);
}());
