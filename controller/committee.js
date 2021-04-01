const models = require("../models/index")
const { Op } = require("sequelize")

// list employee
exports.employeeAll = async (req, res) => {
	const employeeAll = await models.employeeAll.findAll()

	res.status(200).json({
		data: employeeAll,
	})
}

// data form one
exports.dataFormone = async (req, res) => {
	const assessment_id = req.body.assessment_id
	const employee_id = req.body.employee_id

	await models.formone
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
		.then(formone => {
			if (!formone) {
				res.status(404).send({
					message: "not found",
				})
			}

			res.status(200).json({
				data: [
					{
						formone: formone,
					},
				],
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
	const formfour = {
		formfour_comone: req.body.comone,
		formfour_comtwo: req.body.comtwo,
		fk_committee_id: req.body.committee_id,
		fk_formfour_id: req.body.formfour_id,
	}
	await models.formfour_committee
		.create(formfour)
		.then(formfour => {
			res.status(200).json({
				data: [
					{
						formfour: formfour,
					},
				],
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

	await models.formfour
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
		.then(formfour => {
			if (!formfour) {
				res.status(404).send({
					message: "not found",
				})
			} else {
				models.formfour_committee
					.findOne({
						where: { fk_formfour_id: formfour.id },
					})
					.then(committee => {
						res.status(200).json({
							data: [
								{
									employee: formfour,
									committee: committee,
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
