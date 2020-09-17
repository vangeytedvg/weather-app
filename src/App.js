import React, { useState } from "react";
import { getCardinal } from "./utils/WindDirections";
import { fetchWeather } from "./api/fetchWeather";
import "./App.css";

const App = () => {
    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});

    const search = async (e) => {
        if (e.key === "Enter") {
            const data = await fetchWeather(query);
            setWeather(data);
            //setQuery("");
        }
    };

    return (
        <div className="main-container">
            <input
                type="text"
                className="search"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={search}
            />
            <div className="remember">
                <input type="checkbox" id="remember" value=""/>
                <label className="remember-label" htmlFor="remember">Remember location</label>
            </div>
            {weather.main && (
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <div className="city">
                                <h2 className="city-name">
                                    <span>{weather.name}</span>
                                    <sup>{weather.sys.country}</sup>
                                </h2>
                                <div className="city-temp">
                                    {Math.round(weather.main.temp)}
                                    <sup>&deg;C</sup>
                                </div>
                                <div className="info">
                                    <img
                                        className="city-icon"
                                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                        alt={weather.weather[0].description}
                                    />
                                    <p>{weather.weather[0].description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flip-card-back">
                            <h1 className="card-back-title">Detail</h1>
                            <div className="feels-like">
                                Feels like{" "}
                                <span className="info-label">
                                    {Math.round(weather.main.feels_like)}
                                    <sup>&deg;C</sup>
                                </span>
                            </div>
                            <div className="feels-like">
                                Humidity{" "}
                                <span className="info-label">
                                    {Math.round(weather.main.humidity)}
                                    <sup>%</sup>
                                </span>
                            </div>
                            <div className="feels-like">
                                Pressure{" "}
                                <span className="info-label">
                                    {weather.main.pressure}
                                    <sup>hPa</sup>
                                </span>
                            </div>
                            <div className="feels-like">
                                Wind direction{" "}
                                <span className="info-label">
                                    {getCardinal(weather.wind.direction)}
                                </span>
                            </div>
                            <div className="feels-like">
                                Wind speed{" "}
                                <span className="info-label">
                                    {weather.wind.speed}
                                    <sup>km/h</sup>
                                </span>
                            </div>
                            <div className="feels-like">
                                Visibility{" "}
                                <span className="info-label">
                                    {weather.visibility / 1000}
                                    <sup>km</sup>
                                </span>
                            </div>
                            <div className="feels-like">
                                Sunrise{" "}
                                <span className="info-label">
                                    {new Date(
                                        weather.sys.sunrise * 1000
                                    ).toLocaleTimeString()}
                                </span>
                            </div>
                            <div className="feels-like">
                                Sunrise{" "}
                                <span className="info-label">
                                    {new Date(
                                        weather.sys.sunset * 1000
                                    ).toLocaleTimeString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
