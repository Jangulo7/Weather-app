/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Make a GET request to the OpenWeatherMap API
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?'
const apiKey = 'b0867b1fdb6a7b858e1f6998d7e84d74';

document.getElementById('generate').addEventListener('click', performAction);

function performAction(){
  const feel =  document.getElementById('feelings').value;
  const newWeather =  document.getElementById('zip').value;
  getWeather(baseURL, newWeather, apiKey);
  .then(function(data){
    postData('/data', {date:newDate, content: feel, temp: data.main.temp})
    // Calling the Async function
    updateUI()
  });
};

const getWeather = async (baseURL, zip, key)=>{
  let response = await fetch(baseURL+'zip='+zip+',us&appid='+key);
  try {
    const data = await response.json();
    //console.log(data);
    return data;
  }  catch(error) {
    console.log("There was an error", error);
  }
}

// Async Function
const updateUI = async () => {
  const req = await fetch('/')
  try {
    const allMyData = await HTMLTableRowElement.json()
    console.log(allMyData);
    document.getElementById('date').innerHTML = allMyData[0].date;
    document.getElementById('content').innerHTML = allMyData[0].content;
    document.getElementById('temp').innerHTML = allMyData[0].temp;
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
  cache: 'no-cache',
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
