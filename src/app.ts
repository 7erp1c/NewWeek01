import express, {Request, Response} from 'express'
import {db} from "./db";
import {videosRouter} from "./routes/videos-router";

export const app = express()

app.use(express.json())
app.use('/videos', videosRouter)

app.get('/', (req: Request, res: Response) => {
    res
        .status(200)
        .json({x: "x1"})

})
app.delete('/testing/all-data', (req, res) => {
    db.videos = [];
    res.sendStatus(204);
})



