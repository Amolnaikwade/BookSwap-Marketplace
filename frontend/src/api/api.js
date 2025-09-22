import axios from "axios";

// Backend URL from Vite environment variable
export const backendURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Axios instance
const api = axios.create({
  baseURL: backendURL,
});

// Set JWT token for authenticated requests
export const setAuthToken = (token) => {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
};

export default api;
