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
        },
        genres: [],      
        favorite: {
            type: Boolean,
            default: false
        },
        next_video: {
            type: String,
        },
        subtitle: {
            type: String
        }
    },
    {timestamps: true}
);

module.exports = VideoSchema