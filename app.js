const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');
const sq = require('./backend/util/database');
const User = require('./backend/model/user');
const Expense = require('./backend/model/expense');
const Order = require('./backend/model/orders');
const Request = require('./backend/model/ForgotPasswordRequests');
const FileUrl = require('./backend/model/fileUrl');
const UserRoute = require('./backend/routes/user-routes');
const premiumRoute = require('./backend/routes/premium-routes');
const forgetPass = require('./backend/routes/forget-pass-route');
const expenseRoute = require('./backend/routes/expense-Routes');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json({ extended: false }));
app.use(cors());
app.use('/frontend', express.static('frontend'));

// Route Configuration
app.use(UserRoute);
app.use(forgetPass);
app.use(expenseRoute);
app.use(premiumRoute);

User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);
User.hasMany(Request);
Request.belongsTo(User);
User.hasMany(FileUrl);
FileUrl.belongsTo(User);

const privateKey = fs.readFileSync('server.key');
const certificate = fs.readFileSync('server.cert');

const dotenv = require('dotenv');
dotenv.config();

sq.sync({ force: true })
  .then(() => {
    console.log('Database synchronized');
    https.createServer({ key: privateKey, cert: certificate }, app)
      .listen(process.env.PORT || 3000, async () => {
        console.log('Server is running on https://localhost:3000');
        const open = await import('open');
        open.default('https://localhost:3000/frontend/signup_page/index.html');
      });
  })
  .catch(err => {
    console.error('Database synchronization error:', err);
    process.exit(1);
  });
