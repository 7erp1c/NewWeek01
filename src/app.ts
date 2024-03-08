import express, {Request, Response} from 'express'


// import {typeVideoForUpdate} from "./models/typeForUpdateVideos";
import {getVideoView, videoType } from './models/typeForGetAndPost';

export const initApp = () => {
    const app = express()
    app.use(express.json())

    const graphicVideo = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]



    const db: { videos: videoType[] } = {
        videos: []
    }
    const newDate = new Date().toISOString();
    const datePost = new Date();
    datePost.setDate(datePost.getDate() + 1)



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


    app.post('/videos', (req: Request<{}, {}, { title: string, author: string, availableResolutions: string[]}>,
                         res: Response) => {
        const {title, author, availableResolutions} = req.body

        //

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

        const filteredResolutions = availableResolutions.filter(x => !graphicVideo.includes(x))
        if (filteredResolutions.length > 0 ) {
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


        let newVideo = {
                id: +(new Date()),
                title: title,
                author: author,
                canBeDownloaded: false,
                minAgeRestriction: null,
                createdAt: newDate,
                publicationDate: datePost.toISOString(),
                availableResolutions: availableResolutions
            };
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


    app.put('/videos/:id', (req: Request<{id:number}, {},
        { title: string, author: string,availableResolutions: string[],canBeDownloaded: boolean, publicationDate: string,
            minAgeRestriction:number,createdAt:string}>,
                            res: Response) => {
        const {title, author, availableResolutions,canBeDownloaded,
            publicationDate} = req.body

        const minAgeRestriction = +req.body.minAgeRestriction
        const createdAt = req.body.createdAt
        const id = +req.params.id;



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
        const filteredResolutions = availableResolutions.filter(x => !graphicVideo.includes(x))
        if (filteredResolutions.length > 0 ) {
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
        if (minAgeRestriction < 0 ||minAgeRestriction > 18) {
            res.status(400).send({
                "errorsMessages": [
                    {
                        "message": "Bad Request",
                        "field": "minAgeRestriction"
                    }
                ]
            })
            return;
        }




        const foundVideo= db.videos.find(v => v.id === id);
        if (foundVideo) {
            foundVideo.title = title;
            foundVideo.author = author;
            foundVideo.canBeDownloaded = canBeDownloaded ?? false;
            foundVideo.minAgeRestriction = minAgeRestriction;

            foundVideo.publicationDate = newDate;
            foundVideo.availableResolutions = availableResolutions;
            res.status(204).send(foundVideo)
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



