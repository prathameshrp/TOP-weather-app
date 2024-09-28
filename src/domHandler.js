const Units = Object.freeze({
  FARENHEIT: 0,
  DEGREE: 1,
});

let tempUnit = Units.DEGREE;
function farenheitToDegree(temp) {
  return (temp - 32) * (5 / 9);
}

export default function updateDOM(data) {
  const temp = document.querySelectorAll('.temp');
  if (tempUnit) {
    temp[0].textContent = parseInt(farenheitToDegree(data.temperature) * 100, 10) / 100;
    temp[1].textContent = '\u00ba C'; // \u00ba is degree symbol (º)
  } else {
    temp[0].textContent = parseInt(data.temperature * 100, 10) / 100;
    temp[1].textContent = '\u00ba F'; // \u00ba is degree symbol (º)
  }
  const info = document.querySelector('.info');
  info.textContent = data.conditions;
}
