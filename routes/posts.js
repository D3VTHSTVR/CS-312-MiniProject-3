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
  - update post: handles post update form submission, updates content and timestamp
  - delete post: handles post deletion request, removes post from array
  - random name generator: returns a random silly name as json
*/

/*
  get all posts route
  renders the main index page with all posts sorted by creation date
*/
router.get('/', (req, res) =>
{
    /*
      sort posts by creation timestamp in descending order (newest first)
      creates a copy of the array to avoid mutating the original
    */
    const sortedPosts = [...posts].sort((a, b) => b.createdAtTimestamp - a.createdAtTimestamp);
    res.render('index', { posts: sortedPosts });
});

/*
  create new post route
  handles form submission for creating a new blog post
*/
router.post('/', (req, res) =>
{
    /*
      extract form data from request body
      destructure author, title, content, and category fields
    */
    const { author, title, content, category } = req.body;
    console.log('form data:', req.body);
    
    /*
      create new post object with generated id and formatted timestamps
      includes all form fields plus metadata
    */
    const newPost =
    {
        id: generateId(),
        author,
        title,
        content,
        category,
        /*
          format creation date for display
          uses us locale with full month name and 12-hour time
        */
        createdAt: new Date().toLocaleString('en-US',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }),
        /*
          store raw timestamp for sorting purposes
          used to maintain chronological order
        */
        createdAtTimestamp: Date.now()
    };
    
    /*
      add new post to the posts array
      redirect to home page to show the new post
    */
    posts.push(newPost);
    res.redirect('/');
});

/*
  update post route
  handles form submission for updating an existing post
*/
router.put('/:id', (req, res) =>
{
    /*
      extract updated form data from request body
      destructure author, title, and content fields
    */
    const { author, title, content } = req.body;
    /*
      find the index of the post to update
      returns -1 if no post is found with the given id
    */
    const postIndex = posts.findIndex(p => p.id === req.params.id);
    
    /*
      if post exists (index is not -1), update it with new data
      preserves existing fields and adds updated timestamp
    */
    if (postIndex !== -1)
    {
        /*
          update the post at the found index
          spread operator preserves existing fields
          adds updated timestamp for tracking changes
        */
        posts[postIndex] =
        {
            ...posts[postIndex],
            author,
            title,
            content,
            /*
              format update date for display
              uses same format as creation date
            */
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
    
    /*
      redirect to home page to show the updated post
      regardless of whether update was successful
    */
    res.redirect('/');
});

/*
  delete post route
  handles deletion request for a specific post by id
*/
router.delete('/:id', (req, res) =>
{
    /*
      find the index of the post to delete
      returns -1 if no post is found with the given id
    */
    const postIndex = posts.findIndex(p => p.id === req.params.id);
    console.log('delete request for post:', req.params.id);
    
    /*
      if post exists (index is not -1), remove it from the array
      splice method removes one element at the specified index
    */
    if (postIndex !== -1)
    {
        posts.splice(postIndex, 1);
        console.log('updated posts array:', posts);
    }
    
    /*
      redirect to home page to show the updated post list
      regardless of whether deletion was successful
    */
    res.redirect('/');
});

/*
  random name generator route
  returns a random silly name as json for the frontend
*/
router.get('/generate-name', (req, res) =>
{
    /*
      generate a random silly name using the sillyname library
      returns it as json response for ajax requests
    */
    const randomName = sillyname();
    res.json({ name: randomName });
});

/*
  module exports:
  - export the router for use in the main application
*/
module.exports = router;
