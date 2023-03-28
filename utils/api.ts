import axios from "axios";

const api = axios.create({
  baseURL: "https://currency-exchange.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
    "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
  },
});

export default api;
