const express = require("express")
const router = express.Router()

const committeeController = require("../controller/committee")

//list employee
router.get("/assessment", committeeController.employeeAll)

// data form one
router.post("/dataFormone", committeeController.dataFormone)

// form four
router.post("/formfour", committeeController.formfour)

// data form four
router.post("/dataFormfour", committeeController.dataFormfour)

// form three
router.post("/formthree", committeeController.formthree)

module.exports = router
