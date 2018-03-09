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

	Posts.getOffsetPostsId = (offsetNumber, limitNumber) => {
		return Posts.findAll({ 
			offset: offsetNumber, limit: limitNumber,
			where: {	
					"post_type": "post",
					"post_status": "publish",
				},
			attributes: ['post_id'],
			raw:true,
		})	
	}


	Posts.getPostsById = (whereArray) => {
		if(Array.isArray(whereArray)) {
			return Posts.findAll({
				attributes: ['post_id', 'post_title', [sequelize.fn('SUBSTRING', sequelize.col('post_content'), 1, 150),'post_content'], 'url_slug', 'comment_status', 'comment_count', 'userUserId', 'post_created_time', 'user.user_name'],
				order: [['post_created_time', 'DESC']],
				where: {	
					"post_type": "post",
					"post_status": "publish",
					"post_id" : whereArray
				},
				include : [
						{
							attributes: ['user_name', 'user_type'],
							model: sequelize.models.users,
						}
					],

				raw:true
			})	
		}
	}





	Posts.getPostBySlug = async (url_slug) => {
		if(typeof url_slug === "string") {
			try {
				let post = await Posts.findOne({
					attributes: ['post_id', 'post_title', 'post_content', 'url_slug', 'comment_status', 'comment_count', 'userUserId', 'post_created_time'],
					
					where: {	
						"post_type": "post",
						"post_status": "publish",
						"url_slug" : url_slug
					},

					include : [
							{
								attributes: ['user_name', 'user_type'],
								model: sequelize.models.users,
							}
						],

					raw:true
				})
				
				let terms = await sequelize.models.terms_relationship.getAllTermsByPostId(post.post_id);				
				let arr = []; arr.push(post);
				let result = arr.map((post) => {
					post.tags = terms.filter(tag => tag["postPostId"] === post["post_id"] && tag["term.term_type"] === "post_tag")
					post.categories = terms.filter(tag => tag["postPostId"] === post["post_id"] && tag["term.term_type"] === "category");
					return post
				})
				return result[0];
			} catch (error) {
				throw new Error(error);
			}
		}
	}

	return Posts;
}