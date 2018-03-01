/*
CREATE TABLE `terms` (
	`term_id` INT NOT NULL AUTO_INCREMENT,
	`term_type` varchar NOT NULL,
	`term_name` varchar NOT NULL UNIQUE,
	`term_slug` varchar NOT NULL UNIQUE,
	`term_parent` INT NOT NULL,
	`term_count` INT NOT NULL,
	PRIMARY KEY (`term_id`)
);
 */

module.exports = (sequelize, DataTypes) => {

	const Terms = sequelize.define('terms', {
		term_id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
		term_type: {type: DataTypes.ENUM('post_tag','category'), allowNull: false},
		term_name: {type: DataTypes.STRING, unique: true, allowNull: false},
		term_slug: {type: DataTypes.STRING, unique: true, allowNull: false},
		term_parent: {
			type: DataTypes.INTEGER, 
			allowNull: true,
			// reference: {
			// 	model: this,
			// 	key: 'term_id'
			// }
		},
		term_count: {type: DataTypes.INTEGER, defaultValue: 0}
	},{
  timestamps: false
});

	return Terms;
}

