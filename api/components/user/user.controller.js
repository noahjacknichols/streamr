const UserSchema = require("./user.model");
const mongoose = require("mongoose");
let User = require('./user.model')

exports.getUserInfo = async (req, res, next) => {
    try {
        User.findById({ _id: req.user.id }, (err, user) => {
            if (err) return res.status(400).json({ error: err.message });
            const payload = {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
            };
            res.status(200).json(payload);
        });
    } catch (err) {
        next(e)
    }
};

exports.editUserInfo = async (req, res, next) => {
    const { field, value } = req.body
    try {
        const update = { $set: { [field]: value } };
        User.findOneAndUpdate(
            { _id: req.user.id },
            update,
            { new: true },
            (err, user) => {
                const payload = {
                    updated: user,
                };
                res.status(200).json(payload);
            }
        );
    } catch (err) {
        next(e)
    }
};
