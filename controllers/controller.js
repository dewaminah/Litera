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
            let dataBooks = await Book.findAll()

            console.log(dataBooks);
            
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