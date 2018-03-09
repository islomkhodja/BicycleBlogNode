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
		}
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

	TermsRelationship.getAllTermsByPostId = (wherePostsId) => {
		return TermsRelationship.findAll({
				include: [
					{
						// attributes: ['user_name', 'user_type'],
						model: sequelize.models.terms,
					}
				],
				where : {
					postPostId: wherePostsId	
				},
				raw: true
			})
	}

	TermsRelationship.getAllPostsIdByTags = (whichTag, offset, limit) => {
		//offset, limit, wherePostsId
		return TermsRelationship.findAll({
			offset: offset, limit: limit,
			attributes: ['postPostId'],
			include : [				
				{
					model: sequelize.models.terms,
					where: {
						term_type : 'post_tag',
						term_slug : whichTag	
					},
				}
			],
			
			raw: true
		})
	}


	TermsRelationship.getAllPostsIdByCategory = (whichTag, offset, limit) => {
		//offset, limit, wherePostsId
		return TermsRelationship.findAll({
			offset: offset, limit: limit,
			attributes: ['postPostId'],
			include : [				
				{
					model: sequelize.models.terms,
					where: {
						term_type : 'category',
						term_slug : whichTag	
					},
				}
			],
			
			raw: true
		})
	}
	

	return TermsRelationship;
}