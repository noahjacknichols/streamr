const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        firstname: {
            type: String,
        },
        lastname: {
            type: String,
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, "can't be blank"],
            index: true,
        },
        password: {
            type: String,
            required: [true, "can't be blank"],
        },
    },
    { timestamps: true }
);

module.exports = UserSchema;
