const express = require("express")
const router = express.Router()

const adminController = require("../controller/admin")

// list committee
router.get("/committee", adminController.committeeAll)

// create committee
router.post("/committee", adminController.committeeCreate)

// update committee
router.put("/committee/:id", adminController.committeeUpdate)

// delete committee
router.delete("/committee/:id", adminController.committeeDelete)

// list employee
router.get("/employee", adminController.employeeAll)

// create employee
router.post("/employee", adminController.employeeCreate)

// update employee
router.put("/employee/:id", adminController.employeeUpdate)

// delete employee
router.delete("/employee/:id", adminController.employeeDelete)

// list assessment
router.get("/assessment", adminController.assessmentAll)

// create assessment
router.post("/assessment", adminController.assessmentCreate)

// update assessment
router.put("/assessment/:id", adminController.assessmentUpdate)

// delete assessment
router.delete("/assessment/:id", adminController.assessmentDelete)

module.exports = router
