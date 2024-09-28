const visualCrossingKey = '3QH2GPU2XG47GA766KANPM69X';

function returnObj(data) {
  // console.log(response);
  const weather = {
    temperature: data.temp,
    conditions: data.conditions,
  };
  return weather;
}

export default function fetchData(context) {
  const [location, date1] = [context.location, context.date];
  return new Promise((resolve) => {
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date1}?key=${visualCrossingKey}`,
    )
      .then((response) => {
        // console.log(response.json());
        if (response.ok) return response.json();
        throw new Error('Something went wrong');
      })
      .then((response) => {
        const data = response.currentConditions;
        resolve(returnObj(data));
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  });
}
