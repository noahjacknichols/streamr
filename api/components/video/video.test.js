const request = require('supertest')
require("dotenv").config();
const app = require('../../index')
const sinon = require('sinon')
const service = require('./video.service')
const model = require('./video.model')
const controller = require('./video.controller')
const { expectation } = require('sinon')

describe('unit tests', () => {
    it('should pass', async () => {

    })
    describe('service layer', () => {
        it('creates a new video object', async () => {
            video = new model();
            sinon.stub(video, 'save').resolves( null, {videoTitle:'test'})
            // sinon.stub(model, 'insertOne').returns({})
            let body = {
                "videoTitle": "test"
            }
            let user = {
                "id": "5a1154523a6bcc1d245e143d"
            }
            const vid = await service.createVideo(body, user);
            console.log(vid)
            expect(vid._uploadedById.toString()).toEqual('5a1154523a6bcc1d245e143d')
        })

    })
})