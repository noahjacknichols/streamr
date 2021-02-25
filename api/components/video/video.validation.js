const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const videoPost = Joi.object({
    video_title: Joi.string().required(),
    video_link: Joi.string().optional(),
    file: Joi.any().optional(),
    genres: Joi.array().optional(),
    subtitles: Joi.string().optional(),
    state: Joi.string().optional(), // remember to get enum here
    video_location: Joi.string().optional(),
    uploadType: Joi.string().optional()
})
const video = {
    'POST': videoPost
}

module.exports = {
    "/": video
} 