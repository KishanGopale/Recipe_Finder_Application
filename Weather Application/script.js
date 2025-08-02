// Step 1: Select DOM elements
let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");
let w_feeLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity"); 
let w_windSpeed = document.querySelector(".weather_wind");          
let w_pressure = document.querySelector(".weather_pressure");
let citySearch = document.querySelector(".weather_search");



// step 3: to get country name from country code
const getCountryName = (code) => {
   return new Intl.DisplayNames([code], { type: "region" }).of(code);

}

// Step 4: to get date and time from timestamp
const getDateTime = (dt) => {
    const curDate = new Date(dt * 1000);
    console.log(curDate);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    console.log(formatter);
    return formatter.format(curDate);
}


let city = "Mumbai"; // Default city
citySearch.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission

let cityName = document.querySelector(".city_name");
console.log(cityName.value)
getWeatherData(); // Call the function to fetch weather data
city = cityName.value; // Get the value from the input field
    if (city) {
        getWeatherData(); // Call the function to fetch weather data
        cityName.value = ""; // Clear the input field after submission
    } else {
        alert("Please enter a city name");
    }
});


// Step 2: Create a function to fetch weather data
const getWeatherData = async() => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=a0b06669a793506ae54060f7df8a5fb6`;
    try{
        const res = await fetch(weatherUrl);
        const data = await res.json();

        // Step 3: Review API data
        const { main, name, weather, wind, sys, dt} = data;

        // to get country name
        cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
        dateTime.innerHTML = getDateTime(dt);

        // to get cloud and icon
        w_forecast.innerHTML = weather[0].main;
        w_icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@4x.png" alt="${weather[0].description}">`;

        // to get temperature, min and max temperature
        w_temperature.innerHTML = `${main.temp}&#176`;
        w_minTem.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`;
        w_maxTem.innerHTML = `Max: ${main.temp_max.toFixed()}&#176`;

        // for the last 4 data
        w_feeLike.innerHTML = ` ${main.feels_like.toFixed()}&#176`;
        w_humidity.innerHTML = `${main.humidity}%`;   
        w_windSpeed.innerHTML = `${wind.speed} m/s`;
        w_pressure.innerHTML = `${main.pressure} hPa`;    
    

    }catch(error){
        console.log(error);
        
    }
};
document.body.addEventListener("load", getWeatherData()); //when the page is load it will call the function getWeatherData and get all weather data

