var express = require("express");
const video = express.Router();
const validateToken = require('../middleware/auth');
const videoController = require('../controllers/videoController');

video.post('/', validateToken, videoController.uploadVideo);
// video.get('/:videoId', validateToken, videoController.getVideoById);
video.get('/stream', videoController.streamVideo);

module.exports = video;