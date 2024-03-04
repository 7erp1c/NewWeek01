import express, {Request, Response} from 'express'

import {VideoView} from "./models/videoView";

export const initApp = () => {
    const app = express()
    app.use(express.json())

     type videoType = {
        id: number,
        title: string,
        author: string,
        availableResolutions: string
    }
     const db: { videos: videoType[] } = {
        videos: []
    }

    const getVideos = (req: Request, res: Response) => {
        res
            .status(200)
            .json(db.videos)

    }

    const getVideoView = (dbVideo: videoType): VideoView => {
        return {
            id: dbVideo.id,
            title: dbVideo.title,
            author: dbVideo.author,
            availableResolutions: dbVideo.availableResolutions
        }
    }

    app.get('/videos', getVideos)
    app.get('/', (req: Request, res: Response) => {
        res
            .status(200)
            .json({x:"x1"})

    })


    app.post('/videos', (req: Request,
                         res: Response) => {
        let title = req.body.title;
        if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
            res.sendStatus(400).send({
                "errorsMessages": [
                    {
                        "message": "string",
                        "field": "string"
                    }
                ]
            })
            return;
        }

        const newVideo = {
            id: +(new Date()),
            title: title,
            author: 'it-incubator',
            availableResolutions: 'P144'
        };
        db.videos.push(newVideo)

        res.status(201).send(newVideo)
    })

    app.get('/videos/:id', (req: Request,
                            res: Response) => {
        const foundVideo = db.videos.find(c => c.id === +req.params.id);
        if (!foundVideo) {
            res.sendStatus(404)
            return;
        }
        res.json(getVideoView(foundVideo))
            .send(200)
    })


    app.put('/videos/:videosId', (req: Request, res: Response) => {
        let title = req.body.title
        if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
            res.sendStatus(400).send({
                "errorsMessages": [
                    {
                        "message": "string",
                        "field": "string"
                    }
                ]
            })//плохой запрос
            return;
        }
        const id = +req.params.videosId;
        const video = db.videos.find(v => v.id === id);
        if (video) {
            video.title = title;
            res.status(204).send(video)
        } else {
            res.send(404)
        }


    })


    app.delete('/videos/:id', (req: Request, res: Response) => {
        db.videos = db.videos.filter(c => c.id !== +req.params.id);//переприсваиваем значение с помощью филтрации

        res.sendStatus(204)//no content
    })


    app.delete('/testing/all-data', (req, res) => {
        db.videos = [];
        res.sendStatus(204);
    })
    return app
}



