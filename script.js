const inputCity = document.getElementById('cityName');
const checkBtn = document.getElementById('checkWeather');
const displayOutput = document.getElementById('output');

async function getWeather(city) {
    let weather = await fetch("url", {

        method: POST,

        headers: {
           "Content-Type": "application/JSON"
        },

        body: JSON.stringify({
            title: cityName,
            body: "Weather forecast data",
            userId: 1
        })
    })
    
    let data = await weather.json();

    return data;

}

checkBtn.addEventListener("click", async function (params) {
    let userinput = inputCity.value;

    if (userinput.trim() = "") {
        displayOutput.textContent = "Plese enter city"
        return;
    }
    checkBtn.disabled = true;
    
    checkBtn.textContent = "Checking...";

    let result = await getWeather(userinput);

    displayOutput.textContent = result;

    checkBtn.textContent = "Check";

    checkBtn.disabled = false;
})