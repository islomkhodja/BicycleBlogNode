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

	Terms.prototype.getTagsForEditArticle = function(post_id) {
		/*
	SELECT GROUP_CONCAT(terms.term_slug) as tags 
	FROM `terms_relationships` 
	inner join terms on terms.term_id = terms_relationships.termTermId 
	where terms.term_type = 'post_tag' and terms_relationships.postPostId = 1
	*/

	// secondd variant
	
	/*
	SELECT GROUP_CONCAT(terms.term_slug) as tags 
	FROM `terms_relationships`, `terms` 
	WHERE terms.term_id = terms_relationships.termTermId 
	and terms.term_type = 'post_tag' and terms_relationships.postPostId = 1
	 */
	

	};

	Terms.prototype.getAllCategory = function() {
		return Terms.findAll({
			attributes: ['term_name', 'term_slug', 'term_count'],
			where: {
				term_type:'category'
			}
		})
	}

	Terms.prototype.getAllTags = function() {
		return Terms.findAll({
			attributes: ['term_name', 'term_slug', 'term_count'],
			where: {
				term_type:'post_tag'
			}
		})
	};


	return Terms;
}

