var models = require('../models');
module.exports = {
    popular: function (callback) {//最受欢迎的图片
        models.Image.find({}, {}, {limit: 9, sort: {likes: -1, views: -1,comments:-1}}, function (err, images) {
            if (err)
                throw err;
            callback(null, images);
        });
    }
};

