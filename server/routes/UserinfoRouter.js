const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
// const app = express();
const userinfoController = require('../controllers/UserinfoController');

// multer setting
const upload = multer({
    storage: multer.diskStorage({
        // 저장 공간
        destination: (req, file, done) => {
            done(null, '../uploads/');
        },
        // 저장 이름
        filename: (req, file, done) => {
            done(null, new Date().valueOf() + path.extname(file.originalname));
        },
        fileFilter: (req, file, done) => {
            if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
                done(null, true); // 해당 mimetype만 저장가능
            } else {
                done(null, false);
            }
        }
    })
});

// app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));

router.get('/:userId', userinfoController.getUserinfoById);
router.patch('/nick', userinfoController.changeNickname);
router.patch('/msg', userinfoController.changeStatusMsg);
router.patch('/img', upload.single('profile_img'), userinfoController.changeProfileImg);
router.patch('password', userinfoController.changePassword);
router.delete('/', userinfoController.deleteUserinfo);

module.exports = router;
