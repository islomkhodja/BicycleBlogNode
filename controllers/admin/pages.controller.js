const models = require('../../models/');
const chalk = require('chalk')
const postProcessing = require('../util/postProcessing');
const sequelize = models.sequelize;

exports.getPagesWithOffset = async (req, res, next) => {
	let offset = 0;
	let limit  = 5;
	if(typeof req.query.page !== "undefined" && req.query.page !== null) {
		offset = req.query.page * limit;
	} else {
		req.query.page = 1;
	}
	let pages = await models.posts.findAll({
		attributes: ['post_id', 'post_title', [sequelize.fn('SUBSTRING', sequelize.col('post_content'), 1, 150),'post_content'], 'url_slug', 'comment_status', 'comment_count', 'userUserId', 'post_created_time', 'user.user_name'],
		order: [['post_created_time', 'DESC']],
		where: {	
			"post_type": "page",
		},
		include : [
				{
					attributes: ['user_name', 'user_type'],
					model: models.users,
				}
			],

		raw:true
	})

	res.locals.pages = pages;

	return res.render("admin/pages/all", {page: parseInt(req.query.page)});
}

exports.showAddPage = async (req, res, next) => {
	
	res.render('admin/pages/pages');
	
}

exports.addPage = async (req, res, next) => {
		
	try {
		let postData = await models.posts.create({
			post_title: req.body.heading,
			post_content: req.body.content,
			url_slug: req.body.url_slug,
			post_type: "page",
			post_status: req.body.status,
			// post_created_time: req.body.date_time,
			comment_status: req.body.comments,
			userUserId: req.user.user_id
		})
		let post = postData.dataValues;
		res.redirect(req.originalUrl);
	
	} catch (err) {
		next(err);
	
	}
	
}

exports.showEditPage = async (req, res, next) => {
	let post_id = req.query.id;
	try {

		let data = await models.posts.findOne({
					where: {
						post_id: post_id,
					},
					raw:true
				})

		
		res.locals.post = data;			

		res.render('admin/pages/editPage');
	} catch(err) {
		next(err);
	}
}

exports.editPage = async(req, res, next) => {
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


		res.redirect('/admin/pages')

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


exports.deletePage = async (req, res, next) => {
	await models.posts.destroy({
		where: {
			post_id: req.body.post_id
		}
	})

	res.redirect('/admin/pages');
}