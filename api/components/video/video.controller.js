const VideoSchema = require("./video.model");
const mongoose = require("mongoose");
const fs = require("fs");
let Video = mongoose.model("Video", VideoSchema);
let videoService = require("./video.service");
const c = require('../../constants');

exports.createVideo = async (req, res, next) => {
    try {
        let insertedVid = await videoService.createVideo(req.body, req.user);
        if (req.files) {
            console.log(req.body);
            console.log('sent files');
            insertedVid = await videoService.handleFileUpload(req.files.file, insertedVid.id, req.body.uploadType);
        }
        return res.status(200).json(insertedVid);
    } catch (e) {
        console.log(e.message);
        res.status(400).json({ error: e.message });
    }
};

exports.getVideoById = async (req, res) => {
    const { videoId } = req.params;
    try {
        const vid = await videoService.getVideo(videoId);
        res.status(200).json(vid);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

exports.streamVideo = (req, res) => {
    
    // const path = "public/assets/eva2.mkv";
    try {
        const path = req.body.path;
        if(!path) throw new Error(c.ERROR.BAD_BODY);
        return videoService.streamVideo(path, req.headers.range, res);
    } catch (e) {
        console.log(e.message);
        res.status(400).json({ error: e.message });
    }
};

exports.updateVideo = async (req, res) => {
    try {
        const { videoId } = req.params;
        let updatedVid = await videoService.updateVideo(videoId, req.body);
        if (req.files) {
            await videoService.handleFileUpload(req.files, videoId, req.body.uploadType);
        }
        return res.status(200).json(updatedVid);
    } catch (e) {
        console.error(e);
        res.status(400).json({ error: e.message });
    }
};

exports.getVideos = async (req, res) => {
    try {
        let videos = await videoService.getAllVideos();
        return res.status(200).json(videos);
    } catch (e) {
        console.error(e);
        res.status(400).json({ error: e.message });
    }
};
