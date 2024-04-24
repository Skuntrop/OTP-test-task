const {Schema, model} = require("mongoose")

//User schema
const User = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    otp: {
        type: Number,
        require: true
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: '5m' },
    }
})

module.exports = model('User', User)