"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class doc extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	doc.init(
		{
			doc_name: DataTypes.STRING,
			doc_filesize: DataTypes.INTEGER,
			doc_filetype: DataTypes.STRING,
			doc_timecreate: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: "doc",
			tableName: "doc",
			timestamps: false,
		}
	)
	return doc
}
