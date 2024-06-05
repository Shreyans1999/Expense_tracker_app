const express = require('express');
const path = require('path');
const app = express();
const sq = require('./backend/util/database');
const User = require('./backend/model/user');
const Expense = require('./backend/model/expense');
const Router = require('./backend/routes/router');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.use(Router);

User.hasMany(Expense, { foreignKey: 'UserId' });
Expense.belongsTo(User, { foreignKey: 'UserId' });

// Serve static files from the "frontend" directory
app.use('/frontend', express.static(path.join(__dirname, 'frontend')));

sq.sync({ force: true }) // Use force: true to drop and recreate tables
  .then(() => {
    console.log('Database synced');
  })
  .catch(err => {
    console.log('Database sync error:', err);
  });

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
