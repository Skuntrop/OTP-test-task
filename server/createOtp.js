const axios = require("axios")
const config = require("config")
const cities = require("./cities");

//create OTP logic

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

async function getWeather(city) {
    const weather = await axios.get(config.get("weatherUrl") + city)
    return Math.abs(Math.floor(weather.data.current.temp_c))
}

function getCorrectNumbers(firstCity, secondCity, thirdCity) {
    if (firstCity < 10) firstCity = "0" + firstCity
    if (secondCity < 10) secondCity = "0" + secondCity
    if (thirdCity < 10) thirdCity = "0" + thirdCity
    return firstCity + secondCity + thirdCity
}

async function createOtp(req) {
    const firstCity = await getWeather(cities[getRandomInt(cities.length)])
    const secondCity = await getWeather(cities[getRandomInt(cities.length)])
    const thirdCity = await getWeather(cities[getRandomInt(cities.length)])

    return req.body.otp === undefined ? getCorrectNumbers(
        firstCity.toString(),
        secondCity.toString(),
        thirdCity.toString()
    ) : req.body.otp
}

module.exports = createOtp