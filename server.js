const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes.js');
require('dotenv').config();
const mongoose = require('mongoose');

const allowedOrigins = [
  'https://mrpigbankers.onrender.com',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

  
app.use(express.static('public'));
app.use(express.json());

//import routes from routes.js
app.use("/api", routes);

//DO NOT DELETE MONGODB INFORMATIOn
const CONNECTION_URL = 'mongodb+srv://rmkozlowski31:Kozlowski1!@cluster0.adctlef.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp';
const PORT = process.env.PORT || 9090;
  
mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));

//cors requests
const corsOptions = {
    origin: 'http://localhost:3000', // Update this to your front-end URL
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

//TEST
app.get('/api', function (req, res) {
    res.json("title: hello!")
  })

/* starter code */
app.get('/account/create/:name/:email/:password', function (req, res) {
  res.send({
    name: req.params.name,
    email: req.params.email,
    password: req.params.password
  });
});

app.get('/account/login/:email/:password', function (req, res) {
  res.send({
    email: req.params.email,
    password: req.params.password
  });
});

app.get('/account/all', function (req, res) {
  res.send({
    name: 'peter',
    email: 'peter@mit.edu',
    password: 'secret'
  });
});


// Added middleware for error handling
// Handle 404 errors
app.use(function (req, res, next) {
    res.status(404).send('404: Page not found');
  });
  
  // Handle other errors
  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('500: Internal Server Error');
  });  

module.exports = app;


