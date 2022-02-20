import * as weatherIcons from "../../icons";

const GetWeatherIcon = (weatherIcon: string) => {
  switch (weatherIcon) {
    case "clear-day":
      return <img src={weatherIcons.clearDay} alt="" />;
    case "clear-night":
      return <img src={weatherIcons.clearNight} alt="" />;
    case "cloudy":
      return <img src={weatherIcons.cloudy} alt="" />;
    case "fog":
      return <img src={weatherIcons.fog} alt="" />;
    case "hail":
      return <img src={weatherIcons.hail} alt="" />;
    case "partly-cloudy-day":
      return <img src={weatherIcons.partlyCloudyDay} alt="" />;
    case "partly-cloudy-night":
      return <img src={weatherIcons.partlyCloudyNight} alt="" />;
    case "rain-snow-showers-day":
      return <img src={weatherIcons.rainSnowShowersDay} alt="" />;
    case "rain-snow-showers-night":
      return <img src={weatherIcons.rainSnowShowersNight} alt="" />;
    case "rain-snow":
      return <img src={weatherIcons.rainSnow} alt="" />;
    case "rain":
      return <img src={weatherIcons.rain} alt="" />;
    case "showers-day":
      return <img src={weatherIcons.showersDay} alt="" />;
    case "showers-night":
      return <img src={weatherIcons.showersNight} alt="" />;
    case "snow-showers-day":
      return <img src={weatherIcons.snowShowersDay} alt="" />;
    case "snow-showers-night":
      return <img src={weatherIcons.snowShowersNight} alt="" />;
    case "snow":
      return <img src={weatherIcons.snow} alt="" />;
    case "thunder-rain":
      return <img src={weatherIcons.thunderRain} alt="" />;
    case "thunder-showers-day":
      return <img src={weatherIcons.thunderShowersDay} alt="" />;
    case "thunder-showers-night":
      return <img src={weatherIcons.thunderShowersNight} alt="" />;
    case "thunder":
      return <img src={weatherIcons.thunder} alt="" />;
    case "wind":
      return <img src={weatherIcons.wind} alt="" />;
    default:
      return;
  }
};

export default GetWeatherIcon;
