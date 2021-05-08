var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
var cors = require("cors")

var indexRouter = require("./routes/index")
var usersRouter = require("./routes/users")

const admin = require("./routes/admin")
const auth = require("./routes/auth")
const employee = require("./routes/employee")
const committee = require("./routes/comittee")
// const PORT = process.env.PORT || 3001

var app = express()

// // Set portnumber
const port = process.env.PORT || 300

// // Start Server
// app.listen(portnumber, () => {
// 	console.log(`Server started port ${portnumber}`)
// })
app.use(cors())
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use("/", indexRouter)
app.use("/users", usersRouter)

app.use("/api/admin", admin)
app.use("/api/auth", auth)
app.use("/api/employee", employee)
app.use("/api/committee", committee)

app.listen(port, () => {
	console.log(`Serve is runing port ${port}`)
})

// module.exports = app
