import './style.css';
import fetchData, { forecast } from './weatherParser';
import {
  updateWeatherBoard,
  updateWeatherPallete,
  updateForecastPallete,
} from './domHandler';

const context = {
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
mediate(context);

(function runContext() {
  const searchElement = document.querySelector('#search');
  const searchBtn = document.querySelector('#search-btn')
  searchBtn.addEventListener('click', () => {
    [context.location, context.date] = [searchElement.value, (new Date()).toISOString()];

    mediate(context);
  });
}());
