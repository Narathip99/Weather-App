import React, { useState, useEffect, useRef } from "react";
import "./wheather.css";
import searchIcon from "../../assets/search.png";
import humidityIcon from "../../assets/humidity.png";
import windIcon from "../../assets/wind.png";

interface WeatherData {
  humidity: number;
  windSpeed: number;
  temperature: number;
  country: string;
  location: string;
  icon: string;
}

const Wheather = () => {
  //const apiKey = import.meta.env.VITE_API_KEY;
  const apiKey = process.env.API_KEY;
  const inputRef = useRef<HTMLInputElement>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const search = async (city: string) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert("City Not Found");
        return;
      }

      setWeatherData({
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
        temperature: data.current.temp_c,
        country: data.location.country,
        location: data.location.name,
        icon: data.current.condition.icon,
      });
    } catch (error) {
      setWeatherData(null);
      console.log("error:", error);
    }
  };

  useEffect(() => {
    search("bangkok");
  }, []);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputRef.current) {
      search(inputRef.current.value);
    }
  };

  return (
    <div className="wheather">
      <div className="search-bar">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          onKeyPress={handleKeyPress}
        />
        <img
          src={searchIcon}
          alt="Search"
          onClick={() => {
            if (inputRef.current) {
              search(inputRef.current.value);
            }
          }}
        />
      </div>

      {weatherData && (
        <>
          <img
            src={weatherData.icon}
            alt="Weather Icon"
            className="weather-icon"
          />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">
            {weatherData.location}, {weatherData.country}
          </p>
          <div className="wheather-data">
            <div className="col">
              <img src={humidityIcon} alt="Humidity" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={windIcon} alt="Wind Speed" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Wheather;
