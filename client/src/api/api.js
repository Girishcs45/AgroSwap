import axios from "axios";

const api = axios.create({
    baseURL : "https://agroswap.onrender.com"
});

export default api;