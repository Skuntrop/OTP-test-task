const Router = require("express")
const User = require("../models/User")
const {check, validationResult} = require("express-validator")
const sendEmail = require("../emailSend");
const router = new Router
const createOtp = require("../createOtp")
const createUser = require("../createUser")

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

            const email = req.body.email
            const otp = await createOtp(req)

            await sendEmail(otp, email)
            await createUser(email, otp)

            return res.json({
                message: `OTP for email ${email} was created`
            })
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

router.post('/login',
    async (req, res) => {
        try {
            const {email, otp} = req.body
            const user = await User.findOne({email})

            if (otp !== user.otp) {
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