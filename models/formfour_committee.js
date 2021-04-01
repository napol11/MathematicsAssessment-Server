"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class formfour_committee extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	formfour_committee.init(
		{
			fk_formfour_id: DataTypes.INTEGER,
			fk_committee_id: DataTypes.INTEGER,
			formfour_comone: DataTypes.STRING,
			formfour_comtwo: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "formfour_committee",
			tableName: "formfour_committee",
			timestamps: false,
		}
	)
	return formfour_committee
}
