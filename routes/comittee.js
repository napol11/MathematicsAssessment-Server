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

// data form four by ID
router.post("/dataFormfourById", committeeController.dataFormfourById)

// form three
router.post("/formthree", committeeController.formthree)

// data form three
router.post("/dataFromthree", committeeController.dataFromthree)

// data form three by ID
router.post("/dataFromthreeById", committeeController.dataFromthreeById)

// form two
router.post("/formtwo", committeeController.formtwo)

// data form two
router.post("/dataFormtwo", committeeController.dataFormtwo)

// data form two COMALL
router.post("/dataFormtwoAll", committeeController.dataFormtwoAll)

// list now assessment and emplotyee
router.get("/assessment", committeeController.assessment)

//form  result head
router.post("/resulthead", committeeController.formfourhead)

// data result head
router.post("/dataresulthead", committeeController.dataresultHead)

module.exports = router
