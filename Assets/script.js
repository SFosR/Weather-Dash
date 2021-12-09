var apiKey = "4cf6b6df17390c13ea85712d0b2dd185";
var weatherApiRootURL = "https://api.openweathermap.org";
var searchHistory = [];
var fiveDayEl = document.querySelector("#five-day-forecast");
var searchedCities = document.querySelector("#search-history");
var searchInput = document.querySelector("#search-input");
var searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var cityName = document.getElementById("search-input").value;
  searchHistory.push(cityName);
  localStorage.setItem("history", JSON.stringify(searchHistory));

  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      // current weather
      var latitude = data.coord.lat;
      var longitude = data.coord.lon;
      var queryFiveDay = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${apiKey}`;

      fetch(queryFiveDay)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          var currentWeatherContainer =
            document.getElementById("current-weather");

          var cityNameEl = document.getElementById("current-city-name");
          cityNameEl.innerHTML = cityName;

          var currentDate = document.getElementById("current-date");

          const date = new Date(data.current.dt * 1000);
          currentDate.innerHTML = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;

          const currentIcon = document.getElementById("current-icon");
          currentIcon.src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;

          var currentTemp = document.getElementById("current-temp");
          currentTemp.innerHTML =
            "Temperature: " +
            Math.floor((data.current.temp - 273.15) * 1.8 + 32);

          var humidity = document.getElementById("current-humidity");
          humidity.innerHTML = "Humidity: " + data.current.humidity;

          var windSpeed = document.getElementById("current-windspeed");
          windSpeed.innerHTML = "Wind Speed: " + data.current.wind_speed;

          var uvi = document.getElementById("current-uvi");
          uvi.innerHTML = "UVI: " + data.current.uvi;

          if (data.current.uvi < 1) {
            uvi.setAttribute("style", "background-color: green");
          } else if (data.current.uvi < 3) {
            uvi.setAttribute("style", "background-color: yellow");
          } else {
            uvi.setAttribute("style", "background-color: red");
          }

          
          // function that creates the 5 day forecast cards
          fiveDayEl.innerHTML = "";
          for (let i = 1; i < 6; i++) {
            console.log(data.daily[i]);
            var daily = data.daily[i];
            var fiveDayCard = document.createElement("div");
            fiveDayCard.classList.add("card")
            
            var dailyTemp = document.createElement("p");
            dailyTemp.innerHTML ="Temperature: " +
              Math.floor((daily.temp.day - 273.15) * 1.8 + 32);
              fiveDayCard.appendChild(dailyTemp);
            
            var dailyIcon = document.createElement("img");
            dailyIcon.setAttribute("src" , `http://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`); 
            fiveDayCard.appendChild(dailyIcon);

            var dailyHumidity = document.createElement("p");
            dailyHumidity.innerHTML = "Humidity: " + daily.humidity;
            fiveDayCard.appendChild(dailyHumidity);
            

            var dailyWindSpeed = document.createElement("p");
            dailyWindSpeed.innerHTML = "Wind Speed: " + daily.wind_speed;
            fiveDayCard.appendChild(dailyWindSpeed);
            fiveDayEl.appendChild(fiveDayCard);


          }
        });
    });
});


