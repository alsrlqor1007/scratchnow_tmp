require('dotenv').config();
const fs = require('fs');
const db = require('../models');

// token function

const dataURLtoFile = (dataurl, fileName) => {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        };
        
        return new File([u8arr], fileName, {type:mime});
    }

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
            res.status(404).json({ message: "Couldn't find the post" });
        }
    },

    createPost: async (req, res) => {
        const { userId, text } = req.body;
        console.log(req.file);
        console.log(req.body);
        
        const paintUrl = req.file.path;
        try {
            await db.post.create({ painting: paintUrl, text: req.body.text, user_id: Number(req.body.userId) })
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
