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
		data: {
			form: assessment,
			formresult: findEmofFormresult,
		},
	})
}

//test
exports.test = async (req, res) => {
	await models.assessment.findAll().then(assessment => {
		models.formresult
			.findOne({
				where: {
					[Op.and]: [
						{
							fk_assessment_id: assessment.id,
						},
						{
							fk_employee_id: employee_id,
						},
					],
				},
			})
			.then(data => {
				res.json({
					data: {
						assessment: assessment,
						result: data,
					},
				})
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

// create and update form one
exports.formone = async (req, res) => {
	const assessment_id = req.body.assessment_id
	const employee_id = req.body.employee_id

	const formresult = {
		fk_employee_id: employee_id,
		fk_assessment_id: assessment_id,
	}

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
		.then(finderesult => {
			if (!finderesult) {
				models.formresult.create(formresult).then(formresult => {
					const formone = {
						formone_lasick: req.body.formone_lasick,
						formone_lapaper: req.body.formone_lapaper,
						formone_laprivate: req.body.formone_laprivate,
						formone_lalate: req.body.formone_lalate,
						formone_laleave: req.body.formone_laleave,
						formone_lababy: req.body.formone_lababy,
						formone_lamonk: req.body.formone_lamonk,
						formone_lamilitary: req.body.formone_lamilitary,
						formone_historypromo: req.body.formone_historypromo,
						formone_historypunish: req.body.formone_historypunish,
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
			} else {
				const formone = {
					formone_lasick: req.body.formone_lasick,
					formone_lapaper: req.body.formone_lapaper,
					formone_laprivate: req.body.formone_laprivate,
					formone_lalate: req.body.formone_lalate,
					formone_laleave: req.body.formone_laleave,
					formone_lababy: req.body.formone_lababy,
					formone_lamonk: req.body.formone_lamonk,
					formone_lamilitary: req.body.formone_lamilitary,
					formone_historypromo: req.body.formone_historypromo,
					formone_historypunish: req.body.formone_historypunish,
				}
				models.formone
					.update(formone, {
						where: { fk_formresult_id: finderesult.id },
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
			}
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
								data: {
									form: form,
									formone: formone,
								},
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

//create and update form four
exports.formfour = async (req, res) => {
	const employee_id = req.body.employee_id
	const assessment_id = req.body.assessment_id

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
		.then(findresult => {
			if (findresult) {
				models.formfour
					.findOne({
						where: {
							fk_formresult_id: findresult.id,
						},
					})
					.then(findformfour => {
						if (!findformfour) {
							const formfour = {
								formfour_emone: req.body.empne,
								formfour_emtwo: req.body.emtwo,
								formfour_emthree: req.body.emthree,
								formfour_emfour: req.body.emfour,
								fk_formresult_id: findresult.id,
							}
							models.formfour.create(formfour).then(formfour => {
								res.status(200).json({
									data: [
										{
											formfour: formfour,
										},
									],
								})
							})
						} else {
							const formfour = {
								formfour_emone: req.body.empne,
								formfour_emtwo: req.body.emtwo,
								formfour_emthree: req.body.emthree,
								formfour_emfour: req.body.emfour,
							}
							models.formfour
								.update(formfour, {
									where: { id: findformfour.id },
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
						}
					})
			} else {
				res.send({
					message: "not found form ",
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
						if (!formfour) {
							res.status(404).send({
								message: "not found",
							})
						} else {
							res.status(200).json({
								data: {
									form: form,
									formfour: formfour,
								},
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

// create and update form two
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
		.then(findresult => {
			if (findresult) {
				models.formtwo
					.findOne({
						where: {
							fk_formresult_id: findresult.id,
						},
					})
					.then(findformtwo => {
						if (!findformtwo) {
							var i
							for (i = 0; i < req.body.formtwo.length; i++) {
								const formtwo = {
									formtwo_table: req.body.formtwo[i].formtwo_table,
									formtwo_name: req.body.formtwo[i].formtwo_name,
									formtwo_fte: req.body.formtwo[i].formtwo_fte,
									formtwo_sucessem: req.body.formtwo[i].formtwo_sucessem,
									formtwo_comment: req.body.formtwo[i].formtwo_comment,
									formtwo_code: req.body.formtwo[i].formtwo_code,
									fk_formresult_id: findresult.id,
								}

								models.formtwo.create(formtwo).then(formtwo => {
									res.status(200).json({
										data: "Successfully",
									})
								})
							}
						} else {
							models.formtwo.destroy({
								where: {
									fk_formresult_id: findresult.id,
								},
							})
							var i
							for (i = 0; i < req.body.formtwo.length; i++) {
								const formtwo = {
									formtwo_table: req.body.formtwo[i].formtwo_table,
									formtwo_name: req.body.formtwo[i].formtwo_name,
									formtwo_fte: req.body.formtwo[i].formtwo_fte,
									formtwo_sucessem: req.body.formtwo[i].formtwo_sucessem,
									formtwo_comment: req.body.formtwo[i].formtwo_comment,
									formtwo_code: req.body.formtwo[i].formtwo_code,
									fk_formresult_id: findresult.id,
								}
								models.formtwo.create(formtwo).then(formtwo => {
									res.status(200).json({
										data: "Successfully",
									})
								})
							}
						}
					})
			} else {
				res.send({
					message: "not found form ",
				})
			}
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "ERROR",
			})
		})
}

// data form two
exports.dataFormtwo = async (req, res) => {
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
				models.formtwo
					.findAll({
						where: {
							fk_formresult_id: form.id,
						},
					})
					.then(formtwo => {
						res.status(200).json({
							data: {
								formtwo: formtwo,
							},
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

exports.getFile = async (req, res) => {
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
		.then(result => {
			if (!result) {
				res.status(404).send({
					message: "not found",
				})
			} else {
				models.doc
					.findAll({
						where: {
							fk_result_id: result.id,
						},
					})
					.then(file => {
						if (file.length > 0) {
							res.status(200).json({
								data: file,
							})
						} else {
							res.status(200).json({
								data: "not found file",
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

exports.downloadfile = async (req, res) => {
	await models.doc
		.findOne({ where: { doc_name: req.params.id } })
		.then(file => {
			res.download(`./${file.doc_path}`)
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({ status: false, message: "internal server error" })
		})
}
