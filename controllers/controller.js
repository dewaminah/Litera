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
            // let dataBooks = await BookGenre.findAll({
            //     include: [
            //         { model: Book },
            //         { model: Genre }
            //     ]
            //     });
            // console.log(dataBooks);

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