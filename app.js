const express = require("express")
const { databaseConnection } = require("./database/database")
require("dotenv").config()
const app = express()
databaseConnection()
const { registerUser, loginUser } = require("./controller/authController/authController")

//Routes Here
const authRoute = require("./routes/authRoute")
const productRoute = require("./routes/productRoute")
const adminUsersRoute = require("./routes/adminUsersRoute")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("uploads"))
app.get("/", async (req, res) => {

    res.status(200).json({
        message: "this is homepage"
    })
})

app.use("/api", authRoute)
app.use("/api", productRoute)
app.use("/api",adminUsersRoute)
// register new user
// app.post("/register",registerUser)

//login user api
// app.post('/login', loginUser)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("Node running at port 4000")
})