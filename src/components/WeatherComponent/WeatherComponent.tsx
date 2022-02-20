import { useEffect, useState } from "react";
import GetWeatherIcon from "./GetWeatherIcon";
import "./WeatherComponent.css";

const WeatherComponent = (props: { WeatherData: any }) => {
  const [weatherData, setWeatherData] = useState<any>();
  useEffect(() => {
    if (Object.entries(props.WeatherData).length !== 0) {
      setWeatherData(props.WeatherData.days[0]);
    }
  }, [props]);

  return (
    <div className="Weather-Wrapper">
      {weatherData !== undefined && weatherData?.icon !== '' ? (
        <>
          <div className="Weather-Icon">{GetWeatherIcon(weatherData.icon)}</div>
          <div className="Weather-Temp">{weatherData.temp} &deg;C</div>
          <div className="Weather-Description">{weatherData.description}</div>
          <div className="Weather-Min-Max-Table">
            <div>Min Temperature: {weatherData.tempmin} &deg;C</div>
            <div>Max Temperature: {weatherData.tempmax} &deg;C</div>
          </div>
        </>
      ) : (
        <div className="Weather-Spinner">
          No Available Weather Information for the Selected Date
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
