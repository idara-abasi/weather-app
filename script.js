const inputCity = document.getElementById('cityName');
const checkBtn = document.getElementById('checkWeather');
const displayOutput = document.getElementById('output');
const currentLocationBtn = document.getElementById('currentLocationBtn');

async function getWeather(city) {
    let weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2abad075f6dca03e7b1b8e6a413b2669&units=metric`);    

    let data = await weatherResponse.json();

    return data;
}

async function getWeatherByCoords(lat, lon) {
    let weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2abad075f6dca03e7b1b8e6a413b2669&units=metric`);
    
    let data = await weatherResponse.json();

    return data;
}

checkBtn.addEventListener("click", async function (params) {
    let userinput = inputCity.value;

    if (userinput.trim() === "") {
        displayOutput.textContent = "Plese enter city"
        return;
    }
    checkBtn.disabled = true;
    
    checkBtn.textContent = "Checking...";

    try{

    let result = await getWeather(userinput);

    if(result.cod !== 200) {

    throw new Error("City not found");

    }

    let cityName = result.name;

    let cityTemp = result.main.temp;

    let dataDescription = result.weather[0].description;

    let weatherIcon = result.weather[0].icon;

    let iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

   displayOutput.innerHTML = `
    <h2>${cityName}</h2>
    
    <img src="${iconUrl}" alt="Weather Icon">

    <p>Temperature: ${cityTemp}°C</p>

    <p>Condition: ${dataDescription}</p>
`;

    checkBtn.disabled = false;

    checkBtn.textContent = "Check";

    } catch(error) {
        displayOutput.textContent = "City not Found";

        checkBtn.disabled = false;

        checkBtn.textContent = "Check";

    }
})

inputCity.addEventListener("keydown", function(event) {
    if(event.key === "Enter") {
        
        checkBtn.click();
        
    }
});

currentLocationBtn.addEventListener("click", function() {
    
    currentLocationBtn.disabled = true;

    currentLocationBtn.textContent = "Getting Location...";
    
    navigator.geolocation.getCurrentPosition(

    async function(position) {

       try {

        let lat = position.coords.latitude;

        let lon = position.coords.longitude;

        let result = await getWeatherByCoords(lat, lon);

        let cityName = result.name;

        let cityTemp = result.main.temp;

        let dataDescription = result.weather[0].description;

        let weatherIcon = result.weather[0].icon;

        let iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

        currentLocationBtn.disabled = false;

        currentLocationBtn.textContent = "Use Current Location";
    
        displayOutput.innerHTML = `
          <h2>${cityName}</h2>

          <img src="${iconUrl}" alt="Weather Icon">

          <p>Temperature: ${cityTemp}°C</p>

          <p>Condition: ${dataDescription}</p>
        `;

       } catch(error) {
          displayOutput.textContent = "Failed to get weather data";
          currentLocationBtn.disabled = false;
          currentLocationBtn.textContent = "Use Current Location";
       }
    },

    function(error) {
        displayOutput.textContent = "Location access denied";

        currentLocationBtn.disabled = false;

        currentLocationBtn.textContent = "Use Current Location";
        
    }

    ); 
});