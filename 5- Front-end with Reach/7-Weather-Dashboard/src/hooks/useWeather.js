import { useState } from 'react';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'ad630129dcb195dbe81dfe1749754d54';

export function useWeather() {
  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWithTimeout = (url, timeout = 5000) => {
    const res = Promise.race([
      fetch(url),
      new Promise((_, reject) =>
        setTimeout(
          () =>
            reject(new Error('Request took too long. Please try again later.')),
          timeout
        )
      ),
    ]);

    return res;
  };

  const getWeather = async (query) => {
    try {
      setIsLoading(true);
      setError(null);

      if (query == weatherData?.name) return;

      const res = await fetchWithTimeout(
        `${API_URL}?q=${query}&appid=${API_KEY}&units=metric`
      );

      if (!res.ok) {
        const errorData = await res.json();
        if (res.status === 404 && errorData.message === 'city not found') {
          // if city not found, show this error
          throw new Error(
            'City not found. Please check the spelling and try again.'
          );
        } else {
          // any other error
          throw new Error('Something went wrong. Please try again later.');
        }
      }

      const data = await res.json();

      setWeatherData(data);
    } catch (err) {
      setError(
        err.message === 'Failed to fetch'
          ? // Show this error if the network is disconnected or there is a network problem
            'Network error. Please check your internet connection.'
          : err.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { weatherData, isLoading, error, getWeather };
}
