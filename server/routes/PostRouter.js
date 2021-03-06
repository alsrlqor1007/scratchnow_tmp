const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const postController = require('../controllers/PostController');

// multer setting

try {
    fs.readdirSync('../uploads/');
    console.log('폴더가 있습니다.')
} catch {
    console.error('폴더가 없습니다.')
}

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

router.get('/:postId', postController.getPostById);
router.post('/', upload.single('painting'), postController.createPost);
router.patch('/', postController.updatePostById);
router.delete('/', postController.deletePost);

module.exports = router;