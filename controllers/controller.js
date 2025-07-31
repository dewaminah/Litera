const {
    User,
    Book,
    Genre,
    Profile,
    Review,
    BookGenre
} = require('../models/index');
const bcrypt = require('bcryptjs');
const user = require('../models/user');

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
                title: 'Register',
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
                    title: 'Register',
                    errorMessage: 'Please fill in all fields!',
                    email: email,
                    role: role
                });
            }

            // await User.create({ email, password, role })
            // res.redirect('/login')

            // const salt = await bcrypt.genSalt(10);
            // const hashedPassword = await bcrypt.hash(password, salt);
        
            await User.create({ email, password, role });
            
            // req.session.userId = newUser.id;
            res.redirect('/login');
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async loginForm(req, res) {
        try {
            res.render('login', {
                email: '',
                errorMessage: ''
            });
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async postLogin(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email }})

            if (user) {
                const isValid = await bcrypt.compare(password, user.password);
            
                if (isValid) {
                    req.session.userId = user.id;
                    return res.redirect('/books');
                }
            }
        
            return res.render('login', {
                email,
                errorMessage: 'Invalid email or password'
            });
    
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static logout(req, res) {
        try {
          req.session.destroy(err => {
            if (err) throw err;
            res.redirect('/login');
          });
        } catch (error) {
          console.error(error);
          res.send("Logout failed");
        }
    }

    static async bookList(req, res) {
        try {
            const books = await Book.findAll({
                // include: ['reviews'], 
                order: [['createdAt', 'DESC']]
            });

        //   if (!req.session.userId) {
        //     return res.redirect('/login');
        //   }
      
        //   const books = await Book.findAll();
          res.render('home', { books });
        } catch (error) {
          console.error(error);
        //   res.send("Failed to load homepage");
          res.send(error);
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