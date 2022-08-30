const express = require('express');
const morgan = require('morgan'); 
const mongoose = require('mongoose');
const blogRouters = require('./routes/blogRoutes');

//express app
const app = express();

//Connect to mongodb
const dbURI = 'URL';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));  //middleware & static files
app.use(morgan('dev'));  //use of morgan middleware (3rd party middleware)
app.use(express.urlencoded({ extended: true })); //take urlencoded data from form & pass to request

//------------- basic routes ---------------
app.get('/', (req, res) => {
    res.redirect('/blogs');
});
//About page
app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

//------------- blog routes ---------------
app.use( '/blogs', blogRouters);

//404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
})
