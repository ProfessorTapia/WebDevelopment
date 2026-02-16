const express = require('express');
const router = express.Router();
const { startGame1, submitAnswersGame1 } = require("../controllers/game1controller");

// Route to start Game 1
router.get('/game1/start', startGame1);

// Route to submit answers for Game 1
router.post('/game1/submit', submitAnswersGame1);

module.exports = router;