import {req} from './test-helpers'
import dotenv from 'dotenv'
import {app} from "../src/app";
import {VideoCreateModel} from "../src/models/VideoCreateModel";
import {request} from "express";

dotenv.config()


describe('/videos', () => {
    beforeAll(async () => {
        await req.delete('/testing/all-data')
    })

    it('запросить все курсы', async () => {
        const res = await req
            .get("/videos")
            .expect(200)

        expect([])

        // expect(res.body.length).toBe(1)
        // expect(res.body[0]).toEqual(dataset1.videos[0])
    })

    let createdVideo: any = null;
    it('должен создать корректное видео', async () => {

        const videoPostTest : VideoCreateModel = {
            "title": "New video",
            "author": "Bi Di Bum",
            "availableResolutions": ["P144"]
        }

        const createResponse = await req(app)
            .post('/videos')
            .send(videoPostTest)
            .expect(200)

        createdVideo = createResponse.body;

        expect(createdVideo).toEqual({
            id: expect.any(Number),
            title: "New video",
            author: "Bi Di Bum",
            availableResolutions: ["P144"]
        })

        await request(app)
            .get('/videos')
            .expect(200,[createdVideo])
    })




    it('should get not empty array', async () => {
        const res = await req
            .get("/videos/:id")
            .expect(200)

        console.log(res.body)

        // expect(res.body.length).toBe(1)
        // expect(res.body[0]).toEqual(dataset1.videos[0])
    })

})


