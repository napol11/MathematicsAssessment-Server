"use strict"
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("committees", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			committee_firstname: {
				type: Sequelize.STRING,
			},
			committee_lastname: {
				type: Sequelize.STRING,
			},
			committee_position: {
				type: Sequelize.STRING,
			},
			committee_tel: {
				type: Sequelize.STRING,
			},
			committee_status: {
				type: Sequelize.INTEGER,
			},
			fk_user_id: {
				type: Sequelize.INTEGER,
			},
			email: {
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
		await queryInterface.dropTable("committees")
	},
}
