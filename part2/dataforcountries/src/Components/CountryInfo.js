import React from "react";
import { useEffect,useState } from "react";
import axios from "axios";

const CountryInfo = ({country}) => {
    const [weather, setWeather] = useState([])

    //Gets the Weather in the capital of a country
    const getCapitalWeather = () => {
        console.log("Sending Get request to WeatherAPI")
        // "const weather_api_key = process.env.REACT_APP_API_KEY"
        const weather_api_key = "2cb82bbfdc2cdea731cea51c3384ac87"
        // axios.get(`http://api.weatherstack.com/current?access_key=${weather_api_key}&query=${country.capital[0]},${country.name.common}`) //Get request to api (query="Capital","Country")
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${weather_api_key}&units=metric`) //Get request to api (query="Capital","Country")
          .then( response => {
            console.log("Weather Response Fulfilled")
            const weatherResponse = [response.data]  //Stores weather  in state
            setWeather(weatherResponse)             //countries are stored in the state
          } )
    }
    useEffect(getCapitalWeather,[])
    //Gets the temperature from the alreade stored weather
    const getTemperature = () => weather.length === 0 ? "NO DATA" :weather[0].main.temp

    //Gets Image from already stored weather
    const getWeatherIcon = () => weather.length === 0 ? "NO DATA" :`http://openweathermap.org/img/wn/${weather[0].weather[0].icon}@2x.png`

    //Gets Wind speed and direction from already stored data in state 
    const getWind = () => weather.length === 0 ? "NO DATA"        :weather[0].wind.speed.toString() + " m/s direction " + weather[0].wind.deg.toString() + " degrees."

    return <div>
    <h2>{country.name.common}</h2>
    <p>
        Capital: {country.capital[0] }
        <br></br>
        cca2: {country.cca2} 
    </p>

    <h3>Languages</h3>
    <ul>
        {Object.values(country.languages).map(lang => <li key = {lang}> {lang} </li>) }
    </ul>
    
    <img src={country.flags.png} alt={country.name.common + "flag"} width="150" height="100"></img>

    <h3>Weather in {country.capital[0]}</h3>

    <p>
        <strong>Temperature:</strong> {getTemperature()}
    </p>
    <img src={getWeatherIcon()} alt={country.name.common + "weather icon"} width="75px" height="75px"></img>
    <p>
        <strong>Wind:</strong> {getWind()}
    </p>


</div>

}



export default CountryInfo