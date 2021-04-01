"use strict"
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("forms", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			fk_formone_id: {
				type: Sequelize.INTEGER,
			},
			fk_formtwo_id: {
				type: Sequelize.INTEGER,
			},
			fk_formthree_id: {
				type: Sequelize.INTEGER,
			},
			fk_formfour_id: {
				type: Sequelize.INTEGER,
			},
			fk_employee_id: {
				type: Sequelize.INTEGER,
			},
			fk_committee_id: {
				type: Sequelize.INTEGER,
			},
			fk_assessment_id: {
				type: Sequelize.INTEGER,
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
		await queryInterface.dropTable("forms")
	},
}
