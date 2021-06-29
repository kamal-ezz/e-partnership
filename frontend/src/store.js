import { createStore, action } from "easy-peasy";
import axios from "axios";

const API_URL = "http://localhost:8000";

const userTokenFromStorage = localStorage.getItem("loginToken")
  ? JSON.parse(localStorage.getItem("loginToken"))
  : null;

export default createStore({
  userToken: userTokenFromStorage,

  //actions
  login: action(async (state, payload) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        API_URL + "/auth/token/login",
        payload,
        config
      );

      localStorage.setItem("loginToken", JSON.stringify(data));
      alert("connexion réussie");
    } catch (err) {
      console.log(err);
    }
  }),
  signup: action(async (state, payload) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        API_URL + "/auth/users/",
        payload,
        config
      );

      alert("utilisateur créé avec succès");
    } catch (err) {
      console.log(err);
    }
  }),
});
