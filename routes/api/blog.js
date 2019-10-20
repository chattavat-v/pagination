const express = require('express');
const faker = require('faker');
const router = express.Router();
const Blog = require('../../models/Blog');

// @route GET api/blog
// @desc Create Data blog with faker
// @access Public
router.get('/', async (req, res) => {
  const myArray = [
    "Hardware",
    "Software",
    "Electronics"
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
  }
});

module.exports = router;