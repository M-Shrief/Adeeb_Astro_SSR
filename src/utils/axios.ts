import axios from 'axios';

export const baseHttp = axios.create({
    baseURL: import.meta.env.PUBLIC_API,
    withCredentials: false,
})

// export const withAuthHttp = axios.create({
//     baseURL: import.meta.env.PUBLIC_API,
//     withCredentials: true,
//     headers: {
//         common: {
//             Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
//         }
//     }
// })

