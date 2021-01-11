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
        _uploadedById: {
            type: Schema.Types.ObjectId,
            required: true
        },
        genres: [],      
        favorite: {
            type: Boolean,
            default: false
        },
        next_video: {
            type: String,
        },
        subtitles: {
            type: String
        },
        length: {
            type: String
        },
        thumbnail: {
            type: String
        }
    },
    {timestamps: true}
);

module.exports = VideoSchema