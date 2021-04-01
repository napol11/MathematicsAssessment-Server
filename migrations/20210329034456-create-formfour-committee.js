"use strict"
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("formfour_committees", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			fk_formfour_id: {
				type: Sequelize.INTEGER,
			},
			fk_committee_id: {
				type: Sequelize.INTEGER,
			},
			formfour_comone: {
				type: Sequelize.STRING,
			},
			formfour_comtwo: {
				type: Sequelize.STRING,
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
		await queryInterface.dropTable("formfour_committees")
	},
}
