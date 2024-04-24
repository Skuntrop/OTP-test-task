const User = require("./models/User");

async function createUser(email, otp) {
    const user = new User({email, otp})
    await user.save()
}

module.exports = createUser