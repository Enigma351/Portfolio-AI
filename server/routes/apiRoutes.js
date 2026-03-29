const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

router.post('/chat', aiController.chat);
router.post('/jd-match', aiController.jdMatch);
router.post('/project-explain', aiController.projectExplain);

module.exports = router;
