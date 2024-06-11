const express = require('express');
const app = express();
const sq = require('./backend/util/database');
const User = require('./backend/model/user');
const Expense = require('./backend/model/expense');
const Order = require('./backend/model/orders');
const Request = require('./backend/model/ForgotPasswordRequests');
const Router = require('./backend/routes/router');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json({ extended: false }));
app.use(cors());
app.use('/frontend', express.static('frontend'));
app.use(Router);

User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);
User.hasMany(Request);
Request.belongsTo(User);

sq.sync({ force: true })
  .then(() => {
    console.log('Database synchronized');
    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('Database synchronization error:', err);
    process.exit(1);
  });
