const express = require("express")
const router = express.Router()

const authController = require("../controller/auth")

// login
router.post("/login", authController.login)

//reset
router.put("/changepass", authController.changepass)

module.exports = router
