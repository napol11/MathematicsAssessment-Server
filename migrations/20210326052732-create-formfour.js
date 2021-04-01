"use strict"
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("formfours", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			formfour_emone: {
				type: Sequelize.STRING,
			},
			formfour_emtwo: {
				type: Sequelize.STRING,
			},
			formfour_emthree: {
				type: Sequelize.STRING,
			},
			formfour_emfour: {
				type: Sequelize.STRING,
			},
			fk_employee_id: {
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
		await queryInterface.dropTable("formfours")
	},
}
