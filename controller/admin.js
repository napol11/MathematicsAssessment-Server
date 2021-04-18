const models = require("../models/index")
const bcrypt = require("bcrypt")
const saltRounds = 10

// list committee
exports.committeeAll = async (req, res, next) => {
	const committee = await models.committee.findAll()

	res.status(200).json({
		data: committee,
	})
}

// create committee
exports.committeeCreate = async (req, res) => {
	// bycrpt password
	const password = req.body.tel
	const encryptedPassword = await bcrypt.hash(password, saltRounds)

	const user = {
		username: req.body.email,
		password: encryptedPassword,
		role: 1, // 1. committee 2. employee
		email: req.body.email,
	}

	await models.user
		.create(user)
		.then(user => {
			const newCommittee = {
				committee_firstname: req.body.firstname,
				committee_lastname: req.body.lastname,
				committee_position: req.body.position,
				committee_tel: req.body.tel,
				committee_status: req.body.status,
				email: req.body.email,
				fk_user_id: user.id,
			}

			models.committee
				.create(newCommittee)
				.then(newCommittee => {
					res.status(200).json({
						data: [
							{
								user: user,
								committee: newCommittee,
							},
						],
					})
				})
				.catch(err => {
					res.status(500).send({
						message: err.message || "ERROR",
					})
				})
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "ERROR",
			})
		})
}

// update committee
exports.committeeUpdate = async (req, res) => {
	const id = req.params.id

	const committee = {
		committee_firstname: req.body.firstname,
		committee_lastname: req.body.lastname,
		committee_position: req.body.position,
		committee_tel: req.body.tel,
		committee_status: req.body.status,
		email: req.body.email,
	}
	await models.committee
		.update(committee, {
			where: { id: id },
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

// delete committee
exports.committeeDelete = async (req, res) => {
	const id = req.params.id

	await models.committee
		.findOne({
			where: { id: id },
		})
		.then(committee => {
			models.user
				.findOne({
					where: { id: committee.fk_user_id },
				})
				.then(user => {
					const committeeFind = committee
					models.committee.destroy({ where: { id: id } }).then(data => {
						models.user.destroy({ where: { id: committeeFind.fk_user_id } })
					})
				})
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "ERROR",
			})
		})
}

// list employee
exports.employeeAll = async (req, res, next) => {
	const employee = await models.employee.findAll()

	res.status(200).json({
		data: employee,
	})
}

// create employee
exports.employeeCreate = async (req, res) => {
	// bycrpt password
	const password = req.body.tel
	const encryptedPassword = await bcrypt.hash(password, saltRounds)

	const user = {
		username: req.body.email,
		password: encryptedPassword,
		role: 2, // 1. committee 2. employee
		email: req.body.email,
	}

	await models.user
		.create(user)
		.then(user => {
			const employee = {
				employee_firstname: req.body.firstname,
				employee_lastname: req.body.lastname,
				employee_position: req.body.position,
				employee_tel: req.body.tel,
				employee_degree: req.body.degree,
				employee_number: req.body.number,
				employee_group: req.body.group,
				employee_start: req.body.start,
				email: req.body.email,
				fk_user_id: user.id,
			}
			models.employee
				.create(employee)
				.then(employee => {
					res.status(200).json({
						data: [
							{
								user: user,
								employee: employee,
							},
						],
					})
				})
				.catch(err => {
					res.status(500).send({
						message: err.message || "ERROR",
					})
				})
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "ERROR",
			})
		})
}

// update employee
exports.employeeUpdate = async (req, res) => {
	const id = req.params.id

	const employee = {
		employee_firstname: req.body.firstname,
		employee_lastname: req.body.lastname,
		employee_email: req.body.email,
		employee_position: req.body.position,
		employee_tel: req.body.tel,
		employee_degree: req.body.degree,
		employee_number: req.body.number,
		employee_group: req.body.group,
		employee_start: req.body.start,
	}
	await models.employee
		.update(employee, {
			where: { id: id },
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

// delete employee
exports.employeeDelete = async (req, res) => {
	const id = req.params.id

	await models.employee
		.findOne({
			where: { id: id },
		})
		.then(employee => {
			models.user
				.findOne({
					where: { id: employee.fk_user_id },
				})
				.then(user => {
					const employeeFind = employee
					models.employee.destroy({ where: { id: id } }).then(delectEm => {
						models.user.destroy({ where: { id: employeeFind.fk_user_id } }).then(delectuser => {
							res.status(200).json({
								data: [
									{
										delectEm: delectEm == 1 ? "Sussessfully" : "Cannot Delete",
										delectuser: delectuser == 1 ? "Sussessfully" : "Cannot Delete",
									},
								],
							})
						})
					})
				})
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "ERROR",
			})
		})
	// const id = req.params.id

	// await models.employee
	// 	.destroy({
	// 		where: { id: id },
	// 	})
	// 	.then(num => {
	// 		if (num == 1) {
	// 			res.send({
	// 				message: "Delete Sussessfully",
	// 			})
	// 		} else {
	// 			res.send({
	// 				message: "Cannot Delete",
	// 			})
	// 		}
	// 	})
	// 	.catch(err => {
	// 		res.status(500).send({
	// 			message: err.message || "ERROR",
	// 		})
	// 	})
}

// list assessment
exports.assessmentAll = async (req, res, next) => {
	const assessment = await models.assessment.findAll()

	res.status(200).json({
		data: assessment,
	})
}

// create assessment
exports.assessmentCreate = async (req, res) => {
	const assessment = {
		assessment_name: req.body.name,
		assessment_start: req.body.start,
		assessment_end: req.body.end,
		assessment_endedit: req.body.endedit,
	}
	await models.assessment
		.create(assessment)
		.then(data => {
			res.send(data)
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "ERROR",
			})
		})
}

// data assessment by id

// update assessment
exports.assessmentUpdate = async (req, res) => {
	const id = req.params.id

	const assessment = {
		assessment_name: req.body.name,
		assessment_start: req.body.start,
		assessment_end: req.body.end,
		assessment_endedit: req.body.endedit,
	}
	await models.assessment
		.update(assessment, {
			where: { id: id },
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

// delete assessment
exports.assessmentDelete = async (req, res) => {
	const id = req.params.id

	await models.assessment
		.destroy({
			where: { id: id },
		})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Delete Sussessfully",
				})
			} else {
				res.send({
					message: "Cannot Delete",
				})
			}
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "ERROR",
			})
		})
}
