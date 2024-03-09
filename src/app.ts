import express, {Request, Response} from 'express'
import {getVideoView} from './models/typeForGetAndPost';
import {db, graphicVideo} from "./db";
import {RequestWithPost, RequestWithPut} from "./type";
import {VideoCreateModel} from "./models/VideoCreateModel";
import {VideoUpdateModel, VideoUpdateOneModel} from "./models/VideoUpdateModel";

export const app = express()

app.use(express.json())


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


app.post('/videos', (req: RequestWithPost<VideoCreateModel>, res: Response) => {
    const {title, author, availableResolutions} = req.body

    const newDate = new Date().toISOString();
    const datePost = new Date();
    datePost.setDate(datePost.getDate() + 1)
    // console.log({datePost: datePost.toISOString()})
    let errorsMessages: any[] = [];
    if (!title || !title.trim() || title.length > 40 || title.length < 1) {
        errorsMessages.push(
            {
                "message": "Bad Request",
                "field": "title"
            }
        )

    }

    if (!author || !author.trim() || author.length > 20 || author.length < 1) {
        errorsMessages.push(
            {
                "message": "Bad Request",
                "field": "author"
            }
        )

    }

    const filteredResolutions = availableResolutions.filter(x => !graphicVideo.includes(x))
    if (filteredResolutions.length > 0) {
        errorsMessages.push(
            {
                "message": "Bad Request",
                "field": "availableResolutions"
            }
        )

    }
    if (errorsMessages.length > 0) {
        res.status(400).send({
                "errorsMessages":
                errorsMessages
            }
        )
        return
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
    // console.log(newVideo)
    res.status(201).send(newVideo)
})


app.get('/videos/:id', (req: Request, res: Response) => {
    const foundVideo = db.videos.find(c => c.id === +req.params.id);
    if (!foundVideo) {
        res.sendStatus(404)
        return;
    }
    res.json(getVideoView(foundVideo))
        .send(200)
})


app.put('/videos/:id', (req: RequestWithPut<VideoUpdateOneModel, VideoUpdateModel>, res: Response) => {
    const {title, author, availableResolutions, canBeDownloaded, publicationDate} = req.body
    const minAgeRestriction = +req.body.minAgeRestriction
    const id = +req.params.id;



    let errorsMessages: any[] = [];

    if (!title || !title.trim() || title.length > 40 || title.length < 1) {
        errorsMessages.push(
            {
                "message": "Bad Request",
                "field": "title"
            }
        )

    }
    if (!author || !author.trim() || author.length > 20 || author.length < 1) {
        errorsMessages.push(
            {
                "message": "Bad Request",
                "field": "author"
            }
        )

    }
    const filteredResolutions = availableResolutions.filter(x => !graphicVideo.includes(x))
    if (filteredResolutions.length > 0) {
        errorsMessages.push(
            {
                "message": "Bad Request",
                "field": "availableResolutions"
            }
        )

    }
    if (minAgeRestriction < 0 || minAgeRestriction > 18) {
        errorsMessages.push(
            {
                "message": "Bad Request",
                "field": "minAgeRestriction"
            }
        )

    }
    // if (!canBeDownloaded ) {
    //     errorsMessages.push(
    //         {
    //             "message": "Bad Request",
    //             "field": "canBeDownloaded"
    //         }
    //     )
    // }
    // if ( publicationDate !== 'number') {
    //     errorsMessages.push(
    //         {
    //             "message": "Bad Request",
    //             "field": "publicationDate"
    //         }
    //     )
    // }
    if (errorsMessages.length > 0) {
        res.status(400).send({
                "errorsMessages":
                errorsMessages
            }
        )
        return
    }

    const foundVideo = db.videos.find(v => v.id === id);

    if (foundVideo) {
        const datePut = new Date()
        datePut.setDate(datePut.getDate() + 1);
        foundVideo.title = title;
        foundVideo.author = author;
        foundVideo.canBeDownloaded = canBeDownloaded ?? false;
        foundVideo.minAgeRestriction = minAgeRestriction;
        foundVideo.publicationDate = datePut.toISOString();
        foundVideo.availableResolutions = availableResolutions;
        res.status(204).send(foundVideo)
    } else {
        res.send(404)
    }
})


app.delete('/videos/:id', (req: Request<{ id: number }>, res: Response) => {

    const video = db.videos.find((video => video.id === +req.params.id))
    if (!video) {
        return res.sendStatus(404)//Not Found

    }

    db.videos = db.videos
        .filter(c => c.id !== +req.params.id);//переприсваиваем значение с помощью филтрации

    return res.sendStatus(204)//no content
})


app.delete('/testing/all-data', (req, res) => {
    db.videos = [];
    res.sendStatus(204);
})



