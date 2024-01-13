const User = require('../models/User');

const bcrypt = require('bcryptjs');

module.exports = class AuthController {
    static login(req, res) {
        res.render('auth/login');
    }

    static register(req, res) {
        res.render('auth/register');
    }

    static async registerPost(req, res) {
        const { name, email, password, confirmpassword } = req.body;

        //password match validation
        if (password !== confirmpassword) {
            req.flash('message', 'Senhas nao conferem, tente novamente!');
            res.render('auth/register');

            return
        }

        //check if user already exists
        const checkIfUserExists = await User.findOne({ where: { email: email } });

        if (checkIfUserExists) {
            req.flash('message', 'Email ja esta em uso, tente novamente!');
            res.render('auth/register');

            return
        }

        //create a password
        const salt = bcrypt.genSaltSync(10);
        const hashed = bcrypt.hashSync(password, salt);

        const user = {
            name,
            email,
            password: hashed
        }

        try {
            const createdUser = await User.create(user);

            //initialize session
            req.session.userid = createdUser.id

            req.flash('message', 'Usuario criado com sucesso!');
            req.session.save(() => {
                res.redirect('/');
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async logout(req, res) {
        req.session.destroy(() => {
            res.redirect('/login');
        });
    }
}