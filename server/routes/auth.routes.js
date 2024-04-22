const Router = require("express")
const User = require("../models/User")
const {check, validationResult} = require("express-validator")
const axios = require("axios");
const cities = require("../cities");
const SendEmail = require("../emailSend");
const router = new Router

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

async function getWeather(city) {
    const weather = await axios.get(`http://api.weatherapi.com/v1/current.json?key=4cc5f57c89504b6ba5e161012241504&q=${city}`)
    return Math.abs(Math.floor(weather.data.current.temp_c))
}

function createOtp(firstCity, secondCity, thirdCity) {
    if (firstCity < 10) firstCity = "0" + firstCity
    if (secondCity < 10) secondCity = "0" + secondCity
    if (thirdCity < 10) thirdCity = "0" + thirdCity
    return firstCity + secondCity + thirdCity
}

router.post('/authorisation',
    [
        check('email', "Incorrect email").isEmail()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: "Incorrect request", errors})
        }

        const firstCity = await getWeather(cities[getRandomInt(cities.length)])
        const secondCity = await getWeather(cities[getRandomInt(cities.length)])
        const thirdCity = await getWeather(cities[getRandomInt(cities.length)])

        const email = req.body.email
        const otp = createOtp(firstCity.toString(), secondCity.toString(), thirdCity.toString())

        await SendEmail(otp)

        const user = new User({email, otp})
        await user.save()
        return res.json({
            message: `OTP for email ${email} was created`,
            user: {
                id: user.id,
                email: user.email,
                otp: user.otp
            }
        })
    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.post('/login',
    // [
    //     check('otp', "OTP must be 6 digits long").isNumeric().isLength({min: 6, max: 6})
    // ],
    async (req, res) => {
        try {
            // const errors = validationResult(req)
            // if (!errors.isEmpty()) {
            //     return res.status(400).json({message: "Incorrect request", errors})
            // }

            const {email, otp} = req.body
            const user = await User.findOne({email})

            const isOtpValid = otp === user.otp
            if(!isOtpValid) {
                return res.status(400).json({message: "Incorrect OTP"})
            }
            return res.json({
                message: "Login successful"
            })
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

module.exports = router