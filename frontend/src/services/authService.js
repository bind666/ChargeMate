import axios from "axios";

const API = axios.create({
    baseURL: "https://chargemate-iq5r.onrender.com/api",
    withCredentials: true,
});

export const registerUser = async (userData) => API.post("/user/register", userData);
export const loginUser = async (userData) => API.post("/user/login", userData);
export const logoutUser = async () => API.delete("/user/logout");
export const getProfile = async () => API.get("/user/profile");