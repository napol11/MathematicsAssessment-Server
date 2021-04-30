"use strict"
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("docs", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			doc_name: {
				type: Sequelize.STRING,
			},
			doc_filesize: {
				type: Sequelize.INTEGER,
			},
			doc_filetype: {
				type: Sequelize.STRING,
			},
			doc_path: {
				type: Sequelize.STRING,
			},
			fk_result_id: {
				type: Sequelize.INTEGER,
			},
			doc_originalname: {
				type: Sequelize.STRING,
			},
			doc_timecreate: {
				type: Sequelize.DATE,
			},
			table: {
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
		await queryInterface.dropTable("docs")
	},
}
