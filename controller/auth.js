const models = require("../models/index")
const bcrypt = require("bcrypt")

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
								data: [
									{
										profile: committee,
										user: user,
										role: user.role, // 1. committee 2. employee
									},
								],
							})
						})
					} else {
						models.employee.findOne({ where: { fk_user_id: user.id } }).then(employee => {
							res.status(200).json({
								data: [
									{
										profile: employee,
										user: user,
										role: user.role, // 1. committee 2. employee
									},
								],
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
