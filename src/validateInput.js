export default function validateData(mediate) {
  const currContext = {
    location: 'Pune',
    date: (new Date()).toISOString(),
  };

  const fireChange = () => {
    [currContext.location, currContext.date] = [searchElement.value, (new Date()).toISOString()];
    const loads = document.querySelectorAll('.loading-mask');
    for (let i = 0; i < 2; i += 1) loads[i].style.display = 'block';
    mediate(currContext);
  };

  const searchElement = document.querySelector('#search');
  const form = document.querySelector('form');
  const error = document.querySelector('.errorClass');

  function showError() {
    if (searchElement.validity.valueMissing) {
      error.textContent = 'Please enter a value!';
    } else {
      error.textContent = 'Please enter at least 3 characters!';
    }
  }

  searchElement.addEventListener('input', () => {
    if (!searchElement.validity.valid) {
      showError();
    } else error.textContent = '';
  });

  form.addEventListener('submit', (e) => {
    if (!searchElement.validity.valid) {
      showError();
      e.preventDefault();
    } else {
      e.preventDefault();
      fireChange();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      if (!searchElement.validity.valid) {
        showError();
        e.preventDefault();
      } else {
        e.preventDefault();
        fireChange();
      }
    }
  });
}
