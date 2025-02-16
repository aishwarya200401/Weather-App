import React from "react";
import humidityIcon from "../../assets/humidity.png";
import windIcon from "../../assets/wind.png";
import "./weatherDetails.css";
import { FallbackLine } from "../FallbackLine";
const date = new Date();

const WeatherDetails = ({ report }) => {
  const {
    icon,
    temp,
    city,
    country,
    lat,
    log,
    humidity,
    wind,
    isLoading,
    cityNotFound,
  } = report;

  return (
    <>
      <section className="weather-details">
        <div className="weather-details-card">
          <div>
            {isLoading || !city ? (
              <FallbackLine
                containerStyle={{}}
                lineStyle={{ height: "1.5rem", width: "50%" }}
              />
            ) : (
              <p className="location">
                {city}, {country}
              </p>
            )}
          </div>
          {date.toDateString()};
          <div className="weather-image">
            {isLoading || !icon ? (
              <FallbackLine
                containerStyle={{}}
                lineStyle={{ height: "100px", width: "100%" }}
              />
            ) : (
              <img src={icon} alt="Weather Icon" width={200} />
            )}
          </div>
          <div className="details">
            {isLoading || !temp ? (
              <FallbackLine
                containerStyle={{}}
                lineStyle={{ height: "2rem", width: "10%" }}
              />
            ) : (
              <p className="temp">{temp}&#8451;</p>
            )}
          </div>
          <div className="cord">
            <div className="cord-wrapper">
              <span className="latitude">Latitude:</span>
              {isLoading || !lat ? (
                <FallbackLine
                  containerStyle={{}}
                  lineStyle={{ height: "1rem", width: "100%" }}
                />
              ) : (
                <span>{lat}</span>
              )}
            </div>
            <div className="cord-wrapper">
              <span className="longtitude">Longtitude: </span>
              {isLoading || !log ? (
                <FallbackLine
                  containerStyle={{}}
                  lineStyle={{ height: "1rem", width: "100%" }}
                />
              ) : (
                <span>{log}</span>
              )}
            </div>
          </div>
          <div className="data-container">
            <div className="element">
              <div className="icon-wrapper">
                <span>Humidity:</span>
              </div>

              <div className="data">
                {isLoading || !humidity ? (
                  <FallbackLine
                    containerStyle={{}}
                    lineStyle={{ height: "1rem", width: "100%" }}
                  />
                ) : (
                  <p>{humidity}%</p>
                )}
              </div>
            </div>
            <div className="element">
              <div className="icon-wrapper">
                <span>Wind Speed:</span>
              </div>

              <div className="data">
                {isLoading || !wind ? (
                  <FallbackLine
                    containerStyle={{}}
                    lineStyle={{ height: "1rem", width: "100%" }}
                  />
                ) : (
                  <p>{wind} km/h</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WeatherDetails;
