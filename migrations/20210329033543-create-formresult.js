"use strict"
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("formresults", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			// fk_formone_id: {
			// 	type: Sequelize.INTEGER,
			// },
			// fk_formfour_id: {
			// 	type: Sequelize.INTEGER,
			// },
			fk_employee_id: {
				type: Sequelize.INTEGER,
			},
			fk_assessment_id: {
				type: Sequelize.INTEGER,
			},
			status_result: {
				typeof: Sequelize.STRING,
			},
			//   createdAt: {
			//     allowNull: false,
			//     type: Sequelize.DATE
			//   },
			//   updatedAt: {
			//     allowNull: false,
			//     type: Sequelize.DATE
			//   }
		})
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("formresults")
	},
}
