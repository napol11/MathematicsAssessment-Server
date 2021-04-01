"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class formtwo extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	formtwo.init(
		{
			formtwo_table: DataTypes.INTEGER,
			formtwo_name: DataTypes.STRING,
			formtwo_fte: DataTypes.INTEGER,
			formtwo_sucessem: DataTypes.INTEGER,
			formtwo_comment: DataTypes.STRING,
			formtwo_code: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "formtwo",
			tableName: "formtwo",
			timestamps: false,
		}
	)
	return formtwo
}
