export type VideoUpdateOneModel = {
    id: number
}

export type VideoUpdateModel = {
    title: string,
    author: string,
    availableResolutions: string[],
    canBeDownloaded: boolean,
    publicationDate: string,
    minAgeRestriction: number,
    createdAt: string
}