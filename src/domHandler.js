function farenheitToDegree(temp) {
  return (temp - 32) * (5 / 9);
}

export default function updateDOM(data) {
  const temp = document.querySelector('.temp');
  temp.textContent = parseInt(farenheitToDegree(data.temperature) * 100, 10) / 100;

  const info = document.querySelector('.info');
  info.textContent = data.conditions;
}
