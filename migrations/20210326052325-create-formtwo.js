"use strict"
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("formtwos", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			formtwo_table: {
				type: Sequelize.INTEGER,
			},
			formtwo_name: {
				type: Sequelize.STRING,
			},
			formtwo_fte: {
				type: Sequelize.INTEGER,
			},
			formtwo_sucessem: {
				type: Sequelize.INTEGER,
			},
			formtwo_comment: {
				type: Sequelize.STRING,
			},
			formtwo_code: {
				type: Sequelize.INTEGER,
			},
			num: {
				type: Sequelize.INTEGER,
			},
			// fk_formtworesult_id: {
			// 	type: Sequelize.INTEGER,
			// },
			fk_formresult_id: {
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
		await queryInterface.dropTable("formtwos")
	},
}
