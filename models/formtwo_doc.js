"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class formtwo_doc extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	formtwo_doc.init(
		{
			fk_formtwo_id: DataTypes.INTEGER,
			fk_doc_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "formtwo_doc",
			tableName: "formtwo_doc",
			timestamps: false,
		}
	)
	return formtwo_doc
}
