const express = require("express")
const router = express.Router()

const employeeController = require("../controller/employee")

// list data employee
router.get("/employee/:id", employeeController.dataEmployee)

// list assessment
router.post("/assessment", employeeController.employeeAssessment)

// form one
router.post("/formone", employeeController.formone)

// form four
router.post("/formfour", employeeController.formfour)

// data form one
router.post("/dataFormone", employeeController.dataFormone)

// data form four
router.post("/dataFormfour", employeeController.dataFormfour)

// finishAssessment
router.post("/finishAssessment", employeeController.finishAssessment)

// form two
router.post("/formtwo", employeeController.formtwo)
module.exports = router
