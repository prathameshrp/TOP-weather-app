const visualCrossingKey = '3QH2GPU2XG47GA766KANPM69X';

function returnObj(data) {
  // console.log(response);
  const [currentConditions, dayConditions] = [data.currentConditions, data.days[0]];

  const weather = {
    current: {
      temperature: currentConditions.temp,
      conditions: currentConditions.conditions,
    },
    day: dayConditions,
  };
  return weather;
}

export default function fetchCurrentData(context) {
  const [location, date1] = [context.location, context.date];
  return new Promise((resolve) => {
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date1}?key=${visualCrossingKey}`,
    )
      .then((response) => {
        // console.log(response.json());
        const response1 = response.clone();
        console.log(response1.json());
        if (response.ok) return response.json();
        throw new Error('Something went wrong');
      })
      .then((response) => {
        resolve(returnObj(response));
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  });
}

function forecast(context) {
  const [location] = [context.location];

  return new Promise((resolve) => {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${visualCrossingKey}`)
      .then((response) => {
        if (response.ok) resolve(response.json());
      });
  });
}

export {
  forecast,
};
