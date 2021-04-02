"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class formthree_result extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	formthree_result.init(
		{
			// fk_formthree_id: DataTypes.INTEGER,
			fk_formresult_id: DataTypes.INTEGER,
			fk_committee_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "formthree_result",
			tableName: "formthree_result",
			timestamps: false,
		}
	)
	return formthree_result
}
