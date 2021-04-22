/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'/'+ d.getDate()+'/'+ d.getFullYear();

// Make a GET request to the OpenWeatherMap API
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?'
const apiKey = 'b0867b1fdb6a7b858e1f6998d7e84d74';

// Event listener
document.getElementById('generate').addEventListener('click', performAction);

// Main function - PerformAction
function performAction(){
  const newWeather =  document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  getWeather(baseURL, newWeather, apiKey)
  .then(function(data){
    postData('/add', {date:newDate, content:feelings, temp:data.main.temp})

    // Calling the Async function
    updateUI()
  });
};

// getWeater function
const getWeather = async (baseURL, zip, key)=>{
  let response = await fetch(baseURL+'zip='+zip+',us&appid='+key+'&units=imperial');
  try {
    const data = await response.json();
    return data;
  }  catch(error) {
    console.log("There was an error", error);
  }
}

// Async Function - Update UI
const updateUI = async () => {
  const request = await fetch('/all');
  console.log(request);
  try {
    const allMyData = await request.json();
    //console.log('interfase' + allMyData);
    document.getElementById('date').innerHTML = 'The date is '+allMyData.date;
    document.getElementById('temp').innerHTML = 'The temperature is '+allMyData.temp+' °F';
    document.getElementById('content').innerHTML = 'And I feel '+allMyData.content;
  } catch(error) {
    console.log('There was an error', error)
  }
}

// Make a POST request to our route
/* Function to POST data */
const postData = async ( url = '', data = {})=>{
  const response = await fetch(url, {
  method: 'POST',
  mode: 'cors',
  credentials: 'same-origin',
  headers: {
      'Content-Type': 'application/json',
  },
  // Body data type must match "Content-Type" header        
  body: JSON.stringify(data), 
});
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch(error) {
  console.log("There is an POST error", error);
  }
}
