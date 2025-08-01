const { formatDate } = require('../helpers/helper');

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
        } catch (error) { ////
            if (error.name === "SequelizeValidationError") {
              const messages = error.errors.map(e => e.message);
              return res.render('registerForm', {
                title: 'Register',
                errorMessage: messages.join(', '),
                email,
                role
              });
            } else {
                console.log(error);
                res.send(error);
            }
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
                // order: [['title', 'DESC']]
            });

            if (title) options.include.where.title = {
                [Op.iLike]: `%${title}%`
            };

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

    static async landing(req, res) {
        try {
            // let genres = await Genre.findAll()

            // res.send(genres);

            res.render('landingPage');
            
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

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

            // res.send(newBook)

            res.redirect('/books');
            
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

            res.redirect('/books'); 
            // res.send(book);

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
      
          const bookTitle = book.title;
          await book.destroy();
      
          res.redirect(`/books?deleted=${bookTitle} removed`);
        } catch (error) {
          console.log(error);
          res.send(error.message || error);
        }
      }
      

    static async showReview(req, res) {
        try {
            let { id } = req.params
            // console.log(id);

            let book = await Book.findByPk(+id, {
                include: Genre
            });

            // let reviews = await Review.findByPk(+id, {
            //     include: {
            //         model: User,
            //         include: Profile
            //     }
            // });

            const review = await Review.ReviewUserAndProfile();

            // res.send(review)
            
            // res.send(review)
            // res.send(book)
            res.render('detailReview', { book, review,  formatDate })
        } catch (error) {
            console.log(error);

            res.send(error)
        }
    }

    static async saveReview(req, res) {
        try {
            const Filter = require('bad-words');
            const filter = new Filter();

            filter.addWords('goblog', 'tolol', 'anjay');

            const { id } = req.params;
            const { comment } = req.body;

            const cleanComment = filter.clean(comment);

            const UserId = 1; // sementara

            await Review.create({ BookId: +id, UserId, comment: cleanComment });

            res.redirect(`/books/${id}/reviews`);
        } catch (error) {
            console.log('ERROR SAAT SAVE REVIEW:', error);
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