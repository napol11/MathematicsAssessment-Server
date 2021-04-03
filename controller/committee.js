const models = require("../models/index")
const { Op } = require("sequelize")

// list assessment
exports.listassessmentAll = async (req, res) => {
	const assessment = await models.assessment.findAll()
	res.status(200).json({
		data: [
			{
				assessment: assessment,
			},
		],
	})
}

// list employee
exports.employeeAll = async (req, res) => {
	const assessment_id = req.body.assessment_id

	await models.formresult
		.findAll({
			where: {
				[Op.and]: [
					{
						fk_assessment_id: assessment_id,
					},
					{
						status_result: "paniing",
					},
				],
			},
		})
		.then(formresult => {
			models.employee.findAll().then(employee => {
				const employeeAll = formresult.map(formresult => employee.filter(employee => employee.id == formresult.fk_employee_id))

				res.json({
					data: [
						{
							employee: employeeAll,
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

// create and update form four
exports.formfour = async (req, res) => {
	const employee_id = req.body.employee_id
	const assessment_id = req.body.assessment_id

	await models.formresult
		.findOne({
			where: {
				[Op.and]: [
					{
						fk_assessment_id: employee_id,
					},
					{
						fk_employee_id: assessment_id,
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
						if (findformfour) {
							models.formfour_committee
								.findOne({
									where: {
										fk_formfour_id: findformfour.id,
									},
								})
								.then(findformfourCom => {
									if (!findformfourCom) {
										const formfourcommittee = {
											formfour_comone: req.body.comone,
											formfour_comtwo: req.body.comtwo,
											fk_committee_id: req.body.committee_id,
											fk_formfour_id: findformfour.id,
										}
										models.formfour_committee.create(formfourcommittee).then(formfour_committee => {
											res.status(200).json({
												data: [
													{
														formfour: findformfour,
														formfour_committee: formfour_committee,
													},
												],
											})
										})
									} else {
										const formfourcommittee = {
											formfour_comone: req.body.comone,
											formfour_comtwo: req.body.comtwo,
											fk_committee_id: req.body.committee_id,
										}
										models.formfour_committee
											.update(formfourcommittee, {
												where: {
													id: findformfourCom.id,
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
									}
								})
						} else {
							res.send({
								message: "not found findformfour",
							})
						}
					})
			} else {
				res.send({
					message: "not found formresult",
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

//create and update form three
exports.formthree = async (req, res) => {
	const assessment_id = req.body.assessment_id
	const employee_id = req.body.employee_id
	const committee_id = req.body.committee_id

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
				models.formthree_result
					.findOne({
						where: {
							[Op.and]: [
								{
									fk_formresult_id: findresult.id,
								},
								{
									fk_committee_id: committee_id,
								},
							],
						},
					})
					.then(findformthreeresult => {
						if (!findformthreeresult) {
							const formthreeresult = {
								fk_formresult_id: findresult.id,
								fk_committee_id: committee_id,
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
												formthreeresult: formthreeresult,
												formthree: formthree,
											},
										],
									})
								})
							})
						} else {
							const formthree = {
								formthree_num: req.body.formthree_num,
								formthree_score: req.body.formthree_score,
								formthree_comment: req.body.formthree_comment,
							}
							models.formthree
								.update(formthree, {
									where: {
										fk_formthreeresult_id: findformthreeresult.id,
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
						}
					})
			} else {
				res.send({
					message: "not found formresult",
				})
			}
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
	// const committee_id = req.body.committee_id

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
				models.formthree_result
					.findAll({
						where: {
							fk_formresult_id: findresult.id,
						},
					})
					.then(formthree_result => {
						if (formthree_result) {
							// res.json(formthree_result)
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
												formthree_result: formthree_result,
												formthree: formthree,
											},
										],
									})
								})
						} else {
							res.send({
								message: "not found formthree_result",
							})
						}
					})
			} else {
				res.send({
					message: "not found formresult",
				})
			}
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "ERROR",
			})
		})
}
