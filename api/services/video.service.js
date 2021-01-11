const VideoSchema = require("../models/video");
const mongoose = require("mongoose");
const fs = require('fs');
let Video = mongoose.model("Video", VideoSchema);
const c = require('../constants');

exports.createVideo = async(body, user) => {
    body._uploadedById = user.id;
    // console.log(body);
    try{
        const vidRecord = await Video.create(body);
        if(!vidRecord) throw new Error(c.ERROR.NO_RESULT);
        return vidRecord;
    } catch (e) {
        throw e;
    }

}

exports.getVideo = async(videoId) => {
    try{
        let foundVideo = await Video.findById({_id: videoId}); 
        if(!foundVideo) throw new Error(c.ERROR.NO_RESULT);
        return foundVideo;
    } catch (e) {
        throw e;
    }

}

exports.streamVideo = (path, range, res) => {
    try{
        fs.stat(path, (err, stat) => {
            if (err !== null && err.code === 'ENOENT') {
                throw new Error('No file found')
            }else if (err || !stat){
                throw new Error(err.message)
            }
            
            const fileSize = stat.size;
            path = "public/assets/eva2.mkv";
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
                return;
            }
            // return {path, range};
        })
    }catch (e) {
        throw e;
    }
}

exports.updateVideo = async(videoId, body) => {
    try{
        let updated = await Video.findOneAndUpdate({_id: videoId}, body, {new: true});
        if (!updated) throw new Error(c.ERROR.NO_RESULT)
        return updated
    } catch (e) {
        throw e;
    }
}


exports.handleFileUpload = async(file, videoId) => {
    try{
        if(!file){
            throw new Error(c.ERROR.BAD_BODY);
        }else{
            let file = req.files.file;
            await file.mv('./public/assets/' + req.params.videoId);
            let updated = Video.findOneAndUpdate({_id: videoId}, {$set: {[video_link]: 'public/assets/' + videoId}})
            return updated;
        }
    }catch(e) {
        throw e;
    }
}