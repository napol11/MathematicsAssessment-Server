const express = require("express")
const router = express.Router()

const authController = require("../controller/auth")

// login
router.post("/login", authController.login)

//reset
router.post("/resetPass", authController.resetPass)

module.exports = router
