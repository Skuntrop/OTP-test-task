const axios = require("axios");

async function SendEmail(message) {
    const serviceId = "service_bohhjip"
    const templateId = "template_stixwlh"
    const userId = "Z_x_xNC0oXWxBQJGJ"
    const privateKey = "bxOXUgJ7nuVkHC-h9E8Pz"

    const data = {
        service_id: serviceId,
        template_id: templateId,
        user_id: userId,
        template_params: {
            message: message
        },
        accessToken: privateKey
    }

    try {
        const res = await axios.post("https://api.emailjs.com/api/v1.0/email/send", data, {headers: {'Content-Type': 'application/json'}})
        console.log(res.data)
    } catch (e) {
        console.error(e)
    }
}

module.exports = SendEmail