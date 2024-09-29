import { format } from 'date-fns';

const Units = Object.freeze({
  FARENHEIT: 0,
  DEGREE: 1,
});

let tempUnit = Units.DEGREE;
function farenheitToDegree(temp) {
  return (temp - 32) * (5 / 9);
}

function updateWeatherBoard(data) {
  const [currentData, dayData] = [data.current, data.day];
  const temp = document.querySelectorAll('.temp');
  if (tempUnit) {
    temp[0].textContent = parseInt(farenheitToDegree(currentData.temperature) * 10, 10) / 10;
    temp[1].textContent = '\u00b0C'; // \u00ba is degree symbol (º)
  } else {
    temp[0].textContent = parseInt(currentData.temperature * 100, 10) / 100;
    temp[1].textContent = '\u00b0F'; // \u00ba is degree symbol (º)
  }
  const info = document.querySelector('.info');
  // info.textContent = dayData.description;
  let description = currentData.conditions;
  if (tempUnit) {
    const minTemp = Math.round(farenheitToDegree(dayData.tempmin));
    const maxTemp = Math.round(farenheitToDegree(dayData.tempmax));
    description += ` ${minTemp}\u00b0C / ${maxTemp}\u00b0C `;
  } else {
    const minTemp = Math.round(dayData.tempmim);
    const maxTemp = Math.round(dayData.tempmax);

    description += ` ${minTemp}\u00b0F/${maxTemp}\u00b0F `;
  }
  description += dayData.description;
  info.textContent = description;
}

function updateWeatherPallete(dayData) {
  const hrs = dayData.hours;
  const template = document.querySelector('.time-stamp-temp');
  const dayPallete = document.querySelector('.day-pallete');
  dayPallete.replaceChildren(template);
  hrs.forEach((hr) => {
    const hrBoard = template.content.cloneNode(true);

    const time = hrBoard.querySelector('#hr');
    // const icn = hrBoard.querySelector('#icn');
    const tmp = hrBoard.querySelector('#tmp');

    time.textContent = hr.datetime.substring(0, 5);
    if (tempUnit) tmp.textContent = `${Math.round(farenheitToDegree(hr.temp))}\u00b0C`;
    else tmp.textContent = `${Math.round(hr.temp)}\u00b0F`;

    dayPallete.appendChild(hrBoard);
  });
}

function updateForecastPallete(data) {
  const [days] = [data.days];
  const template = document.querySelector('.day-stamp-temp');
  const forecastPallete = document.querySelector('.forecast-pallete');
  forecastPallete.replaceChildren(template);
  days.forEach((day) => {
    const dayBoard = template.content.cloneNode(true);

    const date = dayBoard.querySelector('#forecast-date');
    const weekDay = dayBoard.querySelector('#forecast-day');
    // const icn = dayBoard.querySelector('#forecast-icn');
    const tmp = dayBoard.querySelector('#forecast-temp');

    date.textContent = format(new Date(day.datetime), 'do MMM');
    weekDay.textContent = format(new Date(day.datetime), 'EEE');
    const maxTemp = day.tempmax;
    const minTemp = day.tempmin;
    if (tempUnit) tmp.textContent = `${Math.round(farenheitToDegree(maxTemp))}\u00b0 / ${Math.round(farenheitToDegree(minTemp))}\u00b0`;
    else tmp.textContent = `${Math.round(maxTemp)}\u00b0 / ${Math.round(minTemp)}\u00b0`;

    forecastPallete.appendChild(dayBoard);
  });
}
export {
  updateWeatherBoard,
  updateWeatherPallete,
  updateForecastPallete,
};
