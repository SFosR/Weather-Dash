// Weather dashboard with form inputs
//      search for a city
//      current and future conditions for that city and
//      that city is added to the search history

// View current weather conditions for that city with
//      city name,
//      date,
//      icon representation of weather conditions,
//      temperature,
//      the humidity,
//      the wind speed,
//      and the UV index (needs a color that shows conditions as favorable, moderate or severe)

// Future weather conditions for that city with a
//      5-day forecast that displays the date,
//      an icon representation of weather conditions, the
//      temperature,
//      wind speed,
//      and the humidity

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var apiKey = "4cf6b6df17390c13ea85712d0b2dd185";

// api call using city that user inputed

var searchedCities = JSON.parse(localStorage.getItem("search-history")) || [];

var searchInput = document.getElementById("search-input");
var searchButton = document.getElementById("search-button");
var searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var cityName = document.getElementById("search-input").value;
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      // current weather
      var currentCity = document.getElementById("current-city");
      var headline = document.createElement("h3");
      headline.innerHTML = data.name;
      currentCity.appendChild(headline);
      var humidity = document.createElement("p");
      humidity.innerHTML = data.main.humidity + "%";
      currentCity.appendChild(humidity);
      // five day cards
      //save value to local storage
      //maybe reload the history
      console.log(data);
    });
});
