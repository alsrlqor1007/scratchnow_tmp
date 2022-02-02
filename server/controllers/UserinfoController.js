require('dotenv').config();
const db = require('../models');

// token function
// const { generateAccessToken, sendAccessToken, isAuthorized } = require('./signFunctions');

// 클라이언트 token 확인하는 컨트롤러 필요할지도
module.exports = {
    getUserinfoById: (req, res) => {
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
                res.json({ data: { userdata, postAmount }, message: "Mypage Feed" });
            })
        } catch {
            res.json({ message: "Failed to Bring Userinfo" });
        }
    },

    changeNickname: async (req, res) => {
        const { userId, nickname } = req.body;
        const nickExistence = await db.user.findOne({
            where: { nickname: nickname }
        });

        const result = nickExistence !== null ? nickExistence.dataValues : false;
        if (result) {
            res.json({ message: "Nickname Exists" });
        } else {
            db.user.update(
                req.body, { where: { id: userId } }
            ).then((data) => {
                db.user.findOne({
                    where: { id: userId }
                }).then((data) => {
                    res.json({ data: data, message: "Updated the Nickname" });
                })
            });
        };
        // res.json({ message: "Failed to Update UserInfo" });
    },

    changeStatusMsg: (req, res) => {
        const { userId, status_msg } = req.body;

        db.user.update(
            req.body, { where: { id: userId } }
        ).then((data) => {
                db.user.findOne({
                    where: { id: userId }
                }).then((data) => {
                    res.json({ data: data, message: "Updated the Status Message" });
                })
            })
    },

    changeProfileImg: (req, res) => {
        const { userId } = req.body;
        const profile_img = req.file.path;
        
        try {
            db.user.update(
                profile_img, { where: { id: userId } }
            ).then((data) => {
                db.user.findOne({
                    where: { id: userId },
                    attributes: ['id', 'profile_img']
                }).then((data) => {
                    res.json({ data: data, message: "Updated the Profile Img" });
                })
            })
        } catch {
            res.json({ message: "Failed to Update Profile Img" });
        }
    },

    changePassword: (req, res) => {
        const { userId, password } = req.body;

        db.user.update(
            req.body, { where: { id: userId } }
        ).then((data) => {
                db.user.findOne({
                    where: { id: userId }
                }).then((data) => {
                    res.json({ data: data, message: "Updated the Password" });
                })
            })
    },

    deleteUserinfo: async (req, res) => {
        const { userId } = req.body;
        await db.user.destroy({
            where: { id: userId }
        })
        res.json({ message: "Userinfo Deleted" });
    }
};
