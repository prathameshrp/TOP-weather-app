import './style.css';
import fetchData, { forecast } from './weatherParser';
import {
  updateWeatherBoard,
  updateWeatherPallete,
  updateForecastPallete,
} from './domHandler';

const cache = {};

function importAll(r) {
  r.keys().forEach((key) => (cache[key] = r(key)));
}

const images = importAll(require.context('../assets/icons', true, /\.(png|svg|jpg|jpeg|gif|ico)$/));
console.log(cache);
// console.log(imgs['./clear-day.svg']);
const tempContext = {
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
mediate(tempContext);

(function runContext() {
  const searchElement = document.querySelector('#search');
  const searchBtn = document.querySelector('#search-btn')
  searchBtn.addEventListener('click', () => {
    [context.location, context.date] = [searchElement.value, (new Date()).toISOString()];

    mediate(context);
  });
}());
