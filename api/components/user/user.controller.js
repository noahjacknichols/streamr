const UserSchema = require("./user.model");
const mongoose = require("mongoose");
let User = mongoose.model("User", UserSchema);

exports.getUserInfo = async (req, res, next) => {
    try{
        User.findById({ _id: req.user.id }, (err, user) => {
            if (err)
                return res.status(400).json({error: err.message});
            const payload = {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
            };
            res.status(200).json(payload);
        })
    } catch (err) {
        res.status(400).json(err.message);
    }
}

exports.editUserInfo = async(req, res, next) => {
    const field = req.body.field;
    const value = req.body.value;
    try{
        const update = { $set: {[field]: value}};
        User.findOneAndUpdate({_id: req.user.id}, update, {new: true}, (err, user) => {
            const payload = {
                "updated": user
            };
            res.status(200).json(payload);
        })
    }catch (err) {
        console.error(err);
        res.status(400).json({err});
    }
}