import axios from "axios";
import { Cookies } from "react-cookie";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    withCredentials: true,
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  function (request) {
    console.log(request)
    if (!request.url.includes("auth/login")) {
      const cookie = new Cookies();
      const token = cookie.get("jwtToken");

      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
    }``
    return request;
  },
  function (error) {
    console.error(error);
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const cookies = new Cookies();
    const res = error.response;

    if (!res) {
      notifyError("Network error or server unreachable");
      return Promise.reject(error);
    }

    switch (res.status) {
      case 401:
        cookies.remove("jwtToken");
        window.location.href = "/login";
        break;
      case 400:
        notifyError(res.data.message);
        break;
      case 403:
        notifyError("Access Denied");
        break;
      case 404:
        notifyError("Resource not found");
        break;
      case 408:
        notifyError("Request Timeout");
        break;
      case 409:
        notifyError("Conflict: " + res.data.message);
        break;
      case 422:
        notifyError("Unprocessable Entity: " + res.data.message);
        break;
      case 429:
        notifyError("Too many requests. Please try again later.");
        break;
      case 500:
        notifyError("Internal Server Error");
        break;
      case 502:
        notifyError("Bad Gateway");
        break;
      case 503:
        notifyError("Service Unavailable");
        break;
      case 504:
        notifyError("Gateway Timeout");
        break;
      default:
        notifyError("An unexpected error occurred");
        break;
    }

    return Promise.reject(error); // ✅ important
  }
);

export default axiosClient;
