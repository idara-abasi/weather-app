const inputCity = document.getElementById('cityName');
const checkBtn = document.getElementById('checkWeather');
const displayOutput = document.getElementById('output');

async function getWeather(city) {
    let weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2abad075f6dca03e7b1b8e6a413b2669&units=metric`);    

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

    let result = await getWeather(userinput);

    let cityName = result.name;

    let cityTemp = result.main.temp;

    let dataDescription = result.weather[0].description;

    checkBtn.textContent = "Check";

    checkBtn.disabled = false;

    displayOutput.textContent = `
    city: ${cityName}
    Temperature: ${cityTemp}°C
    Condition: ${dataDescription}
    `;
})