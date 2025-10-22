// src/api/axios.js
import axios from "axios";

// 👇 Backend ka deployed base URL (aapka Vercel backend)
axios.defaults.baseURL = "https://job-backend-xi-roan.vercel.app/api/v1";

// 👇 Ye line bahut important hai (ye allow karti hai cookies bhejne ko)
axios.defaults.withCredentials = true;

export default axios;
