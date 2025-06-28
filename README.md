# CS-312 MiniProject 1

A modern blog platform built with Node.js, Express, and EJS.

## Features
- Create, edit, and delete blog posts
- Random author name generator
- Category selection and filtering
- Modern UI with neon accents
- Responsive design for desktop and mobile

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/D3VTHSTVR/CS-312-MiniProject-1.git
   cd CS-312-MiniProject-1
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
CS-312-MiniProject-1/
├── public/
│   ├── css/
│   │   └── styles.css         # Main styles
│   └── images/                # Background and UI images
├── routes/
│   └── posts.js               # Blog post routes and logic
├── views/
│   ├── index.ejs              # Main page (feed, post form)
│   ├── edit.ejs               # Edit post page
│   └── partials/
│       ├── header.ejs         # Header partial
│       └── footer.ejs         # Footer partial
├── package.json               # Project metadata and dependencies
├── package-lock.json          # Exact dependency versions
├── app.js                     # Main Express app
├── .gitignore                 # Files and folders ignored by git
└── README.md                  # Project documentation
```

## Usage
- **Create a post:** Fill out the form at the top of the main page.
- **Generate a random author name:** Click the "Generate Random Name" button.
- **Filter by category:** Use the dropdown above the posts.
- **Edit/Delete:** Use the buttons on each post card.

## Customization
- Tweak the look and feel in `public/css/styles.css`.
- Add more categories or features as needed.

## Notes
- `.DS_Store` files (created by macOS) are ignored by git and should not appear in the repository.

## License
MIT

---

*CS-312 MiniProject 1 for educational purposes.* 