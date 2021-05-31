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
			formone_study: {
				type: Sequelize.INTEGER,
			},
			formone_studystart: {
				type: Sequelize.DATE,
			},
			formone_studyend: {
				type: Sequelize.DATE,
			},
			formone_studyback: {
				type: Sequelize.DATE,
			},
			formone_budgetone: {
				type: Sequelize.STRING,
			},
			formone_budgettwo: {
				type: Sequelize.STRING,
			},
			formone_promoone: {
				type: Sequelize.STRING,
			},
			formone_promotwo: {
				type: Sequelize.STRING,
			},
			formone_punishdate: {
				type: Sequelize.STRING,
			},
			formone_punishlevel: {
				type: Sequelize.STRING,
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
