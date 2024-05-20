const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload/:listId', upload.single('file'), usersController.uploadUsers);
router.post('/send-email/:listId', usersController.sendEmailToList);
router.post('/unsubscribe/:userId', usersController.unsubscribeUser);

module.exports = router;
