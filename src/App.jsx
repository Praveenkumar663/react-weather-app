import { useEffect, useState } from 'react';
import WeatherDetails from './WeatherDetails';
import './App.css';

/* images */
import searchIcon from "./assets/search.png";
import sunnyIcon from "./assets/sunny.png";
import cloudIcon from "./assets/cloudy.jpeg";
import rainIcon from "./assets/rain.png";
import snowIcon from "./assets/snow.jpeg";
import drizzleIcon from "./assets/Drizzle.png";





function App() {

   let API_key="41d028c72045fea048e6b2c7d981c6c6";
   const [text,setText]=useState("chennai");

  const [icon,setIcon]=useState(sunnyIcon);
  const [temp,setTemp]=useState(0);
  const [city,setCity]=useState("");
  const [country,setCountry]=useState("");
  const [lat,setLat]=useState(0);
  const [log,setLog]=useState(0);
  const [humidity,setHumidity]=useState(0);
  const [wind,setWind]=useState(0);

  const [cityNotFound,setCityNotFound]=useState(false);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);

const weatherIconMap={
  "01d":sunnyIcon,
  "01n":sunnyIcon,
  "02d":cloudIcon,
  "02n":cloudIcon,
  "03d":drizzleIcon,
  "03n":drizzleIcon,
  "04d":drizzleIcon,
  "04n":drizzleIcon,
  "09d":rainIcon,
  "09n":rainIcon,
  "10d":rainIcon,
  "10n":rainIcon,
  "13d":snowIcon,
  "13n":snowIcon,
};

const search =async ()=>{
  setLoading(true);

let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${API_key}&units=Metric`;
try {
  let res=await fetch(url);
  let data=await res.json();
  if (data==="404") {
    console.error("citynotfound");
    setCityNotFound(true);
    setLoading(false);
    return;
  }

  setHumidity(data.main.humidity);
  setWind(data.wind.speed);
  setTemp(Math.floor(data.main.temp))
  setCity(data.name);
  setCountry(data.sys.country);
  setLat(data.coord.lat);
  setLog(data.coord.lon);
  const weatherIconCode=data.weather[0].icon;
  setIcon(weatherIconCode[weatherIconCode] || sunnyIcon);
 setCityNotFound(false);

} catch (error) {
  console.error("An error Occured:"+ error.message);
  setError("An error occured while fetching weather data.");
}finally{
   setLoading(false);
}
}

const handleCity=(e)=>{
  setText(e.target.value);
}

const handleOnkeyDown=(e)=>{
  if(e.key==="Enter"){
    search();
  }
}

useEffect(()=>{
search();},[]); 

  return (
    <>
      <div className='container'>
        <div className="input-container">
          <input type="text" placeholder='Search City' className="cityInput" onChange={handleCity} value={text} onKeyDown={handleOnkeyDown} />
          <div className="search-icon" onClick={()=>search()}>
            <img src={searchIcon} alt="searchIcon" />
          </div>
        </div>

        {loading && <div className="loading-message">Loading...</div>}
        {error && <div className="error-message">{error}</div>}
        {cityNotFound &&<div className="city-not-found">City not found</div>}

        {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind}/>}
      </div>

    </>
  )
}

export default App
