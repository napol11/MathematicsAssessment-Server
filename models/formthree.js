"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class formthree extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	formthree.init(
		{
			formthree_num: DataTypes.INTEGER,
			formthree_score: DataTypes.INTEGER,
			formthree_comment: DataTypes.STRING,
			fk_formthreeresult_id: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "formthree",
			tableName: "formthree",
			timestamps: false,
		}
	)
	return formthree
}
