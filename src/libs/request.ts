import { default as Axios } from "axios";
import { API_URL } from "./utils/contants";

export const request = Axios.create({
  baseURL: API_URL + "/admin",
  withCredentials: true,
});
