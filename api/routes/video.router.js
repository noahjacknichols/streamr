var express = require("express");
const validateToken = require('../middleware/auth.middleware');
const videoController = require('../controllers/video.controller');
const video = express.Router();

video.post('/', validateToken, videoController.createVideo);
video.get('/:videoId',  videoController.getVideoById);
video.get('/:videoId/stream', videoController.streamVideo);
video.put('/:videoId', validateToken, videoController.updateVideo);

module.exports = video;