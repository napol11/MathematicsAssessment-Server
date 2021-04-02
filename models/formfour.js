"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class formfour extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	formfour.init(
		{
			formfour_emone: DataTypes.STRING,
			formfour_emtwo: DataTypes.STRING,
			formfour_emthree: DataTypes.STRING,
			formfour_emfour: DataTypes.STRING,
			fk_formresult_id: DataTypes.INTEGER,
			// fk_employee_id: DataTypes.INTEGER,
			// fk_assessment_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "formfour",
			tableName: "formfour",
			timestamps: false,
		}
	)
	return formfour
}
