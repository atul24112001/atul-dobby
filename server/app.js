const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const authRouter = require("./routes/authentication.routes");
const imageRouter = require("./routes/images.routes");

dotenv.config()
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

app.use("/api/auth", authRouter)
app.use("/api/images", imageRouter)


app.listen(PORT, () => {
    mongoose.connect(process.env.DATABASE_URL, () => {
        console.log(`Server running on prot: ${PORT}`)
    })
})