/*
CREATE TABLE `terms_relationship` (
	`post_id` INT NOT NULL,
	`term_id` INT NOT NULL
);
 */

module.exports = (sequelize, DataTypes) => {
	const TermsRelationship = sequelize.define('terms_relationship', {
		id : { 
			type: DataTypes.INTEGER,
			primaryKey: true, 
			allowNull: false,
			autoIncrement: true 
		},

		// post_id: {
		// 	type: DataTypes.INTEGER, 
		// 	references: {
		// 		model: Posts,
		// 		key: 'post_id'
		// 	}
		// },
		// term_id: {
		// 	type: DataTypes.INTEGER, 
		// 	references: {
		// 		model: Terms,
		// 		key: 'term_id'
		// 	}
		// },
	},{
  timestamps: false
});

	TermsRelationship.associate = function(models) {
		models.terms_relationship.belongsTo(models.posts, {
			onDelete: "CASCADE",
			foreignKey: {
				allowNull: false
			}
		});

		models.terms_relationship.belongsTo(models.terms, {
			onDelete: "CASCADE",
			foreignKey: {
				allowNull: false
			}
		});		
	}

	return TermsRelationship;
}