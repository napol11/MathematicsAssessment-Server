const express = require("express")
const router = express.Router()

const committeeController = require("../controller/committee")

//list assessment
// router.get("/assessment", committeeController.listassessmentAll)

//list employee
router.post("/employee", committeeController.employeeAll)

// data form one
router.post("/dataFormone", committeeController.dataFormone)

// form four
router.post("/formfour", committeeController.formfour)

// data form four
router.post("/dataFormfour", committeeController.dataFormfour)

// form three
router.post("/formthree", committeeController.formthree)

// data form three
router.post("/dataFromthree", committeeController.dataFromthree)

// form two
router.post("/formtwo", committeeController.formtwo)

// data form two
router.post("/dataFormtwo", committeeController.dataFormtwo)

// list now assessment and emplotyee
router.get("/assessment", committeeController.assessment)

module.exports = router
