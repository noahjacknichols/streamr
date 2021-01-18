import axios from 'axios';
const url = process.env.REACT_APP_API_DOMAIN;

const uploadVideo = async (token, data) => {
    // console.log("api is:", process.env.REACT_APP_API_DOMAIN);
    // for(let key in data.entries()){
    //     console.log('key:', key);
    // }
    console.log(data);
    let config = {
        headers: {
            token: token,
            "Content-Type": "multipart/form-data"
        }
    }
    console.log('data:', data);
    let res = await axios.post(`${url}/video`, data, config);
    console.log('status', res.status);
    if (!res) return;
    
    if(res.status !== '200') console.log(res.data);
    return res.data;
}


export const videoService = {
    uploadVideo,
}