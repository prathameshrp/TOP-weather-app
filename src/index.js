import './style.css';
import fetchData from './weatherParser';
import updateDOM from './domHandler';

const context = {
  location: 'pune',
  date: (new Date()).toISOString(),
};

// let data;
fetchData(context)
  .then((response) => {
    // data = response;
    console.log(response);
    updateDOM(response);
  });
