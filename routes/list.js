const express = require('express');
const router = express.Router();
const listsController = require('../controllers/listsController');

router.post('/', listsController.createList);

module.exports = router;
