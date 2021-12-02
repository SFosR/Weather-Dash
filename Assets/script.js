var apiKey = "4cf6b6df17390c13ea85712d0b2dd185";
var weatherApiRootURL = "https://api.openweathermap.org";
var searchHistory = [];

var searchedCities = document.querySelector("#search-history"); //cities
var searchInput = document.querySelector("#search-input"); //cityInput
var searchForm = document.querySelector("#search-form"); //formEl


searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var cityName = document.getElementById("search-input").value;
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      // current weather
      var currentWeatherContainer = document.getElementById("current-weather");

      var cityName = document.getElementById("current-city-name");
      cityName.innerHTML = data.name;

      var currentDate = document.getElementById("current-date");

      const date = new Date(data.dt * 1000);
      currentDate.innerHTML = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;

      const currentIcon = document.getElementById("current-icon");
      currentIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      //        -city name
      //        -date
      //        -icon
      // -temperature
      // -humidity
      // -wind speed
      //  -uv index
      //      -color for favorable, moderate or high

      console.log(data);
    });
});

// WHEN I view future weather conditions for that city
// THEN
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// 1. search for the city

//     -current conditions
//        -city name
//        -date
//        -icon
// -temperature
// -humidity
// -wind speed
//  -uv index
//      -color for favorable, moderate or high

//     -future conditions
//      -5-day forecast
//           -date,
//           -an icon representation of weather conditions,
//            - the temperature,
//            -the wind speed,
//        -the humidity
//
//     -add to search history
