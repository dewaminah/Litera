# 📚 Litera – Book Review & Recommendation Platform

Litera is a minimalist and elegant web application built with Node.js and Express, designed to help users explore, review, and recommend books. Users can register, log in, browse curated book content, and interact with fellow readers through shared reviews — all within a clean and modern interface.

This project focuses on secure authentication, user-friendly session handling, and responsible digital interaction. It implements bad word filtering using the bad-words library to ensure that user-generated content remains respectful.

✨ Key Features

🧾 User Registration & Login with hashed passwords (bcrypt) and session management (express-session)
📚 Book Listing: Discover a curated list of books with author info and descriptions
📝 Review & Recommendation: Users can read or write book reviews and share their opinions
👥 User Interaction: A simple interaction layer for sharing reviews within the community
🧼 Bad Word Filter: Implemented using bad-words (MVP version) to moderate user-submitted content
💻 Responsive UI: Styled with TailwindCSS to ensure a modern, mobile-friendly interface
🛡️ Form Validation and custom Sequelize validators for safe, consistent input
🛠️ Tech Stack

Backend: Node.js, Express.js
Database: PostgreSQL + Sequelize ORM
Templating: EJS
Styling: TailwindCSS
Security: bcrypt (password hashing), express-session (session handling), bad-words (text filter)