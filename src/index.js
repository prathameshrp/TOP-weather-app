

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
fetchData(city).then((response)=>{
    data = response;
container.textContent = JSON.stringify(data);

})

