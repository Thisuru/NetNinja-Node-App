const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

//Blog Create form render (render the create form)
router.get('/create', (req, res) => {
    res.render('create', {title: 'Create a new Blog'});
})

//get blogs (render the index page)
router.get('/', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
     .then((result) => res.render('index', {title: 'All Blogs', blogs: result}))
     .catch((err) => console.log(err))
})

// router.get('/', async (req, res) => {

//     try {
//         const resu = await Blog.find()
//         res.render('index', {title: 'All Blogs', blogs: resu})
//     } catch (error) {
//         console.log(error);
//     }
// })

//Blog create post API call (Save form data in db)
router.post('/', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
    .then((result) => res.redirect('/blogs'))
    .catch((err) => console.log(err))
})

//get API (render the details page based on params id)
router.get('/:id', (req, res) => {
    const id = req.params.id;

    Blog.findById(id)
     .then((result) => res.render('details', {title: 'Blog Details', blog: result}))
     .catch((err) => console.log(err))
})

//delete API handler
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
     .then((result) => res.json({ redirect: '/blogs' }))
     .catch((err) => console.log(err))
})

module.exports = router;