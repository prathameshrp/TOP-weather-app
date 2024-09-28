import './style.css';
import fetchData from './weatherParser';

const context = {
  location: 'pune',
  date: (new Date()).toISOString(),
};

// let data;
fetchData(context)
  .then((response) => {
    // data = response;
    console.log(response);
  });
