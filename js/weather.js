export async function getWeather(city) {
    let weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2abad075f6dca03e7b1b8e6a413b2669&units=metric`);    

    let data = await weatherResponse.json();

    return data;
}

export async function getWeatherByCoords(lat, lon) {
    let weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2abad075f6dca03e7b1b8e6a413b2669&units=metric`);
    
    let data = await weatherResponse.json();

    return data;
}