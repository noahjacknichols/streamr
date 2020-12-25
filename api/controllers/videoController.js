const VideoSchema = require("../models/video");
const mongoose = require("mongoose");
const e = require("express");
let Video = mongoose.model("Video", VideoSchema);


exports.uploadVideo = async(req, res, next) => {
    const { video_title, video_link } = req.body;
    console.log(video_title, video_link);
    try {
        let newVideo = new Video({video_title: video_title, video_link: video_link});
        newVideo.save( (err, entry) => {
            if (err) {
                return next({
                    status: 400,
                    message: "couldn't save to db",
                    error: err.message,
                });
            }
            res.status(200).json(entry);
        })
    } catch (err) {
        return next({
            status: 400,
            message: "something went wrong uploading new video",
            error: err.message
        });
    }
}

exports.getVideoById = async (req, res, next) => {
    const { videoId } = req.params;
    try {
        Video.findById({_id: videoId}, (err, vid) => {
            if (err) {
                return next({
                    status: 400,
                    message: "error in finding video.",
                    error: err.message,
                });
            }
            res.status(200).json(vid);

        })
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
}