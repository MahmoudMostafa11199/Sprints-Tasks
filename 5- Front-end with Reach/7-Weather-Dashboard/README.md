# Weather Dashboard ☀️

[Live Demo](https://weather-app-sprints-mahmoud.netlify.app/)

A simple and responsive weather dashboard built with React.js and Tailwind CSS. It allows users to search for a city and instantly get real-time weather information, including temperature, humidity, pressure, wind speed, and sky conditions.

---

## 📦 Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/weather-dashboard.git
   cd weather-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

---

## 🔐 API Key Instructions

This project uses the **OpenWeatherMap API**.

1. Create a free account at [openweathermap.org](https://openweathermap.org/api).
2. Get your API key from the dashboard.
3. Replace the `API_KEY` value in `App.jsx`:

   ```js
   const API_KEY = 'YOUR_API_KEY_HERE';
   ```

> You can also use an `.env` file and import it via `import.meta.env` if you prefer keeping the key secret.

---

## 💡 Feature Overview

- 🔍 **Weather Search**: Enter any city and get real-time weather.

- 🌡️ **Weather Details**:

  - City & Country
  - Temperature (°C)
  - Weather condition (with dynamic icon)
  - Humidity (%)
  - Wind speed (m/s)
  - Pressure (hPa)

- 🔁 **Loading & Error Handling**:

  - Shows spinner while fetching.
  - Displays meaningful error if request fails or times out.

- 📱 **Responsive Design**:

  - Works on mobile and desktop
  - Clean and accessible UI

---

## 🧪 Testing Instructions

- Open the live demo or run locally.
- Try searching for a city like: `Cairo`, `London`, `Tokyo`.
- Try searching for a wrong or misspelled city to test error handling.
- Wait more than 5 seconds to simulate timeout error (custom `fetchWithTimeout`).

---

## 🛠 Tech Stack

- **React.js** with functional components and hooks
- **Tailwind CSS** for styling
- **OpenWeatherMap API**

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── SearchBox.jsx
│   └── WeatherCard.jsx
│   └── Spinner.jsx
├── hooks/
│   ├── useWeather.js
│   ├── useWeather.js
├── App.jsx
├── App.css
└── main.jsx
```
