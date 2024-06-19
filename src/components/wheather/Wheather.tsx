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
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const inputRef = useRef<HTMLInputElement>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.weatherapi.com/v1/current.json?key=32aa4ef5562e4682a9491323241906&q=${city}&aqi=no`;
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
      setWeatherData(false);
      console.log("error:" + error);
    }
  };

  useEffect(() => {
    search("bangkok");
  }, []);

  return (
    <div className="wheather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img
          src={searchIcon}
          alt=""
          onClick={() => search(inputRef.current.value)}
        />
      </div>

      {weatherData && (
        <>
          <img src={weatherData?.icon} alt="" className="weather-icon" />
          <p className="temperature">{weatherData?.temperature}</p>
          <p className="location">{weatherData?.location}</p>
          <div className="wheather-data">
            <div className="col">
              <img src={humidityIcon} alt="" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={windIcon} alt="" />
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
