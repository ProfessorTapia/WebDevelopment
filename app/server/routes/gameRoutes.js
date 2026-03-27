const express = require("express");
const router = express.Router();
const {
  startGame1,
  generateStoryGame1
} = require("../controllers/game1controller");

// Route to start Game 1
router.get("/game1/start", startGame1);

// Route to generate a story based on user input
router.post("/game1/generate-story", generateStoryGame1);

module.exports = router;
