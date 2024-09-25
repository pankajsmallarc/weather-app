import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');

  console.log(weatherData);

  const getData = (event) => {
    event.preventDefault();
    setCity('');
    fetchWeatherData();
  };

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0848501f1b25e0e7582a1df0207349d1`);
      const data = response.data;
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null); // Reset weather data or handle error as needed
    }
  };
  

  return (
    <div className="bg-teal-500 min-h-screen p-10">
      <h1 className="text-2xl text-white font-bold">Simple Weather App</h1>
      <form className="pt-8 mb-10" onSubmit={getData}>
        <input className="p-2" type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City Name" />
        <button className="bg-blue-950 text-white p-2" type="submit">Submit</button>
      </form>
      {weatherData ? (
        <div className="bg-white font-semibold w-80 p-5 text-left ml-96">
          <h2 className="text-xl font-bold">Weather Information</h2>
          <p>City: {weatherData?.name} <span className="font-extrabold">{weatherData?.sys?.country}</span></p>
          <p>Temperature: {(weatherData?.main?.temp - 273.15).toFixed(2)}°C</p>
          <p>Humidity: {weatherData?.main?.humidity}%</p>
          <p>Description: {weatherData?.weather[0].description}</p>
        </div>
      ) : (
        "No weather data"
      )}
    </div>
  );
};

export default App;
