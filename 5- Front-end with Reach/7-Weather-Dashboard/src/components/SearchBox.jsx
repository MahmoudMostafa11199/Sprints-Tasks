import { useState } from 'react';

function SearchBox({ getWeather, isLoading }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!city.trim()) return;

    getWeather(city);

    setCity('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex items-center gap-3 mb-6 flex-wrap"
    >
      <input
        type="text"
        name="search"
        className="grow text-base bg-white capitalize px-4 py-3 rounded-md border border-blue-400 outline-0 disabled:bg-gray-100"
        placeholder="Enter city name"
        aria-label="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={isLoading}
      />
      <button
        type="submit"
        className="text-xl text-white font-medium bg-blue-400 px-6 py-3 rounded-lg border-0 cursor-pointer disabled:bg-blue-300"
        aria-label="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}

export default SearchBox;
