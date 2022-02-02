require('dotenv').config();
const db = require('./../models');

// token function


// 클라이언트 token 확인하는 컨트롤러 필요할지도
module.exports = {
    getAllFeedsByDate: (req, res) => {
        try {
            db.post.findAll({
                order: [['createdAt', 'DESC']],
                attributes: ['id', 'painting', 'user_id', 'createdAt']
            }).then((data) => {
                res.json({ data: data, message: "All posts of our service by Date" });
            })
        } catch {
            res.json({ data: null, message: "Failed to Load the Post by Date" });
        }
    },

    getAllFeedsByLikes: (req, res) => {
        try {
            db.post.findAll({
                order: [['total_likes', 'DESC']],
                attributes: ['id', 'painting', 'user_id', 'total_likes']
            }).then((data) => {
                res.json({ data: data, message: "All posts of our service by Likes" });
            })
        } catch {
            res.status(404).json({ data: null, message: "Failed to Load the Post by Likes" });
        }
    },

    getUserFeeds: (req, res) => {
        try {
            db.user.findOne({
                where: { id: req.params.userId },
                attributes: ['id', 'nickname', 'profile_img', 'status_msg', 'total_follow', 'total_follower'],
                include: [{ model: db.post,
                    order: [['createdAt', 'DESC']],
                    attributes: ['id', 'painting', 'createdAt'] }]
            }).then( async (userdata) => {
                const postAmount = await db.post.count({
                    where: { user_id: req.params.userId }
                })
                res.json({ data: { userdata, postAmount }, message: "The User Info and Feeds by Date" });
            })
        } catch {
            res.status(404).json({ message: "Could Not Bring the Info and Posts" });
        }
    },

    getFollowingFeeds: (req, res) => {
        try {
            db.follow.findAll({
                where: { follower_id: req.params.userId },
            }).then((data) => {
                const followingIds = [];
                data.forEach((el) => {
                    const id = el['dataValues'].user_id;
                    if (!followingIds.includes(id)) followingIds.push(id);
                })
                console.log(followingIds)
                db.post.findAll({
                    where: { user_id: followingIds },
                    attributes: ['id', 'painting', 'user_id', 'createdAt'],
                    order: [['createdAt', 'DESC']]
                }).then((data) => {
                    res.json({ data: data, message: "Following Posts" });
                })
            })
        } catch {
            res.status(404).json({ message: "Could Not Bring Following's Posts" });
        }
    }
};