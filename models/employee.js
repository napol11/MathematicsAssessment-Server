"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class employee extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	employee.init(
		{
			employee_firstname: DataTypes.STRING,
			employee_lastname: DataTypes.STRING,
			employee_position: DataTypes.STRING,
			employee_number: DataTypes.INTEGER,
			employee_tel: DataTypes.STRING,
			employee_degree: DataTypes.STRING,
			employee_group: DataTypes.STRING,
			employee_start: DataTypes.DATE,
			fk_user_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "employee",
			tableName: "employee",
			timestamps: false,
		}
	)
	return employee
}
