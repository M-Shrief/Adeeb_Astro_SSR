export const apiURL = (relativeURL: string) => {
    return import.meta.env.PUBLIC_API ?
    import.meta.env.PUBLIC_API + relativeURL
    : relativeURL;
}

export enum ContentType {
    JSON='application/json;charset=utf-8'
}