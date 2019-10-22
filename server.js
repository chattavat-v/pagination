const express = require('express');
const connectDB = require('./database/db');
const app = express();

// Connect Database
connectDB();

// Initial Middleware
app.use(
  express.json({
    extended: false
  })
);

app.get('/init', (req, res) => {
  res.send("API is running success (^_^')");
});

// Define Router
app.use('/api/blog', require('./routes/api/blog'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});