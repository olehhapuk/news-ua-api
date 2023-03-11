const { Router } = require('express');

const postsRouter = require('./posts.router');

const router = Router();

router.use('/posts', postsRouter);

module.exports = router;
