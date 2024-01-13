const express = require('express');
const router = express.Router();
const ToughtsController = require('../controllers/toughtsController');

//helpers
const checkAuth = require('../helpers/auth').checkAuth;

//routes
router.get('/add', checkAuth, ToughtsController.createTought);
router.get('/dashboard', checkAuth, ToughtsController.dashboard);
router.get('/', ToughtsController.showToughts);

module.exports = router;
    