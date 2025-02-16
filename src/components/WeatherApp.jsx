import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import WeatherDetails from './WeatherDetails';
import clearIcon from '../assets/clear.png';
import cloudIcon from '../assets/cloud.png';
import drizzleIcon from '../assets/drizzle.png';
import rainIcon from '../assets/rain.png';
import snowIcon from '../assets/snowy.png';
import { API_KEY } from '../config';
import { useQueryParams } from '../hooks/useQueryParams';

function WeatherApp() {
    const query = useQueryParams();
    const [currentHistory, setCurrentHisory] = useState([])
    const [text, setText] = useState(query?.city || '');
    const [history, setHistory] = useState([]);
    const [report, setReport] = useState({
        icon: snowIcon,
        temp: 0,
        city: query?.city || '',
        country: 'India',
        lat: 0,
        log: 0,
        humidity: 0,
        wind: 0,
        cityNotFound: false,
        loading: false,
    });

    const weatherIconMap = {
        "01d": clearIcon,
        "01n": clearIcon,
        "02d": cloudIcon,
        "02n": cloudIcon,
        "03d": drizzleIcon,
        "03n": drizzleIcon,
        "04d": drizzleIcon,
        "04n": drizzleIcon,
        "09d": rainIcon,
        "09n": rainIcon,
        "10d": rainIcon,
        "10n": rainIcon,
        "13d": snowIcon,
        "13n": snowIcon,
    };

    const search = async (city) => {
        setReport((prev) => ({ ...prev, loading: true, cityNotFound: false }));
        const searchCity = city || text;
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`;

        try {
            let res = await fetch(url);
            let data = await res.json();

            if (data.cod === "404") {
                setReport((prev) => ({ ...prev, cityNotFound: true, loading: false }));
                return;
            }

            setHistory((prevHistory) => [
                searchCity,
                ...prevHistory.filter((item) => item !== searchCity).slice(0, 4),
            ]);

            const weatherIconCode = data.weather[0].icon;

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
            console.log("An error occurred:", error.message);
            setReport((prev) => ({ ...prev, loading: false }));
        }
    };

    useEffect(() => {
        const history = localStorage.getItem('searchHistory')
        console.log(history)
        if (history) {
            const parsedHistory = JSON.parse(history)
            console.log(parsedHistory)
            if (parsedHistory && parsedHistory.city) setCurrentHisory(parsedHistory.city)
            else setCurrentHisory([])
        }
    }, [])

    useEffect(() => {
        if (query?.city) {
            search(query.city);
        }
    }, [query?.city]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setCurrentHisory((prev) => ([...prev, text]))
            localStorage.setItem('searchHistory', JSON.stringify({ city: [...currentHistory,text] }))
            window.location.replace(`/?city=${text}`)
        }
    };

    const handleHistoryClick = (city) => {
        setText(city);
        search(city);
    };

    return (
        <>
            <Navbar text={text} setText={setText} handleKeyDown={handleKeyDown} search={search} history={currentHistory} handleHistoryClick={handleHistoryClick} />
            <div className="container">
                <WeatherDetails report={report} />
            </div>
        </>
    );
}

export default WeatherApp;
