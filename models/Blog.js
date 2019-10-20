const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  name: {
    type: String
  },
  body: {
    type: String
  },
  image_url: {
    type: String
  },
  category: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = Blog = mongoose.model('blog', BlogSchema);