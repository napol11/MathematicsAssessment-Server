"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class formresultHead extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	formresultHead.init(
		{
			grad: DataTypes.STRING,
			pass: DataTypes.STRING,
			salary: DataTypes.STRING,
			fk_committee_id: DataTypes.INTEGER,
			fk_formresult_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "formresultHead",
			tableName: "formresultHead",
			timestamps: false,
		}
	)
	return formresultHead
}
