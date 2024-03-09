import {req} from './test-helpers'
import {SETTINGS} from "../src/setting"
import dotenv from 'dotenv'
dotenv.config()
// import {setDB} from '../src/db/db'
// import {dataset1} from './datasets'


describe('/videos', () => {
    beforeAll(async () => {
        // await req.delete('/testing/all-data')
    })

    it('should get empty array', async () => {
        // setDB()

        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)

        console.log(res.body)

        // expect(res.body.length).toBe(0)
    })
    it('should get not empty array', async () => {
        // setDB(dataset1)

        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)

        console.log(res.body)

        // expect(res.body.length).toBe(1)
        // expect(res.body[0]).toEqual(dataset1.videos[0])
    })
})



