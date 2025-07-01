/*
  dependencies:
  - express: web framework for node.js
  - md5: password hashing library
*/
const express = require('express');
const router = express.Router();
const md5 = require('md5');
const db = require('../db'); 

/*
  route handlers:
  - signup page: displays user registration form
  - signup form submission: creates new user account
  - signin page: displays user login form
  - signin form submission: authenticates user and creates session
  - logout: destroys user session
*/

/*
  signup page route
  renders the user registration form
*/
router.get('/signup', (req, res) => {
    res.render('signup', { error: null });
});

/*
  signup form submission route
  handles user registration form submission
*/
router.post('/signup', async (req, res) => {
    try {
        const { user_id, password, name } = req.body;
        // check if user_id already exists (plain text)
        const existingUser = await db.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
        if (existingUser.rows.length > 0) {
            return res.render('signup', { 
                error: 'User ID already taken. Please choose a different one.' 
            });
        }
        // hash the password with md5
        const hashedPassword = md5(password);
        // insert new user into the database (unique_id is auto-generated)
        await db.query('INSERT INTO users (user_id, password, name) VALUES ($1, $2, $3)', [user_id, hashedPassword, name]);
        res.redirect('/auth/signin');
    } 
    catch (error) {
        console.error('signup error:', error);
        res.render('signup', { 
            error: 'Error creating account. Please try again.' 
        });
    }
});

/*
  signin page route
  renders the user login form
*/
router.get('/signin', (req, res) => {
    res.render('signin', { error: null });
});

/*
  signin form submission route
  handles user login form submission
*/
router.post('/signin', async (req, res) => {
    try {
        const { user_id, password } = req.body;
        // find user by plain user_id
        const userResult = await db.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
        const user = userResult.rows[0];
        if (!user) {
            return res.render('signin', { 
                error: 'Invalid user ID or password.' 
            });
        }
        if (md5(password) !== user.password) {
            return res.render('signin', { 
                error: 'Invalid user ID or password.' 
            });
        }
        // create session for authenticated user (store unique_id and name)
        req.session.user = {
            unique_id: user.unique_id,
            user_id: user.user_id, 
            name: user.name
        };
        console.log('user signed in:', user.unique_id);
        res.redirect('/posts');
    } 
    catch (error) {
        console.error('signin error:', error);
        res.render('signin', { 
            error: 'Error signing in. Please try again.' 
        });
    }
});

/*
  logout route
  destroys user session and redirects to signin page
*/
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('logout error:', err);
        }
        res.redirect('/auth/signin');
    });
});

// middleware to require authentication
function requireAuth(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/auth/signin');
    }
    next();
}

// account page (GET)
router.get('/account', requireAuth, async (req, res) => {
    res.render('account', { user: req.session.user, error: null, success: null });
});

// account update (POST)
router.post('/account', requireAuth, async (req, res) => {
    try {
        const { new_user_id, new_password } = req.body;
        const current_unique_id = req.session.user.unique_id;
        // check if new_user_id is taken (plain text, and not the current user's own user_id)
        const existingUser = await db.query('SELECT * FROM users WHERE user_id = $1 AND unique_id != $2', [new_user_id, current_unique_id]);
        if (existingUser.rows.length > 0) {
            return res.render('account', { user: req.session.user, error: 'User ID already taken.', success: null });
        }
        // hash new password
        const hashedPassword = md5(new_password);
        // update user in db using unique_id
        await db.query('UPDATE users SET user_id = $1, password = $2 WHERE unique_id = $3', [new_user_id, hashedPassword, current_unique_id]);
        // update blogs to use new user_id
        await db.query('UPDATE blogs SET creator_user_id = $1 WHERE creator_user_id = $2', [new_user_id, req.session.user.user_id]);
        // update session
        req.session.user.user_id = new_user_id;
        res.render('account', { user: req.session.user, error: null, success: 'Account updated successfully.' });
    } catch (error) {
        console.error('account update error:', error);
        res.render('account', { user: req.session.user, error: 'Error updating account. Please try again.', success: null });
    }
});

module.exports = router;