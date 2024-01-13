const Tought = require('../models/Tought');
const User = require('../models/User');

module.exports = class ToughtsController {
    static async showToughts(req, res) {
       res.render('toughts/home')
    }

    static async dashboard(req, res) {
        res.render('toughts/dashboard');
    }

    static async createTought(req, res) {
        res.render('toughts/create');
    }

    static async createToughtSave(req, res) {
        const tought = {
            title: req.body.title,
            UserId: req.session.userid
        }

        try{
            await Tought.create(tought);

            req.flash('success', 'Pensamento Criado com Sucesso!');

            req.session.save(() => {
                res.redirect('/toughts/dashboard');
            })
        } catch(err) {
            console.log(err);
        }
    }
}