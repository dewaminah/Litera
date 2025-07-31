class Controller {
    static async showLogin(req, res) {
        try {
            res.render('/login')
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async landing(req, res) {
        try {
            res.render('landing')
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async showRegister(req, res) {
        try {
            
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async saveRegister(req, res) {
        try {
            
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async saveLogin(req, res) {
        try {
            
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async logout(req, res) {
        try {
            
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async bookList(req, res) {
        try {
            
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async showAddBook(req, res) {
        try {
            
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async saveAddBook(req, res) {
        try {
            
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async bookDetail(req, res) {
        try {
            
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async deletedBook(req, res) {
        try {
            
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async addReview(req, res) {
        try {
            
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async editReview(req, res) {
        try {
            
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async deletedReview(req, res) {
        try {
            
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }
}

module.exports = Controller;