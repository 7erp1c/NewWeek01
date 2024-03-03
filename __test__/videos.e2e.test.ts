import {agent as supertest} from "supertest";
import {app, db} from "../src/app";
import {after} from "node:test";
import request from "supertest";


const req = supertest(app)

describe('/videos',()=>{
    beforeAll(async()=>{
await  req.delete('/__test__/data').expect(204)
    })
    afterAll(async ()=>{

    })

    it('GET products = []',async ()=>{
       // db.videos = [{title: 'cc'}]

        const res = await req
            .get('/videos')
            .expect(200)

        console.log(res.body)
        expect(res.body.length).toBe(0)
    })
    let createVideos: any = null;

 /*   it('должен создать видео с корректными входящими данными', async () => {
        const createResponse = await request(app)
            .post('/videos')
            .send({title: 'tru-la-la courses'})
            .expect(201)
        createVideos = createResponse.body;

        expect(createVideos).toEqual({
            id: expect.any(Number),
            title: 'tru-la-la courses',
            author: 'it-incubator',
            availableResolutions: 'P144'
        })

        await request(app)
            .get('/courses')
            .expect(200, [createVideos])

    })*/


    /*it('должен удалить видео', async () => {
      let id = +req.params.id
        await request(app)
            .delete('/videos/' + id)
            .expect(204)
        await request(app)
            .get('/videos/' + id)
            .expect(404)

    })*/




})



