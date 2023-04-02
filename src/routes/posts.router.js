const { Router } = require('express');

const Post = require('../models/Post');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { q = '', page = 1, perPage = 18 } = req.query;

    const searchFilter = {
      title: {
        $regex: q,
        $options: 'i',
      },
    };
    const posts = await Post.find(searchFilter, null, {
      limit: +perPage,
      skip: (+page - 1) * +perPage,
    });
    const postsCount = await Post.count(searchFilter);

    res.status(200).json({
      items: posts,
      itemsCount: postsCount,
      page,
      perPage,
      pagesCount: Math.ceil(postsCount / +perPage),
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).send(`Post #${req.params.id} not found`);
      return;
    }

    post.views++;
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!post) {
      res.status(404).send(`Post #${req.params.id} not found`);
      return;
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      res.status(404).send(`Post #${req.params.id} not found`);
      return;
    }

    res.send(`Post #${req.params.id} deleted`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
