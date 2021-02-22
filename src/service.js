import axios from 'axios';
const api_key = "7b649d9669fba62802aa3ca5d865fa34";

export const getCoordinates = async loc => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${loc}&limit=1&appid=${api_key}`
    let data = await axios.get(url);
    return data?.data[0];
}

export const getWeatherData = async (lat,lon, exclude="") => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${api_key}`
    let data = await axios.get(url);
    return data.data;
}

export const getIcons = async loc => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${api_key}`
    let data = await axios.get(url);
    return data?.data[0];
}

export const getAirPollution = async (lat, lon) => {
    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`
    let data = await axios.get(url);
    return data?.data;
}

