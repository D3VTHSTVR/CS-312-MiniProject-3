# CS-312 MiniProject 3

A modern blog platform built with Node.js, Express, EJS, and PostgreSQL, styled with Bootstrap.

## Features
- User signup, signin, and logout
- Account management (change user ID and password)
- Create, edit, and delete your own blog posts
- Category selection and filtering
- Responsive, modern UI with Bootstrap and custom CSS
- Secure password storage (MD5 for demo purposes)
- Only post owners can edit or delete their posts

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/) (local or remote)

### Database Setup
1. Create a database named `BlogDB` in PostgreSQL:
   ```sh
   createdb BlogDB
   ```
2. Create the required tables:
   ```sql
   CREATE TABLE users (
     unique_id SERIAL PRIMARY KEY,
     user_id VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     name VARCHAR(255) NOT NULL
   );

   CREATE TABLE blogs (
     blog_id SERIAL PRIMARY KEY,
     creator_user_id VARCHAR(255) REFERENCES users(user_id),
     creator_name VARCHAR(255) NOT NULL,
     title VARCHAR(255) NOT NULL,
     body TEXT NOT NULL,
     category VARCHAR(100) NOT NULL,
     date_created TIMESTAMP DEFAULT now()
   );
   ```
3. Update `db.js` with your PostgreSQL username and password if needed.

### Installation
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd <your-project-folder>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the App
Start the server:
```sh
npm start
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
```
MiniProject3/
├── public/
│   ├── css/
│   │   └── styles.css
│   └── images/
├── routes/
│   ├── auth.js
│   └── posts.js
├── views/
│   ├── account.ejs
│   ├── index.ejs
│   ├── signin.ejs
│   ├── signup.ejs
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
├── db.js
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

## Usage
- Sign up for a new account on the signup page
- Sign in with your user ID and password
- Create a post using the form on the main page
- Filter posts by category using the dropdown
- Edit or delete your own posts using the buttons on each post
- Update your user ID or password on the account page
- Log out using the header menu

## Technical Details

### Architecture
- Backend: Node.js with Express.js
- Frontend: EJS templating with Bootstrap 5
- Styling: Custom CSS variables with Bootstrap
- Data Storage: PostgreSQL database
- Authentication: Session-based with express-session
- Password Hashing: MD5 (for demo; use bcrypt in production)

### Code Quality
- All files are clearly commented with lowercase comments above code
- No inline comments
- Clean, modern, and responsive codebase
- Consistent styling with Bootstrap and custom enhancements

## Customization
- Modify CSS variables in `public/css/styles.css` for theming
- Add new categories in the form dropdowns in `views/index.ejs`
- Extend functionality in `routes/posts.js` and `routes/auth.js`
- Customize UI in the EJS templates

## Development Notes
- All data is stored in PostgreSQL
- Authentication and account management are fully database-driven
- Only post owners can edit or delete their posts
- Bootstrap and custom CSS provide a modern, responsive UI

## License
MIT

---

*CS-312 MiniProject 3 for educational purposes.* 