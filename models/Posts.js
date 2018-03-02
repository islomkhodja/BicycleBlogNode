/*

CREATE TABLE `posts` (
	`post_id` INT NOT NULL AUTO_INCREMENT,
	`author_id` INT NOT NULL,
	`created_time` TIME NOT NULL,
	`modified_time` TIME NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` TEXT NOT NULL,
	`url_slug` varchar(255) NOT NULL UNIQUE,
	`post_type` varchar NOT NULL DEFAULT 'post',
	`post_status` varchar NOT NULL DEFAULT 'draft',
	`comment_status` varchar NOT NULL DEFAULT 'open',
	`comment_count` INT NOT NULL,
	`post_parent` INT NOT NULL DEFAULT '0',
	PRIMARY KEY (`post_id`)
);

*/


module.exports = (sequelize, DataTypes) => {
	const Posts = sequelize.define('posts', {
		post_id: 			{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
		// author_id: 			{type: DataTypes.INTEGER, allowNull: false, references: {model: User, key: 'user_id'}},
		post_title: 		{type: DataTypes.STRING, allowNull: false},
		post_content: 		{type: DataTypes.TEXT},
		url_slug: 			{type: DataTypes.STRING, unique: true, allowNull: false},
		post_type: 			{type: DataTypes.ENUM('page', 'post', 'menu'), allowNull: false},
		post_status: 		{type: DataTypes.ENUM('draft','publish','close', 'trash'), allowNull: false},
		post_created_time: 	{type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false},
		post_modified_time: {type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false},
		post_parent: 		{type: DataTypes.INTEGER},
		comment_status: 	{type: DataTypes.ENUM('open', 'close'), defaultValue: 'open'},
		comment_count: 		{type: DataTypes.INTEGER, defaultValue : 0}
	},{
  timestamps: false
});

	Posts.associate = (models) => {
		models.posts.belongsTo(models.users, {
			onDelete: "CASCADE",
			foreignKey: {
				allowNull: false
			}
		});
	}

	return Posts;
}