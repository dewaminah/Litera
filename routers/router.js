const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router()

// Landing page
// router.get('/', Controller.X);

// Auth routes
// router.get('/register', Controller.showRegister);
// router.post('/register', Controller.saveRegister);
// router.get('/login', Controller.showLogin);
// router.post('/login', Controller.saveLogin);
// router.get('/logout', Controller.logout);

// Book routes
// router.get('/books', Controller.bookList);
router.get('/books/add', Controller.showAddBook);
router.post('/books/add', Controller.saveAddBook);
router.get('/books/:id', Controller.showBookDetail);
router.get('/books/:id/edit', Controller.showEditDetail);
router.post('/books/:id/edit', Controller.saveEditDetail);
router.get('/books/:id/delete', Controller.deletedBook);
router.get('/books/:id/reviews', Controller.showReview);
// router.get('/books/:id/edit', Controller.editReview);
// router.post('/books/:id/edit', Controller.editReview);
// router.get('/books/:id/delete', Controller.deletedReview);

module.exports = router;