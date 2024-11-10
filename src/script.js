function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector(".current-city");
  let iconElement = document.querySelector("#weather-icon");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = `${temperature}`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  let dateElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");

  dateElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;

  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "d6116e815a6e6a387bt2b0af2o2c3495";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios
    .get(apiUrl)
    .then(displayTemperature)
    .catch((error) => console.error(error));
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value.trim();
  searchCity(city);

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);

function getForecast(city) {
  let apiKey = "1etfbc9oa09fd07ccaeed48b2b610131";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `
         <div class="forecast-day">
            <div class="forecast-date">${formatDay(day.time)}</div>
            <img src="${day.condition.icon_url}" class="forecast-icon" />
            <div class="forecast-temperatures">
              <div class="forecast-temperature"><strong>${Math.round(
                day.temperature.maximum
              )}°</strong></div>
              <div class="forecast-temperature">${Math.round(
                day.temperature.minimum
              )}°</div>
            </div>
          </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

searchCity("Cape Town");