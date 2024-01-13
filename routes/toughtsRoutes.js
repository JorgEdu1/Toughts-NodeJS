const express = require('express');
const router = express.Router();
const ToughtsController = require('../controllers/toughtsController');

router.get('/', ToughtsController.showToughts);

module.exports = router;
    