import React, { useState } from "react";
const celsiusCoef = 273.5;
const fahrenheitCoef = 459.7;
const celciusType = "Cel";
const fahrType = "Fah";
const windDirections = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const airQualities = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
const tempConverter = (kelvin, tempType) => {
  return tempType === celciusType
    ? Math.round(kelvin - celsiusCoef)
    : Math.round(kelvin * 1.8 - fahrenheitCoef);
};
const getIconUrl = (icon) => {
  return `http://openweathermap.org/img/wn/${icon}@2x.png`;
};

export default function Result(props) {
  const [tempType, setTempType] = useState(celciusType);
  const changeTempType = (val) => {
    if (tempType !== val) setTempType(val);
  };
  let currentDate = new Date(props.current.dt * 1000);
  return (
    <div>
      <div className="result-header">
        <div className="city-name">{`${props.locData?.name}, ${props.locData?.country}`}</div>
        <div className="time">{daysOfWeek[currentDate.getDay()]} {currentDate.toLocaleTimeString()} • {props.current.weather[0].description}</div>
        <br />
        <div className="day-data">
          <div className="half-box">
            <img
              className="temp-icon"
              alt=""
              src={getIconUrl(props.current?.weather[0]?.icon)}
            />
            <span className="temperature">
              {tempConverter(props.current?.temp, tempType)}°
            </span>
            <div className="FC">
              <span
                className={`temp-type ${
                  tempType === fahrType ? "temp-type-active" : ""
                }`}
                onClick={() => changeTempType(fahrType)}
              >
                F
              </span>
              /
              <span
                onClick={() => changeTempType(celciusType)}
                className={`temp-type ${
                  tempType === celciusType ? "temp-type-active" : ""
                }`}
              >
                C
              </span>
            </div>
          </div>
          <div className="half-box">
            <div className="day-data-detail">
              Humidity: {props.current?.humidity}%
            </div>
            <div className="day-data-detail">
              Wind:{" "}
              {Math.round(
                (props.current?.wind_speed / 1000) * 3600 * (tempType === celciusType ? 1 : 0.621371)
              )}{" "}
              {tempType === celciusType ? "KPH " : "MPH "}
              {
                windDirections[
                  Math.round(
                    (props.current?.wind_deg % 360) / 22.5 + 1
                  )
                ]
              }
            </div>
            <div className="day-data-detail">
              Air Quality: {airQualities[props.airPollution - 1]}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="week-data">
          {daysOfWeek.map((day, index) => {
            return (
              <div className="week-data-day" onClick={() => props.onDayClick(props.weatherData?.daily[index])}>
                <div className="day">{daysOfWeek[(index + new Date(props.weatherData.current.dt *1000).getDay()) % 7]} </div>
                <div className="weather-icon">
                  <img
                    className="weather-icon-daily"
                    alt={index}
                    src={getIconUrl(
                      props.weatherData?.daily[index]?.weather[0].icon
                    )}
                  />
                </div>
                <div className="temperature-range">
                  <p className="highest">
                    {tempConverter(
                      props.weatherData?.daily[index]?.temp.max,
                      tempType
                    )}
                    °
                  </p>
                  <p className="lowest">
                    {tempConverter(
                      props.weatherData?.daily[index]?.temp.min,
                      tempType
                    )}
                    °
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
