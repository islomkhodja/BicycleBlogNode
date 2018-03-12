const models = require('../../models/');
const chalk = require('chalk')
const postProcessing = require('../util/postProcessing');


exports.getPostsWithOffset = async (req, res, next) => {
	let offset = 0;
	let limit  = 5;
	if(typeof req.query.page !== "undefined" && req.query.page !== null) {
		offset = req.query.page * limit;
	} else {
		req.query.page = 1;
	}

	let id = await models.posts.getOffsetPostsId(offset, limit);
	let _id = id.map(post => post.post_id);
	await Promise.all([
		models.posts.getPostsById(_id),
		models.terms_relationship.getAllTermsByPostId(_id)
	]).then((data) => {
		if(data) {
			let posts = data[0];
			let terms = data[1];
			let result = postProcessing(posts, terms);
			res.locals.posts = result;			
		}
		return res.render("admin/posts/all", {page: parseInt(req.query.page)});
	}).catch(err => {
		return next(err);
	})
}

exports.showAddPost = async (req, res, next) => {
	try {
		var categories = await models.terms.getAllCategory();
		res.render('admin/posts/article', {categories});
	} catch(err) {
		next(err);
	}
}

exports.addPost = async (req, res, next) => {
		
	try {
		let postData = await models.posts.create({
			post_title: req.body.heading,
			post_content: req.body.content,
			url_slug: req.body.url_slug,
			post_type: "post",
			post_status: req.body.status,
			// post_created_time: req.body.date_time,
			comment_status: req.body.comments,
			userUserId: req.user.user_id
		})
		let post = postData.dataValues;
		let parallelCreateCategoryReleationship = req.body.category.map(cat => {
			return models.terms_relationship.create({
			 	postPostId: post.post_id,
			 	termTermId: parseInt(cat),
			 })
		})

	 	await Promise.all(parallelCreateCategoryReleationship);

	 	let tags = req.body.tags.split(',');
		
		let parallelTagsFindOrCreate = tags.map(tag => {
			return models.terms.findOrCreate({
				where: {
					term_slug: tag,
					term_type: "post_tag"
				}, 
				defaults: {
					term_name: tag
				}
			})
		})

		let tagsResult = await Promise.all(parallelTagsFindOrCreate);

		let parallelCreateTagsRelationship = tagsResult.map( result => {
			tag = result[0];

			return models.terms_relationship.create({
				postPostId: post.post_id, 
				termTermId: tag.term_id
			})
		})

		await Promise.all(parallelCreateTagsRelationship);

		res.redirect(req.originalUrl);
	
	} catch (err) {
		next(err);
	
	}
	
}

exports.showEditPost = async (req, res, next) => {
	let post_id = req.query.id;
	let data = await Promise.all([
			models.posts.findOne({
				where: {
					post_id: post_id,
				},
				raw:true
			}),
			models.terms_relationship.getAllTermsByPostId(post_id)
		])

	if(data) {
		let posts = data[0];
		let post = []; post.push(posts);
		let terms = data[1];
		let result = postProcessing(post, terms);
		res.locals.post = result[0];			
		res.locals.post.categories = result[0].categories.map(category => category['term.term_name'])
	}

	res.render('admin/posts/editArticle');
}

exports.editPost = async(req, res, next) => {
	// res.json(req.body)
	try {
		await models.posts.update({
				post_title: req.body.heading,
				post_content: req.body.content,
				url_slug: req.body.url_slug,
				post_status: req.body.status,
				comment_status: req.body.comments,
			}, {
				where : {
					url_slug: req.body.oldslug
				}	
			})


		res.redirect('/admin/article')

	} catch(err) {
		next(err);		
	}

	// TODO:
	// update tags
	// update categories
	// 	{
	// "category": [
	// "2"
	// ],
	// "oldtags": "koinot, ilonmask",
	// "tags": "koinot, ilonmask",
	// "url_slug": "spacex-ilon-mask",
	// "heading": "Spacex tayorlab qo'yipti!!",
	// "content": "<p>SpaceX kompaniyasining asoschisi Ilon Mask Marsga parvoz qilishga mo‘ljallangan kemasi 2019-yilning birinchi yarmida ilk bor havoga ko‘tarilishini ma’lum qildi. Bu haqda u Ostindagi (Texas shtati) texnologiya va madaniyat festivalida xabar berdi, <a href=\"https://www.cnbc.com/2018/03/11/elon-musk-says-mars-spaceship-will-be-ready-for-short-trips-by-first-half-of-2019.html\">deb yozadi</a> CNBC News.</p><figure class=\"image\"><img src=\"https://s.daryo.uz/wp-content/uploads/2018/03/marsga-parvoz-680x510.jpg\"></figure><p>Foto: SpaceX</p><p>“Biz sayyoralararo kemani barpo etmoqdamiz, u kelgusi yilning birinchi yarmidan qisqa parvozlarni amalga oshirishi mumkin”, — dedi u.</p><p>SpaceX BFR (Big Falcon Rocket) raketa tizimi to‘liq ko‘p martalik bo‘lishi kutilmoqda. Parvoz Falcon 1 ning birinchi parvozlaridan arzonroq bo‘ladi. BFR ko‘p martalik o‘ta og‘ir raketa va yuzga yaqin kishini sig‘dira oluvchi boshqariluvchi kemani o‘z ichiga oladi.</p>",
	// "comments": "open",
	// "status": "publish"
	// }
}


exports.deletePost = async (req, res, next) => {
	await models.posts.destroy({
		where: {
			post_id: req.body.post_id
		}
	})

	res.redirect('/admin/article');
}