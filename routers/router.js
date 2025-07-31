const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router();

// Landing page
router.get('/', Controller.landing);

// Auth routes
router.get('/register', Controller.registerForm);
router.post('/register', Controller.registerPost);
router.get('/login', Controller.loginForm);
router.post('/login', Controller.postLogin);
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
router.post('/books/:id/reviews', Controller.saveReview);
// router.get('/books/:id/edit', Controller.editReview);
// router.post('/books/:id/edit', Controller.editReview);
// router.get('/books/:id/delete', Controller.deletedReview);

module.exports = router;