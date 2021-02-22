import "./App.css";
import React, { useEffect, useState } from "react";
// import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import "./index.css";
import { Input } from "antd";
import { getCoordinates, getWeatherData, getAirPollution } from "./service";
import Loader from "react-loader-spinner";
import Result from "./components/Result";
import NotFound from "./components/NotFound";

function App() {
  const [locData, setLocData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [airPollution, setAirPollution] = useState(null);
  useEffect(() => {
    (async () => {
      let coorData = await getCoordinates("Hanoi");
      if (coorData) {
        setLocData(coorData);
        let weatherData = await getWeatherData(coorData.lat, coorData.lon);
        setWeatherData(weatherData);
        let airPollution = await getAirPollution(coorData.lat, coorData.lon);
        setAirPollution(airPollution?.list[0]?.main?.aqi);
        setLoading(false)
      } else {
        setLocData(null);
        setWeatherData(null);
        setAirPollution(null);
        setLoading(false);
      }
    })();
  }, []);
  const onSearch = async (cityName) => {
    setLoading(true);
    let coorData = await getCoordinates(cityName);
    if (coorData) {
      setLocData(coorData);
      let weatherData = await getWeatherData(coorData.lat, coorData.lon);
      setWeatherData(weatherData);
      let airPollution = await getAirPollution(coorData.lat, coorData.lon);
      setAirPollution(airPollution?.list[0]?.main?.aqi);
      setLoading(false)
    }
    else {
      setLocData(null);
      setWeatherData(null);
      setAirPollution(null);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Input.Search
        allowClear
        name="city"
        placeholder="Enter city"
        onSearch={(value) => onSearch(value)}
        disabled={loading ? true : false}
      />
      <br />
      <br />
      <div className={`result ${loading ? "flex-center-box" : ""}`} >  
        {loading ? 
          <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
        />
        : ( !loading && !locData ? <NotFound/> : <Result weatherData={weatherData} locData={locData} airPollution={airPollution}/>)}
      </div>
    </div>
  );
}

export default App;
