const { formatDate } = require('../helpers/helper');
const {
    User,
    Book,
    Genre,
    Profile,
    Review,
    BookGenre
} = require('../models/index')

class Controller {
    static async showAddBook(req, res) {
        try {
            let genres = await Genre.findAll()

            // res.send(genres);

            res.render('addBook', { genres });
            
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async saveAddBook(req, res) {
        try {
            let { title, author, release, GenreId, description } = req.body
            // res.send(GenreId)
            // console.log(GenreId);
            
            let newBook = await Book.create({ title, author, release, description })

            await newBook.addGenres(GenreId)

            res.send(newBook)

            // res.redirect('/books');
            
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async showBookDetail(req, res) {
        try {
            let { id } = req.params
            // console.log(id);

            let book = await Book.findByPk(+id, {
                include: Genre
            });

            res.render('detailBook copy', { book, formatDate })
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async showEditDetail(req, res) {
        try {
            let { id } = req.params
            // console.log(id);

            let book = await Book.findByPk(+id, {
                include: Genre
            });

            let genres = await Genre.findAll()

            // res.send(book)
            res.render('editBook', { book, genres, formatDate })
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async saveEditDetail(req, res) {
        try {
            let { id } = req.params;
            let { title, author, release, GenreId, description } = req.body;

            const book = await Book.findByPk(+id);

            if (!book) {
                return res.status(404).send("Book not found");
            }

            await book.update({ title, author, release, description });

            await book.setGenres(GenreId);

            // res.redirect('/books'); 
            res.send(book);

        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async deletedBook(req, res) {
        try {
            const { id } = req.params;

            const book = await Book.findByPk(+id);

            if (!book) {
                return res.status(404).send("Book not found");
            }

            await book.destroy();

            // res.redirect('/books');
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async showReview(req, res) {
        try {
            let { id } = req.params
            // console.log(id);

            let book = await Book.findByPk(+id, {
                include: Genre
            });

            let genres = await Genre.findAll()

            // res.send(book)
            res.render('detailReview', { book, genres, formatDate })
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async X(req, res) {
        try {
            res.send('This is X PP')
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }
}

module.exports = Controller;