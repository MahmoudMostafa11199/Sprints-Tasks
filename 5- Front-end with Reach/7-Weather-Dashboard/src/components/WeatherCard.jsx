function WeatherCard({ weatherData, error }) {
  if (!Object.keys(weatherData).length && !error) {
    return (
      <p className="text-center bg-white px-6 py-4 rounded-[10px]">
        No weather data yet. Please search for a city.
      </p>
    );
  }

  return (
    <>
      <h4 className="text-3xl font-medium py-2 mb-4">
        {weatherData.name} — {weatherData.sys.country}
      </h4>

      <div className="flex flex-col items-center mb-8">
        <img
          src={`/imgs/${weatherData.weather[0].main.toLowerCase()}.png`}
          className="w-24 h-24"
          alt={weatherData.weather[0].description}
        />
        <p className="text-3xl font-bold">
          <span className="text-4xl">{weatherData.main.temp.toFixed(2)}</span>
          °C
        </p>
        <p className="text-xl">{weatherData.weather[0].main}</p>
      </div>
      <div className="flex items-center justify-between gap-3 gap-y-6 flex-wrap">
        <div className="flex items-center gap-3">
          <img src="/weather.png" alt="humidity-img" className="w-14 h-14" />
          <div className="text-start">
            <p className="text-xl">{weatherData.main.humidity} %</p>
            <h5 className="text-sm">Humidity</h5>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <img src="/windy.png" alt="windy-speed-img" className="w-14 h-14" />
          <div className="text-start">
            <p className="text-xl">{weatherData.wind.speed} km/h</p>
            <h5 className="text-sm">Wind Speed</h5>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <img src="/pressure.png" alt="pressure-img" className="w-14 h-14" />
          <div className="text-start">
            <p className="text-xl">{weatherData.main.pressure} hPa</p>
            <h5 className="text-sm">Pressure</h5>
          </div>
        </div>
      </div>
    </>
  );
}

export default WeatherCard;
