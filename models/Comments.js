/*
CREATE TABLE `comments` (
	`comment_id` INT NOT NULL AUTO_INCREMENT,
	`post_id` INT NOT NULL,
	`author_id` INT NOT NULL DEFAULT '0',
	`author_email` varchar(255) NOT NULL UNIQUE,
	`author_name` varchar(100) NOT NULL,
	`comment_message` TEXT NOT NULL,
	`comment_time` TIME NOT NULL,
	`comment_mod_time` TIME NOT NULL,
	`comment_parent` INT NOT NULL DEFAULT '0',
	PRIMARY KEY (`comment_id`)
);
 */

// ../
module.exports = (sequelize, DataTypes) => {
	const Comments = sequelize.define('comments', {
		comment_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
		// post_id: {
		// 	type: DataTypes.INTEGER, 
		// 	references: {
		// 		model: Posts,
		// 		key: 'post_id'
		// 	}},						
		// author_id: {
		// 	type: DataTypes.INTEGER, 
		// 	references: {
		// 		model: User,
		// 		key: 'user_id'
		// 	}},	
		author_email: {
			type: DataTypes.STRING,  
			validate: {
				isEmail: true,
				notNull: true
			},
			unique: true
		},
		author_name: {
			type: DataTypes.STRING,  
			validate: {
				isAlpha: true, 
				notNull: true
			},
		},
		comment_message: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		comment_time: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		},
		comment_mod_time: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		},
		comment_parent: {
			type: DataTypes.INTEGER, 
			defaultValue: 0,
			
			// reference: {
			// 	model: this,
			// 	key: 'term_id'
			// }
		},
	}, {
  timestamps: false
});
		/*
		{ comments: comments,
  posts: posts,
  terms: terms,
  terms_relationship: terms_relationship,
  users: users }

		 */
	Comments.associate = (models) => {
		models.comments.belongsTo(models.posts, {
			onDelete: "CASCADE",
			foreignKey: {
				allowNull: false
			}
		});

		models.comments.belongsTo(models.users, {
			onDelete: "CASCADE",
			foreignKey: {
				allowNull: true
			}
		});
	}

	return Comments;

}