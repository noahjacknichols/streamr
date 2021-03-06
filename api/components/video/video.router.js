var express = require("express");
const validateToken = require("../../middleware/auth.middleware");
const videoController = require("./video.controller");
const video = express.Router();
const schemaValidator = require('../../middleware/body.validation')
const validateRequest = schemaValidator("videoSchema")

video.post("/", validateRequest, validateToken, videoController.createVideo);

video.post("/search",  validateToken, videoController.getVideos);

video.get("/:videoId", videoController.getVideoById);

video.put("/:videoId", validateToken, videoController.updateVideo);

video.get("/:videoId/stream", videoController.streamVideo);

module.exports = video;
