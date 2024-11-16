const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Express app is running!');
});

// Start Express app
const port = process.env.EXPRESS_PORT || 3001;
app.listen(port, () => console.log(`Express app running on port ${port}`));

module.exports = app;
