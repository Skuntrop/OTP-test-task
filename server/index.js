const express = require("express")
const mongoose = require("mongoose")
const authRouter = require("./routes/auth.routes")
const config = require("config")

const app = express()
const port = config.get("serverPort")
const corsMiddleware = require("./cors.middleware")

app.use(corsMiddleware)
app.use(express.json())
app.use("/api/auth", authRouter)

const start = async () => {
    try {
        await mongoose.connect(config.get("dbUrl"))

        app.listen(port, () => {
            console.log("Server started on port ", port)
        })
    } catch (e) {
        console.log(e)
    }
}

start()