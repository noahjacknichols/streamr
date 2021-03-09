const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const c = require('../../config/constants')()

const videoPost = Joi.object({
    video_title: Joi.string().required(),
    video_link: Joi.string().optional(),
    file: Joi.any().optional(),
    genres: Joi.array().optional(),
    subtitles: Joi.string().optional(),
    state: Joi.string().valid(...c.models.video.state).optional(), // remember to get enum here
    video_location: Joi.string().optional(),
    uploadType: Joi.string().optional()
})

const searchPost = Joi.object({
    sort: Joi.object().optional(),
    find: Joi.object().optional(),
    skip: Joi.object().optional(),
    limit: Joi.object().optional(),

})

const video = {
    'POST': videoPost
}

const search = {
    'POST': searchPost
}

module.exports = {
    "/": video,
    "/search": search
} 