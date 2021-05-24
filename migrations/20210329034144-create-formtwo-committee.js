"use strict"
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("formtwo_committees", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			fk_formresult_id: {
				type: Sequelize.INTEGER,
			},
			formtwo_table: {
				type: Sequelize.INTEGER,
			},
			fk_committee_id: {
				type: Sequelize.INTEGER,
			},
			formtwo_sucesscom: {
				type: Sequelize.INTEGER,
			},
			num: {
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
		await queryInterface.dropTable("formtwo_committees")
	},
}
