"use strict"
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("employees", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			employee_firstname: {
				type: Sequelize.STRING,
			},
			employee_lastname: {
				type: Sequelize.STRING,
			},
			employee_position: {
				type: Sequelize.STRING,
			},
			employee_degree: {
				type: Sequelize.STRING,
			},
			employee_group: {
				type: Sequelize.STRING,
			},
			employee_number: {
				type: Sequelize.STRING,
			},
			employee_tel: {
				type: Sequelize.INTEGER,
			},
			employee_start: {
				type: Sequelize.DATE,
			},
			fk_user_id: {
				type: Sequelize.INTEGER,
			},
			// createdAt: {
			// 	allowNull: false,
			// 	type: Sequelize.DATE,
			// },
			// updatedAt: {
			// 	allowNull: false,
			// 	type: Sequelize.DATE,
			// },
		})
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("employees")
	},
}
