import key from './test.js';

function reverseEncode([lat, lon]) {
  const trimmedKey = key().replace(/'/g, '');
  const apiUrl = 'https://api.geoapify.com/v1/geocode/reverse?';

  return new Promise((resolve) => {
    fetch(`${apiUrl}lat=${lat}&lon=${lon}&apiKey=${trimmedKey}`)
      .then((response) => {
        if (response.ok) resolve(response.json());
        else throw new Error('Something went wrong');
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  });
}

export default function getLocation() {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position);
        // resolve(position);
        resolve(reverseEncode([position.coords.latitude, position.coords.longitude]));
      });
    } else reject(new Error('Geolocation not available'));
  });
  /* geolocation IS NOT available */
}
