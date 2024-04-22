import axios from 'axios'

export const authorisation = async (email) => {
    try {
        await axios.post(`http://localhost:5000/api/auth/authorisation`, {
            email
        })
    } catch (e) {
        alert(e.response.data.message)
    }
}

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