import axios from "axios";

const instance = axios.create({
  baseURL: "https://chargemate-iq5r.onrender.com/api",
  withCredentials: true, // For cookies (JWT)
});

export default instance;
