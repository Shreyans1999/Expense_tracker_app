const express = require('express');
const path = require('path');
const app = express();
const sq = require('./backend/util/database');
const Router = require('./backend/routes/router');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json({ extended: false }));
app.use(cors());
app.use(Router);

// Serve static files from the "frontend" directory
app.use('/frontend', express.static(path.join(__dirname, 'frontend')));

sq.sync()
  .then(response => {
    console.log('Database synced:', response);
  })
  .catch(err => {
    console.log('Database sync error:', err);
  });

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
