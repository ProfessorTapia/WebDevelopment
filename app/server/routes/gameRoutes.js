const express = require("express");
const router = express.Router();
const {
  startGame1,
  generateStoryGame1,
} = require("../controllers/game1controller");
const { startGame2 } = require("../controllers/game2controller");

// Route to start Game 1
router.get("/game1/start", startGame1);

// Route to generate a story based on user input
router.post("/game1/generate-story", generateStoryGame1);

// Route to start Game 2
router.get("/game2/start", startGame2);

module.exports = router;
