import axios from 'axios';
const url = process.env.REACT_APP_API_DOMAIN;

const login = (data) => {
    // console.log("api is:", process.env.REACT_APP_API_DOMAIN);
    return axios.post(`${url}/login`, data, {
    })
    .then(res => {
        console.log(res);
    })
    .catch(reject => {
        console.log('rejected with:', reject);
    })
}


export const userService = {
    login,
}