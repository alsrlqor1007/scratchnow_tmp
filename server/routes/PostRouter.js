const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const postController = require('../controllers/PostController');

// multer setting
const upload = multer({
    storage: multer.diskStorage({
        // 저장 공간
        destination: (req, file, done) => {
            done(null, '/server/uploads/paintings/');
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