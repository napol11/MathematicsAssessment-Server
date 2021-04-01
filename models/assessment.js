"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class assessment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	assessment.init(
		{
			assessment_name: DataTypes.STRING,
			assessment_start: DataTypes.DATE,
			assessment_end: DataTypes.DATE,
			assessment_endedit: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: "assessment",
			tableName: "assessment",
			timestamps: false,
		}
	)
	return assessment
}
