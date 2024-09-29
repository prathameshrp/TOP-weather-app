import './style.css';
import fetchData, {forecast} from './weatherParser';
import {
  updateWeatherBoard,
  updateWeatherPallete,
} from './domHandler';

const context = {
  location: 'pune',
  date: (new Date()).toISOString(),
};

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
    console.log(forecastData);
  });
