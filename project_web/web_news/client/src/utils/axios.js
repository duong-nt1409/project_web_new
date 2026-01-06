import axios from "axios";

// Configure axios to send credentials (cookies) with all requests
axios.defaults.withCredentials = true;

// Build API base URL from Vite env var (VITE_API_URL).
// Accepts either an origin (https://api.example.com) or origin + /api
// The logic below avoids duplicating `/api` if the env var already contains it.
const envUrl = import.meta.env.VITE_API_URL;
let apiUrl;
if (envUrl) {
  const normalized = envUrl.replace(/\/$/, "");
  apiUrl = normalized.endsWith("/api") ? normalized : normalized + "/api";
  if (normalized.endsWith("/api")) {
    console.log("🔧 VITE_API_URL already contains '/api' — using as-is:", apiUrl);
  } else {
    console.log("🔧 Normalized VITE_API_URL and appended '/api':", apiUrl);
  }
} else {
  apiUrl = "http://localhost:8800/api";
  console.log("🔧 No VITE_API_URL set — defaulting to:", apiUrl);
}

axios.defaults.baseURL = apiUrl;

// Add request interceptor for debugging
axios.interceptors.request.use(
  (config) => {
    console.log("🚀 Axios Request:", config.method?.toUpperCase(), config.url);
    console.log("Request data:", config.data);
    return config;
  },
  (error) => {
    console.error("❌ Axios Request Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
axios.interceptors.response.use(
  (response) => {
    console.log("✅ Axios Response:", response.status, response.config.url);
    console.log("Response data:", response.data);
    return response;
  },
  (error) => {
    console.error("❌ Axios Response Error:", error.response?.status, error.config?.url);
    console.error("Error details:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axios;

