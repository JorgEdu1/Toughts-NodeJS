const Tought = require('../models/Tought');
const User = require('../models/User');

module.exports = class ToughtsController {
    static async showToughts(req, res) {
       res.render('toughts/home')
    }

    static async dashboard(req, res) {
        const userId = req.session.userid;

        const user = await User.findOne({
            where: { 
                id: userId, 
            }, 
            include: Tought,
            plain: true
        });
        
        if(!user) {
            res.redirect('/login');
        }

        const toughts = user.Toughts.map((result) => result.dataValues);

        res.render('toughts/dashboard', { toughts });
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

    static async removeTought(req, res) {
        const id = req.body.id;
        const UserId = req.session.userid;

        try{
            await Tought.destroy({
                where: {
                    id: id,
                    UserId: UserId
                }
            });

            req.flash('message', 'Pensamento removido com sucesso!');

            req.session.save(() => {
                res.redirect('/toughts/dashboard');
            })
        }
        catch(err) {
            console.log(err);
        }
    }
}