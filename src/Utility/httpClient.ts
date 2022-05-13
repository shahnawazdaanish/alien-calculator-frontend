import axios from "axios";

const API_BASEPATH = process.env.REACT_APP_SERVER_URL;

export default axios.create({
    baseURL: API_BASEPATH,
    headers: {
        "Content-type": "application/json"
    }
});