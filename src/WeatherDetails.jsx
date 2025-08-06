import humidityIcon from "./assets/humidity.png";
import windIcon from "./assets/windy.png";

const WeatherDetails = ({icon,temp,city,country,lat,log,humidity,wind
}) => {
  return (
    <>
    <div className="image">
        <img src={icon} alt="images" />
    </div>
    <div className="temp">{temp}°C</div>
    <div className="location">{city}</div>
    <div className="country">{country}</div>
    <div className="cord">
        <div>
            <span className="lat">Latitude</span>
            <span>{lat}</span>
        </div>
        <div>
            <span className="log">Longitude</span>
            <span>{log}</span>
        </div>
    </div>

    <div className="data-container">
        <div className="elements">
            <img src={humidityIcon} alt="humidity" className="icon"/>
            <div className="humidity-percentage">{humidity}%</div>
            <div className="text">Humidity</div>
        </div>
        <div className="elements">
            <img src={windIcon} alt="wind" className="icon"/>
            <div className="wind-percentage">{wind} Km/h</div>
            <div className="text">wind speed</div>
        </div>
    </div>
    </>
  )
}

export default WeatherDetails;