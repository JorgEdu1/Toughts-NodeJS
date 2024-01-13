module.exports.checkAuth = function (req, res, next) {
    const userId = req.session.userid;

    if (!userId) {//if user is not logged in
        res.redirect('/login');
    }

    next();//if user is logged in
}