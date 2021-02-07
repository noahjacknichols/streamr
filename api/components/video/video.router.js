var express = require("express");
const validateToken = require("../../middleware/auth.middleware");
const videoController = require("./video.controller");
const video = express.Router();

video.post("/", validateToken, videoController.createVideo);

video.get("/", validateToken, videoController.getVideos);

video.get("/:videoId", videoController.getVideoById);

video.put("/:videoId", validateToken, videoController.updateVideo);

video.get("/:videoId/stream", videoController.streamVideo);

module.exports = video;
