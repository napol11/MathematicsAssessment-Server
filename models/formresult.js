"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class formresult extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	formresult.init(
		{
			// fk_formone_id: DataTypes.INTEGER,
			// fk_formfour_id: DataTypes.INTEGER,
			fk_employee_id: DataTypes.INTEGER,
			fk_assessment_id: DataTypes.INTEGER,
			status_result: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "formresult",
			tableName: "formresult",
			timestamps: false,
		}
	)
	return formresult
}
