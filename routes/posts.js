/*
  dependencies:
  - express: web framework for node.js
  - sillyname: random name generator
*/
const express = require('express');
const router = express.Router();
const sillyname = require('sillyname');

/*
  data storage:
  - temporary in-memory array to store blog posts
  - each post is an object with id, author, title, content, and timestamps
*/
let posts = [];

/*
  helper functions:
  - generates a unique id for new posts using timestamp and random number
*/
const generateId = () =>
{
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/*
  route handlers:
  - get all posts: renders the index view with all posts (sorted newest first)
  - create new post: handles post creation form submission, generates id and timestamps
  - get edit form: renders the edit form for a specific post
  - update post: handles post update form submission, updates content and timestamp
  - delete post: handles post deletion request, removes post from array
  - random name generator: returns a random silly name as json
*/
router.get('/', (req, res) =>
{
    // sort posts by creation timestamp in descending order (newest first)
    const sortedPosts = [...posts].sort((a, b) => b.createdAtTimestamp - a.createdAtTimestamp);
    res.render('index', { posts: sortedPosts });
});

router.post('/', (req, res) =>
{
    const { author, title, content, category } = req.body;
    console.log('form data:', req.body);
    
    const newPost =
    {
        id: generateId(),
        author,
        title,
        content,
        category,
        createdAt: new Date().toLocaleString('en-US',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }),
        createdAtTimestamp: Date.now()
    };
    
    posts.push(newPost);
    res.redirect('/');
});

router.get('/:id/edit', (req, res) =>
{
    const post = posts.find(p => p.id === req.params.id);
    if (!post)
    {
        return res.redirect('/');
    }
    res.render('edit', { post });
});

router.put('/:id', (req, res) =>
{
    const { author, title, content } = req.body;
    const postIndex = posts.findIndex(p => p.id === req.params.id);
    
    if (postIndex !== -1)
    {
        posts[postIndex] =
        {
            ...posts[postIndex],
            author,
            title,
            content,
            updatedAt: new Date().toLocaleString('en-US',
            {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };
    }
    
    res.redirect('/');
});

router.delete('/:id', (req, res) =>
{
    const postIndex = posts.findIndex(p => p.id === req.params.id);
    console.log('delete request for post:', req.params.id);
    
    if (postIndex !== -1)
    {
        posts.splice(postIndex, 1);
        console.log('updated posts array:', posts);
    }
    
    res.redirect('/');
});

router.get('/generate-name', (req, res) =>
{
    const randomName = sillyname();
    res.json({ name: randomName });
});

/*
  module exports:
  - export the router for use in the main application
*/
module.exports = router;
