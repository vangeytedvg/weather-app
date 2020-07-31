/**
 * File : Days16.js
 * Gets the weather
 * Uses the ClimaCell API
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

    const API_KEY = 'chUV1F0qLNQnP3aR1BDJGLTjPQAMq78w'
    const URL = "https://api.climacell.co/v3/weather/forecast/daily?lat=50.767&lon=3.867&location_id=Europe%2FBrussels&unit_system=si&start_time=now&end_time=2020-08-07T10%3A00%3A00Z&fields=temp%2Csunrise%2Csunset%2Cvisibility%2Cwind_speed%2Cwind_direction%2Cbaro_pressure%2Cprecipitation%2Cprecipitation_probability%2Cvisibility%2Cweather_code&apikey=chUV1F0qLNQnP3aR1BDJGLTjPQAMq78w"

    const city = 'Geraardbergen, Belgium'
    const [isLoading, setIsLoading] = useState(true)
    const [errorInf, setErrorInfo] = useState({})
    // const [data, setData] = useState([])
    const [weatherData, setWeatherData] = useState({})
    //const [data_twist, setDataList] = useState([])

    let data_list = []
    let data_twist = []

    useEffect(() => {
        console.log('Getting data')
        setIsLoading(true)
        setErrorInfo('')
        
        const params = {
            access_key: 'a33368b2381c90cc3499f94f1d4a2d97',
            query: 'New York'
        }

        axios.get(URL)
            .then(response => {
                const apiResponse = response.data;
                console.log(apiResponse)
                setIsLoading(false)
                const { ...data
                 
                } = apiResponse
                

                for (let i=0; i<9;i++) {
                     data_list.push([{temp:data[i].temp[0].observation_time, min_press: data[i].baro_pressure[0].min.value, max_press:data[i].baro_pressure[1].max.value}])
                }

                console.log('DATA ', data_list)
            
                
                // const icons = weather_icons[0]
                // setWeatherData({ cloudcover, 
                //     feelslike, 
                //     humidity, 
                //     temperature, 
                //     uv_index, 
                //     visibility,
                //     pressure,
                //     precip,
                //     is_day,
                //     observatin_time,
                //     wind_dir,
                //     wind_speed,
                //     description, 
                //     icons })
                //console.log(data)
                setWeatherData(apiResponse)
            }).catch(error => {                
                console.log('ERROR', error)
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
                        {data_list[0]}
                        
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