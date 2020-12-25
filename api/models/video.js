const mongoose = require("mongoose");

const { Schema } = mongoose;

const VideoSchema = new Schema(
    {
        video_title: {
            type: String,
            required: [true, "can't be blank"]
        },
        video_link: {
            type:String,
            required: [true, "can't be blank"]
        },
        genres: [],      
        favorite: {
            type: Boolean,
            default: false
        }
    },
    {timestamps: true}
);

module.exports = VideoSchema