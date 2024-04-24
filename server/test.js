const pactum = require("pactum")

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