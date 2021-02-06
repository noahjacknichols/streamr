import axios from "axios";
const url = process.env.REACT_APP_API_DOMAIN;

const login = async (data) => {
    // console.log("api is:", process.env.REACT_APP_API_DOMAIN);
    console.log(data);
    let res = await axios.post(`${url}/login`, data, {});
    console.log("res:", res);
    return res.data;
};

export const userService = {
    login,
};
