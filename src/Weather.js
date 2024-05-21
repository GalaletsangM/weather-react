import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default function Weather() {
  let [city, setCity] = useState("SanFrancisco");
  //let [loaded, setLoaded] = useState(true);
  const [weather, setWeather] = useState({});
  const [heading, setHeading] = useState(`${city}`);
  const [date, setDate] = useState("Wednesday, 21:48")

  function displayWeather(response) {
    console.log(response.data.main);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
    //let setDate = new Date(response.data.time * 1000);
  }

  function handleSubmit(event) {
    setHeading(`${city}`);
    event.preventDefault();
    let apiKey = "99b8f9330a1bfba3a85e523fd3c2e528";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
    
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Enter a city.." onChange={updateCity} />
      <button type="submit" className="button">
        Search
      </button>
    </form>
  );

  
  return (
    <div className="app">
      <div className="weatherContent">
        <div className="form">{form}</div>
        <Container>
          <Row>
            <Col>
              <h1 className="heading">{heading}</h1>
              <ul className="list">
                <li>
                  <span></span> Wednesday, 21:48.{" "}
                  <span>{weather.description}</span>
                </li>
                <li>
                  Humidity: <strong>{weather.humidity}</strong>%, Wind{" "}
                  <strong>{weather.wind}</strong>km/h
                </li>
              </ul>
            </Col>
            <Col>
              <div className="temperature-container">
                <span>
                  <img src={weather.icon} alt={weather.description} />
                </span>
                <span className="temp">{Math.round(weather.temperature)}</span>
                <span className="unit">°C</span>
              </div>
            </Col>
          </Row>
        </Container>
        <Container className="weatherForecast">
          <Row>
            <Col>
              <p>Tue</p>
              
            </Col>
            <Col><p>Wed</p></Col>
            <Col><p>Thu</p></Col>
            <Col><p>Fri</p></Col>
            <Col><p>Sat</p></Col>
            <Col><p>Sun</p></Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
