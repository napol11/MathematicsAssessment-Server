"use strict"
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("formones", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			formone_lasick: {
				type: Sequelize.INTEGER,
			},
			formone_lapaper: {
				type: Sequelize.INTEGER,
			},
			formone_laprivate: {
				type: Sequelize.INTEGER,
			},
			formone_lalate: {
				type: Sequelize.INTEGER,
			},
			formone_laleave: {
				type: Sequelize.INTEGER,
			},
			formone_lababy: {
				type: Sequelize.INTEGER,
			},
			formone_lamonk: {
				type: Sequelize.INTEGER,
			},
			formone_lamilitary: {
				type: Sequelize.INTEGER,
			},
			formone_historypromo: {
				type: Sequelize.STRING,
			},
			formone_historypunish: {
				type: Sequelize.STRING,
			},
			fk_formresult_id: {
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
		await queryInterface.dropTable("formones")
	},
}
