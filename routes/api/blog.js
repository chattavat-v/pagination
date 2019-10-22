const express = require('express');
const faker = require('faker');
const router = express.Router();
const Blog = require('../../models/Blog');

// @route GET api/blog/create
// @desc Create Data blog with faker
// @access Public
router.get('/create', async (req, res) => {
  const myArray = [
    "all, hardware",
    "all, software",
    "all, electronics"
  ];

  let randomItem = myArray[Math.floor(Math.random()*myArray.length)]

  try {
    let blog = new Blog ({
      name: faker.name.findName(),
      body: faker.lorem.paragraph(),
      image_url: faker.image.imageUrl(),
      category: randomItem
    });
  
    await blog.save();
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  };
});

// @route GET /api/blog
// @desc Get all blog
// @access Public
router.get('/', async (req, res) => {
  try {
    let blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  };
});

// @route DELETE /api/blog/:id
// @desc Delete blog by id
// @access Public
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if(!blog) {
      return res.status(404).json({ msg: 'Blog not found'});
    };

    await blog.remove();
    res.json({ msg: 'Blog removed'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  };
});

// @route GET /api/blog/paginate/:page
// @desv Get blog by filter
// @access Public
router.get('/paginate/:page', async (req, res) => {
  try {
    const page = req.params.page || 1;
    const { category, perPage } = req.query;

    await Blog
      .find({ category: { $regex: category } })
      .skip((perPage * page) - perPage)
      .limit(parseInt(perPage))
      .exec((err, blogs) => {
        Blog.find({ category: { $regex: category } }).countDocuments().exec((err, count) => {
            if (err) return next(err)
            res.json({
                blogs: blogs,
                current: parseInt(page),
                pages: Math.ceil(count / perPage)
            })
        })
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  };
})

module.exports = router;