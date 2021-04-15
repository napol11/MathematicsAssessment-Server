const models = require("../models/index")
const bcrypt = require("bcrypt")
const saltRounds = 10

exports.login = async (req, res) => {
	const username = req.body.username
	const password = req.body.password

	await models.user
		.findOne({
			where: {
				username: username,
			},
		})
		.then(user => {
			// check user
			if (!user) {
				return res.status(404).send({
					message: "user not Found",
				})
			}
			//check password
			bcrypt.compare(password, user.password, function (err, result) {
				if (result == true) {
					if (user.role == 1) {
						models.committee.findOne({ where: { fk_user_id: user.id } }).then(committee => {
							res.status(200).json({
								data: {
									profile: committee,
									user: user,
									role: user.role, // 1. committee 2. employee
								},
							})
						})
					} else {
						models.employee.findOne({ where: { fk_user_id: user.id } }).then(employee => {
							res.status(200).json({
								data: {
									profile: employee,
									user: user,
									role: user.role, // 1. committee 2. employee
								},
							})
						})
					}
				} else {
					res.status(404).send({
						message: "Password not Found",
					})
				}
			})
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "ERROR",
			})
		})
}

//Change  passwork
exports.changepass = async (req, res) => {
	const employee_id = req.body.employee_id
	const password = req.body.password
	const encryptedPassword = await bcrypt.hash(password, saltRounds)
	const resetPass = {
		password: encryptedPassword,
	}
	await models.employee
		.findByPk(employee_id)
		.then(data => {
			models.user
				.update(resetPass, {
					where: { id: data.fk_user_id },
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
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "ERROR",
			})
		})
}
