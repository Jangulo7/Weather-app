/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Make a POST request to our route
/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    console.log(data);
    const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
   // Body data type must match "Content-Type" header        
    body: JSON.stringify(data), 
  });

    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    }catch(error) {
    console.log("error", error);
    }
}

postData('/add', { temperature: 20 })
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
});

// Make a GET request to the OpenWeatherMap API
let baseURL = 'api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '0b86bfe901e0ec5f035cf65a95dba5d8';

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
  const newWeather =  document.getElementById('zip').value;
  getWeather(baseURL,newWeather, apiKey)
}

const getWeather = async (baseURL, animal, key)=>{
  const res = await fetch(baseURL+animal+key)
  try {
    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("There was an error", error);
    // appropriately handle the error
  }
}
