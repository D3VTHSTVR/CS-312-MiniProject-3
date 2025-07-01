/*
  dependencies:
  - express: web framework for node.js
*/
const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust path if needed

/*
  authentication middleware:
  - checks if user is authenticated before allowing access to protected routes
*/
const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/auth/signin');
    }
    next();
};

/*
  route handlers:
  - get all posts: renders the index view with all posts (sorted newest first)
  - create new post: handles post creation form submission, generates id and timestamps
  - update post: handles post update form submission, updates content and timestamp
  - delete post: handles post deletion request, removes post from the database
*/

/*
  get all posts route
  renders the main index page with all posts sorted by creation date
*/
router.get('/', requireAuth, async (req, res) =>
{
    try {
        const { category } = req.query;
        let query = 'SELECT * FROM blogs';
        const params = [];

        if (category) {
            query += ' WHERE LOWER(category) = LOWER($1)';
            params.push(category);
        }

        query += ' ORDER BY date_created DESC';

        const result = await db.query(query, params);
        
        res.render('index', { 
            posts: result.rows, 
            user: req.session.user,
            selectedCategory: category || '' 
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

/*
  create new post route
  handles form submission for creating a new blog post
*/
router.post('/', requireAuth, async (req, res) =>
{
    try {
        const { title, content, category } = req.body;
        await db.query(
            'INSERT INTO blogs (creator_user_id, creator_name, title, body, category, date_created) VALUES ($1, $2, $3, $4, $5, NOW())',
            [req.session.user.user_id, req.session.user.name, title, content, category]
        );
        res.redirect('/posts');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

/*
  update post route
  handles form submission for updating an existing post
*/
router.put('/:id', requireAuth, async (req, res) =>
{
    try {
        const { title, content, category } = req.body;
        const postId = req.params.id;
        // Check ownership
        const postResult = await db.query('SELECT * FROM blogs WHERE blog_id = $1', [postId]);
        const post = postResult.rows[0];
        if (!post) return res.status(404).send('Post not found');
        if (post.creator_user_id !== req.session.user.user_id) return res.status(403).send('You can only edit your own posts');
        // Update in DB
        await db.query(
            'UPDATE blogs SET title = $1, body = $2, category = $3 WHERE blog_id = $4',
            [title, content, category, postId]
        );
        res.redirect('/posts');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

/*
  delete post route
  handles deletion request for a specific post by id
*/
router.delete('/:id', requireAuth, async (req, res) =>
{
    try {
        const postId = req.params.id;
        const postResult = await db.query('SELECT * FROM blogs WHERE blog_id = $1', [postId]);
        const post = postResult.rows[0];
        if (!post) return res.status(404).send('Post not found');
        if (post.creator_user_id !== req.session.user.user_id) return res.status(403).send('You can only delete your own posts');
        await db.query('DELETE FROM blogs WHERE blog_id = $1', [postId]);
        res.redirect('/posts');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

/*
  module exports:
  - export the router for use in the main application
*/
module.exports = router;
