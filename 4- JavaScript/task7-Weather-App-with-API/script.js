///////////////////////////////////////////////
// DOM Elements
const weatherContainerEl = document.querySelector('.weather');
const invalidCityEl = document.querySelector('.invalid-city');
const inputSearch = document.querySelector('input');
const spinnerEl = document.querySelector('.spinner');

const cityEl = document.querySelector('.city');
const countryCodeEl = document.querySelector('.country-code');
const dateEl = document.querySelector('.date');
const weatherIconEl = document.querySelector('.weather-icon');
const tempEl = document.querySelector('.temp-value');
const conditionEl = document.querySelector('.condition');
const humidityEl = document.querySelector('.humidity-value');
const windSpeedValueEl = document.querySelector('.wind-speed__value');
// Buttons
const btnSearch = document.querySelector('.btn-search');

///////////////////////////////////////////////
// Configuration Variables API
const API_KEY = 'ad630129dcb195dbe81dfe1749754d54';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?units=metric';

///////////////////////////////////////////////
// Fetch Weather Data from (openweathermap) API by city name or coordinates
let controller;
const fetchWeatherData = async (locationQuery) => {
  // Cancle any previous request
  if (controller) controller.abort();
  controller = new AbortController();

  try {
    let res;

    updateUIState({ showSpinner: true });

    // Check if query is by city name or current coordinates
    const isStringQuery = typeof locationQuery == 'string';

    if (isStringQuery) {
      res = await fetch(`${API_URL}&q=${locationQuery}&appid=${API_KEY}`, {
        signal: controller.signal,
      });
    } else {
      const { latitude, longitude } = locationQuery;
      res = await fetch(
        `${API_URL}&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      );
    }

    if (!res.ok) {
      throw new Error(
        isStringQuery
          ? `City (${locationQuery}) Not Found`
          : 'Location not found'
      );
    }

    updateUIState({ showWeather: true });

    const data = await res.json();

    displayWeather(data);
  } catch (err) {
    if (err.name === 'AbortError') return; // The request has been cancelled, just ignore it.
    invalidCityEl.textContent = err.message;
    updateUIState({ showError: true });
  }
};

///////////////////////////////////////////////
// Update UI State
const updateUIState = ({
  showSpinner = false,
  showWeather = false,
  showError = false,
}) => {
  // showSpinner == true => add hidden class and do not display spinner | showSpinner == true => remove hidden class and display spinner
  spinnerEl.classList.toggle('hidden', !showSpinner);
  // showWeather == true => add hidden class and do not display Weather Data | showWeather == true => remove hidden class and display Weather Data
  weatherContainerEl.classList.toggle('hidden', !showWeather);
  // showError == true => add hidden class and do not display Error | showError == true => remove hidden class and display Error
  invalidCityEl.classList.toggle('hidden', !showError);
};

///////////////////////////////////////////////
// Get Current Location
const getCurrentLocation = () => {
  const success = (position) => fetchWeatherData(position.coords);

  const error = () => console.log('Sorry, no position available.');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
};

///////////////////////////////////////////////
// Render Weather Data for Users
//
const updateText = (el, value) => {
  el.textContent = value;
};
//
const displayWeather = (weatherData) => {
  const {
    name: cityName,
    main: { temp, humidity },
    sys: { country },
    wind: { speed: windSpeed },
    dt: timestamp,
  } = weatherData;

  const { description: weatherDescription, main: weatherMain } =
    weatherData.weather[0];

  const date = new Date(timestamp * 1000).toLocaleDateString();

  weatherIconEl.src = `./imgs/${weatherMain}.png`;
  updateText(cityEl, cityName);
  updateText(countryCodeEl, country);
  updateText(dateEl, date);
  dateEl.setAttribute('datetime', date);
  updateText(tempEl, Math.round(temp));
  updateText(conditionEl, weatherDescription);
  updateText(humidityEl, humidity);
  updateText(windSpeedValueEl, windSpeed.toFixed(2));
};

///////////////////////////////////////////////
// Handle button
btnSearch.addEventListener('click', (e) => {
  e.preventDefault();

  const city = inputSearch.value.trim();

  if (!city) return;

  fetchWeatherData(city);
  inputSearch.value = '';
});

// Init by IIFE (Immediately Invoked Function Expression)
(() => {
  getCurrentLocation();
})();
