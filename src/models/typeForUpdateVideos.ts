// import {VideoViewForUpdate} from "./videoViewForUpdate";
//
//
// export type typeVideoForUpdate = {
//     id: number,
//     title: string,
//     author: string,
//     canBeDownloaded: boolean,
//     minAgeRestriction: number,
//     createdAt: string,
//     publicationDate: string,
//     availableResolutions: string[]
// }
//
// export const getVideoViewForUpdate = (dbVideoForUpdate: typeVideoForUpdate): VideoViewForUpdate => {
//     return {
//         id: dbVideoForUpdate.id,
//         title: dbVideoForUpdate.title,
//         author: dbVideoForUpdate.author,
//         canBeDownloaded: dbVideoForUpdate.canBeDownloaded,
//         minAgeRestriction: dbVideoForUpdate.minAgeRestriction,
//         createdAt: dbVideoForUpdate.createdAt,
//         publicationDate: dbVideoForUpdate.publicationDate,
//         availableResolutions: dbVideoForUpdate.availableResolutions
//     }
// }