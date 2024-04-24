const axios = require("axios");
const config = require("config")

//send email using snedjs API
async function sendEmail(message, email) {
    const serviceId = "service_bohhjip"
    const templateId = "template_stixwlh"
    const userId = "Z_x_xNC0oXWxBQJGJ"
    const privateKey = "bxOXUgJ7nuVkHC-h9E8Pz"

    const data = {
        service_id: serviceId,
        template_id: templateId,
        user_id: userId,
        template_params: {
            message: message,
            to_email: email
        },
        accessToken: privateKey
    }

    try {
        const res = await axios.post(config.get("emailUrl"), data, {headers: {'Content-Type': 'application/json'}})
        console.log(res.data)
    } catch (e) {
        console.error(e)
    }
}

module.exports = sendEmail