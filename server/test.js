const pactum = require("pactum")
const config = require("config")

describe('Get weather data', () => {
    test('should yield HTTP status code 200', async () => {
        await pactum.spec()
            .get(config.get('weatherUrl') + "London")
            .expectStatus(200)
    })

    test('should yield HTTP status code 400 without city', async () => {
        await pactum.spec()
            .get(config.get('weatherUrl'))
            .expectStatus(400)
    })

    test('should yield HTTP status code 400 with wrong city', async () => {
        await pactum.spec()
            .get(config.get('weatherUrl') + "Lo")
            .expectStatus(400)
    })
})

describe('Send emails', () => {
    test('should yield HTTP status code 200', async () => {

        const serviceId = "service_bohhjip"
        const templateId = "template_stixwlh"
        const userId = "Z_x_xNC0oXWxBQJGJ"
        const privateKey = "bxOXUgJ7nuVkHC-h9E8Pz"

        const data = {
            service_id: serviceId,
            template_id: templateId,
            user_id: userId,
            template_params: {
                message: 123456,
                to_email: "ays02782@gmail.com"
            },
            accessToken: privateKey
        }

        await pactum.spec()
            .post(config.get("emailUrl"))
            .withJson(data)
            .expectStatus(200)
    })

    test('should yield HTTP status code 400 with wrong IDs', async () => {

        const serviceId = "service"
        const templateId = "template"
        const userId = "Z_x_x"
        const privateKey = "bx"

        const data = {
            service_id: serviceId,
            template_id: templateId,
            user_id: userId,
            template_params: {
                message: 123456,
                to_email: "ays02782@gmail.com"
            },
            accessToken: privateKey
        }

        await pactum.spec()
            .post(config.get("emailUrl"))
            .withJson(data)
            .expectStatus(400)
    })
})

describe('Post authorisation', () => {
    test('should yield HTTP status code 200', async () => {
        await pactum.spec()
            .post('http://localhost:5000/api/auth/authorisation')
            .withJson({email: "ays02782@gmail.com"})
            .expectStatus(200)
    })

    test('should yield HTTP status code 400 with wrong email', async () => {
        await pactum.spec()
            .post('http://localhost:5000/api/auth/authorisation')
            .withJson({email: "ays02782"})
            .expectStatus(400)
    })
})

describe('Post login', () => {
    test('should yield HTTP status code 200', async () => {
        await pactum.spec()
            .post('http://localhost:5000/api/auth/authorisation')
            .withJson({
                email: "ays027821@gmail.com",
                otp: 123456
            })
        await pactum.spec()
            .post('http://localhost:5000/api/auth/login')
            .withJson({
                email: "ays027821@gmail.com",
                otp: 123456
            })
            .expectStatus(200)
    })

    test('should yield HTTP status code 400 with wrong otp', async () => {
        await pactum.spec()
            .post('http://localhost:5000/api/auth/authorisation')
            .withJson({
                email: "ays0278@gmail.com"
            })
        await pactum.spec()
            .post('http://localhost:5000/api/auth/login')
            .withJson({
                email: "ays0278@gmail.com",
                otp: 123456
            })
            .expectStatus(400)
    })
})