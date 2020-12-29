var express = require("express");
const video = express.Router();
const validateToken = require('../middleware/auth');
const videoController = require('../controllers/videoController');

video.post('/', validateToken, videoController.uploadVideo);
video.get('/:videoId', validateToken, videoController.getVideoById);
video.get('/:videoId/stream', videoController.streamVideo);

module.exports = video;