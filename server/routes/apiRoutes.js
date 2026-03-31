const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const messageController = require('../controllers/messageController');

router.post('/chat', aiController.chat);
router.post('/jd-match', aiController.jdMatch);
router.post('/project-explain', aiController.projectExplain);
router.post('/messages', messageController.sendMessage);

module.exports = router;
