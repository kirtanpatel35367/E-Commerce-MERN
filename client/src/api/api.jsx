import axios from "axios";
import { Cookies } from "react-cookie";
import { toast } from "@/hooks/use-toast";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  function (request) {
    if (
      !request.url.includes("auth/login") &&
      !request.url.includes("auth/register")
    ) {
      const cookie = new Cookies();
      const token = cookie.get("jwtToken");

      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
    }
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
      toast({
        title: "Error",
        description: "Network error or server unreachable",
        variant: "destructive",
      });
      return Promise.reject(error);
    }

    switch (res.status) {
      case 401:
        cookies.remove("jwtToken");
        // Don't redirect here, let the component handle it
        break;
      case 400:
        toast({
          title: "Error",
          description: res.data.message,
          variant: "destructive",
        });
        break;
      case 403:
        toast({
          title: "Error",
          description: "Access Denied",
          variant: "destructive",
        });
        break;
      case 404:
        toast({
          title: "Error",
          description: "Resource not found",
          variant: "destructive",
        });
        break;
      case 408:
        toast({
          title: "Error",
          description: "Request Timeout",
          variant: "destructive",
        });
        break;
      case 409:
        toast({
          title: "Error",
          description: "Conflict: " + res.data.message,
          variant: "destructive",
        });
        break;
      case 422:
        toast({
          title: "Error",
          description: "Unprocessable Entity: " + res.data.message,
          variant: "destructive",
        });
        break;
      case 429:
        toast({
          title: "Error",
          description: "Too many requests. Please try again later.",
          variant: "destructive",
        });
        break;
      case 500:
        toast({
          title: "Error",
          description: "Internal Server Error",
          variant: "destructive",
        });
        break;
      case 502:
        toast({
          title: "Error",
          description: "Bad Gateway",
          variant: "destructive",
        });
        break;
      case 503:
        toast({
          title: "Error",
          description: "Service Unavailable",
          variant: "destructive",
        });
        break;
      case 504:
        toast({
          title: "Error",
          description: "Gateway Timeout",
          variant: "destructive",
        });
        break;
      default:
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
        break;
    }

    return Promise.reject(error); // ✅ important
  }
);

export default axiosClient;
