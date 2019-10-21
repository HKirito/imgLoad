var models = require('../models'),
	async = require('async');

module.exports = {
	newest: function(callback) {//按时间倒序显示最新的五条评论
		models.Comment.find({}, {}, {limit: 5, sort: {'timestamp': -1}}, function(err, comments){
			var attachImage = function(comment, next){
				models.Image.findOne({ _id: comment.image_id}, function(err, image){
					if(err){
						throw err;
					}
					comment.image = image;
					next(err);

				});
			};

			async.each(comments, attachImage, function(err){
				if(err){
					throw err;
				}
				callback(err, comments);
			});
		});//按timestamp倒序排列，只显示五个
	}
};

