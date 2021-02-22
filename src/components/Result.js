import React, { useState } from "react";
const celsiusCoef = 273.5;
const fahrenheitCoef = 459.7;
const celciusType = "Cel";
const fahrType = "Fah";
const windDirections = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSW",
  "SW",
  "WSW",
  "W",
  "WNW",
  "NW",
  "NNW",
];
const airQualities = ["Good", "Fair", "Moderate", "Poor", "Very Poor"]
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
  return (
    <div>
      <div className="result-header">
        <div className="city-name">{`${props.locData?.local_names?.en}, ${props.locData?.country}`}</div>
        <div className="time">Sunday 9AM . Overcast Cloud</div>
        <br />
        <div className="day-data">
          <div className="half-box">
            <img
              className="temp-icon"
              src={getIconUrl(props.weatherData?.current?.weather[0]?.icon)}
            />
            <span className="temperature">
              {tempConverter(props.weatherData?.current?.temp, tempType)}°
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
              Humidity: {props.weatherData?.current?.humidity}%
            </div>
            <div className="day-data-detail">
              Wind:{" "}
              {Math.round(
                (props.weatherData?.current?.wind_speed / 1000) * 3600
              )}{" "}
              KPH{" "}
              {
                windDirections[
                  Math.round(
                    (props.weatherData?.current?.wind_deg % 360) / 22.5 + 1
                  )
                ]
              }
            </div>
            <div className="day-data-detail">Air Quality: {airQualities[props.airPollution - 1]}</div>
          </div>
        </div>
      </div>
      <div>
        <div className="week-data">
          <div className="week-data-day">
            <div className="day">Sun </div>
            <div className="weather-icon">
              <img
                className="weather-icon-daily"
                src={getIconUrl(props.weatherData?.daily[0].weather[0].icon)}
              />
            </div>
            <div className="temperature-range">
              <p className="highest">
                {tempConverter(props.weatherData?.daily[0].temp.max, tempType)}°
              </p>
              <p className="lowest">
                {tempConverter(props.weatherData?.daily[0].temp.min, tempType)}°
              </p>
            </div>
          </div>
          <div className="week-data-day">
            <div className="day">Mon </div>
            <div className="weather-icon">
              <img
                className="weather-icon-daily"
                src={getIconUrl(props.weatherData?.daily[1].weather[0].icon)}
              />
            </div>
            <div className="temperature-range">
              <p className="highest">
                {tempConverter(props.weatherData?.daily[1].temp.max, tempType)}°
              </p>
              <p className="lowest">
                {tempConverter(props.weatherData?.daily[1].temp.min, tempType)}°
              </p>
            </div>
          </div>
          <div className="week-data-day">
            <div className="day">Tue </div>
            <div className="weather-icon">
              <img
                className="weather-icon-daily"
                src={getIconUrl(props.weatherData?.daily[2].weather[0].icon)}
              />
            </div>
            <div className="temperature-range">
              <p className="highest">
                {tempConverter(props.weatherData?.daily[2].temp.max, tempType)}°
              </p>
              <p className="lowest">
                {tempConverter(props.weatherData?.daily[2].temp.min, tempType)}°
              </p>
            </div>
          </div>
          <div className="week-data-day">
            <div className="day">Wed </div>
            <div className="weather-icon">
              <img
                className="weather-icon-daily"
                src={getIconUrl(props.weatherData?.daily[3].weather[0].icon)}
              />
            </div>
            <div className="temperature-range">
              <p className="highest">
                {tempConverter(props.weatherData?.daily[3].temp.max, tempType)}°
              </p>
              <p className="lowest">
                {tempConverter(props.weatherData?.daily[3].temp.min, tempType)}°
              </p>
            </div>
          </div>
          <div className="week-data-day">
            <div className="day">Thur </div>
            <div className="weather-icon">
              <img
                className="weather-icon-daily"
                src={getIconUrl(props.weatherData?.daily[4].weather[0].icon)}
              />
            </div>
            <div className="temperature-range">
              <p className="highest">
                {tempConverter(props.weatherData?.daily[4].temp.max, tempType)}°
              </p>
              <p className="lowest">
                {tempConverter(props.weatherData?.daily[4].temp.min, tempType)}°
              </p>
            </div>
          </div>
          <div className="week-data-day">
            <div className="day">Fri </div>
            <div className="weather-icon">
              <img
                className="weather-icon-daily"
                src={getIconUrl(props.weatherData?.daily[5].weather[0].icon)}
              />
            </div>
            <div className="temperature-range">
              <p className="highest">
                {tempConverter(props.weatherData?.daily[5].temp.max, tempType)}°
              </p>
              <p className="lowest">
                {tempConverter(props.weatherData?.daily[5].temp.min, tempType)}°
              </p>
            </div>
          </div>
          <div className="week-data-day">
            <div className="day">Sat </div>
            <div className="weather-icon">
              <img
                className="weather-icon-daily"
                src={getIconUrl(props.weatherData?.daily[6].weather[0].icon)}
              />
            </div>
            <div className="temperature-range">
              <p className="highest">
                {tempConverter(props.weatherData?.daily[6].temp.max, tempType)}°
              </p>
              <p className="lowest">
                {tempConverter(props.weatherData?.daily[6].temp.min, tempType)}°
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
