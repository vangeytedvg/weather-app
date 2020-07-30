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

const Days16 = () => {    

    const city = 'Geraardbergen, Belgium'
    const [isLoading, setIsLoading] = useState(true)
    const [errorInf, setErrorInfo] = useState({})
    const [data, setData] = useState([])
    const [weatherData, setWeatherData] = useState({})

    useEffect(() => {
        console.log('Getting data')
        setIsLoading(true)
        setErrorInfo('')
        const params = {
            access_key: 'a33368b2381c90cc3499f94f1d4a2d97',
            query: 'New York'
        }

        axios.get('http://api.weatherstack.com/current?access_key=a33368b2381c90cc3499f94f1d4a2d97&query=Geraardsbergen,Belgium&forecast_days=10&hourly=0')
            .then(response => {
                const apiResponse = response.data;
                console.log(apiResponse)
                setIsLoading(false)
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
            }).catch(error => {
                console.log(error);
                setIsLoading(false)
            });

    }, [])

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
                    <CardImg className="weatherImg" top width="100%" src={weatherimg} alt="Card image cap" />
                    <CardBody>
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
                        <CardText> {weatherData.is_day==="yes" ? <div>Day</div>: <div>Night</div>}</CardText>
                    </CardBody>
                </Card>
            </Container>
        )
    }
}

export default Days16