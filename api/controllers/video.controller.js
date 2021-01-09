const VideoSchema = require("../models/video");
const mongoose = require("mongoose");
const fs = require('fs');
let Video = mongoose.model("Video", VideoSchema);


exports.createVideo = async(req, res, next) => {
    const { video_title, video_link } = req.body;
    console.log(video_title, video_link);
    try {
        let newVideo = new Video({video_title: video_title});
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

exports.streamVideo = (req, res) => {
    // const path = req.body.path;
    const path = "public/assets/eva2.mkv";
    try{
        fs.stat(path, (err, stat) => {
            if (err !== null && err.code === 'ENOENT') {
                res.sendStatus(404);
            }else if (err || !stat){
                console.log("here");
                return next({
                    status: 400,
                    message: "Something went wrong with request",
                    error: err.message
                });
            }
            
            const fileSize = stat.size;
            const range = req.headers.range
    
            if(range) {
                const parts = range.replace(/bytes=/, "").split('-');
    
                const start = parseInt(parts[0], 10);
                const end = parts[1] ? parseInt(parts[1], 10) : fileSize -1;
    
                const chunksize = (end - start) +1;
                const file = fs.createReadStream(path, {start, end});
                const head = {
                    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunksize,
                    'Content-Type': 'video/mp4',
                    'Access-Control-Allow-Origin': '*',
                }
                res.writeHead(206, head);
                file.pipe(res);
            } else {
                const head = {
                    'Content-Length': fileSize,
                    'Content-Type': 'video/mp4',
                }
                res.writeHead(200, head);
                fs.createReadStream(path).pipe(res);
            }
        })
    } catch (e) {
        next({
            status: 400,
            message: "something wen't wrong getting that video",
            error: e.message
        })
    }
    
}

exports.editVideoInfo = async(req, res, next) => {
    if (!req.body.field || !req.body.value || !req.body.videoId) {
        return next({
            status: 400,
            message: "Incorrect body sent"
        })
    }
    const { field, value, videoId } = red.body;
    try{
        const update = { $set: { [field]: value }};
        Video.findOneAndUpdate({_id: videoId}, update, {new: true}, (err, user) => {
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

exports.uploadVideo = async(req, res, next) => {
    if(!req.params.fileType === 'file'){

    }
}

function handleFileUpload(req, res) {
    try{
        if(!req.files){
            next({
                status: 400,
                message: "file not sent in request"
            });
        }else{
            let file = req.files.file;
            file.mv('./public/assets/' + req.params.videoId);
            Video.findOneAndUpdate({_id: videoId}, {$set: {[video_link]: 'public/assets/' + req.params.videoId}})
        }
    }catch(e) {
        res.status(400).json({error: e.message})
    }
}