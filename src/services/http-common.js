import axios from "axios";

const BASE_URL = "http://192.168.115.168:7000/api";

export default axios.create({
    baseURL: BASE_URL,
    method: "POST",
    headers: {
        "Content-type": "application/json"
    }
})