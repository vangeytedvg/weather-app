/**
 * File : Home.js
 * Gets the current weather for the given location
 * Uses the WeatherStack API
 * Author : Danny Van Geyte
 * LM : 30/07/2020
 */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Spinner, Container
} from 'reactstrap';
import weatherimg from '../../img/weather.jpg'
import n_wind from '../../assets/N.png'
import e_wind from '../../assets/E.png'
import '../../App.css'

// a33368b2381c90cc3499f94f1d4a2d97 (api key for weatherstack)
// http://api.weatherstack.com/current?access_key=a33368b2381c90cc3499f94f1d4a2d97query=London
// http://api.weatherstack.com/current?access_key=a33368b2381c90cc3499f94f1d4a2d97&query=Geraardsbergen,Belgium

const Daily = () => {

    const city = 'Geraardbergen, Belgium'
    const [isLoading, setIsLoading] = useState(false)
    const [errorInf, setErrorInfo] = useState({})
    const [data, setData] = useState([])
    const [weatherData, setWeatherData] = useState({})
    const [query, setQuery] = useState('')


    const search = evt => {
        if (evt.key === "Enter") {
            console.log(query)
            setIsLoading(true)
            axios.get(`http://api.weatherstack.com/current?access_key=a33368b2381c90cc3499f94f1d4a2d97&query=${query}`)
            .then(response => {
                const apiResponse = response.data;
                console.log(apiResponse)
                const { current: { cloudcover, feelslike,
                        humidity, 
                        temperature,
                        weather_descriptions,
                        weather_icons,
                        uv_index,
                        visibility,
                        pressure,
                        precip,
                        is_day,
                        observatin_time,
                        wind_dir,
                        wind_speed
                    } 
                } = apiResponse
                const description = weather_descriptions[0]
                const icons = weather_icons[0]
                setWeatherData({ cloudcover, 
                    feelslike, 
                    humidity, 
                    temperature, 
                    uv_index, 
                    visibility,
                    pressure,
                    precip,
                    is_day,
                    observatin_time,
                    wind_dir,
                    wind_speed,
                    description, 
                    icons })
                console.log("PERIOD", is_day)
                setData(apiResponse)
                setIsLoading(false)
            }).catch(error => {
                console.log(error);
                setIsLoading(false)
            });
        }
    }

    if (isLoading) {
        return (
            <div className="container">
                <Spinner color="primary" />
                Loading weather data, please wait...
            </div>
        )
    } else {
        return (
            <Container>
                <Card className="card">
                    <CardImg className="weatherImg" top width="100%" src={weatherimg} alt="Card image cap"/>
                    <CardBody>
                        <input className="search-box" type="text" placeholder="Enter City, country code"
                             onChange={e => setQuery(e.target.value)}
                             onKeyPress={search}
                             value={query}
                        />
                        <CardTitle>Current weather information</CardTitle>
                        <hr></hr>
                        <CardSubtitle>{weatherData.description}</CardSubtitle>
                        <CardText>Cloudcover : {weatherData.cloudcover}%</CardText>
                        <CardText>visibilty : {weatherData.visibility}km</CardText>
                        <CardText><img src={weatherData.icons} alt="Weather" /></CardText>
                        <CardText>Temperature : {weatherData.temperature}°C/</CardText>
                        <CardText>Feels like : {weatherData.feelslike}°C</CardText>
                        <CardText>UV Index : {weatherData.uv_index}</CardText>
                        <CardText>Precipitation : {weatherData.precip}</CardText>
                        <CardText>Wind direction : {weatherData.wind_dir} speed : {weatherData.wind_speed}kms/h</CardText>
                        <CardText>Air pressure : {weatherData.pressure}hp</CardText>
                        <CardText> {weatherData.is_day === "yes" ? <div>Day</div> : <div>Night</div>}</CardText>
                    </CardBody>
                </Card>
            </Container>
        )
    }
}

export default Daily