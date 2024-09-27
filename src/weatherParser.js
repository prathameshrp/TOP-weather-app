const visualCrossingKey = '3QH2GPU2XG47GA766KANPM69X';

function returnObj(response) {
  console.log(response);
}

export default function fetchData(context) {
  const [location, date1] = [context.location, context.date];
  return new Promise((resolve) => {
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date1}?key=${visualCrossingKey}`,
    )
      .then((response) => {
        if (response.ok) resolve(returnObj(response.json()));
        else throw new Error('Something went wrong');
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  });
}
