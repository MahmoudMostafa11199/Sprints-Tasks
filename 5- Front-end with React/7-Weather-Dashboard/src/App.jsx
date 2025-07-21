import { useWeather } from './hooks/useWeather';

import SearchBox from './components/SearchBox';
import WeatherCard from './components/WeatherCard';
import Spinner from './components/Spinner';

import './App.css';

function App() {
  const { weatherData, isLoading, error, getWeather } = useWeather();

  return (
    <div className="weather-app">
      <div className="flex justify-center items-center gap-4 mb-12">
        <img
          src="/imgs/mist.png"
          className="w-20 h-20 sm:w-24 sm:h-24"
          alt="weather app icon"
        />
        <h1 className="text-3xl font-semibold md:text-4xl">Weather App</h1>
      </div>

      <SearchBox getWeather={getWeather} isLoading={isLoading} />

      <div className="bg-white px-6 py-4 rounded-[10px]">
        {isLoading && <Spinner />}

        {error && <p className="text-red-500 text-center">{error}</p>}

        {!error && !isLoading && (
          <WeatherCard
            weatherData={weatherData}
            isLoading={isLoading}
            error={error}
          />
        )}
      </div>
    </div>
  );
}

export default App;
