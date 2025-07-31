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

    static async registerForm(req, res) {
        try {
            res.render('registerForm', {
                title: 'Register Form',
                errorMessage: '',
                email: '',
                role: ''
            })
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async registerPost(req, res) {
        try {
            const { email, password, role } = req.body;

            if (!email || !password || !role) {
                return res.render('registerForm', {
                    title: 'Register Form',
                    errorMessage: 'Please fill in all fields!',
                    email: email,
                    role: role
                });
            }

            await User.create({ email, password, role })
            res.redirect('/login')

        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async loginForm(req, res) {
        try {
            res.send('This is X PP')
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async postLogin(req, res) {
        try {
            res.send('This is X PP')
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