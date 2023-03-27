import axios from "axios";

const api = axios.create({
  baseURL: "https://currency-exchange.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": "a6b0f851d5msh9894ff9beb639bdp104a4djsn055947651237",
    "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
  },
});

export default api;
