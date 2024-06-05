const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const Expense = require('../model/expense');

exports.register = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        const data = await User.create({ name, email, password: hash });
        res.status(201).json({ User: data });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

function generateAccessToken(id) {
    return jwt.sign({ userId: id }, "magical-key-for-userAuthentication");
}

exports.Login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findAll({ where: { email } });
        if (user.length > 0) {
            const result = await bcrypt.compare(password, user[0].password);
            if (result) {
                res.status(201).json({
                    message: "Login Successful",
                    token: generateAccessToken(user[0].id),
                });
            } else {
                res.status(401).json({ message: "Incorrect Password" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

exports.AddExpense = async (req, res, next) => {
    const { money, description, category } = req.body;
    const userId = req.user.id;
    try {
        const data = await Expense.create({ money, description, category, UserId: userId });
        res.status(201).json({ Expense: data });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

exports.ShowExpense = async (req, res, next) => {
    try {
        const expenses = await Expense.findAll({ where: { UserId: req.user.id } });
        res.status(201).json({ expenses });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

exports.DeleteExpense = async (req, res, next) => {
    const expenseId = req.params.id;
    try {
        await Expense.destroy({ where: { id: expenseId } });
        res.status(201).json({ message: "Successfully deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};
