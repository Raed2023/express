const express = require('express');
const path = require("path");
const app = express();

// Custom middleware to verify the time of the request
const workingHours = (req, res, next) => {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.status(503).send('Sorry, we are closed now. Please visit us during working hours (Mon-Fri, 9am-5pm).');
  }
};

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Define routes
app.get('/', workingHours, (req, res) => {
  res.render('home', { title: 'Home' });
});

app.get('/Our services', workingHours, (req, res) => {
  res.render('Our services', { title: 'Our Services' });
});

app.get('/Contact us', workingHours, (req, res) => {
  res.render('Contact us', { title: 'Contact Us' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

