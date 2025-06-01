import axios from "axios";

// creating an instance with the base URL
export const api = axios.create({
    baseURL: "http://localhost:5000/api", 
});
