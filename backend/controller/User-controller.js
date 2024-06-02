const { response } = require("express");
const User = require("../model/user");
const Expense = require("../model/expense");
const bcrypt = require("bcrypt");

exports.register = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Server error" });
    }
    try {
      const user = await User.create({ name, email, password: hash });
      res.status(201).json({ User: user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Database error" });
    }
  });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(500).json({ success: false, message: "Server error" });
        }
        if (result) {
          res.status(200).json({ message: "Login Successful" });
        } else {
          res.status(401).json({ message: "Incorrect Password" });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Database error" });
    });
};

exports.addExpense = (req, res, next) => {
  const { money, description, category } = req.body;
  Expense.create({ money, description, category })
    .then((data) => {
      res.status(201).json({ Expense: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Database error" });
    });
};

exports.showExpense = (req, res, next) => {
  Expense.findAll()
    .then((expenses) => {
      res.status(200).json({ expenses });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Database error" });
    });
};

exports.deleteExpense = (req, res, next) => {
  const { id } = req.params;
  Expense.destroy({ where: { id } })
    .then((result) => {
      if (result) {
        res.status(200).json({ message: "Expense deleted successfully" });
      } else {
        res.status(404).json({ message: "Expense not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Database error" });
    });
};
