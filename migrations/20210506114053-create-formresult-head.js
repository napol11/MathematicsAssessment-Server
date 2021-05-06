"use strict"
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("formresultHeads", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			grad: {
				type: Sequelize.STRING,
			},
			pass: {
				type: Sequelize.STRING,
			},
			salary: {
				type: Sequelize.STRING,
			},
			fk_formresult_id: {
				type: Sequelize.INTEGER,
			},
			fk_committee_id: {
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
		await queryInterface.dropTable("formresultHeads")
	},
}
