// Get weather for today
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Spinner, Container
} from 'reactstrap';

// a33368b2381c90cc3499f94f1d4a2d97 (api key for weatherstack)
// http://api.weatherstack.com/current?access_key=a33368b2381c90cc3499f94f1d4a2d97query=London
// http://api.weatherstack.com/current?access_key=a33368b2381c90cc3499f94f1d4a2d97&query=Geraardsbergen,Belgium

const Home = () => {

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
        axios.get('http://api.weatherstack.com/current?access_key=a33368b2381c90cc3499f94f1d4a2d97&query=Geraardsbergen,Belgium')
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
                        visibilty,
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
                    visibilty,
                    pressure,
                    precip,
                    is_day,
                    observatin_time,
                    wind_dir,
                    wind_speed,
                    description, 
                    icons })
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
                    <CardBody>
                        <CardTitle>Current weather information</CardTitle>
                        <CardSubtitle>{weatherData.description}</CardSubtitle>
                        <CardText>Cloudcover : {weatherData.cloudcover}%</CardText>
                        <CardText>Temperature : {weatherData.temperature}°C/</CardText>
                        <CardText>Feels like : {weatherData.feelslike}°C</CardText>
                        <CardText><img src={weatherData.icons} alt="Weather" /></CardText>
                        <Button>Button</Button>
                    </CardBody>
                </Card>
            </Container>
        )
    }
}

export default Home