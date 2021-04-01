"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class formtwo_result extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	formtwo_result.init(
		{
			fk_formtwo_id: DataTypes.INTEGER,
			fk_formresult_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "formtwo_result",
			tableName: "formtwo_result",
			timestamps: false,
		}
	)
	return formtwo_result
}
