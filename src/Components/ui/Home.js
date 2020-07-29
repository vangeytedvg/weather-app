// Get weather for today
import React, { useState, useEffect } from 'react'
import axios from 'axios'

// a33368b2381c90cc3499f94f1d4a2d97 (api key for weatherstack)
// http://api.weatherstack.com/current?access_key=a33368b2381c90cc3499f94f1d4a2d97query=London
// http://api.weatherstack.com/current?access_key=a33368b2381c90cc3499f94f1d4a2d97&query=Geraardsbergen,Belgium

const Home = () => {

    const city = 'Geraardbergen, Belgium'
    const [isLoading, setIsLoading] = useState(true)
    const [errorInf, setErrorInfo] = useState({})
    const [data, setData] = useState([])

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
                console.log(apiResponse)
                setIsLoading(false)
                const { current: {cloudcover, feelslike, humidity, temperature}} = apiResponse
                console.log("RES", cloudcover, feelslike, humidity, temperature)
                setData(apiResponse)
            }).catch(error => {
                console.log(error);
            });

    }, [])

    if (isLoading) {
        return (
            <div>
                Loading
            </div>
        )
    } else {
        return (
            <div>
                {setData.data}
            </div>
        )
    }
}

export default Home