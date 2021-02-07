const express = require("express");
const routes = express.Router();

const authRouter = require("./components/auth/auth.router"),
    userRouter = require("./components/user/user.router"),
    videoRouter = require("./components/video/video.router");

routes.use("/", authRouter);
routes.use("/user", userRouter);
routes.use("/video", videoRouter);

module.exports = routes;
