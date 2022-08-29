const express = require('express');
const morgan = require('morgan'); 
const mongoose = require('mongoose');
const Blog = require('./models/blog');

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

//------------- Blog Routes  ---------------
//get blogs (render the index page)
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
     .then((result) => res.render('index', {title: 'All Blogs', blogs: result}))
     .catch((err) => console.log(err))
})

//Blog create post API call (Save form data in db)
app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
    .then((result) => res.redirect('/blogs'))
    .catch((err) => console.log(err))
})

//get API (render the details page based on params id)
app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findById(id)
     .then((result) => res.render('details', {title: 'Blog Details', blog: result}))
     .catch((err) => console.log(err))
})

//delete API handler
app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
     .then((result) => res.json({ redirect: '/blogs' }))
     .catch((err) => console.log(err))
})

//Blog Create form render (render the create form)
app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a new Blog'});
})

//404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
})