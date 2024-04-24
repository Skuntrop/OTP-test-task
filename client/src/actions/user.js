import axios from 'axios'

//create a record in DB
export const authorisation = async (email) => {
    try {
        await axios.post(`http://localhost:5000/api/auth/authorisation`, {
            email
        })
    } catch (e) {
        alert(e.response.data.message)
    }
}

//find email in DB and check OTP
export const login = async (email, otp) => {

    try {
        const response = await axios.post(`http://localhost:5000/api/auth/login`, {
            email,
            otp
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}