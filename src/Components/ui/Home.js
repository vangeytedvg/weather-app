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
import N from '../../assets/N.png'
import E from '../../assets/E.png'
import NE from '../../assets/E.png'
import ESE from '../../assets/E.png'
import NW from '../../assets/E.png'
import S from '../../assets/E.png'
import SW from '../../assets/E.png'
import SE from '../../assets/SE.png'
import W from '../../assets/E.png'
import UVIndex from '../../assets/UVindex.png'
import clouds from '../../assets/clouds.jpg'
import precipitation from '../../assets/precipitation.jpg'
import baro from '../../assets/barometer.png'


// a33368b2381c90cc3499f94f1d4a2d97 (api key for weatherstack)
// http://api.weatherstack.com/current?access_key=a33368b2381c90cc3499f94f1d4a2d97query=London
// http://api.weatherstack.com/current?access_key=a33368b2381c90cc3499f94f1d4a2d97&query=Geraardsbergen,Belgium

const Home = () => {

    const city = 'Geraardbergen, Belgium'
    const [isLoading, setIsLoading] = useState(true)
    const [errorInf, setErrorInfo] = useState({})
    //const [data, setData] = useState([])
    const [weatherData, setWeatherData] = useState({})

    let winddir = ''

    const imgUrlBuilder = (w) => {
        switch (w) {
            case 'N':
                return N
            case 'E':
                return E
            case 'NE':
                return NE
            case 'ESE':            
                return ESE
            case 'NW':
                return NW
            case 'S':
                return S
            case 'SW':
                return SW
            case 'SE':
                return SE
            case 'W':
                return W
            default:
                return N
        }
    }

    useEffect(() => {
        setIsLoading(true)
        setErrorInfo('')
        const params = {
            access_key: 'a33368b2381c90cc3499f94f1d4a2d97',
            query: 'New York'
        }

        axios.get('http://api.weatherstack.com/current?access_key=a33368b2381c90cc3499f94f1d4a2d97&query=Geraardsbergen,Belgium')
            .then(response => {
                const apiResponse = response.data;
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
                setWeatherData({
                    cloudcover,
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
                    icons
                })
                //setData(apiResponse)


            }).catch(error => {
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
                        <CardText>
                            <img className="uv-image" src={clouds} alt="Weather" />
                            Cloudcover : {weatherData.cloudcover}%</CardText>
                        <CardText>visibilty : {weatherData.visibility}km</CardText>
                        <CardText><img src={weatherData.icons} alt="Weather" /></CardText>
                        <CardText>Temperature : {weatherData.temperature}°C/</CardText>
                        <CardText>Feels like : {weatherData.feelslike}°C</CardText>
                        <CardText><img className="uv-image" src={UVIndex}/>UV Index : {weatherData.uv_index}</CardText>
                        <CardText>
                            <img className="uv-image" src={precipitation} alt="Weather" />
                            Precipitation : {weatherData.precip}</CardText>
                        <CardText>
                            <img className="wind-image" src={imgUrlBuilder(weatherData.wind_dir)} alt="Weather" />
                            Wind direction : {weatherData.wind_dir}
                            speed : {weatherData.wind_speed}kms/h</CardText>
                        <CardText>
                            <img className="uv-image" src={baro} alt="Weather" />
                            Air pressure : {weatherData.pressure}hp</CardText>
                        <CardText> {weatherData.is_day === "yes" ? <div>Day</div> : <div>Night</div>}</CardText>
                    </CardBody>
                </Card>
            </Container>
        )
    }
}

export default Home