const express = require("express")
const router = express.Router()
const models = require("../models/index")
const { Op } = require("sequelize")
const fs = require("fs")

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
router.post("/upload", upload.upload.array("files", 5), async (req, res) => {
	const assessment_id = req.body.id_assessment
	const employee_id = req.body.id_employee
	const table = req.body.table

	await models.formresult
		.findOne({
			where: {
				[Op.and]: [
					{
						fk_assessment_id: assessment_id,
					},
					{
						fk_employee_id: employee_id,
					},
				],
			},
		})
		.then(result => {
			models.doc
				.findAll({
					where: {
						fk_result_id: result.id,
					},
				})
				.then(findDoc => {
					if (findDoc.length === 0) {
						var i
						for (i = 0; i < req.files.length; i++) {
							const doc = {
								doc_name: req.files[i].filename,
								doc_filesize: req.files[i].size,
								doc_filetype: req.files[i].mimetype,
								doc_path: req.files[i].destination + "/" + req.files[i].filename,
								fk_result_id: result.id,
								doc_originalname: req.files[i].originalname,
								table: table,
							}

							models.doc.create(doc).then(doc => {
								res.status(200).json({
									data: "Upload Success",
									doc: "create Success",
									file: req.files,
									result: result.id,
								})
							})
						}
					} else {
						models.doc.destroy({
							where: {
								[Op.and]: [
									{
										fk_result_id: result.id,
									},
									{
										table: table,
									},
								],
							},
						})
						var i
						for (i = 0; i < req.files.length; i++) {
							const doc = {
								doc_name: req.files[i].filename,
								doc_filesize: req.files[i].size,
								doc_filetype: req.files[i].mimetype,
								doc_path: req.files[i].destination + "/" + req.files[i].filename,
								fk_result_id: result.id,
								doc_originalname: req.files[i].originalname,
								table: table,
							}

							models.doc.create(doc).then(doc => {
								res.status(200).json({
									data: "Upload Success",
									doc: "create Success",
									file: req.files,
									result: result.id,
								})
							})
						}
					}
				})
		})
})

// getfile All
router.get("/file", employeeController.getFile)

// download file
router.get("/file/:id", employeeController.downloadfile)

// delect file
router.route("/file/:id").patch(async (req, res) => {
	await models.doc
		.findByPk(req.params.id)
		.then(file => {
			fs.unlinkSync(file.doc_path)
			models.doc.destroy({
				where: {
					id: req.params.id,
				},
			})
			res.status(200).json({
				status: true,
				data: "delete file message",
			})
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({ status: false, message: "internal server error" })
		})
})

module.exports = router
