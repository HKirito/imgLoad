var models = require('../models'),
	async = require('async');

module.exports = function(callback) {//边栏Stats的结构
	async.parallel([
		function(next) {
			models.Image.countDocuments({}, next);//照片总数
		},
		function(next) {
			models.Comment.countDocuments({}, next);//评论总数
		},
		function(next) {
			models.Image.aggregate([{ $group : { _id : '1', viewsTotal : { $sum : '$views' }}}], function(err, result) {
				var viewsTotal = 0;
				if (result.length> 0) {
					viewsTotal += result[0].viewsTotal;
				}
				next(null, viewsTotal);
			});
		},//views的次数
		function(next) {
			models.Image.aggregate([{ $group : {_id : '1', likesTotal : { $sum : '$likes' }}}], function (err, result) {
				var likesTotal = 0;
				if (result.length> 0) {
					likesTotal += result[0].likesTotal;
				}
				next(null, likesTotal);
			});
		}//like的次数
	], function(err, results){
		callback(null, {
			images: results[0],
			comments: results[1],
			views: results[2],
			likes: results[3]
		});
	});
};

