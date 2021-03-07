const mongoose = require("mongoose");

const { Schema } = mongoose;

const VideoSchema = new Schema(
    {
        video_title: {
            type: String,
            // required: [true, "can't be blank"]
        },
        video_link: {
            type: String,
        },
        _uploadedById: {
            type: Schema.Types.ObjectId
        },
        genres: [],
        favorite: {
            type: Boolean,
            default: false,
        },
        next_video: {
            type: String,
        },
        subtitles: {
            type: String,
        },
        length: {
            type: String,
        },
        thumbnail: {
            type: String,
        },
        state: {
            type: String,
            default: "CREATED", //LOCAL, UPLOADED, IN_PROGRESS, COMPLETED
        },
        video_location: {
            type: String,
            default: "", //LOCAL, CLOUD, LINK
        },
        extension: {
            type: String,
            default: null
        },
        cloud_data: {
            type: Object,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Video', VideoSchema);
