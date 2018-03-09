module.exports = (posts, terms) => {
	return posts.map((post) => {
		post.tags = terms.filter((tag) => {
			return tag["postPostId"] === post["post_id"] && tag["term.term_type"] === "post_tag"
		})
		post.categories = terms.filter((tag) => {
			return tag["postPostId"] === post["post_id"] && tag["term.term_type"] === "category"
		});

		return post
	})
}