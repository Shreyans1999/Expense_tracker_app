const User = require("../model/user");
const Expense = require("../model/expense");
const sequelize = require("../util/database");
const expenses = require("../model/expense");

exports.ShowLeaderBoard = async (req, res) => {
  try {
    const Leaderboard = await User.findAll({
      attributes: [
        "id",
        "name",
        [sequelize.fn("sum", sequelize.col("expenses.money")), "totalCost"],
      ],
      include: [
        {
          model: Expense,
          attributes: [],
        },
      ],
      group: ["User.id"],
      order: [["totalCost", "DESC"]],
    });
    console.log(Leaderboard);
    res.status(200).json(Leaderboard);
  } catch (err) {
    console.log(err);
  }
};
