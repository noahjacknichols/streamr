const fs = require("fs");
let Video = require("./video.model");
const c = require("../../config/constants")();
const AWS = require("aws-sdk");
const stream = require("stream");

/**
 *
 * @param {Object} body the request body
 * @param {Object} user the validated user object
 * @returns
 */
exports.createVideo = async (body, user) => {
    body._uploadedById = user.id;
    try {
        const vidRecord = await Video.create(body);
        if (!vidRecord) throw new Error(c.ERROR.NO_RESULT).status(500);
        return vidRecord;
    } catch (e) {
        throw e;
    }
};

/**
 *
 * @param {MongoId} videoId
 * @returns {Object} video entry with associated _id
 */
exports.getVideo = async (videoId) => {
    try {
        let foundVideo = await Video.findById({ _id: videoId });
        if (!foundVideo) throw new Error(c.ERROR.NO_RESULT);
        return foundVideo;
    } catch (e) {
        throw e;
    }
};

exports.streamVideo = (path, range, res) => {
    try {
        fs.stat(path, (err, stat) => {
            try {
                if (err !== null && err.code === "ENOENT") {
                    throw new Error("No file found");
                } else if (err || !stat) {
                    throw err;
                }
                const fileSize = stat.size;
                path = "public/assets/eva2.mkv";
                if (range) {
                    const parts = range.replace(/bytes=/, "").split("-");
                    const start = parseInt(parts[0], 10);
                    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
                    const chunksize = end - start + 1;
                    const file = fs.createReadStream(path, { start, end });
                    const head = {
                        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                        "Accept-Ranges": "bytes",
                        "Content-Length": chunksize,
                        "Content-Type": "video/mp4",
                        "Access-Control-Allow-Origin": "*",
                    };
                    res.writeHead(206, head);
                    file.pipe(res);
                }
            } catch (e) {
                throw e;
            }
        });
    } catch (e) {
        throw e;
    }
};

/**
 *
 * @param {MongoId} videoId
 * @param {Object} body the request body
 * @returns {Object}
 */
exports.updateVideo = async (videoId, body) => {
    try {
        let updated = await Video.findOneAndUpdate({ _id: videoId }, body, {
            new: true,
        });
        if (!updated) throw new Error(c.ERROR.NO_RESULT);
        return updated;
    } catch (e) {
        throw e;
    }
};

/**
 *
 * @param {Object} file express-file-upload object
 * @param {MongoId} videoId
 * @param {String} uploadType which upload handler to run
 * @returns {Object}
 */
exports.handleFileUpload = async (file, videoId, uploadType = "local") => {
    try {
        if (!file) throw new Error(c.ERROR.BAD_BODY);
        console.log(file);
        return uploadType === "cloud"
            ? await cloudUpload(file, videoId)
            : await localUpload(file, videoId);
    } catch (e) {
        console.log("error uploading");
        throw e;
    }
};

/**
 *
 * @param {Object} find the query to search by
 * @param {Object} sort how to sort the result
 * @param {Object} limit the number of entries to return
 * @param {Object} skip the number of entries to skip
 * @returns {Object}
 */
exports.getAllVideos = async (
    find = {},
    sort = { createdAt: -1 },
    limit = 15,
    skip = 0
) => {
    try {
        const allVideos = await Video.find(find).sort(sort).limit(limit).skip(skip);
        return allVideos;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

/**
 * @param {Object} file express-file-upload object
 * @param {MongoId} videoId
 * @return {Boolean} returns true if writing file finishes successfully
 */
localUpload = async (file, videoId) => {
    try {
        const POSTFIX = `.${file.name.split(".").pop()}`;
        const PREFIX = `./assets/`;
        if (!file) throw new Error(c.ERROR.BAD_BODY);
        await fs.writeFile(PREFIX + videoId + POSTFIX, file.data);
        return true;
    } catch (e) {
        throw e;
    }
};

const uploadStream = ({ Bucket, Key }) => {
    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    });
    const pass = new stream.PassThrough();
    return {
        writeStream: pass,
        promise: s3.upload({ Bucket, Key, Body: pass }).promise(),
    };
};

/**
 * @param {Object} file express-file-upload obj
 * @param {MongoId} videoId
 * @returns {Object} the updated mongo object
 */
cloudUpload = async (file, videoId) => {
    console.log("file:", file, "videoId:", videoId);
    try {
        const POSTFIX = `.${file.name.split(".").pop()}`;
        const fileData = fs.createReadStream(file.tempFilePath);
        const { writeStream, promise } = uploadStream({
            Bucket: process.env.BUCKET_NAME,
            Key: videoId + POSTFIX,
        });
        const readStream = fs.createReadStream(file.tempFilePath);
        const pipeline = readStream.pipe(writeStream);
        return await promise
            .then(async (data) => {
                return await Video.findOneAndUpdate(
                    { _id: videoId },
                    { cloud_data: data, state: "UPLOADED" },
                    { new: true }
                );
            })
            .catch((err) => {
                console.log("upload failed.", err.message);
            });

        let params = {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY,
            Body: fileData,
            Key: videoId + POSTFIX,
            Bucket: process.env.BUCKET_NAME,
        };
        // AWS.config.update({
        //     accessKeyId: process.env.AWS_ACCESS_KEY,
        //     secretAccessKey: process.env.AWS_SECRET_KEY,
        //     useAccelerateEndpoint: true
        // })
        // const s3 = new AWS.S3.ManagedUpload({params}).promise();
        // return await s3.then(async (data) => {
        //     return await Video.findOneAndUpdate({_id: videoId}, {cloud_data: data, state: "UPLOADED"}, {new: true});
        // })
        // .catch((err) => {
        //     throw err;
        // })
    } catch (e) {
        throw e;
    }
};
