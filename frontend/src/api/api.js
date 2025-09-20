import axios from "axios";

// Backend URL
export const backendURL = "http://localhost:5000";

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
