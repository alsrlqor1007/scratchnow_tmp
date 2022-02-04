require('dotenv').config();
const db = require('../models');

// token function

// 클라이언트 token 확인하는 컨트롤러 필요할지도
module.exports = {
    createComment: async (req, res) => {
        const { userId, postId, text } = req.body;
        try {
            const CommentInfo = await db.comment.create({ user_id: userId, post_id: postId, text: text });
            db.user.findOne({
                where: { id: userId },
                attributes: ['nickname', 'profile_img']
            }).then((CommentWriter) => {
                res.status(201).json({ data: {CommentInfo, CommentWriter}, message: "Comment Created" });
            })
        } catch {
            res.json({ data: null, message: "Failed to create Comment" });
        }
    },

    updateComment: (req, res) => {
        const { commentId, userid, postId, text } = req.body;
        try {
            db.comment.update(req.body, { where: { id: commentId } });
            db.comment.findOne(
                { where: { id: commentId }}
            ).then((updatedComment) => {
                res.status(201).json({ data: updatedComment, message: "Comment Updated" });
            })
        } catch {
            res.json({ data: null, message: "Failed to update Comment" });
        }
    },

    deleteComment: async (req, res) => {
        const { commentId } = req.body;
        await db.comment.destroy({
            where: { id: req.body.commentId }
        })
        res.json({ data: null, message: "Comment Deleted" });
    }
};
