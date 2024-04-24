const Router = require("express")
const User = require("../models/User")
const {check, validationResult} = require("express-validator")
const sendEmail = require("../emailSend");
const router = new Router
const createOtp = require("../createOtp")

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
    async (req, res) => {
        try {
            const {email, otp} = req.body
            const user = await User.findOne({email})

            const isOtpValid = otp === user.otp
            if (!isOtpValid) {
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