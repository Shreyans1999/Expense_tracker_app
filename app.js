const express = require("express");
const fs = require("fs");
const app = express();
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const sq = require("./backend/util/database");
const User = require("./backend/model/user");
const Expense = require("./backend/model/expense");
const Order = require("./backend/model/orders");
const Request = require("./backend/model/ForgotPasswordRequests");
const FileUrl = require("./backend/model/fileUrl");
const UserRoute = require("./backend/routes/user-routes");
const premiumRoute = require("./backend/routes/premium-routes");
const forgetPass = require("./backend/routes/forget-pass-route");
const expenseRoute = require("./backend/routes/expense-Routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

app.use(bodyParser.json({ extended: false }));
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  {
    flags: "a",
  }
);
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("combined",{stream:accessLogStream}));

//Route Configuration
app.use(UserRoute);
app.use(forgetPass);
app.use(expenseRoute);
app.use(premiumRoute);
app.use('/frontend', express.static('frontend'));

//schema Relations
User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);
User.hasMany(Request);
Request.belongsTo(User);
User.hasMany(FileUrl);
FileUrl.belongsTo(User);

sq.sync({ force: true })
  .then(() => {
    console.log('Database synchronized');
    app.listen(process.env.PORT, () => {
      console.log('Server is running on http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('Database synchronization error:', err);
    process.exit(1);
  });
