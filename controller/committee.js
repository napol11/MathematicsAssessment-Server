const models = require("../models/index")
const { Op } = require("sequelize")

// list employee
exports.employeeAll = async (req, res) => {
	const employeeAll = await models.employeeAll.findAll()

	res.status(200).json({
		data: employeeAll,
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

// create form four
// เวลาว่งข้อมูลมีค่า employee_id,assessment_id,comone,comtwo,committee_id
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
			models.formfour
				.findOne({
					where: {
						fk_formresult_id: formresult.id,
					},
				})
				.then(formfour => {
					const formfourcommittee = {
						formfour_comone: req.body.comone,
						formfour_comtwo: req.body.comtwo,
						fk_committee_id: req.body.committee_id,
						fk_formfour_id: formfour.id,
					}
					models.formfour_committee.create(formfourcommittee).then(formfour_committee => {
						res.status(200).json({
							data: [
								{
									formresult: formresult,
									formfour: formfour,
									formfour_committee: formfour_committee,
								},
							],
						})
					})
				})
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
		.then(formresult => {
			if (!formresult) {
				res.status(404).send({
					message: "not found",
				})
			} else {
				models.formfour
					.findOne({
						where: {
							fk_formresult_id: formresult.id,
						},
					})
					.then(formfour => {
						models.formfour_committee
							.findAll({
								where: {
									fk_formfour_id: formfour.id,
								},
							})
							.then(formfour_committee => {
								res.status(200).json({
									data: [
										{
											formresult: formresult,
											formfour: formfour,
											formfour_committee: formfour_committee,
										},
									],
								})
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

//create form three
exports.formthree = async (req, res) => {
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
			const formthreeresult = {
				fk_formresult_id: formresult.id,
				fk_committee_id: req.body.committee_id,
			}
			models.formthree_result.create(formthreeresult).then(formthreeresult => {
				const formthree = {
					formthree_num: req.body.formthree_num,
					formthree_score: req.body.formthree_score,
					formthree_comment: req.body.formthree_comment,
					fk_formthreeresult_id: formthreeresult.id,
				}
				models.formthree.create(formthree).then(formthree => {
					res.status(200).json({
						data: [
							{
								formresult: formresult,
								formthreeresult: formthreeresult,
								formthree: formthree,
							},
						],
					})
				})
			})
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "ERROR",
			})
		})
}

//list form three
exports.dataFromthree = async (req, res) => {
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
			models.formthree_result
				.findOne({
					where: {
						fk_formresult_id: formresult.id,
					},
				})
				.then(formthree_result => {
					models.formthree
						.findAll({
							where: {
								fk_formthreeresult_id: formthree_result.id,
							},
						})
						.then(formthree => {
							res.status(200).json({
								data: [
									{
										formresult: formresult,
										formthree_result: formthree_result,
										formthree: formthree,
									},
								],
							})
						})
				})
		})
}
