import axios from 'axios';
const url = process.env.REACT_APP_API_DOMAIN;

const uploadVideo = (data) => {
    // console.log("api is:", process.env.REACT_APP_API_DOMAIN);
    return axios.post(`${url}/video`, data, {
    })
    .then(res => {
        console.log(res);
    })
    .catch(reject => {
        console.log('rejected with:', reject);
    })
}


export const videoService = {
    uploadVideo,
}