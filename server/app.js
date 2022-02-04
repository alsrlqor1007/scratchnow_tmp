require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 80;

// Router 연결
const SignRouter = require('./routes/SignRouter');
const UserinfoRouter = require('./routes/UserinfoRouter');
const CommentRouter = require('./routes/CommentRouter');
const FollowRouter = require('./routes/FollowRouter');
const PostRouter = require('./routes/PostRouter');
const FeedsRouter = require('./routes/FeedsRouter');
const LikesRouter = require('./routes/LikesRouter');

// Middleware
app.use(
    cors({
      origin: '*',
      // [
      //   'http://localhost:3000',
      //   'http://localhost:80',
      //   'http://ec2-52-78-171-4.ap-northeast-2.compute.amazonaws.com'
      // ],
      credentials: true,
      methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(form_data.array());

app.use('/api/sign', SignRouter);
app.use('/api/post', PostRouter);
app.use('/api/userinfo', UserinfoRouter);
app.use('/api/follow', FollowRouter);
app.use('/api/comment', CommentRouter);
app.use('/api/feeds', FeedsRouter);
app.use('/api/likes', LikesRouter);

app.get('/', (req, res) => {
    res.send('ScratchNow Server Works!');
})

app.listen(port, () => {
  console.log(`ScratchNow Server Running | http://localhost:${port}`);
});

module.exports = app;
