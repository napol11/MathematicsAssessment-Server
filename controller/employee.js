const models = require("../models/index")
const { Op } = require("sequelize")

// list data employee by id
exports.dataEmployee = async (req, res) => {
	const id = req.params.id

	await models.employee
		.findOne({
			where: {
				id: id,
			},
		})
		.then(employee => {
			if (!employee) {
				return res.status(404).send({
					message: "employee not Found",
				})
			} else {
				res.status(200).json({
					data: employee,
				})
			}
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "ERROR",
			})
		})
}

// list assessment
exports.employeeAssessment = async (req, res) => {
	const employee_id = req.body.employee_id

	const assessment = await models.assessment.findAll()
	const findEmofFormresult = await models.formresult.findAll({
		where: {
			fk_employee_id: employee_id,
		},
	})

	res.status(200).json({
		data: [
			{
				form: assessment,
				formresult: findEmofFormresult,
			},
		],
	})
}

//create form one
exports.formone = async (req, res) => {
	const formresult = {
		fk_employee_id: req.body.employee_id,
		fk_assessment_id: req.body.assessment_id,
	}

	await models.formresult
		.create(formresult)
		.then(formresult => {
			const formone = {
				formone_lasick: req.body.lasick,
				formone_lapaper: req.body.lapaper,
				formone_laprivate: req.body.laprivate,
				formone_lalate: req.body.lalate,
				formone_laleave: req.body.laleave,
				formone_lababy: req.body.lababy,
				formone_lamonk: req.body.lamonk,
				formone_lamilitary: req.body.lamilitary,
				formone_budgetone: req.body.budgetone,
				formone_budgettwo: req.body.budgettwo,
				formone_promone: req.body.promone,
				formone_promtwo: req.body.promtwo,
				formone_punishdate: req.body.punishdate,
				formone_punishievel: req.body.punishievel,
				fk_formresult_id: formresult.id,
			}
			models.formone.create(formone).then(formone => {
				res.status(200).json({
					data: [
						{
							form: formresult,
							formone: formone,
						},
					],
				})
			})
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "ERROR",
			})
		})
}

// create form four
exports.formfour = async (req, res) => {
	const fk_employee_id = req.body.employee_id
	const fk_assessment_id = req.body.assessment_id

	await models.formresult
		.findOne({
			where: {
				[Op.and]: [
					{
						fk_assessment_id: fk_employee_id,
					},
					{
						fk_employee_id: fk_assessment_id,
					},
				],
			},
		})
		.then(formresult => {
			const formfour = {
				formfour_emone: req.body.empne,
				formfour_emtwo: req.body.emtwo,
				formfour_emthree: req.body.emthree,
				formfour_emfour: req.body.emfour,
				fk_formresult_id: formresult.id,
			}
			models.formfour.create(formfour).then(formfour => {
				res.status(200).json({
					data: [
						{
							form: formresult,
							formfour: formfour,
						},
					],
				})
			})
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "ERROR",
			})
		})
}

// data Formone
exports.dataFormone = async (req, res) => {
	const assessment_id = req.body.assessment_id
	const employee_id = req.body.employee_id

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
		.then(form => {
			if (!form) {
				res.status(404).send({
					message: "not found",
				})
			} else {
				models.formone
					.findOne({
						where: {
							fk_formresult_id: form.id,
						},
					})
					.then(formone => {
						if (!form) {
							res.status(404).send({
								message: "not found",
							})
						} else {
							res.status(200).json({
								data: [
									{
										form: form,
										formone: formone,
									},
								],
							})
						}
					})
			}
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "ERROR",
			})
		})
}

// data form four
exports.dataFormfour = async (req, res) => {
	const assessment_id = req.body.assessment_id
	const employee_id = req.body.employee_id

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
		.then(form => {
			if (!form) {
				res.status(404).send({
					message: "not found",
				})
			} else {
				models.formfour
					.findOne({
						where: {
							fk_formresult_id: form.id,
						},
					})
					.then(formfour => {
						res.status(200).json({
							data: [
								{
									form: form,
									formfour: formfour,
								},
							],
						})
					})
			}
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "ERROR",
			})
		})
}

// create form two
exports.formtwo = async (req, res) => {
	const assessment_id = req.body.assessment_id
	const employee_id = req.body.employee_id

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
		.then(formresult => {
			// const formtworesult = {
			// 	fk_formresult_id: formresult.id,
			// }
			const formtwo = {
				formtwo_table: req.body.formtwo_table,
				formtwo_name: req.body.formtwo_name,
				formtwo_fte: req.body.formtwo_fte,
				formtwo_sucessem: req.body.formtwo_sucessem,
				formtwo_comment: req.body.formtwo_comment,
				formtwo_code: req.body.formtwo_code,
				fk_formresult_id: formresult.id,
			}

			models.formtwo.create(formtwo).then(formtwo => {
				res.status(200).json({
					data: [
						{
							formresult: formresult,
							formtwo: formtwo,
						},
					],
				})
			})
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "ERROR",
			})
		})
}

// finish Assessment
exports.finishAssessment = async (req, res) => {
	const assessment_id = req.body.assessment_id
	const employee_id = req.body.employee_id

	const status = {
		status_result: "finish",
	}

	await models.formresult
		.update(status, {
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
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Update Sussessfully",
				})
			} else {
				res.send({
					message: "Cannot Update",
				})
			}
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "ERROR",
			})
		})
}
