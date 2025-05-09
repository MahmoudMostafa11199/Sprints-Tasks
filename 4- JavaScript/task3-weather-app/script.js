const tempEl = document.querySelector('.temp-value');
const dateEl = document.querySelector('.date');
const cityEl = document.querySelector('.city');
const inputSearch = document.querySelector('input');
const humidityEl = document.querySelector('.humidity-value');
const conditionEl = document.querySelector('.condition');
const countryCodeEl = document.querySelector('.country-code');
const weatherIconEl = document.querySelector('.weather-icon');

const btnSearch = document.querySelector('.btn-search');

const getWeatherData = (temp, humidity, condition) => {
  try {
    if (!inputSearch.value | !temp || !humidity || !condition)
      throw new Error('Missing weather data');

    displayWeather(temp, humidity, condition);
  } catch (err) {
    alert(err.message);
  }
  tempEl.textContent = temp;
};

const displayWeather = (temp, humidity, condition) => {
  const date = new Date();
  const time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const timeReverse = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;

  weatherIconEl.src = `./imgs/${condition}.png`;
  cityEl.textContent = inputSearch.value;
  countryCodeEl.textContent = 'AE';
  tempEl.textContent = temp;
  humidityEl.textContent = humidity;
  conditionEl.textContent = condition;
  dateEl.setAttribute('datetime', time);
  dateEl.textContent = timeReverse;
};

//
//
// Weather Data simulation
const temp = 28;
const humidity = 60;
const condition = 'clear';

btnSearch.addEventListener('click', (e) => {
  e.preventDefault();

  getWeatherData(temp, humidity, condition);
});
