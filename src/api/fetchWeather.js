/*
    Gets the weather data from the REST API of openweather
    LM : 06/09/2020 (inside castle)
 */

import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '99d03842186196fa21c1e746f15967a9';

export const fetchWeather = async (query) => {
    const { data } = await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: API_KEY,
        }
    } );

    return data;
}