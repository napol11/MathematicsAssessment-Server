const express = require("express")
const router = express.Router()

const employeeController = require("../controller/employee")
const upload = require("../utils/multer")

// list data employee
router.get("/employee/:id", employeeController.dataEmployee)

// list assessment
router.post("/assessment", employeeController.employeeAssessment)

// list assessment
router.post("/test", employeeController.test)

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

// data form two
router.post("/dataFormtwo", employeeController.dataFormtwo)

// file upload
router.post("/upload", upload.upload.array("files", 5), (req, res) => {
	res.status(200).json({
		data: "Upload Success",
		file: req.files,
	})
})

module.exports = router
