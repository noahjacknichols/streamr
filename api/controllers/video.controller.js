const VideoSchema = require("../models/video");
const mongoose = require("mongoose");
const fs = require('fs');
let Video = mongoose.model("Video", VideoSchema);
let videoService = require('../services/video.service');

exports.createVideo = async (req, res, next) => {
    // const { video_title, video_link } = req.body;
    try{
        console.log('user:', req.user);
        let insertedVid = await videoService.createVideo(req.body, req.user);
        return res.status(200).json(insertedVid);
    } catch(e) {
        res.status(400).json({error: e.message});
    }
}

exports.getVideoById = async (req, res, next) => {
    const { videoId } = req.params;
    console.log(videoId);
    try {
        const vid = await videoService.getVideo(videoId)
        console.log('vid:', vid);
        res.status(200).json(vid);
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}

exports.streamVideo = (req, res) => {
    // const path = req.body.path;
    const path = "public/assets/eva2.mkv";
    try{
        return videoService.streamVideo(path, req.headers.range, res);
    } catch (e) {
        console.log(e.message)
        res.status(400).json({error: e.message});
    }
    
}

exports.updateVideo = async(req, res, next) => {
    try{
        const { videoId } = req.params;
        let updatedVid = await videoService.updateVideo(videoId, req.body);
        if(req.files){
            updatedVid = await videoService.handleFileUpload(req.files, videoId);
        }
        return res.status(200).json(updatedVid);
    }catch (e) {
        console.error(e);
        res.status(400).json({error: e.message});
    }
}
