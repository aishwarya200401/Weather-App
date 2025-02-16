import React from 'react';
import humidityIcon from '../assets/humidity.png';
import windIcon from '../assets/wind.png';

const WeatherDetails = ({ report }) => {
    const { icon, temp, city, country, lat, log, humidity, wind, isLoading, cityNotFound } = report;

    if (cityNotFound) {
        return <p className="alert">City not found. Try again.</p>;
    }
    return (
        <>
            {isLoading && <p>Loading...</p>}
            <div className="image">
                <img src={icon} alt="Weather Icon" width={200} />
            </div>
            <div className="temp">{temp}&#8451;</div>
            <div className="location">{city} </div>
            <div className="country">{country}</div>
            <div className="cord">
                <div>
                    <span className="latitude">Latitude:</span>
                    <span>{lat}</span>
                </div>
                <div>
                    <span className="longtitude">Longtitude: </span>
                    <span>{log}</span>
                </div>
            </div>
            <div className="data-container">
                <div className="element">
                    <img src={humidityIcon} alt="Humidity" className="icon" />
                    <div className="data">
                        <p>{humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="element">
                    <img src={windIcon} alt="Wind" className="icon" />
                    <div className="data">
                        <p>{wind} km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WeatherDetails;
