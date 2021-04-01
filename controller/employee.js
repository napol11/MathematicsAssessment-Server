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
	const assessment = await models.assessment.findAll()

	res.status(200).json({
		data: assessment,
	})
}

//create form one
exports.formone = async (req, res) => {
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
		fk_employee_id: req.body.employee_id,
		fk_assessment_id: req.body.assessment_id,
	}

	await models.formone
		.create(formone)
		.then(formone => {
			// const form = {
			// 	fk_employee_id: req.body.employee_id,
			// 	fk_assessment_id: req.body.assessment_id,
			// 	fk_formone_id: formone.id,
			// }
			// models.form.create(form).then(form => {
			// 	res.status(200).json({
			// 		data: [
			// 			{
			// 				form: form,
			// 				formone: formone,
			// 			},
			// 		],
			// 	})
			//})
			res.status(200).json({
				data: [
					{
						// form: form,
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

// create form two
// exports.formtwo = async (req, res) => {
//     const formtwo = {

//     }
// }

// create form four
exports.formfour = async (req, res) => {
	const formfour = {
		formfour_emone: req.body.empne,
		formfour_emtwo: req.body.emtwo,
		formfour_emthree: req.body.emthree,
		formfour_emfour: req.body.emfour,
		fk_employee_id: req.body.employee_id,
		fk_assessment_id: req.body.assessment_id,
	}
	await models.formfour
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

// data Formone
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
			// else {
			// 	models.formone
			// 		.findOne({
			// 			where: { [Op.eq]: form.fk_formone_id },
			// 		})
			// 		.then(formone => {
			// 			res.status(200).json({
			// 				data: [
			// 					{
			// 						form: form,
			// 						formone: formone,
			// 					},
			// 				],
			// 			})
			// 		})
			// }

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
			}
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
