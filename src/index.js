

const visual_crossing_key = "3QH2GPU2XG47GA766KANPM69X";

const container = document.querySelector('.container');
let dateOj = new Date();
let date1 = dateOj.toISOString();
console.log(dateOj.getDate);
console.log(date1);
function fetchData(city) {
    return new Promise((resolve, reject) => {
        fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${date1}?key=${visual_crossing_key}`)
        .then((response)=>
        {
            if(response.ok)
                resolve(response.json());
            else
                throw new Error("Something went wrong");
        })
        .catch((err) =>
        {
            console.log("Error: ", err);
        });

    })
}

let city = "pune";
let data;
let temp;
let windSpeed;
let feelsLike;
let humidity;
let conditions;
let cloudCover;
let pressure;
let sunrise;
let sunset;
let uvIndex;
let visibility;
var a = 4;
fetchData(city).then((response)=>{
    data = response;
    const current = data.currentConditions;
// container.textContent = JSON.stringify(data);
let curr_weather = [
    current.temp, current.windspeed, current.feelslike, current.humidity, current.conditions, current.cloudcover, current.pressure, current.sunrise, current.sunset, current.uvindex, current.visibility
];
    [temp, windSpeed, feelsLike, humidity, conditions, cloudCover, pressure, sunrise, sunset, uvIndex, visibility] = curr_weather;
  
    container.textContent = curr_weather; 
// console.log(data);

})

