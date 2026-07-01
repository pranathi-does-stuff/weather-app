const weatherContainer = document.getElementById("weather-info-container");
const locationName = document.getElementById("location");
const weatherIcon = document.getElementById("weather-icon");
const mainTemp = document.getElementById("main-temperature");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const windImg = document.getElementById("wind-img");
const windSpeed = document.getElementById("wind");
const windGust = document.getElementById("wind-gust");
const cityDropdown = document.getElementById("city-dropdown");
const getWeatherBtn = document.getElementById("get-weather-btn");
const mainDivider = document.getElementById("main-divider");
const weatherMain = document.getElementById("weather-main");

async function getWeather(city){
  try{
    const res = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`);

    if(!res.ok){
      alert("Something went wrong, please try again later");
      return;
    }

    const data = await res.json();
    return data;


  }catch(error){
    console.log(error);
    return "error";
  }
  
} 

async function showWeather(city){
  let weatherData = await getWeather(city);
  if(weatherData === "error"){
    return;
  }

  locationName.textContent = city[0].toUpperCase() + city.slice(1);

  weatherIcon.src = (weatherData.weather[0].icon !== undefined) ? weatherData.weather[0].icon : "N/A";

  weatherMain.textContent = (weatherData.weather[0].main !== undefined) ? weatherData.weather[0].main : "N/A"

  mainTemp.textContent = (weatherData.main.temp !== undefined) ? weatherData.main.temp : "N/A";

  feelsLike.textContent = (weatherData.main.feels_like !== undefined) ? weatherData.main.feels_like : "N/A";

  humidity.textContent = (weatherData.main.humidity !== undefined) ? weatherData.main.humidity : "N/A";

  windImg.style.transform = (weatherData.wind.deg !== undefined) ? `rotate(${weatherData.wind.deg - 90}deg)` : "rotate(0deg)";

  windSpeed.textContent = (weatherData.wind.speed !== undefined) ? weatherData.wind.speed : "N/A";

  windGust.textContent = (weatherData.wind.gust !== undefined) ? weatherData.wind.gust : "N/A";

  weatherContainer.style.display = "flex";

  mainDivider.hidden = false;
}


getWeatherBtn.addEventListener("click", () => {
  if(cityDropdown.value){
    showWeather(cityDropdown.value);
  }
});
