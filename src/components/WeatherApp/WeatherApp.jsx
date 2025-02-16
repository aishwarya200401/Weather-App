import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import { API_KEY } from "../../config";
import { useQueryParams } from "../../hooks/useQueryParams";
import { weatherIconMap } from "../../data/weatherIcon";
import getCurrentLocation from "../../utils/getCurrentLocation";
import clearIcon from "../../assets/clear.png";
import "./weatherApp.css";

function WeatherApp() {
  const query = useQueryParams();
  const navigate = useNavigate();
  const [currentHistory, setCurrentHistory] = useState([]);
  const [text, setText] = useState(query?.city || "");
  const [report, setReport] = useState({
    icon: null,
    temp: 0,
    city: query?.city || "",
    country: "India",
    lat: 0,
    log: 0,
    humidity: 0,
    wind: 0,
    cityNotFound: false,
    loading: false,
  });

  const search = useCallback(
    async (city = text, options) => {
      setReport((prev) => ({ ...prev, loading: true, cityNotFound: false }));

      const url = `https://api.openweathermap.org/data/2.5/weather?${
        options ? options : `q=${city}`
      }&appid=${API_KEY}&units=metric`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.cod === "404") {
          alert(`City "${city}" not found`);
          setReport((prev) => ({
            ...prev,
            loading: false,
            cityNotFound: true,
          }));
          return;
        }

        const weatherIconCode = data.weather?.[0]?.icon || "";
        setReport({
          icon: weatherIconMap[weatherIconCode] || clearIcon,
          temp: Math.floor(data.main.temp),
          city: data.name,
          country: data.sys.country,
          lat: data.coord.lat,
          log: data.coord.lon,
          humidity: data.main.humidity,
          wind: data.wind.speed,
          cityNotFound: false,
          loading: false,
        });
      } catch (error) {
        console.error("An error occurred:", error.message);
        setReport((prev) => ({ ...prev, loading: false }));
      }
    },
    [text]
  );

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory")) || {};
    setCurrentHistory(history.city || []);
  }, []);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        if (query?.city) {
          search(query.city);
        } else if (currentHistory.length > 0) {
          search(currentHistory[0]);
        } else {
          const { coords } = await getCurrentLocation();
          if (isMounted)
            search("", `lat=${coords.latitude}&lon=${coords.longitude}`);
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [query?.city]);

  const handleSearch = () => {
    if (!text.trim()) return;
    const updatedHistory = Array.from(new Set([text, ...currentHistory])).slice(
      0,
      5
    );
    setCurrentHistory(updatedHistory);
    localStorage.setItem(
      "searchHistory",
      JSON.stringify({
        city: updatedHistory.map((city) => city.trim().toLowerCase()),
      })
    );
    navigate(`/?city=${text}`);
  };

  return (
    <>
      <Navbar
        text={text}
        setText={setText}
        handleKeyDown={handleSearch}
        search={search}
        history={currentHistory}
        handleHistoryClick={(city) => navigate(`/?city=${city}`)}
      />
      <div className="container">
        <WeatherDetails report={report} />
      </div>
    </>
  );
}

export default WeatherApp;
