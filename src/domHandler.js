const Units = Object.freeze({
  FARENHEIT: 0,
  DEGREE: 1,
});

let tempUnit = Units.DEGREE;
function farenheitToDegree(temp) {
  return (temp - 32) * (5 / 9);
}

export default function updateDOM(data) {
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
