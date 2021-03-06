require('dotenv').config();
const db = require('../models');

// token function
const { generateAccessToken, sendAccessToken, isAuthorized } = require('./signFunctions');

// 클라이언트 token 확인하는 컨트롤러 필요할지도
module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body;
        
        await db.user.findOne({
            where: { email: email, password: password }
        }).then((data) => {
            if (!data) {
                res.json({ message: "Invalid User" });
            } else {
                const accessToken = generateAccessToken(data.dataValues);
                sendAccessToken(res, accessToken);
            }
        })
    },

    logout: (req, res) => {
        res.clearCookie('accessToken', {
            httpOnly: true, secure: true, sameSite: 'None'
        }).json( { message: "Logout Success" } );
    },

    register: async (req, res) => {
        const { email, nickname, password } = req.body;

        const emailinfo = await db.user.findOne({
            where: { email: email }
        })
        const emailExistence = emailinfo !== null ? emailinfo.dataValues : false;
        if (emailExistence) {
            res.json({ data: email, message: "Email Exists" });
        } else {
            const nickinfo = await db.user.findOne({
                where: { nickname: nickname }
            })
            const nickExistence = nickinfo !== null ? nickinfo.dataValues : false;
        
            if (nickExistence) {
                res.json({ data: nickname, message: "Nickname Exists" });
            } else {
                db.user.create({ email, nickname, password })
                .then((data) => {
                    const { id, email, password, nickname } = data;
                    const payload = { id, email, nickname };

                    const accessToken = generateAccessToken(payload);
                    res.status(201).cookie('jwt', accessToken).json({ data: payload, message: "Successfully Registered" });
                })
            }
        }
    },

    check: (req, res) => {
        
    }
};
