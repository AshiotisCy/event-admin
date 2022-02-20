import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

export const getWeather = (
  lat: number,
  lon: number,
  date: string,
) =>
  axios.get(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat}%2C${lon}/${date}?unitGroup=metric&key=${API_KEY}&include=fcst`
  );

  

