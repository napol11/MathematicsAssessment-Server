"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class formtwo_committee extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	formtwo_committee.init(
		{
			fk_formtwo_id: DataTypes.INTEGER,
			formtwo_table: DataTypes.INTEGER,
			fk_committee_id: DataTypes.INTEGER,
			formtwo_sucesscom: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "formtwo_committee",
			tableName: "formtwo_committee",
			timestamps: false,
		}
	)
	return formtwo_committee
}
