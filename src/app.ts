import express, {Request, Response} from 'express'

import {VideoView} from "./models/videoView";

export const initApp = () => {
    const app = express()
    app.use(express.json())

    const graphicVideo = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]


    type videoType = {
        id: number,
        title: string,
        author: string,
        canBeDownloaded: boolean,
        minAgeRestriction: null,
        createdAt: string,
        publicationDate: string,
        availableResolutions: string[]
    }
    const db: { videos: videoType[] } = {
        videos: []
    }


    const getVideoView = (dbVideo: videoType): VideoView => {
        return {
            id: dbVideo.id,
            title: dbVideo.title,
            author: dbVideo.author,
            canBeDownloaded: dbVideo.canBeDownloaded,
            minAgeRestriction: dbVideo.minAgeRestriction,
            createdAt: dbVideo.createdAt,
            publicationDate: dbVideo.publicationDate,
            availableResolutions: dbVideo.availableResolutions.toString()
        }
    }
    app.get('/', (req: Request, res: Response) => {
        res
            .status(200)
            .json({x: "x1"})

    })
    app.get('/videos', (req: Request, res: Response) => {
        res
            .status(200)
            .json(db.videos)
    })


    app.post('/videos', (req: Request<{}, {}, { title: string, author: string, availableResolutions: string[] }>,
                         res: Response) => {
        const {title, author, availableResolutions} = req.body

        const date = new Date();
        date.setDate(date.getDate() + 1)//

        if (!title || !title.trim() || title.length > 40 || title.length < 1) {
            res.status(400).send({
                "errorsMessages": [
                    {
                        "message": "Bad Request",
                        "field": "title"
                    }
                ]
            })
            return;
        }
        if (!author || !author.trim() || author.length > 20 || author.length < 1) {
            res.status(400).send({
                "errorsMessages": [
                    {
                        "message": "Bad Request",
                        "field": "author"
                    }
                ]
            })
            return;
        }

        const CheckingTheArray = availableResolutions.filter(x => !graphicVideo.includes(x))
        if (!availableResolutions||CheckingTheArray.length > 0 ) {
            res.status(400).send({
                "errorsMessages": [
                    {
                        "message": "Bad Request",
                        "field": "availableResolutions"
                    }
                ]
            })
            return;
        }


        const newVideo = {
                id: +(new Date()),
                title: title,
                author: author,
                canBeDownloaded: false,
                minAgeRestriction: null,
                createdAt: new Date().toISOString(),
                publicationDate: date.toISOString(),
                availableResolutions: availableResolutions
            }
        ;
        db.videos.push(newVideo)
        console.log(newVideo)
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
                        "message": "Bad Request",
                        "field": "title"
                    }
                ]
            })
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



