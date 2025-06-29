# CS-312 MiniProject 1

A modern blog platform built with Node.js, Express, and EJS with Bootstrap styling.

## Features
- Create, edit, and delete blog posts
- Random author name generator
- Category selection and filtering
- Modal-based post editing
- Bootstrap-powered responsive design
- Dark theme with green accents
- Comprehensive code documentation

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
│   ├── index.ejs              # Main page with sidebar form and modal editing
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
- **Create a post:** Fill out the form in the sidebar on the main page
- **Generate a random author name:** Click the shuffle button next to the author field
- **Filter by category:** Use the dropdown above the posts section
- **Edit posts:** Click the "Edit" button on any post to open the edit modal
- **Delete posts:** Click the "Delete" button and confirm the action

## Technical Details

### Architecture
- **Backend:** Node.js with Express.js framework
- **Frontend:** EJS templating with Bootstrap 5
- **Styling:** Custom CSS variables with Bootstrap enhancement
- **Data Storage:** In-memory array (temporary storage)
- **JavaScript:** Vanilla JS with async/await for API calls

### Code Quality
- **Comprehensive commenting:** All files heavily commented with lowercase comments
- **No inline comments:** All comments on separate lines above code
- **Clean codebase:** Removed unused CSS classes and routes
- **Consistent styling:** Bootstrap-first approach with custom enhancements

### Key Features
- **Modal-based editing:** No separate edit page needed
- **Responsive design:** Works on desktop, tablet, and mobile
- **Category filtering:** Client-side filtering with JavaScript
- **Random name generation:** API endpoint for generating silly names
- **Form validation:** HTML5 validation with required fields

## Customization
- **Styling:** Modify CSS variables in `public/css/styles.css`
- **Categories:** Add new categories in the form dropdowns
- **Features:** Extend functionality in `routes/posts.js`
- **UI:** Customize Bootstrap classes in the EJS templates

## Development Notes

- CSS has been optimized to remove unused styles
- Edit functionality moved from separate page to modal
- Bootstrap classes used extensively for responsive design
- Print styles included for better printing experience

## License
MIT

---

*CS-312 MiniProject 1 for educational purposes.* 