const User = require("../model/user");
const Expense = require("../model/expense");

exports.ShowLeaderBoard = async (req, res) => {
  try {
    const users = await User.findAll();
    const expenses = await Expense.findAll();
    const TotalExpense = {};

    expenses.forEach((expense) => {
      if (TotalExpense[expense.UserId]) {
        TotalExpense[expense.UserId] += expense.money;
      } else {
        TotalExpense[expense.UserId] = expense.money;
      }
    });

    const Leaderboard = users.map((user) => ({
      name: user.name,
      totalCost: TotalExpense[user.id] || 0,
    }));

    Leaderboard.sort((a, b) => b.totalCost - a.totalCost);

    res.status(200).json(Leaderboard);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to retrieve leaderboard" });
  }
};
