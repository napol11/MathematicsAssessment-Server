"use strict"
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("assessments", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			assessment_name: {
				type: Sequelize.STRING,
			},
			assessment_start: {
				type: Sequelize.DATE,
			},
			assessment_end: {
				type: Sequelize.DATE,
			},
			assessment_endedit: {
				type: Sequelize.DATE,
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
		await queryInterface.dropTable("assessments")
	},
}
