const VideoSchema = require("./video.model");
const mongoose = require("mongoose");
const fs = require("fs");
let Video = require('./video.model')
let videoService = require("./video.service");
const c = require('../../constants');

exports.createVideo = async (req, res, next) => {
    console.log('creating video')
    try {
        let insertedVid = await videoService.createVideo(req.body, req.user);
        if (req.files) {
            insertedVid = await videoService.handleFileUpload(req.files.file, insertedVid.id, req.body.uploadType);
            fs.unlink(req.files.file.tempFilePath, (err) => {
                if(err) throw err;
            })
        }
        return res.status(200).json(insertedVid);
    } catch (e) {
        console.log(e.message);
        res.status(400).json({ error: e.message, stackTrace: e.stackTrace});
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

//Deprecated indefinitely
exports.streamVideo = (req, res) => {
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
        const {find, sort, skip, limit } = req.body
        console.log({find, sort, skip, limit})
        let videos = await videoService.getAllVideos(find);
        return res.status(200).json(videos);
    } catch (e) {
        console.error(e);
        res.status(400).json({ error: e.message });
    }
};
