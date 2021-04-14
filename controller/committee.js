const models = require("../models/index")
const { Op, and } = require("sequelize")

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
						status_result: "finish",
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
							employee: employeeAll4,
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

//data form four by id coomittee
exports.dataFormfourById = async (req, res) => {
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
						// res.status(200).json({
						// 	data: formfour,
						// })
						models.formfour_committee
							.findOne({
								where: {
									[Op.and]: [
										{
											fk_formfour_id: formfour.id,
										},
										{
											fk_committee_id: committee_id,
										},
									],
								},
							})
							.then(formfour_committee => {
								res.status(200).json({
									data: formfour_committee,
								})
							})
					})
			}
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
									data: {
										formfour: formfour,
										formfour_committee: formfour_committee,
									},
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
							var i
							models.formthree_result.create(formthreeresult).then(formthreeresult => {
								for (i = 0; i < req.body.formthree.length; i++) {
									const formthree = {
										formthree_num: req.body.formthree[i].formthree_num,
										formthree_score: req.body.formthree[i].formthree_score,
										formthree_comment: req.body.formthree[i].formthree_comment,
										fk_formthreeresult_id: formthreeresult.id,
									}
									models.formthree.create(formthree).then(formthree => {
										res.status(200).json({
											data: "Successfully",
										})
									})
								}
							})
						} else {
							models.formthree.destroy({
								where: {
									fk_formthreeresult_id: findformthreeresult.id,
								},
							})
							models.formthree_result.destroy({
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
							const formthreeresult = {
								fk_formresult_id: findresult.id,
								fk_committee_id: committee_id,
							}
							var i
							models.formthree_result.create(formthreeresult).then(formthreeresult => {
								for (i = 0; i < req.body.formthree.length; i++) {
									const formthree = {
										formthree_num: req.body.formthree[i].formthree_num,
										formthree_score: req.body.formthree[i].formthree_score,
										formthree_comment: req.body.formthree[i].formthree_comment,
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

//list form three by ID
exports.dataFromthreeById = async (req, res) => {
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
				.then(findthreeresult => {
					models.formthree
						.findAll({
							where: {
								fk_formthreeresult_id: findthreeresult.id,
							},
						})
						.then(data => {
							res.status(200).json({
								data: data,
							})
						})
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
		.then(findresult => {
			if (findresult) {
				models.formthree_result
					.findAll({
						where: {
							fk_formresult_id: findresult.id,
						},
					})
					.then(formthree_result => {
						if (formthree_result.length > 0) {
							models.formthree.findAll().then(formthree => {
								const formthreeCom = formthree_result.map(formthree_result => formthree.filter(formthree => formthree.fk_formthreeresult_id == formthree_result.id))

								res.json({
									data: [
										{
											formthreeCom: formthreeCom,
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

//create and update form two
exports.formtwo = async (req, res) => {
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
				models.formtwo_committee
					.findOne({
						where: {
							fk_formresult_id: findresult.id,
						},
					})
					.then(findformtwoCom => {
						if (!findformtwoCom) {
							var i
							for (i = 0; i < req.body.formtwo.length; i++) {
								const formtwo = {
									formtwo_table: req.body.formtwo[i].formtwo_table,
									formtwo_sucesscom: req.body.formtwo[i].formtwo_table,
									fk_formresult_id: findresult.id,
									fk_committee_id: committee_id,
								}
								models.formtwo_committee.create(formtwo).then(formtwo_committee => {
									res.status(200).json({
										data: "Successfully",
									})
								})
							}
						} else {
							models.formtwo_committee.destroy({
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
							for (i = 0; i < req.body.formtwo.length; i++) {
								const formtwo = {
									formtwo_table: req.body.formtwo[i].formtwo_table,
									formtwo_sucesscom: req.body.formtwo[i].formtwo_sucesscom,
									fk_formresult_id: findresult.id,
									fk_committee_id: committee_id,
								}
								models.formtwo_committee.create(formtwo).then(formtwo_committee => {
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

// data form two by ID
exports.dataFormtwo = async (req, res) => {
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
		.then(form => {
			if (!form) {
				res.status(404).send({
					message: "not found",
				})
			} else {
				// res.status(200).json({
				// 	data: form.id,
				// })
				models.formtwo_committee
					.findAll({
						where: {
							[Op.and]: [
								{
									fk_formresult_id: form.id,
								},
								{
									fk_committee_id: committee_id,
								},
							],
						},
					})
					.then(formtwo => {
						res.status(200).json({
							data: {
								formtwoCOM: formtwo,
							},
						})
					})
			}
		})
		// .then(form => {

		// })
		.catch(err => {
			res.status(500).send({
				message: err.message || "ERROR",
			})
		})
}

// list now assessment and emplotyee
exports.assessment = async (req, res) => {
	const nowDate = new Date()

	await models.assessment.findAll().then(assessment => {
		const timestart = assessment.filter(v => new Date(v.assessment_end) > nowDate)
		if (timestart) {
			const time = timestart.filter(v => nowDate < new Date(v.assessment_endedit))
			if (time.length > 0) {
				models.formresult
					.findAll({
						where: {
							fk_assessment_id: time[0].id,
						},
					})
					.then(formresult => {
						models.employee.findAll().then(employee => {
							let dataemployee = []
							// const employeeAll = formresult.map(formresult => employee.filter(employee => employee.id == formresult.fk_employee_id))
							for (let i = 0; i < formresult.length; i++) {
								const employeeAll = employee.filter(employee => employee.id == formresult[i].fk_employee_id)
								dataemployee.push(employeeAll)
							}
							res.json({
								data: {
									// employee: employeeAll,
									employee: dataemployee,
									time: time,
									formresult: formresult,
								},
							})
						})
					})
					.catch(err => {
						res.status(500).send({
							message: err.message || "ERROR",
						})
					})
			}
		}
	})
}
