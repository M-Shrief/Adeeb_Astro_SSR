/** 
 * resolve API url
*/
export const apiURL = (relativeURL: string) => import.meta.env.PUBLIC_API + relativeURL;

/**
 * ContentType enum
 */
export enum ContentType {
    JSON='application/json;charset=utf-8'
}