"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class formone extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	formone.init(
		{
			formone_lasick: DataTypes.INTEGER,
			formone_lapaper: DataTypes.INTEGER,
			formone_laprivate: DataTypes.INTEGER,
			formone_lalate: DataTypes.INTEGER,
			formone_laleave: DataTypes.INTEGER,
			formone_lababy: DataTypes.INTEGER,
			formone_lamonk: DataTypes.INTEGER,
			formone_lamilitary: DataTypes.INTEGER,
			formone_historypromo: DataTypes.STRING,
			formone_historypunish: DataTypes.STRING,
			formone_study: DataTypes.INTEGER,
			formone_studystart: DataTypes.DATE,
			formone_studyend: DataTypes.DATE,
			formone_studyback: DataTypes.DATE,
			formone_budgetone: DataTypes.STRING,
			formone_budgettwo: DataTypes.STRING,
			formone_promoone: DataTypes.STRING,
			formone_promotwo: DataTypes.STRING,
			formone_punishdate: DataTypes.STRING,
			formone_punishlevel: DataTypes.STRING,

			// fk_employee_id: DataTypes.INTEGER,
			// fk_assessment_id: DataTypes.INTEGER,
			fk_formresult_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "formone",
			tableName: "formone",
			timestamps: false,
		}
	)
	return formone
}
