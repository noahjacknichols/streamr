const Joi = require('joi')

const videoPost = Joi.object({
    videoTitle: Joi.string().required(),
})
const video = {
    'POST': videoPost
}

module.exports = {
    "/": video
} 