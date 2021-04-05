"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class committee extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	committee.init(
		{
			committee_firstname: DataTypes.STRING,
			committee_lastname: DataTypes.STRING,
			committee_position: DataTypes.STRING,
			committee_tel: DataTypes.STRING,
			committee_status: DataTypes.INTEGER,
			email: DataTypes.STRING,
			fk_user_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "committee",
			tableName: "committee",
			timestamps: false,
		}
	)
	return committee
}
