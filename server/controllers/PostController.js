require('dotenv').config();
const db = require('../models');

// token function


// 클라이언트 token 확인하는 컨트롤러 필요할지도
module.exports = {
    getPostById: (req, res) => {
        try {
            db.post.findOne({
                where: { id: req.params.postId },
                include: [{
                    model: db.comment,
                    attributes: ['id', 'user_id', 'text', 'updatedAt'],
                    include: [{ model: db.user, attributes: ['nickname', 'profile_img'] }] }]
            }).then((data) => {
                res.json({ data: data, message: "The Post Detail" });
            });
        } catch {
            res.status(404).json({ message: "Couldn't find the post"});
        }
    },

    createPost: async (req, res) => {
        // const { userId, text, painting } = req.body;
        const { userId, text, painting } = req.file;
        console.log(req.file);
        try {
            await db.post.create({ painting, text, user_id: Number(userId) })
            .then((data) => {
                res.json({ data: data, message: "Created Successfully" });
            });
        } catch {
            res.status(400).json({ message: "Failed creating post" });
        }
    },

    updatePostById: async (req, res) => {
        const { postId, painting, text } = req.body;
        try {
            await db.post.update({ painting, text }, {
                where: { id: postId }
            }).then((data) => {
                db.post.findOne({
                    where: { id: postId }
                }).then((data) => {
                    res.json({ data: data, message: "Updated Successfully" });
                });
            });
        } catch {
            res.json({ message: "Failed to update Post" });
        }
    },

    deletePost: async (req, res) => {
        const { postId } = req.body;
        await db.post.destroy({
            where: { id: postId }
        })
        res.json({ data: null, message: "Post deleted" });
    }
};
