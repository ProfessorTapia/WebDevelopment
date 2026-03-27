// Example of an API in action

// setting up global variables for communication
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors')

// Middleware Setup
app.use(cors());          // Allows requests from different origins
app.use(express.json());


// Prints a simple line to let you know things are working!
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

// Register game routes
const gameRoutes = require('./routes/gameRoutes');
app.use('/api/games', gameRoutes);
